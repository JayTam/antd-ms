import { MsField } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

const setup = async (initialValue: any, fieldProps: any = {}) => {
  const Test = () => {
    const [value, onChange] = useState(initialValue);

    return (
      <>
        <div data-testid="value">{typeof value === 'string' ? value : JSON.stringify(value)}</div>
        <MsField
          value={value}
          onChange={onChange}
          valueType="select"
          valueEnum={[
            { label: `选项一`, value: '1' },
            { label: `选项二`, value: '2' },
            { label: `选项三`, value: '3' },
          ]}
          fieldProps={{
            style: { width: 300 },
            placeholder: '选中标识',
            ...fieldProps,
          }}
        />
      </>
    );
  };

  await act(async () => {
    render(<Test />);
  });
};

describe('MsSelect labelInValue', () => {
  test('labelInValue未开启，初始化以及选择功能正常', async () => {
    await setup('1');
    const valueNode = screen.getByTestId('value');
    expect(valueNode.textContent).toBe('1');

    await act(async () => {
      const select = document.querySelector('.ant-select-selector');
      if (select) fireEvent.mouseDown(select);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('选项二'));
    });

    expect(valueNode.textContent).toBe('2');
  });

  test('labelInValue开启，select单选，初始化以及选择功能正常', async () => {
    await setup({ label: '选项一', value: '1' }, { labelInValue: true });
    const valueNode = screen.getByTestId('value');
    expect(valueNode.textContent).toBe(JSON.stringify({ label: '选项一', value: '1' }));

    await act(async () => {
      const select = document.querySelector('.ant-select-selector');
      if (select) fireEvent.mouseDown(select);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('选项二'));
    });

    expect(valueNode.textContent).toBe(JSON.stringify({ label: '选项二', value: '2' }));
  });

  test('labelInValue开启，select多选，初始化以及选择功能正常', async () => {
    await setup([{ label: '选项一', value: '1' }], { labelInValue: true, mode: 'multiple' });
    const valueNode = screen.getByTestId('value');
    expect(valueNode.textContent).toBe(JSON.stringify([{ label: '选项一', value: '1' }]));

    await act(async () => {
      const select = document.querySelector('.ant-select-selector');
      if (select) fireEvent.mouseDown(select);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('选项二'));
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('选项三'));
    });

    expect(valueNode.textContent).toBe(
      JSON.stringify([
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
      ]),
    );
  });
});
