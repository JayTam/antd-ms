import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';

import type { NamePath } from 'antd/es/form/interface';
import { isFunction, isNil, merge } from 'lodash-es';
import {
  INPUT_PLACEHOLDER_VALUE_TYPES,
  ORIGIN_WIDTH_VALUE_TYPES,
  SELECT_PLACEHOLDER_VALUE_TYPES,
} from '../../constants';
import type { MsFormColumnType } from '../../types';
import { mergeNamePath } from '../namePath';
import { resolveRules } from '../validate';
import { parseInitialValue } from './initialValueUtil';
import type { ListConfig } from './transformColumnsToSchema';
import type { LocaleType } from '@jaytam/antd-ms/locale';

/**
 * 获取 column.formItemProps 的默认值
 * @param column
 * @returns
 */
const getDefaultFormItemProps = (
  column: MsFormColumnType,
  locale: LocaleType,
  basePathName?: NamePath,
  list?: ListConfig,
  valuesNormal?: boolean,
) => {
  const formItemProps = isFunction(column.formItemProps) ? {} : column.formItemProps ?? {};
  const formItemNamePath = formItemProps.name ?? column.dataIndex;
  formItemProps.label = formItemProps.label ?? column.title;
  formItemProps.tooltip = formItemProps.tooltip ?? column.tooltip;
  formItemProps.dependencies = formItemProps.dependencies ?? column.dependencies;
  formItemProps.shouldUpdate = formItemProps.shouldUpdate ?? column.shouldUpdate;
  const initialValue = formItemProps.initialValue ?? column.initialValue;
  formItemProps.initialValue = parseInitialValue(initialValue, column, valuesNormal);
  formItemProps.rules = resolveRules(formItemProps.rules, column, locale);
  if (isNil(list)) {
    // Object
    formItemProps.name = mergeNamePath(basePathName, formItemNamePath);
  } else {
    // List
    const { index, fields } = list;
    formItemProps.name = mergeNamePath(index, formItemNamePath);
    // Form.List 中列互相依赖
    if (column.dependenciesListSelf) {
      const selfDependencies = fields
        ?.filter((field) => field.key !== index)
        .map((item) => mergeNamePath(basePathName, item.key, formItemNamePath));

      formItemProps.dependencies = (formItemProps.dependencies ?? []).concat(selfDependencies);
    }
    // Form.List 依赖
    if (column.dependenciesList) {
      formItemProps.dependencies = column.dependenciesList?.map((dependNamePath) =>
        mergeNamePath(basePathName, index, dependNamePath),
      );
    }
  }
  return formItemProps;
};

/**
 * 获取 column.fieldProps 的默认值
 * @param column
 */
const getDefaultFieldProps = (column: MsFormColumnType, locale: LocaleType) => {
  const valueType = column.valueType ?? 'text';
  const fieldProps = isFunction(column.fieldProps) ? {} : column.fieldProps ?? {};
  const defaultStyle = ORIGIN_WIDTH_VALUE_TYPES.includes(valueType) ? {} : { width: '100%' };
  fieldProps.style = merge(defaultStyle, fieldProps.style);
  if (isNil(fieldProps.placeholder)) {
    if (INPUT_PLACEHOLDER_VALUE_TYPES.includes(valueType) && column.title) {
      fieldProps.placeholder = locale?.MsForm?.pleaseInput + column.title;
    }
    if (SELECT_PLACEHOLDER_VALUE_TYPES.includes(valueType) && column.title) {
      fieldProps.placeholder = locale?.MsForm?.pleaseSelect + column.title;
    }
  }
  return fieldProps;
};

/**
 * 获取 column.colProps 的默认值
 * @param column
 */
const getDefaultColProps = (column: MsFormColumnType, columnNumber: number = 1) => {
  const colProps: MsFormColumnType['colProps'] = column.colProps ?? {};

  column.colSize = column.colSize ?? 1;
  if (isNil(colProps.span) && isNil(colProps.flex)) {
    if (columnNumber === 0) return colProps;
    colProps.span = Math.floor((24 / columnNumber) * column.colSize);
  }
  return colProps;
};

/**
 * 获取 column 的默认值
 * @param column
 */
export const getDefaultColumnProps = (
  column: MsFormColumnType,
  columnNumber: number,
  locale: LocaleType,
  basePathName?: NamePath,
  list?: ListConfig,
  valuesNormal?: boolean,
) => {
  const newColumn = cloneDeepWithReactNode(column);
  // column 自身属性
  newColumn.valueType = newColumn.valueType ?? 'text';
  // column 下层属性
  newColumn.colProps = getDefaultColProps(newColumn, columnNumber);
  newColumn.formItemProps = getDefaultFormItemProps(
    newColumn,
    locale,
    basePathName,
    list,
    valuesNormal,
  );
  newColumn.fieldProps = getDefaultFieldProps(newColumn, locale);
  return newColumn;
};
