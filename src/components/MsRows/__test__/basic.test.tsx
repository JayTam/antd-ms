import { render, screen } from '@testing-library/react';
import MsRows from '../rows';
import type { MsRowsItem } from '../types';

describe('MsRows 组件', () => {
  it('空行情况下渲染不崩溃', () => {
    const { container } = render(<MsRows />);
    expect(container.querySelector('.ms-rows')).toBeInTheDocument();
  });

  it('未提供时使用默认间距渲染', () => {
    render(<MsRows rows={['内容']} />);
    expect(screen.getByText('内容')).toHaveStyle(`margin-bottom: 4px`);
  });

  it('应用自定义间距', () => {
    render(<MsRows rows={['内容']} gap={16} />);
    expect(screen.getByText('内容')).toHaveStyle(`margin-bottom: 16px`);
  });

  it('正确渲染单个ReactNode行', () => {
    render(<MsRows rows="单一节点" />);
    expect(screen.getByText('单一节点')).toBeInTheDocument();
    expect(screen.getByText('单一节点')).toHaveClass('ms-rows-item');
  });

  it('正确渲染ReactNode数组行', () => {
    render(<MsRows rows={['节点1', '节点2']} />);
    expect(screen.getAllByText(/节点\d+/)).toHaveLength(2);
  });

  it('处理带有lineClamp的MsRowsItem', () => {
    const item: MsRowsItem = { title: '带有限制的文本', lineClamp: 3 };
    render(<MsRows rows={[item]} />);
    //jest 目前不支持`-webkit-line-clamp: 3` style检测
    expect(screen.getByText('带有限制的文本')).toHaveClass('ms-rows-line-clamp');
  });

  it('渲染带有自定义className和style的MsRowsItem', () => {
    const item: MsRowsItem = {
      title: '自定义样式',
      className: 'test1',
      style: { color: 'red' },
      id: '唯一ID',
    };
    render(<MsRows rows={[item]} />);
    expect(screen.getByText('自定义样式')).toHaveClass('test1', 'ms-rows-line-text');
    expect(screen.getByText('自定义样式')).toHaveStyle(`color: red`);
  });

  it('当MsRowsItem中提供id时使用其作为key', () => {
    const item: MsRowsItem = { key: 1, title: '带ID的' };
    render(<MsRows rows={[item]} />);
    expect(screen.getByText('带ID的')).toBeInTheDocument();
  });

  it('存在时调用MsRowsItem中的render函数', () => {
    const item: MsRowsItem = { render: () => <span>渲染内容</span> };
    render(<MsRows rows={[item]} />);
    expect(screen.getByText('渲染内容')).toBeInTheDocument();
  });
});
