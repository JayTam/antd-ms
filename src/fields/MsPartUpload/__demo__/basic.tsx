import { UploadOutlined } from '@ant-design/icons';
import { MsField, setField } from '@jaytam/antd-ms';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { useRef, useState } from 'react';

import MsPartUpload from '@jaytam/antd-ms/fields/MsPartUpload';

setField('partUpload', MsPartUpload);

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const ref = useRef<Record<string, any>>(null);

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log([...fileList, file]);
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <MsField
        valueType="partUpload"
        value={fileList?.[0] as unknown as File}
        ref={ref}
        fieldProps={{
          bucket: 'qqqqq-167496225837449',
          endpoint: 'http://mscloud-dev3.msxfalb.test/oss-service/api/object/gateway/s3/mutilPart',
          region: '7-16',
          uploadKey: '1',
          userToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbG91ZEFjY291bnRJZCI6IjE2NzQ5NjIyNTgzNzQ0OSIsInRlbmFudElkIjoiNmM0N2NkNDlhZTI1NTIzZjhjMDZlYWE4NDA1YjVjMmEiLCJzZXNzaW9uSWQiOiIxNjkwMTYxNDk3OTMxIiwiZW50ZXJwcmlzZUlkIjoidGVzdDEyMzQ1NiIsInByb2plY3ROYW1lIjoiNmM0N2NkNDlhZTI1NTIzZjhjMDZlYWE4NDA1YjVjMmEiLCJleHAiOjE3MDM2NTMyNTEsImlhdCI6MTcwMzY0NjA1MSwicmFtQWNjb3VudElkIjoiIn0.gNnm0D0LITsn8fEN5eddaQAETeJ6GQbqtgivVWpN69o',
        }}
      />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

      <Button type="primary" onClick={() => ref?.current?.startUpload()} style={{ marginLeft: 16 }}>
        开始上传
      </Button>
      <Button type="primary" onClick={() => ref?.current?.pauseUpload()} style={{ marginLeft: 16 }}>
        暂停上传
      </Button>
      <Button
        type="primary"
        onClick={() => {
          ref?.current?.resumeUpload();
        }}
        style={{ marginLeft: 16 }}
      >
        恢复上传
      </Button>
      <Button type="primary" onClick={ref?.current?.cancelUpload} style={{ marginLeft: 16 }}>
        取消上传
      </Button>
    </>
  );
};
