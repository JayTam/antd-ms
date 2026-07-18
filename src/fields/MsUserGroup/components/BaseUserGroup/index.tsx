import { useControllableValue } from 'ahooks';
import { Card, Col, Popconfirm, Row } from 'antd';
import { isNil } from 'lodash-es';
import React, { forwardRef, useRef } from 'react';
import GroupList from '../../components/GroupList';
import Search from '../../components/Search';
import UserInGroupList from '../../components/UserInGroupList';
import UserList from '../../components/UserList';
import { UserGroupContext } from '../../contexts/userGroup';
import type { DataType, UserGroupProps } from '../../types';
import CheckedList from '../CheckedList';
import UserInWikiGroupList from '../UserInWikiGroupList';
import './index.less';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const MsFieldUserGroup = forwardRef<any, UserGroupProps>((props) => {
  const {
    searchType = [],
    style,
    searchTypeEnum,
    maxCount,
    showClearAllSelected,
    clearAllPopconfirmProps,
  } = props;

  const userGroupRef = useRef<HTMLDivElement>(null);

  // 已选的数据
  const [checkedList, setCheckedList] = useControllableValue(props);
  const { currentLocale } = useLocale('MsUserGroup');

  //搜索数据
  const [searchValues, setSearchValues] = useControllableValue(props, {
    valuePropName: 'searchValues',
    trigger: 'setSearchValues',
  });

  /** 是否显示一键清除 */
  const innerShowClearAllSelected = showClearAllSelected && !!checkedList?.length;

  /** 一键清除是否使用popconfirm */
  const useClearAllPopConfirm = clearAllPopconfirmProps !== false;

  const listRender = () => {
    const renderConfig = (item: DataType) => {
      if (item?.type === 'group') {
        return <GroupList groupProps={item?.props} selectValue={item?.value} {...props} />;
      }
      if (item?.type === 'userInGroup') {
        return (
          <UserInGroupList userInGroupProps={item?.props} selectValue={item?.value} {...props} />
        );
      }
      if (item?.type === 'userInWikiGroup') {
        return (
          <UserInWikiGroupList
            userInWikiGroupProps={item?.props}
            selectValue={item?.value}
            {...props}
          />
        );
      }
      if (item.type) {
        return (
          <UserList
            userProps={item?.props}
            selectValue={item?.value}
            dataType={item?.type}
            {...props}
          />
        );
      }
    };

    if (searchTypeEnum) {
      return searchTypeEnum.map((item) => renderConfig(item));
    }
    if (searchType) {
      return searchType.map((item: string) => renderConfig({ type: item, value: item }));
    }
  };

  return (
    <UserGroupContext.Provider
      value={{
        searchValues,
        setSearchValues,
        checkedList,
        setCheckedList,
        isMaxCount: !isNil(maxCount) && checkedList?.length >= maxCount ? true : false,
        userGroupRef,
      }}
    >
      <div className="ms-user-group" ref={userGroupRef}>
        <Row
          gutter={16}
          style={{ height: '350px', ...style }}
          className="ms-user-group"
          ref={userGroupRef}
        >
          <Col span={14} style={{ height: '100%' }}>
            {/* 搜索 */}
            <Search {...props} />
            {listRender()}
          </Col>
          <Col span={10} style={{ height: '100%' }}>
            <Card
              title={
                <div className={'ms-user-group-selected'}>
                  <span>
                    {replaceMessage(currentLocale.selectedCount, {
                      count: checkedList?.length || 0,
                    })}
                  </span>
                  {innerShowClearAllSelected &&
                    (useClearAllPopConfirm ? (
                      <Popconfirm
                        title={currentLocale.cleanAllConfirm}
                        {...(clearAllPopconfirmProps || {})}
                        onConfirm={() => {
                          setCheckedList([]);
                          clearAllPopconfirmProps?.onConfirm?.();
                        }}
                      >
                        <span className={'ms-user-group-clear-all'}>{currentLocale.cleanAll}</span>
                      </Popconfirm>
                    ) : (
                      <span
                        className={'ms-user-group-clear-all'}
                        onClick={() => setCheckedList([])}
                      >
                        {currentLocale.cleanAll}
                      </span>
                    ))}
                </div>
              }
              style={{ height: '100%' }}
            >
              <CheckedList {...props} />
            </Card>
          </Col>
        </Row>
      </div>
    </UserGroupContext.Provider>
  );
});

export default MsFieldUserGroup;
