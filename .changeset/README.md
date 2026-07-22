# Changesets

本仓库用 [Changesets](https://github.com/changesets/changesets) 管理版本与 CHANGELOG。详见 `docs/adr/0008-release-execution-chain.md` 与 `docs/adr/0009-github-ci-cd-release.md`。

## 添加一个 changeset

任意 PR 里执行（本地）：

```bash
pnpm changeset
```

按交互提示选择：

- 影响哪些包（空格多选）
- bump 级别（major / minor / patch）
- 给使用者看的 changelog 说明文字

会在 `.changeset/` 下生成一个随机名 markdown 文件，随该 PR 一起提交。

## 发布

不要手动 `changeset version` / `changeset publish`。发布走 GitHub Actions `release.yml`：

1. PR 合并到 `main` 后，`changesets/action` 自动开启/更新「Version Packages」PR，把堆叠的 changeset 折叠成版本 bump + CHANGELOG。
2. 合并该 Release PR → `publish` job 自动 `pnpm changeset publish`（经 GitHub OIDC）+ push tags + 通知团队IM群。

## beta / 预览发布

PR 打上 `snapshot` label → `snapshot.yml` 跑 `changeset publish --snapshot --tag canary`，产出形如 `0.0.1-canary-<timestamp>` 的短命预览版本，不污染 `latest`、不写 CHANGELOG、不动 git。

## 版本治理

6 个包（`@jaytam/antd-ms`、`@jaytam/icons`、`@jaytam/request-ms`、`@jaytam/schema-render`、`@jaytam/ms-flow`、`@jaytam/ms-gantt`）均为**独立版本**，未配 `fixed`/`linked` group。内部依赖（如有）按 `updateInternalDependencies: patch` 跟随 patch bump。
