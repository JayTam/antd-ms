import { Button } from 'antd';
import { isNil, isUndefined } from 'lodash-es';
import type { FC } from 'react';
import { useMemo } from 'react';
import MsModal from '../../../components/MsModal';
import type { ResourceTagsEditorProps, TagItem } from '../types';
import ResourceTagsModal from './ResourceTagsModal';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 编辑模式下资源标签，主要给 MsTable 的筛选器使用
 * 用于筛选资源标签
 * @param props
 * @returns
 */
const ResourceTagsEditor: FC<ResourceTagsEditorProps> = (props) => {
  const { value = '', onChange } = props;

  const { currentLocale } = useLocale('MsPresetResourceTags');

  const tags = useMemo<TagItem[]>(() => {
    if (value.length === 0) {
      return [{}];
    }
    return value.split(',').map((item) => {
      const token = item.split(':');
      return { key: token[0], value: token[1] };
    });
  }, [value]);

  const handleOpen = () => {
    MsModal.open(ResourceTagsModal, {
      title: currentLocale.filterLabel,
      type: 'filter',
      tags,
    }).then((values: any) => {
      const list: TagItem[] = values;
      if (list) {
        let tagStringify = list.reduce((prev, next) => {
          if (isUndefined(next.key)) return prev;
          return prev + `${next.key}:${next.value ?? ''},`;
        }, '');
        if (list.length > 0) {
          // 去掉最后一个 ","
          tagStringify = tagStringify.slice(0, tagStringify.length - 1);
        }
        onChange?.(tagStringify);
      }
    });
  };

  const tagsLength = tags?.filter((tag) => !isNil(tag.key))?.length ?? 0;

  return (
    <>
      <Button onClick={handleOpen}>
        {currentLocale.labelFilter}
        {tagsLength > 0 ? `(${tagsLength})` : null}
      </Button>
    </>
  );
};

export default ResourceTagsEditor;
