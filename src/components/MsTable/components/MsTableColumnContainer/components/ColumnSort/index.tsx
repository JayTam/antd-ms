import { Typography } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import ColumnSortGroup from './ColumnSortGroup';
import type { ColumnSortProps } from './types';

import { cloneDeep, isNil } from 'lodash-es';
import { useMemo } from 'react';
import { groupColumnStateByFixed } from '../../utils/group';
import { columnStateToColumnsWithKey, sortColumnStateByFixed } from '../../utils/state';
import cls from 'classnames';
import './index.less';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const { Text } = Typography;

/**
 * 列排序
 * @param props
 * @returns
 */
function ColumnSort(props: ColumnSortProps) {
  const { columns, columnState, setColumnState, columnFixed = true } = props;

  const { currentLocale, fullLocale } = useLocale('MsTable');

  /** 已选字段 */
  const selectedColumns = useMemo(
    () => columnStateToColumnsWithKey(columnState, columns ?? []),
    [columns, columnState],
  );

  /** 已选字段 （分组） */
  const selectedGroupColumns = useMemo(
    () => groupColumnStateByFixed(columnState, fullLocale),
    [columnState, fullLocale],
  );

  /**
   * 移动可排序项
   * @param dragIndex 源索引位置
   * @param hoverIndex 目标索引位置
   * @returns
   */
  const handleMoveItem = (dragIndex: number, hoverIndex: number) => {
    if (isNil(columnState)) return;
    const newColumnState = [...columnState];
    const [moveItem] = newColumnState.splice(dragIndex, 1);
    newColumnState.splice(hoverIndex, 0, moveItem);
    setColumnState(newColumnState);
  };

  /**
   * 删除可排序项
   * @param id
   * @returns
   */
  const handleRemoveItem = (id: string) => {
    if (isNil(columnState)) return;
    const newColumnState = cloneDeep(columnState);
    const index = newColumnState.findIndex((state) => state.id === id);
    if (index > -1) {
      newColumnState[index].hidden = true;
      setColumnState(newColumnState);
    }
  };

  const handleFixed = (id: string, type?: 'left' | 'right') => {
    if (isNil(columnState)) return;
    const newColumnState = cloneDeep(columnState);
    const index = newColumnState.findIndex((state) => state.id === id);
    if (index > -1) {
      newColumnState[index].fixed = type;
      setColumnState(sortColumnStateByFixed(newColumnState));
    }
  };

  return (
    <div className="column-sort">
      <div className="column-sort-header">
        <span className="column-sort-title">{currentLocale.selectedField}</span>
        <Text type="secondary">
          （{replaceMessage(currentLocale.totalCount, { count: selectedColumns?.length ?? 0 })}）
        </Text>
      </div>

      <div className={cls('column-sort-content', { 'no-column-fixed': !columnFixed })}>
        <DragDropContext
          onDragEnd={(result) => {
            // dropped outside the list
            if (!result.destination || !selectedGroupColumns) {
              return;
            }
            handleMoveItem(result.source.index, result.destination.index);
          }}
        >
          {selectedGroupColumns?.map((group) => (
            <ColumnSortGroup
              key={group.groupId}
              {...group}
              onRemove={handleRemoveItem}
              onFixed={handleFixed}
              columns={columns}
              columnFixed={columnFixed}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default ColumnSort;
