import type { MsTableProps } from '../../types';
import type useTableSelection from './useTableSelection';

export type MsTableSelectionProps<P, R, D> = ReturnType<typeof useTableSelection<P, R, D>> & {
  tableProps: MsTableProps<P, R, D>;
};
