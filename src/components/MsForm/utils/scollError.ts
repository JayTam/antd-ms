import { isArray, isEqual, isNil } from 'lodash-es';
import type { MsFormColumns } from '..';
import { LIST_VALUE_TYPES } from '../constants';
import type { NamePath } from 'antd/es/form/interface';
import type { FormInstance, FormProps } from 'antd';

export function findFormTabsNamePathList(columns: MsFormColumns = []) {
  const resultColumns: MsFormColumns = [];

  columns?.forEach((column) => {
    const component = column.valueType ?? 'text';

    if (LIST_VALUE_TYPES.includes(component)) {
      resultColumns.push(column);
      return;
    }
  });

  return resultColumns.map((column) => column.dataIndex ?? column.formItemProps?.name);
}

/**
 * 是否包含 formTabs 类型
 * @param namePath
 * @param columns
 * @returns
 */
export function getFormTabsNamePath(namePath: NamePath, columns: MsFormColumns = []) {
  const formTabsNamePathList = findFormTabsNamePathList(columns);

  for (const formTabsNamePath of formTabsNamePathList) {
    const listNamePath = isArray(formTabsNamePath) ? formTabsNamePath : [formTabsNamePath];
    const matchNamePath = namePath.slice(0, listNamePath.length);
    if (isEqual(matchNamePath, listNamePath)) return listNamePath;
  }
}

export function scrollToError(config: {
  error: any;
  scrollToFirstError: FormProps['scrollToFirstError'];
  form: FormInstance;
  columns: MsFormColumns;
}) {
  const { error, scrollToFirstError, form, columns = [] } = config;

  if (scrollToFirstError) {
    const scrollOption: FormProps['scrollToFirstError'] =
      scrollToFirstError === true ? { behavior: 'smooth', block: 'center' } : scrollToFirstError;

    const firstErrorName = error?.errorFields[0]?.name;

    const scrollToNamePath = getFormTabsNamePath(firstErrorName, columns) ?? firstErrorName;

    setTimeout(() => form.scrollToField(scrollToNamePath, scrollOption), 300);
  }
}
