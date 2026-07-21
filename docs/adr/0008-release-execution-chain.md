# ADR-0008: 发布执行链路

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

ADR-0002~0007 已就绪代码与配置。本 ADR 把"如何把代码推到 npm"这一执行链路固化下来，避免临场操作出错。

## 选项与决策（逐项）

### 7a — npm 登录

- **7a-1（采用）**：本机当前 `npm whoami` 返回 `ENEEDAUTH`。**用户本人**执行 `npm adduser` 登录 `jaytam324` 账户后告知可继续。
- 涉及个人凭据，AI 不得代为执行。

### 7b — 发布方式

- **7b-1（采用）**：手动发布，按 ADR-0003 的洋葱顺序逐包执行：`ms-icons → ms-request → schema-render → antd-ms`。
- 不接 CI、不写自动化脚本。后续如需 CI 化另开 ADR。

### 7c — ms-icons 的 `npm run icons` 前置生成

- **7c-1（采用）**：保留 `packages/ms-icons/package.json:27` 的 `"build": "npm run icons && father build"`，**发布前手动核对 `src/icons/` 工作树是否干净**。
- 若 `npm run icons` 产生了未提交的源码改动，必须先理解并提交或撤销，再继续 publish。绝不允许带着"build 时自动改的源码"发布出去。

### 7d — `npm publish` vs `pnpm publish`

- **7d-2（采用）**：统一用 `npm publish`。
- 仓库 `packageManager` 是 pnpm@10.11.0，build 仍走 `pnpm build`（pnpm 调 father），但发布动作走 `npm publish`，与 `publishConfig.registry=https://registry.npmjs.org/` 链路一致，避免 pnpm 的额外 publish 字段过滤行为带来意外。

### 7e — 版本号 bump 脚本

- **7e-1（采用）**：
  - **主包 antd-ms** 用现有脚本 `pnpm version:minor`，即 `jest --silent && standard-version -a -n --release-as minor && git push --follow-tags`。会把版本从 `2.24.1` bump 到 `2.25.0`，自动生成/追加 CHANGELOG，commit、tag、push。
  - **三个子包** 手动改 `package.json` 的 `version` 字段（已对齐，无需再 bump，见 ADR-0005 表格）；不走 standard-version（子包未配该脚本）。

## 执行前必备清单（前置条件）

1. **commit 待发布改动**：当前 git 工作树有 ADR-0002~0008 + GLOSSARY + 9 个工程文件改动（`.fatherrc.ts`、`package.json`、`.gitignore`、3 个子包 `.fatherrc.ts`、3 个子包 `package.json`）未提交。`standard-version -a` 会把所有未提交改动一并裹进 release commit，commit message 为 `chore(release): 2.25.0` —— 这是可接受的（本次发布就是以"发布就绪"为主题），但需要在 release commit 前先**手动 review 一遍 diff** 确认无敏感信息。
2. **npm 登录**：用户本机执行 `npm adduser`，`npm whoami` 返回 `jaytam324` 后方可继续。
3. **`pnpm install` 已完成**：`node_modules` 与 `pnpm-lock.yaml` 同步。
4. **`ms-icons` 源码干净**：`git status packages/ms-icons/src/` 无未提交改动。

## 执行顺序（step-by-step）

### Phase 0：登录 & 最后核对
```bash
npm adduser                              # 用户本人执行
npm whoami                               # 应返回 jaytam324
git status --short                       # review 所有待提交改动
```

### Phase 1：commit 发布就绪改动
```bash
git add .fatherrc.ts .gitignore package.json \
        packages/ms-icons/.fatherrc.ts packages/ms-icons/package.json \
        packages/ms-request/.fatherrc.ts packages/ms-request/package.json \
        packages/schema-render/.fatherrc.ts packages/schema-render/package.json \
        docs/adr/
git commit -m "chore: publish readiness for 2.25.0 (onion release)"
```

### Phase 2：发布 @jaytam/icons@0.1.0
```bash
cd packages/ms-icons
pnpm build                               # 含 npm run icons + father build
git status src/                          # 确认 src/icons/ 无意外改动
npm publish                              # → @jaytam/icons@0.1.0 上线
cd ../..
```

### Phase 3：发布 @jaytam/request-ms@0.0.3
```bash
cd packages/ms-request
pnpm build
npm publish                              # → @jaytam/request-ms@0.0.3 上线
cd ../..
```

### Phase 4：发布 @jaytam/schema-render@0.0.1
```bash
cd packages/schema-render
pnpm build
npm publish                              # → @jaytam/schema-render@0.0.1 上线
cd ../..
```

### Phase 5：验证三个子包确实存在
```bash
npm view @jaytam/icons version           # 应返回 0.1.0
npm view @jaytam/request-ms version      # 应返回 0.0.3
npm view @jaytam/schema-render version   # 应返回 0.0.1
```
任一返回 404 → 中止 Phase 6，不得发主包。

### Phase 6：bump 主包 antd-ms 到 2.25.0
```bash
pnpm version:minor                       # jest + standard-version + git push --follow-tags
# 此步会把 package.json 从 2.24.1 bump 到 2.25.0，自动生成 CHANGELOG，commit、tag v2.25.0、push
```

### Phase 7：构建 & 发布主包
```bash
pnpm build                               # father build → 生成 es/ 与 lib/
ls es/ lib/                              # 确认产物存在
npm publish                              # → @jaytam/antd-ms@2.25.0 上线
```

### Phase 8：最终验证
```bash
npm view @jaytam/antd-ms version         # 应返回 2.25.0
npm view @jaytam/antd-ms dependencies    # 确认 @jaytam/* 三个子包版本对得上
```

## 中止条件

- 任一 Phase 失败，立即停止后续 Phase。
- 子包任一发布失败 → 主包 Phase 6/7 不得进行（避免再造死包）。
- `pnpm version:minor` 的 jest 失败 → 不得用 `--no-verify` 跳过，先修测试。

## 后果

- 发布链路完全手动，无 CI 自动化 —— 短期 OK，长期需评估是否上 changesets + GitHub Actions（另开 ADR）。
- 子包版本号与 antd-ms 主包的 deps caret 范围（`^0.1.0` / `^0.0.3` / `^0.0.1`）对齐，子包后续 patch bump 可自动满足主包约束，无需主包同步发版。
- `standard-version` 已通过 `--release-as minor` 强制 minor bump；若实际只该 patch，需手动改用 `version:patch` 脚本，避免无谓 minor。

## 后续 ADR 候选

- ADR-0008（候选）：CI 自动化发布（如选用 changesets + GH Actions）
- ADR-0009（候选）：子包的 standard-version 接入
- ADR-0010（候选）：beta / next dist-tag 策略