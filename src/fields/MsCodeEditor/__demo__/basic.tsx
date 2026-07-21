/**
 * title: 基本使用
 * description:
 */
import { MsCodeEditor, MsField, setField } from '@jaytam/antd-ms';

setField('codeEditor', MsCodeEditor);

export default () => {
  return (
    <MsField
      valueType="codeEditor"
      value={['function helloWorld() {', '   console.log("Hello world!");', '}'].join('\n')}
      onChange={(e: string) => {
        console.log('codeEditor内容变化后的回调', e);
      }}
      fieldProps={{
        width: '100%',
        height: '300px',
        language: 'javascript',
        theme: 'vs-dark',
      }}
    />
  );
};
