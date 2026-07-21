import { Alert, Button, Col, Form, Row, Space } from 'antd';
import { isUndefined } from 'lodash-es';
import { useState } from 'react';

import MsForm from '../../../components/MsForm';
import MsModal from '../../../components/MsModal';
import { updateTagResource } from '../services';

import type { ResourceTagsModalProps } from '../types';
import { tagContentRuleObject } from '../utils';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const ResourceTagsModal = MsModal.create((props: ResourceTagsModalProps) => {
  const { title, gri, tags = [], type = 'editor' } = props;

  const isEditor = type === 'editor';
  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  const initialValues = { tags };

  const modal = MsModal.useModal();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if (gri) {
        await updateTagResource({ gri, tags: values.tags });
      }
      modal.resolve(values.tags);
      modal.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MsModal
        title={title}
        bodyStyle={{ padding: 0 }}
        footer={
          <Space>
            <Button loading={loading} type="primary" onClick={() => form.submit()}>
              {globalLocale.ok}
            </Button>
            <Button
              disabled={loading}
              onClick={() => {
                if (isEditor) {
                  form.resetFields();
                } else {
                  form.setFieldValue('tags', []);
                  setTimeout(() => form.submit(), 0);
                }
              }}
            >
              {globalLocale.reset}
            </Button>
          </Space>
        }
        {...modal.props}
      >
        {isEditor ? (
          <Alert
            type="warning"
            showIcon
            message={replaceMessage(currentLocale.maxTip, { max: 20 })}
            banner
          />
        ) : null}

        <div style={{ padding: 24 }}>
          <MsForm
            noCard
            initialValues={initialValues}
            form={form}
            layout="vertical"
            successNotify={false}
            columns={[
              {
                // @ts-ignore
                title: (
                  <Row style={{ width: '420px' }}>
                    <Col span={12}>{currentLocale.labelKey}</Col>
                    <Col span={12}>{currentLocale.labelValue}</Col>
                  </Row>
                ),
                dataIndex: 'tags',
                valueType: 'formList',
                fieldProps: { max: 20 },
                columns: [
                  {
                    dataIndex: 'key',
                    dependenciesListSelf: true,
                    fieldProps: { placeholder: currentLocale.labelKey },
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: currentLocale.labelKeyRequired,
                          validateTrigger: 'onSubmit',
                        },
                        (form) => ({
                          validator({ field }: any, value) {
                            const index = Number(field.split('.')[1]);
                            const array = form.getFieldValue('tags')?.map((item: any) => item?.key);
                            array.splice(index, 1);
                            // 不检查 undefined 和 空字符串
                            if (isUndefined(value)) return Promise.resolve();
                            if (value === '') return Promise.resolve();
                            if (array.includes(value))
                              return Promise.reject(
                                replaceMessage(currentLocale.labelKeyDuplicate, { value }),
                              );
                            return Promise.resolve();
                          },
                        }),
                        {
                          max: 64,
                          message: replaceMessage(currentLocale.labelKeyMax, { length: 64 }),
                        },
                        tagContentRuleObject,
                      ],
                    },
                  },
                  {
                    dataIndex: 'value',
                    fieldProps: { placeholder: currentLocale.labelValue },
                    formItemProps: {
                      rules: [
                        {
                          required: isEditor,
                          message: currentLocale.labelValueRequired,
                          validateTrigger: 'onSubmit',
                        },
                        {
                          max: 64,
                          message: replaceMessage(currentLocale.labelValueMax, { length: 64 }),
                        },
                        tagContentRuleObject,
                      ],
                    },
                  },
                ],
              },
            ]}
            onFinish={handleFinish}
            submitter={{ render: () => null }}
          />
        </div>
      </MsModal>
    </>
  );
});

export default ResourceTagsModal;
