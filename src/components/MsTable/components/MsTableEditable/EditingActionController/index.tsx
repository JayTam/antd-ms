import MsModal from '@jaytam/antd-ms/components/MsModal';
import type { ComponentType } from 'react';
import type { EditingActionControllerProps } from './EditingActionController';
import component from './EditingActionController';
import type { LocaleType } from '@jaytam/antd-ms/locale';

type EditingActionControllerType = ComponentType<EditingActionControllerProps> & {
  checkEditingAction: (ref: React.RefObject<{ isEditing: boolean }>, locale: LocaleType) => boolean;
  warnEditing: (locale: LocaleType) => void;
};

const EditingActionController = component as EditingActionControllerType;

/**
 * 检测编辑状态，当前是否可以操作
 * @param ref
 * @returns
 */
EditingActionController.checkEditingAction = (ref, locale) => {
  if (ref.current?.isEditing) {
    MsModal.warning({ title: locale?.global?.tip, content: locale?.MsTable?.tipSaveEdit });
    return true;
  }
  return false;
};

EditingActionController.warnEditing = (locale) => {
  MsModal.warning({ title: locale?.global?.tip, content: locale?.MsTable?.tipSaveEdit });
};

export default EditingActionController;
