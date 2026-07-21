import { flatMapDeep, isArray, omit } from 'lodash-es';

/**
 * 递归拍平children, 合并userList
 */
export function flatTreeWithUserList<T extends Record<string, any>[]>(options: T): T {
  return flatMapDeep(options, (option: any) => {
    const newOption = Object.assign(omit(option, ['children', 'userList']), { search: false });
    if (isArray(option.children)) {
      return flatTreeWithUserList(option.children).concat(newOption, ...(option?.userList ?? []));
    } else {
      return [newOption, ...(option?.userList ?? [])];
    }
  }) as T;
}

/**
 * 递归拍平children
 */
export function flatTreeDeep<T extends Record<string, any>[]>(options: T): T {
  return flatMapDeep(options, (option: any) => {
    const newOption = Object.assign(omit(option, ['children', 'userList']), { search: false });
    if (isArray(option.children)) {
      return flatTreeDeep(option.children).concat(newOption);
    } else {
      return newOption;
    }
  }) as T;
}
