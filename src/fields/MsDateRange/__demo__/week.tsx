/**
 * title: 周
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="dateRange" fieldProps={{ picker: 'week' }} />;
};
