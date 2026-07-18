/**
 * title: 年
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="date" fieldProps={{ picker: 'year' }} />;
};
