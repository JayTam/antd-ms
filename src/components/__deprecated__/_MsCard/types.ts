import type React from 'react';
export interface MsCardProps {
  /**
   * 标题
   */
  title?: React.ReactElement | null | string;
  /**
   * 是否启用返回箭头
   * @default true
   */
  isGoBack?: boolean;
  /**
   * 返回函数 默认等于history.goBack()
   */
  goBack?: () => void;
  /**
   * 卡片的extra 右侧可以放置刷新、操作... 一些按钮
   */
  extra?: React.ReactElement;
  children?: React.ReactElement | React.ReactElement[];
}
