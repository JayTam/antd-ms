import type { Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';
import type { MonacoDiffEditorProps } from './Diff/types';

export type MsDiffEditorProps = MsFieldBaseProps<MonacoDiffEditorProps>;

export type MsDiffEditorRef = Ref<HTMLInputElement>;
