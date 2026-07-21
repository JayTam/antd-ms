import type { DropDownMenuItemType, MsViewListDropDownMenuType } from '../types';

export const mergeMenu = (
  menu: MsViewListDropDownMenuType[] = [],
  defaultMenu: DropDownMenuItemType[],
) => {
  const menuMap = new Map(defaultMenu.map((item) => [item?.key, item]));
  const result = menu.reduce((acc: DropDownMenuItemType[], item) => {
    if (typeof item === 'string') {
      const menuItem = menuMap.get(item);
      if (menuItem) {
        acc.push(menuItem);
      }
    } else if (typeof item === 'object') {
      acc.push(item);
    }
    return acc;
  }, []);
  return result as DropDownMenuItemType[];
};
