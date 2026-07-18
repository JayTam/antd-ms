import type { ValueEnumFieldNames } from '@jaytam/antd-ms/utils';
import type { RefSelectProps, SelectProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBaseProps, MsFieldBasePropsWithRequest } from '../../components/MsField/types';
import type { MsFieldRequest } from '../../hooks/useFieldRequest/types';

export type UserRowKey = 'id' | 'email';

export type UserSelectType = 'user' | 'group';

export type UserMode = 'multiple' | 'tags';

export type dataType = Record<string, any>;

export type OptionsType = SelectProps['options'];

export type LabelInValueType = {
  label: string;
  value?: string;
};

export type enumFiledNames = ValueEnumFieldNames & {
  userList?: string;
  userFiledNames?: ValueEnumFieldNames;
};

export type UserProps = SelectProps & {
  // 只读时label分隔字符
  readSplitStr?: string;
  userSearchCode?: string[];
  selectButton?: boolean;
  userButton?: boolean;
  requestEmail?: MsFieldRequest<any>;
  emailEnum?: object[];
  emailPostRes?: (data: object) => object[];
  emailSearchCode?: string[];
  emailEnumFiledNames?: enumFiledNames;
  requestGroup?: MsFieldRequest<any>;
  groupPostRes?: (data: object) => object[];
  groupEnum?: object[];
  groupEnumFiledNames?: enumFiledNames;
  groupSearchCode?: string[];
  rowKey?: UserRowKey;
  selectType?: UserSelectType;
  userModalTitle?: React.ReactNode;
  onChange?: (selectRows?: any) => void;
};

export type MsUserProps = MsFieldBaseProps<UserProps>;

export type MsUserRef = Ref<RefSelectProps>;

export type UserModalProps = UserProps & {
  userList: object[];
  emailList: object[];
  groupList: object[];
};

export type UserAllProps = MsFieldBasePropsWithRequest<UserProps> & { value?: any };

export type baseTabModuleProps = UserProps & {
  list?: dataType[];
  selectRows?: dataType[];
  changeSelectRows?: (val: dataType[]) => void;
  rowKey?: UserRowKey;
  tabsId?: string;
  mode?: UserMode;
  enumFiledName?: enumFiledNames & {
    userList?: string;
    userEnumFiledNames?: enumFiledNames;
  };
};
