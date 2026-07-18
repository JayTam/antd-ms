import { forwardRef } from 'react';
import useFieldRequest from '../../hooks/useFieldRequest';
import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import { TagsReadSkeleton, DefaultReadSkeleton } from '../MsSelect/skeletons';
import './index.less';
import type { MsTreeSelectProps, MsTreeSelectRef } from './types';
import EditTreeSelect from './components/EditTreeSelect';

/**
 * 树型选择器
 */
const MsTreeSelect = forwardRef((props: MsTreeSelectProps, ref: MsTreeSelectRef) => {
  const { initialLoading, loading, label, fieldProps } = useFieldRequest(props);
  const { options, ...restFieldProps } = fieldProps;
  const { mode, enumLoadingType } = useFieldModeContext(props);

  const treeSelectProps = {
    ref,
    loading,
    initialLoading,
    treeData: options,
    ...restFieldProps,
  };

  const editDom = <EditTreeSelect {...treeSelectProps} />;

  const readDom = label;

  const dom = useModeRender(props, editDom, readDom);

  if (mode === 'read' && loading) {
    if (enumLoadingType === 'tags') {
      return <TagsReadSkeleton />;
    }
    return <DefaultReadSkeleton />;
  }

  return dom;
});

export default enhanceField(MsTreeSelect);
