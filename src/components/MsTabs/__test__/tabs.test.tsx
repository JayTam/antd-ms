import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomizeTabs from '../tabs';
const mockItems = [
  { key: '1', label: 'Tab 1' },
  { key: '2', label: 'Tab 2' },
];

const mockProps = {
  items: mockItems,
  defaultActiveKey: '1',
  onChange: jest.fn(),
};

describe('测试Tabs组件的基本功能', () => {
  it('正常渲染', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomizeTabs {...mockProps} />
      </BrowserRouter>,
    );
    expect(getByText('Tab 1')).toBeInTheDocument();
  });

  it('点击后进行切换', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomizeTabs {...mockProps} />
      </BrowserRouter>,
    );
    fireEvent.click(getByText('Tab 2'));
    expect(mockProps.onChange).toHaveBeenCalledWith('2');
  });

  it('测试tabKeyName属性会引起urk变化', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CustomizeTabs {...mockProps} syncToUrl tabKeyName="name" />
      </BrowserRouter>,
    );
    fireEvent.click(getByText('Tab 2'));
    expect(window.location.href).toContain('?name=2');
  });

  // it('测试只设置tabKeyName属性会保留历史query参数', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <CustomizeTabs {...mockProps} syncToUrl tabKeyName="name" />
  //     </BrowserRouter>,
  //   );
  //   window.location.search = `?${encodeURIComponent('a=3&b=4&c=5')}`;

  //   act(() => {
  //     fireEvent.click(getByText('Tab 2'));
  //   });
  //   console.log('window.location2', window.location.search);
  //   expect(window.location.href).toContain('?a=3&b=4&c=5&name=2');
  // });
});
