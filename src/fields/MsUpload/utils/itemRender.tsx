import { LoadingOutlined } from '@ant-design/icons';
import { MsDownloadImageOutlined, MsShutOutlined } from '@jaytam/icons';
import type { UploadFile } from 'antd';
import { Progress, Space } from 'antd';
import classNames from 'classnames';
import { isBoolean } from 'lodash-es';
import { FILE_PICTURE, FILE_VIDEO } from '../contants';
import type { ShowUploadListProps } from '../types';
import { iconRender } from './iconRender';

export const itemRender = ({
  file,
  actions,
  type = 'edit',
  showUploadList,
}: {
  file: UploadFile;
  actions: { download: any; preview: any; remove: any };
  type?: 'edit' | 'read';
  showUploadList?: boolean | ShowUploadListProps;
}) => {
  const icon = iconRender({ file: file });
  const fileName = file.name;
  const fileExtension = fileName?.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

  // 是否可下载
  let isShowDownload: boolean = false;
  if (file?.status === 'done') {
    if (isBoolean(showUploadList)) {
      isShowDownload = showUploadList;
    } else if (showUploadList?.showDownloadIcon !== undefined) {
      isShowDownload = showUploadList?.showDownloadIcon;
    } else {
      isShowDownload = type === 'edit' ? true : false;
    }
  }

  // 是否可移除
  let isShowRemove: boolean = false;
  if (isBoolean(showUploadList)) {
    isShowRemove = showUploadList;
  } else if (showUploadList?.showRemoveIcon !== undefined) {
    isShowRemove = showUploadList?.showRemoveIcon;
  } else {
    isShowRemove = type === 'edit' ? true : false;
  }

  // 是否可预览
  let isPreview: boolean = false;
  if (isBoolean(showUploadList)) {
    isPreview = showUploadList;
  } else if (showUploadList?.showPreviewIcon !== undefined) {
    isPreview = showUploadList?.showPreviewIcon;
  } else {
    isPreview = type === 'edit' ? true : false;
  }

  return (
    <div className={classNames('ms-upload-item-render-content')}>
      <div className={classNames('ms-upload-item-render')}>
        <div className={classNames('ms-upload-item')} title={file?.name}>
          <span className={classNames('ms-upload-item-icon')}>{icon}</span>
          {[...FILE_PICTURE, ...FILE_VIDEO].includes(fileExtension) && file?.url && isPreview ? (
            <a onClick={actions?.preview}>{file?.name}</a>
          ) : (
            <span
              className={classNames(
                file?.status === 'error' ? 'ms-upload-item-error-name' : undefined,
              )}
            >
              {file?.name}
            </span>
          )}
        </div>

        <Space style={{ marginLeft: '8px' }}>
          {file?.status === 'uploading' ? (
            <LoadingOutlined spin className={classNames('ms-upload-item-icon-default')} />
          ) : null}
          {/* 下载按钮 */}
          {isShowDownload ? (
            <MsDownloadImageOutlined
              onClick={actions?.download}
              className={classNames('ms-upload-item-icon-default')}
            />
          ) : null}
          {/* 删除按钮 */}
          {isShowRemove ? (
            <span>
              {
                // @ts-ignore
                showUploadList?.removeIcon ? (
                  <span style={{ cursor: 'pointer' }} onClick={actions?.remove}>
                    {
                      // @ts-ignore
                      showUploadList?.removeIcon
                    }
                  </span>
                ) : (
                  <MsShutOutlined
                    className={classNames('ms-upload-item-icon-default')}
                    onClick={actions?.remove}
                  />
                )
              }
            </span>
          ) : null}
        </Space>
      </div>
      <div className={classNames('ms-upload-item-render-progress')}>
        {file?.percent && file?.percent > 0 && file?.percent < 100 ? (
          <Progress percent={file?.percent} showInfo={false} strokeLinecap="butt" />
        ) : null}
      </div>
    </div>
  );
};
