import { Skeleton } from 'antd';

export const DefaultReadSkeleton = () => {
  return <Skeleton.Input block active size="small" />;
};

export const TagsReadSkeleton = () => {
  return <Skeleton.Input active style={{ height: 16, width: 80, minWidth: 80 }} />;
};
