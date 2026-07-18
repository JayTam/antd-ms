import { AutoComplete } from 'antd';
import { forwardRef } from 'react';
import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsAutoCompleteProps, MsAutoCompleteRef } from './types';
import { DefaultReadSkeleton, TagsReadSkeleton } from '../MsSelect/skeletons';
import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';

const MsAutoComplete = forwardRef((props: MsAutoCompleteProps, ref: MsAutoCompleteRef) => {
  const { fieldProps, label, loading } = useFieldRequest(props, { defaultAutoSelect: false });
  const { mode, enumLoadingType } = useFieldModeContext(props);

  const editDom = <AutoComplete ref={ref} allowClear showSearch {...fieldProps} />;

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

export default enhanceField(MsAutoComplete);
