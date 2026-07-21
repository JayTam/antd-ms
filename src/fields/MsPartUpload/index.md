---
title: partUpload 分片上传
toc: content
order: 4
debug: true
group:
  title: 业务组件
  order: 100
---

## 如何使用

使用 partUpload 需要在 config.ts 中配置 babel，如下

```ts | pure
extraBabelIncludes: [
    "@aws-sdk/client-s3",
    join(__dirname, "../node_modules/@aws-sdk"),
    join(__dirname, "../node_modules/@smithy"),
  ],
  extraBabelPlugins: [
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-transform-nullish-coalescing-operator"
  ]
```

partUpload 采用依赖注入方式，使用时需自行引入并注册，如下

```ts | pure
import { MsFieldPartUpload } from '@jaytam/antd-ms/lib/esm/components/MsField/components';
import { setField } from '@jaytam/antd-ms';

setField('partUpload', MsFieldPartUpload);
```

## 代码演示

<code src="./__demo__/basic.tsx"></code>

## API

### fieldProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| endpoint | 上传的目标地址 | `sting` | - |
| region | 地域可用区，用`-`链接 | `sting` | - |
| userToken | cookie | `string` | - |
| bucket | 储存桶名 | `sting` | - |
| uploadKey | 文件名，如果在文件夹下上传，需在文件名前面加上文件夹路径 | `string` | - |
| partSize | 分片大小，单位 MB | `number` | 5 |
| progressProps | 进度条 API，更多请参考[此处](https://4x.ant.design/components/progress-cn/#API) | `ProgressProps` | 'upload' |
| uploadStatusChange | 状态变更 | `(data: UploadStatusType) => void` | - |

### UploadStatusType

```ts | pure
UploadStatusType = {
  uploadKey?: string;
  progress?: number;
  status?: '-1' | '0' | '1' | '2' | '3'  // -1上传失败，0待上传， 1上传中，2已暂停，3上传成功
}
```

<embed src="../../docs/fields/common/field-props.md"></embed>

### props

<embed src="../../docs/fields/common/props.md"></embed>
