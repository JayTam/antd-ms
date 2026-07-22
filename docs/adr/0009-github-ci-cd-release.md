# ADR-0009: 发布流程改为 GitHub CI/CD（Changesets + GitHub Actions + Vercel）

- 状态: Accepted
- 日期: 2026-07-22
- 决策者: JayTam
- 关联: ADR-0003（洋葱发布）、ADR-0005（子包独立 SemVer）、ADR-0008（手动发布链路，本 ADR 取代其「短手动」结论并执行候选「CI 自动化」）

## 背景

ADR-0008 把首次发布执行链固化成全套手动步骤，并在末尾显式留下候选：「后续如需 CI 化另开 ADR。CI 自动化发布（如选用 changesets + GH Actions）」。本 ADR 即承接此候选：把发布流程从「本地手动 + 本机 npm 登录」迁到 GitHub CI/CD，同时把文档站从老 DevOps/S3 链迁到 Vercel。同时纠正 ADR-0008 洋葱拓扑在三包口径下的不完整——见下。

## 现状基线（grilling 还原）

- 拓扑（按 6 个 `package.json` 实测依赖重建）：
  - **Stage 1 叶子（无仓内依赖，任意序）**：`@jaytam/icons` 0.1.0、`@jaytam/request-ms` 0.0.3、`@jaytam/schema-render` 0.0.1、`@jaytam/ms-gantt` 1.0.1。
  - **Stage 2**：`@jaytam/antd-ms` 2.25.0 —— `dependencies` 消费上面三家 0.x 包。
  - **Stage 3**：`@jaytam/ms-flow` 1.0.0 —— `peerDependencies: @jaytam/antd-ms ^2.18.0`。peer 是兼容范围声明，理论上发版先后不卡死，但出于安全仍按 antd-ms 先于 ms-flow。
  - **ADR-0008 口径修正**：原文只列 `icons/request-ms/schema-render → antd-ms` 三包洋葱，漏了 `ms-flow`（peer 反向边）与 `ms-gantt`（独立叶）。本 ADR 覆盖全部 6 包。
- 版本模型：ADR-0005 的「对齐」仅指**首次发布的 caret 范围**，子包本就**各自 SemVer**。故 6 包全部按 changesets **独立版本**，不配 `fixed`/`linked` group。
- 触发：全本地、全手动。正式版走 `pnpm version:{patch,minor,major}`（`standard-version -a -n --release-as X` 按根 `.versionrc.js` 的 dumi frontmatter 头模板生成根 `CHANGELOG.md`）；beta 走 `release:development` → `release-beta-version.ts`（版本号 `{x.y.z}-{branch}-{hash}-{date}`，`npm publish --tag beta`，最后 `git reset --hard HEAD`）；通知走 `trigger-notify.ts`（飞书群机器人 interactive 卡片），**其生产/测试飞书 webhook 明文写死在 `scripts/trigger-notify.ts:7-9`**。
- 认证：本机 `npm adduser` 登 `jaytam324`。无 CI、无 OIDC、无 provenance。
- 文档站：`pnpm build:docs` = `dumi build && tsx ./scripts/ci-design-site.ts`；`.dumirc.ts` `outputPath: 'dist'`；`ci-design-site.ts` 仅把 `design/` 目录搬进 `dist/`，**无 S3 上传**；`@aws-sdk/client-s3` 为 root devDeps，被 `src/fields/MsPartUpload` 引用（非纯遗留，但与文档站无关）。
- `.github/workflows/` 不存在。

## 决策（逐轴）

### D1 — 引擎：Changesets

采用 changesets。各轴权衡：

- independent 版本是 changesets 默认形态，与 ADR-0005 各包独立 SemVer 天然咬合，**不配任何 `fixed`/`linked` group**。
- `pnpm` 生态首配，有官方 `changesets/action`。
- 代价：CHANGELOG 偏离 `standard-version` 格式 → 由 D4 的规则头注入脚本兜回。

**废弃**：根 `package.json` 的 `version:patch/minor/major` 三个脚本、`.versionrc.js`、`standard-version` 依赖在 CI 化完成后删除（保留期作为回退）。

### D2 — 范围：6 包全量 + stable & beta(canary)

- 覆盖：icons / request-ms / schema-render / ms-gantt / antd-ms / ms-flow，全部 6 包。
- 流：**stable**（D3 Release PR 触发）+ **beta**（D5 snapshot `canary`）。
- **废弃**：`scripts/release-beta-version.ts` + `release:development` 脚本。
- 硬发布顺序（`changeset publish` 靠 pnpm workspace 自动满足）：
  - 硬边（runtime dep，必须先发）：`icons / request-ms / schema-render → antd-ms`。
  - 软边（peer）：`antd-ms → ms-flow`，CI 仍按序以求安全。
  - 独立叶：`ms-gantt`。

