import { Divider, Space } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import { useMemo } from 'react';
import type { MsActionsProps, MsActionsRenderItem, MsActionsRenderItems } from './types';
import MsActionsDropdown from './Components/MsActionsDropdown';
import { itemsToRenderItems } from './utils';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsActions = (props: MsActionsProps) => {
  const { globalLocale, currentLocale } = useLocale('MsActions');
  const {
    children,
    lint,
    limit,
    size,
    items,
    actionsType = 'link',
    moreType = 'text',
    moreText = globalLocale.more,
    moreRender,
    moreDropDownProps,
    expendMoreWhenSingle,
  } = props;

  if (children) {
    console.warn(currentLocale.depreciateTip);
  }

  /** 展开在外面item的数量，兼容以前 api lint */
  const limitNumber = limit ?? lint ?? 2;

  /** 按钮之间的间隔大小 */
  const spaceSize = actionsType === 'link' ? size ?? 0 : size ?? 10;

  /** 间隔样式 */
  const split = actionsType == 'link' && <Divider type="vertical" />;

  const renderItems: MsActionsRenderItems = Array.isArray(items)
    ? itemsToRenderItems(props)
    : toArray(children);

  const { expendRenderItems, collapsedRenderItems } = useMemo(() => {
    let expendRenderItems: MsActionsRenderItems = [];
    let collapsedRenderItems: MsActionsRenderItems = [];

    if (limitNumber < 0) {
      expendRenderItems = renderItems;
    } else {
      expendRenderItems = renderItems.slice(0, limitNumber);
      collapsedRenderItems = renderItems.slice(limitNumber);
      // 当更多只有1个时，直接展示出来，不用收纳到更多中，因为更多本身还要占用一个位置
      if (expendMoreWhenSingle && collapsedRenderItems.length === 1) {
        expendRenderItems = [...expendRenderItems, ...collapsedRenderItems];
        collapsedRenderItems = [];
      }
    }

    return {
      /** 折叠项 */
      expendRenderItems,
      /** 展开项 */
      collapsedRenderItems,
    };
  }, [limitNumber, renderItems, expendMoreWhenSingle]);

  return (
    <Space className="ms-actions" size={spaceSize} split={split}>
      {/* 展开在外面的 */}
      {expendRenderItems.map((item: MsActionsRenderItem) => ('label' in item ? item.label : item))}
      {/* 更多下拉菜单 */}
      {collapsedRenderItems.length > 0 ? (
        <MsActionsDropdown
          items={collapsedRenderItems}
          actionsType={actionsType}
          size={spaceSize}
          moreType={moreType}
          moreText={moreText}
          moreRender={moreRender}
          moreDropDownProps={moreDropDownProps}
        />
      ) : null}
    </Space>
  );
};

export default MsActions;
