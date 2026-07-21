# ADR-0009: jest demo snapshot 维护策略

- 状态: Accepted
- 日期: 2026-07-21
- 决策者: JayTam

## 背景

`@jaytam/antd-ms@2.25.0` 发布过程中（见 ADR-0008 / Phase 6），`pnpm version:minor` 跑 `jest --silent` 时遇到 40 个 snapshot 失败：

```
40 snapshots failed from 10 test suites
src/tests/shared/demoTest.tsx:47 → expect(container).toMatchSnapshot()
```

根因排查结论：

1. `jest.config.ts` 的 `moduleNameMapper` 有规则 `'^.*.svg$': '<rootDir>/src/tests/mock/svg.ts'`，把所有 `.svg` import 替换成 `src/tests/mock/svg.ts` 导出的空 SVG mock。
2. `src/tests/mock/svg.ts` 实现为：

   ```ts
   const SvgMock = ({ ...props }) =>
     React.createElement('svg', {
       ...props,
       dangerouslySetInnerHTML: { __html: '' },
     });
   ```

   即 SVG 被渲染成**没有任何 path 子节点的空 svg 元素**。
3. 历史 snapshot 是在某一时期（svg mock 尚未引入、或 mock 实现不同）下 `toMatchSnapshot()` 录下的，里面包含完整的 `<svg><path d="..."/></svg>` 内联路径。
4. 历经 jest 配置演变后，现存 snapshot 与现行 svg-mock 行为不一致，导致每次跑 jest 都报 40 个失败。

这一类失败属于"测试基础设施与快照预期脱节"，而非业务代码缺陷。本次发布已用 `pnpm jest -u` 更新 10 个 `.snap` 文件以对齐现行行为（commit `5f99933`），但这只是一次性补漏。本 ADR 把策略固化下来，避免下次再发生。

## 选项

- **A. 保持现状，遇到失败再跑 `-u` 一次性更新**：被动式维护，每次发生时由开发者判断"是否合理"。**反对**：会反复浪费排查时间，且容易把真实回归当成"mock 差异"误更新。
- **B. 明确 jest 配置与 snapshot 维护策略，文档化**（本 ADR）：把 svg mock 行为、demo snapshot 录制边界、`-u` 使用门槛写进 ADR，并在 README/CONTRIBUTING 里指明。
- **C. 拆分 demo snapshot，砍掉 SVG 内联路径断言**：让 demoTest 改成只断言 DOM 结构不僵化 SVG path。代价：要改测试基础设施，工作量大，可能降低 demo 回归能力。
- **D. 引入 `react-test-renderer` 并启用 `stripInlineStyles` 等过滤器**：治标但未治本，对 SVG 内容断言仍敏感。

## 决策

采用 **B**：把 jest 配置与 snapshot 维护策略文档化，并通过本 ADR 作权威依据。

具体维护策略：

### 1. SVG mock 行为契约

`src/tests/mock/svg.ts` 的现行契约是**渲染成空 svg 元素**（带 `dangerouslySetInnerHTML: {__html: ''}`）。

- **不修改**此 mock 的实现，除非同时更新所有依赖此 mock 的 snapshot。
- 任何修改 `src/tests/mock/svg.ts` 的 PR，**必须**在 PR 描述里说明 mock 行为变化，并附 `pnpm jest -u` 后的 `.snap` diff 摘要。

### 2. demo snapshot 录制边界

`src/tests/shared/demoTest.tsx` 是为 `components/<Name>/__demo__/*.tsx` 自动生成 demo snapshot。snapshot 内容预期：

- **DOM 结构**（class、层级、文本）
- **空 SVG 占位**（不期望 path 内联 path d 属性）

### 3. snapshot 更新门槛

snapshot 失败时按以下顺序判断：

1. **先看 diff**：如果是 svg path 内联被去掉、纯结构无变化，属于"mock 行为差异"，可用 `pnpm jest -u` 更新。
2. **看 demo 是否真改了**：如果是 `__demo__/*.tsx` 文件本身变化导致 DOM 结构不同，必须由进行 demo 改动的同一个 PR 一并更新 snapshot。
3. **禁止机械式 `-u`**：在不看 diff 的情况下批量 `pnpm jest -u` 是反模式。任何 `-u` 必须配套提交说明，列出 `.snap` 文件名 + diff 性质摘要。

### 4. jest 配置改动门槛

修改 `jest.config.ts` 的 `moduleNameMapper`、`testEnvironment`、`transform` 任一一项，PR 描述必须写明：

- 触发该 change 的原因
- 影响 snapshot 数量
- 是否需要批量 `-u`

### 5. CI 落地（候选）

未来若上 CI，应在 CI 上跑 `pnpm test -- -ci`（`--ci` 让 jest 在 snapshot 不匹配时直接 fail 而不写新 snapshot）。这条暂不在本 ADR 强制要求，等 ADR-0010 CI 化时一并固化。

## 理由

- jest demo snapshot 是回归防线，但当前 svg mock 行为与历史 snapshot 不一致的根本问题不能靠频繁 `-u` 来掩盖，必须文档化。
- 把"mock 契约"写明后，后续维护者可以快速判断失败性质，节省排查时间。
- 不修改 `src/tests/mock/svg.ts` 是为了保持测试输出的稳定性 —— 频繁变 mock 会让所有 demo snapshot 一起翻车，得不偿失。

## 后果

- `src/tests/mock/svg.ts` 进入"半冻结"状态，改动需走 ADR 流程。
- 任何 PR 改动 `__demo__/*.tsx` 必须同时更新对应 `.snap` 文件，否则 CI 失败（待 CI 上线后）。
- `standard-version` 流程前置的 `jest --silent` 不会再因 svg-mock 差异被拦截。
- 后续若 demoTest 框架本身要重构，需新开 ADR 替换本 ADR。

## 关联

- 历史事件：commit `5f99933` "test: update demo snapshots to reflect current svg-mock behavior in jest"
- 关联 ADR：ADR-0008 / Phase 6（发布执行链路）