import { MsCopy } from '@jaytam/antd-ms';
import { asyncRenderPreset } from '@jaytam/antd-ms/tests/utils';
import { act, fireEvent, screen } from '@testing-library/react';

describe('MsCopy', () => {
  test('渲染节点无法复制', async () => {
    await asyncRenderPreset(
      <MsCopy>
        <button>copy text</button>
      </MsCopy>,
    );

    await act(async () => {
      const el = screen.getByText('copy text');
      fireEvent.click(el);
    });

    expect(screen.queryByText('复制成功')).toBeNull();
  });

  test('默认提示：复制成功', async () => {
    await asyncRenderPreset(<MsCopy>copy text</MsCopy>);

    await act(async () => {
      const el = screen.getByText('copy text');
      fireEvent.click(el);
    });

    expect(screen.getByText('复制成功')).toBeInTheDocument();
  });

  test('copyable 类型复制', async () => {
    await asyncRenderPreset(
      <MsCopy type="copyable" text="复制内容" ellipsis>
        copy text
      </MsCopy>,
    );

    await act(async () => {
      const el = screen.getByRole('img', { name: 'copy' });
      fireEvent.click(el);
    });

    expect(screen.getByText('复制成功')).toBeInTheDocument();
  });

  test('copyable 类型连续点击两次按钮', async () => {
    await asyncRenderPreset(
      <MsCopy type="copyable" text="复制内容" ellipsis>
        <div>copy text</div>
      </MsCopy>,
    );

    await act(async () => {
      const el = screen.getByRole('img', { name: 'copy' });
      fireEvent.click(el);
      await new Promise((resolve) => {
        setTimeout(() => {
          fireEvent.click(el);
          resolve('');
        }, 1000);
      });
    });

    expect(screen.getByText('复制成功')).toBeInTheDocument();
  });
});
