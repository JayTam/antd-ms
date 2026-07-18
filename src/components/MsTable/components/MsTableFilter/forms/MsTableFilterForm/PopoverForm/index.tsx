import { FilterOutlined } from '@ant-design/icons';
import { PopoverContext } from '@jaytam/antd-ms/components/MsTable/contexts/popover';
import { Badge, Button, Popover } from 'antd';
import { useImperativeHandle, useRef, useState } from 'react';
import EditForm from '../EditorForm';
import './index.less';
import type { PopoverFormProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

function PopoverForm<P, R, D>(props: PopoverFormProps<P, R, D>) {
  const {
    filterNum,
    onReset,
    onSubmit,
    onClear,
    actionRef,
    onValuesChange,
    getPopupContainer = (triggerNode) => triggerNode?.parentElement ?? document.body,
    ...formProps
  } = props;

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const { globalLocale } = useLocale();

  const [clickOpen, setClickOpen] = useState(false);

  const handleSubmit = () => {
    setClickOpen?.(false);
    onSubmit?.();
  };

  const handleReset = () => {
    setClickOpen?.(false);
    onReset?.();
  };

  const handleClear = () => {
    setClickOpen?.(false);
    onClear?.();
  };

  const handleOpen = (open: boolean) => {
    setClickOpen?.(open);
  };

  useImperativeHandle(actionRef, () => ({
    openEditor() {
      setClickOpen(true);
    },
    closeEditor() {
      setClickOpen(false);
    },
  }));

  return (
    <PopoverContext.Provider value={{ popoverRef: popoverRef }}>
      <Badge className="ms-table-filter-num-badge" color="#388eff" count={filterNum}>
        <Popover
          overlayClassName="ms-popover-form-wrapper"
          open={clickOpen}
          onOpenChange={handleOpen}
          placement="bottom"
          getPopupContainer={getPopupContainer}
          content={
            <EditForm
              {...formProps}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onClear={handleClear}
              onValuesChange={clickOpen ? undefined : onValuesChange}
              onClose={() => {
                setClickOpen(false);
              }}
            />
          }
          showArrow={false}
          trigger="click"
          // @ts-ignore antd 文档没有该属性，但是生效的，设置目的是初始化渲染请求 column.request
          forceRender={true}
        >
          <Button ref={popoverRef} icon={<FilterOutlined />}>
            {globalLocale.filter}
          </Button>
        </Popover>
      </Badge>
    </PopoverContext.Provider>
  );
}

export default PopoverForm;
