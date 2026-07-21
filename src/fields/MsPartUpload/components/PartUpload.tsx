import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { useControllableValue, useDeepCompareEffect } from 'ahooks';
import { Progress } from 'antd';
import { some } from 'lodash-es';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import type { DataType, MsPartUploadActionType, PartUploadProps, UploadStatusType } from '../types';
import { initialUpload } from '../utils';
import { throttleResponseHandle } from '../utils/response';
import { useLocale } from '@jaytam/antd-ms/locale';

const PartUploader = React.forwardRef<MsPartUploadActionType, PartUploadProps>((props, ref) => {
  const {
    bucket,
    uploadKey,
    endpoint,
    region,
    userToken,
    value,
    partSize = 5,
    progressProps,
  } = props ?? {};

  const { currentLocale, fullLocale } = useLocale('MsPartUpload');

  // 上传状态和进度
  const [uploadStatus, setUploadStatus] = useControllableValue<UploadStatusType>(props, {
    defaultValue: {
      uploadKey: uploadKey,
    },
    valuePropName: 'uploadStatus',
    trigger: 'uploadStatusChange',
  });
  // 保存每一个分片的信息
  const parts = useRef<DataType[]>([]);
  //是否暂停
  const isPaused = useRef<boolean>(false);
  //连接成功后S3返回的唯一标识
  const uploadId = useRef<string>('');

  const updateUploadStatus = (data: UploadStatusType) => {
    setUploadStatus((pre) => {
      return {
        ...pre,
        ...data,
      };
    });
  };

  // 上传失败，状态变更
  const uploadFail = () => {
    if (uploadId.current) {
      //只要失败都清空分片列表和uploadId
      parts.current = [];
      uploadId.current = '';
      updateUploadStatus({ status: '-1' });
    }
  };

  const s3Client = useMemo(() => {
    return initialUpload(props);
  }, [endpoint, region, userToken]);

  // 完成分片上传
  const completeMultipartUpload = (uploadedParts: any) => {
    const completeParams = {
      Bucket: bucket,
      Key: uploadKey,
      UploadId: uploadId?.current,
      MultipartUpload: {
        Parts: uploadedParts,
      },
    };
    return s3Client.send(new CompleteMultipartUploadCommand(completeParams));
  };

  // 初始化建立连接, 获取uploadId
  const createMultipartUpload = async () => {
    const params = {
      Bucket: bucket,
      Key: uploadKey,
    };
    const command = new CreateMultipartUploadCommand(params);
    try {
      const response = await s3Client.send(command, { requestTimeout: 500 });
      uploadId.current = response.UploadId ?? '';
      return response;
    } catch (err) {
      throttleResponseHandle(currentLocale.connectError, fullLocale);
      return 1;
    }
  };

  // 分片上传
  const multiUploadPart = (filePath: Blob, partNumber: number) => {
    // PartNumber分片编号，不能为0,所以都加1
    const uploadPartParams = {
      Bucket: bucket,
      Key: uploadKey,
      UploadId: uploadId?.current,
      PartNumber: partNumber,
      Body: filePath,
    };
    return s3Client.send(new UploadPartCommand(uploadPartParams));
  };

  //开始上传
  const startUpload = async () => {
    if (!value) {
      console.error('No file selected.');
      return;
    }
    //如果没有uploadId，则需要建立连接
    if (!uploadId?.current) {
      const data = await createMultipartUpload();
      if (data === 1) {
        updateUploadStatus({ status: '-1' });
        return;
      }
    }

    //变更状态为上传中
    updateUploadStatus({ status: '1' });

    //分片大小
    const chunkSize = partSize * 1024 * 1024;
    // 分片总数
    const chunks = Math.ceil(value?.size / chunkSize);
    //已上传多少片
    let uploadedPartsCount = parts?.current?.length ?? 0;

    for (let i = 0; i < chunks; i++) {
      //分片编号
      const partNumber = i + 1;
      // 如果暂停状态或者当前分片已经上传了，则跳过
      if (isPaused?.current || some(parts?.current, { PartNumber: partNumber })) {
        continue;
      }

      const start = i * chunkSize;
      const end = start + chunkSize >= value?.size ? value?.size : start + chunkSize;
      // 分片文件
      const chunk = value.slice(start, end);

      try {
        // 开始上传分片
        const uploadPartResponse = await multiUploadPart(chunk, partNumber);
        parts.current = [
          ...parts?.current,
          {
            ETag: uploadPartResponse.ETag,
            PartNumber: partNumber,
          },
        ];
      } catch (err) {
        // 只有断网才会被判定是暂停，其他情况都是上传失败
        if (!navigator.onLine) {
          updateUploadStatus({ status: '2' });
        } else {
          uploadFail();
        }
        return;
      }
      //每成功上传一片，就记录一次已上传片数
      uploadedPartsCount++;
      // 计算上传进度
      const uploadProgress = (uploadedPartsCount / chunks) * 100;
      updateUploadStatus?.({ progress: uploadProgress });
    }
    // 如果已上传分片数等于总分片数量，则分片已上传完成
    if (parts?.current.length === chunks) {
      try {
        await completeMultipartUpload(parts?.current);
        updateUploadStatus({ status: '3' });
      } catch (err) {
        uploadFail();
        throttleResponseHandle(currentLocale.mergeError, fullLocale);
      }
    }
  };

  // 暂停上传
  const pauseUpload = () => {
    isPaused.current = true;
    updateUploadStatus({ status: '2' });
  };

  // 恢复上传
  const resumeUpload = () => {
    isPaused.current = false;
    startUpload();
    updateUploadStatus({ status: '1' });
  };

  // 取消上传
  const cancelUpload = async () => {
    const params = {
      Bucket: bucket,
      Key: uploadKey,
      UploadId: uploadId?.current,
    };
    if (uploadId) {
      await s3Client.send(new AbortMultipartUploadCommand(params));
      uploadFail();
    }
  };

  useImperativeHandle(ref, () => ({
    startUpload: startUpload,
    pauseUpload: pauseUpload,
    resumeUpload: resumeUpload,
    cancelUpload: cancelUpload,
  }));

  useDeepCompareEffect(() => {
    // value变更并且状态不是待上传时，把状态变更为待上传
    if (value && uploadStatus.status !== '0') {
      updateUploadStatus({ status: '0' });
    }
  }, [value]);

  if (!value) {
    return null;
  }
  return (
    <div>
      <Progress percent={Math.round(uploadStatus?.progress ?? 0)} size="small" {...progressProps} />
    </div>
  );
});

export default PartUploader;
