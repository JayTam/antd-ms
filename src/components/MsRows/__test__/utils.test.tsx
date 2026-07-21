import type { TooltipProps } from 'antd';
import type { MsRowsItem } from '../types';
import { getRowsArray, getToolTipConfig, isValidReactNode } from '../utils';

// 定义一些测试用例数据
const testReactElement = <div>测试React元素</div>;
const testString = '测试字符串';
const testNumber = 123;
const testUndefined = undefined;
const testObject = {
  id: 'testId',
  className: 'testClass',
  lineClamp: 2,
  style: { color: 'red' },
  render: () => <span>渲染函数返回的ReactNode</span>,
};

// 测试isValidReactNode函数
describe('isValidReactNode', () => {
  it('应该验证React元素为有效ReactNode', () => {
    expect(isValidReactNode(testReactElement)).toBe(true);
  });

  it('应该验证字符串为有效ReactNode', () => {
    expect(isValidReactNode(testString)).toBe(true);
  });

  it('应该验证未定义为有效ReactNode（根据原始逻辑）', () => {
    expect(isValidReactNode(testUndefined)).toBe(true);
  });

  it('不应该验证数字为有效ReactNode', () => {
    expect(isValidReactNode(testNumber)).toBe(false);
  });

  it('复合类型的MsRowsItem对象为无效ReactNode', () => {
    expect(isValidReactNode(testObject)).toBe(false);
  });
});

// 测试getRowsArray函数
describe('getRowsArray', () => {
  it('应该将单个MsRowsItem转换为数组', () => {
    expect(getRowsArray(testReactElement as MsRowsItem)).toEqual([testReactElement]);
  });

  it('应该保持MsRowsItem数组不变', () => {
    const rowsArray: MsRowsItem[] = [testReactElement, testString as unknown as MsRowsItem];
    expect(getRowsArray(rowsArray)).toEqual(rowsArray);
  });

  it('应该处理传入undefined时返回空数组', () => {
    expect(getRowsArray(undefined)).toEqual([]);
  });

  it('应该处理非数组且非MsRowsItem类型的输入，将其视为单个元素放入数组', () => {
    expect(getRowsArray(testNumber as unknown as MsRowsItem)).toEqual([testNumber]);
  });

  it('应该正确处理复合类型的MsRowsItem对象', () => {
    expect(getRowsArray(testObject as MsRowsItem)).toEqual([testObject]);
  });
});

describe('getToolTipConfig 函数测试', () => {
  // 测试当没有传入参数时的情况
  it('如果没有传入参数，应返回 undefined', () => {
    expect(getToolTipConfig()).toBeUndefined();
  });

  // 测试当传入布尔值 false 时的情况
  it('如果传入布尔值 false，应返回空对象', () => {
    expect(getToolTipConfig(false)).toBeUndefined();
  });

  // 测试当传入布尔值 true 时的情况，预期行为与传入 false 相同
  it('如果传入布尔值 true，应返回空对象', () => {
    expect(getToolTipConfig(true)).toEqual({});
  });

  // 测试传入有效 TooltipProps 对象的情况
  it('如果传入 TooltipProps 对象，应直接返回该对象', () => {
    const mockTooltipProps: TooltipProps = {
      title: '这是一个提示',
      placement: 'bottom',
    };
    expect(getToolTipConfig(mockTooltipProps)).toEqual(mockTooltipProps);
  });

  // 测试传入非布尔非对象的情况，理论上此情况不应该出现，但为了完整性可进行测试
  it('如果传入非布尔非TooltipProps的对象，理论上应忽略并返回 undefined （此处逻辑取决于具体实现）', () => {
    const invalidInput = '非预期输入';
    expect(getToolTipConfig(invalidInput as any)).toBeUndefined(); // 假设对于非法输入，函数仍然返回 undefined
  });
});
