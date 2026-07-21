/**
 * title: 月
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="date" fieldProps={{ picker: 'month' }} />;
};
