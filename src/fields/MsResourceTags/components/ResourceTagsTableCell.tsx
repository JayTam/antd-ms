import { TagFilled } from '@ant-design/icons';
import { Popover, Tag, Typography } from 'antd';

import type { FC } from 'react';
import MsModal from '../../../components/MsModal';
import type { ResourceTagsTableCellProps } from '../types';
import ResourceTagsModal from './ResourceTagsModal';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 资源标签在MsTable列显示
 * @param props
 * @returns
 */
const ResourceTagsTableCell: FC<ResourceTagsTableCellProps> = (props) => {
  const { resource, onRefresh } = props;

  const { currentLocale, globalLocale } = useLocale('MsPresetResourceTags');

  // 自定义标签
  const tags =
    resource?.resourceTags?.map((item) => ({ key: item.tagKey, value: item.tagValue })) ?? [];

  const TagNodes =
    tags.length === 0 ? (
      <Typography.Text ellipsis>{currentLocale.notSetLabel}</Typography.Text>
    ) : (
      tags.map((tag) => (
        <Tag key={tag.key}>
          {tag.key} : {tag.value}
        </Tag>
      ))
    );

  return (
    <Popover
      content={
        <>
          {TagNodes}
          <a
            style={{ marginLeft: 8 }}
            onClick={() => {
              MsModal.open(ResourceTagsModal, {
                title: currentLocale.editLabel,
                gri: resource?.globalResourceIdentity ?? '',
                tags,
              }).then(onRefresh);
            }}
          >
            {globalLocale.edit}
          </a>
        </>
      }
      zIndex={999}
    >
      <TagFilled style={{ color: tags.length ? '#777' : '#c1c1c1', cursor: 'pointer' }} />
    </Popover>
  );
};

export default ResourceTagsTableCell;
