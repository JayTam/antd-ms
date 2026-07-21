import type { FormInstance } from 'antd';
import { useTableEditableContext } from '../contexts/editable';

type UseEditableRowType = (rowKey: string) =>
  | {
      editing: boolean;
      form: FormInstance;
    }
  | undefined;

/**
 *
 * @param rowKey
 */
const useEditableRow: UseEditableRowType = (rowKey) => {
  const { rowEditing, editRowRefs } = useTableEditableContext();

  // 新增行

  // 普通行
  if (rowKey) {
    const editing = rowEditing?.[rowKey] ?? false;
    const form = editRowRefs?.current?.[rowKey]?.form;
    return { editing, form };
  }
};

export default useEditableRow;
