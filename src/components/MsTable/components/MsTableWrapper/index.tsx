import type { DefaultListPostRes } from '@jaytam/antd-ms/components/types';
import type { ReactElement, Ref } from 'react';
import { forwardRef, useMemo } from 'react';
import MsTableComponent from '../../table';

import type { MsTableProps } from '../../types';
import { generateStoreName } from '../../utils/storeName';
import MsTableColumnContainer from '../MsTableColumnContainer';

const MsTableWrapper = forwardRef(
  <P, R, D>(props: MsTableProps<P, R, D>, ref: Ref<HTMLDivElement>) => {
    const {
      storeName: deprecatedStoreName,
      columnState: columnStateProps,
      columnExport: columnExportProps,
      columns,
    } = props;

    // 当新增列或删除列时，重置localStorage的存储key
    const columnState = useMemo(() => {
      const storeName =
        columnStateProps?.storeName ?? deprecatedStoreName ?? generateStoreName(columns);

      return { ...columnStateProps, storeName };
    }, [columnStateProps, columns, deprecatedStoreName]);

    const columnExportState = useMemo(() => {
      const defaultColumnSetStoreName = deprecatedStoreName ?? generateStoreName(columns);
      const columnSetStoreName =
        columnExportProps?.storeName ?? defaultColumnSetStoreName + '_export';

      return { ...columnExportProps, storeName: columnSetStoreName };
    }, [columnExportProps, columns, deprecatedStoreName]);

    // 过滤 hideInTable 的 columns
    const filteredColumns = useMemo(
      () => columns?.filter((column) => !column.hideInTable),
      [columns],
    );

    return (
      <MsTableColumnContainer
        {...props}
        key={columnState?.storeName}
        columnState={columnState}
        columnExport={columnExportState}
        columns={filteredColumns}
      >
        {(tableColumns) => (
          <MsTableComponent {...props} ref={ref} columns={columns} tableColumns={tableColumns} />
        )}
      </MsTableColumnContainer>
    );
  },
);

export default MsTableWrapper as <P, R, D = DefaultListPostRes<R>>(
  props: MsTableProps<P, R, D> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
