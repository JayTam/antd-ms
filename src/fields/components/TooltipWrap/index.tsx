import type { TooltipProps } from 'antd';
import { Tooltip } from 'antd';

const TooltipWrap = ({
  showTooltip,
  children,
  ...toolTipProps
}: TooltipProps & { showTooltip?: boolean }) => {
  if (showTooltip) {
    return <Tooltip {...toolTipProps}>{children}</Tooltip>;
  }

  return children;
};

export default TooltipWrap;
