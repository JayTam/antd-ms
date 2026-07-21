import { Popover, Skeleton } from 'antd';
import { isFunction } from 'lodash-es';
import React, { useState } from 'react';
import type { DataType, UserPopoverProps } from '../../types';
import { getOrgTierName } from '../../utils/searchUser';
import { formatValue } from '../../utils/valueToEnum';
import CopyableTitle from '../CopyableTitle';
import UserAvatar from '../UserAvatar';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type UserDetailPopoverProps = UserPopoverProps & {
  children?: React.ReactNode;
  userData?: DataType;
  readonly?: boolean;
  detailOpen?: boolean;
  setDetailOpen?: (open: boolean) => void;
};

const UserDetailPopover = (props: UserDetailPopoverProps) => {
  const {
    children,
    userData,
    hoverRequest,
    hoverPostRes = (res) => res?.data,
    hoverEnumFiledNames,
    tooltipTitleRender,
    detailPlacement = 'bottom',
    showToolTip = true,
    detailOpen,
    setDetailOpen,
  } = props;

  const { globalLocale } = useLocale();
  const [loading, setLoading] = useState(false);
  const [hoverData, setHoverData] = useState<DataType>();

  // 获取hover时的单个人员的详情
  const getHoverData = async () => {
    if (isFunction(hoverRequest)) {
      setLoading(true);
      const originRes = await hoverRequest(userData);
      const res = isFunction(hoverPostRes) ? hoverPostRes(originRes) : originRes;
      setLoading(false);
      const resObj = formatValue([res], hoverEnumFiledNames)[0];
      return resObj;
    } else {
      return userData;
    }
  };

  const contentRender = () => {
    if (loading) return <Skeleton.Input active style={{ height: 26 }} />;

    // 传入的tooltipTitleRender是函数
    if (isFunction(tooltipTitleRender)) {
      return tooltipTitleRender?.(hoverData);
    }
    if (tooltipTitleRender) {
      return tooltipTitleRender;
    }

    return (
      <>
        {/* 邮箱无值则不展示 */}
        {hoverData?.email ? (
          <div className="inner-item">
            <label>{globalLocale.email}</label>
            <span className="item-content">{hoverData?.email}</span>
            <CopyableTitle title={hoverData?.email} />
          </div>
        ) : null}
        {/* 部门无值则不展示 */}
        {hoverData?.fullName ? (
          <div className="inner-item">
            <label>{globalLocale.department}</label>
            <span className="item-content">
              {getOrgTierName(hoverData?.fullName)}
              <CopyableTitle title={hoverData?.fullName} />
            </span>
          </div>
        ) : null}
        {/* 职位无值则不展示 */}
        {hoverData?.position ? (
          <div className="inner-item">
            <label>{globalLocale.position}</label>
            <span className="item-content">
              {getOrgTierName(hoverData?.position)}
              <CopyableTitle title={hoverData?.position} />
            </span>
          </div>
        ) : null}
      </>
    );
  };

  // 详情的title渲染
  const titleRender = () => {
    const name = hoverData?.label || userData?.label;
    if (loading) {
      return <Skeleton.Input active style={{ height: 26, width: '60px', minWidth: '60px' }} />;
    }
    return (
      <div className="title-name-box">
        <UserAvatar icon={name} showDelete={false} />
        <CopyableTitle title={name} />
      </div>
    );
  };

  if (!showToolTip) {
    return <span className="user-avatar">{children}</span>;
  }

  return (
    <>
      <Popover
        title={titleRender()}
        onOpenChange={async (open) => {
          setDetailOpen?.(open);
          if (open) {
            const data = await getHoverData();
            setHoverData(data);
          } else {
            setTimeout(() => {
              setHoverData(undefined);
            }, 100);
          }
        }}
        content={contentRender()}
        overlayClassName={`user-detail-popover ${contentRender() ? '' : 'inner-content-hidden'}`}
        placement={detailPlacement}
        open={detailOpen}
      >
        <span className="user-avatar">{children}</span>
      </Popover>
    </>
  );
};

export default UserDetailPopover;
