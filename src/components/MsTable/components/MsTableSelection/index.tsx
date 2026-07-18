import type { MsActionsItemType } from '@jaytam/antd-ms/components/MsActions/types';
import { Button, Space } from 'antd';
import { isBoolean, isFunction, isNil } from 'lodash-es';
import MsActions from '../../../MsActions';
import type { MsTableSelectionProps } from './types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

function MsTableSelection<P, R, D>(props: MsTableSelectionProps<P, R, D>) {
  const {
    originRowSelection: rowSelection,
    selectedRows,
    selectedRowKeys,
    updateDefault,
    clearSelected,
    open,
    setOpen,
    currentOpenSelectionKeyRef,
    tableProps = {},
  } = props;

  const { currentLocale, globalLocale } = useLocale('MsTable');

  if (rowSelection === false || isNil(rowSelection)) return <></>;

  const isCheckbox = (rowSelection?.type ?? 'checkbox') === 'checkbox';

  // 自定义渲染
  const selectionButtonsRender =
    tableProps.selectionButtonsRender ?? rowSelection.selectionButtonsRender;
  // 自定义配置
  const selectionButtons = rowSelection?.selectionButtons;

  switch (rowSelection.selectionButtonsMode) {
    case undefined:
    case 'default': {
      if (isFunction(selectionButtonsRender)) {
        return (
          <Space>
            {isCheckbox && (
              <div>
                {replaceMessage(currentLocale.selectCountItem, {
                  count: selectedRowKeys?.length ?? 0,
                })}
              </div>
            )}
            {selectionButtonsRender?.(selectedRowKeys, selectedRows)}
          </Space>
        );
      }
      if (isFunction(selectionButtons)) {
        const actionProps = selectionButtons?.(selectedRowKeys, selectedRows);
        return (
          <Space>
            {isCheckbox && (
              <div>
                {replaceMessage(currentLocale.selectCountItem, {
                  count: selectedRowKeys?.length ?? 0,
                })}
              </div>
            )}
            {<MsActions {...actionProps} actionsType="button" />}
          </Space>
        );
      }
    }
    case 'multiple': {
      if (isFunction(selectionButtons)) {
        const actionProps = selectionButtons?.(selectedRowKeys, selectedRows);

        const items = actionProps.items?.map((item, index) => {
          if (isBoolean(item)) return item;
          const key = item.key ?? index;
          return {
            ...item,
            onClick() {
              currentOpenSelectionKeyRef.current = key;
              updateDefault();
              setOpen(true);
            },
          };
        });

        const currentItem = actionProps.items?.find((item, index) => {
          if (isBoolean(item)) return false;
          return (
            currentOpenSelectionKeyRef.current === item.key ||
            currentOpenSelectionKeyRef.current === index
          );
        }) as MsActionsItemType;

        if (open) {
          return (
            <Space>
              {isCheckbox && (
                <div>
                  {currentItem?.label}{' '}
                  {replaceMessage(currentLocale.selectCountItem, {
                    count: selectedRowKeys?.length ?? 0,
                  })}
                </div>
              )}
              <Button
                onClick={() => {
                  currentItem?.onClick?.();
                  setOpen(false);
                  currentOpenSelectionKeyRef.current = undefined;
                  clearSelected();
                }}
                disabled={selectedRowKeys.length === 0}
              >
                {globalLocale.confirm}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  currentOpenSelectionKeyRef.current = undefined;
                  clearSelected();
                }}
              >
                {globalLocale.cancel}
              </Button>
            </Space>
          );
        }

        return <MsActions {...actionProps} items={items} actionsType="button" />;
      }
    }
  }

  return <></>;
}

export default MsTableSelection;
