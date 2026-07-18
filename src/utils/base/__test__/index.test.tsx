import dayjs from 'dayjs';
import moment from 'moment';

import {
  cloneDeepWithReactNode,
  emptyTextRender,
  getUuid,
  isTimeInstance,
  isTimestamp,
  isValueEmpty,
} from '..';

describe('基础工具函数', () => {
  test('isTimestamp 时间戳判断', () => {
    expect(isTimestamp('0')).toBeFalsy();
    expect(isTimestamp(0)).toBeFalsy();
    expect(isTimestamp('sad232')).toBeFalsy();
    expect(isTimestamp('Fri Aug 04 2023 18:54:13 GMT+0800 (中国标准时间)')).toBeFalsy();
    expect(isTimestamp('1691146467952')).toBeTruthy();
    expect(isTimestamp('111.111.111.1')).toBeFalsy();
    expect(isTimestamp('1.1.1.1')).toBeFalsy();
    expect(isTimestamp('1111111111111')).toBeTruthy();
    expect(isTimestamp(1691146467952)).toBeTruthy();
    expect(isTimestamp('xxx1691146467952')).toBeFalsy();
    expect(isTimestamp('0001691146467952')).toBeFalsy();
    expect(isTimestamp(169114646795200)).toBeFalsy();
    expect(isTimestamp('16911464679520')).toBeFalsy();
    expect(isTimestamp(16911464679520)).toBeFalsy();
    expect(isTimestamp(16911464679520)).toBeFalsy();
    expect(isTimestamp('16911464679520')).toBeFalsy();
  });

  test('isValueEmpty 判断是否为空元素', () => {
    expect(isValueEmpty('0')).toBeFalsy();
    expect(isValueEmpty(0)).toBeFalsy();
    expect(isValueEmpty('1')).toBeFalsy();
    expect(isValueEmpty(1)).toBeFalsy();
    expect(isValueEmpty(moment())).toBeFalsy();
    expect(isValueEmpty(new Date())).toBeFalsy();
    expect(isValueEmpty(BigInt(0))).toBeFalsy();
    expect(isValueEmpty({ a: 'a' })).toBeFalsy();
    expect(isValueEmpty(['a'])).toBeFalsy();
    expect(isValueEmpty([undefined])).toBeFalsy();
    expect(isValueEmpty([null])).toBeFalsy();
    expect(isValueEmpty({})).toBeTruthy();
    expect(isValueEmpty([])).toBeTruthy();
    expect(isValueEmpty(null)).toBeTruthy();
    expect(isValueEmpty(undefined)).toBeTruthy();
  });

  test('cloneDeepWithReactNode 深克隆 ReactNode', () => {
    expect(
      cloneDeepWithReactNode({
        a: { b: <div>c</div> },
      }),
    ).toStrictEqual({
      a: { b: <div>c</div> },
    });
    const data = {
      a: { b: <div>c</div> },
    };
    expect(cloneDeepWithReactNode(data)).not.toBe(data);
    expect(cloneDeepWithReactNode(data).a.b).not.toBe(data.a.b);
    expect(cloneDeepWithReactNode(data).a.b).toStrictEqual(data.a.b);
  });
  test('should return a valid UUID string', () => {
    const uuid = getUuid();
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(regex.test(uuid)).toBe(true);
  });

  test('should return a different UUID on each call', () => {
    const uuid1 = getUuid();
    const uuid2 = getUuid();
    expect(uuid1).not.toBe(uuid2);
  });

  test('isTimeInstance', () => {
    expect(isTimeInstance(moment())).toBeTruthy();
    expect(isTimeInstance(new Date())).toBeTruthy();
    expect(isTimeInstance(dayjs())).toBeTruthy();
  });

  test('emptyTextRender', () => {
    expect(emptyTextRender('-')).toBe('-');
    expect(emptyTextRender(undefined, '默认')).toBe('默认');
    expect(emptyTextRender(null, '默认')).toBe('默认');
    expect(emptyTextRender('', '默认')).toBe('默认');
    expect(emptyTextRender(null, null as any)).toBe(null);
  });
});

describe('isTimeInstance', () => {
  it('should return true for a Date object', () => {
    const date = new Date();
    expect(isTimeInstance(date)).toBe(true);
  });

  it('should return true for a moment object', () => {
    const m = moment();
    expect(isTimeInstance(m)).toBe(true);
  });

  it('should return true for a dayjs object', () => {
    const d = dayjs();
    expect(isTimeInstance(d)).toBe(true);
  });

  it('should return false for non-time instance types', () => {
    expect(isTimeInstance('not a time')).toBe(false);
    expect(isTimeInstance(123)).toBe(false);
    expect(isTimeInstance({})).toBe(false);
    expect(isTimeInstance([])).toBe(false);
    expect(isTimeInstance(null)).toBe(false);
    expect(isTimeInstance(undefined)).toBe(false);
  });
});
