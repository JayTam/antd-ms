import MsModal from '@jaytam/antd-ms/components/MsModal';
import { useMemo, useState } from 'react';
import ColumnSetModal from './components/ColumnSetModal';
import { useAsyncEffect } from 'ahooks';
import type { ColumnStateListType, MsTableColumnContainerProps } from './types';
import { addKeyInColumns } from './utils/column';
import { columnStateToColumns, isEqualColumnState, mergeColumnState } from './utils/state';
import ColumnExportModal from './components/ColumnExportModal';
import { isFunction, isNil } from 'lodash-es';
import useColumnExportState from './hooks/useColumnExportState';
import useColumnSetState from './hooks/useColumnSetState';
import { MsTableToolsExtraContext } from '../../contexts/toolsExtra';
import { columnExportStateToItems } from '../../utils/columnExport';

/**
 * 列设置，列数据导出容器，集中处理相关逻辑
 * @param props
 */
function MsTableColumnContainer<P, R, D>(props: MsTableColumnContainerProps<P, R, D>) {
  const {
    columns,
    children,
    columnState: columnSetStateProps = {},
    columnExport: columnExportProps = {},
  } = props;
  const [settingInitialLoading, setSettingInitialLoading] = useState(true);
  const [exportingInitialLoading, setExportingInitialLoading] = useState(false);

  /** 列设置状态跟列导出状态同步，单向同步 */
  const syncSetting = useMemo(() => {
    if (isFunction(columnExportProps.request)) return false;
    return columnExportProps?.syncColumnSet ?? true;
  }, [columnExportProps.request, columnExportProps?.syncColumnSet]);

  /** 展示列 columns，所有 columns */
  const settingColumns = useMemo(() => addKeyInColumns(columns ?? []), [columns]);

  /** 导出列 columns，剔除掉未设置 dataIndex 的列 */
  const exportingColumns = useMemo(
    () => settingColumns.filter((column) => isNil(column.dataIndex) === false),
    [settingColumns],
  );

  const settingState = useColumnSetState(columnSetStateProps, settingColumns);
  const exportingState = useColumnExportState(columnExportProps, exportingColumns);

  /** 根据 columnState 还原成 columns */
  const tableColumns = useMemo(
    () => columnStateToColumns(settingState.state, settingColumns),
    [settingState.state, settingColumns],
  );

  /**
   * 打开列设置的弹窗
   */
  function handleOpenColumnSetModal() {
    return MsModal.open(ColumnSetModal, {
      columns: settingColumns,
      defaultState: settingState.state,
      resetState: columnSetStateProps?.defaultValue,
      async onFinish(newSetState) {
        await settingState.setAsync(newSetState);
        // 开启同步，修改导出状态
        if (syncSetting) {
          exportingState.setState(newSetState);
        }
      },
    });
  }

  /**
   * 打开列数据导出的弹窗
   */
  async function handleOpenExportModal() {
    /** setState 是异步的，所以使用一个同步变量修改 */
    let defaultState: ColumnStateListType | undefined;
    // -------------------列导出--------------------------
    if (syncSetting === false) {
      try {
        setExportingInitialLoading(true);
        const localState = exportingState.getLocalState();
        const remoteState = await exportingState.getAsync();

        if (exportingState.persistenceMode === 'request') {
          const mergedState = mergeColumnState(localState, remoteState);
          exportingState.setState(mergedState);
          defaultState = mergedState;
        }

        if (exportingState.persistenceMode === 'store') {
          const isEqualState = await isEqualColumnState(localState, remoteState);
          if (isEqualState) {
            exportingState.setState(remoteState);
            defaultState = remoteState;
          } else {
            await exportingState.setAsync(localState);
            defaultState = localState;
          }
        }
      } finally {
        setExportingInitialLoading(false);
      }
    }

    return MsModal.open(ColumnExportModal, {
      columns: exportingColumns,
      defaultState,
      resetState: columnSetStateProps?.defaultValue,
      showSaveBtn: columnExportProps.showSaveBtn,
      async onSave(newState, isExport) {
        // 关闭同步，修改导出状态同时持久化
        if (syncSetting === false) {
          await exportingState.setAsync(newState);
        }
        if (isExport) {
          const items = columnExportStateToItems(newState, exportingColumns);
          await columnExportProps?.onExport?.(items);
        }
      },
    });
  }

  // 从 indexDB 中获取初始值
  useAsyncEffect(async () => {
    // -------------------列设置--------------------------
    try {
      const remoteState = await settingState.getAsync();
      const localState = settingState.getLocalState();
      if (settingState.persistenceMode === 'request') {
        const mergedState = mergeColumnState(localState, remoteState);
        settingState.setState(mergedState);
      }
      if (settingState.persistenceMode === 'store') {
        const isEqualState = await isEqualColumnState(localState, remoteState);
        if (isEqualState) {
          settingState.setState(remoteState);
          // 同步列设置的字段，列导出字段将不保存到 indexDB
          if (syncSetting) exportingState.setState(remoteState);
        } else {
          const localState = settingState.getLocalState();
          await settingState.setAsync(localState);
          // 同步列设置的字段，列导出字段将不保存到 indexDB
          if (syncSetting) exportingState.setState(localState);
        }
      }
    } finally {
      setSettingInitialLoading(false);
    }
  }, [settingColumns.length]);

  if (settingInitialLoading) return <></>;

  return (
    <MsTableToolsExtraContext.Provider
      value={{
        setting: { initialLoading: settingInitialLoading, open: handleOpenColumnSetModal },
        exporting: { initialLoading: exportingInitialLoading, open: handleOpenExportModal },
      }}
    >
      {children(tableColumns)}
    </MsTableToolsExtraContext.Provider>
  );
}

export default MsTableColumnContainer;
