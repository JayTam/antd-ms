/**
 * title: 子页面
 * description:
 * background: "#f0f3f4"
 */
import { MsPage } from '@jaytam/antd-ms';

const { SubPage } = MsPage;

export default () => {
  const request = () => {
    const data = { name: 'xxxx', network: 1, ip: '192.168.0.1' };
    return new Promise((resolve) => {
      const res = {
        data,
      };
      setTimeout(() => resolve(res), 2000);
    });
  };
  return (
    <>
      <MsPage title="主标题">
        <SubPage title="子标题 - common" titleType="common" request={request} divider>
          我是内容渲染区域
        </SubPage>
        <SubPage title="子标题 - gradient" titleType="gradient" divider request={request}>
          我是内容渲染区域
        </SubPage>
        <SubPage title="子标题 - flag" titleType="flag" divider request={request}>
          我是内容渲染区域
        </SubPage>
        <SubPage title="子标题 - block" titleType="block" request={request}>
          我是内容渲染区域
        </SubPage>
      </MsPage>
    </>
  );
};
