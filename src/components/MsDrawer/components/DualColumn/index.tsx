/**
 * Description:
 * 分栏抽屉Layout
 */
import { Spin } from 'antd';
import type { MsDrawerProps } from '../../types';
import './index.less';

const DualColumn = (props: MsDrawerProps) => {
  // 定义一个正则表达式来验证宽度值
  const validWidthRegex = /^(?:\d+(px)|\d+(\.\d+)?%)$/;

  const {
    children,
    dualColumnLoading = false,
    rightContentWidth = 375,
    rightContentRender,
    bottomContentRender,
    rightContentStyle,
    leftContentStyle,
    bottomContentStyle,
  } = props;

  // 宽度可以传递百分比 像素以及具体数值(转换成px)
  let width = '375px';
  if (!rightContentWidth) {
    return;
  } else if (typeof rightContentWidth === 'number') {
    width = `${rightContentWidth}px`;
  } else if (validWidthRegex.test(rightContentWidth)) {
    width = rightContentWidth;
  } else {
    console.error(`Invalid width value: ${width}. Expected a valid unit (px, %) or a number.`);
  }

  return (
    <Spin spinning={dualColumnLoading}>
      <div className="ms-dual-column-drawer-layout">
        <div className="ms-dual-column-drawer-left" style={{ ...leftContentStyle }}>
          {children}
        </div>
        {rightContentRender && (
          <div className="ms-dual-column-drawer-right" style={{ width, ...rightContentStyle }}>
            {rightContentRender}
          </div>
        )}
        {bottomContentRender && (
          <div style={{ ...bottomContentStyle }} className="ms-dual-column-drawer-bottom">
            {bottomContentRender}
          </div>
        )}
      </div>
    </Spin>
  );
};
export default DualColumn;
