import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { forwardRef } from 'react';
import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import { TagsReadSkeleton, DefaultReadSkeleton } from './skeletons';
import type { MsSelectProps, MsSelectRef } from './types';
import EditSelect from './components/EditSelect';
import ClickEditSelect from './components/ClickEditSelect';

import './index.less';

/**
 * Select 选择器组件
 */
const MsSelect = forwardRef((props: MsSelectProps, ref: MsSelectRef) => {
  const { initialLoading, loading, label, refreshRequest, fieldProps } = useFieldRequest(props);

  const selectFieldProps = { loading, initialLoading, ref, ...fieldProps };

  const { mode, enumLoadingType } = useFieldModeContext(props);

  const editDom = <EditSelect {...selectFieldProps} onRefresh={() => refreshRequest(false)} />;

  const readDom = label;

  const clickEditDom = <ClickEditSelect {...selectFieldProps} readDom={readDom} />;

  const dom = useModeRender(props, editDom, readDom, clickEditDom);

  if (mode === 'read' && loading) {
    if (enumLoadingType === 'tags') {
      return <TagsReadSkeleton />;
    }
    return <DefaultReadSkeleton />;
  }

  return dom;
});

export default enhanceField(MsSelect);
