import { Button, Popover } from 'antd';
import { isNil } from 'lodash-es';

import type { FC } from 'react';
import { useMemo, useState } from 'react';
import type { ResourceTagsEditorProps, TagItem } from '../../types';
import ResourceTagsSearchForm from './ResourceTagsSearchForm';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

/** 序列化标签 */
const stringifyTags = (tags?: TagItem[]) => {
  if (isNil(tags)) return undefined;
  const tagsStringify = tags
    .map((item) => {
      if (item.type == 'tag') {
        return { key: item.key, value: item.value, type: 'tag' };
      }
      return { key: item.presetKey, value: item.presetValue, type: 'presetTag' };
    })
    .filter((item) => !(isNil(item.key) && isNil(item.value)))
    .reduce((prev, next) => prev + `${next.type}:${next.key}:${next.value ?? ''},`, '')
    // 去掉末尾 ","
    .replace(/,\s*$/, '');
  return tagsStringify;
};

/** 解析标签 */
export const parseTags = (tagsStringify?: string) => {
  if (isNil(tagsStringify) || tagsStringify.length === 0) {
    return [{ type: 'tag' } as TagItem];
  }
  return tagsStringify.split(',').map((item) => {
    const token = item.split(':');
    const type = token[0];
    if (type === 'tag') {
      return { type: token[0], key: token[1], value: token[2] };
    }
    return { type: token[0], presetKey: token[1], presetValue: token[2] };
  });
};

/**
 * 编辑模式下资源标签，主要给 MsTable 的筛选器使用
 * 用于筛选资源标签
 * @param props
 * @returns
 */
const ResourceTagsEditor: FC<ResourceTagsEditorProps> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const { currentLocale } = useLocale('MsPresetResourceTags');

  const tags = useMemo(() => parseTags(value), [value]);

  const tagNum = useMemo(() => {
    return tags.reduce((prev, next) => {
      if (next.key || next.presetKey) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }, [tags]);

  const handleFinish = async (values: any) => {
    const tagsStringify = stringifyTags(values?.tags);
    onChange?.(tagsStringify);
    // 关闭popover
    setOpen(false);
  };

  const handleReset = () => {
    onChange?.(undefined);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      showArrow={false}
      overlayClassName="resource-tags-popover"
      content={
        <ResourceTagsSearchForm
          initialValues={{ tags }}
          onFinish={handleFinish}
          onReset={handleReset}
          onClose={() => setOpen(false)}
        />
      }
      destroyTooltipOnHide
      trigger="click"
      placement="bottom"
    >
      <Button>
        {currentLocale.labelFilter}
        {tagNum > 0 ? `(${tagNum})` : null}
      </Button>
    </Popover>
  );
};

export default ResourceTagsEditor;
