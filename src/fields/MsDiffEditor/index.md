---
title: diffEditor 代码对比
toc: content
order: 7
group:
  title: 输入
---

## 如何使用

使用 codeEditor 和 diffEditor 需要在 config.ts 中配置 monaco-editor-webpack-plugin 插件，如下

```ts | pure
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  chainWebpack: (memo: any) => {
    memo.plugin('monaco-editor-webpack-plugin').use(new MonacoWebpackPlugin());
    return memo;
  },
});
```

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | `number \| string` | 100% |
| height | 高度 | `number \| string` | 100% |
| value | 编辑器对比的代码 | `object` | {original: `string`,modified: `string` } |
| language | 编辑器语言，常见有 `javascript \| css \| html \| json \| typescript `。更多请参考[此处](https://microsoft.github.io/monaco-editor/docs.html#modules/languages.html) | `string` | javascript |
| theme | 编辑器主题 | `vs \| hc-black \| vs-dark` | vs-dark |
| onChange | 编辑器内容发生变化时的回调 | `function(e)` | - |
| editorWillMount | 编辑器挂载之前发生的事件 | `function(editor, monaco)` | - |
| editorDidMount | 编辑器挂载之后发生的事件 | `function(editor, monaco)` | - |
| editorWillUnmount | 编辑器销毁之前发生的事件 | `function(editor, monaco)` | - |
| className | 添加到编辑器的类名 | `string` | - |
| diffChanges | 内容发生变化时，获取对比差异 | `function(changes)` | - |
| options | 创建编辑器的选项 继承 monaco-editor create options。更多请参考[此处](https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html) | `object` | 请参考[此处](#diffeditor-options-部分默认值) |

**diffEditor options 部分默认值**

```jsx | pure
readOnly: true, //只读
minimap: { enabled: false }, // 是否启用预览图
automaticLayout: true, // 自动布局,
overviewRulerBorder: false, // 滚动条的边框
scrollBeyondLastLine: true, //设置编辑器是否可以滚动到最后一行之后
folding: true, //是否折叠
foldingHighlight: true, //折叠等高线
foldingStrategy: 'indentation', //折叠方式
showFoldingControls: 'always', //是否一直显示折叠

```

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>
