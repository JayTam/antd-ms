import { Skeleton } from 'antd';
import { forwardRef, lazy, Suspense } from 'react';
import type { MsRichTextProps, MsRichTextRef } from './types';

// 不能放在组件内部，会导致输入时闪现
const RichText = lazy(() => import('./richText'));

const MsRichTextLazy = forwardRef((props: MsRichTextProps, ref: MsRichTextRef) => {
  return (
    <Suspense fallback={<Skeleton.Input style={{ height: 250 }} active block />}>
      <RichText {...props} ref={ref} />
    </Suspense>
  );
});

export default MsRichTextLazy;

export type { MsRichTextProps, MsRichTextRef } from './types';
