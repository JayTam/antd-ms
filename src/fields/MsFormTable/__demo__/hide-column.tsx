/**
 * title: 隐藏列
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();

  const visible = Form.useWatch('visible', form);

  return (
    <MsForm
      form={form}
      columns={[
        {
          title: '静态隐藏 - 整行包括表头隐藏',
          valueType: 'group',
          colSize: 1 / 2,
          columns: [
            {
              title: '控制整列',
              valueType: 'select',
              dataIndex: 'visible',
              valueEnum: { show: '显示', hide: '隐藏' },
              initialValue: 'show',
            },
            {
              valueType: 'formTable',
              dataIndex: 'static',
              fieldProps: { actions: [] },
              initialValue: [{}, {}],
              columns: [
                {
                  title: '正常列',
                  dataIndex: 'col',
                },
                {
                  title: '隐藏列',
                  dataIndex: 'age',
                  hideInForm: visible === 'hide',
                },
              ],
            },
          ],
        },
        {
          title: '动态隐藏 - 表头不隐藏，仅隐藏表单项',
          valueType: 'group',
          colSize: 1 / 2,
          columns: [
            {
              valueType: 'formTable',
              dataIndex: 'dynamic',
              fieldProps: { actions: [] },
              initialValue: [{}, {}, {}],
              columns: (basePathName) => [
                {
                  title: '正常列',
                  dataIndex: 'col',
                  valueType: 'select',
                  valueEnum: { show: '显示', hide: '隐藏' },
                },
                {
                  title: '隐藏列',
                  dataIndex: 'age',
                  dependencies: [[...basePathName, 'col']],
                  hideInForm: (form) => {
                    const status = form.getFieldValue([...basePathName, 'col']);
                    return status === 'hide';
                  },
                },
              ],
            },
          ],
        },
      ]}
    />
  );
};
