import { Button, Divider, Space, Tooltip } from 'antd';
import type { MsFlowToolsGroup, MsFlowToolsItem } from '../../types';

import './index.less';
type MsFlowToolsProps = {
  tools?: MsFlowToolsGroup[];
};

function MsFlowTools(props: MsFlowToolsProps) {
  const { tools } = props;

  const getTools = (items?: MsFlowToolsGroup[], placement: 'left' | 'right' = 'left') => {
    return items
      ?.map((menuGroup) => menuGroup.filter((menu) => (menu.placement ?? 'left') === placement))
      .filter(
        (menuGroup) => menuGroup.filter((menu) => (menu.placement ?? 'left') === placement).length,
      );
  };

  const leftTools = getTools(tools, 'left');

  const rightTools = getTools(tools, 'right');

  const toolItemRender = (menu: MsFlowToolsItem) => {
    const { tooltip, icon, ...restProps } = menu;
    return (
      <Tooltip title={tooltip}>
        <Button {...restProps} className="ms-flow-tools-item" type="text" size="small">
          <div className="ms-flow-tools-item-icon">{icon}</div>
        </Button>
      </Tooltip>
    );
  };

  return (
    <div className="ms-flow-tools" style={{}}>
      <Space
        align="center"
        className="ms-flow-tools-left"
        size={0}
        split={<Divider type="vertical" />}
      >
        {leftTools?.map((menuGroup, index) => {
          return (
            <Space key={index} size={4}>
              {menuGroup.map((menu) => toolItemRender(menu))}
            </Space>
          );
        })}
      </Space>

      <Space
        align="center"
        className="ms-flow-tools-right"
        size={0}
        split={<Divider type="vertical" />}
      >
        {rightTools?.map((menuGroup, index) => {
          return (
            <Space key={index} size={4}>
              {menuGroup.map((menu) => toolItemRender(menu))}
            </Space>
          );
        })}
      </Space>
    </div>
  );
}

export default MsFlowTools;
