import { MsField } from '@jaytam/antd-ms';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

const setup = async (type: 'props' | 'fieldProps' = 'props') => {
  function Test() {
    const [state, setState] = useState<any>('初始值');

    let FieldComponent;

    if (type === 'props') {
      FieldComponent = (
        <MsField
          value={state}
          onChange={(event) => setState(event.target?.value)}
          fieldProps={{ placeholder: '文本' }}
        />
      );
    }

    FieldComponent = (
      <MsField
        fieldProps={{
          value: state,
          onChange: (event) => setState(event.target?.value),
          placeholder: '文本',
        }}
      />
    );
    return (
      <>
        {FieldComponent}
        <button onClick={() => setState(undefined)}>重置undefined</button>
        <button onClick={() => setState(null)}>重置null</button>
        <button onClick={() => setState('修改值')}>修改值</button>
      </>
    );
  }

  await act(async () => {
    render(<Test />);
  });

  return {
    input: screen.getByPlaceholderText('文本'),
    undefinedBtn: screen.getByText('重置undefined'),
    nullBtn: screen.getByText('重置null'),
    changeBtn: screen.getByText('修改值'),
  };
};

describe('MsField', () => {
  test('props.value 和 props.onChange 生效', async () => {
    const { input, changeBtn } = await setup('props');

    await act(async () => {
      fireEvent.click(changeBtn);
    });

    expect(input).toHaveDisplayValue('修改值');
  });

  test('fieldProps.value 和 fieldProps.onChange 生效', async () => {
    const { input, changeBtn } = await setup('fieldProps');

    await act(async () => {
      fireEvent.click(changeBtn);
    });

    expect(input).toHaveDisplayValue('修改值');
  });

  test('props.value 重设 undefined，应该清空 value', async () => {
    const { input, undefinedBtn } = await setup('props');

    await act(async () => {
      fireEvent.click(undefinedBtn);
    });

    expect(input).toHaveDisplayValue('');
  });

  test('props.value 重设 null，应该清空 value', async () => {
    const { input, nullBtn } = await setup('props');

    await act(async () => {
      fireEvent.click(nullBtn);
    });

    expect(input).toHaveDisplayValue('');
  });

  test('fieldProps.value 重设 undefined，应该清空 value', async () => {
    const { input, undefinedBtn } = await setup('props');

    await act(async () => {
      fireEvent.click(undefinedBtn);
    });

    expect(input).toHaveDisplayValue('');
  });

  test('fieldProps.value 重设 null，应该清空 value', async () => {
    const { input, nullBtn } = await setup('props');

    await act(async () => {
      fireEvent.click(nullBtn);
    });

    expect(input).toHaveDisplayValue('');
  });
});
