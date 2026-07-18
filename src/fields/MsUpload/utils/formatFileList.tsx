import type { UploadFile } from 'antd';
import { isString } from 'lodash-es';

export const changFileList = (fileList: UploadFile[]) => {
  fileList?.forEach((file: any) => {
    if (file?.status === 'done' && file?.response) {
      file.url = file?.response?.data?.url;
    }
  });

  return fileList;
};

export const formatFileList = (file: any) => {
  if (isString(file)) {
    const list = file.split(',').map((item) => ({
      url: item,
    }));
    return list as UploadFile[];
  }
  if (Object.prototype.toString.call(file) === '[object Object]') {
    return file?.fileList ?? [];
  }
  return file;
};
