import {
  MsBackTopOutlined,
  MsDragOutlined,
  MsLineHeightOutlined,
  MsShutOutlined,
} from '@jaytam/icons';
import { Tooltip } from 'antd';
import { isNil } from 'lodash-es';
import { Draggable } from 'react-beautiful-dnd';
import type { ColumnStateItemType, MsTableColumnsWithKey } from '../../../types';
import { getNameById } from '../../../utils/column';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

export type ColumnSortItemProps = {
  index: number;
  columnState?: ColumnStateItemType;
  columns?: MsTableColumnsWithKey;
  /** fixed 分组类型 */
  groupId?: string;
  /** 移除选中项 */
  onRemove?: (id: string) => void;
  /** 固定选中项，靠左或者靠右 */
  onFixed?: (id: string, fixedType?: 'left' | 'right') => void;
  columnFixed?: boolean;
};

function ColumnSortItem(props: ColumnSortItemProps) {
  const { index, columnState, groupId, columns, columnFixed, onRemove, onFixed } = props;
  const id = columnState?.id;
  const { currentLocale } = useLocale('MsTable');

  if (isNil(id)) return <></>;

  if (columnState?.hidden) return <></>;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(dragProvided, dragSnapshot) => {
        return (
          <div
            ref={dragProvided.innerRef}
            className="column-sort-item"
            data-testid={id}
            data-index={index}
            data-is-dragging={dragSnapshot.isDragging}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
          >
            <div className="column-sort-item-content">
              <MsDragOutlined className="drag-icon" />
              <span className="column-sort-item-text" title={getNameById(id, columns)}>
                {getNameById(id, columns)}
              </span>
            </div>

            {/* disable 禁用所有操作 */}
            {columnState?.disabled ? null : (
              <div className="column-sort-item-actions">
                {columnFixed ? (
                  <>
                    {groupId === 'left' ? null : (
                      <Tooltip title={currentLocale.fixLeft} mouseLeaveDelay={0}>
                        <MsBackTopOutlined
                          className="action-icon"
                          onClick={() => onFixed?.(id, 'left')}
                        />
                      </Tooltip>
                    )}
                    {groupId === 'no_fixed' ? null : (
                      <Tooltip title={currentLocale.noFix} mouseLeaveDelay={0}>
                        <MsLineHeightOutlined
                          className="action-icon"
                          onClick={() => onFixed?.(id)}
                        />
                      </Tooltip>
                    )}
                    {groupId === 'right' ? null : (
                      <Tooltip title={currentLocale.fixRight} mouseLeaveDelay={0}>
                        <MsBackTopOutlined
                          className="action-icon fixed-right"
                          onClick={() => onFixed?.(id, 'right')}
                          style={{ transform: 'rotate(180deg)' }}
                        />
                      </Tooltip>
                    )}
                  </>
                ) : null}
                <Tooltip title={currentLocale.cancelSelect} mouseLeaveDelay={0}>
                  <MsShutOutlined className="action-icon" onClick={() => onRemove?.(id)} />
                </Tooltip>
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}

export default ColumnSortItem;
