import { Card } from 'antd';
import classNames from 'classnames';
import { isObject } from 'lodash-es';
import { useMsPage } from '../../../MsPage/contexts/page';
import type { MsDescriptionsProps } from '../../types';
import './index.less';

function DescriptionsCardContainer<P, R, D>(props: MsDescriptionsProps<P, R, D>) {
  const { noCard: _noCard, children, submitter, divider } = props;

  const { inPage } = useMsPage();
  const noCard = inPage ? true : _noCard;

  const style =
    isObject(submitter) && submitter.type === 'fixed' ? { marginBottom: 120 } : undefined;

  if (noCard)
    return (
      <div
        className={classNames(
          divider ? 'ms-descriptions-divider' : undefined,
          divider === 'line' ? 'ms-descriptions-divider-line' : undefined,
        )}
      >
        {children}
      </div>
    );

  return (
    <Card style={style} bodyStyle={{ padding: 20 }}>
      {children}
    </Card>
  );
}

export default DescriptionsCardContainer;
