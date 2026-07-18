import type { IDomEditor, IEditorConfig, IToolbarConfig, SlateElement } from '@wangeditor/editor';
import type { CSSProperties, Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

type modeType = 'default' | 'simple';

export type MsRichTextProps = MsFieldBaseProps<RichTextProps>;

export type MsRichTextRef = Ref<HTMLInputElement>;

export type RichTextProps = {
  id?: string;
  defaultValue?: string;
  value?: string;
  style?: CSSProperties;
  className?: string;
  readOnly?: boolean;
  minHeight?: string;
  placeholder?: string;
  editorChange?: (editor?: IDomEditor) => void;
  // 工具栏配置
  toolbar?: boolean; // 是否显示工具栏
  toolbarConfig?: IToolbarConfig;
  toolbarMode?: modeType;
  toolbarStyle?: CSSProperties;
  // 编辑器配置
  editorConfig?: Omit<IEditorConfig, 'readOnly'>;
  editorMode?: modeType;
  editorStyle?: CSSProperties;
  // 图片上传的地址
  imageServer?: string;
  showEditMenu?: boolean;
  editText?: string;
  showCancelMenu?: boolean;
  cancelText?: string;
  onCancel?: (data: string) => void;
  onCreated?: (editor?: IDomEditor) => void;
};

export type ImageElement = SlateElement & {
  src: string;
  alt: string;
  url: string;
  href: string;
};

export type InsertFnType = (url: string, alt: string, href: string) => void;
