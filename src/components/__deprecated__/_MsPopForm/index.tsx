import { Button, Col, Drawer, Modal, notification, Row, Space } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import React, { useImperativeHandle, useRef, useState } from 'react';
import MyForm from '../_MsForm/index';
import type * as MsFormTs from './types';

const Visible = (() => {
  const storedVisible = { val: false };
  let changeState = (val: boolean) => {};
  Object.defineProperty(storedVisible, 'val', {
    set(v) {
      changeState(v);
    },
  });
  return {
    useState: (init?: boolean): [boolean, Dispatch<SetStateAction<boolean>>] => {
      const [visible, setVisible] = useState<boolean>(init ?? false);
      storedVisible.val = visible;
      return [visible, setVisible];
    },
    useOpen: () => {
      const [open, setOpen] = useState<boolean>(storedVisible.val);
      changeState = setOpen;
      return open;
    },
  };
})();

const MsPopForm: MsFormTs.MsFormInterface = ({ options, popFormRef }) => {
  const [visible, setVisible] = Visible.useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [record, setRecord]: any = useState({});
  const formRef: any = useRef();
  const popOptions = options?.popOptions || {};
  const type = options?.type || 'drawer';
  const formSubmit = options.formSubmit;
  // 打开弹框
  const open = (record: any) => {
    setRecord(record);
    setVisible(true);
    setAddLoading(false);
  };
  const changeOpen = (newOpen?: boolean) => {
    setVisible(newOpen ?? false);
  };
  // 直接调用钩子
  options.open = open;
  options.getForm = () => formRef.current?.form;

  useImperativeHandle(popFormRef, () => ({
    open,
    changeOpen,
    getForm: () => formRef.current?.form,
  }));

  // 关闭弹框
  const onCancel = (e: any) => {
    let visible = false;
    if (typeof popOptions?.onCancel === 'function') {
      if ((popOptions?.onCancel(e) as unknown) === true) {
        visible = true;
      }
    }
    setVisible(visible);
  };
  const handleSubmit = () => {
    formRef.current.form.validateFields().then((values: any) => {
      if (formSubmit) {
        setAddLoading(true);
        const data = { ...values, id: record?.id };
        formSubmit(data, record)
          .then((res: any) => {
            setAddLoading(false);
            if (res?.code !== undefined) {
              if ([0, 1, 200].includes(res?.code)) {
                notification.success({
                  message: '操作成功',
                  description: res?.msg,
                  duration: 1.5,
                });
              } else {
                notification.error({
                  message: '操作失败',
                  description: res?.msg,
                });
              }
            }
            setVisible(false);
            // 数据回传钩子
            options.formCallback?.(data, res);
          })
          .catch((err: Error) => {
            setAddLoading(false);
            // 数据回传钩子
            options.formCallback?.(null, err);
          });
      }
    });
  };
  const ComForm = <MyForm options={options} formRef={formRef} record={record} />;
  const footer = (
    <Row justify={'end'} style={{ padding: '8px 0' }}>
      <Col>
        <Space>
          <Button {...popOptions.cancelButtonProps} disabled={addLoading} onClick={onCancel}>
            {popOptions.cancelText || '取消'}
          </Button>
          <Button
            type="primary"
            {...popOptions.okButtonProps}
            loading={addLoading}
            onClick={handleSubmit}
          >
            {popOptions.okText || '确定'}
          </Button>
        </Space>
      </Col>
    </Row>
  );

  if (type === 'drawer') {
    return (
      <Drawer
        width={popOptions?.width || '80%'}
        open={visible}
        destroyOnClose // 踩坑之旅 不设置destroyOnClose 表单的初始值 不是很好解决 用这个属性比较简约
        onClose={onCancel}
        footer={footer}
        {...popOptions}
      >
        {ComForm}
      </Drawer>
    );
  } else if (type === 'modal') {
    return (
      <Modal
        open={visible}
        destroyOnClose // 踩坑之旅 不设置destroyOnClose 表单的初始值 不是很好解决 用这个属性比较简约
        onCancel={onCancel}
        footer={footer}
        {...popOptions}
      >
        {ComForm}
      </Modal>
    );
  } else {
    return ComForm;
  }
};

MsPopForm.useOpen = Visible.useOpen;

export default MsPopForm;

export const Options: React.FC<MsFormTs.Options> = () => null;
