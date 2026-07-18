import { MsActions } from '@jaytam/antd-ms';
import { asyncRenderPreset } from '@jaytam/antd-ms/tests/utils';
import { screen } from '@testing-library/react';
import type { MsActionsProps } from '../types';
import { itemsToRenderItems } from '../utils';

const setup = async (props?: MsActionsProps) => {
  await asyncRenderPreset(
    <MsActions
      items={[
        { label: '按钮1' },
        { label: '按钮2' },
        { label: '按钮3' },
        { label: '按钮4' },
        { label: '按钮5' },
      ]}
      {...props}
    />,
  );
};

describe('MsActions 组件', () => {
  test('limit 为 0 展示全部', async () => {
    await setup({ lint: 0 });
    expect(screen.queryByText('按钮1')).not.toBeInTheDocument();
    expect(screen.queryByText('按钮5')).not.toBeInTheDocument();
  });

  test('兼容老版本 children', async () => {
    await asyncRenderPreset(
      <MsActions>
        <div key={1}>按钮1</div>
        <div key={2}>按钮2</div>
        <div key={3}>按钮3</div>
        <div key={4}>按钮4</div>
        <div key={5}>按钮5</div>
        <div key={6}>按钮6</div>
      </MsActions>,
    );
    expect(screen.getByText('按钮1')).toBeInTheDocument();
  });

  test('任何都不输入', async () => {
    await asyncRenderPreset(<MsActions lint={10} />);
    expect(screen.queryByText('按钮')).not.toBeInTheDocument();
  });
});

describe('MsActions 工具函数', () => {
  test('itemsToRenderItems', () => {
    expect(itemsToRenderItems({})).toEqual([]);
  });
});
