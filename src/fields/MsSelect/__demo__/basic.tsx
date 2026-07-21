/**
 * title: 基本使用
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

const SELECT_ENUM = {
  1: '选项一',
  2: '选项二',
  3: '选项三',
};

export default () => {
  return (
    <MsField valueType="select" valueEnum={SELECT_ENUM} fieldProps={{ style: { width: 200 } }} />
  );
};
