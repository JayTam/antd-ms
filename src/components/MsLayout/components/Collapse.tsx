import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMsLayout } from '../context';
import type { MsMenuProps } from '../types';

/* 折叠按钮 */
const Collapse = (props: Omit<MsMenuProps, 'routes'>) => {
  const { collapsible } = props;
  const { collapsed, toggleCollapsed } = useMsLayout();

  if (!collapsible) return;

  return (
    <div className="ms-expansion" onClick={toggleCollapsed}>
      {collapsed ? (
        <MenuUnfoldOutlined style={{ fontSize: 16 }} />
      ) : (
        <MenuFoldOutlined style={{ fontSize: 16 }} />
      )}
    </div>
  );
};

export default Collapse;
