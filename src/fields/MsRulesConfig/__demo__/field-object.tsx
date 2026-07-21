/**
 * title: FastX同步此组件需求实现
 */

import { hashNamesFilter, MsForm } from '@jaytam/antd-ms';
import { Button, Form, Space } from 'antd';
import AddonInputNumber from './AddonInputNumber';

import type { rulesConfigFormColumns, MsFormColumnType } from '@jaytam/antd-ms';
// import { useEffect } from 'react';

type MsColumns = MsFormColumnType | rulesConfigFormColumns;

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

export const THRESHOLD_ENUM = [
  { value: 'VALUE', label: '原始值' },
  { value: 'AVG', label: '平均值' },
  { value: 'MAX', label: '最大值' },
  { value: 'MIN', label: '最小值' },
  { value: 'SUM', label: '总和' },
  { value: 'COUNT', label: '总数' },
];

export const OPERATE_BASE_ENUM = [
  { value: 'EQ', label: '等于' },
  { value: 'GT', label: '大于' },
  { value: 'LT', label: '小于' },
  { value: 'GE', label: '大于等于' },
  { value: 'LE', label: '小于等于' },
];

export const OPERATE_ENUM = [
  ...OPERATE_BASE_ENUM,
  {
    value: 'MOM_UP_RATE',
    label: '环比增长率%',
    children: OPERATE_BASE_ENUM,
  },
  {
    value: 'MOM_DOWN_RATE',
    label: '环比降低率%',
    children: OPERATE_BASE_ENUM,
  },
  {
    value: 'MOM_UP',
    label: '环比增长量',
    children: OPERATE_BASE_ENUM,
  },
  {
    value: 'MOM_DOWN',
    label: '环比降低量',
    children: OPERATE_BASE_ENUM,
  },
];

export const AGGTYPE_ENUM = [
  { value: 'AVG', label: '平均值' },
  { value: 'MAX', label: '最大值' },
  { value: 'MIN', label: '最小值' },
  { value: 'SUM', label: '总和' },
];

