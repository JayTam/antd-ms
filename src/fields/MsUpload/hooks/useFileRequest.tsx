import { isArray } from 'lodash-es';
import type { UploadProps } from '../types';
import type { UploadFile } from 'antd';

const useFileRequest = (props: UploadProps) => {
  const { postRes = (res) => res?.data } = props;

  const parsingResponse = (file: UploadFile) => {
    if (file?.status === 'done' && file?.response) {
      const response = postRes?.(file?.response);
      Object.assign(file, { ...response });
    }

    return file;
  };

  const responseToFile = (files: UploadFile | UploadFile[]) => {
    if (isArray(files)) {
      return files?.map((file: any) => {
        return parsingResponse(file);
      });
    }

    return parsingResponse(files);
  };

  return { responseToFile, parsingResponse };
};

export default useFileRequest;
