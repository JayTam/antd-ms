import { render, screen } from '@testing-library/react';
import type { MsStatisticProps } from '../index';
import MsStatistic from '../index';

const items = [
  {
    title: 'Item 1',
    value: 100,
    prefix: 'AA',
    suffix: 'ZZ',
    unit: '%',
    precision: 2,
    onClick: () => {
      console.log('item 1 click');
    },
    subStatistic: {
      title: '副指标',
      value: 50,
    },
    titleProps: {
      title: 'Item 11',
      titlePrefix: 'A',
      titleSuffix: 'Z',
      extra: <span>自定义渲染</span>,
    },
  },
  {
    title: 'Item 2',
    mode: 'countdown' as any,
    inline: true,
    value: new Date().getTime() + 5 * 60 * 1000,
    onClick: () => {
      console.log('item 2 click');
    },
  },
];

const setup = (props: Partial<MsStatisticProps> = {}) => {
  const defaultProps: MsStatisticProps = {
    items,
  };
  return render(<MsStatistic {...defaultProps} {...props} />);
};

test('只传必填props，测试组件是否正确渲染', () => {
  setup();
});

test('测试title是否正确渲染', () => {
  setup({
    title: 'Test Title',
    onClick: () => {
      console.log('card click');
    },
    column: 3,
  });
  expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('测试titleExtra是否正确渲染', () => {
  setup({ noCard: true, gutter: [15, 20] });
  expect(screen.getByText('自定义渲染')).toBeInTheDocument();
});

test('测试副指标是否正确渲染', () => {
  setup();
  expect(screen.getByText('副指标')).toBeInTheDocument();
});

test('确保items正确显示', () => {
  setup();
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});

test('快照测试', () => {
  const { asFragment } = setup();
  expect(asFragment()).toMatchSnapshot();
});
