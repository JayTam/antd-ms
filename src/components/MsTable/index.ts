import Table from './components/MsTableWrapper';
import useEditableRow from './hooks/useEditableRow';
import type { MsTableColumnStateType } from './types';

type CompoundedComponent = typeof Table & {
  useEditableRow: typeof useEditableRow;
};

const MsTable = Table as CompoundedComponent;

MsTable.useEditableRow = useEditableRow;

export type {
  MsTableActionType,
  MsTableColumns,
  MsTableColumnType,
  MsTableEditableActionType,
  MsTableEditableType,
  MsTableProps,
  MsTableSearchType,
  MsTableToolbarType,
} from './types';
export type { MsTableColumnStateType };

export default MsTable;
