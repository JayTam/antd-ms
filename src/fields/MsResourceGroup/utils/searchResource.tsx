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
