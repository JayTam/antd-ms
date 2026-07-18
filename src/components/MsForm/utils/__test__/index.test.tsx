import moment from 'moment';

import { parseFormValues } from '../formValues';
import { mergeNamePath } from '../namePath';

describe('MsForm Utils', () => {
  test('初始值 time', () => {
    const values = parseFormValues(
      {
        timeA: new Date(1703149668419),
        timeB: 1703149668419,
        timeC: moment(1703149668419),
      },
      [
        {
          dataIndex: 'timeA',
          valueType: 'time',
        },
        {
          dataIndex: 'timeB',
          valueType: 'time',
        },
        {
          dataIndex: 'timeC',
          valueType: 'time',
        },
      ],
    );

    expect(moment.isMoment(values.timeA)).toBe(true);
    expect(moment.isMoment(values.timeB)).toBe(true);
    expect(moment.isMoment(values.timeC)).toBe(true);
    expect(values.timeA?.valueOf()).toBe(1703149668419);
    expect(values.timeB?.valueOf()).toBe(1703149668419);
    expect(values.timeC?.valueOf()).toBe(1703149668419);
  });

  test('初始值 date', () => {
    const values = parseFormValues(
      {
        timeA: new Date(1703149668419),
        timeB: 1703149668419,
        timeC: moment(1703149668419),
      },
      [
        {
          dataIndex: 'timeA',
          valueType: 'time',
        },
        {
          dataIndex: 'timeB',
          valueType: 'time',
        },
        {
          dataIndex: 'timeC',
          valueType: 'time',
        },
      ],
    );

    expect(moment.isMoment(values.timeA)).toBe(true);
    expect(moment.isMoment(values.timeB)).toBe(true);
    expect(moment.isMoment(values.timeC)).toBe(true);
    expect(values.timeA?.valueOf()).toBe(1703149668419);
    expect(values.timeB?.valueOf()).toBe(1703149668419);
    expect(values.timeC?.valueOf()).toBe(1703149668419);
  });

  test('初始值 timeRange', () => {
    const values = parseFormValues(
      {
        timeA: [new Date(1703149668419), new Date(1703151877657)],
        timeB: [1703149668419, 1703151877657],
        timeC: [moment(1703149668419), moment(1703151877657)],
      },
      [
        {
          dataIndex: 'timeA',
          valueType: 'timeRange',
        },
        {
          dataIndex: 'timeB',
          valueType: 'timeRange',
        },
        {
          dataIndex: 'timeC',
          valueType: 'timeRange',
        },
      ],
    );

    expect(values.timeA.every(moment.isMoment)).toBe(true);
    expect(values.timeB.every(moment.isMoment)).toBe(true);
    expect(values.timeC.every(moment.isMoment)).toBe(true);
    expect(values.timeA.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
    expect(values.timeB.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
    expect(values.timeC.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
  });

  test('初始值 dateRange', () => {
    const values = parseFormValues(
      {
        timeA: [new Date(1703149668419), new Date(1703151877657)],
        timeB: [1703149668419, 1703151877657],
        timeC: [moment(1703149668419), moment(1703151877657)],
      },
      [
        {
          dataIndex: 'timeA',
          valueType: 'dateRange',
        },
        {
          dataIndex: 'timeB',
          valueType: 'dateRange',
        },
        {
          dataIndex: 'timeC',
          valueType: 'dateRange',
        },
      ],
    );

    expect(values.timeA.every(moment.isMoment)).toBe(true);
    expect(values.timeB.every(moment.isMoment)).toBe(true);
    expect(values.timeC.every(moment.isMoment)).toBe(true);
    expect(values.timeA.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
    expect(values.timeB.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
    expect(values.timeC.map((time: any) => time.valueOf())).toEqual([1703149668419, 1703151877657]);
  });

  test('初始值 Date 类型自动转换成 Moment', () => {
    const values = parseFormValues(
      {
        time: { A: new Date(1703149668419) },
      },
      [
        {
          dataIndex: ['time', 'A'],
          valueType: 'time',
        },
      ],
    );

    expect(values.time.A instanceof moment).toBe(true);
    expect(values.time.A?.valueOf()).toBe(1703149668419);
  });
});

describe('mergeNamePath 函数测试', () => {
  test('合并多层嵌套数组', () => {
    expect(mergeNamePath(['a'], 1, ['c', 'd'])).toEqual(['a', 1, 'c', 'd']);
    expect(mergeNamePath([['x']], [2, [3]], 4)).toEqual(['x', 2, 3, 4]);
    expect(mergeNamePath([[[true]]], 'test')).toEqual([true, 'test']); // 布尔值测试
    expect(mergeNamePath([], ['a'], [[]])).toEqual(['a']);
  });

  test('拆分带点的字符串路径', () => {
    expect(mergeNamePath('a.b', ['c', 'd'])).toEqual(['a', 'b', 'c', 'd']);
    expect(mergeNamePath('x.y.z', 'm.n')).toEqual(['x', 'y', 'z', 'm', 'n']);
    expect(mergeNamePath('user.name.first', [])).toEqual(['user', 'name', 'first']);
    expect(mergeNamePath('a..b', 'c...d')).toEqual(['a', 'b', 'c', 'd']); // 连续点处理
  });

  test('处理数字类型参数', () => {
    expect(mergeNamePath(123, [456])).toEqual([123, 456]);
    expect(mergeNamePath(-5, 0, 3.14)).toEqual([-5, 0, 3.14]);
    expect(mergeNamePath(Number.MAX_SAFE_INTEGER)).toEqual([9007199254740991]);
    expect(mergeNamePath([NaN], Infinity)).toEqual([NaN, Infinity]); // 特殊数字
  });

  test('混合不同类型参数', () => {
    expect(mergeNamePath('a', [1], 'b.c')).toEqual(['a', 1, 'b', 'c']);
    expect(mergeNamePath(0, '0', [false])).toEqual([0, '0', false]); // 0与字符串0
    const symbol = Symbol();
    expect(mergeNamePath(symbol, 'sym')).toEqual([symbol, 'sym']); // Symbol类型
    const fn = () => 'b';
    expect(mergeNamePath('a', { toString: fn })).toEqual(['a', { toString: fn }]); // 对象转换
  });

  test('过滤空值参数', () => {
    expect(mergeNamePath('a', null, undefined, ['b'])).toEqual(['a', 'b']);
    expect(mergeNamePath('', 0, false)).toEqual([0, false]); // 保留假值
    expect(mergeNamePath('x', undefined, [null])).toEqual(['x']); // 数组内null
    expect(mergeNamePath(undefined, [undefined])).toBeUndefined();
  });

  test('处理空输入返回undefined', () => {
    expect(mergeNamePath(null, undefined)).toBeUndefined();
    expect(mergeNamePath([null], undefined)).toEqual(undefined);
    expect(mergeNamePath([undefined])).toEqual(undefined);
    expect(mergeNamePath([])).toBeUndefined();
  });

  test('拆分带逗号的字符串路径', () => {
    expect(mergeNamePath('a,b', ['c,d'])).toEqual(['a', 'b', 'c', 'd']);
    expect(mergeNamePath('x,y.z', 'm,n,o')).toEqual(['x', 'y', 'z', 'm', 'n', 'o']);
    expect(mergeNamePath('a,,b', 'c,,')).toEqual(['a', 'b', 'c']); // 空段过滤
    expect(mergeNamePath(' , user,  ')).toEqual(['user']); // 空格处理
  });

  test('处理带数组索引的字符串', () => {
    expect(mergeNamePath('data[0]', 'items[1]')).toEqual(['data', '0', 'items', '1']);
    expect(mergeNamePath('matrix[2][3]', 'row[4]')).toEqual(['matrix', '2', '3', 'row', '4']);
    expect(mergeNamePath('a[1.5]', 'b[-1]')).toEqual(['a', '1', '5', 'b', '-1']); // 非常规索引
    expect(mergeNamePath('arr[]', 'obj[ ]')).toEqual(['arr', 'obj']); // 空括号处理
  });

  test('展平多层嵌套数组结构', () => {
    expect(mergeNamePath([[['a']], 'b'], 'c')).toEqual(['a', 'b', 'c']);
    expect(mergeNamePath([[[[{}]]]], 'deep')).toEqual([{}, 'deep']);
    expect(mergeNamePath([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    expect(mergeNamePath([['a'], ['b'], ['c']])).toEqual(['a', 'b', 'c']);
  });

  test('处理数值和字符串混合', () => {
    expect(mergeNamePath(1, 'user.name', [2, 'age'])).toEqual([1, 'user', 'name', 2, 'age']);
    expect(mergeNamePath('item1', 2, '3rd')).toEqual(['item1', 2, '3rd']);
    expect(mergeNamePath('v1.0.1', 2)).toEqual(['v1', '0', '1', 2]);
    expect(mergeNamePath(0x1f, '0b1010')).toEqual([31, '0b1010']); // 进制测试
  });

  test('处理特殊字符路径', () => {
    expect(mergeNamePath('a-b', 'c_d')).toEqual(['a-b', 'c_d']);
    expect(mergeNamePath('$value', '@name')).toEqual(['$value', '@name']);
    expect(mergeNamePath('a#b', 'c%20d')).toEqual(['a#b', 'c%20d']);
    expect(mergeNamePath('中文路径', '日本語')).toEqual(['中文路径', '日本語']); // 多语言
  });
});
