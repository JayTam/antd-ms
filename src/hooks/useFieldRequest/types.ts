import type { FieldValueEnumType, ValueEnumFieldNames } from '@jaytam/antd-ms/utils';
import type { FormInstance } from 'rc-field-form';

/** 单个数组元素的 option */
export type RequestArrayType = {
  label?: React.ReactNode;
  value?: React.ReactText;
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestArrayType, 'children' | 'optionType'>[];
  [key: string]: any;
};

/** request 的类型 */
export type MsFieldRequest<P = any> = (params?: P) => Promise<any>;

/** 远程请求组件属性 */
export type MsFiledRequestProps<P = any> = Omit<MsFiledRequestColumnType<P>, 'params'> & {
  params?: P extends any ? Record<string, any> : P;
} & Record<string, any>;

/** 远程请求column公共属性 */
export type MsFiledRequestColumnType<P = any> = {
  /** 是否初始化请求 */
  initialRequest?: boolean;
  /** 聚焦请求 */
  focusRequest?: boolean;
  /** 缓存请求 */
  cacheRequest?: boolean;
  /** 远程请求 valueEnum */
  request?: MsFieldRequest<P>;
  /** 是否跳过请求，初始化和params值变更都会发起请求 */
  skipRequest?: (params: P extends any ? Record<string, any> : P) => boolean | undefined;
  /** 请求参数 */
  params?:
    | (P extends any ? Record<string, any> : P)
    | ((form: FormInstance) => P extends any ? Record<string, any> : P);
  /** 处理响应体 */
  postRes?: (res: any) => RequestArrayType[] | Record<string, any>;
  /** 请求防抖时间 */
  debounceTime?: number;
  /** 枚举映射 */
  valueEnumFiledNames?: ValueEnumFieldNames;
  /** 支持 object 和 Map，Map 是支持其他基础类型作为 key */
  valueEnum?: FieldValueEnumType;
};

/** 使用 useFieldRequest 之后，fieldProps 新增的通用类型 */
export type MsFiledRequestFieldPropsType = {
  /** 默认选中第一项，优先级比 autoSelect=first 高 */
  defaultSelectFirst?: boolean;
  /**
   * 自动选择模式，当 options 变化时触发：
   * false：关闭自动选择
   * null: 置空
   * first: options 第一项存在就选中它，不存在则置空
   * value: 当前选中项的 value 在 options 中存在就不重新选择，不存在则置空
   */
  autoSelect?: 'null' | 'first' | 'value' | 'false' | false;
  /** 是否把每个选项的 label 包装到 value 中，会把 value 类型从 string 变为 { value: string, label: ReactNode } 的格式	 */
  labelInValue?: boolean;
};
