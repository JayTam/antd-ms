import type { DrawerProps } from 'antd/es/drawer';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { ModalProps } from 'antd/es/modal';
import type { FC, RefObject } from 'react';
import type { FormListProps } from '../_MsForm/types';

export interface MsFormInterface<Values = Record<string, any>> extends FC<MsFormProps<Values>> {
  useOpen: () => boolean;
}

export interface MsFormProps<Values = Record<string, any>> {
  /**
   * 表单参数配置
   */
  options: Options<Values>;
  /**
   * 获取popFormR实例  有open 打开窗口  和 getForm 获取form的实例
   */
  popFormRef?: RefObject<PopFormRef<Values>>;
}

export interface PopFormRef<Values = Record<string, any>> {
  open: (values?: Values) => void;
  changeOpen: (visible?: boolean) => void;
  getForm: () => FormInstance | null;
}

export interface Options<Values = Record<string, any>> {
  /**
   * 弹框的类型
   * @default drawer
   */
  type?: 'drawer' | 'modal' | 'null';
  /**
   * 弹框的一些配置；继承Drawer、Modal。(注:传入自定义onCancel函数，return true时，弹框不会关闭)
   */
  popOptions?: ModalProps & DrawerProps;
  /**
   * 打开弹框；可以传入表单默认值。(注： 直接调用,不需要传入options)
   * @default function(e)
   */
  open?: (res?: any) => void;
  /**
   * antd Form的属性
   */
  form?: FormProps;
  /**
   * 通过formList进行配置表单
   * @default []
   */
  formList?: FormListProps<Values>[];
  /**
   * 获取form实例函数，返回form实例
   */
  getForm?: () => FormInstance | null;
  /**
   * 自定义上传函数，返回Promise函数。(注：data是表单所有key+id,record是传入的所有值，open方法传入)
   */
  formSubmit?: (data: any, record: any) => Promise<any>;
  /**
   * formSubmit函数成功或失败的回调。(注：上传失败 data=null)
   */
  formCallback?: (data: any, res: any) => void;
}
