/**
 * title: 单层配置
 */
import { MsField } from '@jaytam/antd-ms';
import type { MsRulesConfigProps } from '@jaytam/antd-ms';
import { Button, Form, Space } from 'antd';

export default () => {
  const [form] = Form.useForm();

  const fieldProps: MsRulesConfigProps = {
    valueType: 'rulesConfig',
    columns: [
      {
        dataIndex: 'name',
        valueType: 'text',
        rules: [
          { required: true, message: '请输入模型名称' },
          { len: 11, message: '字符长度必须为11' },
        ],
        fieldProps: {
          placeholder: '模型名称',
        },
      },
      {
        dataIndex: 'modelCode',
        valueType: 'select',
        selectdLabelName: 'modelName',
        valueEnum: {
          0: '选项0',
          1: '选项1',
        },
        rules: [{ required: true, message: '请选择选项' }],
        fieldProps: {
          style: { width: 174 },
          placeholder: '请选择',
          labelInValue: true,
          getPopupContainer: () => document.body,
        },
      },
      {
        dataIndex: 'name2',
        valueType: 'text',
        fieldProps: {
          placeholder: '请输入',
        },
      },
    ],
    fieldProps: {
      initialColumnValue: { name: '1234567890', modelCode: '0' },
      fileNames: {
        combinator: 'combinators_new',
        rules: 'rules_new',
      },
      combinatorValue: ['1', '0'],
      ruleMaxNumber: 5,
      defaultCombinator: 'or',
      footer: (
        <span>
          底部总结文案<mark>【总结下123】</mark>
        </span>
      ),
    },
  };

  return (
    <Form colon={false} requiredMark={false} form={form}>
      <Form.Item name={'demoList'} label={'单层测试'}>
        <MsField {...fieldProps} />
      </Form.Item>
      <Space size={8} style={{ marginTop: 32 }}>
        <Button
          type="primary"
          onClick={() => {
            form.validateFields().then((values) => {
              console.log('🚀 ~ data:', values.demoList);
              form.resetFields();
            });
          }}
        >
          测试获取数据（请在控制台查看）
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </Button>
      </Space>
    </Form>
  );
};
