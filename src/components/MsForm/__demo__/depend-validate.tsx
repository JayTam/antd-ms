/**
 * title: 动态校验
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

const SELECT_ENUM = {
  v4: 'IPV4',
  v6: 'IPV6',
};

const IPV4_PATTERN =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPV6_PATTERN =
  /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(::[0-9a-fA-F]{1,4}){1,7}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}:(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}:(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}:(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}:(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: 'IP类型',
      dataIndex: 'type',
      valueType: 'radio',
      valueEnum: SELECT_ENUM,
      initialValue: 'v4',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip1',
      dependencies: ['type'],
      initialValue: '192.168.0.1',
      formItemProps: (form) => {
        const isV4 = form.getFieldValue('type') === 'v4';
        return {
          extra: (
            <>
              formItemProps是函数
              <br />
              {isV4
                ? '请输入符合 ipv4 的格式，例如：192.168.0.1'
                : '请输入符合 ipv6 的格式，例如：2001:0db8:85a3:0000:0000:8a2e:0370:7334'}
            </>
          ),
          rules: [
            {
              pattern: isV4 ? IPV4_PATTERN : IPV6_PATTERN,
              message: isV4 ? '输入不符合 ipv4 格式' : '输入不符合 ipv6 格式',
              validateTrigger: 'onBlur',
            },
          ],
        };
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip2',
      dependencies: ['type'],
      initialValue: '192.168.0.1',
      formItemProps: {
        extra: 'formItemProps不是函数，ruleRender是函数',
        rules: [
          (form) => {
            const isV4 = form.getFieldValue('type') === 'v4';
            return {
              pattern: isV4 ? IPV4_PATTERN : IPV6_PATTERN,
              message: isV4 ? '输入不符合 ipv4 格式' : '输入不符合 ipv6 格式',
              validateTrigger: 'onBlur',
            };
          },
        ],
      },
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} />;
};