### D3 — stable 触发：Release PR 模式

采用 changesets canonical 流：

1. 任意 PR 合并到 `main` → `release.yml` 触发 → `changesets/action` 开/更新一个「Version Packages」PR，把 `.changeset/*.md` 里堆的变更声明折叠成版本 bump + CHANGELOG。
2. 维护者 merge 该 Release PR → `publish` job 跑 `pnpm publish`（经 D7 OIDC）+ `git push --follow-tags`。

**门控**：merge Release PR 后，`publish` job `needs: [lint, test, build]` 三个 job 全绿才发（见 D6）。符合现有「`jest --silent` 走完才发」的手控习惯。

### D4 — CHANGELOG / 文档站接法

- 文档站只渲染**主包根 `CHANGELOG.md`**（`.dumirc.ts:36` 的 changelog 路由本就指向 `../../CHANGELOG.md`，零改动）。
- `.versionrc.js` 那段中文「发布规则及周期」dumi frontmatter 头（`---\ntitle: 版本迭代\ntoc: content\n---` + 发布规则文案）由一个 **post-`changeset version` 脚本**重新注入到根 `CHANGELOG.md` 头部，随后随 Release PR 一起 commit。
- 子包 `CHANGELOG.md` 只进 GitHub Releases 页，不计文档站。
- **新增脚本**：`scripts/inject-changelog-header.ts`，在 `changeset version` 之后、`git commit` 之前调用。**废弃**：完成迁移后删 `.versionrc.js`。

### D5 — beta 流：changesets snapshot + `canary` dist-tag

- 任意 PR 打上 `snapshot` label → `snapshot.yml` 触发 → `pnpm changeset publish --snapshot --tag canary`。
- 版本号形如 `0.0.1-canary-{timestamp}`，符合「每 PR 短命预览」语义。
- `latest`/`beta` 不被污染；不写 CHANGELOG，不动 git（CI ephemeral，无需 `git reset`，天然消除 `release-beta-version.ts` 的脏工作树问题）。
- `canary` 选名依据：npm 社区惯例 `canary`=per-commit ephemeral、`beta`=正式 prerelease 轨道；后者本轮不走、留待未来 ADR。

### D6 — publish 门槛：lint + test + build 全绿

- 三个 job 在 PR 与 Release PR 上都跑：`lint`（`pnpm lint` = type + eslint + prettier）、`test`（`pnpm test` = `jest --silent`）、`build`（对 6 包逐一 `pnpm --filter <pkg> build` 验产物）。
- `publish` job `needs: [lint, test, build]`，任一红不发。
- **ms-icons 幂等守卫**（强约束，承接 ADR-0008 7c）：`build` job 对 `@jaytam/icons` 额外执行 `pnpm --filter @jaytam/icons icons` 后 `git diff --exit-code packages/ms-icons/src/icons`——脏树即 fail，**绝不允许「build 期自动改源码」随包发出去**。

### D7 - npm 鉴权：~~GitHub OIDC Trusted Publisher + provenance~~ -> NPM_TOKEN 回退（ADR-0010）

> **已回退**：OIDC + pnpm 不兼容（changesets 检测到 pnpm-lock 调 pnpm publish，pnpm publish 不走 OIDC token 交换），dry-run 期间三次绕法均失败。鉴权改回 NPM_TOKEN（granular automation，限 `@jaytam/*` scope + 限包）。完整根因分析与迁回路径见 **ADR-0010**。

- npm 后台 Trusted Publisher 配置**保留**（`publish.yml` + environment 留空），未来迁回 OIDC 时复用。
- Workflow `permissions: { contents: write, pull-requests: write }`（删 `id-token: write`，NPM_TOKEN 方案不需要 OIDC）。
- `setup-node` 的 `registry-url` + `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` 注入鉴权。
- **Node 版本**：三个 workflow 统一用 `node-version: '24'`。
- provenance 暂不可用（依赖 OIDC，NPM_TOKEN 方案不支持）。
- 失败回退：若 NPM_TOKEN 也舞动不通，临时回退 ADR-0008 本地手动 `npm adduser` 发版。

### D8 — changesets/action 回写凭据：默认 `GITHUB_TOKEN`

同仓内开/合 Release PR、push tags、推 CHANGELOG 全部用 job 自带的 `GITHUB_TOKEN`，零额外 Secret、零泄露面。若日后需让「Release PR merge 触发下游 workflow」，再引 GH_PAT，另开 ADR。

### D9 — 文档站：迁 Vercel（与本 ADR 同覆盖）

