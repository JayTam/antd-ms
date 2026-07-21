import { MsArrowLeftSmOutlined, MsArrowRightSmOutlined } from '@jaytam/icons';
import { useControllableValue } from 'ahooks';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import './index.less';
import type { MsResizablePorps } from './types';
import classNames from 'classnames';

const MsResizable = (props: MsResizablePorps) => {
  const {
    min,
    max,
    open: _open = true,
    height: _height = '',
    style = {},
    contentWrapperStyle = {},
    className,
    width: defaultWidth,
    disabled = false,
    children,
    showCollapsedToggle = true,
    expandStyle = {},
    position = 'left',
  } = props;
  const isLeft = position === 'left';
  // 定义一个正则表达式来验证高度值
  const validHeightRegex = /^(?:\d+(px)|\d+(\.\d+)?%)$/;
  // 最小宽度
  const minW = typeof min === 'number' ? min : 200;
  // 最大宽度
  const maxW = typeof max === 'number' ? max : 500;
  // 初始宽度
  const w = typeof defaultWidth === 'number' ? defaultWidth : minW;

  const maxWidth = minW > maxW ? minW : maxW;
  const _width = minW > w ? minW : maxW < w ? maxW : w;

  // 设置高度  默认是100%
  let height;
  if (typeof _height === 'number') {
    height = `${_height}px`;
  } else if (validHeightRegex.test(_height)) {
    height = _height;
  } else {
    height = '100%';
  }

  const [width, setWidth] = useControllableValue<number>(props, {
    valuePropName: 'defaultWidth',
    defaultValue: _width,
  });

  const [open, setOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
    defaultValue: _open,
  });

  // 设置滚动
  const overflowStyle = useMemo(() => {
    return open ? {} : { overflow: 'hideen' };
  }, [open]);

  // 设置展开收起按钮位置
  const trapezoidStyle = useMemo(() => {
    const { top, bottom, ...reset } = expandStyle || {};
    return bottom !== undefined
      ? { bottom: bottom ?? '40%', ...reset }
      : { top: top ?? '40%', ...reset };
  }, [expandStyle]);

  const initialXRef = useRef<number>(0);
  const resizableRef = useRef<HTMLDivElement>(null);
  const resizHandleRef = useRef<HTMLDivElement>(null);

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      if (resizableRef?.current) {
        const rect = resizableRef.current.getBoundingClientRect();
        const newWidth = isLeft
          ? Math.min(Math.max(e.clientX - rect.left, minW), maxWidth)
          : Math.min(Math.max(rect.right - e.clientX, minW), maxWidth);
        setWidth(newWidth);
      }
    },
    [isLeft, minW, maxWidth, setWidth],
  );

  const handleResizeEnd = useCallback(() => {
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
    if (resizableRef?.current) {
      resizableRef.current.style.transitionDuration = '0.25s';
    }

    if (resizHandleRef.current) {
      if (isLeft) {
        resizHandleRef.current.style.borderLeft = '1px solid #e6e8eb';
      } else {
        resizHandleRef.current.style.borderRight = '1px solid #e6e8eb';
      }
    }
  }, [handleResizeMove, isLeft]);

  const handleResizeStart = (e: React.MouseEvent) => {
    if (!open || disabled) return false;
    e.preventDefault();
    initialXRef.current = e.clientX;
    if (resizableRef.current) {
      resizableRef.current.style.transition = '0s';
    }

    if (resizHandleRef.current) {
      if (isLeft) {
        resizHandleRef.current.style.borderLeft = '1px dashed #106ffb';
      } else {
        resizHandleRef.current.style.borderRight = '1px dashed #106ffb';
      }
    }
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [handleResizeEnd, handleResizeMove]);

  const getToggleIcon = () => {
    if (isLeft) {
      return open ? <MsArrowLeftSmOutlined /> : <MsArrowRightSmOutlined />;
    } else {
      return open ? <MsArrowRightSmOutlined /> : <MsArrowLeftSmOutlined />;
    }
  };

  return (
    <div
      style={{
        height,
        ...style,
        width: open ? width : 0,
        [isLeft ? 'paddingRight' : 'paddingLeft']: '21px',
      }}
      ref={resizableRef}
      className={classNames('ms-resizable', className)}
    >
      <div className="ms-resizable-content" style={{ ...contentWrapperStyle, ...overflowStyle }}>
        {children}
      </div>
      <div
        ref={resizHandleRef}
        className={`ms-resizable-handle ms-resizable-handle-${position}`}
        style={{
          cursor: disabled || !open ? 'default' : 'ew-resize',
        }}
        onMouseDown={handleResizeStart}
      />
      {showCollapsedToggle && (
        <div
          className={`ms-resizable-trapezoid ms-resizable-trapezoid-${position}`}
          onClick={() => setOpen((p) => !p)}
          style={trapezoidStyle}
        >
          {getToggleIcon()}
        </div>
      )}
    </div>
  );
};

export default MsResizable;
