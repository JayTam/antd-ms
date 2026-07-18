import { transformToStringDeep } from '@jaytam/antd-ms/utils';
import {} from '@jaytam/schema-render';
import type { FormInstance, FormItemProps } from 'antd';
import { isFunction, isNil, omit } from 'lodash-es';
import { LIST_VALUE_TYPES } from '../../constants';
import type { MsFormColumnType } from '../../types';
import ContentSkeleton from './Skeletons/ContentSkeleton';
import LabelSkeleton from './Skeletons/LabelSkeleton';
import { parseInitialValue } from './initialValueUtil';

type ComposeSchemaType = {
  col: any;
  formItem?: any;
  field: any;
};

/**
 * 组合 col, formItem, field 组件的 schema，生成 column schema
 * @param column 表单列配置
 * @param schemas
 * @returns column schema
 */
export function composeColumnSchema(
  column: MsFormColumnType,
  { col, formItem, field }: ComposeSchemaType,
) {
  if (isNil(formItem)) {
    return {
      component: 'col',
      ...(isFunction(column._colProps) ? column._colProps(col) : col),
      children: {
        ...omit(field, '_colProps', '_formItemProps', '_fieldProps'),
        fieldProps: isFunction(column._fieldProps)
          ? column._fieldProps(field.fieldProps)
          : field.fieldProps ?? {},
      },
    };
  }

  return {
    component: 'col',
    ...(isFunction(column._colProps) ? column._colProps(col) : col),
    children: {
      ...(isFunction(column._formItemProps) ? column._formItemProps(formItem) : formItem),
      component: 'formItem',
      children: {
        ...omit(field, '_colProps', '_formItemProps', '_fieldProps'),
        fieldProps: isFunction(column._fieldProps)
          ? column._fieldProps(field.fieldProps)
          : field.fieldProps ?? {},
      },
    },
  };
}

/**
 * 给 columnSchema 生成 loading 效果
 */
export function generateLoadingColumnSchema(schema: any, component: string, loading: boolean) {
  if (loading) {
    schema.children.label = <LabelSkeleton />;
    schema.children.colon = false;
    schema.children.tooltip = null;
    schema.children.extra = null;
    schema.children.required = false;
    if (!LIST_VALUE_TYPES.includes(component)) {
      schema.children.children = <ContentSkeleton />;
    }
  }
  return schema;
}

/**
 * 处理可能为函数的属性
 * @param property 属性名
 * @param column 经过默认值处理过的 column
 * @param originColumn 原始的表单的 column
 * @param formInstance 表单实例
 * @param valuesNormal 值是否转换字符串
 * @returns
 */
export const getPropertyMaybeFunction = (
  property: 'formItemProps' | 'params' | 'fieldProps',
  column: MsFormColumnType,
  originColumn: MsFormColumnType,
  formInstance: FormInstance,
  valuesNormal?: boolean,
) => {
  const originProp = originColumn[property];
  const prop = column[property] ?? {};

  const newProp = isFunction(originProp) ? originProp(formInstance) : column[property];

  if (property === 'formItemProps') {
    // 当 column.formItemProps 为函数，newProp 中不会有 initialValues, prop 中有，initialValues 会被覆盖，所以用column.initialValue兜底
    const initialValue = newProp.initialValue ?? column.initialValue;
    newProp.initialValue = parseInitialValue(initialValue, originColumn, valuesNormal);
  }

  return { ...prop, ...newProp };
};

/**
 * 处理 list 的 FormItem Schema，剔除 FormList 需要的三个参数 'rules', 'name', 'initialValue'。
 * 剔除 names：Form.List 父组件 FormItem 只是用作样式布局，如果加了 name 会自动注入受控属性，在 list 下任意组件发生变更都会引起 reRender 严重影响性能
 * 重命名 name: 在 FormItem dependence 之下的 FormItem 必须设置 name，不然会报错，所以设置一个占位的 name = "_ms_form_list"
 * 剔除 rules：因为校验规则是设置到 Form.FormList 上的，不能设置到 FormItem 上，所以从 rules 中提取是否必填的标识
 */
export const getListFormItemSchema = (formItemSchema: any) => {
  const rules = (formItemSchema.rules as unknown as FormItemProps['rules']) ?? [];
  const result = rules?.find?.((rule) => {
    if (isFunction(rule)) {
      return false;
    } else {
      if (rule.required) {
        return true;
      }
    }
    return false;
  });

  if (result) {
    return {
      required: true,
      ...omit(formItemSchema, 'rules', 'initialValue', 'name'),
      name: '_ms_form_list_',
    };
  }
  return {
    ...omit(formItemSchema, 'rules', 'initialValue', 'name'),
    name: '_ms_form_list_',
  };
};
