import { useDeepCompareEffect } from 'ahooks';
import { Image, Modal, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import classNames from 'classnames';
import { isArray, isNil } from 'lodash-es';
import { forwardRef, useState } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import BaseUpload from './components/BaseUpload';
import DraggerUpload from './components/Dragger';
import DraggerPasteUpload from './components/DraggerPaste';
import ProfileUpload from './components/ProfileUpload';
import { imgSuffix, imgTypes, videoSuffix, videoTypes } from './contants';
import './index.less';
import type { MsUploadProps, MsUploadRef, PreviewType } from './types';
import { formatFileList } from './utils/formatFileList';
import useFileRequest from './hooks/useFileRequest';
import { useLocale } from '@jaytam/antd-ms/locale';
import { itemRender } from './utils/itemRender';

const MsUpload = forwardRef((props: MsUploadProps, ref: MsUploadRef) => {
  const { fieldProps } = props;
  const {
    value,
    fileList,
    onChange,
    onFileChange,
    onPreview,
    // 上传模式： 默认点击上传  profile头像上传, dragger拖拽上传
    uploadType,
    uploadRender, //React.ReactNode
    ...restFieldProps
  } = fieldProps ?? {};

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>();

  const { responseToFile } = useFileRequest(fieldProps || {});
  const { currentLocale } = useLocale('MsUpload');

  // 预览图片的状态
  const [preview, setPreview] = useState<PreviewType>();

  // 上传中的loading状态
  const [loading, setLoading] = useState(false);
  // 上传文件改变时的回调
  const uploadChange: UploadProps['onChange'] = (values) => {
    // 将上传接口中的response的返回值添加到file中
    const formatValues = {
      fileList: responseToFile(values?.fileList) as UploadFile[],
      file: responseToFile(values?.file) as UploadFile,
      event: values?.event,
    };
    setUploadFileList(formatValues.fileList);
    // 上传中，将loading设置为true
    setLoading(formatValues?.event ? true : false);
    if (typeof onChange === 'function') {
      onChange?.(formatValues);
    }
    onFileChange?.(formatValues);
  };

  useDeepCompareEffect(() => {
    const list = value ?? fileList;
    if (!list) return;

    const newFileList = formatFileList(list);
    setUploadFileList(newFileList);
    onChange?.(newFileList);
  }, [value, fileList]);

  // 点击文件链接或预览图标时的回调
  const handlePreview = async (file: UploadFile) => {
    const url = file.url ? file.url : window.URL.createObjectURL(file.originFileObj! ?? file);
    const tmpArr = file?.name?.split?.('.') ?? [];
    const fileType = tmpArr[tmpArr.length - 1] ? tmpArr[tmpArr.length - 1] : file?.type ?? '';
    setPreview({
      open: true,
      url: url,
      fileType: fileType,
      title: file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    });
  };

  // 可编辑的上传渲染
  const render = () => {
    let disabledUpload = restFieldProps.disabled;

    if (!restFieldProps.disabled && uploadFileList?.length && restFieldProps?.maxCount) {
      const maxCount = restFieldProps?.maxCount;
      disabledUpload = uploadFileList.length >= maxCount;
    }

    const uploadConfig: UploadProps = {
      fileList: uploadFileList,
      onPreview: onPreview ?? handlePreview,
      onChange: uploadChange,
      openFileDialogOnClick: loading ? false : true,
      ...restFieldProps,
      disabled: disabledUpload,
    };

    let UploadComponent = BaseUpload;
    if (uploadType === 'profile') UploadComponent = ProfileUpload;
    if (uploadType === 'dragger') UploadComponent = DraggerUpload;
    if (uploadType === 'draggerPaste') UploadComponent = DraggerPasteUpload;

    return (
      <UploadComponent
        uploadConfig={uploadConfig}
        uploadRender={uploadRender}
        loading={loading}
        ref={ref}
      />
    );
  };

  const modalRender = () => {
    // 如果无值，不渲染Image节点，影响只读 '暂无数据' 的样式
    if (!preview) return null;

    switch (true) {
      case [...imgTypes, ...imgSuffix].includes(preview?.fileType || ''):
        return (
          <Image
            alt={preview?.title}
            src={preview?.url}
            style={{ display: 'none' }}
            preview={{
              visible: preview?.open,
              src: preview?.url,
              onVisibleChange: (value) => {
                setPreview({
                  ...preview,
                  open: value,
                });
              },
            }}
          />
        );

      case [...videoSuffix, ...videoTypes].includes(preview?.fileType || ''):
        return (
          <Modal
            open={!!preview.open}
            bodyStyle={{ padding: 0, height: '100vh', background: '#4d4d4d' }}
            footer={null}
            destroyOnClose
            maskClosable
            style={{ top: '0', padding: 0 }}
            onCancel={() => {
              setPreview({ ...preview, open: false });
            }}
          >
            <video
              src={preview?.url}
              controls
              width="100%"
              height="100%"
              style={{ objectFit: 'cover', height: 'auto', maxHeight: '100%' }}
            />
          </Modal>
        );
    }
  };

  // 只读模式渲染
  const readDomRender = () => {
    let uploadDom: React.ReactNode | null = null;
    const uploadConfig: UploadProps = {
      fileList: uploadFileList,
      onPreview: onPreview ?? handlePreview,
      onChange: uploadChange,
      showUploadList: {
        showRemoveIcon: false,
      },
      ...restFieldProps,
    };

    // 无数据时显示的文案
    if (isNil(value) || (isArray(value) && value.length === 0)) {
      return currentLocale.empty;
    }
    // 只读模式时，禁用按钮
    switch (uploadType) {
      case 'profile':
        uploadDom = (
          <Upload
            ref={ref}
            {...uploadConfig}
            listType="picture-card"
            className={classNames('ms-picture-card', uploadConfig.className)}
            openFileDialogOnClick={false}
          />
        );
        break;
      default:
        uploadDom = (
          <Upload
            ref={ref}
            openFileDialogOnClick={false}
            className={classNames('ms-upload-read', uploadConfig.className)}
            itemRender={(originNode: any, file: UploadFile, fileList: object[], actions: any) => {
              return itemRender({
                file: file,
                actions: actions,
                type: 'read',
                showUploadList: uploadConfig?.showUploadList,
              });
            }}
            {...uploadConfig}
          />
        );
    }
    return uploadDom;
  };

  const editDom = (
    <>
      {render()}
      {modalRender()}
    </>
  );

  const readDom = (
    <>
      {readDomRender()}
      {modalRender()}
    </>
  );

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsUpload);
