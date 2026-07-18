import type { ProgressProps } from 'antd';
import type { Ref } from 'react';
import type { MsFieldBaseProps } from '../../components/MsField/types';

export type DataType = Record<string, any>;

export type PartUploadProps = {
  value?: File;
  endpoint?: string;
  region?: string;
  userToken?: string;
  bucket?: string;
  uploadKey?: string;
  partSize?: number; //分片大小，单位MB
  uploadStatusChange?: (data: UploadStatusType) => void;
  progressProps?: ProgressProps;
};

export type UploadStatusType = {
  uploadKey?: string;
  progress?: number;
  status?: '-1' | '0' | '1' | '2' | '3'; // -1上传失败，0待上传， 1上传中，2已暂停，3上传成功
};

export type MsPartUploadActionType = {
  startUpload?: () => void;
  pauseUpload?: () => void;
  resumeUpload?: () => void;
  cancelUpload?: () => void;
};

export type MsPartUploadProps = MsFieldBaseProps<PartUploadProps>;

export type MsPartUploadRef = Ref<MsPartUploadActionType>;
