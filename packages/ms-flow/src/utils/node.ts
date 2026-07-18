import type { Edge, Graph, Node } from '@antv/x6';
import { register } from '@antv/x6-react-shape';
import { cloneDeep, isNil, merge, omit } from 'lodash-es';
import * as nodes from '../nodes';
import type { EdgeType, MsFlowComponentType, MsFlowNodeFieldNames } from '../types';
import { getFormInitialValues } from './component';

const registerComponents = new Set();

/**
 * 组装节点配置
 * @param component 组件配置信息
 * @returns 用于
 */
export const makeNodeConfig = (component: MsFlowComponentType): Node.Metadata => {
  const { node: inputNode, dataIndex } = component;

  // 默认为 rect 节点
  let node: Node.Metadata = nodes.rect;

  // 内置节点
  if (inputNode?.shape) {
    const originNode = cloneDeep((nodes as any)[inputNode?.shape]);
    node = merge(originNode, { ...inputNode });
  }

  // React节点
  if (component.nodeComponent) {
    const reactNode = merge(
      { width: 100, height: 100 },
      omit(inputNode, 'shape'),
      component.nodeComponent,
    );

    if (registerComponents.has(reactNode.shape)) {
      node = reactNode;
    } else {
      register(reactNode);
      registerComponents.add(reactNode);
      node = reactNode;
    }
  }

  // 设置实例和component的映射
  node.dataIndex = dataIndex;

  return node;
};

/**
 * 创建节点
 * @param graph
 * @param component
 * @returns
 */
export const createNode = (
  graph: Graph,
  component: MsFlowComponentType,
  nodeFieldNames?: MsFlowNodeFieldNames,
) => {
  const node = graph.createNode(makeNodeConfig(component));
  initNodeData(node, component, component.formInitialValues, nodeFieldNames);
  return node;
};

/**
 * 设置节点的值
 * @param node 节点实例
 * @param values 表单更新的值
 * @param fieldNames 字段映射
 */
export function initNodeData(
  node: Node,
  component: MsFlowComponentType,
  values: any,
  fieldNames?: MsFlowNodeFieldNames,
) {
  // 更新数据
  const initialValues = getFormInitialValues(node, component, values, fieldNames);
  node.setData(initialValues);
  // 更新节点UI
  if (isNil(fieldNames) || isNil(initialValues)) return;
  const formNamePathList = component.formColumns?.map((formColumn) => formColumn.dataIndex);
  if (fieldNames.label && formNamePathList?.includes(fieldNames.label)) {
    node.setAttrs({ label: { text: initialValues[fieldNames.label] } });
  }

  if (fieldNames.width && formNamePathList?.includes(fieldNames.width)) {
    if (initialValues[fieldNames.width]) {
      const { size } = node.getProp();
      node.prop('size', { width: initialValues[fieldNames.width], height: size?.height });
    }
  }

  if (fieldNames.height && formNamePathList?.includes(fieldNames.height)) {
    if (initialValues[fieldNames.height]) {
      const { size } = node.getProp();
      node.prop('size', { height: initialValues[fieldNames.height], width: size?.width });
    }
  }
}

/**
 * 设置节点的值
 * @param node 节点实例
 * @param values 表单更新的值
 * @param fieldNames 字段映射
 */
export function updateNodeData(
  node: Node,
  component: MsFlowComponentType,
  values: any,
  fieldNames?: MsFlowNodeFieldNames,
) {
  node.replaceData(values);
  // 更新节点UI
  if (isNil(fieldNames) || isNil(values)) return;
  const formNamePathList = component.formColumns?.map((formColumn) => formColumn.dataIndex);
  if (fieldNames.label && formNamePathList?.includes(fieldNames.label)) {
    node.setAttrs({ label: { text: values[fieldNames.label] } });
  }

  if (fieldNames.width && formNamePathList?.includes(fieldNames.width)) {
    if (values[fieldNames.width]) {
      const { size } = node.getProp();
      node.prop('size', { width: values[fieldNames.width], height: size?.height });
    }
  }

  if (fieldNames.height && formNamePathList?.includes(fieldNames.height)) {
    if (values[fieldNames.height]) {
      const { size } = node.getProp();
      node.prop('size', { height: values[fieldNames.height], width: size?.width });
    }
  }
}

/**
 * 更新连线的值
 * @param edge 连线实例
 * @param values 表单更新的值
 * @param fieldNames 字段映射
 */
export function updateEdgeData(edge: Edge, values: any) {
  edge.replaceData(values);
}

/**
 * 初始化连线的值
 * @param cell 连线实例
 * @param component 连线表单组件
 */
export function initEdgeDate(cell: Edge, edge?: EdgeType) {
  const initialValues = cell.getData() ?? edge?.formInitialValues ?? {};
  cell.setData(initialValues);
}
