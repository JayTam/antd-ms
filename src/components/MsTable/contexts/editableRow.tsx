import React, { useContext } from 'react';

import { useTableEditableContext } from './editable';

type EditableRowContextType = {
  /** 正在编辑 */
  editing: boolean;
  loading: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditableRowContext = React.createContext<EditableRowContextType>({
  editing: false,
  setEditing: () => {},
  loading: false,
});

export const useEditableRowContext = () => {
  return useContext(EditableRowContext);
};

export function useEditableRow(rowKey?: string) {
  const { editRowRefs } = useTableEditableContext();

  if (rowKey) {
    return editRowRefs.current?.[rowKey];
  } else {
  }

  return;
}
