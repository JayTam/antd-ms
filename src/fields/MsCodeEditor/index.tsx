import { Skeleton } from 'antd';
import { forwardRef, lazy, Suspense } from 'react';
import type { MsCodeProps, MsCodeRef } from './types';

const CodeEditor = lazy(() => import('./code'));

const MsCodeEditorLazy = forwardRef((props: MsCodeProps, ref: MsCodeRef) => {
  return (
    <Suspense fallback={<Skeleton.Input style={{ height: 250 }} active block />}>
      <CodeEditor {...props} ref={ref} />
    </Suspense>
  );
});

export default MsCodeEditorLazy;

export type { MsCodeProps, MsCodeRef } from './types';
