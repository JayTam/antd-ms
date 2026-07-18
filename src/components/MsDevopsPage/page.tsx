import type { MsActionsProps } from '@jaytam/antd-ms/components';
import { MsActions, MsIconFont } from '@jaytam/antd-ms/components';
import cls from 'classnames';
import { isValidElement } from 'react';
import './index.less';
import type { MsDevopsPageProps } from './types';

const MsDevopsPage: React.FC<MsDevopsPageProps> = ({
  children,
  className,
  containerClassName,
  style,
  hideTitle,
  noHideTitlePadding = false,
  showBack,
  onBack,
  title,
  extra,
}) => {
  const extraDom = isValidElement(extra) ? extra : <MsActions {...(extra as MsActionsProps)} />;

  const handleBack = () => {
    if (onBack) {
      onBack?.();
    } else {
      history.back();
    }
  };

  return (
    <div
      className={cls('ms-devops-page-container', containerClassName)}
      style={hideTitle && !noHideTitlePadding ? { paddingTop: 8 } : undefined}
    >
      {!hideTitle && (
        <div className={cls('ms-devops-page-title', className)} style={style}>
          <div className="ms-devops-page-left">
            {showBack && (
              <div onClick={handleBack} className="ms-devops-page-back">
                <MsIconFont type="icon-fanhui" />
              </div>
            )}
            {title}
          </div>
          <div className="ms-devops-page-right">{extraDom}</div>
        </div>
      )}

      <div className="ms-devops-page-children-wrap">{children}</div>
    </div>
  );
};

export default MsDevopsPage;
