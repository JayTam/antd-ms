import { Card } from 'antd';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import type { MsBasePageProps } from '../../types';
import './index.less';

function MsPageCardContainer<P, R, D>(
  props: Omit<MsBasePageProps<P, R, D>, 'children'> & { children?: ReactNode },
) {
  const { noCard = false, pageType = 'page', divider, children } = props;

  const isMainPage = pageType === 'page';

  if (noCard)
    return (
      <div
        className={classNames(
          !isMainPage && divider ? 'ms-sub-page-divider' : undefined,
          !isMainPage && divider === 'line' ? 'ms-sub-page-divider-line' : undefined,
        )}
      >
        {children}
      </div>
    );

  return <Card bodyStyle={{ padding: 20 }}>{children}</Card>;
}

export default MsPageCardContainer;
