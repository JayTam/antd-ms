import { isObject, isUndefined } from 'lodash-es';

/** 记录引用跟ID的映射关系 */
const referenceMap = new WeakMap();
/** 引用ID */
let referenceId = 0;

/**
 * 生成对象引用标识符（模拟内存地址）
 *
 * 使用WeakMap保持弱引用特性，避免内存泄漏
 * 相同引用返回相同ID，不同引用生成递增ID（如reference_1, reference_2...）
 *
 * @param obj - 需要标识的对象
 * @returns 唯一引用标识字符串
 */
export function getObjReference(obj: object) {
  if (!referenceMap.has(obj)) {
    referenceMap.set(obj, `reference_${++referenceId}`);
  }
  return referenceMap.get(obj);
}

/**
 * 缓存函数（基于引用对比的优化实现）
 *
 * 该函数通过引用对比方式缓存函数执行结果，适用于处理大体积参数场景，避免序列化性能损耗。
 *
 * 特性说明：
 * 1. 优势：
 *    - 不进行参数序列化，避免处理大规模数据（如大对象、长数组）时的性能损耗
 *    - 基于对象引用进行缓存，对频繁传入相同引用对象的场景性能更优
 *
 * 2. ​局限性：
 *    - 依赖严格的对象引用对比，相同值不同引用的对象无法命中缓存
 *
 * @param fn 需要被缓存的原始函数
 * @param options 缓存函数配置
 * @returns 具有缓存能力的函数，保留原始函数的类型签名
 *
 * 实现原理：
 * - 使用WeakMap记录对象引用ID（模拟内存地址），普通值直接 toString 使用
 * - 通过Map存储参数组合与计算结果的映射关系
 * - 参数处理逻辑：
 *   1. 过滤undefined参数（`[undefined]`和`[]`视为相同）
 *   2. 对象类型使用WeakMap生成的唯一引用ID
 *   3. 基本类型直接取值
 *   4. 组合参数生成唯一缓存键
 */
export function memoizeFn<T extends (...args: any) => any>(fn: T, options?: { max?: number }): T {
  /** 缓存容器：存储参数特征与计算结果的映射关系 */
  const cache = new Map();
  const max = options?.max;

  function memoize(...args: any[]) {
    // max = 0 则不缓存
    if (max === 0) return fn(...args);

    const memoizeId = args
      // [undefined] 和 [] 本质是一样，不过滤会影响键生成
      .filter((arg) => !isUndefined(arg))
      .map((arg) => (isObject(arg) ? getObjReference(arg) : arg))
      .join(',');

    if (!cache.has(memoizeId)) {
      cache.set(memoizeId, fn(...args));
      if (max && cache.size > max) {
        cache.delete(cache.keys().next().value);
      }
    }

    return cache.get(memoizeId);
  }

  return memoize as T;
}
