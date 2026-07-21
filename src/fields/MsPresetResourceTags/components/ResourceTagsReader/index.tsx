import { Button, Col, Form, Row, Tooltip } from 'antd';

import MsModal from '../../../../components/MsModal';
import { useMsPage } from '../../../../components/MsPage/contexts/page';

import type { ResourceTagsReadProps, ResourceType } from '../../types';
import Tags from '../Tags';
import ResourceTagsModal from './ResourceTagsModal';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 只读模式，主要给 MsDescriptions 使用
 * 展示和编辑资源标签
 * @param props
 * @returns
 */
const ResourceTagsReader = (props: ResourceTagsReadProps) => {
  const { onRefresh, editable } = props;
  const form = Form.useFormInstance();

  const { refresh } = useMsPage();
  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  const resource: ResourceType = form.getFieldValue('resource');

  // 自定义标签
  const tags =
    resource?.resourceTags?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  // 预置标签
  const presetTags =
    resource?.presetTagModels?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  // 显示标签，自定义和预置标签合并在一起显示
  const showTags = [...tags, ...presetTags];

  if (!editable) return null;

  const {
    editIcon,
    editText = globalLocale.edit,
    editTooltip,
    onClick,
    onFinishSuccess,
  } = editable;

  const handleOpen = () => {
    onClick?.();
    MsModal.open(ResourceTagsModal, {
      title: currentLocale.editLabel,
      gri: resource?.globalResourceIdentity ?? '',
      tags,
      presetTags,
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
      <Col style={{ maxWidth: '70%' }}>
        <Tags items={showTags} emptyText="-" />
      </Col>
      <Col>
        <Tooltip title={editTooltip}>
          <Button size="small" type="link" icon={editIcon} onClick={handleOpen}>
            {editText}
          </Button>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default ResourceTagsReader;
