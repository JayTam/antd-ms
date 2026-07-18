import type { ColumnStateListType } from '../components/MsTableColumnContainer/types';
import type { MsTableColumnType } from '../types';

/**
 *
 */
export function columnExportStateToItems(
  state: ColumnStateListType,
  allColumns: MsTableColumnType[],
) {
  const ids = state.filter((item) => !item.hidden).map((item) => item.id);

  return ids.map((id) => {
    const column = allColumns.find((column) => column.dataIndex?.toString() === id?.toString());
    return {
      title: column?.title ?? '',
      id,
    };
  });
}
