import { MD5 } from 'crypto-js';
import type { MsTableColumns } from '../types';
import { flatTableColumns } from './fomColumns';

/**
 * 生成持久化键 storeName
 * @param columns
 * @returns
 */
export function generateStoreName(columns?: MsTableColumns): string {
  const flattedColumns = flatTableColumns(columns);
  const list = flattedColumns.map((column) => {
    if ('children' in column) {
      return { key: column.key, title: column.title };
    }
    return { key: column.key, title: column.title, dataIndex: column.dataIndex };
  });

  return MD5(JSON.stringify(list)).toString();
}
