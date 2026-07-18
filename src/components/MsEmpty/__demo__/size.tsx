/**
 * title: 大小
 * description: 通过设置size 或者  imageStyle(优先级大于size)设置显示的图标大小
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
      <MsEmpty image="auth" size="large" description="暂无权限(大尺寸 180*160)" />
      <MsEmpty image="auth" description="暂无权限(默认尺寸 120*106)" />
      <MsEmpty image="auth" size="small" description="暂无权限(小尺寸 90*80)" />
      <MsEmpty
        image="auth"
        imageStyle={{ width: 300, height: 300 }}
        description="暂无权限(自定义尺寸)"
      />
    </div>
  );
};
