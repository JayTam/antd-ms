# ADR-0007: 子包发布就绪清单（6a-A / 6b / 6c / 6d / 6e）+ 主包 antd 风格产物布局

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

ADR-0006 决定 schema-render 补 cjs + 改 peer，但在动手过程中暴露出更广层的"发布就绪"问题：所有子包缺 `publishConfig`、schema-render 缺元数据、antd-ms 主包缺 `files` 字段、主包与子包产物目录布局不统一、schema-render 的 build 脚本存在冗余 tsc。本 ADR 是把所有"独立小雷"一次归档。

此外，原 ADR-0006 拟用 `dist/lib` + `dist/es` 给 schema-render，经一轮 grill 后用户拍板：**主包与所有子包均统一为 antd 本体风格** —— `es/` 装 ESM、`lib/` 装 CJS。本 ADR 把这一布局决策与五项小雷合并归档。

## 决策

### 6a — schema-render 的 build 脚本

- **6a-A**：删除原 `tsc --emitDeclarationOnly --declaration --outDir dist`，build = `"father build"`。
- **验证**：father 4 的 esm 产物自带 dts。在 `packages/ms-icons/lib/esm` 实测存在 508 个 `.d.ts`，可信。

### 6b — 三个子包 `publishConfig`

- `@jaytam/icons`、`@jaytam/request-ms`、`@jaytam/schema-render` 三个 `package.json` 均新增：
  ```json
  "publishConfig": { "access": "public", "registry": "https://registry.npmjs.org/" }
  ```
- antd-ms 主包已有 `publishConfig`，不变。

### 6c — schema-render 元数据补齐

- 原 schema-render 的 `package.json` 缺 `homepage` / `bugs` / `repository` / `author`。
- 复用 antd-ms 主包那套（`https://github.com/JayTam/antd-ms`、`JayTam`），与其它两个子包对齐。

### 6d — antd-ms 主包 deps 对齐

按 ADR-0005 执行：

- `@jaytam/icons`: `"0.1.1"` → `"^0.1.0"`
- `@jaytam/request-ms`: 保持 `"^0.0.3"`（原本即 `0.0.3`，本轮补 caret 表示符）
- `@jaytam/schema-render`: `"0.0.1-beta.1"` → `"^0.0.1"`

### 6e — antd-ms 主包 `files` 字段

- 原主包无 `files`，上一次发布 unpackedSize 124.9 MB（含源码）。
- 新增：
  ```json
  "files": ["lib", "es", "README.md", "CHANGELOG.md"]
  ```
- 子包同步：`["es", "lib", "README.md"]`（子包无独立 CHANGELOG.md）。

### 配套决策 — 主包 + 所有子包产物布局统一为 antd 风格

| 文件 | 改动 |
| --- | --- |
| 根 `.fatherrc.ts` | `esm: { output: 'es' }`、`cjs: { output: 'lib' }` |
| 根 `package.json` | `main: "lib/index.js"`、`module: "es/index.js"`、`typings: "es/index.d.ts"` |
| `packages/ms-icons/.fatherrc.ts` | 同主包（`es` + `lib`） |
| `packages/ms-icons/package.json` | 入口字段对应改动；`files` 改为 `["es","lib","README.md"]`；加 `publishConfig` |
| `packages/ms-request/.fatherrc.ts` | 同上 |
| `packages/ms-request/package.json` | 同上 |
| `packages/schema-render/.fatherrc.ts` | 同主包（替换原 `dist/`） |
| `packages/schema-render/package.json` | 入口字段、files、peer、build、元数据、publishConfig 全比重写 |
| `.gitignore` | 新增 `packages/*/es/`（原仅有 `packages/*/lib/` 和 `packages/*/dist/`） |

### 配套清理

- 已 `rm -rf packages/schema-render/dist`（旧产物，被 gitignore，不影响 git 历史）。

## 理由

- 通过 grill 验证 father 4 esm 自带 dts，tsc 那一步是历史包袱，删除后简化构建链路、避免 `dist/` 与 `dist/es/` 双份 dts 的歧义。
- 三子包 `publishConfig` 默认 `access: "public"`，是为了让 scoped 包（`@jaytam/*`）在公网 registry 上能被匿名拉取（scoped 包默认 private）。
- 主包 `files` 字段让人只发布构建产物 + 文档，避免再次发出 124.9 MB 死胖包。
- antd 风格 `es/` + `lib/` 命名直觉符合社区习惯（与 antd、antd-mobile、pro-components 等一致），未来接手者无需脑回路切换。

## 后果

- 已完成代码改动：根 `.fatherrc.ts`、根 `package.json`、根 `.gitignore`、三个子包的 `.fatherrc.ts` + `package.json`、schema-render 删除旧 `dist/`。
- ADR-0006 中"dist/lib + dist/es"路径方案作废（已被本 ADR 的"`es/` + `lib/`"覆盖），ADR-0006 已按本 ADR 修订。
- 后续发布前必须实测：`pnpm build` 后 `es/` 与 `lib/` 都生成、`es/index.d.ts` 可被 TS 项目解析、`require('@jaytam/antd-ms')` 走 `lib/index.js` 不报 ERR_REQUIRE_ESM。
- 后续发布前必须验证：所有子包的 `publishConfig.access: "public"` 真的让 scoped 包可匿名安装。
- 主包与子包的 `tsconfig.json` `exclude` 已含 `es` / `lib` / `dist`，无需调整。
