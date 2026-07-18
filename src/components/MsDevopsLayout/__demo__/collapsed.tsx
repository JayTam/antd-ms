/**
 * title: 展开收起按钮控制
 * description: 通过`defaultCollapsed` 控制默认展开或收起，`showCollapsedToggle`控制是否展示展开收起按钮， 如果想完全控制菜单是否展开，可以使用`menuInlineCollapsed`属性控制
 * compact: true
 *
 */

import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';
import { Button } from 'antd';
import { useState } from 'react';

const routes: MsDevopsRouteItem[] = [
  {
    title: '菜单1',
    path: '/test1',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '菜单2',
    path: '/test2',
    component: './monitor',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
  {
    title: '菜单3',
    path: '/test3',
    icon: <MsIconFont type="icon-peijianzichan" />,
  },
];

export default () => {
  const [menuInlineCollapsed, setMenuInlineCollapsed] = useState<boolean | undefined>(undefined);

  return (
    <div>
      <MsDevopsLayout
        menuInlineCollapsed={menuInlineCollapsed}
        defaultCollapsed
        onMenuCollapsedChange={setMenuInlineCollapsed}
        autoMatch={false}
        routes={routes}
        style={{ height: 400 }}
      >
        <Button onClick={() => setMenuInlineCollapsed(true)}>受控关闭</Button>
        <Button onClick={() => setMenuInlineCollapsed(false)}>受控展开</Button>
      </MsDevopsLayout>
    </div>
  );
};
