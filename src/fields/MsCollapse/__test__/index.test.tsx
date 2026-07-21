import { MsField } from '@jaytam/antd-ms';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useState } from 'react';

const setUp = () => {
  let key = 1;

  const enumRequest = () => {
    const data = [
      { label: `label=选项一 / key=${key} / value=${10 + key}`, value: 10 + key },
      { label: `label=选项二 / key=${key} / value=${20 + key}`, value: 20 + key },
      { label: `label=选项三 / key=${key} / value=${30 + key}`, value: 30 + key },
    ];
    return new Promise((resolve) => {
      const res = { data: data };
      key += 1;
      setTimeout(() => resolve(res), 1000);
    });
  };

  const AutoSelectFirst = () => {
    const [value, onChange] = useState();

    return (
      <>
        <MsField
          value={value}
          onChange={onChange}
          valueType="select"
          request={enumRequest}
          fieldProps={{ style: { width: 300 }, autoSelect: 'first', refreshButton: true }}
        />
        <button onClick={() => onChange(undefined)}>清空选项</button>
      </>
    );
  };

  return AutoSelectFirst;
};

describe('MsField-select，autoSelect=first', () => {
  test('初始化选中第一项', async () => {
    const Test = setUp();
    const { findByTitle, findByRole } = render(<Test />);
    // 加载中
    await expect(findByRole('img', { name: 'loading' })).resolves.toBeInTheDocument();
    // 等到加载完毕
    await waitFor(() => findByRole('img', { name: 'down' }));
    // 断言是否
    await expect(findByTitle('label=选项一 / key=1 / value=11')).resolves.toBeInTheDocument();
  });

  test('当前有选中项，可选项更新，重新触发选中第一项', async () => {
    const Test = setUp();
    const { findByTitle, findByRole } = render(<Test />);
    await waitFor(() => findByRole('img', { name: 'down' }));
    const refreshBtn = await findByRole('img', { name: 'sync' });
    act(() => {
      fireEvent.click(refreshBtn);
    });
    await expect(findByRole('img', { name: 'loading' })).resolves.toBeInTheDocument();
    await waitFor(() => findByRole('img', { name: 'down' }));
    await expect(findByTitle('label=选项一 / key=2 / value=12')).resolves.toBeInTheDocument();
  });

  test('当前有选中项，可选项更新，重新触发选中第一项', async () => {
    const Test = setUp();
    const { findByTitle, findByRole, findByText, queryByRole } = render(<Test />);
    await waitFor(() => findByRole('img', { name: 'down' }));
    await expect(findByTitle('label=选项一 / key=1 / value=11')).resolves.toBeInTheDocument();
    const clearBtn = await findByText('清空选项');
    act(() => {
      fireEvent.click(clearBtn);
    });
    expect(queryByRole('label=选项一 / key=1 / value=11')).toBeNull();
    const refreshBtn = await findByRole('img', { name: 'sync' });
    act(() => {
      fireEvent.click(refreshBtn);
    });
    await waitFor(() => findByRole('img', { name: 'down' }));
    await expect(findByTitle('label=选项一 / key=2 / value=12')).resolves.toBeInTheDocument();
  });
});
