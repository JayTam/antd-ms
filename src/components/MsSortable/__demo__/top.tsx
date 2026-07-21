/**
 * title: 展示置顶&配置展示字段
 * description:
 */

import { MsSortable } from '@jaytam/antd-ms';
import { useState } from 'react';

interface List {
  depId: number | string;
  depName: string;
  level: string;
}

export default () => {
  let id = 1;
  const [items, setItems] = useState<List[]>([
    { depId: id++, depName: '技术部', level: '一级部门' },
    { depId: id++, depName: '云平台部', level: '二级部门' },
    { depId: id++, depName: '业务一部', level: '三级部门' },
    { depId: id++, depName: '业务二部', level: '四级部门' },
  ]);

  return (
    <div>
      <MsSortable
        items={items}
        isShowTopIcon={true}
        onChange={(sortedItems) => setItems(sortedItems)}
        onClickTop={(sortedItems) => setItems(sortedItems)}
        fieldNames={{ id: 'depId', title: 'depName', tag: 'level' }}
      />
    </div>
  );
};
