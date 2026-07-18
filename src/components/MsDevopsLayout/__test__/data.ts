import type { MsDevopsRouteItem } from '@jaytam/antd-ms';
import type { Umi3RouteItem } from '../types';

// 用于测试的数据
export const routeItem: MsDevopsRouteItem = {
  path: '/test',
  title: 'Test',
  key: 'testKey',
};

export const nestedRouteItem: MsDevopsRouteItem = {
  path: '/test-nested',
  title: 'Test Nested',
  routes: [
    {
      path: '/test-nested/child',
      title: 'Child',
      key: 'childKey',
    },
  ],
};

export const nestedMenuItem = {
  label: 'Test Nested',
  key: '0-/test-nested',
  path: '/test-nested',
  foldTitle: 'Test Nested',
  children: [
    {
      label: 'Child',
      key: 'childKey',
      path: '/test-nested/child',
      foldTitle: 'Child',
    },
  ],
};

export const nestedRouteItemWithSamePath: MsDevopsRouteItem = {
  path: '/test-nested',
  title: 'Test Nested',
  routes: [
    {
      path: '/test-nested',
      title: 'Child',
      key: 'childKey',
    },
  ],
};

export const nestedMenuWithSamePath = {
  label: 'Test Nested',
  key: 'childKey',
  path: '/test-nested',
  foldTitle: 'Test Nested',
};

export const nestedRouteItemWithDeepPath: MsDevopsRouteItem = {
  path: '/a',
  title: 'a',
  routes: [
    {
      path: '/a/b',
      title: 'ab',
      routes: [
        {
          path: '/a/b/c',
          title: 'abc',
          routes: [
            {
              path: '/a/b/c/d',
              title: 'abcd',
            },
          ],
        },
      ],
    },
  ],
};

export const nestedMenuItemWithDeepPath = {
  foldTitle: 'a',
  icon: undefined,
  key: '0-/a',
  label: 'a',
  link: undefined,
  path: '/a',
  children: [
    {
      foldTitle: 'ab',
      icon: undefined,
      key: '1-/a/b',
      label: 'ab',
      link: undefined,
      path: '/a/b',
      children: [
        {
          foldTitle: 'abc',
          icon: undefined,
          key: '2-/a/b/c',
          label: 'abc',
          link: undefined,
          path: '/a/b/c',
          children: [
            {
              foldTitle: 'abcd',
              icon: undefined,
              key: '3-/a/b/c/d',
              label: 'abcd',
              link: undefined,
              path: '/a/b/c/d',
            },
          ],
        },
      ],
    },
  ],
};

export const umiRouteItem: Umi3RouteItem = {
  path: '/test',
  component: 'TestComponent',
  title: 'Test',
};

export const rolesRouteList = [
  {
    path: '/parent1',
    routes: [
      {
        path: '/child1-1',
        routes: [
          { path: '/child1-1-1', roles: ['role1'] },
          { path: '/child1-1-2', roles: ['role2'] },
        ],
      },
      { path: '/child1-2', roles: ['role3'] },
    ],
  },
  {
    path: '/parent2',
    routes: [{ path: '/child2-1' }, { path: '/child2-2', roles: ['role4'] }],
  },
  {
    path: '/parent3',
    routes: [
      { path: '/child3-1', roles: ['role5'] },
      { path: '/child3-2', roles: ['role6'] },
    ],
  },
];

export const rolesRouteListWithDivider: MsDevopsRouteItem[] = [
  {
    path: '/parent1',
    bottomDivider: true,
  },
  {
    path: '/parent2',
    bottomDivider: 'a',
  },
  {
    path: '/parent3',
    bottomDivider: 'a',
  },
  {
    path: '/parent4',
  },
];

export const rolesRouteListNormalMatchedRole1 = [
  {
    key: '0-/parent1',
    path: '/parent1',
    children: [
      {
        key: '1-/child1-1',
        path: '/child1-1',
        children: [
          {
            key: '2-/child1-1-1',
            path: '/child1-1-1',
          },
        ],
      },
    ],
  },
  {
    key: '0-/parent2',
    path: '/parent2',
  },
  {
    key: '0-/parent3',
    path: '/parent3',
  },
];
export const rolesRouteListNormalMatchedRole3 = [
  {
    key: '0-/parent1',
    path: '/parent1',
    children: [
      {
        key: '1-/child1-1',
        path: '/child1-1',
      },
      {
        key: '1-/child1-2',
        path: '/child1-2',
      },
    ],
  },
  {
    key: '0-/parent2',
    path: '/parent2',
    children: [
      {
        key: '1-/child2-1',
        path: '/child2-1',
      },
    ],
  },
  {
    key: '0-/parent3',
    path: '/parent3',
  },
];

export const rolesRouteListNormalMatchedRole4 = [
  {
    key: '0-/parent1',
    path: '/parent1',
    children: [
      {
        key: '1-/child1-1',
        path: '/child1-1',
      },
    ],
  },
  {
    key: '0-/parent2',
    path: '/parent2',
    children: [
      {
        key: '1-/child2-1',
        path: '/child2-1',
      },
      {
        key: '1-/child2-2',
        path: '/child2-2',
      },
    ],
  },
  {
    key: '0-/parent3',
    path: '/parent3',
  },
];

export const rolesRouteListDeleteParentMatchedRole1 = [
  {
    key: '0-/parent1',
    path: '/parent1',
    children: [
      {
        key: '1-/child1-1',
        path: '/child1-1',
        children: [{ path: '/child1-1-1', key: '2-/child1-1-1' }],
      },
    ],
  },
  {
    key: '0-/parent2',
    path: '/parent2',
  },
];

export const rolesRouteListDeleteParentMatchedRole3 = [
  {
    key: '0-/parent1',
    path: '/parent1',
    children: [
      {
        key: '1-/child1-2',
        path: '/child1-2',
      },
    ],
  },
  {
    key: '0-/parent2',
    path: '/parent2',
    children: [
      {
        key: '1-/child2-1',
        path: '/child2-1',
      },
    ],
  },
];

export const rolesRouteListDeleteParentMatchedRole4 = [
  {
    key: '0-/parent2',
    path: '/parent2',
    children: [
      {
        key: '1-/child2-1',
        path: '/child2-1',
      },
      {
        key: '1-/child2-2',
        path: '/child2-2',
      },
    ],
  },
];

export const rolesRouteListWithDividerMatched = [
  {
    key: '0-/parent1',
    path: '/parent1',
  },
  { type: 'divider', className: 'ms-devops-menu-divider' },
  {
    key: '0-/parent2',
    path: '/parent2',
  },
  {
    key: '0-/parent3',
    path: '/parent3',
  },
  { type: 'divider', className: 'ms-devops-menu-divider' },
  {
    key: '0-/parent4',
    path: '/parent4',
  },
];
