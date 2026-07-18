declare module '*.css';
declare module '*.less';

declare module '*.svg' {
  import type * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare module 'dompurify';
declare module 'react-custom-scrollbars';
