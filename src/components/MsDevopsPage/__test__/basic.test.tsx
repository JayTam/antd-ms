import { fireEvent, render, screen } from '@testing-library/react';
import MsDevopsPage from '../page';

jest.mock('@jaytam/antd-ms/components', () => ({
  MsIconFont: () => <button>返回</button>,
  MsActions: () => <button>actions</button>,
}));

// 测试渲染组件
describe('MsDevopsPage 组件测试', () => {
  it('应该正确渲染标题和内容', () => {
    render(<MsDevopsPage title="测试标题">内容</MsDevopsPage>);
    expect(screen.getByText('测试标题')).toBeInTheDocument();
    expect(screen.getByText('内容')).toBeInTheDocument();
  });

  it('应该渲染返回按钮', () => {
    const { container } = render(<MsDevopsPage title="标题" showBack={true} />);
    expect(container.querySelector('.ms-devops-page-back')).toBeInTheDocument();
  });

  it('点击返回按钮应该调用 onBack 函数', () => {
    const onBackMock = jest.fn();
    render(<MsDevopsPage title="标题" showBack={true} onBack={onBackMock} />);
    fireEvent.click(screen.getByText('返回')); // 假设返回按钮文本是 "返回"
    expect(onBackMock).toHaveBeenCalled();
  });

  it('点击返回按钮应该调用 history.back() 如果 onBack 不存在', () => {
    const historyBackMock = jest.spyOn(window.history, 'back').mockImplementation(() => {});
    render(<MsDevopsPage title="标题" showBack={true} />);
    fireEvent.click(screen.getByText('返回'));
    expect(historyBackMock).toHaveBeenCalled();
    historyBackMock.mockRestore();
  });

  it('应该正确渲染 extra 属性', () => {
    const extra = <div>额外内容</div>;
    render(<MsDevopsPage title="标题" extra={extra} />);
    expect(screen.getByText('额外内容')).toBeInTheDocument();
  });

  it('当 extra 不是有效元素时，应该渲染 MsActions 组件', () => {
    const extraProps = { items: [{ label: 'a' }] }; // MsActionsProps 示例
    render(<MsDevopsPage title="标题" extra={extraProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument(); // 假设 MsActions 渲染了一个按钮
  });

  it('应该正确应用 className 和 containerClassName', () => {
    const { container } = render(
      <MsDevopsPage title="标题" className="test-class" containerClassName="test-container" />,
    );
    expect(container.querySelector('.test-container')).toBeInTheDocument();
    expect(container.querySelector('.ms-devops-page-title.test-class')).toBeInTheDocument();
  });

  it('应该应用传入的 style', () => {
    const style = { backgroundColor: 'red' };
    const { container } = render(<MsDevopsPage title="标题" style={style} />);
    expect(container.querySelector('.ms-devops-page-title')).toHaveStyle('background-color: red');
  });
});
