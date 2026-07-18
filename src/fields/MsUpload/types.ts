import type { UploadProps as AntUploadProps, UploadFile } from 'antd';
import type { ReactNode, Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type UploadProps = AntUploadProps & {
  uploadRender?: UploadRenderType;
  value?: UploadFile | UploadFile[];
  uploadType?: 'profile' | 'dragger' | 'draggerPaste';
  postRes?: (res: any) => Record<string, any>;
  // 文件变动的方法
  onFileChange?: (info: UploadChangeParam<UploadFile<any>>) => void;
  /* 上传按钮后缀 */
  uploadSuffixRender?: ReactNode;
};

export interface UploadChangeParam<T = UploadFile> {
  file: T;
  fileList: T[];
  event?: {
    percent: number;
  };
}

export type MsUploadProps = MsFieldBaseProps<UploadProps>;

export type MsUploadRef = Ref<any>;

export type UploadEditProps = {
  uploadConfig: AntUploadProps & { uploadSuffixRender?: ReactNode };
  loading?: boolean;
  uploadRender?: UploadRenderType;
};

type UploadRenderType = React.ReactNode | ((loading?: boolean) => React.ReactNode);

export type ShowUploadListProps = {
  showPreviewIcon?: boolean;
  showRemoveIcon?: boolean;
  showDownloadIcon?: boolean;
  previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
};

export type PreviewType = {
  open?: boolean;
  url?: string;
  title?: string;
  fileType?: string;
};
