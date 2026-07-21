/**
 * title: 缺省图
 * description:
 */

import { MsEmpty } from '@jaytam/antd-ms';
export default () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <MsEmpty image="add" description="创建" />
      <MsEmpty image="auth" description="暂无权限" />
      <MsEmpty image="empty" description="暂无内容" />
      <MsEmpty image="select" description="选择" />
      <MsEmpty image="search" description="搜索为空" />
    </div>
  );
};
