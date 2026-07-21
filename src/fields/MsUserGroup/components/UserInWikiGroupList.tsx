import { ApartmentOutlined } from '@ant-design/icons';
import { useDeepCompareEffect, useUpdateEffect, useDebounceFn } from 'ahooks';
import { Checkbox, List, Skeleton, Spin, Tooltip } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { debounce, differenceBy, isNil, take, uniqBy } from 'lodash-es';
import React, { useState } from 'react';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps } from '../types';
import { getColorByFirstChar, getOrgTierName, highLight } from '../utils';
import CardContainer from './CardContainer';
import useUserGroupRequest from '../hooks/useUserGroupRequest';
import VirtualList from 'rc-virtual-list';
import useUserGroupUtils from '../hooks/useUserGroupUtils';

type UserInWikiGroupListType = UserGroupProps & {
  selectValue?: any;
};

const UserInWikiGroupList: React.FC<UserInWikiGroupListType> = (props) => {
  const { userInWikiGroupProps = {}, onChange, selectValue, maxCount } = props;
  const {
    searchValues,
    checkedList = [],
    setCheckedList,
    isMaxCount,
    userGroupRef,
  } = useUserGroup();

  const { getChecked, disabledCheckbox } = useUserGroupUtils(props);

  const { showCheckAll = false } = userInWikiGroupProps;

  const { searchValue, value: currentSelectValue, type: searchType } = searchValues ?? {};

  const [list, setList] = useState<DataType[]>();

  //控制全选的状态
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);

  // 获取用户的options
  const { options, loading, hasMore, userLoading, requestUserOptions } = useUserGroupRequest({
    parsingFiledNamesType: 'userInWikiGroup',
    ...userInWikiGroupProps,
    id: props?.id + 'userInWikiGroup',
  });

  const changeSearchUserOptions = async () => {
    if (!searchValue || selectValue !== searchValues?.value) {
      return setList(options);
    }
    // 如果是当前页面并且搜索框有值则去搜索
    if (searchValue && selectValue === searchValues?.value) {
      const res = await requestUserOptions(searchValue);
      setList(res);
    }
  };

  useDeepCompareEffect(() => {
    changeSearchUserOptions();
  }, [options, searchValue, searchValues, selectValue]);

  const updateValue = (data: DataType[]) => {
    setCheckedList?.(data);
    onChange?.(data);
  };

  const handleChange = (e: CheckboxChangeEvent, item: DataType) => {
    const checked = e.target.checked;
    if (checked) {
      updateValue?.([...checkedList, { ...item, searchType: 'user' }]);
    } else {
      const newList = checkedList.filter((option) => option?.value !== item?.value);
      updateValue?.(newList);
    }
  };

  // 判断当前团队下的用户是否全选
  useUpdateEffect(() => {
    if (!list?.length) {
      setIndeterminate(false);
      setCheckedAll(false);
      return;
    }
    const newList = list.filter((item: DataType) =>
      checkedList.some((val) => val?.value === item?.value),
    );
    setIndeterminate(!!newList.length && newList.length < list.length);
    setCheckedAll(list.length === newList.length);
  }, [checkedList, list]);

  // 点击全选或反选
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      // 全选，找出在已选列表和常用联系人列表的差异，把差异添加到已选列表
      const differenceList = differenceBy(list as [], checkedList, 'value');
      const _list = [...checkedList, ...differenceList];
      const newList = !isNil(maxCount) ? take(_list, maxCount) : _list;
      setCheckedList?.(newList);
    } else {
      //  反选，团队下用户只要在已选列表中，就删除
      const newList = checkedList.filter(
        (option) => !list?.some((val: DataType) => val?.value === option?.value),
      );
      setCheckedList?.(newList ?? []);
    }
    setIndeterminate(false);
    setCheckedAll(e.target.checked);
  };

  const contentHeight = () => {
    const userGroupHeight = userGroupRef?.current?.clientHeight || 0;

    return userGroupHeight - (showCheckAll ? 126 : 98);
  };

  // 加载更多
  const { run: handleLoadClick } = useDebounceFn(
    async () => {
      const res = await requestUserOptions?.(searchValue);
      setList((pre) => uniqBy([...(pre ?? []), ...(res ?? [])], 'value'));
    },
    { wait: 300 },
  );

  if (searchType !== 'userInWikiGroup' || selectValue !== currentSelectValue) {
    return null;
  }

  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} style={{ marginTop: 16 }} />;
  }
  return (
    <>
      <CardContainer
        {...userInWikiGroupProps}
        cardExtra={
          <>
            {hasMore && searchType === 'userInWikiGroup' && list?.length ? (
              <div onClick={handleLoadClick} className="userWikiLoadMore">
                加载更多
              </div>
            ) : null}
          </>
        }
      >
        {showCheckAll && (
          <div style={{ marginTop: '8px' }}>
            <Checkbox
              indeterminate={indeterminate}
              disabled={!list?.length || isMaxCount}
              checked={checkedAll}
              onChange={onCheckAllChange}
            >
              全选
            </Checkbox>
          </div>
        )}
        <Spin spinning={userLoading}>
          <VirtualList data={list ?? []} height={contentHeight()} itemHeight={50} itemKey="value">
            {(item) => (
              <List.Item>
                <div className="list check-list">
                  <Checkbox
                    className="list-checkbox"
                    checked={getChecked(item)}
                    onChange={(e: CheckboxChangeEvent) => handleChange(e, item)}
                    disabled={disabledCheckbox(item)}
                  >
                    <div className="list-content ">
                      <div
                        className="checkbox"
                        style={{ backgroundColor: getColorByFirstChar(item?.label) }}
                      >
                        {item.label ? item.label?.charAt(0) : <ApartmentOutlined />}
                      </div>
                      <div className="content">
                        <div className="title">
                          {highLight(item?.label, searchValue)}
                          {item?.position && <span className="position"> - {item.position}</span>}
                        </div>
                        <div className="sub-title">
                          <Tooltip placement="bottom" title={item?.fullName}>
                            {getOrgTierName(item?.fullName)}
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </Checkbox>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </Spin>
      </CardContainer>
    </>
  );
};

export default UserInWikiGroupList;
