/**
 * 人员姓氏对应颜色
 * @param str 人员的名称
 * @returns 色号
 */
export const getAvatarBgColor = (str: string) => {
  const colorList = ['#5EBCC2', '#FAB065', '#7A9AF5', '#EA7F98', '#E8A78D', '#A4CD86'];

  return colorList[str?.charCodeAt(0) % colorList.length];
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
