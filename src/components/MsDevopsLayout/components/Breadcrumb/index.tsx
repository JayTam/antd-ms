import { Breadcrumb } from 'antd';
import cls from 'classnames';
import React from 'react';
import type { MsDevopsBreadcrumbProps } from '../../types';
import './index.less';

const MsDevopsBreadcrumb: React.FC<MsDevopsBreadcrumbProps> = (props) => {
  const { list, onClick, ...breadcrumbProps } = props;

  const handleClick: MsDevopsBreadcrumbProps['onClick'] = (key, item) => {
    if (key) {
      onClick?.(key, item);
    }
  };

  return (
    <Breadcrumb className="ms-devops-breadcrumb" {...breadcrumbProps}>
      {list?.map(({ title, key, link, className, ...rest }, index) => (
        <Breadcrumb.Item
          key={key || index}
          {...rest}
          onClick={() => handleClick(key!, { title, key, link, className, ...rest })}
        >
          <div
            className={cls('link', className, {
              'can-selected ': !!rest.href || !!link,
            })}
          >
            {title}
          </div>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default MsDevopsBreadcrumb;
