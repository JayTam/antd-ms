import { jest } from '@jest/globals';
import type React from 'react';

jest.mock('antd', () => {
  const antdMock: any = jest.requireActual('antd');
  return {
    ...antdMock,
    Drawer: (p: { children?: React.ReactNode }) => p.children,
    Row: (p: { children?: React.ReactNode }) => p.children,
    Col: (p: { children?: React.ReactNode }) => p.children,
    Autocomplete: () => 'Autocomplete',
  };
});
