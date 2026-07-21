/**
 * title: 拖动相关事件
 * description:
 */

import { MsSortable } from '@jaytam/antd-ms';
import { useState } from 'react';

interface List {
  depId: number | string;
  depName: string;
}

export default () => {
  let id = 1;
  const [items, setItems] = useState<List[]>([
    { depId: id++, depName: '技术部' },
    { depId: id++, depName: '云平台部' },
    { depId: id++, depName: '业务一部' },
    { depId: id++, depName: '业务二部' },
  ]);

  return (
    <div>
      <MsSortable
        items={items}
        isShowTopIcon={false}
        fieldNames={{ id: 'depId', title: 'depName' }}
        onChange={(sortedItems) => setItems(sortedItems)}
        onDragStart={(e) => console.log('onDragStart: ', e)}
        onDragMove={(e) => console.log('onDragMove: ', e)}
        onDragEnd={(e) => console.log('onDragEnd: ', e)}
        onDragCancel={() => console.log('onDragCancel')}
      />
    </div>
  );
};
