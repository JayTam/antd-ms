/* 经典上传 */

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import cs from 'classnames';
import { isFunction, isString } from 'lodash-es';
import { forwardRef, useMemo } from 'react';
import type { UploadEditProps } from '../../types';
import { itemRender } from '../../utils/itemRender';
import UploadRender from './UploadRender';

const BaseUpload = forwardRef<any, UploadEditProps>((props, ref) => {
  const { uploadConfig, loading, uploadRender = 'Upload' } = props;

  // 上传按钮
  const uploadButton = useMemo(() => {
    // uploadRender是方法时：
    if (isFunction(uploadRender)) {
      return uploadRender(loading);
    }
    // 是一个字符串
    if (isString(uploadRender)) {
      return (
        <Button
          icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
          disabled={uploadConfig?.disabled}
        >
          {uploadRender}
        </Button>
      );
    }

    return uploadRender;
  }, [uploadRender, loading, uploadConfig?.disabled]);

  return (
    <Upload
      ref={ref}
      {...uploadConfig}
      className={cs(
        {
          'ms-upload-block': uploadConfig?.uploadSuffixRender,
        },
        uploadConfig?.className,
      )}
      itemRender={(originNode: any, file: UploadFile, fileList: object[], actions: any) => {
        return itemRender({
          file: file,
          actions: actions,
          type: 'edit',
          showUploadList: uploadConfig?.showUploadList,
        });
      }}
    >
      <UploadRender {...uploadConfig}>{uploadButton}</UploadRender>
    </Upload>
  );
});

export default BaseUpload;
