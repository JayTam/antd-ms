import { MsConfigProvider } from '@jaytam/antd-ms/components';

import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { isNil } from 'lodash-es';
import { useMemo } from 'react';
import type { MsTableColumns, MsTableColumnType } from '../../components/MsTable/types';
import { mergeResourceRequestList } from '../MsResourceTags/utils';
import ResourceTagsTableCell from './components/ResourceTagsTableCell';

export type UseResourceTagProps = {
  request: any;
  form: FormInstance;
  columns: MsTableColumns;
  space?: number;
};

/**
 * 业务逻辑：是否包含资源标签，包含资源标签将做以下几件事情
 * 1. 将 request 与资源接口合并，在 request 返回的 list 中拼接上 resource
 * 2. 在 table column 中展示 资源标签
 * 3. 在 filter form 中展示资源标签筛选器的按钮部分
 * 4. 在 barRender 下方展示资源标签筛选器的清除部分
 */
export function usePresetTag(props: UseResourceTagProps) {
  const { request, form, columns } = props;

  const { resourceApiVersion } = MsConfigProvider.useConfig();

  const tagColumn = columns.find((column) => column.valueType === 'presetResourceTags');
  const fieldProps: any = tagColumn?.fieldProps;

  const namePath = useMemo(() => {
    const defaultNamePath = '_presetResourceTags';
    if (tagColumn && 'dataIndex' in tagColumn) {
      return tagColumn.dataIndex ?? defaultNamePath;
    }
    return defaultNamePath;
  }, [tagColumn]);

  Form.useWatch(namePath, form);

  let mergedRequest = request;

  if (tagColumn) {
    // request是已经处理好 postRes 的请求函数
    mergedRequest = mergeResourceRequestList(
      request,
      fieldProps?.griKey,
      null,
      fieldProps?.resourceApiVersion ?? resourceApiVersion,
    );
  }

  return { mergedRequest };
}
