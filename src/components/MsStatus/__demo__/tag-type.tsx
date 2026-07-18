/**
 * title: 标签类型
 * description:
 */

import { AccountBookOutlined } from '@ant-design/icons';
import { MsStatus } from '@jaytam/antd-ms';
import { Space } from 'antd';
import { useState } from 'react';

export default () => {
  const tagsData = ['未选标签', '选中标签'];
  const [selectedTags, setSelectedTags] = useState<string[]>(['选中标签']);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      <Space direction="vertical" size="large" wrap>
        <div>
          <h3>基础标签</h3>
          <MsStatus type="tag">标签一</MsStatus>
        </div>
        <div>
          <h3>省略文本的标签</h3>
          <MsStatus ellipsis type="tag">
            可省略文本的标签
          </MsStatus>
        </div>
        <div>
          <h3>带删除的标签</h3>
          <MsStatus type="tag" closable>
            标签
          </MsStatus>
        </div>
        <div>
          <h3>可选中的标签</h3>
          {tagsData.map((tag) => (
            <MsStatus
              checkable
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              checkedChange={(checked) => handleChange(tag, checked)}
            >
              {tag}
            </MsStatus>
          ))}
        </div>
        <div>
          <h3>带图标的标签</h3>
          <MsStatus type="tag" icon={<AccountBookOutlined />}>
            已逾期
          </MsStatus>
        </div>
      </Space>
    </>
  );
};
