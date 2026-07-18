/**
 * title: 网络请求数据
 * description: 给request传入请求数据的接口,因组件特殊需要返回 [固定值](#msviewres),若后端返回非固定值则需要前端手动组装再返回
 */

import MsViewList from '@jaytam/antd-ms/components/MsViewList';
import { useRef } from 'react';
import type {
  MsViewListActionType,
  MsViewListItemType,
  MsViewListMenuItemType,
  MsViewListRes,
} from '../types';

export default () => {
  const data = [
    { id: 1, title: '全部需求', tag: '系统', count: 1111 },
    { id: 2, title: '进行中需求', tag: '系统', count: 10 },
    { id: 3, title: '已完成需求', tag: '系统', count: 50 },
    { id: 4, title: '已逾期需求', tag: '系统', count: 1111 },
    { id: 5, title: '已取消需求', tag: '系统', count: 17 },
    { id: 6, title: '已归档需求', tag: '系统', count: 210 },
    { id: 7, title: '我的待办', tag: '系统', count: 0 },
    { id: 8, title: '我提交的', tag: '系统', count: 23 },
    { id: 9, title: '待我受理', tag: '系统', count: 0 },
    { id: 10, title: '待我验收', tag: '系统', count: 0 },
    { id: 11, title: '待我发起验收', tag: '系统', count: 0 },
    { id: 12, title: '待我收益验证', tag: '系统', count: 7 },
    { id: 13, title: '我受理的', tag: '系统', count: 5 },
    { id: 14, title: '我转出的', tag: '系统', count: 0 },
    { id: 15, title: '我关注的', tag: '系统', count: 16 },
    { id: 16, title: '我的草稿', tag: '系统', count: 0 },
    { id: 17, title: '部门受理', tag: '系统', count: 243 },
    { id: 18, title: '部门提出', tag: '系统', count: 559 },
  ];

  const request = (): Promise<MsViewListRes> => {
    return new Promise((resolve) => {
      console.log('requesting');
      setTimeout(() => resolve(data), 2000);
    });
  };

  const actionRef = useRef<MsViewListActionType>(null);
  return (
    <div style={{ height: 400 }}>
      <MsViewList
        actionRef={actionRef}
        title="devops视图"
        request={request}
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
        postRes={(res) => res}
        viewListSortable={true}
        sortableProps={{ isShowTopIcon: true }}
        sortModalProps={{ bodyStyle: { maxHeight: 300, overflowY: 'auto' } }}
        onClickViewRow={(val, item, index) => console.log(val, item, index)}
      />
    </div>
  );
};
