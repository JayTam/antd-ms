import { fireEvent, getByTestId, getByTitle, render } from '@testing-library/react';
import { act, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { MsConfigProvider } from '../components';
import type { RenderResult } from '@testing-library/react';

type AsyncRenderResult<T extends (...args: any) => any> = ReturnType<T> extends Promise<any>
  ? T
  : (...args: Parameters<T>) => Promise<ReturnType<T>>;

/**
 * 将 render 改造成异步，组件库大部分组件需要用异步渲染
 * @param ui
 * @param options
 * @returns
 */
export const asyncRender: AsyncRenderResult<typeof render> = async (ui, options) => {
  let result: RenderResult;

  await act(async () => {
    result = render(ui, options);
  });

  return result!;
};

type SetupWrapperConfig = {
  wrapperReactRouter?: boolean;
  wrapperMsConfigProvider?: boolean;
};

/**
 * 预设了组件库的应用场景的 asyncRender，简化使用
 * @param ui
 * @param config
 * @returns
 */
export const asyncRenderPreset = async (
  ui: ReactNode,
  config: SetupWrapperConfig = {},
): Promise<RenderResult> => {
  const { wrapperMsConfigProvider, wrapperReactRouter = true } = config;
  const renderNode = wrapperMsConfigProvider ? <MsConfigProvider>{ui}</MsConfigProvider> : ui;
  const result = await asyncRender(<>{renderNode}</>, {
    wrapper: wrapperReactRouter ? MemoryRouter : undefined,
  });
  return result;
};

/**
 * 触发 antd select 组件中可选项的点击事件
 * @param selectTestId 选择器testid，需通过 data-testid='network' 设置
 * @param optionLabel 选项的 label 名
 */
export async function fireClickAntSelectOption(
  selectTestId: string,
  optionLabel: string,
  container = document.body,
) {
  const select = getByTestId(container, selectTestId);

  await act(async () => {
    // 选择器只能从这个元素触发
    const selectDropdownTrigger = select.querySelector('.ant-select-selector');
    if (selectDropdownTrigger) {
      fireEvent.mouseDown(selectDropdownTrigger);
    }
  });

  await act(async () => {
    const option = getByTitle(select, optionLabel);
    fireEvent.click(option);
  });
}

/**
 * 单测等待时间
 * @param time
 * @returns
 */
export const sleepTest = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), time));
