---
title: richText 富文本
toc: content
order: 5
group:
  title: 输入
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/rich-text-catalog.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认值 | `sting` | - |
| editorChange | 编辑器的内容改变的事件 | `(editorInstance: IDomEditor) => void` | - |
| onCreated | 编辑器实例化时的事件 | `(editorInstance: IDomEditor) => void` | - |
| style | 富文本样式 | `CSSProperties` | - |
| className | 富文本的 className | `string` | false |
| readOnly | 是否只读,只要传入都会导致`取消`和`编辑`按钮隐藏 | `boolean` | - |
| minHeight | 编辑器最小高度 | `string` | '300px' |
| toolbar | 是否显示工具栏 | `boolean` | true |
| toolbarConfig | 工具栏配置，继承[IToolbarConfig](https://www.wangeditor.com/v5/toolbar-config.html) | `IToolbarConfig` | false |
| toolbarMode | 工具栏模式 | `default` \| `simple` | default |
| toolbarStyle | 工具栏样式 | `CSSProperties` | - |
| editorConfig | 编辑器的配置,继承[IEditorConfig](https://www.wangeditor.com/v5/editor-config.html) | `IEditorConfig` | - |
| editorMode | 编辑器的模式 | `default` \| `simple` | default |
| editorStyle | 编辑器的样式 | `CSSProperties` | false |
| imageServer | 图片上传的服务地址 | `string` | - |
| showEditMenu | 是否显示编辑按钮，当传入`readOnly`时失效 | `boolean` |  |
| editText | 刷新按钮文字 | `boolean` | 编辑 |
| showCancelMenu | 是否显示取消按钮，当传入`readOnly`时失效 | `boolean` | true |
| cancelText | 取消按钮文字 | `string` | 取消 |
| onCancel | 点击取消按钮事件 | `(data: string)=>void` | - |

编辑器所有菜单可参考以下 key，也可参考[菜单配置](https://www.wangeditor.com/v5/menu-config.html)

`bold`, `underline`, `italic`, `through`, `code`, `sub`, `sup`, `clearStyle`, `color`, `bgColor`, `fontSize`, `fontFamily`, `indent`, `delIndent`, `justifyLeft`, `justifyRight`, `justifyCenter`, `justifyJustify`, `lineHeight`, `insertImage`, `deleteImage`, `editImage`, `viewImageLink`, `imageWidth30`, `imageWidth50`, `imageWidth100`, `divider`, `emotion`, `insertLink`, `editLink`, `unLink`, `viewLink`, `codeBlock`, `blockquote`, `headerSelect`, `header1`, `header2`, `header3`, `header4`, `header5`, `todo`, `redo`, `undo`, `fullScreen`, `enter`, `bulletedList`, `numberedList`, `insertTable`, `deleteTable`, `insertTableRow`, `deleteTableRow`, `insertTableCol`, `deleteTableCol`, `tableHeader`, `tableFullWidth`, `insertVideo`, `uploadVideo`, `editVideoSize`, `uploadImage`, `codeSelectLang`, `ms-full-screen`, `ms-reduce-screen`, `ms-edit`, `ms-cancel`

编辑器工具栏菜单组可参考以下 key

`group-more-style`, `group-justify`, `group-indent`, `group-image`, `group-video`

FAQ

在主应用下弹窗中使用富文本编辑器如果遇到以下报错

<div align="left">
<img src="/MsField/richError.jpeg" width="50%">
</div>

:::info{title=解决方案}

可修改弹窗的挂载节点到该子应用下。例如：getContainer: document.getElementById('gc-buy-fe')

:::

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>
