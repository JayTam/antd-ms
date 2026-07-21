import type { Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { MonacoEditorProps } from './Code/types';

export type CodeProps = MonacoEditorProps;

export type MsCodeProps = MsFieldBaseProps<CodeProps>;

export type MsCodeRef = Ref<HTMLInputElement>;
