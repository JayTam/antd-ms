import { Space } from 'antd';
import cls from 'classnames';
import { useMemo } from 'react';
import MsIconFont from '../../../MsIconFont';
import type { TriggerProps } from '../../types';
import './index.less';

const Trigger: React.FC<TriggerProps> = ({
  type,
  className,
  children,
  arrow,
  arrowStyle,
  rotate,
  buttonType,
  disabled,
  ...props
}) => {
  const isBtnPrimary = type === 'button' && buttonType === 'primary';
  const icon = useMemo(() => {
    if (arrow === true) {
      return (
        <div
          className={cls('ms-trigger-arrow', {
            ['ms-trigger-arrow-open']: rotate,
          })}
        >
          <MsIconFont
            type="icon-xiala1"
            style={{
              fontSize: 12,
              color: isBtnPrimary ? undefined : '#98A2AA',
              ...(arrowStyle || {}),
            }}
          />
        </div>
      );
    }
    if (arrow === false) {
      return null;
    }
    if (typeof arrow === 'function') {
      return arrow(rotate);
    }
    return arrow;
  }, [arrow, arrowStyle, isBtnPrimary, rotate]);

  return (
    <div
      className={cls(className, 'ms-dropdown-trigger', {
        ['ms-dropdown-trigger-text']: type === 'text',
        ['ms-dropdown-trigger-button']: type === 'button',
        ['ms-dropdown-trigger-button-primary']: isBtnPrimary,
        ['ms-dropdown-trigger-card']: type === 'card',
        ['ms-dropdown-trigger-disabled']: disabled,
      })}
      {...props}
    >
      <Space size={8} className="ms-dropdown-trigger-content">
        {children}
        {icon}
      </Space>
    </div>
  );
};

export default Trigger;
