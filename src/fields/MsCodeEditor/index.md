---
title: codeEditor 代码输入
toc: content
order: 6
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

使用 codeEditor 和 diffEditor 如果需要在初始化时格式化代码，请参考以下两种方式

```ts | pure
// 方法一： value传入以下格式化之后的字符串
const newValue = JSON.stringify(value, null, '\t');

// 方法二： 在fieldProps中配置editorDidMount
const fieldProps = {
  editorDidMount: (editor, monaco) => {
    setTimeout(() => {
      editor?.getAction('editor.action.formatDocument').run();
    }, 100);
  };
}
```

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 编辑器宽度 | `number \| string` | 100% |
| height | 编辑器高度 | `number \| string` | 100% |
| value | 编辑器展示的代码 | `string` | - |
| language | 编辑器语言，常见有 `javascript \| css \| html \| json \| typescript `。更多请参考[此处](https://microsoft.github.io/monaco-editor/docs.html#modules/languages.html) | `string` | javascript |
| theme | 编辑器主题 | `vs \| hc-black \| vs-dark` | vs-dark |
| onChange | 编辑器内容发生变化时的回调 | `function(e)` | - |
| editorWillMount | 编辑器挂载之前发生的事件 | `function(editor, monaco)` | - |
| editorDidMount | 编辑器挂载之后发生的事件 | `function(editor, monaco)` | - |
| editorWillUnmount | 编辑器销毁之前发生的事件 | `function(editor, monaco)` | - |
| className | 添加到编辑器的类名 | `string` | - |
| options | 创建编辑器的选项 继承 monaco-editor create options。更多请参考[此处](https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html) | `object` | 请参考[此处](#codeeditor-options-部分默认值) |

**codeEditor options 部分默认值**

```jsx | pure
readOnly: false, //是否只读
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
