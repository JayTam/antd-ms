import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { isString } from 'lodash-es';
import { useState } from 'react';
import type { CopyConfig, MsInstanceColumnType } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type CopyableTitleProps = {
  column?: MsInstanceColumnType;
};

function CopyableTitle(props: CopyableTitleProps) {
  const { column } = props;
  const [isCopying, setIsCopying] = useState(false);
  const { globalLocale } = useLocale();

  const copyable = column?.copyable as CopyConfig;

  if (!copyable) return null;

  const {
    onCopy = () => {
      message.destroy();
      message.success(globalLocale.copySuccess);
    },
    copyText,
  } = copyable;

  function handleClick() {
    if (isCopying) return;
    const text = copyText ?? (isString(column?.title) ? column?.title : '');
    copy(text ?? '');
    onCopy?.(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 3000);
  }

  return (
    <span className="ms-instance-action">
      <Tooltip>
        <Button
          size="small"
          type="link"
          icon={isCopying ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleClick}
        />
      </Tooltip>
    </span>
  );
}

export default CopyableTitle;
