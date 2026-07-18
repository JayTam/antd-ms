import MsModal from '@jaytam/antd-ms/components/MsModal';
import { useMemo, useState } from 'react';
import ColumnSetModal from './ColumnSetModal';
import { MsFormColumnContext } from '../../contexts/column';
import {
  columnStateToColumns,
  isEqualColumnState,
  mergeColumnState,
} from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/utils/state';
import type { MsFormColumnContainerProps } from './types';
import { addKeyInColumns } from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/utils/column';
import { generateStoreName } from '@jaytam/antd-ms/components/MsTable/utils/storeName';
import useColumnSetState from '@jaytam/antd-ms/components/MsTable/components/MsTableColumnContainer/hooks/useColumnSetState';
import { useAsyncEffect } from 'ahooks';
import { isNil } from 'lodash-es';

/**
 * 列设置，列数据导出容器，集中处理相关逻辑
 * @param props
 */
function MsFormColumnContainer<P, R, D>(props: MsFormColumnContainerProps<P, R, D>) {
  const { columns = [], columnSet, children } = props;

  const [settingInitialLoading, setSettingInitialLoading] = useState(true);

  /** 展示列 columns，所有 columns */
  const settingColumns = useMemo(() => addKeyInColumns(columns as any), [columns]);

  const columnSetProps = useMemo(() => {
    const storeName = columnSet?.storeName ?? generateStoreName(columns as any);
    return { storeName: storeName + '_form', ...columnSet };
  }, [columnSet, columns]);

  const setting = useColumnSetState(columnSetProps, settingColumns);

  /** 根据 columnState 还原成 columns */
  const formColumns = useMemo(
    () => columnStateToColumns(setting.state, settingColumns),
    [setting, settingColumns],
  );

  /**
   * 打开列设置的弹窗
   */
  function handleOpenColumnSetModal() {
    return MsModal.open(ColumnSetModal, {
      columns: settingColumns,
      defaultState: setting.state,
      resetState: columnSetProps?.defaultValue,
      async onFinish(newSetState) {
        await setting.setAsync(newSetState);
      },
    });
  }

  useAsyncEffect(async () => {
    if (isNil(columnSetProps?.defaultValue)) {
      try {
        const remoteState = await setting.getAsync();
        const localState = setting.getLocalState();
        if (setting.persistenceMode === 'request') {
          const mergedState = mergeColumnState(localState, remoteState);
          setting.setState(mergedState);
        }
        if (setting.persistenceMode === 'store') {
          const isEqualState = await isEqualColumnState(localState, remoteState);
          if (isEqualState) {
            setting.setState(remoteState);
          } else {
            const localState = setting.getLocalState();
            await setting.setAsync(localState);
          }
        }
      } finally {
        setSettingInitialLoading(false);
      }
    }
  }, [settingColumns.length]);

  if (settingInitialLoading) return null;

  return (
    <MsFormColumnContext.Provider value={{ openColumnSet: handleOpenColumnSetModal }}>
      {children(formColumns as any)}
    </MsFormColumnContext.Provider>
  );
}

export default MsFormColumnContainer;
