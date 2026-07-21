import { ApartmentOutlined } from '@ant-design/icons';
import { useDeepCompareEffect, useUpdateEffect } from 'ahooks';
import { Checkbox, List, Skeleton, Tooltip } from 'antd';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { differenceBy, includes, isNil, last, omit, take } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps } from '../types';
import {
  filterBySearchCode,
  findGroupChild,
  flatTreeDeep,
  getColor,
  getOrgTierName,
  highLight,
} from '../utils';
import BreadCrumb from './BreadCrumb';
import CardContainer from './CardContainer';
import useUserGroupRequest from '../hooks/useUserGroupRequest';
import useUserGroupUtils from '../hooks/useUserGroupUtils';

type UserInGroupListType = UserGroupProps & { selectValue?: any };

const UserInGroupList: React.FC<UserInGroupListType> = (props) => {
  const {
    userInGroupProps = {},
    onChange,
    unDeleteValues,
    selectValue,
    maxCount,
    filterSearchResult = true,
  } = props;

  const innerFilterSearchResult = userInGroupProps?.filterSearchResult ?? filterSearchResult;

  const { searchValues, checkedList = [], setCheckedList, isMaxCount } = useUserGroup();

  const { getChecked, disabledCheckbox } = useUserGroupUtils(props);

  const { defaultPositionCode, showBreadCrumb = true, searchCode } = userInGroupProps;

  //搜索栏输入框的值
  const { searchValue, value: currentSelectValue, type: searchType } = searchValues ?? {};

  //控制全选的状态
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  // 属于团队里面的用户列表
  const [userList, setUserList] = useState<DataType>([]);

  // 设置面包屑数据
  const [breadCrumbData, setBreadCrumbData] = useState<DataType>({});

  // 获取用户的options
  const { options, loading, requestUserOptions } = useUserGroupRequest({
    parsingFiledNamesType: 'group',
    ...userInGroupProps,
    id: props?.id + 'userInGroup',
  });

  const [activeList, setActiveList] = useState<DataType[]>();

  /* 获取部门下面的人员 */
  const getUsers = async (item: DataType) => {
    const res = await requestUserOptions(item);
    setUserList(res || []);
    return res;
  };

  // 扁平化团队数据
  const flatList = useMemo(() => flatTreeDeep(options), [options]);

  // 根据定位的code，设置当前list数据
  const positionBreadCrumb = (positionCode?: string) => {
    const loop = (opts: DataType[]) => {
      opts.forEach((item) => {
        if (item?.fullCode === positionCode) {
          const breadCrumbFullCode = item?.fullCode?.split('/')?.filter((o: string) => o) ?? [];
          setActiveList([...item?.children]);
          setBreadCrumbData?.({ ...item, currentFullCode: last(breadCrumbFullCode) });
        } else {
          if (item?.children) {
            loop(item?.children);
          }
        }
      });
    };
    loop(options);
  };
  // 搜索框的值发生改变时
  useDeepCompareEffect(() => {
    if (selectValue !== currentSelectValue) {
      return;
    }
    if (!searchValue) {
      setBreadCrumbData({});
      return setActiveList(options);
    }
    const list = innerFilterSearchResult
      ? filterBySearchCode(flatList, searchValue, searchCode)
      : flatList;
    setActiveList(list ?? []);
  }, [options, searchValue, currentSelectValue, innerFilterSearchResult]);

  // 面包屑的值改变时，展示对应的数据
  useUpdateEffect(() => {
    if (!breadCrumbData?.fullName) {
      getUsers({});
      setActiveList(options);
    }
    const loop = (opts: DataType[]) => {
      opts.forEach(async (item) => {
        const code = item?.fullCode?.split('/');
        if (last(code) === breadCrumbData?.currentFullCode) {
          const valueEnum = await getUsers(item);
          setActiveList([...(valueEnum ?? []), ...item?.children]);
        } else {
          if (item?.children) {
            loop(item?.children);
          }
        }
      });
    };
    loop(options);
  }, [breadCrumbData]);

  // defaultPositionCode 定位到某一个面包屑位置
  useDeepCompareEffect(() => {
    positionBreadCrumb(defaultPositionCode);
  }, [options, defaultPositionCode]);

  const updateValue = (data: DataType[]) => {
    setCheckedList?.(data);
    onChange?.(data);
  };

  const handleChange = (e: CheckboxChangeEvent, item: DataType) => {
    const checked = e.target.checked;
    if (checked) {
      updateValue?.([
        ...checkedList,
        { ...omit(item, 'children'), searchType: item?.searchType ?? searchType },
      ]);
    } else {
      const newList = checkedList.filter((option) => option?.value !== item?.value);
      updateValue?.(newList);
    }
  };

  // 点击下级触发的函数
  const lowerLevel = async (item: DataType) => {
    const valueEnum = await getUsers(item);
    if (searchValue) {
      setActiveList([...(valueEnum ?? []), ...findGroupChild(options, item?.value)?.children]);
    } else {
      setActiveList([...(valueEnum ?? []), ...item?.children]);
      setBreadCrumbData?.(item);
    }
  };

  // 操作区渲染
  const extraRender = (item: DataType) => {
    if (item?.searchType === 'group') {
      return <a onClick={() => lowerLevel(item)}>下级{' >'}</a>;
    }
    return null;
  };

  const getSubTitle = (item: DataType) => {
    if (item.searchType === 'user') {
      return (
        <div className="sub-title">
          <Tooltip placement="bottom" title={item?.fullName}>
            {getOrgTierName(item?.fullName)}
          </Tooltip>
        </div>
      );
    }
    return null;
  };

  // 判断当前团队下的用户是否全选
  useUpdateEffect(() => {
    if (!checkedList.length || !userList.length) {
      setIndeterminate(false);
      setCheckedAll(false);
      return;
    }
    const list = userList.filter((item: DataType) =>
      checkedList.some((val) => val?.value === item?.value),
    );
    setIndeterminate(!!list.length && list.length < userList.length);
    setCheckedAll(list.length === userList.length);
  }, [checkedList, userList, breadCrumbData]);

  // 点击全选或反选
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      // 全选，找出在已选列表和团队下用户列表的差异，把差异添加到已选列表
      const differenceList = differenceBy(userList as [], checkedList, 'value');
      const _list = [...checkedList, ...differenceList];
      // 只提取最大个数的值
      const newList = !isNil(maxCount) ? take(_list, maxCount) : _list;
      setCheckedList?.(newList);
    } else {
      //  反选，团队下用户只要在已选列表中，就删除
      const newList = checkedList.filter(
        (option) => !userList.some((val: DataType) => val?.value === option?.value),
      );
      setCheckedList?.(newList ?? []);
    }
    setIndeterminate(false);
    setCheckedAll(e.target.checked);
  };

  const checkboxRender = (item: DataType) => {
    let disabled = item?.disabled;
    if (item?.searchType === 'group') {
      disabled = true;
    } else if (
      (unDeleteValues && getChecked(item) && includes(unDeleteValues, item.value)) ||
      (isMaxCount && !getChecked(item))
    ) {
      disabled = true;
    }
    disabledCheckbox(item);
    return (
      <Checkbox
        className="list-checkbox"
        checked={getChecked(item)}
        disabled={disabled}
        onChange={(e: CheckboxChangeEvent) => handleChange(e, item)}
      >
        <div className="list-content">
          <div className="checkbox" style={{ backgroundColor: getColor(item) }}>
            {item?.searchType === 'user' ? item.label?.charAt(0) : <ApartmentOutlined />}
          </div>
          <div className="content">
            <div className="title" title={item?.fullName}>
              {highLight(item?.label, searchValue)}
              {item?.position && <span className="position"> - {item.position}</span>}
            </div>
            {getSubTitle(item)}
          </div>
        </div>
      </Checkbox>
    );
  };

  if (searchType !== 'userInGroup' || selectValue !== currentSelectValue) {
    return null;
  }

  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} style={{ marginTop: 16 }} />;
  }
  return (
    <>
      <CardContainer {...userInGroupProps}>
        {/* 面包屑 */}
        {showBreadCrumb && (
          <BreadCrumb
            {...props}
            organizationName={userInGroupProps?.organizationName}
            breadCrumbData={breadCrumbData}
            setBreadCrumbData={setBreadCrumbData}
          />
        )}

        {!!activeList?.length && (
          <div style={{ marginTop: '8px' }}>
            <Checkbox
              indeterminate={indeterminate}
              disabled={!userList.length || isMaxCount}
              checked={checkedAll}
              onChange={onCheckAllChange}
            >
              全选
            </Checkbox>
          </div>
        )}

        <List
          split={false}
          itemLayout="horizontal"
          dataSource={activeList}
          style={{ paddingBottom: '12px' }}
          renderItem={(item) => (
            <List.Item extra={extraRender(item)}>
              <div className="list check-list">{checkboxRender(item)}</div>
            </List.Item>
          )}
        />
      </CardContainer>
    </>
  );
};

export default UserInGroupList;
