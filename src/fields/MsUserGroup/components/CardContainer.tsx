import { Card } from 'antd';
import React from 'react';
import { useUserGroup } from '../contexts/userGroup';
import type { SearchTypeEnumType } from '../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type CardContainerProps = SearchTypeEnumType['props'] & {
  children?: React.ReactNode;
  cardExtra?: React.ReactNode;
};

const CardContainer = (props?: CardContainerProps) => {
  const { showTitle = true, title: _title, children, cardExtra = null } = props ?? {};
  const { searchValues, userGroupRef } = useUserGroup();
  const { currentLocale } = useLocale('MsUserGroup');

  const isUser = searchValues?.type === 'user';
  const isUserInWikiGroup = searchValues?.type === 'userInWikiGroup';
  const showWikiTitle = isUserInWikiGroup && showTitle;

  const titleRender = () => {
    if (showWikiTitle) {
      return _title ?? currentLocale.wkUser;
    }
    if (!showTitle || searchValues?.searchValue) {
      return null;
    }
    return _title ?? currentLocale.groupUser;
  };

  const cardBodyHeight =
    (userGroupRef?.current?.getElementsByClassName('list-card')?.[0]?.clientHeight || 0) + 2;

  return (
    <Card
      title={titleRender()}
      className="list-card"
      style={{ marginTop: 16, height: 'calc(100% - 48px)' }}
      bodyStyle={{
        paddingRight: isUser || isUserInWikiGroup ? 0 : 20,
        height: searchValues?.searchValue && !showWikiTitle ? '100%' : cardBodyHeight - 48,
        overflowY: 'scroll',
      }}
      extra={cardExtra}
    >
      {children}
    </Card>
  );
};

export default CardContainer;
