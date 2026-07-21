/**
 * title: 多层配置，图标自定义
 */
import { hashNamesFilter, MsForm } from '@jaytam/antd-ms';
import { Form, Button } from 'antd';

import type { MsFormColumnType, rulesConfigFormColumns } from '@jaytam/antd-ms';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

type MsColumns = MsFormColumnType | rulesConfigFormColumns;

export default () => {
  const [form] = Form.useForm();
  const columns: MsColumns[] = [
    {
      title: '规则配置',
      valueType: 'rulesConfig',
      dataIndex: 'demolist',
      columns: [
        {
          dataIndex: 'name',
          valueType: 'text',
          fieldProps: {
            placeholder: '请输入',
          },
        },
        {
          dataIndex: 'name1',
          valueType: 'select',
          valueEnum: {
            '0': '选项0',
            '1': '选项1',
          },
          rules: [{ required: true, message: '请选择选项' }],
          fieldProps: {
            style: { width: 174 },
            placeholder: '请选择',
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
        multiple: true,
        defaultOneItem: false,
        // defaultCombinator: 'or',
        combinatorValue: ['1', '0'],
        layerNum: 3,
        ruleMaxNumber: 3,
        fileNames: {
          combinator: 'combinator',
          rules: 'rules',
        },
        // initialColumnValue: { name: '12345678901', name1: '0' },
        conditionRender: (
          <Button type="dashed" icon={<PlusCircleOutlined />}>
            条件
          </Button>
        ),
        deleteRender: (
          <Button
            icon={<DeleteOutlined />}
            style={{
              color: '#78858f',
              width: 32,
              height: 32,
              border: 'none',
              borderRadius: 4,
            }}
          />
        ),
      },
    },
  ];
  return (
    <div>
      <MsForm
        form={form}
        noCard
        colon={false}
        requiredMark={false}
        successNotify={false}
        columns={columns}
        onFinish={async (values) => {
          console.log('🚀 ~ onFinish={async ~ values:', values, hashNamesFilter(values));
          form.resetFields();
        }}
      />
    </div>
  );
};
