import type { MsFiledRequestFieldPropsType } from '@jaytam/antd-ms/hooks/useFieldRequest/types';
import type { TreeSelectProps as AntTreeSelectProps, RefSelectProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBasePropsWithRequest } from '../../components/MsField/types';

export type TreeSelectProps = AntTreeSelectProps &
  MsFiledRequestFieldPropsType & {
    initialLoading?: boolean;
  };

export type MsTreeSelectProps = MsFieldBasePropsWithRequest<TreeSelectProps>;

export type MsTreeSelectRef = Ref<RefSelectProps>;
