import { resolveRender } from '../../utils/render';

describe('MsTable utils resolveRender', () => {
  test('JSX.Element', () => {
    const input = <div />;
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('string', () => {
    const input = 'test';
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('number', () => {
    const input = 1000;
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('boolean', () => {
    const input = true;
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('undefined', () => {
    const input = undefined;
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('null', () => {
    const input = null;
    const output = resolveRender(input, { dataSource: [], loading: true, values: {} });
    expect(input).toBe(output);
  });

  test('函数', () => {
    const input: Parameters<typeof resolveRender>[0] = jest
      .fn()
      .mockImplementation((dataSource, loading, values) => {
        return (
          <div>
            <div>{JSON.stringify(dataSource)}</div>
            <div>{loading}</div>
            <div>{JSON.stringify(values)}</div>
          </div>
        );
      });
    const props = {
      dataSource: [{ name: 'name' }, { name: 'name' }, { name: 'name' }],
      loading: true,
      values: { name: 'name' },
    };
    resolveRender(input, props);
    expect(input).toHaveBeenCalled();
    expect(input).toHaveBeenCalledWith(props.dataSource, props.loading, props.values);
  });
});
