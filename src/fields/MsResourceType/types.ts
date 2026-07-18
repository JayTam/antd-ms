import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { RefSelectProps, SelectProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type MsResourceTypeProps = MsFieldBasePropsWithRequest<ResourceTypeProps>;

export type MsResourceTypeRef = Ref<RefSelectProps>;

export type ResourceTypeProps = Omit<SelectProps, 'options' | 'value' | 'onChange'> & {
  value?: string[];
  onChange?: (value?: string[]) => void;
  options?: ResourceTypeOption[];
  initialLoading?: boolean;
} & MsFiledRequestFieldPropsType;

export interface ResourceTypeOption {
  resourceTypeCode: string;
  value: string;
  resourceTypeName: string;
  label: string;
  resourceAbilityModels: ResourceAbilityModel[];
  resourceExpressionDefine: string;
  resourceGroupId: number;
  status: number;
  productCode: string;
  productName: string;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  icon?: string;
  redirectUrl?: string;
  resourceProviderModel?: ResourceProviderModel;
  resourceProviderId?: number;
  resourceClassName?: string;
  description?: string;
  children?: ResourceTypeOption[];
}

interface ResourceProviderModel {
  serviceCode: string;
  resourceProviderToken: string;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface ResourceAbilityModel {
  resourceTypeId: number;
  abilityCode: string;
  abilityType: number;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
