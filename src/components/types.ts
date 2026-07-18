/**
 * 组件级别的请求参数
 */
export type ComponentRequestProps<P, R, D> = {
  /** 远程请求 dataSource */
  request?: ((params?: P) => Promise<R>) | ((params: P) => Promise<R>);
  /** 跳过远程请求 */
  skipRequest?: (params?: P) => boolean;
  /** request 的请求参数 */
  params?: Partial<P>;
  /** 处理 request 的返回值，将转换成 dataSource */
  postRes?: (res: R) => D;
  /** 防抖时间 */
  debounceTime?: number;
  /** 聚焦重新请求 */
  refreshOnWindowFocus?: boolean;
  /** 重新请求间隔，单位为毫秒 */
  refreshOnWindowFocusIntervalTime?: number;
  /** 手动请求，开启之后使用 actionRef 的方法手动控制请求 */
  manualRequest?: boolean;
};

/**
 * 帮助 postRes 处理默认值的类型，postRes 的默认值是 (res) => res?.data
 */
export type DefaultPostRes<R> = R extends { data?: infer U } ? U : R;

export type ElementType<T> = T extends (infer E)[] ? E : never;

/**
 * 帮助 list postRes 处理默认值的类型，postRes 的默认值是 (res) => res?.data
 */
export type DefaultListPostRes<R> = R extends { data?: { list: infer U } } ? ElementType<U> : R;
