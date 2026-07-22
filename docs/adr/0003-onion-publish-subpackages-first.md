# ADR-0003: 洋葱式发布——子包先于主包上 npm

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

`@jaytam/antd-ms` 的 `dependencies` 硬依赖三个 `@jaytam/*` 子包：

| 依赖                    | antd-ms deps 写的版本 | 本地 `packages/` 里的版本 | npm 现状   |
| ----------------------- | --------------------- | ------------------------- | ---------- |
| `@jaytam/icons`         | `0.1.1`               | `0.1.0`                   | 404 不存在 |
| `@jaytam/request-ms`    | `0.0.3`               | `0.0.3`                   | 404 不存在 |
| `@jaytam/schema-render` | `0.0.1-beta.1`        | `0.0.1`                   | 404 不存在 |

上一版 `2.24.1` 之所以是死包，正是因为它的 deps `@msxf/*` 在 npm 上 404。本次必须避免重蹈覆辙。

## 选项

- **A. 洋葱式发布**：子包先发到 npm，主包后发；发布顺序自下而上。
- **B. 子包内联进主包产物**：从 `dependencies` 移除，通过 father `alias` 编译进 `lib/esm`。前提是子包不被其它项目复用。
- **C. 子包转 peer/optional**：用户自行安装，基本等同于制造新死包。
- **D. 走 git URL / private registry / 砍掉 schema-render**：变体方案。

## 决策

采用 **A**：**洋葱式发布**。先依次发布 `@jaytam/icons` → `@jaytam/request-ms` → `@jaytam/schema-render` 到 npmjs.org，待三者均有可用版本后，再发布 `@jaytam/antd-ms@2.25.0`。

## 理由

- 子包已是独立 package（`packages/*` 有各自 `package.json`），独立发布成本低。
- 保留子包独立性，便于其它项目按需引用，也便于子包独立演进。
- 把"依赖在 npm 上必须存在"这条硬约束显式化，杜绝再次发布死包。

## 后果

- 三个子包各自要过"发布就绪"这一关：`files` 字段、`publishConfig`、构建产物、`npm whoami` 登录、版本号策略。详见后续 ADR。
- 主包 `antd-ms` 的 deps 版本必须与子包实际发布的版本对齐（详见 ADR-0005）。
- 发布顺序固定：**icons → request-ms → schema-render → antd-ms**，不可乱序。
- 任何子包发布失败，整个发布链路阻塞。
