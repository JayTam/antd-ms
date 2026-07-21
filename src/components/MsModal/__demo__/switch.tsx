/**
 * title: 切换内容
 * description: 不重新打开弹窗，仅更新弹窗内容
 */

import type { MsModalHandlerType } from '@jaytam/antd-ms';
import { MsModal } from '@jaytam/antd-ms';
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

type MyModalProps = { userIndex?: number; onPrev?: () => void; onNext?: () => void };

const MyModal = MsModal.create((props: MyModalProps) => {
  const { userIndex } = props;
  const modal = MsModal.useModal();

  const { data, loading } = useRequest(() => request({ userIndex }), {
    refreshDeps: [userIndex],
  });

  return (
    <MsModal
      {...modal.props}
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
    </MsModal>
  );
});

export default () => {
  const [userIndex, setUserIndex] = useState(0);
  const modalHandler: MsModalHandlerType = {};

  return (
    <>
      {/* 不能在 open 中传参，要在 ModalHolder 组件上传参，否则不能动态更新 */}
      <Button onClick={() => modalHandler.open?.()}>打开</Button>
      <MsModal.ModalHolder
        modal={MyModal}
        handler={modalHandler}
        // 传入自定义弹窗参数
        userIndex={userIndex}
        onPrev={() => setUserIndex((prev) => prev - 1)}
        onNext={() => setUserIndex((prev) => prev + 1)}
      />
    </>
  );
};
