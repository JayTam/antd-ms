import { valueEnumToMap, valueEnumToOptions } from '../enum';
import { isMap } from 'lodash-es';

describe('valueEnumToMap 函数单元测试', () => {
  // 测试1：边界条件处理
  test('应正确处理空值/无效输入', () => {
    expect(valueEnumToMap(undefined)).toEqual(new Map());
    // @ts-ignore
    expect(valueEnumToMap(null)).toEqual(new Map());
    expect(valueEnumToMap([])).toEqual(new Map());
  });

  // 测试2：数组类型转换
  test('应正确转换数组结构', () => {
    const input = [
      { value: 1, label: '苹果', remark: '水果' },
      { value: 2, label: '香蕉' },
      '橘子' as unknown as object,
    ];

    const result = valueEnumToMap(input);
    expect(result.size).toBe(3);
    expect(result.get(1)).toEqual({ text: '苹果', remark: '水果' });
    expect(result.get('橘子')).toBe('橘子');
  });

  // 测试3：对象类型转换
  test('应正确转换对象结构', () => {
    const input = {
      1: { text: '待支付' },
      2: { text: '已支付' },
    };

    const result = valueEnumToMap(input);
    expect(result.get('1')).toEqual({ text: '待支付' });
    expect(result.get('2')).toEqual({ text: '已支付' });
  });

  // 测试4：自定义字段映射
  test('应适配自定义字段映射', () => {
    const input = [{ id: 1, name: '管理员', subs: [{ id: 11, name: '子管理员' }] }];

    const result = valueEnumToMap(input, {
      value: 'id',
      label: 'name',
      children: 'subs',
    });

    // @ts-ignore
    expect(result.get(1)?.text).toBe('管理员');
    // @ts-ignore
    expect(result.get(1)?.children?.get(11)?.text).toBe('子管理员'); // 验证递归处理[5](@ref)
  });

  // 测试5：保留原始字段配置
  test('应正确处理omitOriginFieldNames参数', () => {
    const input = [{ value: 1, label: '测试', extra: '额外字段' }];

    const keepResult = valueEnumToMap(input, {}, false);
    expect(keepResult.get(1)).toEqual({
      value: 1,
      label: '测试',
      extra: '额外字段',
      text: '测试',
    });
  });

  // 测试6：Map类型直接返回
  test('应直接返回Map类型输入', () => {
    const input = new Map([[1, { text: '测试值' }]]);
    const result = valueEnumToMap(input);
    expect(isMap(result)).toBe(true);
    expect(result.get(1)).toEqual({ text: '测试值' });
  });

  // 测试7：嵌套子节点处理
  test('应递归处理多级子节点', () => {
    const input = [
      {
        value: 'parent',
        label: '父节点',
        children: [
          {
            value: 'child',
            label: '子节点',
            children: [{ value: 'grandchild', label: '孙节点' }],
          },
        ],
      },
    ];

    const result = valueEnumToMap(input);
    // @ts-ignore
    const childMap = result.get('parent')?.children?.get('child')?.children;
    expect(childMap?.get('grandchild')?.text).toBe('孙节点');
  });

  // 测试8：剔除映射之前的值
  test('应正确转换数组结构', () => {
    const input = [{ value: 1, name: '苹果', remark: '水果' }];

    const result = valueEnumToMap(input, { label: 'name' });

    expect(result.get(1)).not.toHaveProperty('name');
    expect(result.get(1)).toHaveProperty('remark');
    expect(result.get(1)).toEqual({ remark: '水果', text: '苹果' });
  });
});

