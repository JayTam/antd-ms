import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import type { CopyConfig } from '@jaytam/antd-ms/components/MsForm/types';
import { Button, Form, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import type { MsDescriptionsColumnType } from '../../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type CopyableTitleProps<D> = {
  titleColumn?: MsDescriptionsColumnType<D>;
};

function CopyableTitle<D>(props: CopyableTitleProps<D>) {
  const { globalLocale } = useLocale();
  const { titleColumn } = props;
  const [isCopying, setIsCopying] = useState(false);
  const form = Form.useFormInstance();

  const copyable = titleColumn?.copyable as CopyConfig;

  if (!copyable) return null;

  const { onCopy } = copyable;

  function handleClick() {
    if (isCopying) return;
    const text = form.getFieldValue(titleColumn?.formItemProps?.name ?? titleColumn?.dataIndex);
    copy(text);
    onCopy?.(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 3000);
  }

  return (
    <Tooltip title={isCopying ? globalLocale.copySuccess : globalLocale.copy}>
      <Button
        size="small"
        type="link"
        icon={isCopying ? <CheckOutlined /> : <CopyOutlined />}
        onClick={handleClick}
      />
    </Tooltip>
  );
}

export default CopyableTitle;
