import { Button, Form, Skeleton } from 'antd';
import { isFunction } from 'lodash-es';
import { useState } from 'react';
import MsDrawer from '../../../MsDrawer';
import MsBaseForm from '../../components/MsBaseForm';
import MsSubmitterContainer from '../../components/MsFormSubmitterContainer';

import type { MsFormProps } from '../../types';
import useFormInitLoading from '../../hooks/useFormLoading';
import useFormSubmit from '../../hooks/useFormSubmit';
import MsFormAnchor from '../../components/MsFormAnchor';
import { useLocale } from '@jaytam/antd-ms/locale';

/** 动画执行时长 */
const ANIMATION_DURATION = 300;

/**
 * 抽屉表单，formType=DrawerForm
 * @param props
 * @returns
 */
function MsDrawerForm<P, R, D>(props: MsFormProps<P, R, D>) {
  const { title, width, drawerProps, submitter, form: formInstance } = props;
  const { globalLocale } = useLocale();

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, setSubmitLoading, handleFinish, handleSubmit } = useFormSubmit(
    props,
    form,
    () => {
      // 触发真实的关闭
      drawerProps?.onClose?.();
      // 弹窗延迟关闭loading，避免出现重复点击
      setTimeout(() => setSubmitLoading(false), ANIMATION_DURATION);
    },
  );

  /**
   * 关闭抽屉
   */
  const handleClose = () => {
    // 用户监听的事件
    drawerProps?.onCancel?.();
    // 触发真实的关闭
    drawerProps?.onClose?.();
  };

  return (
    <>
      <MsDrawer
        title={title}
        width={width}
        onClose={handleClose}
        footer={
          <MsSubmitterContainer {...props} form={form}>
            {loading ? (
              <>
                <Skeleton.Button active />
                <Skeleton.Button active />
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={submitLoading}
                  {...submitter?.submitBtnProps}
                >
                  {submitter?.submitText ?? globalLocale.ok}
                </Button>
                <Button
                  disabled={submitLoading}
                  onClick={handleClose}
                  {...submitter?.cancelBtnProps}
                >
                  {submitter?.cancelText ?? globalLocale.cancel}
                </Button>
              </>
            )}
          </MsSubmitterContainer>
        }
        destroyOnClose={true}
        {...drawerProps}
        // 由于 MsForm 中的 DrawerForm 不支持 onCancel 异步，所以重写
        onCancel={async () => drawerProps?.onCancel?.()}
      >
        <MsFormAnchor {...props} />

        <MsBaseForm
          {...props}
          form={form}
          onFinish={handleFinish}
          loading={loading}
          setLoading={setLoading}
        />
      </MsDrawer>
    </>
  );
}

export default MsDrawerForm;
