import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Row } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { isString } from 'lodash-es';
import { useRef } from 'react';
import type { MsTableColumnType } from '../types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

/**
 * 表头筛选，自定义筛选组件，目前仅支持 text
 * @returns
 */
const useTableFilterSearch = () => {
  const searchInput = useRef<InputRef>(null);
  const { currentLocale, globalLocale } = useLocale('MsTable');

  const getColumnSearchProps = (column: MsTableColumnType): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      const placeholder =
        (column.fieldProps as any)?.placeholder ??
        (isString(column.title)
          ? replaceMessage(currentLocale.inputTitle, { title: column.title })
          : currentLocale.pleaseInput);

      return (
        <div onKeyDown={(e) => e.stopPropagation()}>
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInput}
              placeholder={placeholder}
              value={selectedKeys[0] as string}
              onChange={(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
            />
          </div>

          <Row
            justify="space-between"
            style={{ padding: '7px 8px', borderTop: '1px solid #f0f0f0' }}
          >
            <Button type="link" size="small" onClick={() => clearFilters?.()}>
              {globalLocale.reset}
            </Button>
            <Button type="primary" size="small" onClick={() => confirm()}>
              {globalLocale.submit}
            </Button>
          </Row>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  return {
    getColumnSearchProps,
  };
};

export default useTableFilterSearch;
