import { MsEmpty } from '@jaytam/antd-ms';
import { Skeleton } from 'antd';
import classNames from 'classnames';
import { isFunction, isUndefined } from 'lodash-es';
import React, { useImperativeHandle } from 'react';
import type { DefaultPostRes } from '../../../types';
import { MsPageContext, useMsPage } from '../../contexts/page';
import usePageRequest from '../../hooks/usePageRequest';
import useTabsProps from '../../hooks/useTabsProps';
import type { MsBasePageProps } from '../../types';
import MsPageCardContainer from '../MsPageCardContainer';
import PageTabs from '../PageTabs';
import PageTitle from '../PageTitle';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsBasePage<P, R, D = DefaultPostRes<R>>(props: MsBasePageProps<P, R, D>) {
  const { children, pageType = 'page', actionRef, empty } = props;

  const isMainPage = pageType === 'page';

  const pageContext = useMsPage();
  const { currentLocale } = useLocale('MsPage');

  const { loading, data, refresh } = usePageRequest(props);

  const tabsProps = useTabsProps(props, data);

  useImperativeHandle(actionRef, () => ({ reload: refresh }));

  /**
   * 页面内容，包含Tabs
   * @returns
   */
  const contentRender = () => {
    if (loading) return <Skeleton active />;

    // 设置显示缺省图，并且接口调用失败时，显示缺省图
    if (empty && isUndefined(data)) {
      return React.isValidElement(empty) ? (
        empty
      ) : (
        <MsEmpty
          image="empty"
          description={currentLocale.empty}
          size="large"
          style={{
            padding: '100px',
          }}
        />
      );
    }

    if (children) return isFunction(children) ? children(data ?? {}) : children;

    return <PageTabs {...props} tabsProps={tabsProps} loading={loading} />;
  };

  // 没有设置 request 的 SubPage，需要穿透到 Page 的 request，所以透传了 pageContext
  return (
    <MsPageContext.Provider value={isMainPage ? { inPage: true, refresh } : pageContext}>
      <MsPageCardContainer {...props}>
        <div className={classNames(isMainPage ? 'ms-page' : 'ms-sub-page')}>
          <PageTitle {...props} loading={loading} onRefresh={refresh} dataSource={data} />
          {contentRender()}
        </div>
      </MsPageCardContainer>
    </MsPageContext.Provider>
  );
}

export default MsBasePage;
