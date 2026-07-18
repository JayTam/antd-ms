import { Skeleton } from 'antd';
import { forwardRef, lazy, Suspense } from 'react';
import type { MsDiffEditorProps, MsDiffEditorRef } from './types';

const DiffEditor = lazy(() => import('./diff'));

const MsDiffEditorLazy = forwardRef((props: MsDiffEditorProps, ref: MsDiffEditorRef) => {
  return (
    <Suspense fallback={<Skeleton.Input style={{ height: 250 }} active block />}>
      <DiffEditor {...props} ref={ref} />
    </Suspense>
  );
});

export default MsDiffEditorLazy;

export type { MsDiffEditorProps, MsDiffEditorRef } from './types';
