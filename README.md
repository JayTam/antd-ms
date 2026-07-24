<div align="center">
  <a name="readme-top"></a>

  <img height="120" src="public/svgs/logo.svg" alt="antd-ms logo">

# @jaytam/antd-ms

让中台开发更简单 -- 基于 Ant Design 二次封装的 React 业务组件库。

[![NPM version][npm-image]][npm-url]
[![NPM downloads][download-image]][download-url]
[![CI status][github-action-image]][github-action-url]
[![GitHub stars][stars-image]][stars-url]
[![MIT License][license-image]][license-url]
[![PRs Welcome][prs-welcome-image]][prs-welcome-url]

[文档站点][docs-url] · [组件总览][components-url] · [更新日志](./CHANGELOG.md) · [Report Bug][github-issues-url] · [Request Feature][github-issues-url]

</div>

## ✨ 特性

- 📦 **开箱即用** —— 40+ 业务组件、40+ 字段组件，覆盖中后台高频场景。
- 🛡 **TypeScript** —— 全量 TypeScript 编写，提供完整的类型定义与智能提示。
- 🎨 **主题定制** —— 基于 less 变量与 ConfigProvider，轻松适配业务品牌色。
- 🌍 **国际化** —— 内置多语言能力，支持按需扩展。
- 🧩 **Schema 驱动** —— 配套 schema-render 渲染引擎，配置即页面。
- 📐 **设计规范** —— 统一的设计语言与交互规范，保持中台一致性。

## 🖥 浏览器支持

- 现代浏览器
- 服务端渲染（SSR）

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)<br>Electron |
| :-: | :-: | :-: | :-: | :-: |
| last 2 versions | last 2 versions | 87+ | last 2 versions | last 2 versions |

## 📦 安装

```bash
# npm
npm install @jaytam/antd-ms

# yarn
yarn add @jaytam/antd-ms

# pnpm（推荐）
pnpm add @jaytam/antd-ms
```

## 🔨 使用

```tsx
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
        },
      ]}
      onFinish={async (values) => {
        console.log(values);
      }}
    />
  );
};
```

## 🧩 组件概览

`@jaytam/antd-ms` 提供业务组件、字段组件以及布局、Hooks 等多种能力，全部组件与 API 请查阅[组件总览][components-url]。

### 子包

本仓库采用 pnpm workspace 管理，除主包外还包含以下子包：

| 包名 | 说明 |
| --- | --- |
| [`@jaytam/icons`](./packages/ms-icons) | 图标库 |
| [`@jaytam/schema-render`](./packages/schema-render) | Schema 渲染引擎 |
| [`@jaytam/ms-flow`](./packages/ms-flow) | 流程图组件 |
| [`@jaytam/ms-gantt`](./packages/ms-gantt) | 甘特图组件 |

## 🔗 相关链接

- [文档站点][docs-url]
- [组件总览][components-url]
- [字段总览][fields-url]
- [设计规范](./src/docs/spec)
- [开发指南](./src/docs/guide)
- [更新日志](./CHANGELOG.md)
- [Issues 反馈][github-issues-url]
- [Ant Design 官网](https://ant.design/)

## ⌨️ 开发

推荐使用 Node.js 18+ 与 [pnpm](https://pnpm.io/) 包管理器。

```bash
# 克隆仓库
git clone https://github.com/JayTam/antd-ms.git
cd antd-ms

# 安装依赖
pnpm install

# 启动文档开发服务
pnpm start

# 构建组件库产物
pnpm build

# 构建文档站点
pnpm build:docs

# 代码检查（类型 / ESLint / Prettier）
pnpm lint

# 运行单元测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 使用 Commitizen 规范化提交
pnpm commit
```

打开浏览器访问 `http://127.0.0.1:8000` 即可预览文档站点。

### 提交规范

本项目使用 [Commitizen](https://github.com/commitizen/cz-cli) + [commitlint](https://commitlint.js.org/) 约束 Git 提交信息，请遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范：

```bash
pnpm commit
```

### 技术栈

- [React 18](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Ant Design 4](https://ant.design/)
- [dumi 2](https://d.umijs.org/) 文档站点
- [father 4](https://github.com/umijs/father) 组件库构建
- [Jest](https://jestjs.io/) + [@testing-library/react](https://testing-library.com/) 单元测试

## 🤝 贡献 [![PRs Welcome][prs-welcome-image]][prs-welcome-url]

欢迎参与共建，让 antd-ms 更好。

- 提交 Issue：<https://github.com/JayTam/antd-ms/issues>
- 提交 Pull Request：<https://github.com/JayTam/antd-ms/pulls>
- 提交 PR 前请确保 `pnpm lint` 与 `pnpm test` 通过
- 请阅读 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范后再提交

## 📝 更新日志

详细的版本变更记录请查看 [CHANGELOG.md](./CHANGELOG.md)。

## 💬 讨论

- GitHub Discussions：<https://github.com/JayTam/antd-ms/discussions>
- GitHub Issues：<https://github.com/JayTam/antd-ms/issues>

## 📄 开源协议

[MIT](./LICENSE) © 2025-present [JayTam](https://github.com/JayTam)

<!-- link & image definitions -->

[docs-url]: https://antd-ms.jaytam.cloud
[components-url]: https://antd-ms.jaytam.cloud/components
[fields-url]: https://antd-ms.jaytam.cloud/fields
[github-issues-url]: https://github.com/JayTam/antd-ms/issues
[prs-welcome-url]: https://makeapullrequest.com

[npm-image]: https://img.shields.io/npm/v/@jaytam/antd-ms.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@jaytam/antd-ms
[download-image]: https://img.shields.io/npm/dm/@jaytam/antd-ms.svg?style=flat-square
[download-url]: https://npmjs.org/package/@jaytam/antd-ms
[github-action-image]: https://github.com/JayTam/antd-ms/actions/workflows/ci.yml/badge.svg
[github-action-url]: https://github.com/JayTam/antd-ms/actions/workflows/ci.yml
[stars-image]: https://img.shields.io/github/stars/JayTam/antd-ms.svg?style=flat-square
[stars-url]: https://github.com/JayTam/antd-ms
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/JayTam/antd-ms/blob/main/LICENSE
[prs-welcome-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
