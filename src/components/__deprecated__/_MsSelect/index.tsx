import { ReloadOutlined } from '@ant-design/icons';
import { useDeepCompareEffect } from 'ahooks';
import { Button, Cascader, Checkbox, Form, Input, Radio, Select } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { RadioChangeEvent } from 'antd/es/radio';
import React, { useEffect, useState } from 'react';
import type { MsSelectProps } from './types';

const MySelect: React.FC<MsSelectProps> = (props) => {
  const {
    url,
    params,
    transform,
    fieldNames = { label: 'label', value: 'value', options: 'options' },
    value,
    selectType = 'select',
    isRefresh = false,
    clearValue = false,
    clearValues,
    clearDatas,
    ...restProps
  } = props;
  const [loading, setLoading] = useState(false);
  const [_value, setValue] = useState(value);
  const [list, setList] = useState<any[]>([]);
  const form = Form.useFormInstance();

  // 获取数据
  const getList = () => {
    if (url) {
      setLoading(true);
      if (clearDatas) {
        setList([]); // 去除上次的数据
      }
      if (url instanceof Promise) {
        url.then((res: any) => {
          changeData(res);
        });
      } else if (url instanceof Function) {
        url({
          ...params,
        }).then((res: any) => {
          changeData(res);
        });
      } else if (url instanceof Array) {
        changeData(url);
      } else {
        setLoading(false);
      }
    }
  };

  useDeepCompareEffect(() => {
    getList();
  }, [url, params]);

  useEffect(() => {
    setValue(value);
    if (clearValues && Array.isArray(clearValues) && form) {
      clearValues.forEach((key) => {
        form.setFieldValue(key, undefined);
      });
    }
  }, [clearValues, form, value]);

  // 更新
  function changeData(res: any) {
    let data = res?.data || res;
    // 更改值钩子
    if (transform) {
      data = transform(data, res) || data;
    }
    setList(data);
    setLoading(false);
    if (clearValue && value) {
      // 新的列表找不到对应的值 就把值清空
      const item = list.find((o) => o[fieldNames.value] === value);
      if (!item) {
        restProps?.onChange?.(null);
      }
    }
  }

  // 筛选
  function mySearch(inputValue: string, option: any) {
    const name = option[fieldNames.label] || option.children;
    return name.includes(inputValue);
  }

  // -----------------------------分割块--------------------------------------------
  // raido改变
  const raidoChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    const item = list.find((o) => o[fieldNames.value] === value);
    restProps.onChange(value, item);
  };
  if (selectType === 'radio') {
    return (
      <Radio.Group value={value} {...restProps} onChange={raidoChange}>
        {list?.map((item) => (
          <Radio value={item[fieldNames.value]} key={item[fieldNames.value]}>
            {item[fieldNames.label]}
          </Radio>
        ))}
      </Radio.Group>
    );
  }

  // checkbox改变
  const checkboxChange = (e: CheckboxValueType[]) => {
    const item = list.filter((o) => e.includes(o[fieldNames.value]));
    restProps.onChange(e, item);
  };
  if (selectType === 'checkbox') {
    return <Checkbox.Group options={list} value={value} {...restProps} onChange={checkboxChange} />;
  }

  // cascader改变
  if (selectType === 'cascader') {
    return (
      <Cascader
        placeholder="请选择"
        options={list}
        value={value}
        {...(restProps as any)}
        onChange={restProps.onChange}
      />
    );
  }

  // selct改变
  const myChange = (value: string | number) => {
    const item = list.find((o) => o[fieldNames.value] === value);
    restProps.onChange(value, item);
  };
  return (
    <Input.Group compact>
      <div style={{ width: isRefresh ? 'calc(100% - 32px)' : '100%' }}>
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
          showSearch
          filterOption={mySearch}
          {...restProps}
          value={_value}
          onChange={myChange}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          loading={loading}
        >
          {list.map((item, index) => (
            <Select.Option key={index} value={item[fieldNames.value]}>
              {item[fieldNames.label]}
            </Select.Option>
          ))}
        </Select>
      </div>
      {isRefresh && <Button onClick={getList} icon={<ReloadOutlined />} />}
    </Input.Group>
  );
};

export default MySelect;
