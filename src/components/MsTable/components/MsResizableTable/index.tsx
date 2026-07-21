import { Table, type TableProps } from 'antd';
import { useColumnsResizable } from '../MsTableColumnTitle/hook';
import type { MsTableProps } from '../../types';
import { forwardRef } from 'react';

type MsResizableTableProps = Omit<TableProps<any>, 'columns'> &
  Pick<MsTableProps, 'columns' | 'columnsResizable'>;

const MsResizableTable = forwardRef(
  (props: MsResizableTableProps, ref: React.Ref<HTMLDivElement>) => {
    const { components = {}, columns = [], columnsResizable, ...restProps } = props;

    const { columns: resizableColumns, ResizableTitle } = useColumnsResizable(
      columns,
      columnsResizable,
    );

    return (
      <Table
        ref={ref}
        {...restProps}
        columns={resizableColumns}
        components={{
          ...components,
          header: { cell: ResizableTitle, ...components?.header },
        }}
      />
    );
  },
);

export default MsResizableTable;
