import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { SelectProps as AntSelectProps, RefSelectProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type SelectProps = AntSelectProps & {
  /** 显示刷新按钮 */
  refreshButton?: boolean;
  /** 可选项全选功能 */
  checkbox?: boolean;
  /** 初始化请求状态 */
  initialLoading?: boolean;
  /** 远程搜索字段名，设置之后开启远程搜索，且关闭 filterOption 前端筛选  */
  requestSearchKey?: string;
  readOnly?: boolean;
} & MsFiledRequestFieldPropsType;

export type MsSelectProps = MsFieldBasePropsWithRequest<SelectProps>;

export type MsSelectRef = Ref<RefSelectProps>;
