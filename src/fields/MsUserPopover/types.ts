import type { ValueEnumFieldNames } from '@jaytam/antd-ms/utils';
import type { PopoverProps, TooltipProps } from 'antd';
import type React from 'react';
import type { CSSProperties, ReactNode, Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';
import type { MsFieldRequest } from '../../hooks/useFieldRequest/types';
import type { DefaultOptionType } from 'antd/lib/select';

export type DataType = Record<string, any>;

export type EnumFiledNamesType = ValueEnumFieldNames & {
  fullName?: string;
  fullCode?: string;
  position?: string;
};

export type UserPopoverProps = {
  type?: 'form' | 'table';
  value?: DataType[];
  defaultValue?: DataType[];
  style?: CSSProperties;
  onChange?: (selectRows?: any) => void;
  searchRequest?: MsFieldRequest<any>;
  searchPostRes?: (data: DataType) => DataType[];
  /* value或者defaultValue是否转义 */
  valueEnumFiledNames?: EnumFiledNamesType;
  // 防抖时间
  searchDebounceTime?: number;
  searchEnum?: DataType[];
  searchEnumFiledNames?: EnumFiledNamesType;
  /* 搜索时，对应搜索的字段 */
  searchCode?: string[];
  // 限制可以选择的个数
  optionalLimit?: number;
  // 不可删除人员的配置
  unDeleteValues?: string[];
  // 已选择的人员是否显示在一行里面
  showInOneLine?: boolean;
  //是否显示toolTip
  showToolTip?: boolean;
  //自定义tooltip
  tooltipTitleRender?: ReactNode | ((data?: DataType) => ReactNode);
  addToolTip?: boolean | ((data?: DataType) => ReactNode);
  // 是否显示常用联系人
  showFrequentContacts?: boolean;
  //储存常用联系人的key
  frequentContactsKey?: string;
  /* 常用联系人最多保存多少条 */
  maxFrequentContacts?: number;
  /* 常用联系人的有效期 */
  frequentContactsExpired?: number | 'infinite';
  placement?: TooltipProps['placement'];
  // 详情的方向
  detailPlacement?: TooltipProps['placement'];
  // 折叠人员的详情方向
  foldDetailPlacement?: TooltipProps['placement'];
  // 折叠人员列表的最大高度， 默认320px
  foldHeight?: string | number;
  // 配置名称大小，16 14 12像素
  fontSize?: number;
  //只读时，鼠标悬浮在名字上远程请求
  hoverRequest?: MsFieldRequest<any>;
  hoverPostRes?: (data: DataType) => DataType;
  hoverEnumFiledNames?: EnumFiledNamesType;
  // 添加Popover组件属性
  addPopoverProps?: PopoverProps;
  // 默认为true
  showDelete?: boolean | ((user: DataType, index: number, allUsers: DataType[]) => boolean);
  // 默认为false
  showEdit?: boolean | ((user: DataType, index: number, allUsers: DataType[]) => boolean);
};

export type MsUserPopoverProps = MsFieldBasePropsWithRequest<UserPopoverProps> & {
  dataIndex?: string;
};

export type MsUserPopoverRef = Ref<HTMLDivElement>;

export type UserPopoverContextType = {
  selectedList: DataType[];
  setSelectedList: React.Dispatch<React.SetStateAction<any>>;
  foldList: DataType[];
  setFoldList: React.Dispatch<React.SetStateAction<any>>;
  userPopoverRef: React.MutableRefObject<HTMLDivElement | null>;
  deleteUser: (user?: DataType) => void;
  frequentContacts: DataType[];
  defaultOptions: DefaultOptionType[];
};
