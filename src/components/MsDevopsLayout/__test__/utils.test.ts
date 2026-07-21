import type { MsDevopsRouteItem, Umi3RouteItem } from '../types';
import {
  attachPropertiesToComponent,
  findMatchedUmiRoute,
  flatRoutes,
  generateMenuKey,
  generateRouteKeyMapper,
  generateRoutePathMapper,
  getBreadcrumbListByPath,
  getFoldTitle,
  getFormattedAntdMenuItems,
  getRoutePathsByPath,
  getRouteStrList,
  transformMsRoutesToMenuItems,
  transformMsRoutesToUmiRouteItems,
  transformMsRoutesWithKey,
} from '../utils';
import {
  nestedMenuItem,
  nestedMenuItemWithDeepPath,
  nestedMenuWithSamePath,
  nestedRouteItem,
  nestedRouteItemWithDeepPath,
  nestedRouteItemWithSamePath,
  routeItem,
  umiRouteItem,
} from './data';

describe('utils tests', () => {
  test('测试attachPropertiesToComponent方法', () => {
    const Component = () => null;
    const properties = { prop1: 'value1', prop2: 'value2' };
    const EnhancedComponent = attachPropertiesToComponent(Component, properties);
    expect(EnhancedComponent.prop1).toBe('value1');
    expect(EnhancedComponent.prop2).toBe('value2');
  });

  test('测试generateMenuKey的方法', () => {
    expect(generateMenuKey(routeItem)).toBe('testKey');
    expect(generateMenuKey(routeItem, 1)).toBe('testKey');
    const routeItemWithoutKey = { ...routeItem, key: undefined };
    expect(generateMenuKey(routeItemWithoutKey, 1)).toBe('1-/test');
  });

  test('测试transformMsRoutesToUmiRouteItems路由转换', () => {
    const routes: MsDevopsRouteItem[] = [nestedRouteItem];
    const umiRoutes = transformMsRoutesToUmiRouteItems(routes);
    expect(umiRoutes).toHaveLength(1);
    expect(umiRoutes[0].routes).toHaveLength(1);
    expect(umiRoutes[0].routes![0].path).toBe('/test-nested/child');
  });

  test('测试getFormattedAntdMenuItems', () => {
    const items = transformMsRoutesToMenuItems([nestedRouteItem]);
    const formattedItems = getFormattedAntdMenuItems(items, true);
    expect(formattedItems).toHaveLength(1);
    expect((formattedItems[0] as any).children).toHaveLength(1);
  });

  test('测试generateRouteKeyMapper', () => {
    const routes: MsDevopsRouteItem[] = [nestedRouteItem];
    const mapper = generateRouteKeyMapper(routes);
    expect(mapper).toHaveProperty('0-/test-nested');
    expect(mapper).toHaveProperty('childKey');
  });

  test('测试getRoutePaths', () => {
    const routes: MsDevopsRouteItem[] = [nestedRouteItem];
    const keyMapper = generateRouteKeyMapper(routes)!;
    const pathMapper = generateRoutePathMapper(flatRoutes(transformMsRoutesWithKey(routes)));
    const paths = getRoutePathsByPath(keyMapper, pathMapper, ['childKey']);
    expect(paths).toHaveLength(1);
    expect(paths![0]).toHaveLength(2);
    expect(paths![0][1].path).toBe('/test-nested/child');
  });

  test('测试getBreadcrumbList', () => {
    const breadcrumbList = getBreadcrumbListByPath(
      [
        {
          path: '/test-nested/child',
          title: 'Child',
          key: 'childKey',
        },
      ],
      [
        {
          path: '/test-nested',
          title: 'Test Nested',
        },
        {
          path: '/test-nested/child',
          title: 'Child',
          key: 'childKey',
        },
      ],
    );
    expect(breadcrumbList).toHaveLength(2);
    expect(breadcrumbList![0].title).toBe('Test Nested');
    expect(breadcrumbList![1].title).toBe('Child');
  });

  test('测试flatUmiRoutes', () => {
    const routes: Umi3RouteItem[] = [{ ...umiRouteItem, routes: [umiRouteItem] }];
    const route = flatRoutes(routes);
    expect(route).toHaveLength(2);
  });

  test('测试findMatchedUmiRoute', () => {
    const routes: Umi3RouteItem[] = [umiRouteItem];
    const matchedRoutes = findMatchedUmiRoute(routes, '/test');
    expect(matchedRoutes).toHaveLength(1);
    expect(matchedRoutes![0].path).toBe('/test');
  });
});

