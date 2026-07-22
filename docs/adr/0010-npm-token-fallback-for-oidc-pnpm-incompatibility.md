# ADR-0010: npm 发布鉴权回退 NPM_TOKEN（OIDC + pnpm 不兼容）

- 状态: Accepted
- 日期: 2026-07-22
- 决策者: JayTam
- 关联: ADR-0009 D7（OIDC Trusted Publisher 原方案，本 ADR 取代其鉴权部分）、ADR-0011（未来迁回 OIDC，候选）

## 背景

ADR-0009 D7 原定用 npm OIDC Trusted Publishing 替代长效 NPM_TOKEN：CI 环境下 `npm publish` 自动用 OIDC 换短期 token 发版，不存任何长效凭证，并自动附 provenance 来源证明。

Phase C dry-run 暴露了 OIDC 与 pnpm 的不兼容。本 ADR 记录不兼容的根因、回退方案、以及未来迁回 OIDC 的路径。

## 不兼容根因

npm OIDC Trusted Publishing 的自动 token 交换**只在 `npm publish` 命令本身被调用时触发**。链路如下：

```
changeset publish
  -> 检测到 pnpm-lock.yaml，决定用 pnpm publish
    -> pnpm publish（pnpm 10 内部委托 npm publish）
      -> 传 pnpm 专属参数（--git-checks、verify-deps-before-run 等）
        -> npm 遇到这些参数 + .npmrc 配置干扰，不走 OIDC token 交换
          -> ENEEDAUTH
```

核心矛盾：

1. **changesets 按 lockfile 选包管理器**：仓库有 `pnpm-lock.yaml`，changesets 始终调 `pnpm publish` 而非 `npm publish`，即使 workflow 里写 `npx changeset publish` 也一样。
2. **pnpm publish 不原生支持 OIDC**：pnpm ≤ 10 委托 npm publish 但传 pnpm 专属参数干扰 OIDC 交换；pnpm ≥ 11 原生实现 publish，完全不调 npm CLI，更不碰 OIDC。
3. **changesets 不做 OIDC token 注入**：changesets 的 `publishPackages` 只决定调 npm 还是 pnpm，然后把当前 `process.env` 透传，不替你取 OIDC token 或写 `.npmrc`。

## 已验证失败的绕法

Phase C dry-run 期间逐一验证，均无效：

| 尝试 | 结果 | 原因 |
|---|---|---|
| 删 `setup-node` 的 `registry-url` | ENEEDAUTH | changesets 仍调 pnpm publish，pnpm 不做 OIDC |
| 显式写无 `_authToken` 的 `.npmrc` | ENEEDAUTH | pnpm publish 仍不走 OIDC 交换 |
| 改用 `npx changeset publish` | ENEEDAUTH | changesets 检测到 pnpm-lock.yaml 仍调 pnpm publish |

## 决策

### D1 - 回退 NPM_TOKEN（granular automation，限 scope + 限包）

采用 ADR-0009 D7 预留的回退方案：

- **token 类型**：npm Granular Access Token（automation），限 `@jaytam/*` scope，限 6 个包，bypass 2FA。
- **存储**：GitHub Actions secret `NPM_TOKEN`，仅 `publish.yml` 的 `stable` / `canary` job 通过 `environment` 挂载。
- **注入**：`setup-node` 的 `registry-url` 把 `NODE_AUTH_TOKEN` 写入 `.npmrc` 的 `_authToken`，`pnpm publish` 委托 `npm publish` 时读取。
- **轮换**：token 设有效期（建议 365 天），到期前手动轮换。

### D2 - 不生成 provenance

NPM_TOKEN 方案下无法生成 provenance 来源证明（provenance 依赖 OIDC 换出的短期 token 自带 GitHub 来源信息，长效 token 没有这些信息）。这是回退方案的已知代价，包页面不显示 provenance 标记。

### D3 - npm 后台 Trusted Publisher 配置保留

npm 后台已为 6 个包配的 Trusted Publisher（`publish.yml` + environment 留空）**保留不删**。未来迁回 OIDC 时直接复用，无需重新配置。

## 后果

- 发版链路可用：dry-run 已验证 `@jaytam/ms-flow@1.0.0` 和 `@jaytam/ms-gantt@1.0.1` 成功发布。
- 安全面：从 OIDC 的"零长效 token"退回为"一个限 scope + 限包 + 有有效期 + bypass 2FA 的 granular token"。泄露面比经典 `NPM_TOKEN` 小，但仍非零。
- provenance：包页面不显示来源证明。

## 迁回 OIDC 的路径

以下任一条件满足即可迁回 OIDC + provenance：

1. **pnpm 12 原生支持 OIDC**：pnpm 仓库有 `publish-auth` PR（#12738）在开发中，pnpm 12 的 publish 可能原生做 npm-audience 的 OIDC token 交换。
2. **changesets v3 支持 OIDC token 注入**：changesets 在 publish 前自动取 OIDC token 并写入 `.npmrc`/env，不再依赖 pnpm 委托 npm 的间接路径。

迁回步骤（未来）：

1. 删 `NODE_AUTH_TOKEN` env 和 `NPM_TOKEN` secret。
2. 加回 `permissions: id-token: write`。
3. 删 `setup-node` 的 `registry-url`（或显式写无 `_authToken` 的 `.npmrc`）。
4. 开 `NPM_CONFIG_PROVENANCE: 'true'`。
5. 撤销 npm 后台的 granular automation token。

单开 ADR-0011 执行迁回。

## 中止条件

- 若 NPM_TOKEN 方案也舞动不通（如 npm 后台频繁限制 automation token），临时回退到 ADR-0008 的本地手动 `npm adduser` 发版，不影响 CI 其他部分。
