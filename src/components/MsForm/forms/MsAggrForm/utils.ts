/** 合法类型，合法才能展示到选择器中，不合法将直接过滤 */
export const LEGAL_VALUE_TYPES = [
  'text',
  'textArea',
  'password',
  'select',
  'checkbox',
  'cascader',
  'treeSelect',
  'radio',
  'time',
  'timeRange',
  'date',
  'dateRange',
  'resourceTags',
  'presetResourceTags',
  'resourceType',
];

/**
 * 类型映射，在聚合筛选器中只能存在 text, select, cascader, treeSelect 四种类型
 * 功能类似的要映射成这几种类型
 * @param valueType
 * @returns
 */
export function mapValueType(valueType: string = 'text') {
  const mapping: Record<string, any> = {
    text: 'text',
    textArea: 'text',
    password: 'text',
    radio: 'select',
    checkbox: 'select',
    switch: 'select',
    digit: 'number',
    resourceTags: 'text',
    presetResourceTags: 'text',
    resourceType: 'resourceType',
  };

  return mapping[valueType] ?? valueType;
}

/**
 * 根据 valueType 类型映射选择器类型
 * @param valueType
 * @returns
 */
export function mapSelectMode(valueType: string = 'text') {
  const mapping: Record<string, any> = {
    checkbox: 'multiple',
  };

  return mapping[valueType];
}
