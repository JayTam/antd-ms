import type React from 'react';
import type { CSSProperties, Ref } from 'react';
import type { MsFieldBaseProps, MsFieldProps } from '../../components/MsField/types';
import type { MsFiledRequestProps } from '../../hooks/useFieldRequest/types';
import type { FILED_NAMES } from './config';
import type { MsModalProps } from '@jaytam/antd-ms/components';
import type { PopconfirmProps, SelectProps } from 'antd';

export type DataType = Record<string, any>;
export type SearchType = 'group' | 'user' | 'userInGroup' | 'userInWikiGroup' | string;

export type EnumFiledNamesType = Partial<typeof FILED_NAMES>;

type BaseProps = {
  /** 远程请求相关参数 */
  request?: MsFiledRequestProps['request'];
  params?: DataType;
  postRes?: MsFiledRequestProps['postRes'];
  valueEnum?: DataType[];
  debounceTime?: MsFiledRequestProps['debounceTime'];
  valueEnumFiledNames?: EnumFiledNamesType;
  // 是否显示title
  showTitle?: boolean;
  // 自定义card title
  title?: React.ReactNode;
  // 从哪些字段去搜索过滤
  searchCode?: string[];
  // 是否根据查询条件过滤搜索结果,
  filterSearchResult?: boolean;
};

export type UserPropsType = BaseProps & {
  searchRequest?: (params?: string) => Promise<any>;
  searchEnum?: DataType[];
  searchPostRes?: MsFiledRequestProps['postRes'];
  valueEnumFiledNames?: EnumFiledNamesType;
  // 是否显示全选按钮
  showCheckAll?: boolean;
};

export type GroupPropsType = BaseProps & {
  userRequest?: MsFiledRequestProps['request'];
  userEnum?: DataType[];
  userPostRes?: MsFiledRequestProps['postRes'];
  userFiledNames?: EnumFiledNamesType;
  // 定位到某一个位置
  defaultPositionCode?: string;
  // 是否显示面包屑
  showBreadCrumb?: boolean;
  // 组织的初始名称
  organizationName?: React.ReactNode;
};

export type WikiGroupPropsType = BaseProps & {
  // 唯科群下拉选择
  searchSelectProps?: MsFieldProps<'select'>;
  searchRequest?: (params?: string) => Promise<any>;
  // 是否显示全选按钮
  showCheckAll?: boolean;
};

export type UserInGroupType = GroupPropsType;

export type SearchTypeEnumType = {
  label?: React.ReactNode;
  value?: string | number;
  disabled?: boolean;
  type?: SearchType;
  props?: UserPropsType | GroupPropsType | WikiGroupPropsType;
  placeholder?: string;
};

export type LabelValue = { label?: string; value: string | number; [key: string]: any };

export type DisableStatusType = {
  /**
   * @deprecated 组件库内部使用属性，不要在项目中使用
   * 关闭只读模式下，可能会用到 MsStatus 组件渲染，直接渲染纯文本
   */
  _disableStatus?: boolean;
};

type PartialProp<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type UserGroupProps = {
  value?: LabelValue[];
  defaultValue?: LabelValue[];
  valueEnumFiledNames?: EnumFiledNamesType;
  /* 防抖时间 */
  debounceTime?: number;
  /* 节流时间 - 已取消此参数，为兼容保留此类型 */
  throttleTime?: number;
  onChange?: (value?: DataType[]) => void;
  searchType?: SearchType[];
  userProps?: UserPropsType;
  groupProps?: GroupPropsType;
  userInGroupProps?: UserInGroupType;
  userInWikiGroupProps?: WikiGroupPropsType;
  searchChange?: (search: Record<string, any>) => void;
  style?: CSSProperties;
  // 不可删除人员的配置
  unDeleteValues?: string[];
  // 搜索下拉框的枚举
  searchTypeEnum?: SearchTypeEnumType[];
  // 最大选择个数
  maxCount?: number;
  /* 用户组类型 */
  type?: 'Modal';
  disabled?: boolean;
  /** 是否根据查询条件过滤搜索结果, @default true */
  filterSearchResult?: boolean;
  /* 是否显示一键清除所选人员按钮 */
  showClearAllSelected?: boolean;
  /* 控制一键清除所选人员按钮popconfirm的表现, 设为false则不显示Popconfirm */
  clearAllPopconfirmProps?: false | PartialProp<PopconfirmProps, 'title'>;
  id?: string;
  /* 弹窗的参数 */
  modalProps?: MsModalProps;
  placeholder?: string;
  selectProps?: SelectProps;
};

export type MsUserGroupProps = MsFieldBaseProps<UserGroupProps> & DisableStatusType;

export type MsUserGroupRef = Ref<HTMLDivElement>;

export type UserGroupContextType = {
  breadCrumbList?: DataType;
  setBreadCrumbList?: React.Dispatch<React.SetStateAction<DataType>>;
  setSearchValues?: React.Dispatch<React.SetStateAction<DataType>>;
  searchValues?: SearchTypeEnumType & { searchValue?: string };
  checkedList?: DataType[];
  setCheckedList?: React.Dispatch<React.SetStateAction<any>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  isMaxCount?: boolean;
  userGroupRef?: React.RefObject<HTMLDivElement>;
};
