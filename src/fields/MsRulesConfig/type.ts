import type { MsFormColumnType } from '@jaytam/antd-ms';
import type { ComponentsMap, InnerComponentMap } from '@jaytam/antd-ms/components/MsField/config';
import type { RcFieldItem, RcRulesConfig } from './components/RulesConfig';
import type { MsFieldBaseProps, MsFieldProps } from '@jaytam/antd-ms/components/MsField/types';
import type { Ref } from 'react';

type InnerKeys = keyof InnerComponentMap;
// 前期类型只要基础MsField类型,剔除复杂类型，后期测试在继续支持
export type RcValueType = keyof Omit<
  ComponentsMap,
  | InnerKeys
  | 'textArea'
  | 'search'
  | 'upload'
  | 'group'
  | 'collapse'
  | 'empty'
  | 'progress'
  | 'avatar'
  | 'image'
  | 'resourceTags'
  | 'presetResourceTags'
  | 'formList '
  | 'formTable'
  | 'partUpload'
  | 'userGroup'
>;

export type MsRulesConfigRef = Ref<HTMLDivElement>;

export type MsRulesConfigProps<D = any> = MsFieldProps<any> &
  MsFormColumnType<D> &
  MsFieldBaseProps<RcRulesConfig> & {
    columns: RcFieldItem<D>[]
  };

export type rulesConfigFormColumns<D = any> = MsFieldProps<any> & MsFormColumnType<D> &
  MsFieldBaseProps<RcRulesConfig> & { columns?: RcFieldItem<D>[] }

export type MsJson =
  | string
  | number
  | boolean
  | null
  | { [key: string]: MsJson | undefined }
  | MsJson[];
