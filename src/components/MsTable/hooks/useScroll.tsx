import { isNil, isNumber, merge, omit } from 'lodash-es';
import { useMemo, useRef } from 'react';

import { useDevopsLayoutContext } from '../../MsDevopsLayout/context';
import { useMsLayout } from '../../MsLayout/context';
import { TABLE_SPACE } from '../constants';

import type { MsTableProps } from '../types';
import useDomRect from './useDomRect';

type ExtraProps = {
  size: string;
  data: any[];
};

function useScroll<P, R, D>(props: MsTableProps<P, R, D>, extraProps: ExtraProps) {
  const {
    scroll: _scroll = {},
    search,
    noCard,
    filteredViewRender,
    menuRender,
    creatorRender,
    filterbarRender,
    toolbarRender,
    barRender,
    footerRender,
  } = props;
  const { size, data } = extraProps;
  const defaultScroll = { x: '100%', scrollToFirstRowOnChange: true };
  const scroll = merge(defaultScroll, _scroll);

  // table 内容区域
  const tableAreaRef = useRef<HTMLDivElement>(null);
  // footer 内容区域
  const footerAreaRef = useRef<HTMLDivElement>(null);
  // table footer 内容区域
  const tableFooterAreaRef = useRef<HTMLDivElement>(null);

  const deps = [
    size,
    data,
    filteredViewRender,
    menuRender,
    creatorRender,
    filterbarRender,
    barRender,
    toolbarRender,
    footerRender,
  ];

  const [tableAreaRect, viewport] = useDomRect(
    tableAreaRef.current?.querySelector('tbody') ?? null,
    deps,
  );
  const [footerAreaRect] = useDomRect(footerAreaRef.current, deps);
  const [tableFooterAreaRect] = useDomRect(tableFooterAreaRef.current, deps);
  const MsLayoutContext = useMsLayout();
  const DevopsLayoutContext = useDevopsLayoutContext();

  const tableScroll = useMemo(() => {
    if (scroll.y === 'auto-content') {
      // aggr 类型要忽略自适应高度
      if (search && search.filterType === 'aggr') {
        return scroll;
      }
      if (tableAreaRect && viewport) {
        const tableFooterHeight = isNil(tableFooterAreaRect)
          ? 0
          : tableFooterAreaRect.height + TABLE_SPACE;
        const footerHeight = footerAreaRect?.height ?? 0;
        // 表格容器的padding
        const cardPaddingHeight = noCard ? 0 : 20;
        // 页面容器的底部padding，MsLayout下12px，MsDevopsLayout下16px
        const containerBottomHeight = MsLayoutContext.inContext
          ? 12
          : DevopsLayoutContext.inContext
          ? 16
          : 0;

        const tableY =
          viewport.height -
          tableAreaRect.top -
          tableFooterHeight -
          footerHeight -
          cardPaddingHeight -
          containerBottomHeight -
          // 莫名差1px，减掉就好了
          1;
        return { ...scroll, y: tableY };
      }
    }

    return scroll;
  }, [
    scroll,
    search,
    tableAreaRect,
    viewport,
    tableFooterAreaRect,
    footerAreaRect?.height,
    noCard,
    MsLayoutContext.inContext,
    DevopsLayoutContext.inContext,
  ]);

  function scrollToFirstRow() {
    if (tableScroll.scrollToFirstRowOnChange) {
      if (isNumber(tableScroll.y)) {
        tableAreaRef.current
          ?.querySelector('tbody')
          ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      } else {
        tableAreaRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  return {
    // 不要 ant table 的实现，自己用 scrollToFirstRow 实现
    scroll: omit(tableScroll, 'scrollToFirstRowOnChange'),
    tableAreaRef,
    footerAreaRef,
    tableFooterAreaRef,
    scrollToFirstRow,
  };
}

export default useScroll;
