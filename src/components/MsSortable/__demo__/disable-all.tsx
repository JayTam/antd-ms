/**
 * title: 禁用整个列表的拖动排序
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
    { id: id++, title: 'React.js', tag: '框架' },
    { id: id++, title: 'Vue.js', tag: '框架' },
    { id: id++, title: 'Angular.js', tag: '框架' },
  ]);

  return (
    <div>
      <MsSortable disabled items={items} onChange={(sortedItems) => setItems(sortedItems)} />
    </div>
  );
};
