import type { MsFieldBasePropsWithRequest } from '@jaytam/antd-ms/components/MsField/types';
import type { AutoCompleteProps as AntAutoCompleteProps } from 'antd';
import type { Ref } from 'react';

type AutoCompleteProps = AntAutoCompleteProps & { loading?: boolean };

export type MsAutoCompleteProps = MsFieldBasePropsWithRequest<AutoCompleteProps>;

export type MsAutoCompleteRef = Ref<HTMLDivElement>;
