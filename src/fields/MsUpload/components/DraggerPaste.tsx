/* 拖拽上传 */

import { useLocale } from '@jaytam/antd-ms/locale';
import { MsAdditionOutlined } from '@jaytam/icons';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import cs from 'classnames';
import { isFunction, isString } from 'lodash-es';
import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type { UploadEditProps } from '../types';
import { itemRender } from '../utils/itemRender';

const DragDisabledImg = require('@jaytam/antd-ms/assets/images/upload/drag-disabled.png');
const DragImg = require('@jaytam/antd-ms/assets/images/upload/drag.png');

const { Dragger } = Upload;

const DraggerPasteUpload = forwardRef<any, UploadEditProps>((props) => {
  const { uploadConfig, loading, uploadRender = '' } = props;
  const clipContainer = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<any>();
  const { currentLocale } = useLocale('MsUpload');

  // 处理粘贴上传文件
  const handlePasteFile = useCallback(
    async (event: any) => {
      const items = (event?.clipboardData || event?.originalEvent?.clipboardData)?.items;
      const toUploadFileList = [];
      for (let i = 0; i < items?.length; i++) {
        const file = items[i].getAsFile();
        toUploadFileList.push(file);
      }
      uploadRef?.current?.upload?.uploader?.uploadFiles?.(toUploadFileList);
    },
    [uploadRef],
  );

  useEffect(() => {
    if (clipContainer.current && !uploadConfig?.disabled) {
      clipContainer.current?.addEventListener('paste', handlePasteFile);
      return () => clipContainer.current?.removeEventListener('paste', handlePasteFile);
    }
  }, [uploadConfig?.disabled, handlePasteFile]);

  // 上传按钮
  const uploadButton = useMemo(() => {
    // uploadRender是方法时：
    if (isFunction(uploadRender)) {
      return uploadRender(loading);
    }
    // 是一个字符串
    if (isString(uploadRender)) {
      return (
        <div ref={clipContainer}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            style={{
              height: '116px',
              border: '1px dashed #d9d9d9',
              padding: '75px 0 8px 0',
              textAlign: 'center',
              background: `#fafcff url(${
                uploadConfig?.disabled ? DragDisabledImg : DragImg
              }) no-repeat center 0px/100px`,
            }}
          >
            {uploadRender ? (
              <p className={cs('ms-upload-drag-desc')}>{uploadRender}</p>
            ) : (
              <>
                <p className={cs('ms-upload-drag-desc')}>
                  {currentLocale.dragPasteHere}
                  <span>
                    {uploadConfig?.maxCount
                      ? `(${uploadConfig?.fileList?.length || 0}/${uploadConfig?.maxCount})`
                      : ''}
                  </span>
                </p>
              </>
            )}
          </div>
          <div>
            <Button type="link" icon={<MsAdditionOutlined />} disabled={uploadConfig?.disabled}>
              {currentLocale.clickAddlocalHeare}
            </Button>
          </div>
        </div>
      );
    }

    return uploadRender;
  }, [uploadRender, loading, uploadConfig?.disabled, currentLocale]);

  return (
    <Dragger
      ref={uploadRef}
      {...uploadConfig}
      className={cs('ms-upload-drag-paste', uploadConfig?.className, {
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

export default DraggerPasteUpload;
