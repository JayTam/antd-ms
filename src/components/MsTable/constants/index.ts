import type { MsTableSearchType } from '../types';

/** col 响应式默认值 */
export const DEFAULT_COL_CONFIG = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  xxl: 6,
};

/** paginationFieldNames 默认值 */
export const DEFAULT_PAGINATION_FIELD_NAMES = {
  data: 'list',
  current: 'pageNo',
  pageStart: 'pageStart',
  pageSize: 'pageSize',
  hasNext: 'hasNext',
  hasPrev: 'hasPrev',
  total: 'total',
};

/** sortName 默认值 */
export const DEFAULT_SORT_NAMES = { ascend: 'ascend', descend: 'descend' };

/** 表格中的筛选表单 name，避免和抽屉和弹窗表单中的字段 id 冲突 */
export const TABLE_FORM_NAME = 'MsTableForm';

/** 行高 */
export const SPACE_SIZE = {
  small: 20,
  middle: 26,
  large: 32,
};

/** 表格间隙  */
export const TABLE_SPACE = 16;

export const CURRENT_KEY = 'current';
export const PAGE_SIZE_KEY = 'pageSize';
export const PAGE_START_KEY = 'pageStart';
export const PAGE_TYPE_KEY = 'pageType';
export const HAS_NEXT_KEY = 'hasNext';
export const HAS_PREV_KEY = 'hasPrev';
export const FRONTEND_PAGINATION_KEY = 'frontend_pagination';
export const SEARCHING_KEY = 'current_searching';
export const TABLE_INTERNAL_KEYS = [
  CURRENT_KEY,
  PAGE_SIZE_KEY,
  PAGE_START_KEY,
  PAGE_TYPE_KEY,
  HAS_NEXT_KEY,
  HAS_PREV_KEY,
  FRONTEND_PAGINATION_KEY,
  SEARCHING_KEY,
];

export const SINGLE_SELECT_TABLE_FILTER = ['select', 'radio'];
export const MULTIPLE_SELECT_MULTIPLE_FILTER = ['checkbox'];

/** MsTable.search 配置的默认值 */
export const DEFAULT_SEARCH_CONFIG: MsTableSearchType<any, any, any> = {
  filterType: 'query',
  labelWidth: '80px',
  filterStyle: {},
  defaultCollapsed: true,
  showSubmitBtn: true,
  showResetBtn: true,
};
