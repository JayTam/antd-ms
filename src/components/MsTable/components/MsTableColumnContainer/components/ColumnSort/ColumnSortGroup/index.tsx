import { Droppable } from 'react-beautiful-dnd';
import type { ColumnStateGroupType, MsTableColumnsWithKey } from '../../../types';
import type { ColumnSortItemProps } from '../ColumnSortItem';
import ColumnSortItem from '../ColumnSortItem';
import cls from 'classnames';
import './index.less';

type ColumnSortGroupProps = ColumnStateGroupType &
  Pick<ColumnSortItemProps, 'onRemove' | 'onFixed'> & {
    columns?: MsTableColumnsWithKey;
    columnFixed?: boolean;
  };

/**
 * 列排序分组
 * @param props
 * @returns
 */
function ColumnSortGroup(props: ColumnSortGroupProps) {
  const {
    groupId,
    groupName,
    groupStartIndex = 0,
    columnFixed = true,
    children,
    ...restProps
  } = props;

  // 如果全部字段隐藏，则不展示分组
  if (children.every((item) => item.hidden)) return null;

  return (
    <Droppable droppableId={groupId} type={groupId}>
      {(dropProvided, dropSnapshot) => {
        return (
          <div
            className={cls('column-sort-group', { 'no-column-fixed': !columnFixed })}
            {...dropProvided.droppableProps}
          >
            {columnFixed ? <div className="column-sort-group-title">{groupName}</div> : null}
            <div className="column-sort-group-content" ref={dropProvided.innerRef}>
              {children?.map((item, index) => (
                <ColumnSortItem
                  key={item.id}
                  index={groupStartIndex + index}
                  columnState={item}
                  groupId={groupId}
                  columnFixed={columnFixed}
                  {...restProps}
                />
              ))}
            </div>
            <div>{dropProvided.placeholder}</div>
          </div>
        );
      }}
    </Droppable>
  );
}

export default ColumnSortGroup;
