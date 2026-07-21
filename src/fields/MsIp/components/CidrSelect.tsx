import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { isNil } from 'lodash-es';
import { useMemo } from 'react';
import type { IpProps } from '../types';

type CidrSelectProps = Pick<IpProps, 'cidrType' | 'cidrPrefixRange'> & {
  value?: number;
  onChange?: (value: number) => void;
} & Omit<SelectProps, 'value' | 'onChange' | 'options'>;

function CidrSelect(props: CidrSelectProps) {
  const { cidrType, cidrPrefixRange, value, onChange, ...selectProps } = props;

  const options = useMemo(() => {
    const [min = 16, max = 24] = cidrPrefixRange ?? [16, 24];
    const list = [];
    for (let index = min; index <= max; index++) {
      list.push({ label: index, value: index });
    }
    return list;
  }, [cidrPrefixRange]);

  if (isNil(cidrType)) return null;

  return (
    <span className="ip-cell-with-mask">
      <span className="mask">/</span>
      <Select
        {...selectProps}
        value={value}
        onChange={onChange}
        className="subnet-mask-select"
        bordered={false}
        options={options}
        // cidrType 表示 IP，默认禁用选择器
        disabled={cidrType === 'ip' ? selectProps.disabled ?? true : selectProps.disabled}
      />
    </span>
  );
}

export default CidrSelect;
