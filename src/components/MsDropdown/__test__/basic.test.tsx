import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MsDropdown from '..';

describe('MsDropdown 组件测试', () => {
  // 测试默认渲染和基本功能
  test('默认渲染及点击触发下拉菜单', async () => {
    const mockOnClick = jest.fn();
    const menuItems = [{ key: '1', label: '选项1' }];
    render(
      <MsDropdown trigger={['click']} menu={{ items: menuItems, onClick: mockOnClick }} type="text">
        选择项
      </MsDropdown>,
    );

    // 验证标题是否正确渲染
    expect(screen.getByText('选择项')).toBeInTheDocument();

    // 模拟点击触发下拉
    const triggerButton = screen.getByText('选择项');
    fireEvent.click(triggerButton);

    // 验证菜单项是否出现
    await waitFor(() => expect(screen.getByText('选项1')).toBeInTheDocument());

    // 模拟选择菜单项
    fireEvent.click(screen.getByText('选项1'));

    const calledParams = mockOnClick.mock.calls[0][0];
    // 验证菜单点击回调是否被调用
    expect(calledParams).toMatchObject({ key: '1', keyPath: ['1'] });
  });

  // 测试禁用状态
  test('组件在禁用状态下不可交互', () => {
    render(
      <MsDropdown
        trigger={['click']}
        menu={{ items: [{ key: '1', label: '选项1' }] }}
        type="text"
        disabled
      >
        禁用的下拉
      </MsDropdown>,
    );

    // 验证禁用状态
    const triggerButton = screen.getByText('禁用的下拉');
    fireEvent.click(triggerButton);
    // 验证菜单项是否出现
    expect(screen.queryByText('选项1')).toBeNull();
  });

  // 测试 Popconfirm 功能
  test('带有 Popconfirm 的下拉菜单', async () => {
    const mockClick = jest.fn();
    render(
      <MsDropdown
        trigger={['click']}
        menu={{ items: [{ key: '1', label: '选项1' }], onClick: mockClick }}
        popconfirm
      >
        确认选择
      </MsDropdown>,
    );

    // 触发菜单点击
    fireEvent.click(screen.getByText('确认选择'));

    // 验证菜单项是否出现
    await waitFor(() => expect(screen.getByText('选项1')).toBeInTheDocument());

    // 模拟选择菜单项
    fireEvent.click(screen.getByText('选项1'));

    // 验证确认没有回调
    expect(mockClick).not.toHaveBeenCalled();

    // 确认 Popconfirm 是否出现
    await waitFor(() => expect(screen.getByText('确定选择选项1吗？')).toBeInTheDocument());

    // 点击确定按钮
    const confirmButton = screen.getByText('确 定');
    fireEvent.click(confirmButton);

    const calledParams = mockClick.mock.calls[0][0];
    // 验证菜单点击回调是否被调用
    expect(calledParams).toMatchObject({ key: '1', keyPath: ['1'] });
  });

  test('不同类型的触发器渲染正确', () => {
    const { container, rerender } = render(
      <MsDropdown menu={{ items: [] }} type="button">
        类型测试
      </MsDropdown>,
    );

    // 按钮类型的触发器
    expect(container.querySelector('.ms-dropdown-trigger-button')).toBeInTheDocument();

    rerender(
      <MsDropdown menu={{ items: [] }} type="text">
        类型测试
      </MsDropdown>,
    );

    // 文本类型的触发器
    expect(container.querySelector('.ms-dropdown-trigger-text')).toBeInTheDocument();

    rerender(
      <MsDropdown menu={{ items: [] }} type="card">
        类型测试
      </MsDropdown>,
    );

    // 卡片类型的触发器
    expect(container.querySelector('.ms-dropdown-trigger-card')).toBeInTheDocument();

    rerender(
      <MsDropdown menu={{ items: [] }} type="card" disabled>
        类型测试
      </MsDropdown>,
    );

    // 卡片类型的触发器
    expect(container.querySelector('.ms-dropdown-trigger-disabled')).toBeInTheDocument();
  });
});
