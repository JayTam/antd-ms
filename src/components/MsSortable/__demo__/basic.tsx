/**
 * title: 基本使用
 * description:
 */

import type { MsSortableItems } from '@jaytam/antd-ms';
import { MsSortable } from '@jaytam/antd-ms';
import { useState } from 'react';

export default () => {
  let id = 1;
  const [items, setItems] = useState<MsSortableItems>([
    { id: id++, title: 'React.js', tag: '框架' },
    { id: id++, title: 'Vue.js', tag: '框架' },
    { id: id++, title: 'Angular.js', tag: '框架' },
    { id: id++, title: 'Solid.js', tag: '框架' },
    { id: id++, title: 'Svelte.js', tag: '框架' },
    { id: id++, title: 'Javascript', tag: '语言' },
    { id: id++, title: 'PReact.js' },
  ]);

  return (
    <div>
      <MsSortable items={items} onChange={(sortedItems) => setItems(sortedItems)} />
    </div>
  );
};
