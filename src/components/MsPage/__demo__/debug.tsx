/**
 * title: 开发调试
 * description:
 * background: "#f0f3f4"
 * debug: true
 */

import { MsPage } from '@jaytam/antd-ms';

const mainRequest = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        name: 'ECS-instance-1667722950291',
        storage: 100,
        network: 1,
        ip: '192.186.1.1',
        createAt: new Date(),
        updateAt: new Date(),
        num: 3,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

const childRequest = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        name: 'ECS-instance-1667722950291',
        storage: 100,
        network: 1,
        ip: '192.186.1.1',
        createAt: new Date(),
        updateAt: new Date(),
        num: 3,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  return (
    <>
      <MsPage title="标题" request={mainRequest}>
        <MsPage.SubPage title="子页面">{(data) => JSON.stringify(data)}</MsPage.SubPage>
      </MsPage>
    </>
  );
};
