import { S3Client } from '@aws-sdk/client-s3';
import type { PartUploadProps } from '../types';

// 初始化
export const initialUpload = (props: PartUploadProps) => {
  const { endpoint, region, userToken } = props ?? {};
  const client = new S3Client({
    endpoint: endpoint,
    region: region,
    forcePathStyle: true,
    credentials: {
      accessKeyId: 'oss-key-id', //访问登录名
      secretAccessKey: 'oss-access-key', //访问密码
    },
  });

  // 在client中间件中处理增加自定义headers信息
  client.middlewareStack.add(
    (next) => async (args) => {
      (args.request as Record<string, any>).headers['oss-user-token'] = userToken;
      return await next(args);
    },
    { step: 'build' },
  );

  return client;
};
