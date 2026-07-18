import { SyncOutlined } from '@ant-design/icons';

import type { MsActionsProps } from '@jaytam/antd-ms/components/MsActions';
import MsActions from '@jaytam/antd-ms/components/MsActions';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { isArray, isFunction, isNil, isObject } from 'lodash-es';
import React from 'react';
import type { MsDescriptionsProps } from '../../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type DescriptionsExtraProps<P, R, D> = MsDescriptionsProps<P, R, D> & {
  loading?: boolean;
  refreshLoading?: boolean;
  onRefresh?: () => void;
};

function DescriptionsExtra<P, R, D>(props: DescriptionsExtraProps<P, R, D>) {
  const { globalLocale } = useLocale();
  const {
    extra = { limit: 3, items: [] },
    request,
    refreshButton = true,
    refreshLoading,
    onRefresh,
  } = props;

  const refreshAction: any = isFunction(request)
    ? {
        size: 'small',
        type: 'link',
        icon: <SyncOutlined />,
        loading: refreshLoading,
        shape: 'circle',
        onClick: onRefresh,
        title: globalLocale.flush,
        label: globalLocale.flush,
      }
    : false;

  if (isNil(extra)) return null;
  // ReactNode
  if (React.isValidElement(extra)) return extra;
  // MsActionProps
  if (isObject(extra)) {
    const actions = cloneDeepWithReactNode(extra) as MsActionsProps;
    actions.limit = actions.limit ?? 3;
    // 头部添加刷新按钮
    if (isArray(actions.items) && refreshButton) {
      actions.items?.unshift(refreshAction);
    }
    return <MsActions {...actions} />;
  }

  return null;
}

export default DescriptionsExtra;
