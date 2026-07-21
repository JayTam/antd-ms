import type { Graph } from '@antv/x6';
import { Shape } from '@antv/x6';
import type { MsFlowNodeFieldNames } from '../types';

// X6 Graph 默认参数
export const defaultGraphOptions: Graph.Options = {
  // autoResize: true,
  background: { color: '#F2F7FA' },
  panning: true,
  mousewheel: true,
  scaling: {
    min: 0.05, // 默认值为 0.01
    max: 4, // 默认值为 16
  },
  // 预览模式
  // interacting: false,
  connecting: {
    router: 'manhattan',
    connector: { name: 'rounded', args: { radius: 8 } },
    anchor: 'center',
    // connectionPoint: 'rounded',
    allowBlank: false, // 是否允许连接到画布空白位置的点
    snap: {
      radius: 20, // 当 snap 设置为 true 或者 false 代表开启和关闭连线过程中自动吸附
    },
    createEdge() {
      return new Shape.Edge({
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 10,
              height: 8,
            },
          },
        },
      });
    },
    validateConnection({ targetMagnet }) {
      return !!targetMagnet;
    },
  },
  highlighting: {
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        attrs: {
          fill: '#fff',
          stroke: '#31d0c6',
        },
      },
    },
  },
};

// 节点属性和表单属性的映射
export const defaultNodeFieldNames: MsFlowNodeFieldNames = {
  label: 'name',
  width: 'width',
  height: 'height',
  color: 'color',
  x: 'x',
  y: 'y',
};
