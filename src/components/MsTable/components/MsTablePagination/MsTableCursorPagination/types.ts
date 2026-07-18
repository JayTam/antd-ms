import type { PaginationProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';

export type MsTableCursorPaginationProps<D> = Omit<PaginationProps, 'onChange'> & {
  pageStart?: string;
  pageType?: 'prev' | 'next';
  dataSource?: D[];
  pageStartKey?: NamePath;
  hasPrev?: boolean;
  hasNext?: boolean;
  onChange?: (
    page?: number,
    pageSize?: number,
    pageStart?: string,
    pageType?: 'prev' | 'next',
  ) => void;
};
