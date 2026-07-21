/**
 * title: 二次确认
 */

import { MsActions } from '@jaytam/antd-ms';

export default () => {
  function handlePromise() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(''), 2000);
    });
  }

  return (
    <>
      <MsActions
        limit={3}
        items={[
          {
            label: '简单确认',
            confirmProps: {
              title: '二次确认提示',
              onConfirm: handlePromise,
            },
          },
          {
            label: '隐藏取消按钮',
            confirmProps: { title: 'showCancel 隐藏取消按钮', showCancel: false },
          },
          {
            label: '修改弹窗位置',
            confirmProps: { title: 'placement 修改弹窗位置', placement: 'right' },
          },
          {
            label: '在更多中打开',
            confirmProps: {
              title: '在更多菜单中，始终是用 MsConfirm 打开确认弹窗',
              onConfirm: handlePromise,
            },
          },
          {
            label: '修改弹窗标题',
            confirmProps: {
              title: '可以使用 confirmTitle 修改 MsConfirm 标题，它不对 Popconfirm 生效',
              confirmTitle: '自定义标题',
            },
          },
        ]}
      />
    </>
  );
};