export default () => {
  const [form] = Form.useForm();
  const mode = Form.useWatch('mode', form);

  const getSelect = async (props: any) => {
    await sleep();
    if (props.field === 'COUNT') {
      return {
        data: [
          {
            label: '100',
            value: '100',
          },
          {
            label: '200',
            value: '200',
          },
          {
            label: '300',
            value: '300',
          },
          {
            label: 'fastx-alert-test',
            value: 'fastx-alert-test',
          },
        ],
      };
    }
    if (props.field === 'AVG') {
      const arr = new Array(4000);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = i;
      }
      return {
        data: arr,
      };
    }
    return {
      data: [],
    };
  };

  const columns: MsColumns[] = [
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
      title: 'hello',
      dataIndex: 'hello',
      formItemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
    },
    {
      title: '规则配置',
      valueType: 'rulesConfig',
      dataIndex: 'tc',
      columns: [
        {
          dataIndex: 'min',
          valueType: 'number',
          rules: [{ required: true, message: '请输入最小值' }],
          fieldProps: {
            placeholder: '最小值',
            style: { width: 100 },
            min: 1,
          },
        },
        {
          dataIndex: 'max',
          valueType: 'number',
          rules: [
            { required: true, message: '请输入最大值' },
            { max: 100, message: '最大值不能超过100' },
            {
              validator: (lineValues) => {
                if (+lineValues.max < +lineValues.min) {
                  return Promise.resolve(['error', '最大值不能小于最小值']);
                }
                return Promise.resolve(['success', '']);
              },
            },
          ],
          fieldProps: {
            placeholder: '最大值',
            style: { width: 100 },
            max: 101,
          },
        },
        {
          dataIndex: 'time',
          valueType: 'date',
          fieldProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: '请选择',
            style: { width: 180 },
          },
        },
        {
          dataIndex: 'field',
          valueType: 'select',
          fieldProps: {
            placeholder: '请选择比较类型',
            style: { width: 180 },
          },
          rules: [{ required: true, message: '请选择比较类型' }],
          valueEnum: THRESHOLD_ENUM,
        },
        {
          dataIndex: 'op',
          valueType: 'cascader',
          fieldProps: {
            placeholder: '请选择条件',
            style: { width: 180 },
          },
          rules: [{ required: true, message: '请选择条件' }],
          valueEnum: OPERATE_ENUM,
        },
        {
          dataIndex: 'suppression',
          colProps: { span: 4 },
          fieldRender: <AddonInputNumber placeholder="抑制周期" />,
          rules: [{ required: true, message: '请输入' }],
        },
        {
          dataIndex: 'values',
          dependencies: ['op'],
          valueType: 'number',
          fieldProps: {
            placeholder: '请输入值',
          },
          rules: [{ required: true, message: '请输入值' }],
          hideInForm: (depValue: Record<string, any>) => {
            return !depValue?.op?.[0];
          },
          resetFieldProps: (depValue: Record<string, any>) => {
            return {
              disabled: !depValue?.field ? true : false,
              style: { width: 150 },
              addonAfter: ['MOM_UP_RATE', 'MOM_DOWN_RATE'].includes(depValue?.op?.[0])
                ? '%'
                : undefined,
            };
          },
          fieldReadRender: (item: Record<string, any>) => {
            if (item.op && (item.op.includes('MOM_UP_RATE') || item.op.includes('MOM_DOWN_RATE'))) {
              return `${item.values}%`;
            }
            return item.values;
          },
        },
        {
          dataIndex: 'resultAggType',
          dependencies: ['op'],
          valueType: 'select',
          rules: [{ required: true, message: '请选择' }],
          fieldProps: {
            placeholder: '请选择聚合类型',
            style: { width: 150 },
          },
          valueEnum: AGGTYPE_ENUM,
          hideInForm: (depValue: Record<string, any>) => {
            return !(depValue?.op?.length > 1);
          },
        },
        {
          dataIndex: 'selectOption',
          valueType: 'select',
          rules: [
            { required: true, message: '请选择' },
            { len: 1, message: '可选数组只能选一项' },
          ],
          fieldProps: {
            placeholder: '依赖有值有选项',
            style: { width: 150 },
            mode: 'tags',
            maxTagCount: 'responsive',
            autoSelect: 'value',
          },
          dependencies: ['field', 'op'],
          params: { a: 1 },
          request: getSelect,
          resetFieldProps: (depValue) => {
            if (depValue?.field === 'COUNT' || depValue?.field === 'AVG') {
              return {
                disabled: false,
                filterSort: (a: Record<string, any>, b: Record<string, any>) => {
                  const aIndex = (depValue?.selectOption || []).includes(a?.value) ? 1 : -1;
                  const bIndex = (depValue?.selectOption || []).includes(b?.value) ? 1 : -1;
                  return bIndex - aIndex;
                },
              };
            }
            return {
              disabled: true,
              value: void 0,
            };
          },
        },
      ],
      fieldProps: {
        combinatorDisabled: false,
        wrap: true,
        multiple: true,
        combinatorValue: ['AND', 'OR'],
        fileNames: {
          combinator: 'logicType',
          rules: 'children',
        },
      },
    },
  ];

  const click = () => {
    form.setFieldsValue({
      hello: 'hello world',
      tc: {
        logicType: 'AND',
        pk: '1', // 外部设置组件值，需传入pk === '1',否则设置只有初始化会成功
        children: [
          {
            min: 2,
            max: 1,
            time: '2025-08-11 08:09:10',
            op: ['EQ'],
            field: 'COUNT',
            selectOption: ['fastx-alert-test'],
            values: 123,
            suppression: '123&day',
          },
        ],
      },
    });
  };

  // useEffect(() => {
  //   click();
  // });

  const getRulesData = async () => {
    await sleep();
    return {
      data: {
        hello: 'hello world',
        tc: {
          logicType: 'AND',
          pk: '1', // 外部设置组件值，需传入pk === '1',否则设置只有初始化会成功
          children: [
            {
              min: 1,
              max: 0,
              time: '2025-08-11 08:09:10',
              op: ['EQ'],
              field: 'COUNT',
              selectOption: ['fastx-alert'],
              values: 123,
              suppression: '123&day',
            },
            {
              min: 12,
              max: 101,
              time: '2025-08-14 08:09:10',
              op: ['GT'],
              field: 'AVG',
              selectOption: ['500'],
              values: 666,
              suppression: '666&day',
            },
          ],
        },
      },
    };
  };

  return (
    <div>
      <Space style={{ margin: 8 }}>
        <Button onClick={click}>触发</Button>
        <Button
          type={'primary'}
          onClick={async () => {
            try {
              await form.validateFields();
            } catch (error) {
              console.error('🚀 ~ error:', error);
            }
          }}
        >
          捕获错误
        </Button>
      </Space>
      <MsForm
        form={form}
        noCard
        request={getRulesData}
        mode={mode}
        colon={false}
        requiredMark={false}
        successNotify={false}
        columns={columns}
        onFinish={async (values) => {
          console.log('🚀 ~ onFinish={async ~ values:', hashNamesFilter(values));
          form.resetFields();
        }}
      />
    </div>
  );
};
