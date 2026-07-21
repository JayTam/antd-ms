/**
 * title: 异步开关
 * description:
 */
import { MsField } from '@jaytam/antd-ms';

const requestSwitch = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 200, data: true });
    }, 500);
  });
};

export default () => {
  return (
    <MsField
      valueType="switch"
      fieldProps={{
        request: requestSwitch,
        defaultValue: false,
        popconfirmProps: {
          title: '确认改变状态吗？',
        },
      }}
    />
  );
};
