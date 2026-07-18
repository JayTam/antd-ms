import { Button, Form, Space } from 'antd';
import { isUndefined } from 'lodash-es';
import { useState } from 'react';

import MsForm from '../../../../components/MsForm';
import MsModal from '../../../../components/MsModal';
import { updateTagResource } from '../../../MsResourceTags/services';
import { tagContentRuleObject } from '../../../MsResourceTags/utils';

import type { ResourceTagsModalProps } from '../../types';
import PresetResourceTags from './PresetResourceTags';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

const ResourceTagsModal = MsModal.create((props: ResourceTagsModalProps) => {
  const { title, gri, tags = [], presetTags = [] } = props;

  const initialValues = { tags, presetTags };
  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  // 预置标签键，用于检验与自定义标签键重复
  const presetTagKeys = presetTags.map((tag) => tag.key);

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
        footer={
          <Space>
            <Button disabled={loading} onClick={() => form.resetFields()}>
              {globalLocale.reset}
            </Button>
            <Button loading={loading} type="primary" onClick={() => form.submit()}>
              {globalLocale.ok}
            </Button>
          </Space>
        }
        {...modal.props}
      >
        <MsForm
          noCard
          initialValues={initialValues}
          form={form}
          layout="vertical"
          successNotify={false}
          columns={[
            {
              title: currentLocale.customLabel,
              valueType: 'group',
              fieldProps: { titleType: 'gradient', noContentPadding: true },
              columns: [
                {
                  title: currentLocale.keySepValue,
                  dataIndex: 'tags',
                  valueType: 'formList',
                  formItemProps: {
                    label: (
                      <>
                        <span style={{ width: 210 }}>{currentLocale.labelKey}</span>
                        <span>{currentLocale.labelValue}</span>
                      </>
                    ),
                  },
                  fieldProps: { addButtonText: currentLocale.addLabel, max: 20 },
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
                          {
                            max: 128,
                            message: replaceMessage(currentLocale.labelKeyMax, { length: 128 }),
                          },
                          // 检查自定义标签重复
                          (form) => ({
                            validator({ field }: any, value) {
                              const index = Number(field.split('.')[1]);
                              const customTagKeys = form
                                .getFieldValue('tags')
                                ?.map((item: any) => item?.key);
                              // 排除当前项
                              customTagKeys.splice(index, 1);
                              // 不检查 undefined 和 空字符串
                              if (isUndefined(value)) return Promise.resolve();
                              if (value === '') return Promise.resolve();
                              // 预置标签重复检查
                              if (presetTagKeys.includes(value))
                                return Promise.reject(currentLocale.presetLabelDup);
                              // 自定义标签重复检查
                              if (customTagKeys.includes(value))
                                return Promise.reject(currentLocale.customLabelDup);
                              return Promise.resolve();
                            },
                          }),
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
                            required: true,
                            message: currentLocale.labelValueRequired,
                            validateTrigger: 'onSubmit',
                          },
                          {
                            max: 128,
                            message: replaceMessage(currentLocale.labelValueMax, { length: 128 }),
                          },
                          tagContentRuleObject,
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              title: currentLocale.presetLabel,
              valueType: 'group',
              tooltip: (
                <div>
                  {currentLocale.presetLabelEditTip}{' '}
                  <a target="_blank" href="/resource/labelManagement/prefabricationLabel">
                    {currentLocale.presetLabel}
                  </a>
                </div>
              ),
              fieldProps: { titleType: 'gradient', noContentPadding: true },
              columns: [
                {
                  dataIndex: 'presetTags',
                  fieldRender: <PresetResourceTags />,
                },
              ],
            },
          ]}
          onFinish={handleFinish}
          submitter={{ render: () => null }}
        />
      </MsModal>
    </>
  );
});

export default ResourceTagsModal;
