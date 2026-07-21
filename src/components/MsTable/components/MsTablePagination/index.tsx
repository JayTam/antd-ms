import type { MsTableProps } from '@jaytam/antd-ms';
import { Pagination } from 'antd';
import MsTableCursorPagination from './MsTableCursorPagination';
import type { MsTableCursorPaginationProps } from './MsTableCursorPagination/types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

type MsTablePaginationProps<P, R, D> = MsTableCursorPaginationProps<D> & {
  tableProps: MsTableProps<P, R, D>;
};

function MsTablePagination<P, R, D>(props: MsTablePaginationProps<P, R, D>) {
  const { tableProps, ...paginationProps } = props;
  const { paginationType = 'page', pagination = {} } = tableProps;
  const { currentLocale } = useLocale('MsTable');

  if (pagination === false) return <></>;

  /* 普通分页器 */
  if (paginationType === 'page') {
    return (
      <Pagination
        size="small"
        showSizeChanger
        showTotal={(value) => replaceMessage(currentLocale.countItem, { value })}
        {...paginationProps}
      />
    );
  }

  /* 游标分页器 */
  if (paginationType === 'cursor') {
    return <MsTableCursorPagination {...paginationProps} />;
  }

  return <></>;
}

export default MsTablePagination;
