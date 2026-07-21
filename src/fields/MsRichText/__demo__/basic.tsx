/**
 * title: 基本使用
 * description:
 */
import { MsField, MsRichText, setField } from '@jaytam/antd-ms';

setField('richText', MsRichText);

export default () => {
  return (
    <>
      <MsField valueType="richText" />
    </>
  );
};
