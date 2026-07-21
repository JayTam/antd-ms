import { Image } from 'antd';
import { forwardRef, useState } from 'react';
import ImagePlaceholder from '@jaytam/antd-ms/assets/images/image_placeholder.svg';

import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import type { MsImageProps, MsImageRef } from './types';

const MsFieldImage = forwardRef((props: MsImageProps, ref: MsImageRef) => {
  const { fieldProps } = props;

  const [loadError, setLoadError] = useState(false);

  const editDom = (
    <div ref={ref}>
      <Image
        {...fieldProps}
        fallback={ImagePlaceholder}
        preview={loadError ? false : fieldProps?.preview}
        onError={(...args) => {
          fieldProps?.onError?.(...args);
          setLoadError(true);
        }}
      />
    </div>
  );

  const readDom = editDom;

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsFieldImage);
