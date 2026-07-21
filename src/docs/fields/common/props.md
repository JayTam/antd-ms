> 通用的 props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| valueType | 字段组件类型，每个类型对应不同组件，[查看所有类型](/fields)。 | [ValueType](/fields) | text |
| fieldProps | 字段组件的相关配置，每个类型对应它相关的配置。 | `根据 valueType 自动推导类型` | - |
| ref | fieldProps.ref 一致，建议在 fieldProps 上使用。 | `string` | - |
| id | fieldProps.id 一致，建议在 fieldProps 上使用。 | `string` | - |
| value | fieldProps.value 一致，建议在 fieldProps 上使用。 | `根据 valueType 自动推导类型` | - |
| onChange | fieldProps.onChange 一致，建议在 fieldProps 上使用。 | `根据 valueType 自动推导类型` | - |
| onBlur | fieldProps.onBlur 一致，建议在 fieldProps 上使用。 | `根据 valueType 自动推导类型` | - |
| mode | 字段组件模式，编辑模式，只读模式 | `edit \| read` | edit |
| editable | 只读模式生效，编辑按钮配置 | `boolean` | - |
| copyable | 只读模式生效，复制按钮配置 | `boolean` | - |
| ellipsis | 只读模式生效，省略配置 | `boolean` | true |
| fieldProps | 字段具体配置，根据 valueType 推导出不同的类型。 | [FieldPropsType](#fieldprops) | - |
