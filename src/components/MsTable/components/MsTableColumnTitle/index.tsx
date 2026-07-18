import { Resizable } from 'react-resizable';
import './index.less';
import type { MsTableColumnTitleProps } from './types';
import React, { useState } from 'react';
import { ConfigContext } from 'antd/es/config-provider';
import cls from 'classnames';
import 'react-resizable/css/styles.css';

/**
 * 表格可拖移宽度列
 * @param props
 */
function MsTableColumnTitle(props: MsTableColumnTitleProps) {
  const { width, onResize, ...restProps } = props;

  const resizeWidth = Number(width?.toString().replace('px', ''));

  const { getPrefixCls } = React.useContext(ConfigContext);
  const [resizing, setResizing] = useState(false);

  if (Number.isNaN(resizeWidth)) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      height={0}
      axis="x"
      width={resizeWidth}
      handle={
        <span
          onClick={(e) => e.stopPropagation()}
          className={cls('ms-table-column-resizable-handle', { resizing })}
        />
      }
      onResize={onResize}
      onResizeStart={() => {
        setResizing(true);
        const theads = document.querySelectorAll(`.${getPrefixCls()}-table-thead`);
        theads.forEach((thead: any) => (thead.style.userSelect = 'none'));
      }}
      onResizeStop={() => {
        setResizing(false);
        const theads = document.querySelectorAll(`.${getPrefixCls()}-table-thead`);
        theads.forEach((thead: any) => (thead.style.userSelect = 'initial'));
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
}

export default MsTableColumnTitle;
