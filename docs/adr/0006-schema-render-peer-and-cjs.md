# ADR-0006: schema-render 的 react peer 与 cjs 产物策略

- 状态: Accepted（已修订）
- 日期: 2026-07-21
- 修订: 2026-07-21 —— 统一为 antd 风格 `es/` + `lib/` 路径（与 ADR-0007 同步）
- 决策者: JayTam

## 背景

`packages/schema-render` 当前存在两处在与 `antd-ms@2.25.0` 联动时会致死的发布缺陷：

1. **`peerDependencies` 锁 `react ^16.8.6`** —— 与 antd-ms 主包 peer `react >=16.9.0`、本仓 devDeps `react ^18.0.0` 相互冲突，npm/pnpm 7+ 会在安装 `antd-ms` 时报 `ERESOLVE`，用户装不上，等同再造一份死包。
2. **只出 ESM 产物**（`.fatherrc.ts` 仅 `esm: { output: 'dist' }`，且 `main` 和 `module` 都指向 `dist/index.js`）—— antd-ms 主包同时出 esm + cjs，其 cjs 消费方 require schema-render 时会遇到 Node 的 `ERR_REQUIRE_ESM`。

## 选项

**peerDependencies 维度**：

- **A.** `^16.8.0 || ^17.0.0 || ^18.0.0` —— 三段兼容。
- **B.** `^18.0.0` —— 跟随 antd-ms 主包当前支持版本，放弃 16/17。✅ 采用
- **C.** `>=16.8.0`（无上限）。

**产物维度**：

- **B1.** 补 cjs 产物，采用 antd 风格目录布局。✅ 采用
- **B2.** ESM-only，改纯 ESM 包写法（cjs 消费方会炸）。
- **B3.** 自定义。

**目录布局维度**（本次修订新增，详见 ADR-0007）：

- 最初拟用 `dist/lib` + `dist/es`，但与 antd-ms 主包选定风格不一致。
- 修订后统一为 antd 本体风格：**`es/` 装 ESM 产物**、**`lib/` 装 CJS 产物**。

## 决策

- **peer**：`"react": "^18.0.0"`，与 antd-ms 主包保持一致。
- **产物**：同时输出 cjs + esm，目录布局对齐 antd 本体风格。

具体改动：

`packages/schema-render/.fatherrc.ts`：

```ts
import { defineConfig } from 'father';

export default defineConfig({
  esm: {
    output: 'es',
  },
  cjs: {
    output: 'lib',
  },
});
```

`packages/schema-render/package.json` 关键字段：

- `"main": "lib/index.js"`（cjs 入口）
- `"module": "es/index.js"`（esm 入口）
- `"typings": "es/index.d.ts"`（随 esm 产物出 dts，由 father 4 自动生成）
- `"files": ["es", "lib", "README.md"]`
- `"peerDependencies": { "react": "^18.0.0" }`
- `"build": "father build"`（**移除原先的 tsc --emitDeclarationOnly**，father 4 的 esm 产物自带 dts，详见 ADR-0007 中 6a-A 的验证）
- 同步补充 `homepage` / `bugs` / `repository` / `author` 元数据，与其它两个子包对齐（ADR-0007 / 6c）
- 同步加 `publishConfig`（ADR-0007 / 6b）

## 理由

- peer `^18.0.0` 是 antd-ms 主包当前唯一承诺支持的 React 版本，schema-render 跟随主包收紧 peer 区间，可消除 ERESOLVE。
- `lib/` + `es/` 与 antd 既有发布物布局一致，与 antd-ms 主包风格统一（见 ADR-0007 的最终选定），便于仓库内整体风格统一，也便于打包工具按字段名正确取入口。
- cjs + esm 双产物可同时服务 cjs 消费方与 esm 消费方，避免 ERR_REQUIRE_ESM。
- 删除 tsc 那一步的原因见 ADR-0007 / 6a-A：father 4 的 esm 产物自带 dts（已在 packages/ms-icons/lib/esm 验证存在 508 个 `.d.ts`）。

## 后果

- schema-render 发布物体积略增（多一份 cjs），但死包风险解除。
- 不再支持 React 16/17 — 这是首次发布，无外部安装用户受影响，可接受。
- 旧的 `dist/` 目录不再生成，已从工作树清理（gitignore 已覆盖 `packages/*/dist/`，且为新 `packages/*/es/` 加 ignore）。
- 所有 antd-ms 用户群体获得一致的 React 18 安装体验。