describe('valueEnumToOptions 函数单元测试', () => {
  // 测试1：基础类型转换
  test('应正确转换基础数据类型', () => {
    // Arrange
    const input = [{ value: 1, label: '苹果' }, '香蕉'];

    // Act
    // @ts-ignore
    const result = valueEnumToOptions(input);

    // Assert
    expect(result).toEqual([
      {
        label: '苹果',
        text: '苹果',
        value: '1', // 验证默认字符串转换
      },
      {
        label: '香蕉',
        text: '香蕉',
        value: '香蕉',
      },
    ]);
  });

  // 测试2：自定义字段映射
  test('应适配自定义字段配置', () => {
    const input = [{ id: 1, name: '管理员', subs: [{ id: 11, name: '子管理员' }] }];

    const result = valueEnumToOptions(input, {
      value: 'id',
      label: 'name',
      children: 'subs',
    });

    expect(result[0]).toMatchObject({
      label: '管理员',
      value: '1',
      children: expect.arrayContaining([
        expect.objectContaining({
          label: '子管理员',
          value: '11',
        }),
      ]),
    });
  });

  // 测试3：递归嵌套处理
  test('应递归处理三级嵌套结构', () => {
    const input = [
      {
        value: 'parent',
        label: '父节点',
        text: '父节点',
        children: [
          {
            value: 'child',
            label: '子节点',
            children: [{ value: 'grandchild', label: '孙节点', text: '孙节点' }],
          },
        ],
      },
    ];

    const result = valueEnumToOptions(input);
    const grandchildOptions = result[0].children[0].children;
    expect(grandchildOptions).toEqual([
      {
        label: '孙节点',
        text: '孙节点',
        value: 'grandchild',
      },
    ]);
  });

  // 测试4：valueNormal参数控制
  test('应正确处理数值型键值', () => {
    const input = new Map([
      [1, '苹果'],
      [2, '香蕉'],
    ]);

    // 默认情况转换字符串
    const defaultResult = valueEnumToOptions(input);
    expect(defaultResult[0].value).toBe('1');

    // 开启数值保持
    const normalResult = valueEnumToOptions(input, {}, true);
    expect(normalResult[0].value).toBe(1);
  });

  // 测试5：原始字段保留策略
  test('应控制原始字段保留逻辑', () => {
    const input = [{ value: 1, label: '测试', extra: '扩展字段' }];

    // 默认剔除原始字段
    const defaultResult = valueEnumToOptions(input);
    expect(defaultResult[0]).toHaveProperty('text');
    expect(defaultResult[0]).toHaveProperty('label');
    expect(defaultResult[0]).toHaveProperty('extra');
    expect(defaultResult[0]).toHaveProperty('value');

    // 关闭剔除逻辑
    const keepResult = valueEnumToOptions(input, {}, false, false);
    expect(keepResult[0]).toEqual({
      value: '1',
      label: '测试',
      text: '测试',
      extra: '扩展字段',
    });
  });

  // 测试6：边界条件处理
  test('应处理空值和非法输入', () => {
    // @ts-ignore
    expect(valueEnumToOptions(null)).toEqual([]);
    expect(valueEnumToOptions(undefined)).toEqual([]);
    expect(valueEnumToOptions([{ invalid: 1 }])).toEqual([]);
  });

  test('开启valueNormal，应该保持 value 的原始数据类型', () => {
    // 开启valueNormal
    expect(valueEnumToOptions({ 1: '选项一' }, {}, true)).toEqual([
      { label: '选项一', text: '选项一', value: '1' },
    ]);
    expect(valueEnumToOptions(new Map([[1, '选项一']]), {}, true)).toEqual([
      { label: '选项一', text: '选项一', value: 1 },
    ]);
    expect(valueEnumToOptions([{ label: '选项一', value: 1 }], {}, true)).toEqual([
      { label: '选项一', text: '选项一', value: 1 },
    ]);
  });

  test('不开启valueNormal，value 应该转换成字符串类型', () => {
    // 不开启valueNormal
    expect(valueEnumToOptions({ 1: '选项一' }, {}, false)).toEqual([
      { label: '选项一', text: '选项一', value: '1' },
    ]);
    expect(valueEnumToOptions(new Map([[1, '选项一']]), {}, false)).toEqual([
      { label: '选项一', text: '选项一', value: '1' },
    ]);
    expect(valueEnumToOptions([{ label: '选项一', value: 1 }], {}, false)).toEqual([
      { label: '选项一', text: '选项一', value: '1' },
    ]);
  });

  test('转换成 options 应该有 text 属性', () => {
    const input = {
      1: '专有网络',
      2: '私有网络',
    };

    const result = valueEnumToOptions(input);

    // 预期结果
    expect(result).toEqual([
      { label: '专有网络', text: '专有网络', value: '1' },
      { label: '私有网络', text: '私有网络', value: '2' },
    ]);
  });
});
