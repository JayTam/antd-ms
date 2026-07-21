import { findDependenciesList } from '../utils';

describe('findDependenciesList', () => {
  test('无依赖', () => {
    const actualValue = findDependenciesList('province', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
      },
    ]);

    expect(actualValue).toEqual(['province']);
  });

  test('三级依赖', () => {
    const actualValue = findDependenciesList('province', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
        dependencies: ['province'],
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
        dependencies: ['city'],
      },
    ]);

    expect(actualValue).toEqual(['province', 'city', 'area']);
  });

  test('存在三级依赖条件，从二级依赖开始查找', () => {
    const actualValue = findDependenciesList('city', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
        dependencies: ['province'],
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
        dependencies: ['city'],
      },
    ]);

    expect(actualValue).toEqual(['city', 'area']);
  });

  test('存在三级依赖条件，从一级依赖开始查找', () => {
    const actualValue = findDependenciesList('area', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
        dependencies: ['province'],
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
        dependencies: ['city'],
      },
    ]);

    expect(actualValue).toEqual(['area']);
  });

  test('二级依赖', () => {
    const actualValue = findDependenciesList('city', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
        dependencies: ['province'],
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
        dependencies: ['city'],
      },
    ]);

    expect(actualValue).toEqual(['city', 'area']);
  });

  test('存在二级依赖，从一级依赖开始查找', () => {
    const actualValue = findDependenciesList('area', [
      {
        title: '实例名称',
        dataIndex: 'name',
      },
      {
        title: '省',
        dataIndex: 'province',
        valueType: 'select',
      },
      {
        title: '市',
        dataIndex: 'city',
        valueType: 'select',
        dependencies: ['province'],
      },
      {
        title: '区',
        dataIndex: 'area',
        valueType: 'select',
        dependencies: ['city'],
      },
    ]);

    expect(actualValue).toEqual(['area']);
  });
});
