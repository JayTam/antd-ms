/* 头像上传 */

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import classNames from 'classnames';
import { isFunction, isString } from 'lodash-es';
import { forwardRef, useMemo } from 'react';
import type { UploadEditProps } from '../types';

const ProfileUpload = forwardRef<any, UploadEditProps>((props, ref) => {
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
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>{uploadRender}</div>
        </div>
      );
    }

    return uploadRender;
  }, [uploadRender, loading]);

  return (
    <Upload
      ref={ref}
      {...uploadConfig}
      className={classNames('ms-picture-card', uploadConfig.className)}
      listType="picture-card"
    >
      {uploadButton}
    </Upload>
  );
});

export default ProfileUpload;
