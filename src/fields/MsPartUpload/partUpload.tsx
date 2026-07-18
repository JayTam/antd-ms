import { forwardRef } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import PartUploader from './components/PartUpload';
import type { MsPartUploadProps, MsPartUploadRef } from './types';

const MsPartUpload = forwardRef((props: MsPartUploadProps, ref: MsPartUploadRef) => {
  const { fieldProps } = props;

  const editDom = <PartUploader ref={ref} {...fieldProps} />;

  const readDom = fieldProps?.value?.name;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsPartUpload);
