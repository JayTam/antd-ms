import type { MsFormProps } from '@jaytam/antd-ms';
import type { MsTableSearchType } from '../../../../../types';

export type PopoverFormProps<P, R, D> = Omit<MsFormProps<P, R, D>, 'actionRef'> & {
  filterNum?: number;
  searchConfig?: MsTableSearchType<P, R, D>;
  onSubmit?: () => void;
  onReset?: () => void;
  onClear?: () => void;
  getPopupContainer: (triggerNode: HTMLElement) => HTMLElement;
  actionRef?: React.Ref<PopoverFormActionType>;
};

export type PopoverFormActionType = {
  openEditor: () => void;
  closeEditor: () => void;
};
