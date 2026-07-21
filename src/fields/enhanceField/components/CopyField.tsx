import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import type { MsDescriptionsColumnType } from '@jaytam/antd-ms';
import type { CopyConfig } from '@jaytam/antd-ms/components/MsForm/types';
import { useLocale } from '@jaytam/antd-ms/locale';
import { Button, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

type CopyFieldProps<D> = {
  column?: MsDescriptionsColumnType<D>;
  copyText?: string;
  copyNode?: ReactNode;
};

/**
 * 复制按钮组件
 * @returns
 */
function CopyField<D>(props: CopyFieldProps<D>) {
  const { copyText, copyNode, column } = props;
  const [isCopying, setIsCopying] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const { globalLocale } = useLocale();

  const copyable = column?.copyable as CopyConfig;

  if (!copyable) return null;

  const { onCopy } = copyable;

  function handleClick() {
    if (isCopying) return;
    setIsCopying(true);
    (copy as any)(copyText ?? textRef.current?.innerText);
    onCopy?.(copyText);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  }

  return (
    <>
      <Tooltip title={isCopying ? globalLocale.copySuccess : globalLocale.copy}>
        <Button
          size="small"
          type="link"
          icon={isCopying ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleClick}
        />
      </Tooltip>
      <div ref={textRef} style={{ display: 'none' }}>
        {copyNode}
      </div>
    </>
  );
}

export default CopyField;
