import type { ColumnStateListType, MsTableColumnsWithKey } from '../../types';

export type ColumnSortProps = {
  columns?: MsTableColumnsWithKey;
  columnState: ColumnStateListType;
  setColumnState: React.Dispatch<React.SetStateAction<ColumnStateListType>>;
  columnFixed?: boolean;
};
