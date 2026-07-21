/* 拖拽上传 */

import type { UploadFile } from 'antd';
import { Image, Upload } from 'antd';
import cs from 'classnames';
import { isFunction, isString } from 'lodash-es';
import { forwardRef, useMemo } from 'react';
import type { UploadEditProps } from '../types';
import { itemRender } from '../utils/itemRender';
import { useLocale } from '@jaytam/antd-ms/locale';

const DragDisabledImg = require('@jaytam/antd-ms/assets/images/upload/drag-disabled.png');
const DragImg = require('@jaytam/antd-ms/assets/images/upload/drag.png');

const { Dragger } = Upload;

const DraggerUpload = forwardRef<any, UploadEditProps>((props, ref) => {
  const { uploadConfig, loading, uploadRender = '' } = props;

  const { currentLocale } = useLocale('MsUpload');

  // 上传按钮
  const uploadButton = useMemo(() => {
    // uploadRender是方法时：
    if (isFunction(uploadRender)) {
      return uploadRender(loading);
    }
    // 是一个字符串
    if (isString(uploadRender)) {
      return (
        <>
          <Image
            width={'100px'}
            src={uploadConfig?.disabled ? DragDisabledImg : DragImg}
            preview={false}
          />
          {uploadRender ? (
            <p className={cs('ms-upload-drag-desc')}>{uploadRender}</p>
          ) : (
            <>
              <p className={cs('ms-upload-drag-desc')}>{currentLocale.clickHere}</p>
              <p className={cs('ms-upload-drag-desc')}>
                {currentLocale.dragHere}
                <span>
                  {uploadConfig?.maxCount
                    ? `(${uploadConfig?.fileList?.length || 0}/${uploadConfig?.maxCount})`
                    : ''}
                </span>
              </p>
            </>
          )}
        </>
      );
    }

    return uploadRender;
  }, [uploadRender, loading, uploadConfig?.disabled, currentLocale]);

  return (
    <Dragger
      ref={ref}
      {...uploadConfig}
      className={cs('ms-upload-drag', uploadConfig?.className, {
        'ms-upload-drag-disabled': uploadConfig?.disabled,
      })}
      itemRender={(originNode: any, file: UploadFile, fileList: object[], actions: any) => {
        return itemRender({
          file: file,
          actions: actions,
          type: 'edit',
          showUploadList: uploadConfig?.showUploadList,
        });
      }}
    >
      {uploadButton}
    </Dragger>
  );
});

export default DraggerUpload;
