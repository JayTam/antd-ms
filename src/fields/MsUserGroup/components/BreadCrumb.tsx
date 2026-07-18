import { RightOutlined } from '@ant-design/icons';
import { last } from 'lodash-es';
import React from 'react';
import { useUserGroup } from '../contexts/userGroup';
import type { DataType, UserGroupProps } from '../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type BreadCrumbProps = UserGroupProps & {
  breadCrumbData?: DataType;
  setBreadCrumbData?: (data: DataType) => void;
  organizationName?: React.ReactNode;
};

const BreadCrumb: React.FC<BreadCrumbProps> = (props) => {
  const { currentLocale } = useLocale('MsUserGroup');
  const { organizationName = currentLocale.ms, breadCrumbData, setBreadCrumbData } = props;
  const { searchValues } = useUserGroup();

  const breadCrumbFullName = breadCrumbData?.fullName?.split('-') ?? [];

  const breadCrumbFullCode = breadCrumbData?.fullCode?.split('/')?.filter((o: string) => o) ?? [];

  // 切换面包屑
  const switchBread = (index: number) => {
    const fullName = breadCrumbFullName.slice(0, index + 1);
    const fullCode = breadCrumbFullCode.slice(0, index + 1);
    setBreadCrumbData?.({
      fullName: fullName.join('-'),
      fullCode: fullCode.join('/'),
      currentFullCode: last(fullCode),
    });
  };

  // 点击首条数据
  const handleClickFirst = () => {
    setBreadCrumbData?.({});
  };
  if (searchValues?.searchValue || searchValues?.type === 'user') {
    return null;
  }

  const breadCrumbRender = () => {
    const len = breadCrumbFullName.length;
    return breadCrumbFullName.map((item: string, index: number) => {
      let nodeRender: React.ReactNode;
      if (index < len - 1) {
        nodeRender = (
          <>
            <a onClick={() => switchBread(index)}>{item}</a>
            <RightOutlined style={{ color: '#666', margin: '0 3px' }} />
          </>
        );
      } else {
        nodeRender = item;
      }
      return <span key={index}>{nodeRender}</span>;
    });
  };

  const firstBreadRender = () => {
    if (breadCrumbFullName?.length <= 0) {
      return organizationName;
    }
    return (
      <>
        <a onClick={() => handleClickFirst()}>{organizationName}</a>
        <RightOutlined style={{ color: '#666', margin: '0 3px' }} />
      </>
    );
  };
  return (
    <div style={{ whiteSpace: 'normal', marginTop: '12px' }}>
      {firstBreadRender()}
      {breadCrumbRender()}
    </div>
  );
};

export default BreadCrumb;
