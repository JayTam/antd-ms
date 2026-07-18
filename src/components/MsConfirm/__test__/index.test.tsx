import { MsConfigProvider } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BasicDemo from '../__demo__/basic';
import LoadingDemo from '../__demo__/loading';

describe('MsConfirm', () => {
  test('MsConfirm.open 正常打开抽屉', async () => {
    await act(async () => {
      render(<BasicDemo />, { wrapper: MsConfigProvider });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('打 开'));
    });

    expect(screen.getByText('确认要删除该实例吗？')).toBeInTheDocument();
  });

  test('确定按钮异步', async () => {
    jest.useFakeTimers();
    await act(async () => {
      render(<LoadingDemo />, { wrapper: MsConfigProvider });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('打 开'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('确 定'));
    });

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByRole('img', { name: 'loading' })).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  test('取消按钮异步', async () => {
    jest.useFakeTimers();
    await act(async () => {
      render(<LoadingDemo />, { wrapper: MsConfigProvider });
    });

    await act(async () => {
      fireEvent.click(screen.getByText('打 开'));
    });

    await act(async () => {
      fireEvent.click(screen.getByText('取 消'));
    });

    expect(screen.getByRole('img', { name: 'loading' })).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.queryByRole('img', { name: 'loading' })).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
