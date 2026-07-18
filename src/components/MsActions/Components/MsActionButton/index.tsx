import type { ButtonProps } from 'antd';
import { Button, Popconfirm, Tooltip } from 'antd';
import type { MsActionButtonProps } from './types';
import { useActionContext } from '../../contexts/action';
import { MsConfirm } from '@jaytam/antd-ms';
import MsActionsConfirm from '../MsActionsConfirm';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsActionButton = (props: MsActionButtonProps) => {
  const {
    children,
    content,
    popover,
    tooltipProps,
    disabledTooltip,
    // @ts-ignore 历史遗留问题，过一段时间可以删除了
    disableToolTip,
    tooltip,
    actionsType,
    confirmProps,
    onClick,
    ...restProps
  } = props;

  const { inMenu } = useActionContext();
  const { currentLocale } = useLocale('MsActions');

  /** 禁用 tooltip，兼容以前的 content */
  const disableTitle = disabledTooltip ?? disableToolTip ?? content;

  /** tooltip 配置透传，兼容以前的  popover */
  const tooltipConfig = tooltipProps ?? disableToolTip ?? popover;

  /**
   * 重写 onClick 事件，增加 confirm 逻辑
   */
  const handleClick: ButtonProps['onClick'] = (event) => {
    onClick?.(event);
    if (inMenu && confirmProps) {
      MsConfirm.open(MsActionsConfirm, confirmProps);
    }
  };

  function renderButton() {
    if (actionsType === 'link') {
      return (
        <Button
          block
          size="small"
          type="link"
          {...restProps}
          onClick={handleClick}
          style={{ padding: 0, textAlign: 'left', ...restProps.style }}
        >
          {children}
        </Button>
      );
    }

    if (actionsType === 'text') {
      return (
        <Button
          block
          type="text"
          size="small"
          {...restProps}
          onClick={handleClick}
          style={{ textAlign: 'left', ...restProps.style }}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button {...restProps} onClick={handleClick}>
        {children}
      </Button>
    );
  }

  function renderButtonWithConfirm() {
    if (confirmProps) {
      if (inMenu) {
        return renderButton();
      } else {
        return (
          // @ts-ignore 因为 title 是必填的
          <Popconfirm disabled={props.disabled} title={currentLocale.confirm} {...confirmProps}>
            {renderButton()}
          </Popconfirm>
        );
      }
    }

    return renderButton();
  }

  // 禁用 tooltip
  if (disableTitle && restProps?.disabled) {
    return (
      <Tooltip
        title={disableTitle}
        trigger="hover"
        placement="bottom"
        mouseLeaveDelay={0}
        {...tooltipConfig}
      >
        {renderButtonWithConfirm()}
      </Tooltip>
    );
  }

  // 常规 tooltip
  if (tooltip) {
    return (
      <Tooltip title={tooltip} trigger="hover" placement="bottom" {...tooltipConfig}>
        {renderButtonWithConfirm()}
      </Tooltip>
    );
  }

  return renderButtonWithConfirm();
};

export default MsActionButton;
