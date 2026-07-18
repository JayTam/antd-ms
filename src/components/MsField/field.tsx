import { SchemaRender } from '@jaytam/schema-render';
import { forwardRef } from 'react';

import type { MsFieldComponentType, MsFieldProps } from './types';

/**
 * MsField 组件，通过 valueType 动态渲染任意 field 组件，它的参数结构和 column 配置接近，是在 column 基础上做的删减
 */
const MsField = forwardRef((props: MsFieldProps<any>, ref: any) => {
  const { valueType = 'text', ...restProps } = props;

  const schema = { component: valueType, valueType, ref, ...restProps };

  return <SchemaRender schema={schema} />;
}) as MsFieldComponentType;

export default MsField;
