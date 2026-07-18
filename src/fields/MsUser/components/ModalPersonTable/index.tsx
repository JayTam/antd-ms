import { useDeepCompareEffect } from 'ahooks';
import { Table } from 'antd';
import { cloneDeep, forEach, remove } from 'lodash-es';
import { useState } from 'react';
import type { UserMode, UserRowKey } from '../../types';
import './style.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type T = Record<string, any>;

interface ModalPersonTableProps {
  personList?: T[];
  changeSelectRows?: (val: T[]) => void;
  tabsId?: string;
  selectRows?: T[];
  rowKey?: UserRowKey;
  isGroup?: boolean;
  mode?: UserMode;
}

const ModalPersonTable = (props: ModalPersonTableProps) => {
  const {
    personList,
    selectRows = [],
    tabsId = '1',
    changeSelectRows,
    isGroup = false,
    mode,
  } = props;

  const [selectedRowsList, setSelectedRowsList] = useState<T[]>(cloneDeep(selectRows));
  const { currentLocale } = useLocale('MsUser');

  useDeepCompareEffect(() => {
    setSelectedRowsList(selectRows);
  }, [selectRows]);

  const updateValue = (list: T[]) => {
    changeSelectRows?.(list ?? []);
  };

  const handleOnSelect = (record: T, selected: boolean) => {
    // 勾选
    if (selected) {
      updateValue(
        mode
          ? [...selectedRowsList, { ...record, tabsId, isGroup }]
          : [{ ...record, tabsId, isGroup }],
      );
    } else {
      //取消勾选
      remove(
        selectedRowsList,
        (item: T) => item.tabsId === tabsId && item?.value === record?.value,
      );
      updateValue([...selectedRowsList]);
    }
  };

  // 全选或全部取消勾选
  const handleSelectAll = (selected: boolean, selectedRows: T[], changeRows: T[]) => {
    // 勾选
    if (selected) {
      forEach(changeRows, (item: T) => {
        item.tabsId = tabsId;
        item.isGroup = isGroup;
      });
      updateValue([...selectedRowsList, ...changeRows]);
    } else {
      // //取消勾选
      const newList =
        selectedRowsList.filter((item) => {
          // 对比已选数据和取消勾选的数据，如果已选数据在取消勾选数据中存在，则过滤掉
          if (item?.tabsId === tabsId) {
            return changeRows.find((val: T) => val?.value === item?.value) ? false : true;
          }
          return true;
        }) ?? [];
      updateValue([...newList]);
    }
  };

  const columns = [
    {
      title: currentLocale.name,
      dataIndex: `cname`,
    },
    {
      title: currentLocale.email,
      dataIndex: `email`,
    },
    {
      title: currentLocale.position,
      dataIndex: 'position',
    },
  ];

  return (
    <>
      <Table
        bordered
        className="ms-user-table"
        scroll={{ y: 230 }}
        size="small"
        rowKey={'value'}
        columns={columns}
        dataSource={personList}
        pagination={false}
        rowSelection={{
          selectedRowKeys: selectRows?.map((i: T) => i?.value),
          onSelect: handleOnSelect,
          onSelectAll: handleSelectAll,
          hideSelectAll: mode ? false : true,
        }}
      />
    </>
  );
};

export default ModalPersonTable;
