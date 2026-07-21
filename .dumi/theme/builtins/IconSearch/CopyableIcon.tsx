import React from 'react';
import { Badge, message } from 'antd';
import classNames from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import './style.less';
import { allIcons, type ThemeType } from './IconSearch';

export interface CopyableIconProps {
  name: string;
  isNew: boolean;
  theme: ThemeType;
  justCopied: string | null;
  onCopied: (type: string, text: string) => void;
}

const CopyableIcon: React.FC<CopyableIconProps> = (props) => {
  const { name, isNew, justCopied, theme, onCopied } = props;

  const onCopy = (text: string, result: boolean) => {
    if (result) {
      onCopied(name, text);
    } else {
      message.error('Copy icon name failed, please try again.');
    }
  };
  return (
    <CopyToClipboard text={`<${name} />`} onCopy={onCopy}>
      <li className={classNames(theme, 'item', { copied: justCopied === name })}>
        {React.createElement(allIcons[name])}
        <span className="anticonCls">
          <Badge dot={isNew}>{name}</Badge>
        </span>
      </li>
    </CopyToClipboard>
  );
};

export default CopyableIcon;
