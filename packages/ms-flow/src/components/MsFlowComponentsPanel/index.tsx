import { Dnd } from '@antv/x6-plugin-dnd';

import { Col, Collapse, Popover, Row } from 'antd';
import cs from 'classnames';
import { isNil } from 'lodash-es';
import { useContext, useMemo } from 'react';
import { MsFlowContext } from '../../context';

import type {
  MsFlowComponents,
  MsFlowComponentsPanelProps,
  MsFlowComponentType,
} from '../../types';
import { createNode } from '../../utils/node';
import './index.less';

function MsFlowComponentsPanel(props: MsFlowComponentsPanelProps) {
  const { className, components, style } = props;
  const { graph, nodeFieldNames: contextFieldNames } = useContext(MsFlowContext);

  const hasGroup = useMemo(() => {
    if (isNil(components)) return false;
    return components.some((component) => component.componentType === 'group');
  }, [components]);

  const itemRender = (component: MsFlowComponentType) => {
    const { colProps = { span: 24 } } = component;

    const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isNil(graph)) return;

      const node = createNode(graph, component, contextFieldNames);
      const dnd = new Dnd({
        target: graph,
        getDragNode: (node) => node.clone({ keepId: true }),
        getDropNode: (node) => node.clone({ keepId: true }),
      });
      dnd.start(node, e.nativeEvent);
    };

    return (
      <Popover placement="right" content={component.tooltip}>
        <Col {...colProps}>
          <div className="ms-flow-component-wrapper" onMouseDown={startDrag}>
            {component.panelNodeRender ? (
              component.panelNodeRender
            ) : (
              <div className="ms-flow-component">
                <div className="icon" />
                <div className="text">{component.title}</div>
              </div>
            )}
          </div>
        </Col>
      </Popover>
    );
  };

  const menuRender = (components?: MsFlowComponents): React.ReactNode => {
    if (isNil(components)) return null;

    return components.map((component) => {
      if (component.componentType === 'group') {
        return (
          <>
            <Col span={24}>
              <Collapse ghost>
                <Collapse.Panel header={component.title} key="1">
                  <Row gutter={20}>{menuRender(component.components)}</Row>
                </Collapse.Panel>
              </Collapse>
            </Col>
          </>
        );
      } else {
        return itemRender(component);
      }
    });
  };

  return (
    <div className={cs('ms-flow-components-panel', className)} style={style}>
      <div className="title">组件列表</div>
      <div className={cs('content', hasGroup ? undefined : 'content-padding')}>
        <Row gutter={20}>{menuRender(components)}</Row>
      </div>
    </div>
  );
}

export default MsFlowComponentsPanel;
