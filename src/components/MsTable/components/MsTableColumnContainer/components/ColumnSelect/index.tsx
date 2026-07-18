import { MsEmpty } from '@jaytam/antd-ms/components';
import { MsArrowDownSmOutlined, MsArrowRightSmOutlined } from '@jaytam/icons';
import { Checkbox, Collapse, Input, Typography } from 'antd';

import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { isNil } from 'lodash-es';
import { useMemo, useState } from 'react';
import { groupColumns } from '../../utils/group';
import ColumnSelectCheckboxes from './ColumnSelectCheckboxes';
import './index.less';
import type { ColumnSelectProps } from './types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const { Text } = Typography;

const { Panel } = Collapse;

function ColumnSelect(props: ColumnSelectProps) {
  const { columns, columnState, setColumnState } = props;

  const { currentLocale } = useLocale('MsTable');

  // 输入框的受控状态
  const [searchValue, setSearchValue] = useState<string>();

  // 用于实际筛选的状态
  const [searchText, setSearchText] = useState<string>();

  // 根据 searchText 匹配到和未匹配到的 columns
  const { matchedColumns, unMatchedColumns } = useMemo(() => {
    const matchedColumns = columns?.filter((column) => {
      if (searchText === '') return true;
      if (isNil(searchText)) return true;
      return column.title?.toString().toLowerCase().includes(searchText.toLowerCase());
    });

    const unMatchedColumns = columns?.filter((column) => {
      if (searchText === '') return false;
      if (isNil(searchText)) return false;
      return !column.title?.toString().toLowerCase().includes(searchText.toLowerCase());
    });

    return { matchedColumns, unMatchedColumns };
  }, [columns, searchText]);

  // 筛选之后的分组
  const matchedGroupList = useMemo(
    () => groupColumns(matchedColumns ?? [], currentLocale.baseFields),
    [currentLocale.baseFields, matchedColumns],
  );

  // CheckboxGroup value
  const value = useMemo(
    () => columnState.filter((state) => !state.hidden).map((state) => state.id),
    [columnState],
  );

  // CheckboxGroup onChange
  const onChange: CheckboxGroupProps['onChange'] = (selectedKeys) => {
    setColumnState((prev) =>
      prev.map((state) => ({ ...state, hidden: !selectedKeys.includes(state.id) })),
    );
  };

  /** Collapse 组件默认展开所有分组 */
  const defaultActiveKey = useMemo(
    () => groupColumns(columns ?? [], currentLocale.baseFields).map((group) => group.groupId),
    [columns, currentLocale.baseFields],
  );

  return (
    <div className="column-select">
      <div className="column-select-header">
        <div>
          <span className="column-select-title">{currentLocale.selectableField}</span>
          <Text type="secondary">
            （{replaceMessage(currentLocale.totalCount, { count: columns?.length ?? 0 })}）
          </Text>
        </div>
        <div>
          <Input.Search
            value={searchValue}
            onChange={(event) => {
              const value = event.target?.value;
              setSearchValue(value);
              // 优化用户体验，清空的时候触发搜索
              if (isNil(value) || value === '') setSearchText(value);
            }}
            onSearch={setSearchText}
            placeholder={currentLocale.searchField}
            allowClear
          />
        </div>
      </div>
      <div className="column-select-content">
        {matchedGroupList.length > 0 ? (
          <Checkbox.Group prefixCls="_no" value={value} onChange={onChange}>
            <Collapse
              bordered={false}
              expandIconPosition="end"
              ghost
              defaultActiveKey={defaultActiveKey}
              expandIcon={({ isActive }) =>
                isActive ? <MsArrowDownSmOutlined /> : <MsArrowRightSmOutlined />
              }
            >
              {matchedGroupList.map((group) => (
                <Panel key={group.groupId} header={group.groupName} className="column-select-group">
                  {/* checkbox 方式选择 */}
                  <ColumnSelectCheckboxes columns={group.columns} />
                  {/* tag 方式选择 */}
                </Panel>
              ))}
            </Collapse>
            {/* 如果未匹配到的节点不渲染，Checkbox.Group 的 onChange 会丢掉这些项的状态 */}
            {unMatchedColumns?.map((column) => {
              const key = column.dataIndex?.toString() ?? column.title;
              return <Checkbox key={key} value={key} style={{ display: 'none' }} />;
            })}
          </Checkbox.Group>
        ) : (
          <div className="column-select-empty">
            <MsEmpty image="search" description={currentLocale.emptyFieldTip} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnSelect;
