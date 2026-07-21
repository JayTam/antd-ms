import type { MsTableProps } from '@jaytam/antd-ms';
import { Card } from 'antd';
import classNames from 'classnames';
import './index.less';

function MsTableCardContainer<P, R, D>(props: MsTableProps<P, R, D>) {
  const { noCard = false, children, divider, _fullscreenRef } = props;

  if (noCard)
    return (
      <div
        ref={_fullscreenRef}
        className={classNames(
          'ms-table',
          divider ? 'ms-table-divider' : undefined,
          divider === 'line' ? 'ms-table-divider-line' : undefined,
        )}
      >
        {children}
      </div>
    );

  return (
    <Card ref={_fullscreenRef} bodyStyle={{ padding: 20 }}>
      <div className="ms-table">{children}</div>
    </Card>
  );
}

export default MsTableCardContainer;
