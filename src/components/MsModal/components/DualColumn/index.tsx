/**
 * Description:
 * 分栏弹窗Layout
 */
import { Spin } from 'antd';
import type { MsModalProps } from '../../types';
import './index.less';
const DualColumn = (props: MsModalProps) => {
  // 定义一个正则表达式来验证宽度值
  const validWidthRegex = /^(?:\d+(px)|\d+(\.\d+)?%)$/;

  const {
    title,
    children,
    footer,
    dualColumnLoading = false,
    rightContentWidth = 375,
    rightContentRender,
  } = props;

  // 宽度可以传递百分比 像素以及具体数值(转换成px)
  let width = '375px';
  if (typeof rightContentWidth === 'number') {
    width = `${rightContentWidth}px`;
  } else if (validWidthRegex.test(rightContentWidth)) {
    width = rightContentWidth;
  } else {
    console.error(`Invalid width value: ${width}. Expected a valid unit (px, %) or a number.`);
  }
  const style = { width: `calc(100% - ${width})` };

  return (
    <Spin spinning={dualColumnLoading}>
      <div className="ms-dual-column-modal-layout">
        <div className="ms-dual-column-modal-left" style={style}>
          <div className="ms-dual-column-left-content">
            {title && <div className="ms-dual-column-left-title">{title}</div>}
            {children}
          </div>
          {footer && <div className="ms-dual-column-modal-footer">{footer}</div>}
        </div>
        {rightContentRender && (
          <div className="ms-dual-column-modal-right" style={{ width }}>
            <div className="ms-dual-column-modal-content">{rightContentRender}</div>
          </div>
        )}
      </div>
    </Spin>
  );
};
export default DualColumn;
