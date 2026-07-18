import { Button, Col, Form, Row, Tag, Tooltip, Typography } from 'antd';
import type { MouseEventHandler } from 'react';

import MsModal from '../../../components/MsModal';
import { useMsPage } from '../../../components/MsPage/contexts/page';

import type { ResourceTagsReadProps, ResourceType } from '../types';
import ResourceTagsModal from './ResourceTagsModal';
import { useLocale } from '@jaytam/antd-ms/locale';

const { Text } = Typography;

/**
 * 只读模式，主要给 MsDescriptions 使用
 * 展示和编辑资源标签
 * @param props
 * @returns
 */
const ResourceTagsReader = (props: ResourceTagsReadProps) => {
  const { readonly, onRefresh, editable } = props;
  const form = Form.useFormInstance();

  const { refresh } = useMsPage();
  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  const resource: ResourceType = form.getFieldValue('resource');

  const tags =
    resource?.resourceTags?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  const tagElements = (
    <Row gutter={[0, 6]}>
      {tags.map((tag) => (
        <Tag key={tag.key}>
          <Text
            style={{ maxWidth: '120px' }}
            ellipsis={{ tooltip: `${tag.key} : ${tag.value}` }}
          >{`${tag.key} : ${tag.value}`}</Text>
        </Tag>
      ))}
    </Row>
  );

  if (!editable) return null;

  const {
    editIcon,
    editText = globalLocale.edit,
    editTooltip,
    onClick,
    onFinishSuccess,
  } = editable;

  const handleOpen: MouseEventHandler<HTMLButtonElement> = () => {
    onClick?.();
    MsModal.open(ResourceTagsModal, {
      title: currentLocale.editLabel,
      gri: resource?.globalResourceIdentity ?? '',
      tags,
    }).then(() => {
      onFinishSuccess?.();
      if (onRefresh) {
        onRefresh();
      } else {
        refresh();
      }
    });
  };

  return (
    <Row align="middle" gutter={20}>
      {/* TODO: 设置最大宽度临时解决，后续待优化 */}
      <Col style={{ maxWidth: '70%' }}>{tags.length === 0 ? '-' : tagElements}</Col>
      <Col>
        {readonly ? null : (
          <Tooltip title={editTooltip}>
            <Button size="small" type="link" icon={editIcon} onClick={handleOpen}>
              {editText}
            </Button>
          </Tooltip>
        )}
      </Col>
    </Row>
  );
};

export default ResourceTagsReader;
