import { getObjAfterIFilter, isAntdTabsType } from '../utils';

describe('MsTabs utils tests', () => {
  test('测试isAntdTabsType方法', () => {
    expect(isAntdTabsType('radio')).toBeFalsy();
    expect(isAntdTabsType('text')).toBeFalsy();
    expect(isAntdTabsType('text-block')).toBeFalsy();
    expect(isAntdTabsType()).toBeTruthy();
    expect(isAntdTabsType('card')).toBeTruthy();
    expect(isAntdTabsType('editable-card')).toBeTruthy();
    expect(isAntdTabsType('line')).toBeTruthy();
  });
});

describe('getObjAfterIFilter 测试', () => {
  // 正常情况：仅包含列表
  it('应仅保留指定的键值对', () => {
    const oldObj = { a: 'apple', b: 'banana', c: 'cherry' };
    const includeList = ['a', 'c'];
    const newObj = getObjAfterIFilter(oldObj, includeList);
    expect(newObj).toEqual({ a: 'apple', b: undefined, c: 'cherry' });
  });

  // 正常情况：仅排除列表
  it('应排除指定的键值对', () => {
    const oldObj = { a: 'apple', b: 'banana', c: 'cherry' };
    const excludeList = ['b', 'c'];
    const newObj = getObjAfterIFilter(oldObj, undefined, excludeList);
    expect(newObj).toEqual({ a: 'apple', b: undefined, c: undefined });
  });

  // 正常情况：同时包含与排除列表
  it('应先包含后排除指定的键值对', () => {
    const oldObj = { a: 'apple', b: 'banana', c: 'cherry', d: 'date' };
    const includeList = ['a', 'b', 'd'];
    const excludeList = ['b'];
    const newObj = getObjAfterIFilter(oldObj, includeList, excludeList);
    expect(newObj).toEqual({ a: 'apple', b: undefined, c: undefined, d: 'date' });
  });

  // 边界情况：无包含也无排除列表
  it('当无包含与排除列表时应返回原始值', () => {
    const oldObj = { a: 'apple' };
    const newObj = getObjAfterIFilter(oldObj);
    expect(newObj).toEqual({ a: 'apple' });
  });

  // 边界情况：空对象作为输入
  it('空对象输入应始终返回空对象', () => {
    const oldObj = {};
    const newObj = getObjAfterIFilter(oldObj, ['a'], ['b']);
    expect(newObj).toEqual({});
  });

  // 异常情况：非字符串键
  it('应忽略非字符串键并保持兼容性', () => {
    const oldObj = { 1: 'one', a: 'apple' };
    const newObj = getObjAfterIFilter(oldObj, ['a']);
    expect(newObj).toEqual({ a: 'apple' }); // 注意：此测试取决于实现细节，当前函数未明确处理非字符串键
  });

  // 异常情况：includeList 和 excludeList 同时包含一个键
  it('当一个键同时存在于包含和排除列表时应被排除', () => {
    const oldObj = { a: 'apple', b: 'banana' };
    const includeList = ['a', 'b'];
    const excludeList = ['b'];
    const newObj = getObjAfterIFilter(oldObj, includeList, excludeList);
    expect(newObj).toEqual({ a: 'apple', b: undefined });
  });
});
