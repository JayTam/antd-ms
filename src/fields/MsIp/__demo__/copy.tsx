/**
 * title: 粘贴IP
 * description:
 */
import { MsCopy, MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsForm
        noCard
        submitter={{ render: () => null }}
        columns={[
          {
            title: '复制IP',
            fieldRender: <MsCopy type="copyable">192.168.0.1</MsCopy>,
          },
          {
            title: 'ip',
            valueType: 'ip',
            fieldProps: { style: { width: 300 } },
          },
          {
            title: '复制网段',
            fieldRender: <MsCopy type="copyable">192.168.0.1/16</MsCopy>,
          },
          {
            title: '网段地址',
            valueType: 'ip',
            fieldProps: {
              cidrType: 'segment',
              style: { width: 300 },
            },
          },
        ]}
      />
    </>
  );
};
