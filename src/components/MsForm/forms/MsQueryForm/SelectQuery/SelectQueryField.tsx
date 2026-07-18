import type { MsFormColumnType } from '@jaytam/antd-ms';
import type { MsTableSearchType } from '@jaytam/antd-ms/components/MsTable/types';
import type { InputRef, SelectProps } from 'antd';
import { Form, Input, Select } from 'antd';
import cs from 'classnames';
import { isFunction, omit } from 'lodash-es';
import { useRef } from 'react';

type SelectQueryFieldProps<P, R, D> = {
  currentColumn?: MsFormColumnType<D>;
  options?: SelectProps['options'];
  selectKey?: string;
  onSelectChange?: (value: any) => void;
  id?: string;
  value?: string;
  searchConfig?: MsTableSearchType<P, R, D>;
  onChange?: () => void;
  onSearch?: () => void;
};

function SelectQueryField<P, R, D>(props: SelectQueryFieldProps<P, R, D>) {
  const {
    id,
    value,
    onChange,
    currentColumn,
    options = [],
    selectKey,
    searchConfig,
    onSearch,
    onSelectChange,
  } = props;

  const form = Form.useFormInstance();
  const ref = useRef<InputRef>(null);

  const handleSearch = () => {
    if (isFunction(onSearch)) {
      onSearch?.();
    } else {
      form.submit();
    }
    ref.current?.blur();
  };

  return (
    <Input.Group
      compact
      className={cs('ms-select-query', searchConfig?.className)}
      style={searchConfig?.style}
    >
      {/* 选择器，2个以上选项才显示 */}
      {options.length > 1 ? (
        <Select
          className={cs('ms-select-query-select')}
          options={options}
          value={selectKey}
          style={searchConfig?.querySelectStyle}
          onChange={onSelectChange}
          data-testid={'ms-query-merged-select'}
          // 这里不能挂载到父节点，会被 Table rowSelection 遮住
          // getPopupContainer={(triggerNode) => triggerNode.parentElement}
        />
      ) : null}
      {/* 搜索器 */}
      <Input.Search
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        allowClear
        className={cs('ms-select-query-search')}
        placeholder={(currentColumn?.fieldProps as any)?.placeholder}
        onSearch={handleSearch}
        {...omit(currentColumn?.fieldProps, 'style', 'selectStyle', 'searchStyle')}
        style={searchConfig?.querySearchStyle}
      />
    </Input.Group>
  );
}

export default SelectQueryField;
