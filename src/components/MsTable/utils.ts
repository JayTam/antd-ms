import type { MsFormColumns, MsTableColumns } from '@jaytam/antd-ms';
import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { cloneDeep, get, isArray, isNil, set, unset } from 'lodash-es';
import { parseTags } from '../../fields/MsPresetResourceTags/components/ResourceTagsEditor';

import { SELECT_VALUE_TYPES } from '../MsForm/constants';
import { resolveFormColumns } from './utils/fomColumns';

/**
 * query 模式下，所有选择类的组件值更新之后，都需要提交表单
 * @param columns 表单配置
 * @param changedValues 仅变更的表单值
 * @param values 所有表单值
 * @returns 是否提交表单
 */
export function needSubmitForm(
  columns: MsTableColumns | MsFormColumns,
  changedValues: Record<string, any>,
  values: Record<string, any>,
) {
  let needRefresh = false;
  const names: FormItemProps['name'][] = [];
  const changedNames = Object.keys(changedValues);

  const depends: { name: string; dependencies: NamePath[] }[] = [];

  columns.forEach((column) => {
    // TODO: 跳过表头分组
    if ('children' in column) return;
    const name = column.dataIndex?.toString() ?? column.formItemProps?.name?.toString();
    if (isNil(name)) {
      return;
    }

    // 收集依赖
    if (isArray(column.dependencies)) {
      if (!('ignoreDependenciesOnChange' in column && column.ignoreDependenciesOnChange)) {
        depends.push({ name, dependencies: column.dependencies });
      }
    }

    // 收集 onChange 提交字段名
    if ('submitInQueryWhenChange' in column) {
      if (column.submitInQueryWhenChange === true) {
        names.push(name);
      }
    } else {
      if (SELECT_VALUE_TYPES.includes(column.valueType ?? 'text')) {
        names.push(name);
      }
    }
  });

  /**
   * 递归联动关系，判断是否需要提交表单
   * 1. 依赖链的值都为空，提交
   * 2. 依赖链的值都不为空，提交
   * @param name
   * @returns
   */
  function isSubmit(name: string): boolean {
    const dependNames: string[] = [];

    function findFirstDependName(name: string): string {
      const depend = depends.find((d) => d.name === name);
      if (depend) {
        const upName = depend.dependencies[0] as string;
        if (upName) {
          return findFirstDependName(upName);
        } else {
          return name;
        }
      } else {
        return name;
      }
    }

    function recursionDepend(name: string, dependNames: string[]) {
      dependNames.push(name);
      const depend = depends.find((d) => d.dependencies.includes(name));
      if (depend) {
        recursionDepend(depend.name, dependNames);
      }
    }

    const firstName = findFirstDependName(name);

    recursionDepend(firstName, dependNames);

    // 所有都为空
    const allNull = dependNames.every((dependName) => isNil(values[dependName]));
    if (allNull) return true;
    // 所有不为空
    const allExit = dependNames.every((dependName) => !isNil(values[dependName]));
    if (allExit) return true;

    return false;
  }

  changedNames.forEach((name) => {
    if (names.includes(name)) {
      needRefresh = isSubmit(name);
    }
  });

  return needRefresh;
}

/**
 * 转换为原始数据类型
 * valuePrimitiveType = "number" | "boolean"
 */
export const transformPrimitiveType = (values: Record<string, any>, columns: MsTableColumns) => {
  const formColumns = resolveFormColumns(columns);
  const newValues = cloneDeep(values);

  const isTrue = (value: string | boolean) => {
    return value === 'true' || value === true;
  };

  formColumns
    .filter((column) => column.valuePrimitiveType || column.valueType === 'presetResourceTags')
    .map((column) => ({
      dataIndex: column.formItemProps?.name ?? column.dataIndex,
      valuePrimitiveType: column.valuePrimitiveType,
      valueType: column.valueType,
    }))
    .forEach((column) => {
      const path = column.dataIndex;
      if (isNil(path)) return;
      const value = get(newValues, path);
      if (isNil(value)) return;

      // number 类型
      if (column.valuePrimitiveType === 'number') {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => Number(item)),
          );
        } else {
          set(newValues, path, Number(value));
        }
      }

      // boolean 类型
      if (column.valuePrimitiveType === 'boolean') {
        if (Array.isArray(value)) {
          set(
            newValues,
            path,
            value.map((item) => isTrue(item)),
          );
        } else {
          set(newValues, path, isTrue(value));
        }
      }

      // 预置标签类型
      if (column.valueType === 'presetResourceTags') {
        const { tagsNamePath = 'tags', presetTagsNamePath = 'presetTags' } =
          (column as any)?.fieldProps ?? {};
        const list = parseTags(value);
        const tags = list
          .filter((tag) => tag.type === 'tag')
          .map((item) => ({ key: item.key, value: item.value }))
          .reduce((prev, next) => prev + `${next.key}:${next.value},`, '')
          .replace(/,\s*$/, '');
        const presetTags = list
          .filter((tag) => tag.type === 'presetTag')
          .map((item) => ({ key: item.presetKey, value: item.presetValue }))
          .reduce((prev, next) => prev + `${next.key}:${next.value},`, '')
          .replace(/,\s*$/, '');
        unset(newValues, path);
        set(newValues, tagsNamePath, tags === '' ? undefined : tags);
        set(newValues, presetTagsNamePath, presetTags === '' ? undefined : presetTags);
      }
    });

  return newValues;
};
