import { ApartmentOutlined } from '@ant-design/icons';
import { useDeepCompareEffect } from 'ahooks';
import { Checkbox, List, Skeleton, Tooltip } from 'antd';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { last, omit } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps } from '../types';
import { filterBySearchCode, flatTreeDeep, getColor, getOrgTierName, highLight } from '../utils';
import CardContainer from './CardContainer';
import useUserGroupRequest from '../hooks/useUserGroupRequest';
import BreadCrumb from './BreadCrumb';
import useUserGroupUtils from '../hooks/useUserGroupUtils';

type GroupListType = UserGroupProps & {
  selectValue?: any;
};

const GroupList: React.FC<GroupListType> = (props) => {
  const { groupProps = {}, onChange, selectValue, filterSearchResult = true } = props;

  const innerFilterSearchResult = groupProps?.filterSearchResult ?? filterSearchResult;
  const { searchValues, checkedList = [], setCheckedList } = useUserGroup();

  const { getChecked, disabledCheckbox } = useUserGroupUtils(props);

  const { defaultPositionCode, showBreadCrumb = true, searchCode } = groupProps;

  //搜索栏输入框的值
  const { searchValue, value: currentSelectValue, type: searchType } = searchValues ?? {};

  // 获取用户的options
  const { options, loading, requestUserOptions } = useUserGroupRequest({
    parsingFiledNamesType: 'group',
    ...groupProps,
    id: props?.id + 'group',
  });

  const [activeList, setActiveList] = useState<DataType[]>();

  // 设置面包屑数据
  const [breadCrumbData, setBreadCrumbData] = useState<DataType>({});

  const flatList = useMemo(() => flatTreeDeep(options), [options]);

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
  useDeepCompareEffect(() => {
    if (!breadCrumbData?.fullName) {
      requestUserOptions({});
      setActiveList(options);
    }
    const loop = (opts: DataType[]) => {
      opts?.forEach(async (item) => {
        const code = item?.fullCode?.split('/');
        if (last(code) === breadCrumbData?.currentFullCode) {
          const valueEnum = await requestUserOptions(item);
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
    const loop = (opts: DataType[]) => {
      opts?.forEach((item) => {
        if (item?.fullCode === defaultPositionCode) {
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
    const valueEnum = await requestUserOptions(item);
    setActiveList([...(valueEnum ?? []), ...item?.children]);
    setBreadCrumbData?.(item);
  };

  // 操作区渲染
  const extraRender = (item: DataType) => {
    if (!searchValue && item?.searchType === 'group') {
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

  if (searchType !== 'group' || selectValue !== currentSelectValue) {
    return null;
  }

  if (loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} style={{ marginTop: 16 }} />;
  }
  return (
    <>
      <CardContainer {...groupProps}>
        {/* 面包屑 */}
        {showBreadCrumb && (
          <BreadCrumb
            {...props}
            organizationName={groupProps?.organizationName}
            breadCrumbData={breadCrumbData}
            setBreadCrumbData={setBreadCrumbData}
          />
        )}
        <List
          split={false}
          itemLayout="horizontal"
          dataSource={activeList}
          style={{ paddingBottom: '12px' }}
          renderItem={(item) => (
            <List.Item extra={extraRender(item)}>
              <div className="list check-list">
                <Checkbox
                  className="list-checkbox"
                  checked={getChecked(item)}
                  disabled={disabledCheckbox(item)}
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
              </div>
            </List.Item>
          )}
        />
      </CardContainer>
    </>
  );
};

export default GroupList;
