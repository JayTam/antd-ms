import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { Col, Form } from 'antd';
import { get, isFunction, isUndefined } from 'lodash-es';
import { useMemo, useState } from 'react';

import SelectQueryField from './SelectQueryField';

import './index.less';

import type { NamePath } from 'antd/es/form/interface';
import type { SelectQueryProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

function SelectQuery<P, R, D>(props: SelectQueryProps<P, R, D>) {
  const {
    columns: _columns = [],
    isValidateForm = true,
    searchConfig,
    mountInitialValues,
    onSearch,
  } = props;
  const form = Form.useFormInstance();

  const { currentLocale } = useLocale('MsForm');

  // 处理默认值
  const columns = useMemo(
    () =>
      cloneDeepWithReactNode(_columns)
        .filter((column) => isUndefined(column.valueType) || column.valueType === 'text')
        .map((column) => {
          column.formItemProps = isFunction(column.formItemProps)
            ? column.formItemProps(form)
            : column.formItemProps ?? {};
          column.formItemProps.name = column.formItemProps.name ?? (column.dataIndex as NamePath);
          column.formItemProps.label = column.formItemProps.label ?? column.title;
          if (!isValidateForm) {
            column.formItemProps.rules = undefined;
          }
          column.fieldProps = isFunction(column.fieldProps)
            ? (column.fieldProps(form) as Record<string, any>)
            : column.fieldProps ?? {};
          column.fieldProps.placeholder = column.fieldProps.placeholder
            ? column.fieldProps.placeholder
            : currentLocale.pleaseInput + column.title;
          return column;
        }),
    [_columns, form, isValidateForm, currentLocale],
  );

  // 可选项
  const options = columns.map((column: any) => ({
    label: column.formItemProps?.label,
    value: column.formItemProps?.name?.toString(),
  }));

  /**
   * 获取 selectKey 默认值
   * 如果表单项有url初始值，优先选中该项
   * @returns
   */
  const getDefaultSelectKey = () => {
    const selectOption = options.find((option) => get(mountInitialValues, option.value));

    if (selectOption) {
      return selectOption?.value;
    } else {
      return options[0]?.value;
    }
  };

  const [selectKey, setSelectKey] = useState<string>(getDefaultSelectKey());

  const currentColumn = columns.find((column) => column.formItemProps?.name === selectKey);

  /**
   * 选择搜索项，需要清空选中项之外所有的搜索项
   * @param value
   */
  const handleSelectChange = (value: string) => {
    setSelectKey(value);
    // 清空选择器中的所有值
    const fields = columns
      .map((column) => column.formItemProps?.name)
      .map((namePath) => ({ name: namePath, value: undefined }));
    form.setFields(fields);
  };

  return (
    <>
      {currentColumn && (
        <Col {...currentColumn.colProps}>
          <Form.Item
            key={currentColumn.formItemProps?.name?.toString()}
            {...currentColumn.formItemProps}
            label={null}
          >
            <SelectQueryField
              selectKey={selectKey}
              options={options}
              currentColumn={currentColumn}
              searchConfig={searchConfig}
              onSelectChange={handleSelectChange}
              onSearch={onSearch}
            />
          </Form.Item>
        </Col>
      )}
    </>
  );
}

export default SelectQuery;
