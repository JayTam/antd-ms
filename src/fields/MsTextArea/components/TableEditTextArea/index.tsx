import type { PopoverProps } from 'antd';
import { Input, Popover } from 'antd';
import type { InputProps, InputRef, TextAreaProps } from 'antd/es/input';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import React, { useRef, useState } from 'react';
import './index.less';

type TableEditTextAreaProps = TextAreaProps;

const TableEditTextArea = React.forwardRef<TextAreaRef, TableEditTextAreaProps>((props, ref) => {
  const { value, onChange, placeholder, disabled } = props;

  const inputRef = useRef<InputRef>(null);
  const textAreaRef = useRef<TextAreaRef>(null);

  const [openClick, setOpenClick] = useState(false);

  const handleOnClickChange: PopoverProps['onOpenChange'] = (open) => {
    setOpenClick(open);
    setTimeout(() => textAreaRef.current?.focus({ cursor: 'end' }), 200);
  };

  const PopoverClickContent = (
    <Input.TextArea
      className="row-edit-text-area"
      showCount={true}
      style={{ resize: 'none' }}
      allowClear
      {...props}
      ref={textAreaRef}
    />
  );

  return (
    <Popover
      open={openClick}
      onOpenChange={handleOnClickChange}
      content={PopoverClickContent}
      align={{ points: ['ll', 'll'] }}
      trigger="click"
      mouseLeaveDelay={0}
      showArrow={false}
      overlayStyle={{ padding: 0 }}
      overlayClassName="row-edit-text-area-overlay"
      zIndex={1031}
    >
      <Input
        className="row-edit-text-area-input"
        ref={inputRef}
        value={value}
        onChange={onChange as InputProps['onChange']}
        placeholder={placeholder}
        disabled={disabled}
        readOnly
        style={{ visibility: openClick ? 'hidden' : 'visible' }}
      />
    </Popover>
  );
});

export default TableEditTextArea;
