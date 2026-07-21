/**
 * title: 禁用某项拖动
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
        disabledItem={(item) => item.tag === '语言'}
        onChange={(sortedItems) => setItems(sortedItems)}
        disabledItemStyle={{ color: 'red', cursor: 'not-allowed' }}
      />
    </div>
  );
};
