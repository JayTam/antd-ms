import type { Node } from '@antv/x6';
import { isNil, merge, omit } from 'lodash-es';
import type { MsFlowComponents, MsFlowComponentType, MsFlowNodeFieldNames } from '../types';

/**
 * 根据节点实例查找组件配置
 * @param node 节点实例
 * @param components 组件配置列表
 */
export const findComponent = (node: Node, components: MsFlowComponents) => {
  const dataIndex: string = (node as unknown as any).store.data.dataIndex;
  if (isNil(dataIndex)) {
    console.error('节点实例未发现 dataIndex，请检查 component 中是否配置 dataIndex');
    return null;
  }

  const _find = (dIndex: string, comps: MsFlowComponents): MsFlowComponentType | null => {
    if (comps.length === 0) return null;

    for (const component of comps) {
      if (component.componentType === 'group') {
        return _find(dIndex, component.components ?? []);
      }

      if (component.dataIndex === dIndex) {
        return component;
      }
    }

    return null;
  };

  return _find(dataIndex, components);
};

/**
 * 根据节点实例查找表单配置
 * @param node 节点实例
 * @param components 组件配置列表
 */
export const findFormColumns = (node: Node, components: MsFlowComponents) => {
  const component = findComponent(node, components);
  if (isNil(component)) return [];
  return component.formColumns ?? [];
};

/**
 * 根据节点实例查找表单初始值
 * @param node 节点实例
 * @param components 组件配置列表
 */
export const findFormInitialValues = (
  node: Node,
  components: MsFlowComponents,
  fieldNames?: MsFlowNodeFieldNames,
) => {
  const component = findComponent(node, components);
  if (isNil(component)) return {};

  return getFormInitialValues(node, component, component.formInitialValues, fieldNames);
};

/**
 * 获取节点的默认值
 * @param node 节点实例
 * @param component 组件配置
 * @param fieldNames 字段映射
 * @returns
 */
export function getFormInitialValues(
  node: Node,
  component: MsFlowComponentType,
  values: any,
  fieldNames?: MsFlowNodeFieldNames,
) {
  const initialValues = node.getData() ?? values ?? component.formInitialValues ?? {};
  if (isNil(fieldNames)) return initialValues;

  const formNamePathList = component.formColumns?.map((formColumn) => formColumn.dataIndex);
  const data: any = {};
  if (fieldNames.label && formNamePathList?.includes(fieldNames.label)) {
    data[fieldNames.label] = initialValues[fieldNames.label] ?? component.title;
  }
  if (fieldNames.width && formNamePathList?.includes(fieldNames.width)) {
    const { size } = node.getProp();
    const width = initialValues[fieldNames.width] ?? size?.width;
    data[fieldNames.width] = Number(width);
  }
  if (fieldNames.height && formNamePathList?.includes(fieldNames.height)) {
    const { size } = node.getProp();
    const height = initialValues[fieldNames.height] ?? size?.height;
    data[fieldNames.height] = Number(height);
  }
  return merge(omit(initialValues, Object.values(fieldNames)), data);
}
