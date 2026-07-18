/**
 * title: 自定义展示
 * description:
 */

import { MsSortable } from '@jaytam/antd-ms';
import { useState } from 'react';

interface List {
  id: number | string;
  title: string;
  tag?: string;
}

export default () => {
  let id = 1;
  const [items, setItems] = useState<List[]>([
    { id: id++, title: 'JavaScript', tag: '前端' },
    { id: id++, title: 'React.js', tag: '前端' },
    { id: id++, title: '设计模式', tag: '通用' },
    { id: id++, title: 'Docker', tag: '通用' },
    { id: id++, title: 'Java', tag: '后端' },
    { id: id++, title: 'Go', tag: '后端' },
  ]);

  return (
    <div>
      <MsSortable
        items={items}
        onChange={(sortedItems) => setItems(sortedItems)}
        renderItem={(item) => (
          <div style={{ padding: '0 8px' }}>{`${item.title} -- ${item.tag}`}</div>
        )}
      />
    </div>
  );
};
