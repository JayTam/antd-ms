import { isUndefined } from 'lodash-es';
import MsTable from '../MsTable';
import type { DefaultSearchListPostRes, MsSearchProps } from './types';

/**
 * 搜索组件
 */
function MsSearch<P, R, D = DefaultSearchListPostRes<R>>(props: MsSearchProps<P, R, D>) {
  const { toolbar, tableFooterLeftRender, columns } = props;
  const searchColumns = columns.map((column) => ({ ...column, search: true }));

  // 分页器前面的自定义区域，继承MsTable的rowSelection配置
  const searchRowSelection = tableFooterLeftRender
    ? {
        type: 'radio',
        selectionButtonsMode: 'default',
        selectionButtonsRender: () => tableFooterLeftRender,
      }
    : undefined;

  return (
    <MsTable
      {...(props as any)}
      rowSelection={searchRowSelection}
      columns={searchColumns}
      toolbar={{ ...toolbar, size: false, setting: false }}
      contentRender={isUndefined(props.children) ? () => null : props.children}
    />
  );
}

export default MsSearch;
