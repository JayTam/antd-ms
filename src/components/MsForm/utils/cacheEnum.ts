/**
 * 删除 Form.list 的索引
 * @param id  是由表单项id和params序列化之后md5拼接得到
 * @returns
 */
export function omitListIndexInValueEnumCacheId(id: string) {
  const [name, params] = id.split('&');
  // 剔除 Form.list 的索引
  const nameWithoutIndex = name.replace(/\_[\d]+\_/, '_');
  return `${nameWithoutIndex}&${params}`;
}
