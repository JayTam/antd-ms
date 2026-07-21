import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';

import { forwardRef } from 'react';
import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import { TagsReadSkeleton, DefaultReadSkeleton } from '../MsSelect/skeletons';
import './index.less';
import type { MsCascaderComponentType, MsCascaderProps, MsCascaderRef } from './types';
import EditCascader from './components/EditCascader';

/**
 * 级联选择器
 */
const MsCascader = forwardRef((props: MsCascaderProps<any>, ref: MsCascaderRef) => {
  const { initialLoading, loading, getLabel, fieldProps, refreshOptions } = useFieldRequest(props);
  const { mode, enumLoadingType } = useFieldModeContext(props);

  const cascaderProps = { ref, loading, initialLoading, ...fieldProps };

  const editDom = <EditCascader {...cascaderProps} onRefreshOptions={refreshOptions} />;

  const readDom = fieldProps?.multiple ? getLabel() : getLabel(' / ');

  const dom = useModeRender(props, editDom, readDom);

  if (mode === 'read' && loading) {
    if (enumLoadingType === 'tags') {
      return <TagsReadSkeleton />;
    }
    return <DefaultReadSkeleton />;
  }

  return dom;
}) as unknown as MsCascaderComponentType;

export default enhanceField(MsCascader);
