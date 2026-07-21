export type CreateFormListFieldProps = {
  /** 资源编码 */
  resourceTypeCode: string;
  /** vpc 资源编码 */
  vpcResourceCode?: string;
  /** 可用区编码 */
  azoneCode: string;
  /** 栅格宽度 */
  fullWidthColSpan?: number;
  /** 自定义标签字段名 */
  tagsNamePath?: string;
  /** 预置标签字段名 */
  presetTagsNamePath?: string;
  /** 禁用自定义标签 */
  disableTags?: boolean;
};

export type TagItem = {
  tagKey?: string;
  tagValue?: string;
};

export type TagList = (TagItem | undefined)[];

export interface PresetTagItem {
  id: number;
  tagKey: string;
  tagValues: PresetTagValue[];
  resourceTypeCode: string;
  sourceVpc: number;
  azone: string;
  status: number;
  failedTag?: string;
}

export interface PresetTagValue {
  tagKeyId: number;
  tagKey: string;
  tagValue: string;
  tenantId: string;
  id: number;
  deleted: number;
  createdAt: string;
  updatedAt: string;
}
