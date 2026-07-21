import { MsDropdown } from '@jaytam/antd-ms';
import MsActionButton from '../MsActionButton';
import { MsArrowDownSmOutlined, MsMoreHorizontalOutlined } from '@jaytam/icons';
import type { MsActionsDropdownProps } from './types';
import { renderItemsToMenuItems } from '../../utils';
import { useMemo } from 'react';
import { isNil } from 'lodash-es';
import { MsActionsContext } from '../../contexts/action';

function MsActionsDropdown(props: MsActionsDropdownProps) {
  const {
    items = [],
    actionsType,
    moreType,
    size = 0,
    moreText,
    moreRender,
    moreDropDownProps,
  } = props;

  /** 下拉菜单的 items */
  const menuItems = useMemo(() => (isNil(items) ? [] : renderItemsToMenuItems(items)), [items]);

  // actionsType=button，moreType=ellipsis，按钮样式省略类型，更多和最后一个按钮需要靠近
  if (moreType == 'ellipsis' && actionsType === 'button') {
    return (
      <MsDropdown
        menu={{ rootClassName: 'ms-actions-dropdown-menu', items: menuItems }}
        placement="bottomRight"
      >
        <MsActionButton
          actionsType={actionsType}
          className="ms-action-button-ellipsis"
          style={{ marginLeft: -(Math.abs(size) + 1) }}
        >
          <MsMoreHorizontalOutlined style={{ marginLeft: 0 }} />
        </MsActionButton>
      </MsDropdown>
    );
  }

  function triggerRender() {
    if (moreRender) return moreRender;

    if (moreType == 'ellipsis') {
      return <MsMoreHorizontalOutlined style={{ marginLeft: 0 }} />;
    }

    return (
      <>
        <span>{moreText}</span>
        <MsArrowDownSmOutlined />
      </>
    );
  }

  return (
    <MsActionsContext.Provider value={{ inMenu: true }}>
      <MsDropdown
        placement="bottom"
        {...moreDropDownProps}
        overlayClassName="ms-actions-dropdown-overlay"
        menu={{ rootClassName: 'ms-actions-menu-root', items: menuItems }}
      >
        <MsActionButton actionsType={actionsType}>{triggerRender()}</MsActionButton>
      </MsDropdown>
    </MsActionsContext.Provider>
  );
}

export default MsActionsDropdown;
