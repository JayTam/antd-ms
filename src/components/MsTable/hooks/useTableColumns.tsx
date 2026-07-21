import { QuestionCircleOutlined } from '@ant-design/icons';
import { MsInstance } from '@jaytam/antd-ms/components';
import { cloneDeepWithReactNode, emptyTextRender, valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { Skeleton, Tooltip } from 'antd';
import { isArray, isFunction, isNil, isObject } from 'lodash-es';
import MsStatus from '../../MsStatus';
import { MULTIPLE_SELECT_MULTIPLE_FILTER, SINGLE_SELECT_TABLE_FILTER } from '../constants';

import type { MsTableColumns, MsTableComponentProps, QueryType } from '../types';
import { findSortOrder } from '../utils/sorter';
import useTableFilterSearch from './useTableFilterSearch';
import ResourceTagsTableCell from '@jaytam/antd-ms/fields/MsPresetResourceTags/components/ResourceTagsTableCell';
import type { ReactNode } from 'react';
import React from 'react';
import { getMatchedOptions } from '../utils/render';

type ExtraProps = {
  query: QueryType;
  requestValeEnumMap: any;
  onSearch: () => void;
};

/**
 * 从 columns 转化得到 tableColumns
 * 1. 默认超长省略
 * 2. 列宽度默认 90 px
 * 3. 重写渲染函数
 * 4. 集成资源标签
 */
function useTableColumns<P, R, D>(props: MsTableComponentProps<P, R, D>, extraProps: ExtraProps) {
  const { tableColumns, columnEmptyText = '-', editable } = props;
  const { query, requestValeEnumMap, onSearch } = extraProps;

  const { getColumnSearchProps } = useTableFilterSearch();

  /**
   * 递归解析 table columns
   */
  function recursionTableColumns(columns: MsTableColumns) {
    return columns.map((_column, index) => {
      const column = cloneDeepWithReactNode(_column);
      const component = column.valueType ?? 'text';
      column.title = (column.tableTitle ?? column.title) as any;

      if (column.tooltip) {
        column.title = (
          <div className="ms-table-column-tooltip">
            <span className="ms-table-column-title-tooltip">{column.title}</span>
            <Tooltip title={column.tooltip} {...column.tooltipProps}>
              <QuestionCircleOutlined style={{ marginLeft: 4, cursor: 'pointer' }} />
            </Tooltip>
          </div>
        ) as any;
      }

      // 表头分组，递归
      if ('children' in column) {
        column.children = recursionTableColumns(column.children);
        return column;
      }

      if (isNil(column.ellipsis)) {
        column.ellipsis = true;
      } else {
        // 开启显示 tooltip 就需要关闭显示 html title
        if (isObject(column.ellipsis) && column.ellipsis.showTooltip) {
          column.ellipsis.showTitle = false;
        }
      }

      if (isNil(column.width)) {
        column.width = 90;
      }

      if (isFunction(column.request)) {
        if (column.dataIndex) {
          const dataIndex = column.dataIndex.toString();
          const valueEnum = requestValeEnumMap[dataIndex];
          if (valueEnum) column.valueEnum = requestValeEnumMap[dataIndex];
        }
      }

      const options = valueEnumToOptions(column.valueEnum, column.valueEnumFiledNames);

      // 开启排序
      if (column.sorter) {
        // 函数为前端排序，不用处理用 antd 原始的逻辑
        if (!isFunction(column.sorter)) {
          column.sorter = isObject(column.sorter) ? column.sorter : { multiple: index };
          column.sortOrder = findSortOrder(query, column.dataIndex?.toString());
        }
        // 默认关闭排序的 tooltips 提示，避免跟 column.tooltip 重叠
        column.showSorterTooltip = column.showSorterTooltip ?? false;
      }

      // 开启 table-filter
      if (column.filters) {
        column.filters = isArray(column.filters) ? column.filters : options;
        const value = query[column.dataIndex as any];

        if (isNil(value)) {
          column.filteredValue = null;
        } else {
          column.filteredValue = isArray(value)
            ? value.map((item) => item.toString())
            : [value.toString()];
        }

        column.filterSearch = column.filterSearch ?? false;
        // 单选
        if (SINGLE_SELECT_TABLE_FILTER.includes(component)) {
          column.filterMultiple = column.filterMultiple ?? false;
        }
        // 多选
        if (MULTIPLE_SELECT_MULTIPLE_FILTER.includes(component)) {
          column.filterMultiple = column.filterMultiple ?? true;
        }
      }

      // 表头筛选
      if (column.filters && component === 'text' && column.dataIndex) {
        const searchProps = getColumnSearchProps(column);
        Object.assign(column, searchProps);
        const value = query[column.dataIndex as any];
        column.filteredValue = isArray(value) ? value : isNil(value) ? value : [value];
      }

      // 开启行编辑，设置EditCell需要的属性，onRow 设置在 Table 上
      if (isObject(editable)) {
        column.onCell = (record: any, index?: number) => {
          const editableOnCell = {
            column: column,
            index: index,
            valign: undefined,
            record: record,
          };
          if (isFunction(_column.onCell)) {
            const onCell = _column.onCell(record, index);
            return { ...onCell, ...editableOnCell };
          }
          return editableOnCell;
        };
      }

      const originRender = column.render;

      column.render = (...args) => {
        const [text, record] = args;

        // 自定义渲染
        if (isFunction(originRender)) {
          const originRenderText = originRender?.(...args);
          return emptyTextRender(originRenderText, columnEmptyText);
        }

        // 未设置 dataIndex 不渲染
        if (isNil(column.dataIndex) || isNil(text)) {
          return emptyTextRender(null, columnEmptyText);
        }

        // request 方式获取 valueEnum，loading动画
        if (isFunction(column.request) && isNil(column.valueEnum)) {
          return <Skeleton.Button active block size="small" />;
        }

        // 渲染资源标签类型（业务组件）的Cell
        if (column.valueType === 'presetResourceTags' || column.valueType === 'resourceTags') {
          return (
            <ResourceTagsTableCell
              resource={record.resource}
              onRefresh={onSearch}
              // 资源中心使用，隐藏编辑按钮
              hideEditInTable={(column.fieldProps as any)?.hideEditInTable}
              // 气泡弹窗的展示方向
              popoverProps={(column.fieldProps as any)?.popoverProps}
            />
          );
        }

        //  -------------------上面优先级高直接返回---------------------------------

        /** 最终渲染的文本 */
        let resultText: ReactNode = emptyTextRender(text, columnEmptyText);
        /** 最终渲染的节点 */
        let resultNode: ReactNode;

        // 渲染选择类型的Cell，注意联动字段不处理
        if (!isNil(column.valueEnum) && isNil(column.dependencies)) {
          // const result = options.find((option) => option.value == text?.toString());
          const matchedOption = getMatchedOptions(text, options);
          if (matchedOption) {
            resultText = matchedOption.label;
            // 标签展示
            if (matchedOption.status || matchedOption.icon) {
              resultNode = (
                <MsStatus
                  color={matchedOption.status}
                  icon={matchedOption.icon}
                  {...column?.fieldProps}
                >
                  {matchedOption.label}
                </MsStatus>
              );
            }
          }
        }

        // 复制按钮
        if (column.copyable) {
          resultNode = <MsInstance columns={[{ title: resultText, copyable: true }]} />;
        }

        // Tooltip 显示省略
        if (isObject(column.ellipsis) && column.ellipsis.showTooltip) {
          resultNode = (
            <Tooltip placement="topLeft" title={resultText} {...column.ellipsis.tooltipProps}>
              {resultNode ?? resultText}
            </Tooltip>
          );
        }

        return resultNode ?? resultText;
      };

      return column;
    });
  }

  return recursionTableColumns(tableColumns);
}

export default useTableColumns;
