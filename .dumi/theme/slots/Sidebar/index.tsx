import { NavLink, useLocation, useRouteMeta, useSidebarData } from 'dumi';
import Toc from 'dumi/theme-default/slots/Toc';
import { type FC } from 'react';
import 'dumi/theme-default/slots/Sidebar/index.less';
import { ISidebarItem } from 'dumi/dist/client/theme-api/types';

const Sidebar: FC = () => {
  const { pathname } = useLocation();
  const meta = useRouteMeta();
  const sidebar = useSidebarData();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, child: ISidebarItem) => {
    if (child.link === '/spec/link') {
      e.preventDefault();
      window.open('/design');
    }
  };

  if (!sidebar) return null;

  return (
    <div className="dumi-default-sidebar">
      {sidebar.map((item, i) => (
        <dl className="dumi-default-sidebar-group" key={String(i)}>
          {item.title && <dt>{item.title}</dt>}
          {item.children.map((child) => (
            <dd key={child.link}>
              <NavLink to={child.link} title={child.title} end onClick={(e) => handleNav(e, child)}>
                {child.title}
              </NavLink>
              {child.link === pathname && meta.frontmatter.toc === 'menu' && <Toc />}
            </dd>
          ))}
        </dl>
      ))}
    </div>
  );
};

export default Sidebar;
