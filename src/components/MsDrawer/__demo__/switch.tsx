/**
 * title: 切换内容
 * description: 不重新打开抽屉，仅更新抽屉内容
 */

import type { MsDrawerHandlerType } from '@jaytam/antd-ms';
import { MsDrawer } from '@jaytam/antd-ms';
import { useRequest } from 'ahooks';
import { Button, Skeleton, Space } from 'antd';
import { useState } from 'react';

const request = (params: { userIndex?: number }): Promise<any> => {
  const { userIndex = 0 } = params;

  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          name: ['Mike', 'Jay', 'Tom'][userIndex % 2],
          age: Math.floor(Math.random() * 10) + 20,
          skills: ['Vue', 'React', 'Webpack', 'Vite', 'Angular'][userIndex % 4],
        }),
      1000,
    );
  });
};

type MyDrawerProps = { userIndex?: number; onPrev?: () => void; onNext?: () => void };

const MyDrawer = MsDrawer.create((props: MyDrawerProps) => {
  const { userIndex } = props;
  const drawer = MsDrawer.useDrawer();

  const { data, loading } = useRequest(() => request({ userIndex }), {
    refreshDeps: [userIndex],
  });

  return (
    <MsDrawer
      {...drawer.props}
      title="个人信息"
      footer={
        <Space>
          <Button disabled={loading} onClick={props.onPrev}>
            上一个
          </Button>
          <Button disabled={loading} onClick={props.onNext}>
            下一个
          </Button>
        </Space>
      }
    >
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <p>姓名：{data.name}</p>
          <p>年龄：{data.age}</p>
          <p>技能：{data.skills}</p>
        </>
      )}
    </MsDrawer>
  );
});

export default () => {
  const [userIndex, setUserIndex] = useState(0);
  const drawerHandler: MsDrawerHandlerType = {};

  return (
    <>
      {/* 不能在 open 中传参，要在 ModalHolder 组件上传参，否则不能动态更新 */}
      <Button onClick={() => drawerHandler.open?.()}>打开</Button>
      <MsDrawer.DrawerHolder
        drawer={MyDrawer}
        handler={drawerHandler}
        // 传入自定义抽屉参数
        userIndex={userIndex}
        onPrev={() => setUserIndex((prev) => prev - 1)}
        onNext={() => setUserIndex((prev) => prev + 1)}
      />
    </>
  );
};
