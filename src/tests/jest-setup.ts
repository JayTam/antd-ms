import '@testing-library/jest-dom';
import 'umi/test-setup';

import { configure } from '@testing-library/dom';

// https://jestjs.io/zh-Hans/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

configure({
  defaultHidden: true,
  asyncUtilTimeout: 3000,
});
