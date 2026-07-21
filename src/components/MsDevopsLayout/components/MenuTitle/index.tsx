import cls from 'classnames';
import { useDevopsLayoutContext } from '../../context';
import type { MsDevopsMenuTitleProps } from '../../types';
import './index.less';

const MenuTitle: React.FC<MsDevopsMenuTitleProps> = ({ title, logo, className, ...res }) => {
  const { collapsed } = useDevopsLayoutContext();

  const logoDom = typeof logo === 'function' ? logo(collapsed) : logo;

  if (collapsed) {
    return logoDom ? (
      <div className={cls('ms-devops-layout-menu-top-collapsed', className)} {...res}>
        <div className="ms-devops-layout-menu-logo">{logoDom}</div>
      </div>
    ) : null;
  }
  return (
    <div className={cls('ms-devops-layout-menu-top', className)} {...res}>
      <div className="ms-devops-layout-menu-logo">{logoDom}</div>
      <div className="ms-devops-layout-menu-title">{title}</div>
    </div>
  );
};

export default MenuTitle;