describe('generateRoutePathMapper 测试', () => {
  // 定义测试用的 MsDevopsRouteItem 类型数据
  const mockRouteItem: MsDevopsRouteItem = {
    path: '/example',
    key: 'exampleKey',
    title: 'Example',
    // 其他属性按需填充...
  };

  // 定义一组测试用的路由项
  const mockFlatRoutes: MsDevopsRouteItem[] = [
    { ...mockRouteItem },
    { ...mockRouteItem, path: '/example2', key: 'exampleKey2' },
    { ...mockRouteItem, path: '/example', key: 'exampleKeyDuplicate' }, // 重复的path
  ];

  // 测试当没有传入 flatRoutes 参数时
  it('如果没有传入 flatRoutes，应返回 undefined', () => {
    expect(generateRoutePathMapper()).toBeUndefined();
  });

  // 测试传入空数组的情况
  it('如果传入空数组，应返回空对象', () => {
    expect(generateRoutePathMapper([])).toEqual({});
  });

  // 测试正常处理路由项的情况
  it('正确处理路由项，生成路由映射', () => {
    const result = generateRoutePathMapper(mockFlatRoutes);
    expect(result).toHaveProperty(
      '/example',
      expect.arrayContaining([
        expect.objectContaining({ key: 'exampleKey' }),
        expect.objectContaining({ key: 'exampleKeyDuplicate' }),
      ]),
    );
    expect(result).toHaveProperty(
      '/example2',
      expect.arrayContaining([expect.objectContaining({ key: 'exampleKey2' })]),
    );
  });

  // 测试路由项中的路径重复情况
  it('处理路径重复的路由项，应将它们组织在一起', () => {
    const result = generateRoutePathMapper(mockFlatRoutes);
    expect(result?.['/example']).toHaveLength(2); // 确保路径'/example'下有2个元素
  });
});

describe('transformMsRoutesToMenuItems 测试', () => {
  // 基础测试用例：无角色限制，无分组限制
  test('嵌套表单项目测试', () => {
    const menuItems = transformMsRoutesToMenuItems([nestedRouteItemWithDeepPath]);
    expect(menuItems).toEqual([nestedMenuItemWithDeepPath]);
  });

  test('测试transformMsRoutesToMenuItems', () => {
    const routes: MsDevopsRouteItem[] = [nestedRouteItem];
    const menuItems = transformMsRoutesToMenuItems(routes);
    expect(menuItems).toEqual([nestedMenuItem]);
  });

  test('测试transformMsRoutesToMenuItems在父子节点都有相同的path并且子节点只有一个时，会自动删除子节点并且使用子节点的key', () => {
    const routes: MsDevopsRouteItem[] = [nestedRouteItemWithSamePath];
    const menuItems = transformMsRoutesToMenuItems(routes);
    expect(menuItems).toEqual([nestedMenuWithSamePath]);
  });
});

describe('getFoldTitle 测试', () => {
  test('全是中文时只截取4个字符', () => {
    const title = getFoldTitle('你好呀你的名字');
    expect(title).toBe('你好呀你');
  });
  test('全是字符时展示', () => {
    const title = getFoldTitle('aabbccddee');
    expect(title).toBe('aabbccdd');
  });
  test('中英混合时，中文和英文夹杂', () => {
    const title = getFoldTitle('aa你好bbcc');
    expect(title).toBe('aa你好bb');
  });
  test('中英混合时，英文连在一起', () => {
    const title = getFoldTitle('aa你好bbcc');
    expect(title).toBe('aa你好bb');
  });
  test('中英混合时，英文和中英文一比一隔开', () => {
    const title = getFoldTitle('a你b好dd');
    expect(title).toBe('a你b好dd');
  });
});

describe('getRouteStrList 测试', () => {
  test('全是中文时只截取4个字符', () => {
    const list = getRouteStrList('/a/b/c');
    expect(list).toEqual(['/', '/a', '/a/b', '/a/b/c']);
  });
});
