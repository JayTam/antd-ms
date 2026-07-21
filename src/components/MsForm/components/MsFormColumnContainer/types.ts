import type { ReactNode } from 'react';
import type { MsFormProps } from '../../types';

export type MsFormColumnContainerProps<P, R, D> = Omit<MsFormProps<P, R, D>, 'children'> & {
  children: (columns?: MsFormProps<P, R, D>['columns']) => ReactNode;
};
