import { useControllableValue, useUpdateEffect } from 'ahooks';
import { Checkbox, Select } from 'antd';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { includes, isNil, omit } from 'lodash-es';
import { forwardRef, useMemo, useState } from 'react';
import type { SelectProps } from '../../types';
import BaseSelect from './BaseSelect';

const Option = Select.Option;

const CheckboxSelect = forwardRef<any, SelectProps>((props, ref) => {
  const { options = [] } = props;

  const [value, setValue] = useControllableValue(props);

  //控制全选的状态
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);

  // 判断两个数组是否相等，忽略顺序
  const arraysEqual = (a1: any[], a2: any[]) => {
    // 对数组进行排序
    const sortedA1 = a1.slice().sort();
    const sortedA2 = a2.slice().sort();
    // 比较排序后的数组
    return JSON.stringify(sortedA1) === JSON.stringify(sortedA2);
  };

  // 过滤出options未被禁用的所有的values
  const allValues = useMemo(
    () =>
      options
        ?.filter((option) => !option?.disabled)
        .map((option: Record<string, any>) => option?.value),
    [options],
  );

  // 判断是否全选
  useUpdateEffect(() => {
    // 全不选的判断样式设置
    if (!value || value.length < 1) {
      setIndeterminate(false);
      setCheckedAll(false);
      return;
    }
    // 全选判断和样式设置
    if (arraysEqual(allValues, value)) {
      setIndeterminate(false);
      setCheckedAll(true);
    } else {
      setIndeterminate(true);
      setCheckedAll(false);
    }
  }, [value, allValues]);

  // 点击全选或反选
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      setValue(allValues);
    } else {
      setValue([]);
    }
    setIndeterminate(false);
    setCheckedAll(e.target.checked);
  };

  // 复选框改变时
  const onCheckChange = (e: any, val: string) => {
    if (e.target.checked) {
      setValue([...(value ?? []), val]);
    } else {
      const newValue = value.filter((item: any) => (item?.value ?? item) !== val);
      setValue(newValue);
    }
  };

  // 点击复选框，阻止事件冒泡，导致多次执行option的onChange
  const onClickCheckbox = (e: any) => {
    e.stopPropagation();
  };

  return (
    <BaseSelect
      {...omit(props, 'options')}
      ref={ref}
      value={value}
      onChange={(e: any) => {
        setValue(e.filter((val: any) => !isNil(val)));
      }}
      mode="multiple"
      optionLabelProp="aria-renderLabel"
    >
      {options.length > 0 && (
        <Option>
          <Checkbox
            onClick={onClickCheckbox}
            onChange={onCheckAllChange}
            checked={checkedAll}
            indeterminate={indeterminate}
            style={{ width: '100%' }}
          >
            全选
          </Checkbox>
        </Option>
      )}

      {options?.map((option: Record<string, any>) => (
        <Option
          {...option}
          key={option?.value}
          aria-renderLabel={option?.label}
          className="hide-selected-icon"
        >
          <Checkbox
            disabled={option?.disabled}
            checked={includes(value, option?.value)}
            onClick={onClickCheckbox}
            onChange={(e) => onCheckChange(e, option?.value)}
          />
          <span style={{ marginLeft: '8px' }}>{option?.label}</span>
        </Option>
      ))}
    </BaseSelect>
  );
});

export default CheckboxSelect;
