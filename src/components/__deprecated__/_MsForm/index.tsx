import { AutoComplete, Col, DatePicker, Form, Input, Row, Switch } from 'antd';
import { isFunction } from 'lodash-es';

import type { ReactNode } from 'react';
import React, { useImperativeHandle } from 'react';
import MsSelect from '../_MsSelect/index';
import type * as MsSelectTs from '../_MsSelect/types';
import type * as MsFormTs from './types';

const MsForm: React.FC<MsFormTs.MsFormProps> = ({ options = {}, formRef, record = {} }) => {
  const [_form] = Form.useForm();
  const { form, formList = [] } = options;

  useImperativeHandle(formRef, () => ({
    form: _form,
  }));

  return (
    <Form
      layout={'vertical'}
      autoComplete="off"
      scrollToFirstError
      initialValues={record}
      form={_form}
      {...form}
    >
      <Row gutter={16}>
        {formList.map((item, index) => {
          let MyItem: ReactNode = null;
          const { extra, depend } = item;
          switch (item.type) {
            case 'autoComplete':
              MyItem = <AutoComplete placeholder="请输入" {...extra} />;
              break;
            case 'input':
              MyItem = <Input placeholder="请输入" {...extra} />;
              break;
            case 'custom':
              MyItem = item.render && (isFunction(item.render) ? item.render(item) : item.render);
              break;
            case 'select':
              MyItem = <MsSelect {...extra} />;
              break;
            case 'textarea':
              MyItem = <Input.TextArea rows={3} placeholder="请输入" {...extra} />;
              break;
            case 'radio':
              MyItem = <MsSelect {...extra} selectType="radio" />;
              break;
            case 'checkbox':
              MyItem = <MsSelect {...extra} selectType="checkbox" />;
              break;
            case 'datepicker':
              MyItem = <DatePicker style={{ width: 300 }} placeholder="请选择日期" {...extra} />;
              break;
            case 'rangepicker':
              MyItem = <DatePicker.RangePicker style={{ width: 300 }} {...extra} />;
              break;
            case 'switch':
              MyItem = <Switch size="default" {...extra} />;
              break;
            case 'cascader':
              MyItem = <MsSelect {...extra} selectType="cascader" />;
              break;
          }
          const MyItemWrap = (
            <Form.Item valuePropName={item.type === 'switch' ? 'checked' : 'value'} {...item.item}>
              {MyItem}
            </Form.Item>
          );
          return (
            <Col style={{ minHeight: 0 }} key={index} span={item.span || 24}>
              {depend ? (
                <Form.Item noStyle shouldUpdate>
                  {({ getFieldsValue, getFieldValue }) =>
                    isFunction(depend)
                      ? depend(getFieldsValue(true))
                        ? MyItemWrap
                        : null
                      : getFieldValue(depend.name) === depend.value
                      ? MyItemWrap
                      : null
                  }
                </Form.Item>
              ) : (
                MyItemWrap
              )}
            </Col>
          );
        })}
      </Row>
    </Form>
  );
};

export default MsForm;

export const Options: React.FC<MsFormTs.Options> = () => null;
export const FormListProps: React.FC<MsFormTs.FormListProps> = () => null;
export const MsSelectProps: React.FC<MsSelectTs.MsSelectProps> = () => null;
export const Dick: React.FC<MsSelectTs.Dick> = () => null;
