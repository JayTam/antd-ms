import type { LocaleType } from '@jaytam/antd-ms/locale';
import type { DropDownMenuItemType } from '../types';

/** 默认的字段名映射 */
export const FIELD_NAMES = { id: 'id', title: 'title', tag: 'tag', count: 'count' };

// 视图列表item下拉菜单默认值
export const getViewDefaultMenu = (locale: LocaleType['global']): DropDownMenuItemType[] => {
  return [
    {
      label: locale.setTop,
      key: 'top',
    },
    {
      label: locale.sort,
      key: 'sort',
    },
    {
      label: locale.edit,
      key: 'edit',
    },
    {
      label: locale.delete,
      key: 'del',
    },
  ];
};

// 视图表单保存下拉菜单默认值
export const getViewFormSaveDefaultMenu = (locale: LocaleType['MsViewList']) => {
  return [
    {
      label: locale.save,
      key: 'save',
    },
    {
      label: locale.saveAs,
      key: 'saveAs',
    },
  ];
};
