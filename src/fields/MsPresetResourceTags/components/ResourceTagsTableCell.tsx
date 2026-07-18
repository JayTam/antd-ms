import { EditOutlined, TagFilled } from '@ant-design/icons';
import { Col, Popover, Row, Tag, Typography } from 'antd';

import type { FC } from 'react';
import MsModal from '../../../components/MsModal';
import type { ResourceTagsTableCellProps } from '../types';
import ResourceTagsModal from './ResourceTagsReader/ResourceTagsModal';
import Tags from './Tags';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 资源标签在MsTable列显示
 * @param props
 * @returns
 */
const ResourceTagsTableCell: FC<ResourceTagsTableCellProps> = (props) => {
  const { resource, onRefresh, hideEditInTable = false, popoverProps } = props;

  const { currentLocale } = useLocale('MsPresetResourceTags');
  // 自定义标签
  const tags =
    resource?.resourceTags?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  // 预置标签
  const presetTags =
    resource?.presetTagModels?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  // 显示标签，自定义和预置标签合并在一起显示
  const showTags = [...tags, ...presetTags];

  const existTags = showTags.length > 0;

  const ContentNode = (
    <div style={{ minWidth: 120, maxWidth: 500 }}>
      <Row justify="space-between" style={{ marginBottom: existTags ? 8 : undefined }}>
        <Col>
          <Typography.Text type="secondary">
            {existTags ? currentLocale.label : currentLocale.unsetLabel}
          </Typography.Text>
        </Col>
        <Col>
          {hideEditInTable ? null : (
            <a
              onClick={() => {
                MsModal.open(ResourceTagsModal, {
                  title: currentLocale.editLabel,
                  gri: resource?.globalResourceIdentity ?? '',
                  tags,
                  presetTags,
                }).then(onRefresh);
              }}
            >
              <EditOutlined />
            </a>
          )}
        </Col>
      </Row>
      <Tags items={showTags} />
    </div>
  );

  return (
    <Popover zIndex={999} {...popoverProps} content={ContentNode}>
      <TagFilled style={{ color: existTags ? '#777' : '#c1c1c1', cursor: 'pointer' }} />
    </Popover>
  );
};

export default ResourceTagsTableCell;
