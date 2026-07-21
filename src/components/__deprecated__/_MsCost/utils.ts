// 找出计费里最大容量和最小容量
export function getValue(type: 'max' | 'min', regularPricings: any[]) {
  const val: number[] = [];
  regularPricings?.forEach((item) => {
    val.push(type == 'max' ? item.maxCapacity : item.minCapacity);
  });
  if (val.length == 0) return 0;
  return type == 'max' ? Math.max(...val) : Math.min(...val);
}

export function getMarks(max: number, min: number, name: string) {
  const item = Math.round(max / 4);
  const mk: any = { min: min + name };
  for (let index = item; index <= max; index += item) {
    mk[index] = index + name;
  }
  return mk;
}
