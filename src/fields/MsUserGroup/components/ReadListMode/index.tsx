import { ApartmentOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import type { DisableStatusType, UserGroupProps } from '../../types';
import { getColor } from '../../utils';
import './index.less';
import { getLabelInOptions } from '@jaytam/antd-ms/components/MsField/tools/valueInOptions';
import { isEmpty, isNil } from 'lodash-es';

const ReadListMode: React.FC<UserGroupProps & DisableStatusType> = (props) => {
  const { value, _disableStatus } = props;

  /**
   * 获取 label 的方法
   */
  const getLabel = useCallback(
    (splitStr?: string) => {
      if (isNil(value) || isEmpty(value)) return null;
      return getLabelInOptions(value, value, splitStr, _disableStatus);
    },
    [_disableStatus, value],
  );

  if (_disableStatus) return getLabel();

  return (
    <>
      <div className="user-group-read">
        {value?.map((item, index) => (
          <div key={item?.value ?? index} className="checked-item">
            <div className="pre-icon" style={{ backgroundColor: getColor(item) }}>
              {item?.searchType === 'user' ? item.label?.charAt(0) : <ApartmentOutlined />}
            </div>

            <div className="content">
              <div className="title" title={item?.fullName}>
                {item?.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReadListMode;
