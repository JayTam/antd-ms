import { forOwn, isEmpty } from 'lodash-es';
import type { MsFormColumns } from '../../MsForm';
import type { QueryType } from '../types';

/**
 * 筛选项数字
 * @param props
 * @param query
 * @returns
 */
function useFilterNumber<D>(columns: MsFormColumns<D> = [], query: QueryType = {}) {
  let count = 0;
  const keys = columns
    .filter((column: any) => column.search || column.filters)
    .map((column) => column?.formItemProps?.name ?? column.dataIndex);

  forOwn(query, (value, key) => {
    if (keys.includes(key) && !isEmpty(value)) {
      count += 1;
    }
  });

  return count;
}

export default useFilterNumber;
