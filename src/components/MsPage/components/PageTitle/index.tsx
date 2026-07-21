import { LeftOutlined } from '@ant-design/icons';
import { MsConfigProvider, MsTitle } from '@jaytam/antd-ms';
import { valueEnumToOptions } from '@jaytam/antd-ms/utils/valueEnum';
import { Tooltip } from 'antd';
import { get, isFunction, isNil } from 'lodash-es';
import React from 'react';
import MsStatus from '../../../MsStatus';
import type { MsBasePageProps } from '../../types';
import PageExtra from './PageExtra';
import './index.less';
import usePagePathname from '../../hooks/usePagePathname';
import { useLocale } from '@jaytam/antd-ms/locale';

export const CLASS_NAME_TYPE = {
  common: 'title-common',
  gradient: 'title-gradient',
  flag: 'title-flag',
  block: 'title-block',
};

type PageTitleProps<P, R, D> = MsBasePageProps<P, R, D> & {
  loading?: boolean;
  refreshLoading?: boolean;
  onRefresh?: () => void;
};

const PageTitle = <P, R, D>(props: PageTitleProps<P, R, D>) => {
  const {
    title,
    titleStatus,
    titleStatusColumn,
    backButton = true,
    backTooltipProps,
    dataSource,
    onBack,
    loading,
    pageType,
    titleType,
    extra,
  } = props;

  const { back } = usePagePathname(props as MsBasePageProps);
  const { pageAutoBack } = MsConfigProvider.useConfig();
  const { currentLocale } = useLocale('MsPage');
  const hideTitle = !(isFunction(title) ? title(dataSource) : title);
  const hideExtra = !(isFunction(extra) ? extra(dataSource) : extra);

  if (hideTitle && hideExtra && !backButton) return null;

  /**
   * 点击返回按钮
   * @returns
   */
  const handleOnBack = () => {
    if (onBack) onBack();
    else if (pageAutoBack) back();
    else history.back();
  };

  /**
   * 返回按钮
   * @returns
   */
  function backButtonRender() {
    if (pageType === 'subPage') return null;
    if (!backButton) return null;

    return (
      <Tooltip title={currentLocale.back} {...backTooltipProps}>
        <a className={'ms-page-back-btn'} onClick={() => handleOnBack()}>
          <LeftOutlined color="#1890ff" />
        </a>
      </Tooltip>
    );
  }

  /**
   * 标题状态
   */
  function titleStatusRender() {
    if (titleStatus) {
      return (
        <div className="ms-page-status">
          {isFunction(titleStatus) ? titleStatus(dataSource) : titleStatus}
        </div>
      );
    }
    if (titleStatusColumn) {
      const { dataIndex, valueEnum, valueEnumFiledNames } = titleStatusColumn;
      if (isNil(dataIndex)) return;
      const options = valueEnumToOptions(valueEnum, valueEnumFiledNames);
      const value = get(dataSource, dataIndex)?.toString();
      const item = options.find((option) => option.value == value);
      if (isNil(item)) return;

      return (
        <MsStatus
          className="ms-page-status"
          color={item.color ?? item.status}
          icon={item.icon}
          type="tag"
        >
          {item.label ?? item.value}
        </MsStatus>
      );
    }
  }

  if (isNil(title) && isNil(backButton)) return null;

  const titleDom = isFunction(title) ? title(dataSource) : title;

  // 如果是字符串
  const defaultType = pageType === 'page' ? 'common' : 'gradient';
  const type = titleType ?? defaultType;
  const titleSize = pageType === 'page' ? 'XLarge' : 'middle';

  return (
    <MsTitle
      titleSize={titleSize}
      titleType={type}
      loading={loading}
      titlePrefix={backButtonRender()}
      titleSuffix={titleStatusRender()}
      extra={<PageExtra {...props} />}
    >
      {titleDom}
    </MsTitle>
  );
};

export default PageTitle;
