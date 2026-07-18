/**
 * title: 基本使用
 * description:
 */
import { MsDiffEditor, MsField, setField } from '@jaytam/antd-ms';

setField('diffEditor', MsDiffEditor);

export default () => {
  return (
    <MsField
      valueType="diffEditor"
      value={{
        original: ['function helloWorld() {', '   console.log("Hello world!");', '}'].join('\n'),
        modified: ['function helloWorld() {', '   console.log("Hello summer!");', '}'].join('\n'),
      }}
      onChange={(e) => {
        console.log('diffEditor内容变化后的回调', e);
      }}
      fieldProps={{
        width: '100%',
        height: '300px',
        language: 'javascript',
        theme: 'vs-dark',
        diffChanges: (changes) => {
          console.log(changes);
        },
      }}
    />
  );
};
