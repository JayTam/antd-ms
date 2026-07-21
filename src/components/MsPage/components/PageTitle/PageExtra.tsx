import { SyncOutlined } from '@ant-design/icons';

import type { MsActionsProps } from '@jaytam/antd-ms/components/MsActions';
import MsActions from '@jaytam/antd-ms/components/MsActions';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { Skeleton } from 'antd';
import { isArray, isFunction, isNil, isObject } from 'lodash-es';
import React from 'react';
import type { MsPageProps } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type PageExtraProps<P, R, D> = MsPageProps<P, R, D> & {
  loading?: boolean;
  refreshLoading?: boolean;
  onRefresh?: () => void;
};

const PageExtra = <P, R, D>(props: PageExtraProps<P, R, D>) => {
  const {
    extra = { limit: 3, items: [] },
    request,
    dataSource,
    loading,
    refreshLoading,
    refreshButton = true,
    onRefresh,
  } = props;

  const { globalLocale } = useLocale();

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
  if (loading) return <Skeleton.Input active style={{ minWidth: 100, width: 100, height: 26 }} />;

  const extraNoFunc = isFunction(extra) ? extra(dataSource) : extra;
  // ReactNode
  if (React.isValidElement(extraNoFunc)) return extraNoFunc;
  // MsActionProps
  if (isObject(extraNoFunc)) {
    const actions = cloneDeepWithReactNode(extraNoFunc) as MsActionsProps;
    actions.limit = actions.limit ?? 3;
    // 头部添加刷新按钮
    if (isArray(actions.items) && refreshButton) {
      actions.items?.unshift(refreshAction);
    }
    return <MsActions {...actions} />;
  }

  return null;
};

export default PageExtra;
