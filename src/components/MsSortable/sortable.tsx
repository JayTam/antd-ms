import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import classNames from 'classnames';

import { SortableItem } from './components/SortableItem';
import type { FieldNames, MsSortableProps } from './types';
import { getMoveIndex, getUniqueByFieldId } from './utils';

import { FIELD_NAMES } from './constants';

function MsSortable<T>(props: MsSortableProps<T>) {
  const DEFAULT_SENSORS = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const {
    className,
    style,
    items = [],
    disabledItem,
    renderItem,
    onChange,
    onClickTop,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragCancel,
    rowClassName,
    disabledItemStyle,
    draggingItemStyle,
    isShowTopIcon = false,
    sensors = DEFAULT_SENSORS,
    disabled: disabledAll = false,
    modifiers = [restrictToParentElement],
    fieldNames = FIELD_NAMES as FieldNames<T>,
  } = props;

  const dragEndEvent = (dragItem: DragEndEvent) => {
    onDragEnd?.(dragItem);

    const { active, over } = dragItem;
    if (!active || !over) return;

    const { activeIndex, overIndex } = getMoveIndex(items, dragItem, fieldNames as FieldNames<T>);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      const sortedList = arrayMove(items, activeIndex, overIndex);
      const changedItem = sortedList.find(
        (item) => getUniqueByFieldId(item, fieldNames.id as keyof T) === active?.id,
      )!;

      return onChange && onChange(sortedList, changedItem);
    }
  };

  return (
    <div className={className} style={style}>
      <DndContext
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={dragEndEvent}
        onDragCancel={onDragCancel}
        modifiers={modifiers}
        sensors={sensors}
      >
        <SortableContext
          disabled={disabledAll}
          items={items.map((item) => getUniqueByFieldId(item, fieldNames.id as keyof T))}
        >
          {items.map((item, idx) => {
            const isDisabled = disabledAll || (disabledItem ? disabledItem(item, idx) : false);
            const id = getUniqueByFieldId(item, fieldNames.id as keyof T);

            return (
              <SortableItem
                key={id}
                item={item}
                index={idx}
                disabled={isDisabled}
                rowClassName={rowClassName}
                isShowTopIcon={isShowTopIcon}
                fieldNames={fieldNames}
                disabledStyle={disabledItemStyle}
                draggingStyle={draggingItemStyle}
                onClickTop={() => {
                  const sortedList = arrayMove(items, idx, 0);
                  onClickTop?.(sortedList, item);
                  onChange?.(sortedList, item);
                }}
                renderItem={renderItem}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default MsSortable;
