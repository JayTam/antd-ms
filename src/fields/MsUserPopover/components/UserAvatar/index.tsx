import { CloseCircleFilled, EditOutlined } from '@ant-design/icons';
import type { AvatarProps } from 'antd';
import { Avatar, Badge } from 'antd';
import { indexOf } from 'lodash-es';
import { useUserPopover } from '../../contexts/userPopover';
import type { DataType, UserPopoverProps } from '../../types';
import { getAvatarBgColor } from '../../utils/searchUser';

import './index.less';

type UserAvatarProps = Omit<AvatarProps, 'icon'> &
  UserPopoverProps & {
    icon?: string;
    // 是否显示姓名
    name?: boolean;
    userData?: DataType;
    // 是否显示删除按钮
    showDelete?: boolean;
    // 是否可以编辑用户
    showEdit?: boolean;
    // 点击编辑回调
    onEdit?: () => void;
    setDetailOpen?: (open?: boolean) => void;
  };

const UserAvatar = (props: UserAvatarProps) => {
  const {
    icon,
    name = true,
    unDeleteValues,
    showDelete = true,
    userData,
    setDetailOpen,
    onEdit,
  } = props;

  const { deleteUser } = useUserPopover();

  const onDelete = () => {
    setDetailOpen?.(false);
    deleteUser?.(userData);
  };

  // 渲染删除图标
  const deleteIcon = () => {
    if (!showDelete) {
      return null;
    }

    if (unDeleteValues && indexOf(unDeleteValues, userData?.value) !== -1) {
      return null;
    }
    return (
      <div className="delete-button" onClick={() => onDelete()}>
        <CloseCircleFilled style={{ color: '#F54545' }} />
      </div>
    );
  };

  if (!icon) return <></>;

  // 头像渲染
  const avatarRender = (
    <Badge count={deleteIcon()} offset={[-3, 3]}>
      <Avatar size="small" style={{ backgroundColor: getAvatarBgColor(icon) }}>
        {icon?.charAt(0)}
      </Avatar>
    </Badge>
  );

  // 展示头像
  if (!name) return avatarRender;

  // 展示头像 + 姓名
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {avatarRender}
      <div className="user-avatar-name" style={{ marginLeft: '8px', color: '#464F5C' }}>
        {icon}
      </div>
      {props.showEdit && (
        <div
          className="user-avatar-name"
          style={{ marginLeft: '8px', cursor: 'pointer' }}
          onClick={() => onEdit?.()}
        >
          <EditOutlined />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
