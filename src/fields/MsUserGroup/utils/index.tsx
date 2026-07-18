import { cloneDeep, flatMapDeep, forIn, isArray, omit } from 'lodash-es';
import { FILED_NAMES } from '../config';
import type { DataType, EnumFiledNamesType } from '../types';

export const getFiledNames = (filed?: Record<string, any>) => {
  if (filed) {
    forIn(FILED_NAMES, (value, key) => {
      if (!filed[key]) {
        filed[key] = value;
      }
    });
    return filed as typeof FILED_NAMES;
  }
  return FILED_NAMES;
};

// 使用首字母或者第一个字获取对应的色值
export const getColorByFirstChar = (str: string) => {
  const colorList = [
    'rgba(110,200,120,1)',
    'rgba(255,93,120,1)',
    'rgba(93,174,255,1)',
    'rgba(255,174,93,1)',
    'rgba(143,102,221,1)',
    'rgba(109,170,118,1)',
    'rgba(171,227,111,1)',
    'rgba(243,205,73,1)',
    'rgba(204,155,213,1)',
    'rgba(124,75,216,1)',
    'rgba(234,132,147,1)',
    'rgba(113,214,199,1)',
    'rgba(66,144,247,1)',
    'rgba(219,153,102,1)',
    'rgba(89,191,193,1)',
    'rgba(113,214,199,1)',
    'rgba(208,135,224,1)',
    'rgba(138,216,150,1)',
    'rgba(109,162,224,1)',
    'rgba(128,132,247,1)',
    'rgba(103,142,224,1)',
    'rgba(141,221,223,1)',
    'rgba(114,103,198,1)',
  ];

  return colorList[str?.charCodeAt(0) % colorList.length];
};

// 格式化获取机构
export const getOrgTierName = (orgTierName: string | undefined) => {
  const _orgTierName = orgTierName?.split('-') || [];
  if (_orgTierName?.length > 3) {
    _orgTierName.splice(0, _orgTierName?.length - 3);
  }
  return _orgTierName.join('-');
};

// 高亮显示搜索值，searchValue搜索的值
export const highLight = (str: string, searchValue?: string) => {
  if (!searchValue) {
    return str;
  }
  const index = str.indexOf(searchValue);
  const beforeStr = str.substring(0, index);
  const afterStr = str.slice(index + searchValue.length);
  const title =
    index > -1 ? (
      <span>
        {beforeStr}
        <span style={{ color: '#1890ff' }}>{searchValue}</span>
        {afterStr}
      </span>
    ) : (
      str
    );

  return title;
};

/**
 * 递归拍平children
 */
export function flatTreeDeep<T extends any[]>(options: T): T {
  return flatMapDeep(options, (option: any) => {
    if (isArray(option.children)) {
      const columnWithoutColumns = omit(option, 'children');
      return flatTreeDeep(option.children).concat(columnWithoutColumns);
    } else {
      return option;
    }
  }) as T;
}

/**
 * 查找options里面和targetValue匹配的数据
 */
export function findGroupChild<T extends Record<string, any>>(
  options: T[],
  targetValue: string,
): T {
  let resObj = null;
  const loop = (opts: T[]) => {
    for (let i = 0; i < opts.length; i++) {
      if (opts[i]?.value === targetValue) {
        resObj = opts[i];
        return;
      }
      if (opts[i]?.children) {
        loop(opts[i]?.children);
      }
    }
  };
  loop(options);
  return resObj ?? ({} as T);
}

/**
 * 根据filedName转化团队或者用户的数据
 */

export function parsingFiledNames(
  data: any[],
  filedNames: Required<EnumFiledNamesType>,
  type: string,
) {
  const options = cloneDeep(data);
  options?.forEach((item) => {
    item.fullCode = item?.[filedNames?.fullCode];
    item.fullName = item?.[filedNames?.fullName];
    item.searchType = type;
    if (item?.children) {
      item.children = parsingFiledNames(item?.children, filedNames, type);
    }
  });
  return options;
}

/**
 *
 * @param value value或者defaultValue值
 * @param valueEnumFiledNames 配置数据转换
 * @returns
 */
export const formatValue = (
  value?: Record<string, any>[],
  valueEnumFiledNames?: EnumFiledNamesType,
) => {
  const userFiledNames = getFiledNames(valueEnumFiledNames);

  value?.forEach((item) => {
    item.label = item?.[userFiledNames?.label];
    item.value = item?.[userFiledNames?.value];
    item.email = item?.[userFiledNames?.email];
    item.fullName = item?.[userFiledNames?.fullName];
    item.fullCode = item?.[userFiledNames?.fullCode];
    item.position = item?.[userFiledNames?.position];
  });
  return value ?? [];
};

export const inOptionBySearchCode = (
  option?: DataType,
  searchValue?: string,
  searchCode = ['label'],
) => {
  return searchCode.some((c: string) => {
    if (!option?.[c]) return false;
    const value = typeof option[c] === 'number' ? String(option[c]) : option[c];
    return value?.toLowerCase()?.includes(searchValue?.toLowerCase());
  });
};

/**
 * 通过输入的值和可搜索字段去过滤
 * @param options 需要被过滤的数据源
 * @param searchValue 搜索的value
 * @param searchCode 根据哪些字段做过滤
 * @returns
 */
export const filterBySearchCode = (
  options?: DataType[],
  searchValue?: string,
  searchCode = ['label'],
) => {
  if (!searchValue) {
    return options;
  }
  return options?.filter((option) => inOptionBySearchCode(option, searchValue, searchCode));
};

/**
 * 根据团队或者人员返回对应的icon颜色
 * @param item 渲染的团队或者人员的数据
 * @returns 颜色值
 */
export const getColor = (item: DataType) => {
  if (item.searchType === 'group') {
    return '#1890ff';
  }
  return getColorByFirstChar(item?.label);
};
