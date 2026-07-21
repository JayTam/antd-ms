> 远程请求枚举的通用 props

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| valueEnum | 值的枚举，支持三种数据结构 object, map 和 array | `ValueEnum` | - |
| valueEnumFiledNames | valueEnum 为数组类型时，自定义值的 label、value 字段 | `{ label: string, value: string, children: string }` | { label: label, value: value, children: children } |
| request | 远程获取 `valueEnum` 的方法 | `(params: object) => Promise<any>` | - |
| skipRequest | 控制是否跳过触发 `request` | `(params: object) => boolean` | - | 2.21.11 |
| params | 用于 `request` 查询的额外参数，一旦变化会触发重新加载 | `object \| (form) => object` | - |
| postRes | 对通过 `request` 获取的数据格式进行处理，若后端返回的数据结构跟默认值不匹配，可在 `ConfigProvider` 重设默认值 | `(res) => {data: object \| array}` | - |
| initialRequest | 用来控制是否初始化请求 | `boolean` | true |
| focusRequest | 聚焦时候发起 `request`。注意开启完全由聚焦触发请求，其他控制请求的手段将失效。 | `boolean` | - |
| debounceTime | 远程获取 `valueEnum` 的防抖时间 | `number` | 100 |
| cacheRequest | 默认会根据 `id + params` 的值作为 key，缓存远程请求 `valueEnum` | `boolean` | true |