- Vercel 项目绑 `JayTam/antd-ms`，Framework = **Other**，Build Command = `pnpm install --frozen-lockfile && pnpm build:docs`，Output Directory = `dist`（来自 `.dumirc.ts` `outputPath: 'dist'`）。
- 触发 = Vercel 默认：PR 预览部署 + `main` 合入生产部署。Vercel 直连 GitHub，**不增加任何仓库 Secret**。
- ms-flow↔antd-ms 的 dev-dep 循环是**伪命题**：pnpm workspace 就地链接本地 `packages/ms-flow`（同名 1.0.0），`pnpm install` 不向 npm 回拉，`build:docs` 与 ms-flow 是否已发布无关。撤回 grilling 中一度标注的卡点。
- **作废**：老 DevOps/S3 文档站发布链。`@aws-sdk/client-s3` 保留（`src/fields/MsPartUpload` 引用，非遗留）。`scripts/ci-design-site.ts` 的 `design/` 搬运逻辑保留（`build:docs` 仍调它）。

### D10 - 不做群通知：发版留痕靠 npm tag + GitHub Releases

- 维护者不再维护任何群机器人，CI 不发任何群通知。
- 发版留痕来源：
  - **npm tag**：`changeset publish` 给每个发布的包打 tag（如 `@jaytam/antd-ms@2.26.0`），`npm view` 可查。
  - **GitHub Releases / tag**：changesets 的 release commit 自带 tag，GitHub Releases 页面聚合每个版本的 CHANGELOG 条目。
  - **CHANGELOG.md**：根 CHANGELOG 由 `inject-changelog-header.ts` 维护头部，dumi 文档站继续渲染「版本迭代」页。
- 历史脚本 `scripts/trigger-notify.ts` / `scripts/utils/changelog.ts` 的 `generateRobotData` / 根 `package.json` 的 `notify` / `notify:test` 脚本，以及 devDep `axios` 是否还需要，留 Phase E 一并清理评估（若不再有别的用途则删除）。
- 原飞书 webhook 明文写在 `scripts/trigger-notify.ts:7-9` 的安全雷：脚本不再被 CI 调用即不再泄露面增长，但**git 历史里的旧 URL 仍存在**，建议在 Phase E 清理时由 `git filter-repo` 单独处理（可选，因 webhook 在飞书后台作废即可止血）。

## CI 流水线骨架

### `.github/workflows/ci.yml`（PR + push main 的合规 gate）

```yaml
name: ci
on:
  pull_request:
  push: { branches: [main] }
jobs:
  lint:
    {
      runs-on: ubuntu-latest,
      steps: [setup-node@v4, pnpm-action-setup@v4, install, run: pnpm lint],
    }
  test: { runs-on: ubuntu-latest, steps: [..., run: pnpm test] }
  build:
    runs-on: ubuntu-latest
    steps:
      - ...
      - run: pnpm --filter @jaytam/icons icons && git diff --exit-code packages/ms-icons/src/icons # D6 幂等守卫
      - run: pnpm -r build
```

### `.github/workflows/publish.yml`（stable + canary 合流）

```yaml
name: publish
# 单一 workflow 覆盖两条流，绕开 npm 每包一个 publisher 约束（见 D7）。
on:
  push: { branches: [main] }
  workflow_dispatch:
  pull_request: { types: [labeled] }
permissions: { contents: write, pull-requests: write, id-token: write }
jobs:
  stable:
    if: github.event_name == 'push' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    environment: release
    concurrency: { group: release, cancel-in-progress: false }
    steps:
      - uses: actions/checkout@v4 with { fetch-depth: 0 }
      - uses: pnpm/action-setup@v4 with { version: 10.11.0 }
      - uses: actions/setup-node@v4 with { node-version: '24', cache: pnpm, registry: 'https://registry.npmjs.org/' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsx scripts/inject-changelog-header.ts --check
      - uses: changesets/action@v1
        with: { publish: pnpm changeset publish, version: pnpm changeset version && pnpm tsx scripts/inject-changelog-header.ts, commit: chore(release): version packages, title: Version Packages }
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}, NPM_CONFIG_PROVENANCE: 'true' }
  canary:
    if: github.event_name == 'pull_request' && github.event.label.name == 'snapshot'
    runs-on: ubuntu-latest
    environment: snapshot
    concurrency: { group: snapshot-${{ github.event.pull_request.number }}, cancel-in-progress: true }
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4 with { version: 10.11.0 }
      - uses: actions/setup-node@v4 with { node-version: '24', cache: pnpm, registry: 'https://registry.npmjs.org/' }
      - run: pnpm install --frozen-lockfile
      - uses: changesets/action@v1
        with: { publish: pnpm changeset publish --snapshot --tag canary }
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}, NPM_CONFIG_PROVENANCE: 'true' }
      - 以 PR comment 回写本次 canary 版本号清单
```

