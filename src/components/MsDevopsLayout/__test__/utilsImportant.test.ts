import type { MsDevopsRouteItem } from '../types';
import { addSubMenuRolesToParentMenuRoles, transformMsRoutesToMenuItems } from '../utils';
import {
  rolesRouteList,
  rolesRouteListDeleteParentMatchedRole1,
  rolesRouteListDeleteParentMatchedRole3,
  rolesRouteListDeleteParentMatchedRole4,
  rolesRouteListNormalMatchedRole1,
  rolesRouteListNormalMatchedRole3,
  rolesRouteListNormalMatchedRole4,
  rolesRouteListWithDivider,
  rolesRouteListWithDividerMatched,
} from './data';

describe('测试addSubMenuRolesToParentMenuRoles', () => {
  it('应该处理空的路由列表', () => {
    const routes: MsDevopsRouteItem[] = [];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual([]);
  });

  it('应该正确处理没有子菜单的路由', () => {
    const routes: MsDevopsRouteItem[] = [{ path: '/', roles: ['admin'] }];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual([{ path: '/', roles: ['admin'] }]);
  });

  it('应该为具有所有子菜单都配置了权限的父菜单添加所有子菜单的角色', () => {
    const routes: MsDevopsRouteItem[] = [
      {
        path: '/',
        routes: [
          { path: '/child1', roles: ['role1'] },
          { path: '/child2', roles: ['role2'] },
        ],
      },
    ];
    const expected = [
      {
        path: '/',
        routes: [
          { path: '/child1', roles: ['role1'] },
          { path: '/child2', roles: ['role2'] },
        ],
        roles: ['role1', 'role2'],
      },
    ];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual(expected);
  });

  it('不应该为具有至少一个子菜单未配置权限的父菜单添加任何子菜单的角色', () => {
    const routes: MsDevopsRouteItem[] = [
      {
        path: '/',
        routes: [
          { path: '/child1', roles: ['role1'] },
          { path: '/child2' }, // 这个子菜单没有配置权限
        ],
      },
    ];
    const expected = [
      {
        path: '/',
        routes: [{ path: '/child1', roles: ['role1'] }, { path: '/child2' }],
      },
    ];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual(expected);
  });

  it('应该处理嵌套的多级子菜单', () => {
    const routes: MsDevopsRouteItem[] = [
      {
        path: '/',
        routes: [
          {
            path: '/child1',
            routes: [
              { path: '/grandchild1', roles: ['role1'] },
              { path: '/grandchild2', roles: ['role2'] },
            ],
          },
          { path: '/child2', roles: ['role3'] },
        ],
      },
    ];
    const expected = [
      {
        path: '/',
        routes: [
          {
            path: '/child1',
            routes: [
              { path: '/grandchild1', roles: ['role1'] },
              { path: '/grandchild2', roles: ['role2'] },
            ],
            roles: ['role1', 'role2'],
          },
          { path: '/child2', roles: ['role3'] },
        ],
        roles: ['role1', 'role2', 'role3'],
      },
    ];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual(expected);
  });

  it('应该处理多个顶级路由', () => {
    const routes: MsDevopsRouteItem[] = [
      {
        path: '/parent1',
        routes: [
          { path: '/child1-1', roles: ['role1'] },
          { path: '/child1-2', roles: ['role2'] },
        ],
      },
      {
        path: '/parent2',
        routes: [
          { path: '/child2-1', roles: ['role3'] },
          { path: '/child2-2', roles: ['role4'] },
        ],
      },
    ];
    const expected = [
      {
        path: '/parent1',
        routes: [
          { path: '/child1-1', roles: ['role1'] },
          { path: '/child1-2', roles: ['role2'] },
        ],
        roles: ['role1', 'role2'],
      },
      {
        path: '/parent2',
        routes: [
          { path: '/child2-1', roles: ['role3'] },
          { path: '/child2-2', roles: ['role4'] },
        ],
        roles: ['role3', 'role4'],
      },
    ];
    const result = addSubMenuRolesToParentMenuRoles(routes);
    expect(result).toEqual(expected);
  });
});

describe('测试transformMsRoutesToMenuItems 方法', () => {
  it('不删除模式匹配role1', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role1'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: false,
    });
    expect(result).toMatchObject(rolesRouteListNormalMatchedRole1);
  });
  it('不删除模式匹配role3', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role3'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: false,
    });
    expect(result).toMatchObject(rolesRouteListNormalMatchedRole3);
  });
  it('不删除模式匹配role4', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role4'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: false,
    });
    expect(result).toMatchObject(rolesRouteListNormalMatchedRole4);
  });
  it('删除模式匹配role1', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role1'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: true,
    });
    expect(result).toMatchObject(rolesRouteListDeleteParentMatchedRole1);
  });
  it('删除模式匹配role3', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role3'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: true,
    });
    expect(result).toMatchObject(rolesRouteListDeleteParentMatchedRole3);
  });

  it('删除模式匹配role4', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteList, {
      roles: ['role4'],
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: true,
    });
    expect(result).toMatchObject(rolesRouteListDeleteParentMatchedRole4);
  });
  it('下划线分割模式', () => {
    const result = transformMsRoutesToMenuItems(rolesRouteListWithDivider, {
      deleteEmptyRoutes: false,
      deleteParentMenuWhenNoPermittedChildren: true,
    });
    expect(result).toMatchObject(rolesRouteListWithDividerMatched);
  });
});
