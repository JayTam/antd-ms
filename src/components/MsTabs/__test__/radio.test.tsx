import { act, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CustomizeTabs from '../tabs';
const mockItems = [
  { key: '1', label: 'Tab 1' },
  { key: '2', label: 'Tab 2' },
  { key: '3', label: 'Tab 3' },
  { key: '4', label: 'Tab 4' },
];

const mockProps = {
  items: mockItems,
  type: 'radio' as const,
  activeKey: '1',
  defaultActiveKey: '1',
  onChange: jest.fn(),
};

describe('测试Radio 类型的Tabs组件', () => {
  it('max过大时不会出现左右箭头', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <CustomizeTabs {...mockProps} max={5} />
      </BrowserRouter>,
    );
    expect(getByText('Tab 1')).toBeInTheDocument();
    expect(container.querySelectorAll('.radio-arrow').length).toBe(0);
  });

  it('max小于items的length时会出现左右箭头', () => {
    const { container } = render(
      <BrowserRouter>
        <CustomizeTabs {...mockProps} max={3} />
      </BrowserRouter>,
    );
    const leftArrow = container.querySelector('.radio-left');
    const rightArrow = container.querySelector('.radio-right');
    expect(leftArrow).not.toBeNull();
    expect(rightArrow).not.toBeNull();
    expect(leftArrow?.className).toContain('radio-disable');
    expect(rightArrow?.className).not.toContain('radio-disable');
    act(() => {
      fireEvent.click(rightArrow!);
    });
    expect(container.querySelector('.radio-left')?.className).not.toContain('radio-disable');
    expect(container.querySelector('.radio-right')?.className).toContain('radio-disable');
  });
});
