# Issue 追踪：GitHub

本仓库的 Issue 和 PRD 存放在 GitHub issue 中。所有操作使用 `gh` CLI。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`，多行 body 用 heredoc。
- **查看 issue**：`gh issue view <number> --comments`，可用 `jq` 过滤评论并取标签。
- **列出 issue**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，按需加 `--label` 和 `--state` 过滤。
- **评论**：`gh issue comment <number> --body "..."`
- **加/删标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭**：`gh issue close <number> --comment "..."`

仓库从 `git remote -v` 自动推断，`gh` 在 clone 内运行时会自动识别。

## Pull request 作为 triage 入口

**PR 作为请求入口：否。** _（若本仓库把外部 PR 当作功能请求，设为 `yes`；`/triage` 会读这个开关。）_

设为 `yes` 时，PR 走和 issue 相同的标签与状态机，命令换成 `gh pr` 等价物：

- **查看 PR**：`gh pr view <number> --comments`，`gh pr diff <number>` 取 diff。
- **列出待 triage 的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，仅保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的（去掉 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **评论/标签/关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issue 和 PR 共用一套编号空间，所以裸 `#42` 可能是任一 - 用 `gh pr view 42` 解析，失败再 `gh issue view 42`。

## 当 skill 说"发布到 issue 追踪器"

创建一个 GitHub issue。

## 当 skill 说"取相关 ticket"

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

供 `/wayfinder` 使用。**map** 是一个带子 issue 作为 ticket 的单一 issue。

- **Map**：一个标签为 `wayfinder:map` 的 issue，body 持有 Notes / Decisions-so-far / Fog。`gh issue create --label wayfinder:map`。
- **子 ticket**：作为 GitHub sub-issue 链到 map 的 issue（`gh api` 走 sub-issues 端点）。若 sub-issue 未启用，把子项加到 map body 的 task list，并在子 body 顶部写 `Part of #<map>`。标签：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。一旦被认领，ticket assign 给驱动的开发。
- **阻塞关系**：GitHub 的**原生 issue 依赖** - UI 可见的规范表示。加边：`gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`，其中 `<blocker-db-id>` 是 blocker 的数字 **数据库 id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，_不是_ `#number` 或 `node_id`）。GitHub 通过 `issue_dependencies_summary.blocked_by` 报告（仅 open blocker - 实时门）。若依赖不可用，回退到子 body 顶部的 `Blocked by: #<n>, #<n>` 行。一个 ticket 在所有 blocker 关闭后即解除阻塞。
- **Frontier 查询**：列出 map 的 open 子项（`gh issue list --state open`，限定到 map 的 sub-issue / task list），去掉有 open blocker（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` 行里有 open issue）或有 assignee 的；按 map 顺序第一个胜出。
- **认领**：`gh issue edit <n> --add-assignee @me` - 会话的第一个写操作。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，最后把一个上下文指针（gist + 链接）追加到 map 的 Decisions-so-far。
