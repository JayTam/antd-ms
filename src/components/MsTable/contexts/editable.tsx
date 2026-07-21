import React from 'react';

import type { MsTableEditableType } from '../types';

export type MsTableEditableContextType = {
  tableAreaRef?: React.RefObject<HTMLDivElement>;
  editable?: MsTableEditableType;
  globalEditing: boolean;
  rowEditing: Record<string, boolean>;
  setRowEditing: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  editRowRefs: React.RefObject<Record<string, any>>;
  reload: () => Promise<void>;
  addRow: () => void;
  rowKey: React.Key;
};

export const EditableContext = React.createContext<MsTableEditableContextType>({
  editable: {},
  reload: () => new Promise(() => {}),
  addRow: () => {},
  globalEditing: false,
  rowEditing: {},
  setRowEditing: () => {},
  editRowRefs: { current: {} },
  rowKey: '',
});

export const useTableEditableContext = () => {
  const context = React.useContext(EditableContext);
  return context;
};
