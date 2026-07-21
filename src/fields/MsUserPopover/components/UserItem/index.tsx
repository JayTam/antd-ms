import { CloseCircleFilled } from '@ant-design/icons';
import { List, Tooltip } from 'antd';
import { includes, isFunction } from 'lodash-es';

import type { DataType, UserPopoverProps } from '../../types';
import { getAvatarBgColor, getOrgTierName } from '../../utils/searchUser';
import './index.less';

type UserItemType = UserPopoverProps & {
  onSelectClick?: () => void;
  itemData: DataType;
  // 是否可选
  isSelect?: boolean;
  // 是否只读
  readonly?: boolean;
  // 是否显示删除图标
  showDeleteIcon?: boolean;
  // 删除函数
  deleteUser?: (item: DataType) => void;
};

const UserItem = (props: UserItemType) => {
  const {
    itemData,
    onSelectClick,
    isSelect = true,
    addToolTip = true,
    placement,
    readonly,
    unDeleteValues,
    showDeleteIcon,
    deleteUser,
  } = props;

  // 判断是否渲染删除图标
  const isShowDelete = () => {
    const icon = (
      <CloseCircleFilled className="user-close" onClick={() => deleteUser?.(itemData)} />
    );

    if (readonly || !showDeleteIcon) {
      return null;
    }
    if (unDeleteValues && includes(unDeleteValues, itemData?.value)) {
      return null;
    }

    return icon;
  };

  const contentRender = (
    <div
      className="list-content"
      onClick={() => onSelectClick?.()}
      style={{ cursor: isSelect ? 'pointer' : 'auto' }}
    >
      <div className="checkbox" style={{ backgroundColor: getAvatarBgColor(itemData?.label) }}>
        {itemData?.label?.charAt(0)}
      </div>
      <div className="content">
        <div className="title">
          <span title={itemData?.label}>{itemData?.label}</span>
          <span className="position" title={itemData?.position}>
            {itemData?.position}
          </span>
          {isShowDelete()}
        </div>
        {isSelect && <div className="sub-title">{getOrgTierName(itemData?.fullName)}</div>}
      </div>
    </div>
  );

  const toolTipRender = () => {
    if (addToolTip) {
      // toolTip的title
      const title = isFunction(addToolTip) ? addToolTip(itemData) : itemData?.fullName;

      return (
        <Tooltip placement={placement} title={title} overlayClassName="tooltip-max-width">
          {contentRender}
        </Tooltip>
      );
    }

    return contentRender;
  };

  return (
    <>
      <List.Item>
        <div className="popover-wrapper-list">{toolTipRender()}</div>
      </List.Item>
    </>
  );
};

export default UserItem;
