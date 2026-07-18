import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { CascaderProps as AntCascaderProps } from 'antd';
import type { BaseOptionType, CascaderRef, DefaultOptionType } from 'antd/es/cascader';
import type { PropsWithChildren, ReactElement, Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type CascaderProps<DataNodeType = any> = Omit<
  AntCascaderProps<DataNodeType>,
  'value' | 'defaultValue' | 'onChange'
> & {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any, options: DataNodeType[] | DataNodeType[][]) => void;
  enableFullValueInitializer?: boolean;
  initialLoading?: boolean;
  loadChildrenData?: (data: any) => Promise<any>;
} & MsFiledRequestFieldPropsType;

export type MsCascaderProps<DataNodeType> = MsFieldBasePropsWithRequest<
  CascaderProps<DataNodeType>
>;

export type MsCascaderRef = Ref<CascaderRef>;

export type MsCascaderComponentType = <
  OptionType extends DefaultOptionType | BaseOptionType = DefaultOptionType,
>(
  props: PropsWithChildren<MsCascaderProps<OptionType>> & React.RefAttributes<CascaderRef>,
) => ReactElement;
