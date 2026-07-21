import { ApartmentOutlined, CloseOutlined } from '@ant-design/icons';
import { Tooltip, List, Empty } from 'antd';
import { includes } from 'lodash-es';
import { useUserGroup } from '../../contexts/userGroup';
import type { DataType, UserGroupProps } from '../../types';
import { getColor, getOrgTierName } from '../../utils';
import VirtualList from 'rc-virtual-list';

const CheckedList: React.FC<UserGroupProps> = (props) => {
  const { onChange, unDeleteValues } = props;
  const { checkedList = [], setCheckedList, userGroupRef } = useUserGroup();

  const deleteCheck = (item: DataType) => {
    const newList = checkedList.filter((option) => option?.value !== item?.value);
    setCheckedList?.(newList);
    onChange?.(newList);
  };

  const deleteIconRender = (item: DataType) => {
    const showDeleteIcon = unDeleteValues && includes(unDeleteValues, item.value) ? false : true;
    if (showDeleteIcon) {
      return <CloseOutlined className="icon-x" onClick={() => deleteCheck(item)} />;
    }
    return null;
  };

  const subTitleRender = (item: DataType) => {
    if (item?.searchType === 'user') {
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

  const contentHeight = () => {
    return (userGroupRef?.current?.getBoundingClientRect()?.height || 0) - 50;
  };

  if (checkedList?.length <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }

  return (
    <VirtualList
      data={checkedList}
      height={contentHeight()}
      itemHeight={50}
      itemKey="value"
      style={{
        paddingRight: 20,
      }}
    >
      {(item) => (
        <List.Item extra={deleteIconRender(item)}>
          <div className={'list'}>
            <div className="list-content">
              <div className="checkbox" style={{ backgroundColor: getColor(item) }}>
                {item?.searchType === 'user' ? item.label?.charAt(0) : <ApartmentOutlined />}
              </div>
              <div className="content">
                <div className="title" title={item?.fullName}>
                  {item?.label}
                  {item?.position && <span className="position"> - {item.position}</span>}
                </div>
                {subTitleRender(item)}
              </div>
            </div>
          </div>
        </List.Item>
      )}
    </VirtualList>
  );
};

export default CheckedList;
