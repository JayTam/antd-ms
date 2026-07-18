/**
 * title: 基本使用
 */

import { MsResizable } from '@jaytam/antd-ms';
export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <MsResizable
        height={200}
        contentWrapperStyle={{ overflow: 'hidden' }}
        expandStyle={{ top: 0 }}
      >
        左侧区域 左侧区域 左侧区域 左侧区域 左侧区域 左侧区域 左侧区域 左侧区域 左侧区域 左侧区域
        左侧区域 左侧区域 左侧区域 左侧区域 左侧区域
      </MsResizable>
      <div
        style={{
          flex: 1,
          padding: 16,
          margin: '0 16px',
          overflow: 'hidden',
          backgroundColor: '#fafafa',
        }}
      >
        中间区域 中间区域 中间区域 中间区域 中间区域 中间区域 中间区域 中间区域 中间区域
      </div>
      <MsResizable height={200} expandStyle={{ bottom: 0 }} position="right">
        右侧区域 右侧区域 右侧区域 右侧区域 右侧区域 右侧区域 右侧区域 右侧区域 右侧区域 右侧区域
        右侧区域 右侧区域 右侧区域 右侧区域 右侧区域
      </MsResizable>
    </div>
  );
};
