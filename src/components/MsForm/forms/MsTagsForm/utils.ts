import type { MsFormColumns, MsTableColumnType } from '@jaytam/antd-ms';
import { flatColumnsDeep } from '@jaytam/antd-ms/utils';
import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/es/form/interface';

export function findDependenciesList(namePath: NamePath, columns: MsFormColumns) {
  const temp: NamePath[] = [namePath];
  const result: NamePath[] = [namePath];

  const flatColumns = flatColumnsDeep(columns) as MsTableColumnType[];

  while (temp.length) {
    const np = temp.shift();
    const dependColumn = flatColumns.find((column) => column.dependencies?.includes(np));
    if (dependColumn) {
      temp.push(dependColumn.dataIndex);
      result.push(dependColumn.dataIndex);
    }
  }

  return result;
}

export function clearValues(
  namePath: NamePath,
  columns: MsFormColumns,
  form: FormInstance,
  changeConditionsNotSubmitted: boolean = true, // 变更条件不触发请求
) {
  const namePathList = findDependenciesList(namePath, columns);
  namePathList.forEach((np) => {
    form.setFieldValue(np, undefined);
  });

  if (changeConditionsNotSubmitted) form.submit();
}
