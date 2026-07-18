/**
 * title: 日-时间
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="dateRange" fieldProps={{ showTime: true }} />;
};
