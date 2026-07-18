import './index.less';

import React, { useEffect, useRef, useState } from 'react';

interface PropsType<T extends any> {
  event: T;
  clientX: number;
  clientY: number;
  visible: boolean;
  onClose?: () => void;
  items: {
    key: string;
    label: string;
    onClick: (event: T) => void;
  }[];
}

export const ContextMenu = <T,>(props: PropsType<T>) => {
  const { event, clientX, clientY, visible, onClose, items } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: clientX, y: clientY });

  // 计算菜单位置
  useEffect(() => {
    if (visible && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 计算新的位置
      let newClientX = clientX;
      let newClientY = clientY;

      // 检查右边界
      if (clientX + menuRect.width > viewportWidth) {
        newClientX = viewportWidth - menuRect.width;
      }

      // 检查下边界
      if (clientY + menuRect.height > viewportHeight) {
        newClientY = viewportHeight - menuRect.height;
      }

      // 检查左边界
      if (newClientX < 0) {
        newClientX = 0;
      }

      // 检查上边界
      if (newClientY < 0) {
        newClientY = 0;
      }

      setPosition({ x: newClientX, y: newClientY });
    }
  }, [visible, clientX, clientY]);

  // 阻止右键的默认事件
  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      ref={menuRef}
      style={{
        zIndex: 1000,
        borderRadius: 4,
        position: 'fixed',
        backgroundColor: '#FFFFFF',
        left: visible ? position.x : -100000,
        top: visible ? position.y : -100000,
      }}
      onContextMenu={handleContextMenu}
    >
      <div className="ms-gantt-menu-container" onContextMenu={handleContextMenu}>
        {items.map((item) => (
          <div
            key={item.key}
            className="ms-gantt-menu-item"
            onContextMenu={handleContextMenu}
            onClick={() => {
              item?.onClick(event);
              onClose?.();
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContextMenu;
