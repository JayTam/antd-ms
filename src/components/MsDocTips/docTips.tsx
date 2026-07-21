import { useMount, useRequest } from 'ahooks';
import { Popover, Spin, Tooltip } from 'antd';
import React, { useState } from 'react';
import './index.less';
import { infoAndReport } from './service';
import type { MsDocTipsProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

type StringObject = Record<string, string>;

const TEXT_EMPTY_HTML = '';

const findDataset = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  let el = e.target;
  // 上升查找，直到找到具有 dataset 属性的元素或到达文档根部
  while (el && el instanceof HTMLElement) {
    if (Object.keys(el.dataset).length > 0) {
      return el.dataset;
    }
    el = el.parentElement!; // 移动到父元素
  }
  // 如果没有找到合适的元素，返回一个空对象
  return {};
};

const MsDocTips = (props: MsDocTipsProps) => {
  const {
    trackingKey,
    children,
    type = 'popover',
    onClick,
    onCustomClick,
    pageTitle,
    overlayInnerStyle,
    ...restProps
  } = props;

  const { currentLocale } = useLocale('MsDocTips');

  const POPOVER_EMPTY_HTML = `<span style="color: #999">${currentLocale.empty}</span>`;

  const EMPTY_HTML = type === 'text' ? TEXT_EMPTY_HTML : POPOVER_EMPTY_HTML;

  const [html, setHtml] = useState('');

  const styles = {
    maxWidth: 600,
    maxHeight: 600,
    overflow: 'auto',
    ...overlayInnerStyle,
  };

  const getInfo = useRequest(infoAndReport, {
    manual: true,
    onSuccess: (res) => {
      const contentHtml = res.data?.postContent;
      setHtml(contentHtml || EMPTY_HTML);
    },
    onError: () => {
      setHtml(EMPTY_HTML);
    },
  });

  const handleContentClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
    // 获取元素上绑定的业务属性 data-ms-xxx 传到回调函数
    const data = findDataset(e);
    const callbackData: StringObject = {};
    for (const key in data) {
      const value = data[key];
      if (key.startsWith('ms') && key.slice(2) && value) {
        callbackData[key.slice(2)] = value;
      }
    }

    if (typeof onCustomClick === 'function' && Object.keys(callbackData).length) {
      onCustomClick(callbackData, e);
    }
  };

  const handleOpenChange = (open: boolean) => {
    const onOpenChange = restProps.onOpenChange;
    if (typeof onOpenChange === 'function' && type !== 'text') {
      onOpenChange(open);
    }
    if (open && !html) {
      getInfo.run({
        anchorPointCode: trackingKey,
        reportUrl: window.location.href,
        reportPageTitle: pageTitle || document.title,
      });
    }
  };

  useMount(() => {
    // 文本内容，默认获取
    if (type === 'text') handleOpenChange(true);
  });

  const ContentNode: React.ReactNode = (
    <Spin spinning={getInfo.loading}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={handleContentClick}
        className="w-e-text-container"
      />
    </Spin>
  );

  const result = {
    tooltip: (
      <Tooltip
        {...restProps}
        title={ContentNode}
        onOpenChange={handleOpenChange}
        overlayInnerStyle={styles}
      >
        {children}
      </Tooltip>
    ),
    popover: (
      <Popover
        {...restProps}
        content={ContentNode}
        onOpenChange={handleOpenChange}
        overlayInnerStyle={styles}
      >
        {children}
      </Popover>
    ),
    text: <div {...restProps}>{children || ContentNode}</div>,
  };

  return <div className="ms-doc-tips">{result[type]}</div>;
};

export default MsDocTips;
