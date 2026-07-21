/**
 * title: 不展示head
 * description:
 */

import MsViewList from '@jaytam/antd-ms/components/MsViewList';
import { useState } from 'react';
import type { MsViewListItemType, MsViewListMenuItemType } from '../types';

export default () => {
  let id = 1;
  const [items, setItems] = useState<MsViewListItemType[]>([
    { id: id++, title: '全部需求', tag: '系统', count: 1111 },
    { id: id++, title: '进行中需求', tag: '系统', count: 10 },
    { id: id++, title: '已完成需求', tag: '系统', count: 50 },
    { id: id++, title: '已逾期需求', tag: '系统', count: 1111 },
    { id: id++, title: '已取消需求', tag: '系统', count: 17 },
    { id: id++, title: '已归档需求', tag: '系统', count: 210 },
  ]);

  return (
    <div>
      <MsViewList
        showHead={false}
        title="devops视图devops视图"
        items={items}
        onChangeSort={setItems}
        viewItemDropDownMeun={(item: MsViewListItemType, index: number) => {
          const menu: MsViewListMenuItemType[] = [
            item.key === 1 && {
              label: '共享',
              key: 'other1',
              onClick: () => console.log('点击了共享'),
            },
            index !== 0 && 'top',
            'edit',
            'sort',
            'del',
            { label: '其他', key: 'other2', onClick: () => console.log('点击了其他') },
          ];
          return menu;
        }}
        sortableProps={{ isShowTopIcon: true }}
        onClickViewRow={(val, item, index) => console.log(val, item, index)}
      />
    </div>
  );
};
