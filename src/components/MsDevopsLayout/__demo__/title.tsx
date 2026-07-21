/**
 * title: 自定义顶部标题部分
 * description: 通过`title`属性可以自定义顶部标题的展示，可以使用内置的`MenuTitle`组件来
 * compact: true
 *
 */
import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import { MsDevopsLayout, MsIconFont } from '@jaytam/antd-ms';
import { message, Tooltip } from 'antd';

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

const { MenuTitle } = MsDevopsLayout;
export default () => {
  return (
    <MsDevopsLayout
      title={
        <Tooltip placement="right" title={'提示内容'}>
          <MenuTitle
            logo={<MsIconFont type="icon-baobiaoguanli" />}
            title={'系统标题'}
            onClick={() => message.success('自定义点击事件')}
          />
        </Tooltip>
      }
      defaultCollapsed
      autoMatch={false}
      routes={routes}
      style={{ height: 400 }}
    >
      aa
    </MsDevopsLayout>
  );
};
