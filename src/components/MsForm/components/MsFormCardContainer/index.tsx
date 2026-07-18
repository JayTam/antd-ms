import { Card } from 'antd';
import classNames from 'classnames';
import { isObject } from 'lodash-es';

import type { MsFormProps } from '../../types';

/**
 * 表单卡片包裹容器
 * @param props
 * @returns
 */
function MsFormCardContainer<P, R, D>(props: MsFormProps<P, R, D>) {
  const { noCard = false, children, submitter, divider } = props;
  const style =
    isObject(submitter) && submitter.type === 'fixed' ? { marginBottom: 120 } : undefined;

  if (noCard)
    return (
      <div
        className={classNames(
          divider ? 'ms-form-divider' : undefined,
          divider === 'line' ? 'ms-form-divider-line' : undefined,
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

export default MsFormCardContainer;
