import { MinusCircleOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Alert, Button, Col, Form, Input, Popconfirm, Row, Select, Spin, Typography } from 'antd';
import { isNil, isUndefined } from 'lodash-es';

import { getPresetTags } from '../../services/index';
import { tagContentRuleObject } from '../../utils';

import './index.less';

import type { CreateFormListFieldProps, PresetTagItem, TagItem, TagList } from './types';
import { AxiosError } from 'axios';
import { MsAddOutlined } from '@jaytam/icons';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

/** 自定义标签最大限制 */
const MAX_CUSTOM_TAG_NUM = 20;

/**
 * 创建页面预置标签列表组件
 * @param props
 * @returns
 */
function CreateFormListField(props: CreateFormListFieldProps) {
  const {
    resourceTypeCode,
    vpcResourceCode,
    azoneCode,
    fullWidthColSpan = 24,
    tagsNamePath = 'tags',
    presetTagsNamePath = 'presetTags',
    disableTags,
  } = props;
  const form = Form.useFormInstance();
  const { getPopupContainer } = useFieldPopupContainer();
  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  const { data, loading, error, refresh } = useRequest<any, any>(
    async () => {
      const res = await getPresetTags({ resourceTypeCode, vpcResourceCode, azone: azoneCode });
      const resTags: PresetTagItem[] = res?.data ?? [];
      // =================== 错误情况 ==========================
      if (resTags[0]?.failedTag) {
        const failedTag = resTags[0].failedTag;
        const tokens = failedTag?.split(':');

        return Promise.reject(
          // @ts-ignore
          new AxiosError(currentLocale.vpcAjax, '500', {}, undefined, {
            data: {
              tagKey: tokens?.[0],
              tagValue: tokens?.[1],
            },
          }),
        );
      }
      return res;
    },
    {
      // 可用区存在才满足前置条件
      ready: !isNil(azoneCode),
      refreshDeps: [azoneCode, vpcResourceCode],
      onSuccess(res) {
        const resTags: PresetTagItem[] = res?.data ?? [];
        // =================== 重置预置标签 ==========================
        const originPresetTags: TagList = form.getFieldValue(presetTagsNamePath) ?? [];
        const newPresetTags = resTags.map((tag) => {
          // 继承 vpc 情况
          if (tag.sourceVpc === 0) {
            return {
              tagKey: tag.tagKey,
              tagValue: tag.tagValues?.[0]?.tagValue,
              relatedVpcCode: vpcResourceCode,
              sourceVpc: tag.sourceVpc,
            };
          }
          // 常规情况
          const result = originPresetTags.find((item) => item?.tagKey === tag.tagKey);
          const originTag = tag.tagValues?.find((item) => item.tagValue === result?.tagValue);

          return {
            tagKey: tag.tagKey,
            tagValue: originTag?.tagValue,
            sourceVpc: tag.sourceVpc,
          };
        });
        form.setFieldValue(presetTagsNamePath, newPresetTags);
        // =================== 重置自定义标签 ==========================
        // 自定义标签去重，如果跟预置标签的key重复，则去掉
        const presetTagKeys = resTags.map((tag) => tag.tagKey);
        const customTags: TagList = form.getFieldValue(tagsNamePath) ?? [];
        const distinctCustomTags = customTags.filter((item) => {
          if (isNil(item?.tagKey)) {
            return true;
          }
          return !presetTagKeys.includes(item.tagKey);
        });
        if (distinctCustomTags.length !== customTags.length) {
          form.setFieldValue(tagsNamePath, distinctCustomTags);
        }
      },
    },
  );

  /** 后端返回预置标签原数据 */
  const resPresetTags: PresetTagItem[] = data?.data ?? [];

  // =================== 错误提示 ==========================
  if (error) {
    const errorTag: TagItem = (error as any)?.response?.data;

    return (
      <Col span={fullWidthColSpan}>
        <Spin spinning={loading}>
          <Form.List name={presetTagsNamePath} rules={[{ validator: () => Promise.reject() }]}>
            {() => {
              return (
                <div id={presetTagsNamePath}>
                  <Alert
                    message={
                      <Row justify="space-between">
                        <div>{currentLocale.errorTip}</div>
                        <a onClick={refresh} style={{ fontSize: 12 }}>
                          <ReloadOutlined style={{ marginRight: 8 }} />
                          {globalLocale.flush}
                        </a>
                      </Row>
                    }
                    description={
                      <>
                        <div>{currentLocale.vpcCheck}</div>
                        <br />
                        <div>
                          {currentLocale.vpcLabel}{' '}
                          <Typography.Text strong>
                            {errorTag?.tagKey}：{errorTag?.tagValue}
                          </Typography.Text>{' '}
                          {currentLocale.errorVpc}
                          <a
                            target="_blank"
                            href={`/resource/labelManagement/prefabricationLabel/labelKeyPage?tagKey=${errorTag?.tagKey}&tabKey=check&resourceCode=${vpcResourceCode}`}
                            rel="noreferrer"
                          >
                            {currentLocale.checkNow}
                          </a>
                          。
                        </div>
                      </>
                    }
                    type="error"
                    showIcon
                  />
                </div>
              );
            }}
          </Form.List>
        </Spin>
      </Col>
    );
  }

  // 如果 disableTags=true 禁用自定义标签同时预置标签没有值，那么展示 "-"
  if (disableTags && resPresetTags?.length === 0) return '-';

  return (
    <Col span={fullWidthColSpan}>
      <Spin spinning={loading}>
        {/* 标题 */}
        <Row gutter={[20, 20]} style={{ height: 32, lineHeight: '32px' }}>
          <Col style={{ flex: 1 }}>{currentLocale.labelKey}</Col>
          <Col style={{ flex: 1 }}>{currentLocale.labelValue}</Col>
          {/* 隐藏元素用于占位 */}
          <Col style={{ visibility: 'hidden' }}>
            <Button type="text" shape="circle" icon={<MinusCircleOutlined />} />
          </Col>
        </Row>
        {/* 预置标签 */}
        <Form.List name={presetTagsNamePath}>
          {(fields) => {
            return (
              <div>
                {fields.map(({ key, name, ...field }) => {
                  return (
                    <Row key={key} gutter={[20, 20]}>
                      {/* 预置标签键 */}
                      <Col style={{ flex: 1 }}>
                        <Form.Item {...field} name={[name, 'tagKey']}>
                          <Select className="preset-tags" showArrow={false} disabled />
                        </Form.Item>
                      </Col>
                      {/* 预置标签值 */}
                      <Col style={{ flex: 1 }}>
                        <Form.Item
                          {...field}
                          name={[name, 'tagValue']}
                          rules={[{ required: true, message: currentLocale.labelValueRequired }]}
                        >
                          <Select
                            showSearch
                            className="preset-tags"
                            options={resPresetTags?.[key]?.tagValues}
                            fieldNames={{ label: 'tagValue', value: 'tagValue' }}
                            optionFilterProp="tagValue"
                            placeholder={currentLocale.labelValueSelect}
                            // vpc 继承标签，不能修改
                            disabled={resPresetTags?.[key]?.sourceVpc === 0}
                            getPopupContainer={getPopupContainer}
                          />
                        </Form.Item>
                      </Col>
                      {/* 隐藏元素用于占位 */}
                      <Col style={{ visibility: 'hidden' }}>
                        <Button type="text" shape="circle" icon={<MinusCircleOutlined />} />
                      </Col>
                      <Col span={0} style={{ display: 'none' }}>
                        <Form.Item {...field} name={[name, 'sourceVpc']}>
                          <Input />
                        </Form.Item>
                        <Form.Item {...field} name={[name, 'relatedVpcCode']}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          }}
        </Form.List>

        {/* 自定义标签 */}
        {disableTags !== true ? (
          <Form.List name={tagsNamePath}>
            {(fields, operation) => {
              return (
                <>
                  {fields.map(({ key, name, ...field }, index) => {
                    return (
                      <Row key={key} gutter={[20, 20]}>
                        {/* 标签键 */}
                        <Col style={{ flex: 1 }}>
                          <Form.Item
                            {...field}
                            name={[name, 'tagKey']}
                            rules={[
                              {
                                required: true,
                                message: currentLocale.labelKeyRequired,
                              },
                              {
                                max: 128,
                                message: replaceMessage(currentLocale.labelKeyMax, { length: 128 }),
                              },
                              {
                                validator({ field }: any, currentKey) {
                                  // 不检查 undefined 和 空字符串
                                  if (isUndefined(currentKey) || currentKey === '') {
                                    return Promise.resolve();
                                  }

                                  const customTags: TagList =
                                    form.getFieldValue(tagsNamePath) ?? [];
                                  const presetTags: TagList =
                                    form.getFieldValue(presetTagsNamePath) ?? [];

                                  if (presetTags.find((item) => item?.tagKey === currentKey)) {
                                    return Promise.reject(
                                      replaceMessage(currentLocale.keyDuplicate, { currentKey }),
                                    );
                                  }
                                  // 当前行索引
                                  const currentIndex = Number(field.split('.')[1]);
                                  // 跳过当前行判断
                                  if (
                                    customTags.find(
                                      (item, index) =>
                                        item?.tagKey === currentKey && index !== currentIndex,
                                    )
                                  ) {
                                    return Promise.reject(currentLocale.customKeyDuplicate);
                                  }

                                  return Promise.resolve();
                                },
                              },
                              tagContentRuleObject,
                            ]}
                          >
                            <Input placeholder={currentLocale.labelKeyPlaceholder} />
                          </Form.Item>
                        </Col>
                        {/* 标签值 */}
                        <Col style={{ flex: 1 }}>
                          <Form.Item
                            {...field}
                            name={[name, 'tagValue']}
                            rules={[
                              {
                                required: true,
                                message: currentLocale.labelValueRequired,
                              },
                              {
                                max: 128,
                                message: replaceMessage(currentLocale.labelValueMax, {
                                  length: 128,
                                }),
                              },
                              tagContentRuleObject,
                            ]}
                          >
                            <Input placeholder={currentLocale.labelValuePlaceholder} />
                          </Form.Item>
                        </Col>
                        <Col span={0} style={{ display: 'none' }}>
                          <Form.Item {...field} name={[name, 'sourceVpc']}>
                            <Input />
                          </Form.Item>
                          <Form.Item {...field} name={[name, 'relatedVpcCode']}>
                            <Input />
                          </Form.Item>
                        </Col>
                        {/* 删除按钮 */}
                        <Col>
                          <Popconfirm
                            title={replaceMessage(currentLocale.deleteOneRow, {
                              number: index + 1,
                            })}
                            onConfirm={() => operation.remove(index)}
                          >
                            <Button
                              title={currentLocale.deleteRow}
                              type="text"
                              shape="circle"
                              icon={<MinusCircleOutlined />}
                            />
                          </Popconfirm>
                        </Col>
                      </Row>
                    );
                  })}
                  {fields.length < MAX_CUSTOM_TAG_NUM ? (
                    <Button
                      type="link"
                      onClick={() => operation.add()}
                      className="preset-tags-list-add-btn"
                    >
                      <div className="preset-tags-list-add-btn-content">
                        <MsAddOutlined className="preset-tags-list-add-icon" />
                        <span className="preset-tags-list-add-text">{currentLocale.addLabel}</span>
                      </div>
                    </Button>
                  ) : null}
                </>
              );
            }}
          </Form.List>
        ) : null}
      </Spin>
    </Col>
  );
}

export default CreateFormListField;
