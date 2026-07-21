import { Button, Form, Skeleton } from 'antd';
import { isFunction } from 'lodash-es';
import { useState } from 'react';
import MsModal from '../../../MsModal';
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
 * 弹窗表单，formType=ModalForm
 * @param props
 * @returns
 */
function MsModalForm<P, R, D>(props: MsFormProps<P, R, D>) {
  const { title, width, modalProps, submitter, form: formInstance } = props;
  const { globalLocale } = useLocale();

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, setSubmitLoading, handleFinish, handleSubmit } = useFormSubmit(
    props,
    form,
    () => {
      // 触发真实的关闭
      modalProps?.onClose?.();
      // 弹窗延迟关闭loading，避免出现重复点击
      setTimeout(() => setSubmitLoading(false), ANIMATION_DURATION);
    },
  );

  /**
   * 关闭弹窗
   */
  const handleClose = async () => {
    // 用户监听的事件
    modalProps?.onCancel?.();
    // 触发真实的关闭
    modalProps?.onClose?.();
  };

  return (
    <>
      <MsModal
        title={title}
        width={width}
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
                  disabled={submitLoading}
                  onClick={handleClose}
                  {...submitter?.cancelBtnProps}
                >
                  {submitter?.cancelText ?? globalLocale.cancel}
                </Button>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={submitLoading}
                  {...submitter?.submitBtnProps}
                >
                  {submitter?.submitText ?? globalLocale.ok}
                </Button>
              </>
            )}
          </MsSubmitterContainer>
        }
        destroyOnClose={true}
        {...modalProps}
        // 由于 MsForm 中的 ModalForm 不支持 onCancel 异步，所以重写
        onCancel={async () => modalProps?.onCancel?.()}
      >
        <MsFormAnchor {...props} />

        <MsBaseForm
          {...props}
          form={form}
          loading={loading}
          setLoading={setLoading}
          onFinish={handleFinish}
        />
      </MsModal>
    </>
  );
}

export default MsModalForm;
