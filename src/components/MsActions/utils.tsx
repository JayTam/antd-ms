import type { MenuProps } from 'antd';
import { isArray, isNil, isObject } from 'lodash-es';
import React from 'react';
import MsActionButton from './Components/MsActionButton';
import type { MsActionsItemType, MsActionsProps, MsActionsRenderItem } from './types';
import type { MsActionButtonProps } from './Components/MsActionButton/types';

/**
 * 将 items 配置转换成可以渲染的 renderItems
 * @param props
 * @returns
 */
export function itemsToRenderItems(props: MsActionsProps) {
  const { items, actionsType = 'link', limit, lint, expendMoreWhenSingle } = props;

  /** 限制数量，兼容以前 api lint */
  const limitNumber = lint ?? limit ?? 2;

  /** item 计数 */
  let count = 0;

  function deepTransform(items: MsActionsProps['items']): MsActionsItemType[] {
    if (isNil(items)) return [];

    /** 实际生效的items，能在界面上看到的 */
    const showItems = items
      .filter((item): item is MsActionsItemType => item && typeof item === 'object')
      .filter((item) => !item.hidden);

    return showItems.map((item) => {
      count++;
      let itemDisabled: MsActionButtonProps['disabled'];
      let itemDisabledTooltip: MsActionButtonProps['disabledTooltip'];
      let itemTooltipProps: MsActionButtonProps['tooltipProps'];
      let itemActionsType: MsActionButtonProps['actionsType'] = actionsType;

      const key = item.key ?? count;

      if (actionsType == 'button') {
        if (count > limitNumber) {
          // 当更多只有1个时，直接展示出来，不用收纳到更多中，因为更多本身还要占用一个位置
          if (expendMoreWhenSingle && showItems.length - limitNumber === 1) {
            itemActionsType = undefined;
          } else {
            itemActionsType = 'text';
          }
        } else {
          itemActionsType = undefined;
        }
      }

      if (Array.isArray(item?.disabled)) {
        const result = item?.disabled?.find((o) => o.disabled);
        if (result) {
          itemDisabled = result.disabled;
          // @ts-ignore 禁用 tooltip，兼容以前的 content
          itemDisabledTooltip = result.disabledTooltip ?? result.disableToolTip ?? result.content;
          // tooltip 配置透传，兼容以前的  popover
          itemTooltipProps = result.tooltipProps ?? result?.popover;
        }
      } else {
        itemDisabled = item?.disabled;
        // @ts-ignore 禁用 tooltip，兼容以前的 content
        itemDisabledTooltip = item.disabledTooltip ?? item.disableToolTip ?? item?.content;
        // tooltip 配置透传，兼容以前的  popover
        itemTooltipProps = item.tooltipProps ?? item?.popover;
      }

      return {
        key,
        ...item,
        label: (
          <MsActionButton
            key={key}
            actionsType={itemActionsType}
            {...item}
            disabledTooltip={itemDisabledTooltip}
            disabled={itemDisabled}
            tooltipProps={{
              placement: count > limitNumber ? 'left' : 'top',
              zIndex: 1060,
              ...itemTooltipProps,
            }}
          >
            {item.label}
          </MsActionButton>
        ),
        items: isArray(item.items) ? deepTransform(item.items) : item.items,
      };
    });
  }

  return deepTransform(items);
}

/**
 * 转换成下拉菜单的 items
 * @param renderItems
 * @returns
 */
export function renderItemsToMenuItems(renderItems: MsActionsRenderItem[]) {
  /** menu item 计数 */
  let count = 0;

  function deepTransform(items: MsActionsRenderItem[]): MenuProps['items'] {
    return items.map((item) => {
      count++;
      if (isObject(item)) {
        if (React.isValidElement(item)) {
          return { key: count, label: item };
        }

        if ('label' in item) {
          return {
            key: item.key ?? count,
            label: item.label,
            disabled: isArray(item.disabled)
              ? item.disabled.some((i) => i.disabled)
              : item.disabled,
            children: isArray(item.items) ? deepTransform(item.items) : item.items,
          };
        }
      }
    }) as MenuProps['items'];
  }

  return deepTransform(renderItems);
}
