import { MsStatus } from '@jaytam/antd-ms';
import { useDeepCompareEffect } from 'ahooks';
import { Space } from 'antd';
import { cloneDeep, remove } from 'lodash-es';
import { useState } from 'react';
import type { UserRowKey } from '../../types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

type T = Record<string, any>;
interface ModalSelectedInfoProps {
  selectRows?: T[];
  changeSelectRows?: (selectRows: T[]) => void;
  rowKey?: UserRowKey;
}

const ModalSelectedInfo = (props: ModalSelectedInfoProps) => {
  const { selectRows = [], changeSelectRows } = props;

  const [selectedRowsList, setSelectedRowsList] = useState<T[]>(cloneDeep(selectRows));
  const { currentLocale } = useLocale('MsUser');

  useDeepCompareEffect(() => {
    setSelectedRowsList(selectRows);
  }, [selectRows]);

  const handleCloseTag = (value: number) => {
    remove(selectedRowsList, (item) => item.value === value);

    changeSelectRows?.(selectedRowsList);
  };

  return (
    <div style={{ marginTop: '24px', display: 'flex' }}>
      <div style={{ whiteSpace: 'nowrap' }}>
        {replaceMessage(currentLocale.selectedCount, { count: selectedRowsList?.length })}
      </div>
      <Space wrap={true}>
        {selectedRowsList?.map((item) => (
          <MsStatus
            key={item?.value}
            type="tag"
            color={item.isGroup ? 'processing' : 'default'}
            closable
            onClose={() => handleCloseTag(item?.value)}
          >
            {item.label}
          </MsStatus>
        ))}
      </Space>
    </div>
  );
};

export default ModalSelectedInfo;
