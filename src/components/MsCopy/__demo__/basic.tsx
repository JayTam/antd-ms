/**
 * title: 基本使用
 */

import { MsCopy } from '@jaytam/antd-ms';
import { Button } from 'antd';

export default () => {
  return (
    <MsCopy text="abcdefg">
      <Button>点击复制</Button>
    </MsCopy>
  );
};
