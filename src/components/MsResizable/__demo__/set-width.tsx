/**
 * title: 设置宽度
 * description: 设置宽度并拖动需要设置disabled为false 设置min(默认值:200) max(默认值:400) 默认宽度为min的值,如需初始化指定特定值则需传入 width 和 onChange
 */

import { MsResizable } from '@jaytam/antd-ms';
import { useLocalStorageState } from 'ahooks';
export default () => {
  const [width, setWidth] = useLocalStorageState('width', { defaultValue: 300 });
  return (
    <MsResizable min={200} max={600} height={400} width={width} onChange={setWidth}>
      展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案展示文案
    </MsResizable>
  );
};
