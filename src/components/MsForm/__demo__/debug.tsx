/**
 * title: 开发调试
 * description:
 * debug: true
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '基础配置',
      valueType: 'group',
      fieldProps: {
        id: 'g1',
      },
      columns: [
        {
          title: '输入框',
          dataIndex: 'text',
        },
        {
          title: '输入框1',
          dataIndex: 'tex1',
        },
        {
          title: '输入框2',
          dataIndex: 'tex2',
        },
        {
          title: '输入框3',
          dataIndex: 'tex3',
        },
        {
          title: '输入框4',
          dataIndex: 'text4',
        },
      ],
    },
    {
      title: '网络配置',
      valueType: 'collapse',
      fieldProps: {
        id: 'g2',
      },
      columns: [
        {
          title: '选择器',
          dataIndex: 'select',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
          formItemProps: {
            rules: [{ required: true }],
          },
        },
        {
          title: '选择器1',
          dataIndex: 'select1',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
        },
        {
          title: '选择器2',
          dataIndex: 'select2',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
        },
        {
          title: '选择器3',
          dataIndex: 'select3',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
        },
        {
          title: '选择器4',
          dataIndex: 'select4',
          valueType: 'select',
          valueEnum: {
            1: '私有网络',
            2: '专有网络',
          },
        },
      ],
    },
    {
      title: '预览配置',
      valueType: 'group',
      fieldProps: {
        id: 'g3',
      },
      columns: [
        {
          title: 'IP地址',
          dataIndex: 'ip',
        },
        {
          title: 'IP地址1',
          dataIndex: 'ip1',
        },
        {
          title: 'IP地址2',
          dataIndex: 'ip2',
        },
        {
          title: 'IP地址3',
          dataIndex: 'ip3',
        },
        {
          title: 'IP地址4',
          dataIndex: 'ip4',
        },
      ],
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} valuesNormal anchorGroup />;
};
