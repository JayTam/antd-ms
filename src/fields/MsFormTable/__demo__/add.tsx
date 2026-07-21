/**
 * title: 新增按钮
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();

  const addButtonPosition = Form.useWatch('addButtonPosition', form);
  const hideAddButton = Form.useWatch('hideAddButton', form);

  const columns: MsFormColumns = [
    {
      title: '新增按钮位置',
      dataIndex: 'addButtonPosition',
      valueType: 'radio',
      valueEnum: { top: '顶部', bottom: '底部' },
      fieldProps: { optionType: 'button' },
      initialValue: 'bottom',
    },
    {
      title: '隐藏新增按钮',
      dataIndex: 'hideAddButton',
      valueType: 'switch',
    },
    {
      title: '表格',
      valueType: 'formTable',
      dataIndex: 'list',
      initialValue: [
        { text1: 'text1', text2: 'text1' },
        { text1: 'text2', text2: 'text2' },
        { text1: 'text3', text2: 'text3' },
      ],
      fieldProps: {
        hideAddButton: Boolean(hideAddButton),
        addButtonPosition,
      },
      columns: [
        {
          title: '输入1',
          dataIndex: 'text1',
        },
        {
          title: '输入2',
          dataIndex: 'text2',
        },
      ],
    },
  ];

  return <MsForm form={form} columns={columns} labelCol={{ flex: '120px' }} />;
};
