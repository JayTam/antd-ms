/**
 * title: 嵌套使用
 * description:
 */
import { useMemo } from 'react';
import { MsForm, type MsFormColumnType, type rulesConfigFormColumns } from '@jaytam/antd-ms';
import { Form } from 'antd';
import { useRequest } from 'ahooks';

type MsColumns = MsFormColumnType | rulesConfigFormColumns;

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

export default () => {
  const [form] = Form.useForm();
  const mode = Form.useWatch('mode', form);
  const columns = useMemo<MsColumns[]>(
    () => [
      {
        title: '模式',
        dataIndex: 'mode',
        valueType: 'radio',
        valueEnum: { edit: '编辑', read: '只读' },
        fieldProps: { optionType: 'button' },
        initialValue: 'edit',
        mode: 'edit',
      },
      {
        title: '列表',
        dataIndex: 'list',
        valueType: 'formList',
        columns: (_: any, index: number) => [
          {
            title: '分组' + (index + 1),
            valueType: 'group',
            colProps: { span: 24 },
            columns: [
              {
                title: '团队',
                valueType: 'select',
                dataIndex: 'team',
                valueEnum: {
                  ms: '马上云',
                  devops: 'Devops',
                },
              },
              {
                dataIndex: 'textList',
                valueType: 'formList',
                initialValue: [{}],
                formItemProps: { style: { marginBottom: 0 } },
                fieldProps: {
                  hideAddButton: true,
                  actions: ['add', 'del'],
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
              {
                title: '规则配置',
                valueType: 'rulesConfig',
                dataIndex: 'demolist',
                ellipsis: false,
                formItemProps: {
                  tooltip: '监控周期内按关联指标的计算方式计算出的值',
                  rules: [{ required: true, message: '规则配置必填' }],
                },
                columns: [
                  {
                    title: '显隐',
                    dataIndex: 'parent',
                    valueType: 'switch',
                  },
                  {
                    dataIndex: 'name',
                    // valueType: 'text',
                    fieldProps: {
                      placeholder: '请输入',
                    },
                  },
                  {
                    dataIndex: 'name1',
                    valueType: 'select',
                    valueEnum: [
                      { label: '等于', value: 'EQ' },
                      { label: '大于', value: 'GT' },
                      { label: '小于', value: 'LT' },
                    ],
                    rules: [{ required: true, message: '请选择选项' }],
                    fieldProps: {
                      placeholder: '请选择',
                      getPopupContainer: () => document.body,
                    },
                  },
                  {
                    dataIndex: 'name2',
                    // valueType: 'text',
                    dependencies: ['parent'],
                    hideInForm: (depValue: Record<string, any>) => {
                      return depValue?.parent === 'false' || !depValue?.parent ? false : true;
                    },
                    rules: [{ required: true, message: '请输入值' }],
                    fieldProps: {
                      placeholder: '请输入',
                    },
                  },
                ],
                fieldProps: {
                  multiple: true,
                  initialColumnValue: { name: '123', name1: 'EQ', parent: true },
                  fileNames: {
                    combinator: 'logicRelationship',
                    rules: 'childRules',
                  },
                  combinatorValue: ['1', '2'],
                },
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  const getRulesData = async () => {
    await sleep();
    return {
      data: {
        list: [
          {
            team: 'ms',
            textList: [
              {
                text1: '1234567',
                text2: 'aavvvss',
              },
              {
                text1: '1234567111',
                text2: 'aavvvss222',
              },
            ],
            demolist: {
              pk: 1,
              logicRelationship: '1',
              childRules: [
                {
                  parent: true,
                  name: 'aaaaaaa',
                  name1: 'GT',
                },
                {
                  parent: false,
                  name: 'aaaaaaabbb',
                  name1: 'EQ',
                  name2: '出来吧，神龙',
                },
                {
                  logicRelationship: '2',
                  childRules: [
                    {
                      parent: false,
                      name: 'aaaaaaabbb',
                      name1: 'EQ',
                      name2: '出来吧，神龙',
                    },
                    {
                      parent: false,
                      name: 'aaaaaaabbb',
                      name1: 'EQ',
                      name2: '出来吧，神龙',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    };
  };

  useRequest(async () => {
    const res = await getRulesData();
    if (res?.data?.list?.length > 0) {
      form.setFieldValue(['list', 0, 'demolist'], res.data.list[0].demolist);
    }
  });

  return (
    <MsForm
      form={form}
      mode={mode}
      noCard
      columns={columns || []}
      // request={getRulesData}
      onFinish={async (values) => {
        console.log('🚀 ~ onFinish={async ~ values:', values);
      }}
    />
  );
};
