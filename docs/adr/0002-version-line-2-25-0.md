# ADR-0002: 版本号沿 2.x 线，下一版为 2.25.0

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

`@jaytam/antd-ms@2.24.1` 已于 ~3 个月前发布到 npmjs.org。该版本继承了上游 `@msxf/antd-ms` 的版本号，但其 `dependencies` 中引用的 `@msxf/icons`、`@msxf/request-ms`、`@msxf/schema-render` 在 npm 上 404，实际无法安装，属于"死包"。

本次需决定 `@jaytam/antd-ms` 后续发布的版本号策略。

## 选项

- **A. 从 `1.0.0` 重起，`npm deprecate 2.24.1`**：语义最干净，但放弃版本号继承。
- **B. 沿 `2.x` 线，下一版 `2.25.0`（minor）**：承认历史污点，按正常 minor bump 推进，不打扰老版本。
- **C. unpublish `2.24.1` 或换 scope**：技术风险高（npm 72 小时后无法 unpublish），换 scope 等于重建品牌。

## 决策

采用 **B**：下一个发布版本为 **`2.25.0`**（minor）。`2.24.1` 保留在 registry 不做 deprecate，也不做 unpublish。

## 理由

- 版本号继承上游可让既有用户在 `^2` 范围内平滑跳转。
- `2.25.0` 作为首个真正可安装的版本，通过 CHANGELOG 和 README 说明即可，无需破坏既有版本线。
- unpublish 窗口早已关闭，deprecate 会让现有引用直接报红，无必要制造噪音。

## 后果

- 必须避免再次发布"死包"：`2.25.0` 的 `dependencies` 中所有 `@jaytam/*` 包必须**先**在 npm 上存在。
- 后续遵循 SemVer：破坏性改动走 major，新功能走 minor，修复走 patch。
- `standard-version` 配置已就绪（见 `package.json` 的 `version:minor` 脚本）。
