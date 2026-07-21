import { useDeepCompareEffect } from 'ahooks';
import type { ColumnType } from 'antd/es/table';
import { cloneDeep } from 'lodash-es';
import { useMemo, useState } from 'react';
import type { ResizableProps } from 'react-resizable';
import type { MsTableColumns } from '../../types';
import { columnsToKeys } from '../MsTableColumnContainer/utils/column';
import MsTableColumnTitle from './index';

/**
 * 列宽度拖移
 * 关闭：直接返回 columns
 * 开启：
 * @param originColumns
 * @param openColumnsResize
 * @returns
 */
export function useColumnsResizable(originColumns: MsTableColumns, openColumnsResize = false) {
  const [widthList, setWidthList] = useState<(number | string | undefined)[]>([]);
  const columnKeys = columnsToKeys(originColumns);
  const columnWidths = originColumns.map((column) => column.width);

  useDeepCompareEffect(() => {
    setWidthList(originColumns.map((column) => column.width));
  }, [columnKeys, columnWidths]);

  const columns = useMemo(() => {
    return originColumns.map((column, index) => {
      if (column.width) {
        return {
          ...column,
          width: widthList[index],
          onHeaderCell: (col: any) => ({
            width: col.width,
            onResize: ((e, x) => {
              const { size } = x;
              setWidthList((prev) => {
                const newWidthList = cloneDeep(prev);
                newWidthList[index] = size.width;
                return newWidthList;
              });
            }) as ResizableProps['onResize'],
          }),
        };
      }
      return column;
    });
  }, [originColumns, widthList]);

  if (openColumnsResize) {
    return { columns: columns as ColumnType<any>[], ResizableTitle: MsTableColumnTitle };
  } else {
    return { columns: originColumns as ColumnType<any>[], ResizableTitle: undefined };
  }
}
