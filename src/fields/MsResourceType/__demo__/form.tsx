/**
 * title: MsForm
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <MsForm
      columns={[
        {
          title: '资源类型',
          dataIndex: 'type',
          valueType: 'resourceType',
        },
      ]}
    />
  );
};
