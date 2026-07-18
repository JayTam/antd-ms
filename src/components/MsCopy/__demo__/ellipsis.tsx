/**
 * title: 超长省略
 */

import { MsCopy } from '@jaytam/antd-ms';

export default () => {
  return (
    <div style={{ width: '150px' }}>
      <MsCopy type="copyable" ellipsis>
        我是超长的文字描述，我是超长的文字描述，我是超长的文字描述，我是超长的文字描述
      </MsCopy>
    </div>
  );
};
