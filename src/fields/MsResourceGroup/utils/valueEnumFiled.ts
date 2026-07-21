import { isNil } from 'lodash-es';
import type { DataNode, DataType } from '../types';

// 把valueEnum转化为tree的格式，title => label，key => value
export const parsingToTreeOptions = (options?: DataType[]) => {
  options?.forEach((item) => {
    item.title = item?.label;
    item.key = item?.value;
    // 设置叶子节点，如果是root部门（未返回childrenPd）默认设置为false，其他部门根据item.childrenPd取反
    item.isLeaf = isNil(item.childrenPd) ? false : !item.childrenPd;
  });
  return options as DataNode[];
};
