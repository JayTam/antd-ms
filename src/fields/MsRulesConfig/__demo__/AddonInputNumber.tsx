import { InputNumber, Select } from 'antd';

const options = [
  {
    value: 'min',
    label: '分钟',
  },
  {
    value: 'hour',
    label: '小时',
  },
  {
    value: 'day',
    label: '天',
  },
];

export const SYMBOL = '&';

// const defaultValue = `8${SYMBOL}min`;

const AddonInputNumber = (props: {
  id?: string;
  value?: string;
  onChange?: (event: any) => void;
  mode?: 'read';
  placeholder?: string;
}) => {
  const { id, value = '&min', onChange, placeholder = '请输入' } = props;
  const selectAfter = (
    <Select
      value={value?.split(SYMBOL)?.[1]}
      style={{ width: 80 }}
      options={options}
      onChange={(e) => {
        const time = value?.split(SYMBOL)?.[0];
        onChange?.(`${time}${SYMBOL}${e}`);
      }}
    />
  );
  return (
    <div id={id}>
      <InputNumber
        addonAfter={selectAfter}
        value={value?.split(SYMBOL)?.[0]}
        placeholder={placeholder}
        // precision={1}
        min="1"
        // formatter={(v) => `${v}`.replace(/(\.\d*?[1-9])?0+$/, '$1').replace(/\.$/, '')}
        onChange={(e) => {
          const unit = value?.split(SYMBOL)?.[1];
          if (e) {
            onChange?.(`${e}${SYMBOL}${unit}`);
          } else {
            onChange?.(`${SYMBOL}${unit}`);
          }
        }}
      />
    </div>
  );
};

export default AddonInputNumber;
