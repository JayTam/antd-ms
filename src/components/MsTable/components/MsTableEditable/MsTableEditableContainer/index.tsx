import type { MsTableProps } from '@jaytam/antd-ms';
import { isFunction, isNil, mapValues } from 'lodash-es';

import type { ReactNode } from 'react';
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { getUuid } from '../../../../../utils';
import { EditableContext } from '../../../contexts/editable';
import EditingActionController from '../EditingActionController';
import { useLocale } from '@jaytam/antd-ms/locale';

type MsTableEditableContainerProps<P, R, D> = Omit<MsTableProps<P, R, D>, 'children'> & {
  tableAreaRef?: React.RefObject<HTMLDivElement>;
  innerActionRef?: React.RefObject<{ isEditing: boolean }>;
  children?: (dataSource: D[]) => ReactNode;
  reload: () => Promise<void>;
};

/** 新增行标识 */
export const isNewRowSymbol = Symbol('is-new-row');

/** 取消新增行编辑标识 */
export const cancelNewRowEditSymbol = Symbol('cancel-new-row');

function MsTableEditableContainer<P, R, D>(props: MsTableEditableContainerProps<P, R, D>) {
  const {
    rowKey = 'id',
    editable,
    dataSource,
    tableAreaRef,
    innerActionRef,
    reload,
    children,
  } = props;

  const [tableData, setTableData] = useState<any>(dataSource);
  const [rowEditing, setRowEditing] = useState({});
  const editRowRefs = useRef<{ save?: () => Promise<void>; cancel?: () => Promise<void> }[]>([]);
  const rowKeyName = isFunction(rowKey) ? rowKey({}) : rowKey;
  const { fullLocale } = useLocale();

  const globalEditing = useMemo(
    () => Object.values(rowEditing).some((value) => value),
    [rowEditing],
  );

  /**
   * 新增一行数据
   * @param type 头插，尾插
   */
  const addRow = (defaultValue: any = {}, type: 'start' | 'end' = 'start') => {
    if (globalEditing) {
      EditingActionController.warnEditing(fullLocale);
      return;
    }
    const keyValue = getUuid();
    const newRecord = {
      ...defaultValue,
      [rowKeyName]: keyValue,
      [isNewRowSymbol]: true,
      /**
       * 取消新增行，重置回原来的dataSource
       */
      [cancelNewRowEditSymbol]: () => {
        setTableData(dataSource);
        setRowEditing((prev) => mapValues(prev, () => false));
      },
    };
    if (type === 'start') {
      setTableData((prev = []) => [newRecord, ...prev]);
    }
    if (type === 'end') {
      setTableData((prev = []) => [...prev, newRecord]);
    }
    setRowEditing((prev) => ({ ...prev, [keyValue]: true }));
    return keyValue;
  };

  /**
   * 保存行
   * @param awaitReload
   * @returns
   */
  const save = async (awaitReload = false) => {
    if (isNil(editRowRefs.current)) return;
    if (globalEditing === false) return;
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const key in editRowRefs.current) {
      const ref = editRowRefs.current[key];
      await ref?.save?.();
    }
    // 防止保存之后刷新在同一个tick，等到 globalEditing 状态变更完成
    await new Promise((resolve) => setTimeout(() => resolve(''), 0));
    if (awaitReload) {
      await reload();
      // reload 之后 dataSource 更新
      await new Promise((resolve) => setTimeout(() => resolve(''), 0));
      // dataSource 引起 tableData 更新
      await new Promise((resolve) => setTimeout(() => resolve(''), 0));
    }
  };

  /**
   * 取消编辑行
   * @param awaitReload
   * @returns
   */
  const cancel = async (awaitReload = false) => {
    if (isNil(editRowRefs.current)) return;
    if (globalEditing === false) return;
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const key in editRowRefs.current) {
      const ref = editRowRefs.current[key];
      await ref?.cancel?.();
    }
    // 防止取消之后刷新在同一个tick，等到 globalEditing 状态变更完成
    await new Promise((resolve) => setTimeout(() => resolve(''), 0));
    if (awaitReload) {
      await reload();
      // reload 之后 dataSource 更新
      await new Promise((resolve) => setTimeout(() => resolve(''), 0));
      // dataSource 引起 tableData 更新
      await new Promise((resolve) => setTimeout(() => resolve(''), 0));
    }
  };

  useEffect(() => setTableData(dataSource), [dataSource]);

  useImperativeHandle(editable?.actionRef, () => ({
    addRow,
    save,
    cancel,
    isEditing: globalEditing,
  }));

  useImperativeHandle(innerActionRef, () => ({
    isEditing: globalEditing,
  }));

  if (isNil(editable)) {
    return <>{children?.(tableData)}</>;
  }

  return (
    <EditableContext.Provider
      value={{
        editable,
        addRow,
        globalEditing,
        rowEditing,
        setRowEditing,
        editRowRefs,
        tableAreaRef,
        reload,
        rowKey: rowKeyName,
      }}
    >
      {children?.(tableData)}
    </EditableContext.Provider>
  );
}

export default MsTableEditableContainer;
