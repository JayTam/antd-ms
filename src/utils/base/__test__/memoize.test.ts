import { getObjReference, memoizeFn } from '../memoize';

describe('getObjReference 函数单元测试', () => {
  test('应为同一对象返回稳定标识符', () => {
    const obj = { key: 'test' };
    const id1 = getObjReference(obj);
    const id2 = getObjReference(obj);
    expect(id1).toBe(id2);
  });

  test('应为不同对象生成唯一标识符', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    expect(getObjReference(obj1)).not.toBe(getObjReference(obj2));
  });

  test('应支持多种对象类型（普通对象/数组/函数）', () => {
    const testCases = [{}, [], () => {}, new Date(), /regex/, new Map()];

    const ids = testCases.map((t) => getObjReference(t));
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(testCases.length);
  });

  test('标识符格式应为 reference_递增数字', () => {
    const obj1 = {};
    const obj2 = {};

    const id1 = getObjReference(obj1);
    const id2 = getObjReference(obj2);

    // 验证格式
    expect(id1).toMatch(/^reference_\d+$/);
    expect(id2).toMatch(/^reference_\d+$/);

    // 验证递增特性
    const num1 = parseInt(id1.split('_')[1]);
    const num2 = parseInt(id2.split('_')[1]);
    expect(num2).toBeGreaterThan(num1);
  });

  test('应拒绝非对象参数（TypeScript 类型校验）', () => {
    // @ts-expect-error 测试类型校验
    expect(() => getObjReference(null)).toThrow();
    // @ts-expect-error
    expect(() => getObjReference(123)).toThrow();
  });
});

describe('memoizeFn 缓存函数测试套件', () => {
  // 初始化测试用对象
  const objA = { id: 1 };
  const objB = { id: 1 }; // 内容相同但引用不同的对象
  const mockFn = jest.fn((...args) => args.map((arg) => arg?.toString()));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------- 核心功能测试 ---------
  test('应缓存相同参数的执行结果', () => {
    const memoized = memoizeFn(mockFn);

    // 首次调用
    const result1 = memoized(1, 'text', objA);
    expect(mockFn).toHaveBeenCalledTimes(1);

    // 相同参数再次调用
    const result2 = memoized(1, 'text', objA);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(result1).toBe(result2); // 验证结果引用相同
  });

  // --------- 参数处理规则测试 ---------
  test('应过滤 undefined 参数并统一缓存键', () => {
    const memoized = memoizeFn(mockFn);

    memoized(undefined);
    memoized();

    expect(mockFn).toHaveBeenCalledTimes(1); // [undefined] 和 [] 视为相同参数
  });

  // --------- 对象引用缓存测试 ---------
  test('应根据对象引用生成缓存键', () => {
    const memoized = memoizeFn(mockFn);

    memoized(objA);
    memoized(objB); // 不同引用对象

    expect(mockFn).toHaveBeenCalledTimes(2); // 因引用不同触发两次计算
  });

  // --------- 混合类型参数测试 ---------
  test('应正确处理混合类型参数组合', () => {
    const memoized = memoizeFn(mockFn);

    // 首次组合参数
    memoized('test', 42, objA);
    // 相同组合再次调用
    memoized('test', 42, objA);
    // 不同顺序参数
    memoized(42, 'test', objA);

    expect(mockFn).toHaveBeenCalledTimes(2); // 验证参数顺序影响缓存键
  });
});

describe('memoizeFn', () => {
  let originalFn: jest.Mock;
  let memoizedFn: any;

  beforeEach(() => {
    originalFn = jest.fn((...args) => args.reduce((sum, num) => sum + num, 0));
    memoizedFn = memoizeFn(originalFn, { max: 2 });
  });

  //---- 基础功能测试 ----
  test('应正确缓存结果', () => {
    expect(memoizedFn(1, 2)).toBe(3); // 首次调用
    expect(memoizedFn(1, 2)).toBe(3); // 命中缓存
    expect(originalFn).toHaveBeenCalledTimes(1); // [5,6](@ref)
  });

  test('不同参数应独立缓存', () => {
    memoizedFn(1, 2);
    memoizedFn(3, 4);
    expect(originalFn).toHaveBeenCalledTimes(2); // [5,7](@ref)
  });

  //---- 参数处理测试 ----
  test('应处理对象引用参数', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 }; // 不同引用

    memoizedFn(obj1);
    memoizedFn(obj2);
    expect(originalFn).toHaveBeenCalledTimes(2); // [2,6](@ref)
  });

  test('应过滤undefined参数', () => {
    memoizedFn(1, undefined); // 转换为 [1]
    memoizedFn(1); // 应命中缓存
    expect(originalFn).toHaveBeenCalledTimes(1); // [5,6](@ref)
  });

  //---- 容量控制测试 ----
  test('超出max应清理最旧缓存', () => {
    memoizedFn(1); // 缓存1
    memoizedFn(2); // 缓存2
    memoizedFn(3); // 触发清理，1被移除
    memoizedFn(1); // 重新计算
    expect(originalFn).toHaveBeenCalledTimes(4); // [7](@ref)
  });

  test('应遵循LRU策略', () => {
    memoizedFn('A'); // 缓存A
    memoizedFn('B'); // 缓存B
    memoizedFn('A'); // 更新访问顺序
    memoizedFn('C'); // 清理B，保留A和C
    expect(originalFn).toHaveBeenCalledTimes(3); // [7](@ref)
  });

  //---- 边界场景测试 ----
  test('max=0时应禁用缓存', () => {
    const noCacheFn = memoizeFn(originalFn, { max: 0 });
    noCacheFn(1);
    noCacheFn(1);
    expect(originalFn).toHaveBeenCalledTimes(2); // [7](@ref)
  });

  test('空参数应视为同一调用', () => {
    memoizedFn();
    memoizedFn(undefined);
    expect(originalFn).toHaveBeenCalledTimes(1); // [5](@ref)
  });
});
