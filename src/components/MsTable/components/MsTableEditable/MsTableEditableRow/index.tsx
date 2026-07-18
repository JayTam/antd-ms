import MsBaseForm from '@jaytam/antd-ms/components/MsForm/components/MsBaseForm';
import { Form } from 'antd';
import { isNil, omit } from 'lodash-es';
import { useImperativeHandle, useState } from 'react';

import { useTableEditableContext } from '../../../contexts/editable';
import { EditableRowContext } from '../../../contexts/editableRow';
import { cancelNewRowEditSymbol, isNewRowSymbol } from '../MsTableEditableContainer';
import { useUpdateEffect } from 'ahooks';

/**
 * 重写行组件，为支持编辑行功能
 * @param props
 * @returns
 */
function EditableRow(props: any) {
  const { record } = props;
  const rowKeyValue = props['data-row-key'];

  const { rowKey, editable, reload, rowEditing, setRowEditing, editRowRefs } =
    useTableEditableContext();

  const isNewRow = Boolean(record?.[isNewRowSymbol]);
  const saveType = isNewRow ? 'add' : 'edit';

  const editing = rowEditing[rowKeyValue] ?? false;

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  /**
   * 处理保存
   * @param values
   */
  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      if (isNewRow) {
        await editable?.onSave?.(
          values,
          omit(record, [rowKey as string, isNewRowSymbol, cancelNewRowEditSymbol]),
          rowKeyValue,
          saveType,
          form,
        );
      } else {
        await editable?.onSave?.(values, record, rowKeyValue, saveType, form);
      }
      setRowEditing((prev) => ({ ...prev, [rowKeyValue]: false }));
      // 编辑状态关闭生效之后，才能执行 reload
      setTimeout(() => reload?.(), 0);
    } finally {
      setLoading(false);
    }
  };

  useUpdateEffect(() => {
    form.resetFields();
  }, [record]);

  useImperativeHandle(
    (ref) => {
      if (isNil(rowKeyValue)) {
        return;
      } else {
        if (editRowRefs.current) {
          editRowRefs.current[rowKeyValue] = ref;
        }
      }
    },
    () => ({
      async save() {
        if (editing) {
          const values = await form.validateFields();
          try {
            setLoading(true);
            await editable?.onSave?.(values, record, rowKeyValue, saveType, form);
            setRowEditing((prev) => ({ ...prev, [rowKeyValue]: false }));
          } finally {
            setLoading(false);
          }
        }
      },
      async cancel() {
        setRowEditing((prev) => ({ ...prev, [rowKeyValue]: false }));
        form.resetFields();
        if (isNewRow) {
          record?.[cancelNewRowEditSymbol]?.();
        }
        editable?.onCancel?.(record);
      },
      form: form,
    }),
  );

  return (
    <EditableRowContext.Provider
      value={{
        editing: rowEditing[rowKeyValue],
        setEditing: (value) => {
          setRowEditing((prev) => ({ ...prev, [rowKeyValue]: value }));
        },
        loading,
      }}
    >
      {/* component=false，不渲染form节点 */}
      <MsBaseForm
        form={form}
        initialValues={record}
        component={false}
        onFinish={handleSave}
        loading={false}
        setLoading={() => {}}
        labelCol={{}}
        hideFormRenderRow
      >
        <tr {...omit(props, 'record')} />
      </MsBaseForm>
    </EditableRowContext.Provider>
  );
}

export default EditableRow;
