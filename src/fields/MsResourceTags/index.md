---
title: resourceTags 资源标签
toc: content
order: 1
group:
  title: 业务组件
  order: 100
---

## 组件介绍

业务中资源标签跟各个实例绑定，但是资源标签数据是从另外的接口获取，该组件提供了两种接口合并的方法，使用 `gri` 从后端获取到资源数据，然后合并到请求响应体的 `data.resource` 中，对原始数据未做任何加工，仅单纯的合并，它不仅仅可用于资源标签，比如资源分组也是可以使用的。

## 何时使用

列表页场景：表格标签筛选，表格单元格展示以及编辑标签。

创建页场景：使用 MsResourceTags.CreateFormListField 拦截用户创建时必填预置标签以及自定义标签。

详情页场景：展示标签字段，以及编辑标签。

## 代码演示

:::warning{title=演示效果仅供参考}

代码演示使用的假数据，请忽略弹出的错误提示，也无法演示完整效果。

:::

<code src="./__demo__/list.tsx"></code>

<code src="./__demo__/create.tsx"></code>

<code src="./__demo__/detail.tsx"></code>

<code src="./__demo__/matrix.tsx"></code>

### 接口版本

默认情况下所有资源接口都使用 `v1` 版本，后续因审计需求要更换成 `v2`，使用如下方法在 `app.tsx` 中调用 `setConfig`。

注意：不能使用 `<MsConfigProvider resourceApiVersion="v2"/>`，这种方法对详情页中 `MsResourceTags.mergeResourceRequest(request)` 不生效。

```tsx | pure
// app.tsx
MsConfigProvider.setConfig({ resourceApiVersion: 'v2' });

export const innerProvider: RuntimeConfig['rootContainer'] = (children: ReactNode) => {
  return <MsConfigProvider>{children}</MsConfigProvider>;
};
```

## API

### fieldProps

| 参数   | 说明                                                     | 类型     | 默认值 |
| ------ | -------------------------------------------------------- | -------- | ------ |
| griKey | 后端返回的资源 ID 的键值，默认是 `gri`，可修改该参数映射 | `string` | `gri`  |

### props

<embed src="../../docs/fields/common/props.md"></embed>

## MsResourceTags

### CreateFormListField

> MsResourceTags.CreateFormListField 创建页的资源标签字段组件

| 参数               | 说明                                         | 类型      | 默认值     |
| ------------------ | -------------------------------------------- | --------- | ---------- |
| resourceTypeCode   | 资源编码（例如：ecs, vpc）                   | `string`  | -          |
| azoneCode          | 可用区编码，有可用区才会请求预置标签         | `string`  | -          |
| vpcResourceCode    | vpc 资源编码（例如：vpc-placeholder6po83sru） | `string`  | -          |
| presetTagsNamePath | 预置标签字段名                               | `string`  | presetTags |
| tagsNamePath       | 自定义标签字段名                             | `string`  | tags       |
| disableTags        | 禁用自定义标签功能                           | `boolean` | -          |
| fullWidthColSpan   | 组件宽度，用栅格布局来设置                   | `number`  | 24         |

### mergeResourceRequest

> MsResourceTags.mergeResourceRequest 合并详情接口

| 位置参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 需要合并的原始 axios 请求方法 | `(params: T) => Promise<any>` | - |
| griKey | 后端返回的资源 ID 的键值，默认是 `gri`，可修改该参数映射 | `string` | `gri` |
| postRes | 对通过 `request` 获取的数据格式进行处理，当后端返回的数据结构跟默认值不匹配时 | `(res: any) => { data: any } \| null` | `(res) => res.data` |
| version | 资源接口版本 | `v1 \| v2` | v1 |

### mergeResourceRequestList

> MsResourceTags.mergeResourceRequestList 合并列表接口

| 位置参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 需要合并的原始 axios 请求方法 | `(params: T) => Promise<any>` | - |
| griKey | 后端返回的资源 ID 的键值，默认是 `gri`，可修改该参数映射 | `string` | `gri` |
| postRes | 对通过 `request` 获取的数据格式进行处理，当后端返回的数据结构跟默认值不匹配时 | `(res: any) => { data: any[] } \| null` | `(res) => res.data.list` |
| version | 资源接口版本 | `v1 \| v2` | v1 |

### mergeResourceRequestMatrix

> MsResourceTags.mergeResourceRequestMatrix 合并二维数组数据的接口，和上面两种方法不同的是这种方式不会改变原数据结构

| 位置参数 | 说明                          | 类型                          | 默认值 |
| -------- | ----------------------------- | ----------------------------- | ------ |
| request  | 需要合并的原始 axios 请求方法 | `(params: T) => Promise<any>` | -      |
| config   | 接口合并相关配置              | `object`                      | -      |

**config**

| 位置参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| listNamePath | 一维数组的访问路径，例如 res.data.list，listNamePath=['data', 'list'] | `NamePath` | - |
| listItemNamePath | 二维数组的访问路径， | `(params: T) => Promise<any>` | - |
| griKey | 后端返回的资源 ID 的键值，默认是 `gri`，可修改该参数映射 | `string` | `gri` |
