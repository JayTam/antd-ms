/**
 * title: 远程请求
 * description:
 * background: "#f0f3f4"
 */
import { MsPage } from '@jaytam/antd-ms';

const sleep = (time = 1000) => new Promise((resolve) => setTimeout(() => resolve(''), time));

const request = async () => {
  await sleep();
  return {
    data: { name: 'ECS_AUTO_NAME_0001', network: '私有网络', ip: '192.168.0.1' },
  };
};

export default () => {
  return (
    <>
      <MsPage title="远程请求" request={request}>
        {(data) => (
          <div>
            <p>实例名称：{data?.name}</p>
            <p>网络类型：{data?.network}</p>
            <p>IP地址：{data?.ip}</p>
          </div>
        )}
      </MsPage>
    </>
  );
};
