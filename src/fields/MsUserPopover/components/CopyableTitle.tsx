import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useLocale } from '@jaytam/antd-ms/locale';
import { Button, message, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

type CopyableTitleProps = {
  title?: string;
  onCopy?: () => void;
};

function CopyableTitle(props: CopyableTitleProps) {
  const { globalLocale } = useLocale();
  const {
    title,
    onCopy = () => {
      message.destroy();
      message.success(globalLocale.copySuccess);
    },
  } = props;
  const [isCopying, setIsCopying] = useState(false);

  function handleClick(event: any) {
    event?.stopPropagation(); // 阻止事件冒泡
    if (isCopying) return;
    copy(title ?? '');
    onCopy?.();
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 3000);
  }

  return (
    <span className="user-popover-action">
      <Tooltip>
        <Button
          size="small"
          type="link"
          style={{ color: '#78858F' }}
          icon={isCopying ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleClick}
        />
      </Tooltip>
    </span>
  );
}

export default CopyableTitle;
