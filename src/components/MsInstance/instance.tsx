import cs from 'classnames';
import { isString } from 'lodash-es';
import type { ReactElement, Ref } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import ActionsTitle from './components/InstanceTitle/ActionsTitle';
import CopyableTitle from './components/InstanceTitle/CopyableTitle';
import EditableTitle from './components/InstanceTitle/EditableTitle';
import type { MsInstanceColumnType, MsInstanceProps } from './types';

import { usePageSession } from '@jaytam/antd-ms/hooks';
import './index.less';

const MsInstance = React.forwardRef(<D,>(props: MsInstanceProps<D>, ref: Ref<HTMLDivElement>) => {
  const { columns } = props;

  const { setUrlToSession } = usePageSession();

  const columnRender = (column: MsInstanceColumnType) => {
    const {
      title,
      disabled,
      link,
      onClick,
      ellipsis = true,
      linkProps,
      showActionWhenDisabled = false,
      urlToSession = true,
    } = column;
    // 如果title是字符串，则默认加上title鼠标放上去显示所有值，如果是ReactNode则不显示全部title
    const _title = isString(title) ? <span title={title}>{title}</span> : column?.title;

    const handleOnClick = (e: any) => {
      const url = linkProps?.to ?? linkProps?.href;
      if (url && urlToSession) setUrlToSession(url);
      linkProps?.onClick?.(e);
    };

    // title渲染
    const titleRender = () => {
      // 不需要显示跳转颜色，或者禁用
      if (!link || disabled) {
        return _title;
      }

      // 跳转的url
      const url = linkProps?.to ?? linkProps?.href;

      // Link标签的to是必填，当url存在时用Link标签，否则使用a标签渲染
      if (url) {
        return (
          <Link to={url} {...linkProps} onClick={handleOnClick}>
            {_title}
          </Link>
        );
      }

      return (
        <a {...linkProps} onClick={handleOnClick}>
          {_title}
        </a>
      );
    };

    // 按钮渲染
    const actionsRender = () => {
      // 禁用时并且不显示按钮
      if (disabled && !showActionWhenDisabled) {
        return;
      }

      // 禁用，显示按钮
      return (
        <>
          <CopyableTitle column={column} />
          <EditableTitle column={column} />
          <ActionsTitle column={column} />
        </>
      );
    };

    return (
      <>
        <span
          className={cs([
            'ms-instance-title',
            ellipsis && 'ms-instance-title-ellipsis',
            disabled && 'ms-instance-disabled',
          ])}
          onClick={(e) => !disabled && onClick?.(e)}
        >
          {titleRender()}
        </span>
        {actionsRender()}
      </>
    );
  };

  return (
    <>
      <div ref={ref}>
        {columns?.map((column, index) => (
          <div className="ms-instance-wrap" key={index}>
            {columnRender(column)}
          </div>
        ))}
      </div>
    </>
  );
});

export default MsInstance as <D = any>(
  props: MsInstanceProps<D> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
