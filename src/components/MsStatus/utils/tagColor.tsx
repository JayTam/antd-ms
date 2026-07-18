/**
 *  将十六进制颜色值转换为RGBA格式
 * @param hexColor 十六进制颜色值
 * @param alpha 透明度
 * @returns RGBA格式
 */
export const adjustColorTransparency = (hexColor: string, alpha: number = 0.1) => {
  const r = parseInt(hexColor?.slice(1, 3), 16);
  const g = parseInt(hexColor?.slice(3, 5), 16);
  const b = parseInt(hexColor?.slice(5, 7), 16);

  // 返回带有透明度的新颜色
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
