---
title: 开发规范
toc: content
order: 2
group:
  order: 10000
  title: 其他
---

# 开发规范

## 版本号规范

在组件库开发过程中可能需要在真实的项目中去调试，优先使用 `yalc` 进行本地调试，确认无误之后再发布正式版本。

如果觉得当前改动比较大，担心发布之后会影响线上环境，可发布先行版本号，待稳定之后再发布正式版本。

```
X.Y.Z
X.Y.Z-T
```

- X 表示主版本号，当 API 的兼容性变化时，X 需递增。
- Y 表示次版本号，当增加功能时(不影响 API 的兼容性)。
- Z 表示修订号，当做 Bug 修复时(不影响 API 的兼容性)，Z 需递增。
- T 先行版本号，先行版本号可以作为发布正式版之前的版本，格式是在修订版本号后面加上一个连接号（-），再加上一连串以点（.）分割的标识符，标识符可以由英文、数字和连接号（[0-9A-Za-z-]）组成。

:::warning

先行版本号只用 `beta`，便于统一化管理和降低维护复杂度。

:::

正式版本号示例: `1.2.3` `1.0.0` `5.2.1`

开发版号本示例: `1.2.3-beta.1` `1.0.0-beta.20` `5.2.1-beta.4`

更多细节请看 <a href="http://semver.org/lang/zh-CN/" target="_blank">语义化版本（Semantic Versioning)</a> （内网被墙）

## Git Message 规范

项目中有配置 `commitizen`项目，执行 `pnpm commit` 之后回答它提出的问题，便可生成规范的 git message。如果命令找不到， 请在 `packages.json scripts` 添加 `"commit": "cz"`。

也可以采用手写的方式遵循以下的规范，例如 `git commit -m "feat(ms-select): 新增 request 参数远程请求可选项目"`

```shell
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```

_type_

- feat: 一项新的功能（feature）
- fix: 一个 bug 的修复
- docs: 仅文档更改
- style: 不会影响代码含义的更改（空格，格式，缺少分号等）
- refactor: 重构（既不修复 bug 也不增加新功能的代码更改）
- perf: 代码优化,提高性能
- test: 添加缺失的测试或更正现有的测试
- build: 影响构建系统或外部依赖项的更改（示例范围:gulp，broccoli，npm）
- ci: 对我们的 CI 配置文件和脚本的更改（示例范围:Circle，BrowserStack，SauceLabs）
- chore: 其他不包含 src 和 test 文件的修改
- revert: 恢复上一个 commit

_scope_

用于说明 commit 影响的范围，比如相关模块或组件的类型、名称。例如：

```
fix(ms-select):
chore(deps):
chore(build):
```

_subject_

commit 的简单描述，不超过 50 个字符 - 以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes - 第一个字母小写 - 结尾不加句号（.）

```
fix(ms-select): 修复 postRes 属性默认参数不兼容问题
chore(deps): 更新 moment 至 2.24.0 版本
chore(build): 修改生产环境命令配置
```

_body_

Body 对本次 commit 的详细描述

```
fix(ms-select): 修复 postRes 属性默认参数不兼容问题

默认 postRes 只处理了 res 映射到 {label: string, value: string | number} 类型，现在额外增加 text 属性变成 {label: string, text: string, value: string | number} 兼容更多场景
```

_footer_

Footer 部分只用于两种情况。

- 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。

```
fix(ms-select): 统一远程数据请求方式

BREAKING CHANGE: url 和 transform 参数被替换成 request, params 和 postRes，统一成标准的方式，原来的 props 废弃掉

```

- 关闭 Issue 或者 bug

如果当前 commit 针对某个 issue 或者 bug ，那么可以在 Footer 部分关闭。

```
fix(ms-select): 修复 postRes 属性默认参数不兼容问题

fix #123
```
