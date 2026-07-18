/**
 * title: 季度
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="dateRange" fieldProps={{ picker: 'quarter' }} />;
};
