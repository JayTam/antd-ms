import type React from 'react';

export type SchemaValueEnumType = {
  /** @name 演示的文案 */
  text?: React.ReactNode;
  /** @name 预定的颜色 */
  status?: string;
  /** @name 图标 */
  icon?: React.ReactNode;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
  children?: SchemaValueEnumType[];
};

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type SchemaValueEnumMap = Map<React.ReactText, SchemaValueEnumType | React.ReactNode>;

export type SchemaValueEnumObj = Record<string, SchemaValueEnumType | React.ReactNode>;

export type SchemaValueEnumArray = Record<string, any>[] | string[];

export type FieldValueEnumType = SchemaValueEnumMap | SchemaValueEnumObj | SchemaValueEnumArray;

export type ValueEnumFieldNames = { label?: string; value?: string; children?: string };
