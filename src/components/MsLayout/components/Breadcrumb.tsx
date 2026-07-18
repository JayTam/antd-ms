import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { breadcrumbs, filterBreadcrumbs } from '../utils';

import type { BreadcrumbsProps, MsLayoutRouteType } from '../types';
import Icon from './IconHome';
import './menu.less';

const MsBreadCrumb: React.FC<BreadcrumbsProps> = ({ routes = [], onClick, extraRender }) => {
  const { pathname } = useLocation();
  const pathItem = filterBreadcrumbs(breadcrumbs(pathname, routes) ?? []);

  const _onClick = (e: any, item: MsLayoutRouteType) => {
    onClick?.({ ...item, key: item?.path }, e);
  };
  return (
    <>
      <div className="ms-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item onClick={(e: any) => _onClick(e, { path: '/' })}>
            <Link to={'/'}>
              <Icon />
            </Link>
          </Breadcrumb.Item>
          {pathItem.map((item, index) => (
            <Breadcrumb.Item key={index}>
              {index < pathItem.length - 1 ? (
                <Link to={item?.path || ''} onClick={(e) => _onClick(e, item)}>
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        {extraRender && <div>{extraRender}</div>}
      </div>
    </>
  );
};

export default MsBreadCrumb;
