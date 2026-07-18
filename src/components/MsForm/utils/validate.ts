import type { MsFormColumns, MsFormColumnType, MsTableColumnType } from '@jaytam/antd-ms';
import { flatColumnsDeep } from '@jaytam/antd-ms/utils';
import type { FormInstance, FormItemProps } from 'antd';
import { isArray, isFunction, isNil } from 'lodash-es';
import { SELECT_VALUE_TYPES } from '../constants';
import type { LocaleType } from '@jaytam/antd-ms/locale';

/**
 * 从 schema 解析 NamePath 列表
 * @param schemas
 * @returns
 */
export function resolveNamePathList(columns: MsFormColumns) {
  return flatColumnsDeep(columns)
    .filter((column) => {
      if (isNil(column.dataIndex)) {
        return false;
      }

      if (column.dataIndex === '') {
        return false;
      }
      if (column.dataIndex.toString().startsWith('_')) {
        return false;
      }

      return true;
    })
    .map((column) => {
      return column.dataIndex;
    });
}

/**
 * 解析表单校验规则，给必填校验添加默认 message
 * @param rules
 * @param column
 * @returns
 */
export function resolveRules<D>(
  rules: FormItemProps['rules'],
  column: MsFormColumnType<D>,
  locale: LocaleType,
) {
  const valueType = column.valueType ?? 'text';
  if (!isArray(rules) || rules.length === 0) return rules;
  return rules.map((rule) => {
    if (isFunction(rule)) {
      return rule;
    }
    if (rule.required) {
      if (isNil(rule.message)) {
        if (SELECT_VALUE_TYPES.includes(valueType)) {
          return { ...rule, message: locale.MsForm.pleaseSelect + column.title };
        } else {
          return { ...rule, message: locale.MsForm.pleaseInput + column.title };
        }
      }
    }
    return rule;
  });
}

/**
 * 查找 column 中是否配置必填校验
 * @param column
 * @param form
 * @returns
 */
export function isRequired(column: MsFormColumnType | MsTableColumnType, form: FormInstance) {
  const formItemProps = isFunction(column.formItemProps)
    ? column.formItemProps?.(form)
    : column.formItemProps ?? {};

  if (formItemProps.required) {
    return true;
  }

  if (formItemProps.rules) {
    const index = formItemProps.rules.findIndex((rule) => {
      if (isFunction(rule)) {
        return rule?.(form)?.required ?? false;
      } else {
        return rule.required ?? false;
      }
    });

    if (index > -1) {
      return true;
    }
  }

  return false;
}
