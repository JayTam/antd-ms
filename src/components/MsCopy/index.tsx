import { Button, message, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { isObject, isString, merge } from 'lodash-es';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less';

import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import type { MsCopyProps } from './types';
import cls from 'classnames';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsCopy = (props: MsCopyProps) => {
  const { globalLocale } = useLocale();
  const {
    text,
    children,
    onCopy = () => {
      message.destroy();
      message.success(globalLocale.copySuccess);
    },
    type = 'default',
    copyHoverShow,
    copyStyle: _copyStyle,
    ellipsis,
    tooltip,
  } = props;

  const [isCopying, setIsCopying] = useState(false);

  // 复制按钮的样式
  const copyStyle = merge(
    {
      color: 'rgba(0, 0, 0, .45)',
      marginLeft: '8px',
    },
    _copyStyle,
  );

  // 复制的内容
  const copyText = useMemo(() => {
    return text ?? (isString(children) ? children : '');
  }, [text, children]);

  // 点击复制按钮的事件
  const handleClick = () => {
    if (isCopying) return;
    copy(copyText);
    onCopy?.();
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 3000);
  };

  const childrenNode = useMemo(() => {
    if (ellipsis) {
      // 省略时，支持tooltip显示
      if (tooltip) {
        return (
          <Tooltip title={text || children} {...(isObject(tooltip) ? tooltip : {})}>
            <div className="ellipsis-content">{children}</div>
          </Tooltip>
        );
      }
      return (
        <div className="ellipsis-content" title={copyText}>
          {children}
        </div>
      );
    }
    return children;
  }, [children, ellipsis, tooltip, copyText, text]);

  if (!copyText) {
    return <>{children}</>;
  }

  if (type === 'default') {
    return (
      <CopyToClipboard text={copyText} onCopy={onCopy}>
        <div
          className={cls('ms-copy', {
            'ms-copy-ellipsis': ellipsis,
          })}
        >
          {childrenNode}
        </div>
      </CopyToClipboard>
    );
  }

  // 自带复制按钮
  return (
    <span
      className={cls('ms-copy-copyable', {
        'ms-copy-ellipsis': ellipsis,
      })}
    >
      {childrenNode}
      <Button
        className={`ms-copy-action ${copyHoverShow ? 'ms-copy-hover-action' : ''}`}
        size="small"
        type="link"
        icon={isCopying ? <CheckOutlined style={copyStyle} /> : <CopyOutlined style={copyStyle} />}
        onClick={handleClick}
      />
    </span>
  );
};

export default MsCopy;
