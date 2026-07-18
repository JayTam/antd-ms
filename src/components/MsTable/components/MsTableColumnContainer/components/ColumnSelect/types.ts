import type { ColumnStateListType, MsTableColumnsWithKey } from '../../types';

export type ColumnSelectProps = {
  columns?: MsTableColumnsWithKey;
  columnState: ColumnStateListType;
  setColumnState: React.Dispatch<React.SetStateAction<ColumnStateListType>>;
};
