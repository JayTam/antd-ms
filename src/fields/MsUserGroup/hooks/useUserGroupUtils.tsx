import { includes } from 'lodash-es';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps } from '../types';

const useUserGroupUtils = (props: UserGroupProps) => {
  const { unDeleteValues } = props;
  const { checkedList = [], isMaxCount, searchValues } = useUserGroup();

  const { type: searchType } = searchValues ?? {};

  // 是否选中
  const getChecked = (option: DataType) => checkedList.some((list) => list.value === option?.value);

  // 复选框是否禁用
  const disabledCheckbox = (option: DataType) => {
    // 如果当前渲染的是userInGroup类型，并且当前这条数据是团队，则禁用
    if (searchType === 'userInGroup' && option?.searchType === 'group') {
      return true;
    }
    // 是否选中
    const isChecked = getChecked(option);
    // 禁用规则： 1. option的disabled； 2. 在不可删除的配置项里并且被选中； 3. 达到最大选择数并且未选中
    return option?.disabled ||
      (unDeleteValues && isChecked && includes(unDeleteValues, option.value)) ||
      (isMaxCount && !isChecked)
      ? true
      : false;
  };

  return {
    getChecked,
    disabledCheckbox,
  };
};

export default useUserGroupUtils;
