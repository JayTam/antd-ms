import type { DropDownProps, PopconfirmProps } from 'antd';
import type { DropdownButtonProps } from 'antd/es/dropdown';
import type { MenuItemType } from 'rc-menu/lib/interface';
import type { ReactNode } from 'react';

/** MsDropDown和MsDropDown.Button公用传参 */
export type MsDropDownCommonProps = DropDownProps & DropdownExtraType;

/** MsDropDown传参 */
export type MsDropDownProps = MsDropDownCommonProps & TriggerDropDownCommonType;

/** MsDropDown.Button传参 */
export type MsDropDownButtonProps = MsDropDownCommonProps & DropdownButtonProps;

type DropdownExtraType = {
  /**触发器根节点类名 */
  triggerClassName?: string;
  /**触发器根节点样式 */
  triggerStyle?: React.CSSProperties;
  /**触发器点击事件 */
  onTriggerClick?: TriggerProps['onClick'];
  /**是否显示下来展开箭头，如果类型为ReactNode，会自定义展开样式 */
  triggerArrow?: TriggerProps['arrow'];
  /** 下拉箭头样式 */
  triggerArrowStyle?: TriggerProps['arrowStyle'];
  /** 选择菜单后是否弹出二次确认，可以自定义popconfirm的配置参数 */
  popconfirm?:
    | boolean
    | (Omit<PopconfirmProps, 'title'> & {
        title?: ReactNode | ((props: MenuItemType) => ReactNode);
      });
};

export type TriggerDropDownCommonType = {
  /** 根节点样式 */
  className?: string;
  /** dropdown展示的类型 */
  type?: 'text' | 'card' | 'button';
  /** 设置type为button时，可以设置button的样式类型 */
  buttonType?: 'primary' | 'default';
  children?: ReactNode;
};

export type TriggerProps = TriggerDropDownCommonType & {
  /** 是否展示标题旁边的下拉箭头，或自定义控制展示逻辑 */
  arrow?: boolean | ReactNode | ((open?: boolean) => ReactNode);
  arrowStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  /** 当前下拉箭头是否需要rotate 180deg */
  rotate?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
};
