---
title: upload 上传
toc: content
order: 7
group:
  title: 选择
---

## 代码演示

<code src="./__demo__/basic.tsx"></code>

<code src="./__demo__/read.tsx"></code>

<code src="./__demo__/drawer.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| uploadRender | 上传按钮 | `ReactNode \| (loading: boolean) => ReactNode` | 'upload' |
| uploadType | 上传方式，默认点击上传，profile 头像上传, dragger 拖拽上传 , draggerPaste 支持粘贴、拖拽、点击多种方式上传| `profile` \| `dragger` | `draggerPaste`|
| uploadSuffixRender | 在上传按钮之后渲染的节点，上传方式为`默认点击上传`时生效 | `ReactNode` | - |
| postRes <Badge>2.21.6+</Badge> | 处理上传接口的回调函数 | `(res: any) => {url: string}` | '(res) => res.data' |
| [...UploadProps](https://4x.ant.design/components/upload-cn/#API) | 继承 Antd Upload |  |  |

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>
