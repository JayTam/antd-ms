import { jest } from '@jest/globals';
import type React from 'react';

//对umi模块mock支持
jest.mock('umi', () => {
  const nameSpaceMap = new Map<string, any>();
  const originModule = jest.requireActual('umi') as any;
  return {
    ...originModule,
    useModel: (nameSpace: string) => {
      const val = nameSpaceMap.get(nameSpace);
      const dispatcher = (v: any) => {
        nameSpaceMap.set(nameSpace, v);
      };
      return [val, dispatcher];
    },
    connect: () => (component: any) => ({ WrappedComponent: component }),
    Link: (p: { children?: React.ReactNode }) => p.children,
  };
});
