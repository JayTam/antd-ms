import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useDeepCompareEffect } from 'ahooks';
import type { MenuProps } from 'antd';
import { Menu, Tooltip } from 'antd';
import cls from 'classnames';
import { MD5 } from 'crypto-js';
import { uniq } from 'lodash-es';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MENU_COLLAPSED_WIDTH, MENU_NOT_COLLAPSED_WIDTH } from '../../constant';
import type { MsDevopsMenuProps, MsDevopsMenuRef } from '../../types';
import {
  getFormattedAntdMenuItems,
  getMenuOpenKeysByLevel,
  getOnlyKeyItems,
  MS_DEVOPS_MENU_CONTAINER_ID,
  sessionStore,
} from '../../utils';
import MenuTitle from '../MenuTitle';
import './index.less';
import './index.sub.less';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsDevopsMenu = forwardRef<MsDevopsMenuRef, MsDevopsMenuProps>((props, ref) => {
  const {
    defaultCollapsed,
    items,
    title,
    menuTitle,
    menuLogo,
    inlineCollapsed,
    showCollapsedToggle = true,
    onCollapsedChange,
    selectedKeys,
    openOneMenu = true,
    openMenuCacheKey,
    styleType = 'main',
    onSelect,
    bottomNode,
    defaultMenuOpenLevel,
    ...menuProps
  } = props;

  const [innerCollapsed, setInnerCollapsed] = useState(inlineCollapsed ?? defaultCollapsed);
  const { currentLocale } = useLocale('MsDevopsLayout');

  const isCollapsed = inlineCollapsed ?? innerCollapsed;

  const onlyPathItems = useMemo(() => getOnlyKeyItems(items), [items]);

  const cacheKey = useMemo(
    () => openMenuCacheKey ?? MD5(JSON.stringify(onlyPathItems || [])),
    [onlyPathItems, openMenuCacheKey],
  );
  const [openKeys, setOpenKeys] = useState<string[]>(
    sessionStore.get(cacheKey as 'MS_DEVOPS_MENU_OPEN_KEYS') || [],
  );

  /* onOpenChange 事件在折叠和展开切换的过程中，会导致当前的openKeys被清空为空[]，所以需要openKeysCacheRef缓存折叠前的状态，
   * 并且在折叠状态中，也需要如果切换了当前菜单，也需要调整openKeys的缓存值 */
  const openKeysCacheRef = useRef<string[]>([]);
  /** openKeys变化时用来控制是否作同步 */
  const openKeysChangeFlag = useRef<boolean>(true);

  /** 当前是否是子菜单的样式 */
  const isSubMenu = styleType === 'sub';

  const titleDom = useMemo(() => {
    if (title) {
      if (typeof title === 'function') {
        return title(isCollapsed);
      }
      return title;
    }
    if ((menuTitle && !isCollapsed) || (isCollapsed && menuLogo)) {
      return <MenuTitle logo={menuLogo} title={menuTitle} />;
    }
    return null;
  }, [title, menuTitle, menuLogo, isCollapsed]);

  // collapsed时因为存在动画效果所以不能直接展示Tooltip组件，需要设置延时200ms,等动画完成后再显示
  const [showCollapsedTip, setShowCollapsedTip] = useState(defaultCollapsed);

  const formattedCollapsedItems = useMemo(() => getFormattedAntdMenuItems(items, true), [items]);

  const formattedNotCollapsedItems = useMemo(
    () => getFormattedAntdMenuItems(items, false),
    [items],
  );
  // 性能优化
  const formattedItems = useMemo(
    () => (isCollapsed ? formattedCollapsedItems : formattedNotCollapsedItems),
    [isCollapsed, formattedCollapsedItems, formattedNotCollapsedItems],
  );

  // 第一层的key
  const firstLevelOpenKeys = useMemo(() => items.map((i) => i.key), [items]);

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    if (!openOneMenu) {
      setOpenKeys(keys);
      return;
    }
    const latestOpenKey = keys.find((key) => (openKeys || []).indexOf(key) === -1);
    if (firstLevelOpenKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleMenuSelect: MenuProps['onSelect'] = (info) => {
    if (isCollapsed) {
      const keys = info.keyPath.slice(1);
      openKeysCacheRef.current = keys;
    }
    onSelect?.(info);
  };

  const handleToggleCollapse = useCallback(() => {
    if (isCollapsed) {
      onCollapsedChange?.(false);
      setInnerCollapsed(false);
      openKeysChangeFlag.current = false;
      setTimeout(() => {
        openKeysChangeFlag.current = true;
        setOpenKeys(openKeysCacheRef.current);
      }, 20);
    } else {
      onCollapsedChange?.(true);
      setInnerCollapsed(true);
    }
  }, [isCollapsed, onCollapsedChange]);

  useEffect(() => {
    if (!defaultMenuOpenLevel) {
      sessionStore.set(cacheKey as 'MS_DEVOPS_MENU_OPEN_KEYS', openKeys || []);
    }
  }, [openKeys, cacheKey, defaultMenuOpenLevel]);

  useDeepCompareEffect(() => {
    if (defaultMenuOpenLevel) {
      setOpenKeys(getMenuOpenKeysByLevel(onlyPathItems, defaultMenuOpenLevel));
    }
  }, [defaultMenuOpenLevel, onlyPathItems]);

  useEffect(() => {
    //onOpenChange 事件在折叠和展开切换的过程中，会导致已有的openKeys被清空，所以需要openKeysCacheRef缓存折叠前的状态，
    //并且在折叠状态中，也需要如果切换了当前菜单，也需要调整openKeys的缓存值
    if (!isCollapsed && openKeysChangeFlag.current) {
      openKeysCacheRef.current = openKeys;
    }
  }, [openKeys, isCollapsed]);

  //collapsed时因为存在动画效果所以不能直接展示Tooltip组件，需要设置延时200ms,等动画完成后再显示
  useEffect(() => {
    if (!isCollapsed) {
      setShowCollapsedTip(false);
    } else {
      setTimeout(() => {
        setShowCollapsedTip(true);
      }, 200);
    }
  }, [isCollapsed]);

  useImperativeHandle(
    ref,
    () => {
      return {
        setOpenKeys,
        setPathChangeOpenKeys: (v: string[]) => {
          if (isCollapsed) {
            if (openOneMenu) {
              openKeysCacheRef.current = v;
            } else {
              openKeysCacheRef.current = uniq([...openKeys, ...v]);
            }
            return;
          }
          if (openOneMenu) {
            setOpenKeys(v);
          } else {
            setOpenKeys((prev) => uniq([...prev, ...v]));
          }
        },
      };
    },
    [isCollapsed, openKeys, openOneMenu],
  );

  const collapsedDom = useMemo(() => {
    return (
      <div className="ms-menu-fold-wrap" onClick={handleToggleCollapse}>
        {isSubMenu ? (
          <DoubleRightOutlined style={{ fontSize: 16, color: '#464f5c' }} />
        ) : (
          <MenuUnfoldOutlined style={{ fontSize: 16 }} />
        )}
      </div>
    );
  }, [handleToggleCollapse, isSubMenu]);

  return (
    <div
      style={{
        width: isCollapsed ? MENU_COLLAPSED_WIDTH : MENU_NOT_COLLAPSED_WIDTH,
        paddingTop: titleDom ? 0 : undefined,
      }}
      className={cls('ms-devops-layout-menu-wrap', {
        ['ms-devops-layout-sub-menu-wrap']: isSubMenu,
      })}
    >
      {titleDom}
      <div
        className={cls('ms-devops-layout-menu', {
          'ms-devops-layout-menu-collapse': isCollapsed,
        })}
      >
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          getPopupContainer={() => document.getElementById(MS_DEVOPS_MENU_CONTAINER_ID)!}
          mode="inline"
          theme="light"
          items={formattedItems}
          onSelect={handleMenuSelect}
          inlineIndent={9}
          {...menuProps}
          inlineCollapsed={isCollapsed}
        />
      </div>
      {bottomNode}
      {showCollapsedToggle &&
        (isCollapsed ? (
          showCollapsedTip ? (
            <Tooltip title={currentLocale.expandNav} placement={'right'}>
              {collapsedDom}
            </Tooltip>
          ) : (
            collapsedDom
          )
        ) : (
          <div className="ms-menu-fold-wrap" onClick={handleToggleCollapse}>
            {isSubMenu ? (
              <DoubleLeftOutlined style={{ fontSize: 16, color: '#464f5c' }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 16 }} />
            )}
            <span className="fold">{currentLocale.foldNav}</span>
          </div>
        ))}
    </div>
  );
});

export default MsDevopsMenu;
