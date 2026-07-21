import type { ReactNode } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { EditConfig } from '../../components/MsForm/types';

export type MsResourceTagsProps = MsFieldBaseProps<
  ResourceTagsEditorProps | ResourceTagsReadProps
> & { editable?: EditConfig<any> };

export interface ResourceTagsTableCellProps {
  resource?: ResourceType;
  onRefresh?: () => void;
}

export interface ResourceTagsReadProps {
  value?: string;
  onChange?: (value: string) => void;
  resource?: ResourceType;
  onRefresh?: () => void;
  readonly?: boolean;
  editable?: EditConfig<any>;
}

export interface ResourceTagsFieldsProps {
  value?: TagItem[];
  onChange?: (value: TagItem[]) => void;
  name?: string;
}

export interface ResourceTagsModalProps {
  gri?: string;
  tags: TagItem[];
  title?: ReactNode;
  type?: 'editor' | 'filter';
}

export interface ResourceTagsEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  // 渲染类型
  renderType?: 'button' | 'clear' | 'all' | 'field';
}

export type TagItem = {
  key?: string;
  value?: string;
};

export interface ResourceType {
  tenantId: string;
  globalResourceIdentity: string;
  resourceTypeId: number;
  resourceCode: string;
  resourceName: string;
  resourceCreateTime: string;
  resourceMetadata: string | Record<string, any>;
  resourceStatus: number;
  azone: string;
  resourceTypeModel: ResourceTypeModel;
  resourceGroupModel: ResourceGroupModel;
  resourceTags: ResourceTag[];
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  switchId?: string;
  resourceUrl?: string;
}

interface ResourceTag {
  resourceId: number;
  tagKey: string;
  tagValue: string;
  systemFlag: number;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface ResourceGroupModel {
  groupName: string;
  groupCode: string;
  groupId: string;
  groupStatus: number;
  tenantId: string;
  countResource: number;
  countUserPolicy: number;
  countGroupPolicy: number;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface ResourceTypeModel {
  resourceTypeCode: string;
  resourceTypeName: string;
  resourceProviderId: number;
  resourceProviderModel: ResourceProviderModel;
  resourceAbilityModels: ResourceAbilityModel[];
  resourceClassName: string;
  resourceExpressionDefine: string;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  redirectUrl?: string;
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

interface ResourceProviderModel {
  serviceCode: string;
  resourceProductionCode: string;
  resourceProviderToken: string;
  id: number;
  deleted: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
