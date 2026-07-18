/**
 * title: 标签尺寸
 * description:
 */

import { MsStatus } from '@jaytam/antd-ms';
import { Space } from 'antd';

export default () => {
  return (
    <>
      <div>
        <Space wrap>
          <MsStatus type="tag" size="mini">
            迷你尺寸
          </MsStatus>
          <MsStatus type="tag" size="small">
            默认尺寸
          </MsStatus>
          <MsStatus type="tag" size="middle">
            中型尺寸
          </MsStatus>
          <MsStatus type="tag" size="large">
            大型尺寸
          </MsStatus>
        </Space>
      </div>
    </>
  );
};
