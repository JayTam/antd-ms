/**
 * title: 选项卡
 * description: 配置tabs选项时，MsPage不添加children内容，否则tabs配置会失效渲染children内容。
 * background: "#f0f3f4"
 */
import { MsPage } from '@jaytam/antd-ms';

const request = (params: any) => {
  console.log('params', params);
  return new Promise((resolve) => {
    const res = {
      data: { name: 'xxxx', network: 1, ip: '192.168.0.1' },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

export default () => {
  return (
    <>
      <MsPage
        title="标题"
        tabs={[
          { key: 'tab1', label: 'tab1', children: '我是tab1的渲染区域' },
          { key: 'tab2', label: 'tab2', children: '我是tab2的渲染区域' },
          { key: 'tab3', label: 'tab3', children: '我是tab3的渲染区域' },
          {
            key: 'tab4',
            label: '跳转外链',
            link: 'https://www.baidu.com',
          },
          {
            key: 'tab5',
            label: '自定义跳转',
            onLink() {
              window.location.href = 'https://cn.bing.com/';
            },
          },
        ]}
        request={request}
        tabsProps={{
          defaultActiveKey: 'tab1',
        }}
      />
    </>
  );
};
