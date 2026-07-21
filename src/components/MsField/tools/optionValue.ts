import { isArray, isNil } from 'lodash-es';

/**
 * 获取第一个 option 的值
 * option 只有一层：直接返回 option.value
 * option 有多层：递归拿到所有 option.value，并组成列表
 * @param options
 */
export function getFirstOption(options: any, column: any) {
  // 这里要指定组件才做递归获取，如果是 select 不做
  const valueType = column.valueType ?? 'text';
  const { fieldProps = {} } = column;
  if (isNil(options)) return;
  if (!isArray(options)) return;
  const headOption = options[0];

  // 单选
  const singleSelect = () => headOption;
  // 多选，只选一层
  const multipleSelect = () => (isNil(headOption) ? undefined : [headOption]);
  // 多选，递归选择
  const multipleDeepSelect = () => {
    const result: string[] = [];
    const recursionOptions = (opts: any) => {
      const headOpt = opts[0];
      if (isNil(headOpt)) return;
      result.push(headOpt);
      if (!!headOpt?.children?.length) {
        recursionOptions(headOpt.children);
      }
    };
    recursionOptions(options);
    // 递归时第一层没选中，那么整个都没选中
    if (isNil(result[0])) return;
    return result;
  };

  if (valueType === 'select') {
    if (fieldProps.mode === 'multiple' || fieldProps.mode === 'tags') {
      return multipleSelect();
    } else {
      return singleSelect();
    }
  }

  if (valueType === 'radio') {
    return singleSelect();
  }

  if (valueType === 'checkbox') {
    return multipleSelect();
  }

  if (valueType === 'cascader') {
    if (fieldProps.changeOnSelect) {
      return multipleSelect();
    } else {
      return multipleDeepSelect();
    }
  }

  if (valueType === 'treeSelect') {
    if (fieldProps.multiple) {
      return multipleDeepSelect();
    } else {
      return multipleSelect();
    }
  }

  return singleSelect();
}

/**
 * 解析 fistOption 的 value，处理单值和多值的情况
 * @param firstOption
 * @returns
 */
export function getFirstOptionValue(firstOption: any) {
  if (isArray(firstOption)) {
    return firstOption.map((item) => item.value);
  } else {
    return firstOption?.value;
  }
}

/**
 * 解析 fistOption 的 label，处理单值和多值的情况
 * @param firstOption
 * @returns
 */
export function getFirstOptionLabel(firstOption: any) {
  if (isArray(firstOption)) {
    return firstOption.map((item) => item.label);
  } else {
    return firstOption?.label;
  }
}
