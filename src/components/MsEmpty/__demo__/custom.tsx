/**
 * title: 自定义
 * description:
 */

import { MsEmpty, MsIconFont } from '@jaytam/antd-ms';
import { Empty } from 'antd';

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
      <MsEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <MsEmpty
        image={
          <MsIconFont
            type="icon-order-list"
            compatibleType="icon-ram-permission"
            style={{ fontSize: 50 }}
          />
        }
      />
      <MsEmpty
        imageStyle={{ width: 50, height: 50 }}
        image="https://example.com/static/empty.png"
      />
    </div>
  );
};
