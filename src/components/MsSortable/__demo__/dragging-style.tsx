/**
 * title: 自定义拖动样式
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
    { id: id++, title: 'Javascript', tag: '语言' },
    { id: id++, title: 'React.js', tag: '框架' },
    { id: id++, title: 'Vue.js', tag: '框架' },
    { id: id++, title: 'Angular.js', tag: '框架' },
  ]);

  return (
    <div>
      <MsSortable
        items={items}
        draggingItemStyle={{ backgroundColor: '#464f5c' }}
        onChange={(sortedItems) => setItems(sortedItems)}
      />
    </div>
  );
};