（`changesets/action` 内部按 merge 检测区分「开 Version PR」vs「publish」；`publish` 前置 `needs: [lint, test, build]` 通过 `ci.yml` 的 required-status-checks 完成门控。）

### Configs 新增/改动

- 新增 `.changeset/config.json`：`{ "changelog": ["@changesets/changelog-github", { "repo": "JayTam/antd-ms" }], "commit": false, "fixed": [], "linked": [], "access": "public", "baseBranch": "main", "updateInternalDependencies": "patch", "ignore": [] }`。
- 新增 `.changeset/README.md`（changesets 模板说明）。
- `scripts/inject-changelog-header.ts`：读取 `.versionrc.js` 那段 frontmatter 头模板，prepend 到根 `CHANGELOG.md`；支持 `--check`（仅校验已存在）。
- `scripts/trigger-notify.ts` / `scripts/utils/changelog.ts` 的 `generateRobotData` / 根 `package.json` 的 `notify` / `notify:test` 脚本：不再被 CI 调用，是否删除留 Phase E 评估（若无别的用途则删，并顺带评估 devDep `axios` 是否还需保留）。
- 根 `package.json` scripts：删 `version:patch/minor/major`、`release:development`；如需可加 `changeset` 便捷 alias。
- 根 `package.json` devDeps：删 `standard-version`。`@aws-sdk/client-s3` 保留（`src/fields/MsPartUpload` 仍在用，原 ADR 称「全仓无引用」有误）。
- `npm` 后台 `@jaytam/*` Trusted Publisher 配置（人工一次性）。
- Vercel 项目配置（人工一次性）。

## 执行迁移顺序（建议）

1. **Phase A - 飞书 webhook 止血**：CI 不再调用 `trigger-notify.ts`，泄露面不再增长；飞书后台作废旧 webhook URL 即止血（本步独立于 CI、可先做）。历史通知脚本是否删除留 Phase E 评估。
2. **Phase B — changesets 接入**：加 `.changeset/`、`inject-changelog-header.ts`、本地跑通 `changeset version` + 注入头，目测根 `CHANGELOG.md` 头部含 dumi frontmatter。
3. **Phase C — OIDC 与工作流落仓**：npm Trusted Publisher 一次性配；`ci.yml` / `publish.yml` 落仓；先以 `workflow_dispatch` 手动触发 `stable` job 跑通一次 dry-run（`NPM_CONFIG_PROVENANCE` 先关），确认 publish 输出正确再开自动。
4. **Phase D — Vercel 接入**：Vercel 项目绑仓、跑通一次 `main` 部署与一个 PR 预览部署。
5. **Phase E — 旧物清理**：删 `release-beta-version.ts`、`release:development`、`version:*` 脚本、`.versionrc.js`、`standard-version`；归档/删除老 DevOps S3 链。
6. **Phase F — 分支保护**：`main` 设必须通过 `ci / lint`、`ci / test`、`ci / build`，禁直推。

## 中止条件 / 回退

- 任何 Phase 失败即止后续并评审；最严重是 Phase C 的 publish 误发——`NPM_CONFIG_PROVENANCE` 先关 + `workflow_dispatch` 手点验证。
- 回退路径：删三个 `.yml` + 还原根脚本 / `.versionrc.js` / `trigger-notify.ts`（git revert 本 ADR 提交），即恢复 ADR-0008 手动链。
- 已发布的 stable 包**不可撤回**（npm `npm unpublish` 72h 窗口外不可），故 Phase C 必须先 dry-run。

## 后果

- 发布链路自动化：`main` 合入 → Release PR → merge → publish + tag + 通知，全程无本机 npm 登录、无长效 token。
- 文档站与 npm 发版解耦：Vercel 直接听 push，docs 与 publish 互不阻塞。
- 安全面：去掉两个明文 webhook + 零长效 npm token；新增 provenance 可追溯。
- 后续 ADR 候选：
  - ADR-0010：OIDC 失败时的 `NPM_TOKEN` 回退与过渡（如 D7 反悔）。
  - ADR-0011：正式 `beta`/`next` prerelease 轨道（`enter/exit prerelease`）。
  - ADR-0012：通知内容适配 changesets —— `trigger-notify.ts` 从 changesets `publishedPackages` outputs 取本次发布内容，弃用 `findCommitByVersion`（依赖 standard-version commit 格式）；并加失败/重发策略与多通道（团队IM + GitHub Release notes）分发。
