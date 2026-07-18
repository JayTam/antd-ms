import MsRulesConfig from '@jaytam/antd-ms/fields/MsRulesConfig/components/RulesConfig';
import { render, screen } from '@testing-library/react';

describe('测试MsRulesConfig基础使用', () => {
  it('测试MsRulesConfig的单层配置', () => {
    const { container } = render(
      <MsRulesConfig
        columns={[
          {
            dataIndex: 'name',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
          {
            dataIndex: 'modelCode',
            valueType: 'select',
            valueEnum: {
              0: '选项0',
              1: '选项1',
            },
            fieldProps: {
              style: { width: 174 },
              placeholder: '请选择',
            },
          },
          {
            dataIndex: 'name1',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
        ]}
      />,
    );

    expect(screen.getByText('请选择')).toBeInTheDocument();
    const inputElement = container.querySelector('.ant-input');
    expect(inputElement).toHaveAttribute('placeholder', '请输入');
  });

  it('测试MsRulesConfig的多层配置', () => {
    const { container } = render(
      <MsRulesConfig
        multiple
        columns={[
          {
            dataIndex: 'name',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
          {
            dataIndex: 'modelCode',
            valueType: 'select',
            valueEnum: {
              0: '选项0',
              1: '选项1',
            },
            fieldProps: {
              style: { width: 174 },
              placeholder: '请选择',
            },
          },
          {
            dataIndex: 'name1',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
        ]}
      />,
    );

    const hoverBtn = container.querySelector('.ant-dropdown-trigger');
    expect(hoverBtn).toBeInTheDocument();
  });

  it('测试单层MsRulesConfig的数据回显', () => {
    render(
      <MsRulesConfig
        fileNames={{
          combinator: 'combinators_new',
          rules: 'rules_new',
        }}
        columns={[
          {
            dataIndex: 'name',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
          {
            dataIndex: 'modelCode',
            valueType: 'select',
            valueEnum: {
              0: '选项0',
              1: '选项1',
            },
            fieldProps: {
              style: { width: 174 },
              placeholder: '请选择',
            },
          },
          {
            dataIndex: 'name1',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
        ]}
        value={{
          combinators_new: 'or',
          rules_new: [
            {
              modelCode: '0',
              modelName: '选项0',
              name: '1',
              name1: '2',
            },
            {
              modelCode: '1',
              modelName: '选项1',
              name: '3',
              name1: '4',
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('或')).toBeInTheDocument();
  });

  it('测试多层MsRulesConfig的数据回显', async () => {
    render(
      <MsRulesConfig
        fileNames={{
          combinator: 'b',
          rules: 'c',
        }}
        multiple
        columns={[
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
            fieldProps: {
              style: { width: 174 },
              placeholder: '请选择',
              labelInValue: true,
            },
          },
          {
            dataIndex: 'name2',
            valueType: 'text',
            fieldProps: {
              placeholder: '请输入',
            },
          },
        ]}
        value={{
          b: 'or',
          c: [
            {
              name: '回显name',
              name1: '0',
              name2: '回显name2',
            },
            {
              b: 'and',
              c: [
                {
                  name: '回显name_1',
                  name1: '1',
                  name2: '回显name2_1',
                },
                {
                  name: '回显name_2',
                  name1: '0',
                  name2: '回显name2_2',
                },
              ],
            },
          ],
        }}
      />,
    );

    expect(screen.getByText('或')).toBeInTheDocument();
    expect(screen.getByText('且')).toBeInTheDocument();
  });
});
