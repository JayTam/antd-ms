import { act, render } from '@testing-library/react';
import { globSync } from 'glob';
import { basename, join, sep } from 'path';
import { BrowserRouter } from 'react-router-dom';

/**
 * 根据demos批量生成快照测试用例
 * @param component 组件名
 */
export default function demoTest(component: string) {
  let _log: any;
  beforeEach(() => {
    _log = console.log;
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = _log;
  });

  describe(`${component} 组件 demo 测试`, () => {
    const files = globSync(`**/components/${component}/__demo__/*.tsx`, {
      ignore: 'node_modules/**',
    });
    files.forEach(async (f) => {
      const file = join(process.cwd(), f.split(sep).join('/'));
      const fileName = basename(file);
      if (fileName?.includes('debug')) return;

      test(`正确渲染 ${component} ${fileName}`, async () => {
        const Dom = require(file).default;

        // 模拟时间前进
        jest.useFakeTimers();

        let container: any;

        await act(async () => {
          const result = render(
            <BrowserRouter>
              <Dom />
            </BrowserRouter>,
          );
          container = result.container;
        });

        expect(container).toMatchSnapshot();
      });
    });
  });
}

/**
 * 根据demos批量生成快照测试用例
 * @param field 组件名
 */
export function demoTestField(field: string) {
  let _log: any;
  beforeEach(() => {
    _log = console.log;
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = _log;
  });

  describe(`MsField${field} 组件 demo 测试`, () => {
    const files = globSync(`**/fields/${field}/__demo__/*.tsx`, {
      ignore: 'node_modules/**',
    });
    files.forEach(async (f) => {
      const file = join(process.cwd(), f.split(sep).join('/'));
      const fileName = basename(file);
      if (fileName?.includes('debug')) return;

      test(`正确渲染 MsField${field} ${fileName}`, async () => {
        const Dom = require(file).default;

        // 模拟时间前进
        jest.useFakeTimers();

        let container: any;

        await act(async () => {
          const result = render(
            <BrowserRouter>
              <Dom />
            </BrowserRouter>,
          );
          container = result.container;
        });

        expect(container).toMatchSnapshot();
      });
    });
  });
}
