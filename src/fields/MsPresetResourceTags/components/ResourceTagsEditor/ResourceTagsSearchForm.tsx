import { Button, Col, Form, Row } from 'antd';
import { isNil } from 'lodash-es';

import { MsForm } from '../../../../components/index';
import { listPresetTags } from '../../../MsResourceTags/services';
import { tagContentRuleObject } from '../../../MsResourceTags/utils';

import type { ResourceTagsSearchFormProps } from '../../types';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

function ResourceTagsSearchForm(props: ResourceTagsSearchFormProps) {
  const { initialValues, onFinish, onClose, onReset } = props;

  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  const [form] = Form.useForm();

  const handleReset = () => {
    onClose?.();
    setTimeout(() => {
      form.setFieldValue('tags', undefined);
      onReset?.();
    }, 300);
  };

  return (
    <MsForm
      noCard
      form={form}
      layout="vertical"
      style={{ width: 500 }}
      successNotify={false}
      onFinish={onFinish}
      submitter={{
        resetBtnProps: { hidden: true },
        beforeButtonRender: <Button onClick={handleReset}>{globalLocale.reset}</Button>,
        submitText: globalLocale.query,
      }}
      initialValues={initialValues}
      columns={[
        {
          formItemProps: {
            noStyle: true,
          },
          fieldRender: (
            <Row style={{ marginBottom: 10 }}>
              <Col flex={1}>
                <Row gutter={[10, 10]}>
                  <Col span={6}>
                    <span>{currentLocale.labelType}</span>
                  </Col>
                  <Col span={9}>
                    <span>{currentLocale.labelKey}</span>
                  </Col>
                  <Col span={9}>
                    <span>{currentLocale.labelValue}</span>
                  </Col>
                </Row>
              </Col>
              <div style={{ width: 40 }} />
            </Row>
          ),
        },
        {
          dataIndex: 'tags',
          valueType: 'formList',
          fieldProps: {
            gutter: [10, 10],
            addButtonText: currentLocale.addLabel,
            addDefaultValue: { type: 'tag' },
          },
          columns: (baseNamePath) => [
            {
              // title: '标签类型',
              dataIndex: 'type',
              colProps: { span: 6 },
              valueType: 'select',
              fieldProps: { placeholder: currentLocale.labelType, showSearch: false },
              valueEnum: {
                tag: currentLocale.customLabel,
                presetTag: currentLocale.presetLabel,
              },
              formItemProps: (form) => ({
                // 切换时清空选项
                getValueFromEvent(value) {
                  if (value === 'tag') {
                    form.setFieldValue([...baseNamePath, 'presetKey'], undefined);
                    form.setFieldValue([...baseNamePath, 'presetValue'], undefined);
                  }
                  if (value === 'presetTag') {
                    form.setFieldValue([...baseNamePath, 'key'], undefined);
                    form.setFieldValue([...baseNamePath, 'value'], undefined);
                  }
                  return value;
                },
              }),
            },
            {
              // title: '自定义标签键',
              dataIndex: 'key',
              colProps: { span: 9 },
              fieldProps: (form) => ({
                placeholder: currentLocale.labelKey,
                // 由于设置dependenciesListSelf，需要重写禁用逻辑
                disabled: isNil(form.getFieldValue([...baseNamePath, 'type'])),
              }),
              dependenciesList: ['type'],
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type !== 'tag';
              },
              dependenciesListSelf: true,
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: currentLocale.labelKeyPlaceholder,
                    validateTrigger: 'onSubmit',
                  },
                  {
                    max: 128,
                    message: replaceMessage(currentLocale.labelKeyMax, { length: 128 }),
                  },
                  tagContentRuleObject,
                ],
              },
            },
            {
              // title: '自定义标签值',
              dataIndex: 'value',
              colProps: { span: 9 },
              dependenciesList: ['type'],
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type !== 'tag';
              },
              fieldProps: { placeholder: currentLocale.labelValue },
              formItemProps: {
                rules: [
                  {
                    max: 128,
                    message: replaceMessage(currentLocale.labelValueMax, { length: 128 }),
                  },
                  tagContentRuleObject,
                ],
              },
            },
            {
              // title: '预置标签键',
              dataIndex: 'presetKey',
              valueType: 'select',
              request: listPresetTags,
              colProps: { span: 9 },
              dependenciesList: ['type'],
              fieldProps: { placeholder: currentLocale.labelKey },
              initialRequest: true,
              valueEnumFiledNames: { label: 'tagKey', value: 'tagKey' },
              postRes: (res) => res?.data?.list ?? [],
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type !== 'presetTag';
              },
              formItemProps: {
                rules: [
                  {
                    required: true,
                    message: currentLocale.labelKeySelect,
                    validateTrigger: 'onSubmit',
                  },
                ],
              },
            },
            {
              // title: '预置标签值',
              dataIndex: 'presetValue',
              colProps: { span: 9 },
              fieldProps: { placeholder: currentLocale.labelValue, disabled: false },
              valueType: 'select',
              dependenciesList: ['type', 'presetKey'],
              // 由于后端接口是模糊匹配，可能返回多个结果，所以前端再进行精确匹配处理
              request: (params) =>
                listPresetTags(params).then((res) => {
                  const list = res?.data?.list;
                  const tag = list?.find((item: any) => item?.tagKey === params?.tagKey);
                  return { data: tag?.tagValues ?? [] };
                }),
              params: (form) => ({ tagKey: form.getFieldValue([...baseNamePath, 'presetKey']) }),
              valueEnumFiledNames: { label: 'tagValue', value: 'tagValue' },
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type !== 'presetTag';
              },
            },
            {
              // 用于占位，没有实际意义
              dataIndex: 'hideKey',
              fieldProps: { placeholder: currentLocale.labelKey },
              colProps: { span: 9 },
              dependenciesList: ['type'],
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type === 'tag' || type === 'presetTag';
              },
            },
            {
              // 用于占位，没有实际意义
              dataIndex: 'hideValue',
              colProps: { span: 9 },
              fieldProps: { placeholder: currentLocale.labelValue },
              dependenciesList: ['type'],
              hideInForm(form) {
                const type = form.getFieldValue([...baseNamePath, 'type']);
                return type === 'tag' || type === 'presetTag';
              },
            },
          ],
        },
      ]}
    />
  );
}

export default ResourceTagsSearchForm;
