import type { RefSelectProps, SelectProps } from 'antd';
import { Select } from 'antd';
import { isNil, isUndefined } from 'lodash-es';
import type { Ref } from 'react';
import { forwardRef, useEffect, useMemo } from 'react';
import { findClosest } from '../utils';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';

export type IpCellProps = Omit<SelectProps, 'onChange'> & {
  dot?: boolean;
  onChange?: (value: string) => void;
  /** 合法 value 范围 */
  validValueRange?: number[];
};

const IpSelectCell = forwardRef((props: IpCellProps, ref: Ref<RefSelectProps>) => {
  const { dot = true, className, validValueRange, onChange, ...selectProps } = props;
  const { getPopupContainer } = useFieldPopupContainer();

  const defaultOptions = useMemo(() => {
    if (isNil(validValueRange)) {
      return Array.from({ length: 256 }, (_, i) => i).map((item) => ({
        label: item,
        value: item,
      }));
    }

    return validValueRange.map((item) => ({
      label: item,
      value: item,
    }));
  }, [validValueRange]);

  useEffect(() => {
    if (validValueRange) {
      const formatValueString = selectProps.value?.replace(/[^\d]/g, '');
      const formatValueNumber = formatValueString === '' ? undefined : parseInt(formatValueString);
      if (isUndefined(formatValueNumber)) {
        return;
      }
      if (!validValueRange.includes(formatValueNumber)) {
        const closeValue = findClosest(formatValueNumber, validValueRange);
        onChange?.(closeValue?.toString());
      }
    }
  }, [onChange, selectProps.value, validValueRange]);

  return (
    <span className={className}>
      <Select
        ref={ref}
        disabled={validValueRange && validValueRange.length === 0}
        options={defaultOptions}
        getPopupContainer={getPopupContainer}
        {...selectProps}
        onChange={onChange}
        className="ip-input"
        bordered={false}
      />

      {dot && <span className="dot" />}
    </span>
  );
});

export default IpSelectCell;
