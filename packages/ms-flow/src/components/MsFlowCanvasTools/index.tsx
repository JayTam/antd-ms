import {
  CompressOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Space, Tooltip } from 'antd';
import { useContext, useRef, useState } from 'react';

import { MsFlowContext } from '../../context';

import './index.less';

type MsFlowCanvasToolsProps = {
  fullRef?: any;
  flowRef?: any;
};

function MsFlowCanvasTools(props: MsFlowCanvasToolsProps) {
  const { fullRef, flowRef } = props;
  const { graph } = useContext(MsFlowContext);
  const initSize = useRef<{ width: number; height: number }>();
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullRef, {
    onEnter() {
      if (graph) {
        const container = flowRef?.current?.parentNode;
        initSize.current = {
          height: graph.size.options.height,
          width: graph.size.options.width,
        };
        const { width, height } = container?.getBoundingClientRect();
        graph.resize(width, height);
      }
    },
    onExit() {
      if (initSize.current) {
        const { width, height } = initSize.current;
        graph?.resize(width, height);
      }
    },
    pageFullscreen: { zIndex: 1030 },
  });

  return (
    <Space className="ms-flow-canvas-tools" direction="vertical" size={4}>
      <Tooltip title="放大" placement="left">
        <div
          className="ms-flow-canvas-tool-item"
          onClick={() => {
            const zoom = (graph?.zoom() ?? 1) + 0.1;
            graph?.zoomTo(zoom);
          }}
        >
          <ZoomInOutlined className="ms-flow-canvas-tool-icon" />
        </div>
      </Tooltip>
      <Tooltip title="缩小" placement="left">
        <div
          className="ms-flow-canvas-tool-item"
          onClick={() => {
            const zoom = (graph?.zoom() ?? 1) - 0.1;
            graph?.zoomTo(zoom);
          }}
        >
          <ZoomOutOutlined className="ms-flow-canvas-tool-icon" />
        </div>
      </Tooltip>
      <Tooltip title="缩放到1:1" placement="left">
        <div
          className="ms-flow-canvas-tool-item"
          onClick={() => {
            graph?.zoomTo(1);
          }}
        >
          <svg
            className="anticon anticon-zoom-out ms-flow-canvas-tool-icon"
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="one-to-one"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <defs>
              <style />
            </defs>
            <path d="M316 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8zm196-50c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39zm0-140c22.1 0 40-17.9 40-39 0-23.1-17.9-41-40-41s-40 17.9-40 41c0 21.1 17.9 39 40 39z" />
            <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
            <path d="M648 672h60c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8z" />
          </svg>
        </div>
      </Tooltip>
      <Tooltip title="缩放到合适屏幕" placement="left">
        <div
          className="ms-flow-canvas-tool-item"
          onClick={() => {
            graph?.zoomToFit({
              padding: 100,
            });
          }}
        >
          <CompressOutlined className="ms-flow-canvas-tool-icon" />
        </div>
      </Tooltip>
      <Tooltip title="全屏" placement="left" open={openFullScreen}>
        <div
          className="ms-flow-canvas-tool-item"
          onMouseEnter={() => {
            setOpenFullScreen(true);
          }}
          onMouseLeave={() => {
            setOpenFullScreen(false);
          }}
          onClick={() => {
            setOpenFullScreen(!openFullScreen);
            toggleFullscreen();
          }}
        >
          {isFullscreen ? (
            <FullscreenExitOutlined className="ms-flow-canvas-tool-icon" />
          ) : (
            <FullscreenOutlined className="ms-flow-canvas-tool-icon" />
          )}
        </div>
      </Tooltip>
    </Space>
  );
}

export default MsFlowCanvasTools;
