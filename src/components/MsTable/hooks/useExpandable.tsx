import { Loading3QuartersOutlined } from '@ant-design/icons';

import type { TableProps } from 'antd';
import { ConfigProvider } from 'antd';
import classNames from 'classnames';
import { cloneDeep, get, isArray, isFunction, isNil } from 'lodash-es';
import React, { useContext, useState } from 'react';
import type { MsTableProps } from '../types';

/**
 * 递归查找所有的keys
 */
function findAllKeys(record: any, keyName: string, childrenColumnName: string) {
  let keys: string[] = [];

  const key = record[keyName];
  if (key) {
    keys.push(key);
  }

  const children = record[childrenColumnName];
  if (children && children.length > 0) {
    for (const child of children) {
      keys = keys.concat(findAllKeys(child, keyName, childrenColumnName));
    }
  }

  return keys;
}

const useExpandable = <P, R, D>(
  props: MsTableProps<P, R, D>,
  extraProps: { changeData: React.Dispatch<any> },
): { expandable: TableProps<D>['expandable']; clearExpandedRowKeys?: () => void } => {
  const { rowKey = 'id', expandable = {} } = props;
  const { changeData } = extraProps;
  const { loadChildrenData, childrenColumnName = 'children' } = expandable;
  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();

  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly React.Key[]>(
    expandable.defaultExpandedRowKeys ?? [],
  );
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  if (isNil(loadChildrenData)) return { expandable };

  function appendDataSource(rowKeyValue: string, data: any, childrenData: any) {
    if (isArray(data)) {
      data.forEach((item) => {
        if (get(item, rowKey) === rowKeyValue) {
          item[childrenColumnName] = childrenData;
        } else if (isArray(item[childrenColumnName])) {
          appendDataSource(rowKeyValue, item[childrenColumnName], childrenData);
        }
      });
    }
  }

  /**
   * 清空选中项
   */
  function clearExpandedRowKeys() {
    setExpandedRowKeys(expandable.defaultExpandedRowKeys ?? []);
  }

  return {
    clearExpandedRowKeys,
    expandable: {
      ...expandable,
      expandedRowKeys,
      expandIcon: (renderExpandProps) => {
        const { expanded, onExpand, record } = renderExpandProps;
        const key = get(record, rowKey);
        const loading = get(loadingMap, key);

        if (loading) {
          return (
            <Loading3QuartersOutlined
              className={`${prefixCls}-table-row-expand-loading-container`}
              spin
            />
          );
        }

        if (isFunction(expandable.expandIcon)) {
          return expandable.expandIcon(renderExpandProps);
        }

        return (
          <button
            className={classNames(
              `${prefixCls}-table-row-expand-icon`,
              expanded
                ? `${prefixCls}-table-row-expand-icon-expanded`
                : `${prefixCls}-table-row-expand-icon-collapsed`,
            )}
            // 不存在子项，不显示展开关闭按钮
            style={{
              visibility: isNil((record as any)[childrenColumnName]) ? 'hidden' : 'visible',
            }}
            onClick={(e) => onExpand(record, e)}
          />
        );
      },
      onExpand: async (expanded, record) => {
        const rowKeyValue = get(record, rowKey as string);
        if (expanded) {
          try {
            setLoadingMap((prev) => ({ ...prev, [rowKeyValue]: true }));
            const childrenData = await loadChildrenData?.(record);
            changeData((prev: any) => {
              const newData = cloneDeep(prev);
              appendDataSource(rowKeyValue, newData, childrenData);
              return newData;
            });

            setExpandedRowKeys((prev) => [...prev, rowKeyValue]);
          } finally {
            setLoadingMap((prev) => ({ ...prev, [rowKeyValue]: false }));
          }
        } else {
          setExpandedRowKeys((prev) => {
            const newPrev = [...prev];
            const keys = findAllKeys(record, rowKey, childrenColumnName);
            for (const key of keys) {
              const index = newPrev.indexOf(key);
              if (index > -1) {
                newPrev.splice(index, 1);
              }
            }
            return newPrev;
          });
        }
      },
    },
  };
};

export default useExpandable;
