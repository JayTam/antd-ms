import { useControllableValue, useUpdateEffect } from 'ahooks';
import type { TableRowSelection } from 'antd/es/table/interface';
import { isArray, isFunction, isObject, omit } from 'lodash-es';
import { useMemo, useRef, useState } from 'react';
import type { MsTableProps } from '../../types';

type ExtraProps<P, R, D> = { res: any; dataSource: MsTableProps<P, R, D>['dataSource'] };

/**
 * 表格选择器
 * selectionButtonsMode: default 普通选择模式
 * selectionButtonsMode: multiple 每个批量操作可独立控制禁用项，默认初始值
 * @param props
 * @returns
 */
function useTableSelection<P, R, D>(props: MsTableProps<P, R, D>, tableProps: ExtraProps<P, R, D>) {
  const { rowSelection: originRowSelection = false, rowKey = 'id' } = props;
  const { res, dataSource } = tableProps;
  // 是否首次更新默认值
  const hasUpdateDefaultValueRef = useRef(false);

  // multiple 模式下，当前打开的批量操
  const currentOpenSelectionKeyRef = useRef<React.Key>();

  /**
   * 默认选中项的 keys，主要分以下两种情况
   * mutiple：默认都不选中
   * default：函数的情况下默认是[]，数组的情况下才使用
   */
  const defaultSelectedRowKeys = useMemo(() => {
    if (originRowSelection === false) return [];
    if (originRowSelection.selectionButtonsMode === 'multiple') return [];
    if (isArray(originRowSelection.defaultSelectedRowKeys)) {
      return originRowSelection.defaultSelectedRowKeys;
    }
    return [];
  }, [originRowSelection]);

  // 选项 keys
  const [selectedRowKeys, setSelectedRowKeys] = useControllableValue<React.Key[]>(
    originRowSelection === false ? {} : originRowSelection,
    {
      valuePropName: 'selectedRowKeys',
      trigger: 'onChange',
      defaultValue: defaultSelectedRowKeys,
    },
  );

  // 选项 rows
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  // 批量
  const [open, setOpen] = useState(false);

  /**
   * 默认选项 keys
   * @returns
   */
  function getDefaultSelectedRowKeys() {
    if (originRowSelection === false) return [];
    if (isFunction(originRowSelection.defaultSelectedRowKeys)) {
      return (
        originRowSelection.defaultSelectedRowKeys(res, currentOpenSelectionKeyRef.current) ?? []
      );
    }
    return originRowSelection.defaultSelectedRowKeys ?? [];
  }

  /**
   * 默认选项 rows
   * @returns
   */
  function getDefaultSelectedRows() {
    if (originRowSelection === false) return [];
    const defaultSelectedRowKeys = getDefaultSelectedRowKeys();
    const key = isFunction(rowKey) ? 'id' : rowKey;
    return dataSource?.filter((item: any) => defaultSelectedRowKeys.includes(item[key])) ?? [];
  }

  /**
   * multiple模式下，打开批量操作设置初始值
   * @returns
   */
  function updateDefault() {
    if (originRowSelection === false) return;
    setSelectedRowKeys(getDefaultSelectedRowKeys(), getDefaultSelectedRows());
    setSelectedRows(getDefaultSelectedRows());
  }

  /**
   * antd table 的 rowSelection
   */
  const rowSelection: TableRowSelection<any> | undefined = useMemo(() => {
    if (originRowSelection === false) return;
    const selectionButtonsMode = originRowSelection.selectionButtonsMode ?? 'default';
    if (selectionButtonsMode === 'multiple' && open === false) {
      return;
    }

    return {
      selectedRowKeys,
      type: 'checkbox',
      fixed: 'left',
      preserveSelectedRowKeys: true,
      onChange: (newSelectedRowKeys, newSelectRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectRows);
        if (isObject(originRowSelection)) {
          originRowSelection?.afterChange?.(newSelectedRowKeys, newSelectRows);
        }
      },
      getCheckboxProps: (record) => {
        return (
          originRowSelection.getCheckboxProps?.(record, currentOpenSelectionKeyRef.current) ?? {}
        );
      },
      ...(isObject(originRowSelection)
        ? omit(originRowSelection, 'defaultSelectedRowKeys', 'afterChange', 'getCheckboxProps')
        : {}),
    };
  }, [originRowSelection, open, selectedRowKeys, setSelectedRowKeys]);

  /**
   * 清空选项
   */
  const clearSelected = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  /**
   * 清空选项，根据 clearSelectionOnSearch 来判断是否清空
   * @returns
   */
  const clearSelectedOnSearch = () => {
    if (originRowSelection === false) return;
    if (originRowSelection.clearSelectionOnSearch ?? true) {
      clearSelected();
    }
  };

  // 默认选择器类型，处理第一次请求之后的默认选中 defaultSelectedRowKeys 函数
  useUpdateEffect(() => {
    if (originRowSelection === false) return;
    if (originRowSelection.selectionButtonsMode === 'multiple') return;
    if (isFunction(originRowSelection.defaultSelectedRowKeys) === false) return;
    if (hasUpdateDefaultValueRef.current === false) {
      updateDefault();
      hasUpdateDefaultValueRef.current = true;
    }
  }, [res, originRowSelection]);

  return {
    rowSelection,
    originRowSelection,
    selectedRows,
    selectedRowKeys,
    currentOpenSelectionKeyRef,
    clearSelected,
    clearSelectedOnSearch,
    updateDefault,
    open,
    setOpen,
    res,
  };
}

export default useTableSelection;
