/**
 * title: 超出有滚动条,依赖字段切换影响下一个字段值
 */

import { MsField, hashNamesFilter } from '@jaytam/antd-ms';
import type { MsRulesConfigProps } from '@jaytam/antd-ms';
import { Button, Form, Space, Radio, type RadioChangeEvent } from 'antd';
import { useState, useMemo } from 'react';

export default () => {
  const [btnStatus, setBtnStatus] = useState<'1' | '2'>('1');
  const [form] = Form.useForm();

  const fieldProps = useMemo<MsRulesConfigProps>(
    () => ({
      valueType: 'rulesConfig',
      ellipsis: false,
      columns: [
        {
          dataIndex: 'name',
          valueType: 'text',
          rules: [{ len: 11, message: '字符长度必须为11' }],
          fieldProps: {
            style: { width: 174 },
            placeholder: '模型名称',
          },
        },
        {
          dataIndex: 'modelCode',
          valueType: 'select',
          valueEnum: [
            {
              value: '1',
              label: 'IP地址',
            },
            {
              value: '2',
              label: '域名地址',
            },
            {
              value: '3',
              label: '正则公式',
            },
            {
              value: '4',
              label: '数据资源取值',
            },
            {
              value: '5',
              label: '指定字段取值',
            },
          ],
          rules: [{ required: true, message: '请选择条件项' }],
          fieldProps: {
            style: { width: 174 },
            placeholder: '请选择',
            getPopupContainer: () => document.body,
          },
        },
        {
          dataIndex: 'operator',
          valueType: 'select',
          selectdLabelName: 'operatorName',
          valueEnum: [
            {
              value: 'eq',
              label: '等于',
            },
            {
              value: 'ne',
              label: '不等于',
            },
            {
              value: 'gt',
              label: '大于',
            },
            {
              value: 'lt',
              label: '小于',
            },
            {
              value: 'gte',
              label: '大于等于',
            },
            {
              value: 'lte',
              label: '小于等于',
            },
            {
              value: 'in',
              label: '包含',
            },
            {
              value: 'ni',
              label: '不包含',
            },
            {
              value: 'btw',
              label: '介于',
            },
            {
              value: 'null',
              label: '为空',
            },
            {
              value: 'notNull',
              label: '不为空',
            },
          ],
          rules: [{ required: true, message: '请选择运算符' }],
          fieldProps: {
            style: { width: 174 },
            placeholder: '请选择运算符',
            labelInValue: true,
            getPopupContainer: () => document.body,
          },
        },
        {
          dataIndex: 'name2',
          valueType: 'text',
          dependencies: ['operator', 'modelCode'],
          hideInForm: (depValue: Record<string, any>) => {
            return ['in', 'ni'].includes(depValue?.operator);
          },
          // 此属性优先级高于赋值，会覆盖数据，谨慎使用
          handleCurrentField: (dep, values, setCurrentField) => {
            if (dep === 'operator') {
              if (['gt'].includes(values?.operator)) {
                setCurrentField('18882228666');
              } else {
                setCurrentField(undefined);
              }
            }
            if (dep === 'modelCode') {
              if (['3'].includes(values?.modelCode)) {
                setCurrentField('1234567');
              }
            }
          },
          fieldProps: {
            style: { width: 174 },
            placeholder: '请输入',
          },
        },
        {
          dataIndex: 'min',
          valueType: 'number',
          dependencies: ['operator'],
          hideInForm: (depValue: Record<string, any>) => {
            return !['in', 'ni'].includes(depValue?.operator);
          },
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
          dependencies: ['operator'],
          hideInForm: (depValue: Record<string, any>) => {
            return !['in', 'ni'].includes(depValue?.operator);
          },
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
      ],
      fieldProps: {
        multiple: true,
        autoWidth: btnStatus === '1' ? '100%' : 'auto',
        wrap: btnStatus === '1' ? false : true,
        hideInForm: (depValue: Record<string, any>) => {
          return !['in', 'ni'].includes(depValue?.operator);
        },
        fileNames: {
          combinator: 'combinators_new',
          rules: 'rules_new',
        },
        combinatorValue: ['1', '0'],
      },
    }),
    [btnStatus],
  );

  return (
    <>
      <Radio.Group
        style={{ marginBlock: 16 }}
        defaultValue={btnStatus}
        onChange={(e: RadioChangeEvent) => {
          setBtnStatus(e?.target?.value);
        }}
      >
        <Radio.Button value="1">带滚动条</Radio.Button>
        <Radio.Button value="2">自动换行</Radio.Button>
      </Radio.Group>
      <Form colon={false} requiredMark={false} form={form}>
        <Form.Item
          name={'demoList'}
          rules={[{ required: true, message: '请配置规则' }]}
          label={'测试滚动条'}
        >
          <MsField {...fieldProps} />
        </Form.Item>
        <Space size={8} style={{ marginTop: 32 }}>
          <Button
            type="primary"
            onClick={() => {
              form.validateFields().then((values) => {
                console.log('🚀 ~ data:', hashNamesFilter(values));
                // form.resetFields();
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
    </>
  );
};
