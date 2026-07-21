import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MsBackTopOutlined, MsDragOutlined } from '@jaytam/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

import MsStatus from '../../../MsStatus';
import {
  DISABLED_COLOR,
  DRAGGING_BACKGROUND_COLOR,
  DRAG_ICON_COLOR,
  FIELD_NAMES,
  TOOLTIP_COLOR,
  TOP_ICON_COLOR,
} from '../../constants';
import type { FieldNames } from '../../types';
import { getTagByFieldTag, getTitleByFieldTitle, getUniqueByFieldId } from '../../utils';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

interface PropsType<T> {
  /** item数据 */
  item: T;
  /** item索引 */
  index: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 列表行样式名 */
  rowClassName?: string;
  /** 是否展示置顶icon */
  isShowTopIcon?: boolean;
  /** 自定义字段映射 */
  fieldNames: FieldNames<T>;
  /** 禁用拖动样式 */
  disabledStyle?: React.CSSProperties;
  /** 拖动时的样式 */
  draggingStyle?: React.CSSProperties;
  /** 点击置顶回调 */
  onClickTop?: () => void;
  /** 自定义渲染 */
  renderItem?: (item: T, index: number) => React.ReactNode;
}

export function SortableItem<T>(props: PropsType<T>) {
  const {
    item,
    index,
    onClickTop,
    renderItem,
    rowClassName,
    disabled = false,
    isShowTopIcon = false,
    fieldNames = FIELD_NAMES,
    disabledStyle = { cursor: 'not-allowed', color: DISABLED_COLOR },
    draggingStyle = { backgroundColor: DRAGGING_BACKGROUND_COLOR, zIndex: 1 },
  } = props;

  const { globalLocale } = useLocale();

  const id = getUniqueByFieldId(item, fieldNames.id as keyof T) as UniqueIdentifier;
  const title = getTitleByFieldTitle(item, fieldNames.title as keyof T);
  const tag = getTagByFieldTag(item, fieldNames.tag as keyof T);
  const classPrefix = 'ms-sortable-item';
  const isFirst = index === 0;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style: React.CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    ...(disabled ? disabledStyle : {}),
    ...(isDragging ? draggingStyle : {}),
  };

  const prop = {
    style,
    ref: setNodeRef,
    ...attributes,
    ...listeners,
  };

  return (
    <div className={classNames([`ms-sortable-item-container`, rowClassName])} {...prop}>
      {!renderItem ? (
        <>
          <div className={classNames([`ms-sortable-item-left`])}>
            <MsDragOutlined
              style={{ color: disabled ? DISABLED_COLOR : DRAG_ICON_COLOR, fontSize: 16 }}
            />
            <div>{title}</div>
          </div>
          <div
            className={classNames({
              [`ms-sortable-item-right`]: true,
              [`ms-sortable-item-show-top-icon`]: isShowTopIcon,
            })}
          >
            {tag ? (
              <div className={classNames([`ms-sortable-item-tag-wrapper`])}>
                <MsStatus type="tag">{tag}</MsStatus>
              </div>
            ) : null}
            {isShowTopIcon && !isFirst ? (
              <Tooltip title={globalLocale.setTop} color={TOOLTIP_COLOR}>
                <div
                  className={classNames([`ms-sortable-item-top-wrapper`])}
                  onClick={() => onClickTop && onClickTop()}
                >
                  <MsBackTopOutlined style={{ color: TOP_ICON_COLOR }} />
                </div>
              </Tooltip>
            ) : null}
          </div>
        </>
      ) : (
        renderItem(item, index)
      )}
    </div>
  );
}
