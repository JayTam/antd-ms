import { normalizeTwoToneColors } from '../utils';
import ReactIcon from './IconBase';

export type TwoToneColor = string | [string, string];

export function setTwoToneColor(twoToneColor: TwoToneColor): void {
  const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);
  return ReactIcon.setTwoToneColors({
    primaryColor,
    secondaryColor,
  });
}

export function getTwoToneColor(): TwoToneColor {
  const colors = ReactIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
