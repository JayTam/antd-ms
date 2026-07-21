import type { RefSelectProps } from 'antd';
import type { CSSProperties, Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';
import type { MsFiledRequestProps } from '../../hooks/useFieldRequest/types';

export interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

export type DataType = Record<string, any>;

export type ResourceFiled = {
  label?: string;
  value?: string;
  // 资源组标识
  resourceCode?: string;
};

export type ResourceFiledNames = {
  data?: string;
  current?: string;
  pageSize?: string;
  total?: string;
};

type ResourcePostRes = (response: any) => {
  data: DataType[];
  total?: number;
  current?: number;
  pageSize?: number;
};

export type LabelValue = { label?: string; value: string };

export type ResourceGroupProps = {
  value?: string | LabelValue;
  labelInValue?: true;
  defaultValue?: string | LabelValue;
  // 默认选中第一项
  defaultSelectFirst?: boolean;
  onChange?: (val?: string | LabelValue) => void;
  // 是否开通企业中心
  enterpriseCentre?: boolean;
  // 资源组相关参数
  resourceRequest?: MsFiledRequestProps['request'];
  resourceParams?: DataType;
  resourceValueEnumFiledNames?: ResourceFiled;
  resourceFiledNames?: ResourceFiledNames;
  resourcePostRes?: ResourcePostRes;
  // root部门的相关参数
  rootRequest?: MsFiledRequestProps['request'];
  rootParams?: DataType;
  rootValueEnumFiledNames?: ResourceFiled;
  rootPostRes?: ResourcePostRes;
  // 子部门的相关参数
  departmentRequest?: MsFiledRequestProps['request'];
  departmentParams?: DataType;
  departmentValueEnumFiledNames?: ResourceFiled;
  departmentPostRes?: ResourcePostRes;
  // 部门下的资源组的相关参数
  dResourceRequest?: MsFiledRequestProps['request'];
  dResourceParams?: DataType;
  dResourceValueEnumFiledNames?: ResourceFiled;
  dResourceFiledNames?: ResourceFiledNames;
  dResourcePostRes?: ResourcePostRes;
  // 搜索框下方内容
  extra?: boolean;
  /* label后面是否显示唯一标识 */
  codeInLabel?: boolean;
  actionRef?: React.Ref<{ reload: () => void }>;
  style?: CSSProperties;
};

export type DepartmentSelectType = {
  refreshRootDepartment?: () => void;
};

export type MsResourceGroupProps = MsFieldBasePropsWithRequest<ResourceGroupProps>;

export type MsResourceGroupRef = Ref<RefSelectProps>;
