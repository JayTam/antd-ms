# Glossary — antd-ms 发布 grilling 术语表

- 维护: 与 ADR 同步更新
- 起始: 2026-07-21

## 发布链路相关

### 死包 (dead package)
指 npm 上一份"装不上"的包，典型成因是 `dependencies` 引用了 npm 上不存在的包（404），导致 `npm install` 失败。`@jaytam/antd-ms@2.24.1` 即是死包——其 deps `@msxf/icons`、`@msxf/request-ms`、`@msxf/schema-render` 在 npm 上 404。

### 洋葱式发布 (onion release)
发布顺序自内而外：先发被依赖的子包，再发依赖方主包。本项目的洋葱顺序为 `@jaytam/icons → @jaytam/request-ms → @jaytam/schema-render → @jaytam/antd-ms`。任何子包未上线则主包不得发，否则再造死包。

### dist-tag
npm 的"分发标签"机制。`latest` 是默认 tag，`beta` / `next` 是常见预发布 tag。`npm install @jaytam/foo` 默认取 `latest` 指向的版本。发布预发布版本（如 `0.0.1-beta.1`）时若不加 `--tag beta`，会让 `latest` 指向一个 prerelease 版本，造成默认安装行为混乱。

### caret range (脱字符范围)
SemVer 的 `^x.y.z` 写法。对 `^1.2.3` 而言接受 `>=1.2.3 <2.0.0`；对 `^0.1.0` 而言收敛为 `>=0.1.0 <0.2.0`（0.x 段左缘为 0，右缘为下一个 minor），等价 `~0.1.0`。本项目三子包版本均在 0.x 段，主包 deps 用 caret 实际效果 = 仅接 patch bump。

### standard-version
一个基于 conventional-commits 自动 bump 版本号、生成 CHANGELOG、commit + tag 的工具。本项目根 `package.json` 有 `version:patch/minor/major` 三个脚本包装它。`-a` 即 `--commit-all` 会把所有未提交改动裹进 release commit。`-n` 即 `--no-verify` 跳过 git hooks（本仓用此标志，但前置 `jest --silent` 仍跑）。

## Node.js 模块系统相关

### ESM (ECMAScript Modules)
ES 官方模块系统，`import` / `export` 静态结构，支持 tree-shaking。Node 中 `.mjs` 或 `package.json` 含 `"type": "module"` 的包走 ESM。father 4 的 `esm` 配置项输出此格式。

### CJS (CommonJS)
Node 原生模块系统，`require` / `module.exports` 动态加载。Node 中 `.cjs` 或默认（无 `type: module`）走 CJS。father 4 的 `cjs` 配置项输出此格式。

### ERR_REQUIRE_ESM
Node 抛的错误：CJS 上下文（`require()`）尝试加载一个 ESM 文件。典型场景：包的 `main` 字段指向了一个 ESM 产物，而消费方在 CJS 上下文。本项目若 schema-render 只出 ESM 且 main 指过去，antd-ms 的 CJS 消费方 require 时就会撞此错。

### ERESOLVE
npm 7+ / pnpm 在依赖树解析时遇到 `peerDependencies` 冲突抛的错误。本项目 schema-render 原 `peer react ^16.8.6` 与主包 devDeps `react ^18` 冲突会触发此错，导致整个 `antd-ms` 安装失败。

## antd 风格产物布局 (antd-style artifact layout)

指 antd 本体在 npm 发布物中使用的目录约定：
- **`es/`** 装 ESM 产物（含 `.d.ts`）
- **`lib/`** 装 CJS 产物
- `package.json`：`main` 指 `lib/index.js`、`module` 指 `es/index.js`、`typings` 指 `es/index.d.ts`

本项目（主包 + 三个子包）经 ADR-0007 拍板统一采用此布局。与"反 antd 写法"（`lib/` 装 ESM、`es/` 装 CJS）相对，后者虽技术上可行但与社区直觉相悖，未采纳。

## 包字段相关

### `files`
`package.json` 的字段，白名单式声明 npm 发布时打包哪些文件/目录。未声明时除 `.npmignore` 排除项外全打包——这是 `@jaytam/antd-ms@2.24.1` unpackedSize 124.9 MB 的成因。本项目主包新增 `files: ["lib","es","README.md","CHANGELOG.md"]`。

### `publishConfig`
`package.json` 的字段，仅对 `npm publish` 生效（不影响本地 install）。典型用途：scoped 包设 `access: "public"` 让其在公网 registry 可匿名拉取（scoped 包 npm 默认 private）。本项目三个子包均补此字段。

### `sideEffects`
`package.json` 的字段，告诉打包工具该包是否"无副作用"，影响 tree-shaking。`false` 或精确文件列表（如 `["*.less"]`）表示其余文件可安全 treeshake。本项目主包 `["*.less"]`、schema-render `false`、ms-icons `["*.less"]`、ms-request `[]`。

### `peerDependencies`
`package.json` 的字段，声明"使用本包时宿主项目必须提供的依赖版本"。本项目 schema-render 原 `react ^16.8.6` 与 antd-ms 主包 `react >=16.9.0` 不兼容是 ADR-0006 的核心议题，最终统一为 `^18.0.0`。

## 工具相关

### father
UmiJS 出的 React 组件库构建工具，本项目用 father 4。支持 `esm` / `cjs` 双产物输出，**esm 产物自带 dts**（本项目 `packages/ms-icons/lib/esm/` 实测 508 个 `.d.ts` 文件）。配置文件 `.fatherrc.ts`。

### dumi
UmiJS 出的组件文档站点工具，基于 father。本项目根目录与 `packages/schema-render` 均有 dumi 配置（`.umirc.ts`），用于本地文档预览与文档站构建，**与 npm 发布物无关**。

### pnpm
本项目包管理器（`packageManager: pnpm@10.11.0`）。支持 workspace（`pnpm-workspace.yaml`）。本项目 build 走 `pnpm build`（pnpm 调 father），但 `npm publish` 走 npm CLI（见 ADR-0008 / 7d-2）。

## 项目特有术语

### @jaytam/* scope
JayTam 个人 npm scope，前身为 `@msxf/*`（马 上 消 费 公司内部 scope）。本仓 debrand 后全部子包与主包统一在 `@jaytam/*` 下。维护者 npm 账户为 `jaytam324`。

### debrand
把代码 / 配置 / 文档中所有原公司标识（`@msxf`、`msxf`、`马上消费` 等）替换为个人标识（`@jaytam`、`JayTam`）的过程。本仓 HEAD 的 `c09b698 chore: debrand 马上消费 references and convert to personal open-source project` 即是这次 debrand 的提交。