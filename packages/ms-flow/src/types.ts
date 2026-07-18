import type { Cell, Graph, Node } from '@antv/x6';
import type { ReactShapeConfig } from '@antv/x6-react-shape';
import type { MsFormColumns } from '@jaytam/antd-ms';
import type { ButtonProps, ColProps } from 'antd';
import type { ReactNode } from 'react';

export type MsFlowToolsGroup = MsFlowToolsItem[];

export type EdgeType = {
  title?: string;
  formColumns?: MsFormColumns;
  formInitialValues?: Record<string, any>;
};

export type MsFlowToolsItem = {
  placement?: 'left' | 'right';
  icon?: ReactNode;
  tooltip?: ReactNode;
  type?: string;
} & ButtonProps;

export type MsFlowProps = {
  actionRef?: React.Ref<MsFlowActionType>;
  components?: MsFlowComponents;
  tools?: MsFlowToolsGroup[];
  edge?: EdgeType;
  graphOptions?: Partial<Graph.Options>;
  /** 模式，编辑模式，预览模式 */
  mode?: 'edit' | 'preview';
  onLoad?: (graph: Graph) => void;
  className?: string;
  componentPanelClassName?: string;
  configPanelClassName?: string;
  style?: React.CSSProperties;
  componentPanelStyle?: React.CSSProperties;
  configPanelStyle?: React.CSSProperties;
  nodeFieldNames?: MsFlowNodeFieldNames;
};

export type MsFlowComponents = MsFlowComponentType[];

export type MsFlowComponentType = {
  title?: string;
  componentType?: 'group';
  node?: Node.Metadata;
  // nodeType?: 'rect' | 'circle' | 'ellipse' | 'ellipse' | 'polyline';
  nodeComponent?: ReactShapeConfig;
  nodeFieldNames?: MsFlowNodeFieldNames;
  panelNodeRender?: ReactNode;
  tooltip?: ReactNode;
  colProps?: ColProps;
  components?: MsFlowComponents;
  formColumns?: MsFormColumns;
  formInitialValues?: Record<string, any>;
  dataIndex?: string;
};

export type MenuToolType = {};

export type MsFlowActionType = {
  getGraph: () => Graph | undefined;
  validate: () => Promise<Cell[]>;
};

export type MsFlowComponentsPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  components?: MsFlowComponents;
};

export type MsFlowContextType = {
  graph?: Graph;
  currentCell?: Cell;
  nodeFieldNames?: MsFlowNodeFieldNames;
  setCurrentCell?: React.Dispatch<React.SetStateAction<Cell | undefined>>;
};

export type MsFlowConfigPanelProps = {
  components?: MsFlowComponents;
  edge?: EdgeType;
  fullRef?: any;
  className?: string;
  style?: React.CSSProperties;
};

export type MsFlowNodeFieldNames = {
  label?: string;
  width?: string;
  height?: string;
  color?: string;
  x?: string;
  y?: string;
};
