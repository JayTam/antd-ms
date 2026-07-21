import type { Cell, Node } from '@antv/x6';
import { Graph } from '@antv/x6';
import { ContextMenu, Menu } from '@antv/x6-react-components';
import cs from 'classnames';

import { DeleteOutlined } from '@ant-design/icons';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Transform } from '@antv/x6-plugin-transform';

import '@antv/x6-react-components/es/context-menu/style/index.css';
import '@antv/x6-react-components/es/dropdown/style/index.css';
import '@antv/x6-react-components/es/menu/style/index.css';
import { useClickAway, useMount } from 'ahooks';
import { merge } from 'lodash-es';
import { useImperativeHandle, useRef, useState } from 'react';
import { MsFlowContext } from '../../context';
import type { MsFlowProps } from '../../types';
import { defaultGraphOptions, defaultNodeFieldNames } from '../../utils/defaultProps';
import { initEdgeDate } from '../../utils/node';
import { setErrorStatus, setSuccessStatus } from '../../utils/validate';
import MsFlowCanvasTools from '../MsFlowCanvasTools';
import MsFlowComponentsPanel from '../MsFlowComponentsPanel';
import MsFlowConfigPanel from '../MsFlowConfigPanel';
import MsFlowTools from '../MsFlowTools';
import './index.less';

function MsFlow(props: MsFlowProps) {
  const { components, tools, actionRef, edge, graphOptions = {}, nodeFieldNames, onLoad } = props;
  const {
    className,
    componentPanelClassName,
    configPanelClassName,
    style,
    componentPanelStyle,
    configPanelStyle,
    mode = 'edit',
  } = props;
  const flowRef = useRef<HTMLDivElement>(null);
  const fullRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<Graph>();

  const [currentCell, setCurrentCell] = useState<Cell>();
  const [currentContextCell, setCurrentContextCell] = useState<Cell>();

  const [openContextMenu, setOpenContextMenu] = useState(false);

  const closeMenu = () => {
    setCurrentContextCell(undefined);
    setOpenContextMenu(false);
  };

  const openMenu = (cell: Cell) => {
    setCurrentContextCell(cell);
    setOpenContextMenu(true);
  };

  useClickAway(() => closeMenu(), flowRef);

  useMount(() => {
    if (flowRef.current) {
      // 预览模式
      if (mode === 'preview') {
        graphOptions.translating = { restrict: true };
      }
      const g = new Graph({
        container: flowRef.current,
        autoResize: flowRef.current,
        ...merge(defaultGraphOptions, graphOptions),
      });
      g.on('cell:contextmenu', ({ cell }) => openMenu(cell));
      g.on('cell:click', () => closeMenu());
      g.on('node:added', () => closeMenu());
      g.on('edge:connected', ({ edge: edgeInstance }) => {
        initEdgeDate(edgeInstance, edge);
        closeMenu();
      });
      g.on('blank:click', () => closeMenu());
      g.on('blank:contextmenu', () => closeMenu());

      // 自定义事件
      g.on('cell:error', (node: Node) => {
        setErrorStatus(node);
      });
      g.on('cell:success', (node: Node) => {
        setSuccessStatus(node);
      });
      g.on('edge:mouseenter', ({ cell }) => {
        const attrs = cell.getAttrs();
        cell.addTools({
          name: 'vertices',
          args: {
            modifiers: 'ctrl',
          },
        });
        cell.addTools([
          {
            name: 'source-arrowhead',
            args: {
              attrs: {
                fill: attrs.line.stroke,
                'stroke-width': 1,
                // d: 'M 5 -4 -5 0 5 4 Z',
              },
            },
          },
          {
            name: 'target-arrowhead',
            args: {
              attrs: {
                fill: attrs.line.stroke,
                'stroke-width': 1,
                // d: 'M -8 -6 8 0 -8 4 Z',
              },
            },
          },
        ]);
      });

      g.on('edge:mouseleave', ({ cell }) => {
        cell.removeTools();
      });

      // 注册插件
      g.use(
        new Transform({
          resizing: true,
        }),
      )
        .use(
          new Selection({
            // rubberband: true,
            showNodeSelectionBox: true,
          }),
        )
        .use(new Snapline({ enabled: true }));
      setGraph(g);
      onLoad?.(g);
    }
  });

  const handleValidate = async () => {
    return new Promise<Cell[]>((resolve, reject) => {
      setTimeout(() => {
        const cells = graph?.getCells();
        const result = cells?.every((cell: any) => cell.store.data.dataStatus === 'success');
        if (result) {
          resolve(cells ?? []);
        } else {
          reject(cells?.filter((cell: any) => cell.store.data.dataStatus === 'error'));
        }
      }, 100);
    });
  };

  useImperativeHandle(actionRef, () => ({
    getGraph() {
      return graph;
    },
    validate: handleValidate,
  }));

  const editModeRender = () => {
    if (mode !== 'edit') return null;

    return (
      <>
        {/* 组件面板 */}
        <MsFlowComponentsPanel
          className={componentPanelClassName}
          style={componentPanelStyle}
          components={components}
        />
        <div className="ms-flow-layout-container">
          {/* 工具栏 */}
          <MsFlowTools tools={tools} />
          <div className="ms-flow-canvas-wrapper">
            {/* 右键菜单 */}
            <ContextMenu
              visible={openContextMenu}
              menu={
                <Menu hasIcon>
                  <Menu.Item
                    onClick={() => {
                      if (currentContextCell) {
                        graph?.removeCell(currentContextCell);
                        closeMenu();
                        setCurrentCell(undefined);
                      }
                    }}
                    name="delete"
                    icon={<DeleteOutlined />}
                    text="删除节点"
                  />
                </Menu>
              }
            >
              {/* 画布 */}
              <div className="ms-flow-canvas" ref={flowRef} />
            </ContextMenu>
            {/* 画布工具栏 */}
            <MsFlowCanvasTools fullRef={fullRef} flowRef={flowRef} />
          </div>
        </div>
        {/* 配置面板 */}
        <MsFlowConfigPanel
          className={configPanelClassName}
          style={configPanelStyle}
          components={components}
          edge={edge}
        />
      </>
    );
  };

  const previewModeRender = () => {
    if (mode !== 'preview') return null;
    return (
      <div className="ms-flow-layout-container">
        <div className={cs('ms-flow-canvas-wrapper', mode)}>
          {/* 画布 */}
          <div className="ms-flow-canvas" ref={flowRef} />
          {/* 画布工具栏 */}
          <MsFlowCanvasTools fullRef={fullRef} flowRef={flowRef} />
        </div>
      </div>
    );
  };

  return (
    <MsFlowContext.Provider
      value={{
        graph,
        currentCell,
        nodeFieldNames: merge(defaultNodeFieldNames, nodeFieldNames),
        setCurrentCell: setCurrentCell,
      }}
    >
      <div className={cs('ms-flow', className)} ref={fullRef} style={style}>
        {editModeRender()}
        {previewModeRender()}
      </div>
    </MsFlowContext.Provider>
  );
}

export default MsFlow;
