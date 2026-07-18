import { Skeleton } from 'antd';
import { forwardRef, lazy, Suspense } from 'react';
import type { MsPartUploadProps, MsPartUploadRef } from './types';

const PartUpload = lazy(() => import('./partUpload'));

const MsPartUploadLazy = forwardRef((props: MsPartUploadProps, ref: MsPartUploadRef) => {
  return (
    <Suspense fallback={<Skeleton.Input style={{ height: 250 }} active block />}>
      <PartUpload {...props} ref={ref} />
    </Suspense>
  );
});

export default MsPartUploadLazy;

export type { MsPartUploadProps, MsPartUploadRef } from './types';
