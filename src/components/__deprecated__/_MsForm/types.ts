import type { FormItemProps, FormProps } from 'antd/es/form';
import type { ReactNode } from 'react';

export interface MsFormProps<Values = Record<string, any>> {
  /**
   * 表单参数配置
   */
  options?: Options<Values>;
  /**
   * form的实例
   */
  formRef?: React.Ref<Values>;
  /**
   * 默认传入表单的参数
   */
  record?: Values;
}

export interface Options<Values = Record<string, any>> {
  /**
   * antd Form的属性
   */
  form?: FormProps;
  /**
   * 通过data进行配置表单
   * @default []
   */
  formList?: FormListProps<Values>[];
}

export type Depend<Values = Record<string, any>> =
  | {
      name: keyof Values;
      value: any;
    }
  | ((values: Values) => boolean);

export interface FormListProps<Values = Record<string, any>> {
  /**
   * 组件类型。(注：custom是自定义组件，需要传入render函数返回自定义组件)
   */
  type:
    | 'autoComplete'
    | 'input'
    | 'custom'
    | 'select'
    | 'textarea'
    | 'radio'
    | 'checkbox'
    | 'datepicker'
    | 'rangepicker'
    | 'switch'
    | 'cascader';
  /**
   * 占据的宽度 同Col组件span
   * @default 24
   */
  span?: number;
  /**
   * Form.Item的属性；继承Form.item所有属性
   */
  item?: FormItemProps;
  /**
   * 继承当前使用组件的所有属性
   */
  extra?: Record<string, any>;
  /**
   * 自定义组件函数；返回一个 ReactNode
   */
  render?: ReactNode | ((props: FormListProps<Values>) => ReactNode);
  /**
   * 依赖某个字段，值为一定值才会显示此组件 格式为 {name:'',value:''}
   */
  depend?: Depend<Values>;
}
