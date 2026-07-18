/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

export default () => {
  const OPTION_ENUM = ['选项一', '选项二'];

  return (
    <MsField
      valueType="autoComplete"
      fieldProps={{ style: { width: '100%' } }}
      valueEnum={OPTION_ENUM}
    />
  );
};
