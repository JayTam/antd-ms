import { useState } from 'react';
import UserAvatar from './UserAvatar';
import UserDetailPopover from './UserDetailPopover';
import { Popover } from 'antd';
import SearchPopover from './SearchPopover';
import { useUserPopover } from '../contexts/userPopover';
import type { DataType } from '../types';

const SingleUser = (props: any) => {
  const { userData, showDelete, showEdit } = props;
  // 控制编辑popover的显隐
  const [editOpen, setEditOpen] = useState(false);
  // 控制详情popover的显隐
  const [detailOpen, setDetailOpen] = useState(false);

  const { selectedList, setSelectedList, frequentContacts, defaultOptions } = useUserPopover();

  const handleChange = (v?: DataType) => {
    if (!v || !userData) {
      return;
    }
    setSelectedList((prev: DataType[]) => {
      const res = [...prev];
      const findIndex = prev.findIndex((item) => item.value === userData.value);
      res[findIndex] = v;
      return res;
    });
  };

  if (showEdit) {
    return (
      <Popover
        overlayClassName="user-popover-wrap"
        placement={props.placement}
        getPopupContainer={props.getPopupContainer}
        {...(props?.addPopoverProps ?? {})}
        content={
          editOpen && (
            <SearchPopover
              {...props}
              defaultOptions={defaultOptions}
              selectItem={handleChange}
              selectedList={selectedList}
              frequentContacts={frequentContacts}
              clickOpen={(newOpen: boolean) => setEditOpen(newOpen)}
            />
          )
        }
        trigger="click"
        open={editOpen}
        onOpenChange={setEditOpen}
      >
        <UserDetailPopover
          userData={userData}
          {...props}
          detailOpen={detailOpen}
          setDetailOpen={setDetailOpen}
        >
          <UserAvatar
            icon={userData?.label}
            {...props}
            userData={userData}
            showDelete={showDelete}
            onEdit={() => {
              setEditOpen(true);
              setDetailOpen(false);
            }}
            setDetailOpen={setDetailOpen}
          />
        </UserDetailPopover>
      </Popover>
    );
  }

  return (
    <UserDetailPopover
      userData={userData}
      {...props}
      detailOpen={detailOpen}
      setDetailOpen={setDetailOpen}
    >
      <UserAvatar
        icon={userData?.label}
        {...props}
        userData={userData}
        showDelete={showDelete}
        setDetailOpen={setDetailOpen}
      />
    </UserDetailPopover>
  );
};

export default SingleUser;
