/**
 * title: 错误占位
 * description: 错误加载将不再提供预览功能
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  return <MsField valueType="image" fieldProps={{ src: 'error', width: 100, height: 100 }} />;
};
