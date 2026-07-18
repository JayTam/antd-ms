import { act } from '@testing-library/react';
import { setup } from '.';

describe('useUrlState', () => {
  it('state should be url search params', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?count=1',
      },
    ]);
    expect(res.state).toMatchObject({ count: '1' });
  });

  it('url should be changed when use setState', () => {
    const res = setup(['/index']);
    expect(res.state).toMatchObject({});
    act(() => {
      res.setState({ count: 1 });
    });
    expect(res.state).toMatchObject({ count: '1' });
  });

  it('multiple states should be work', () => {
    const res = setup(['/index']);
    act(() => {
      res.setState({ page: 1 });
    });
    act(() => {
      res.setState({ pageSize: 10 });
    });
    expect(res.state).toMatchObject({ page: '1', pageSize: '10' });
  });

  it('query-string options should work', async () => {
    const res = setup(
      [
        {
          pathname: '/index',
          search: '?foo=1,2,3',
        },
      ],
      {},
      {
        parseOptions: {
          comma: true,
        },
        stringifyOptions: {
          arrayFormat: 'comma',
        },
      },
    );
    expect(res.state).toMatchObject({ foo: ['1', '2', '3'] });

    act(() => {
      res.setState({ foo: ['4', '5', '6'] });
    });
    expect(res.state).toMatchObject({ foo: ['4', '5', '6'] });
  });

  it('location.state should be remain', () => {
    const res = setup([
      {
        pathname: '/index',
        state: 'state',
      },
    ]);
    expect(res.location.state).toBe('state');
    act(() => {
      res.setState({ count: 1 });
    });
    expect(res.state).toMatchObject({ count: '1' });
    expect(res.location.state).toBe('state');
  });

  it('nest obj parse and stringify', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?foo[bar]=baz',
      },
    ]);
    expect(res.state).toMatchObject({ foo: { bar: 'baz' } });
    act(() => {
      res.setState({ foo: { bar: 'abc' } });
    });
    expect(res.location.search).toBe('?foo[bar]=abc');
  });

  it('nest array parse and stringify', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?foo[bar]=baz',
      },
    ]);
    expect(res.state).toMatchObject({ foo: { bar: 'baz' } });
    act(() => {
      res.setState({ foo: { bar: 'abc' } });
    });
    expect(res.location.search).toBe('?foo[bar]=abc');
  });

  it('state value should be url encode', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?foo=！%40%23￥%25……',
      },
    ]);
    expect(res.state).toMatchObject({ foo: '！@#￥%……' });
  });

  it('initial state', () => {
    const res = setup(
      [
        {
          pathname: '/index',
          search: '',
        },
      ],
      {
        foo: 'baz',
      },
    );
    expect(res.state).toMatchObject({ foo: 'baz' });
  });

  it('数组类型要支持 [undefined, "1"] 类型，不要被解析成 ["1"]', () => {
    const res = setup([
      {
        pathname: '/index',
      },
    ]);
    act(() => {
      res.setState({ list: [undefined, '1'] });
    });
    expect(res.location.search).toBe('?list[1]=1');
  });

  it('数组类型要支持 [undefined, "1"] 类型，不要解析换成 ["1"]', () => {
    const res = setup([
      {
        pathname: '/index',
        search: '?list[1]=1',
      },
    ]);
    expect(res.state).toMatchObject({ list: [undefined, '1'] });
  });
});
