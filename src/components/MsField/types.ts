import type { MsFormColumnType } from '@jaytam/antd-ms';
import type { FormInstance, FormItemProps } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import type { ComponentType, CSSProperties, ReactElement, ReactNode } from 'react';
import type { MsFiledRequestColumnType } from '../../hooks/useFieldRequest/types';

import type { CopyConfig, EditConfig, MsFormProps } from '../MsForm/types';
import type {
  BusinessComponentMap,
  ComponentsMap,
  InnerComponentMap,
  LazyComponentMap,
  ListComponentMap,
  SelectComponentMap,
} from './config';

type ModeType = MsFormProps['mode'];

/** 通用的 fieldProps 属性 */
type CommonFieldPropsType = {
  /** MsField 通用属性，在 field 之前渲染一个节点 */
  preRender?: ReactNode;
  /** MsField 通用属性，在 field 之后渲染一个节点 */
  suffixRender?: ReactNode;
  /** MsField 通用属性，field 与 preRender 之间的间隔，默认 8px  */
  preGap?: string | number;
  /** MsField 通用属性，field 与 suffixRender 之间的间隔，默认 8px  */
  suffixGap?: string | number;
  /** MsField 通用属性，在 field 之前渲染的节点样式  */
  preStyle?: CSSProperties;
  /** MsField 通用属性，在 field 之后渲染的节点样式  */
  suffixStyle?: CSSProperties;
};

/**
 * 字段组件的基础的属性
 */
export type MsFieldBaseProps<Props> = {
  /** 放置到组件上 props */
  fieldProps?: Props & CommonFieldPropsType;
  /** 组件的渲染模式类型 */
  mode?: ModeType;
  /** 自定义 read 模式 */
  fieldReadRender?: ((form: FormInstance) => ReactNode) | ReactNode;
  /** 自定义 edit 模式 */
  fieldRender?: ((form: FormInstance) => ReactNode) | ReactNode;
};

/** 字段组件的基础的属性（带请求相关属性） */
export type MsFieldBasePropsWithRequest<Props> = MsFieldBaseProps<Props> & MsFiledRequestColumnType;

/** 字段组件 */
export type MsFieldBasePropsWithGroup<Props> = Omit<
  MsFormColumnType,
  'fieldProps' | 'formItemProps'
> & {
  fieldProps?: Props;
  children?: ReactNode;
  formItemProps?: FormItemProps;
};

/** 从React组件抽取组件props  */
type ExtractProps<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;

/** MsField 合法的类型对象，剔除组件库内置类型和列表类型 */
type MsFieldComponentsMap = Omit<ComponentsMap, keyof InnerComponentMap | keyof ListComponentMap> &
  LazyComponentMap;

/** 获取 */
type GetFieldPropsId<T> = T extends { id?: unknown } ? T['id'] : never;
type GetFieldPropsValue<T> = T extends { value?: unknown } ? T['value'] : never;
type GetFieldPropsOnChange<T> = T extends { onChange?: unknown } ? T['onChange'] : never;
type GetFieldPropsOnBlur<T> = T extends { onBlur?: unknown } ? T['onBlur'] : never;

/** MsField 组件Props */
export type MsFieldProps<VT extends keyof MsFieldComponentsMap> = {
  /**
   * 字段标识，主要用于校验错误时滚动定位
   * FormItem 自动注入 id, value, onChange, onBlur，在 fieldProps 中也有这四个属性
   */
  id?: GetFieldPropsId<ExtractProps<MsFieldComponentsMap[VT]>['fieldProps']>;
  /**
   * 字段值
   * FormItem 自动注入 id, value, onChange, onBlur，在 fieldProps 中也有这四个属性
   */
  value?: GetFieldPropsValue<ExtractProps<MsFieldComponentsMap[VT]>['fieldProps']>;
  /**
   * 修改事件
   * FormItem 自动注入 id, value, onChange, onBlur，在 fieldProps 中也有这四个属性
   */
  onChange?: GetFieldPropsOnChange<ExtractProps<MsFieldComponentsMap[VT]>['fieldProps']>;
  /**
   * 失焦事件
   * FormItem 自动注入 id, value, onChange, onBlur，在 fieldProps 中也有这四个属性
   */
  onBlur?: GetFieldPropsOnBlur<ExtractProps<MsFieldComponentsMap[VT]>['fieldProps']>;
  /**
   * 模式，选择模式或者只读模式
   */
  mode?: ModeType;
  /**
   * 只读模式的编辑配置
   */
  editable?: boolean | EditConfig<any>;
  /**
   * 只读模式的复制配置
   */
  copyable?: boolean | CopyConfig;
  /**
   * 只读模式的省略配置，默认是开启的
   */
  ellipsis?: boolean | TextProps['ellipsis'];
  /**
   * 字段类型，每个类型都对应一个组件，例如：
   * valueType=text -> MsInput
   * valueType=select -> MsSelect
   * valueType=radio -> MsRadio
   */
  valueType?: VT;
  /**
   * 字段具体配置
   */
  fieldProps?: ExtractProps<MsFieldComponentsMap[VT]>['fieldProps'];
  /**
   * 字段的 ref
   */
  ref?: ExtractProps<MsFieldComponentsMap[VT]>['ref'];
  /**
   * @deprecated 组件库内部使用属性，不要在项目中使用
   * 关闭只读模式下，可能会用到 MsStatus 组件渲染，直接渲染纯文本
   */
  _disableStatus?: boolean;
} & (VT extends keyof (Omit<SelectComponentMap, 'upload' | 'switch'> &
  Pick<BusinessComponentMap, 'user'>)
  ? MsFiledRequestColumnType
  : {});

/** MsField 组件类型 */
export type MsFieldComponentType = <VT extends keyof MsFieldComponentsMap = 'text'>(
  props: MsFieldProps<VT>,
) => ReactElement;

export type MsFieldExtendComponentType<VT extends keyof MsFieldComponentsMap = 'text'> = (
  props: MsFieldProps<VT>,
) => ReactElement;
