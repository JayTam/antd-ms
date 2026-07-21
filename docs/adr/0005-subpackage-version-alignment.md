# ADR-0005: 子包首次发布版本号与主包 deps 对齐策略

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

三子包均为首次发布（npm 404）。`antd-ms@2.24.1` 的 deps 写的版本与本地 `packages/` 版本存在偏差：

| 子包 | antd-ms deps 现写 | 本地版本 |
|---|---|---|
| `@jaytam/icons` | `0.1.1` | `0.1.0` |
| `@jaytam/request-ms` | `0.0.3` | `0.0.3` |
| `@jaytam/schema-render` | `0.0.1-beta.1` | `0.0.1` |

## 选项

- **①** 严格对齐 antd-ms deps 写的版本（含 schema-render 的 beta tag）。
- **②** 本地版本即首次发布版本，antd-ms deps 改写以对齐。
- **③** 子包各自 minor bump 起步。
- **④** 自定义。

## 决策

采用 **②**：

| 子包 | 首次发布版本 | antd-ms deps 新写法 |
|---|---|---|
| `@jaytam/icons` | `0.1.0` | `"^0.1.0"` |
| `@jaytam/request-ms` | `0.0.3` | `"^0.0.3"` |
| `@jaytam/schema-render` | `0.0.1`（**不带 beta tag**） | `"^0.0.1"` |

## 理由

- 首次发布用最干净的版本号，避免从 0.0.1-beta.1 起步带来的 dist-tag 混乱。
- Caret 范围符合 npm 默认行为，0.x 段会收敛为 `~0.x.0`（仅接 patch bump），稳定。
- schema-render 的 beta tag 经确认非刻意保留，弃用。

## 后果

- 需同步修改 `antd-ms` 的 `package.json` deps 两处：
  - `@jaytam/icons`: `0.1.1` → `^0.1.0`
  - `@jaytam/schema-render`: `0.0.1-beta.1` → `^0.0.1`
- `packages/ms-icons/package.json` 不需要 bump（保持 `0.1.0`）。
- `packages/schema-render/package.json` 不需要降级（保持 `0.0.1`）。
- 三子包发布后，主包 antd-ms 的 deps 必须能 `npm install` 解析成功，否则 ADR-0003 的洋葱发布链路中断。
- 首次发布后，子包任何后续 bump 都要走各自 SemVer；主包若需升级子包范围，单开 PR。