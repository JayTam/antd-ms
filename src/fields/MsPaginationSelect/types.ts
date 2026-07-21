import type { MsTableFiledNames } from '@jaytam/antd-ms/components/MsTable/types';
import type { InputProps, Select, SelectProps } from 'antd';
import type { ComponentProps, ReactNode } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type PaginationSelectProps = SelectProps & {
  searchKey?: string;
  fieldNames?: MsTableFiledNames;
  dropdownFooterLeftRender?: ReactNode;
  searchInputProps?: InputProps;
};

export type MsPaginationSelectProps = MsFieldBasePropsWithRequest<PaginationSelectProps>;

export type MsPaginationSelectRef = ComponentProps<typeof Select>['ref'];
