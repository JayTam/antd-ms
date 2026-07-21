import type { MsVerifyProps } from '@jaytam/antd-ms';
import MsModal from '@jaytam/antd-ms/components/MsModal';
import { Alert, Button, Form, Input, Row } from 'antd';
import type { Rule } from 'antd/es/form';
import { useCallback, useState } from 'react';
import { getRandomCode } from '../../utils';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

export const FormVerify = MsModal.create((props: MsVerifyProps) => {
  const {
    icon,
    desc,
    onCancel,
    onSuccess,
    keyword,
    placeholder,
    showIcon = true,
    modalProps = {},
    type = 'code',
    width = 448,
    title = '',
    iconType = 'warning',
  } = props;
  const { currentLocale } = useLocale('MsVerify');
  const [code, setCode] = useState(getRandomCode());
  const msg = type === 'code' ? placeholder || currentLocale.inputVerificationCode : placeholder;
  const modal = MsModal.useModal();
  const [form] = Form.useForm();

  // 切换验证码
  const changeCode = useCallback(() => {
    const code = getRandomCode();
    setCode(code);
  }, []);

  // 校验验证码
  const validateCode = (_rule: Rule, value: string) => {
    if (type === 'code') {
      if (value && value !== code) {
        return Promise.reject(currentLocale.inputRightVerificationCode);
      }
    } else {
      if (value && value !== keyword) {
        return Promise.reject(msg);
      }
    }
    return Promise.resolve();
  };

  // 确认提交
  const handleOk = async () => {
    await form.validateFields();
    await onSuccess?.();
  };

  const modalResetProps = { ...modal.props, ...modalProps };

  return (
    <MsModal
      {...modalResetProps}
      title={false}
      width={width}
      onCancel={onCancel}
      onOk={handleOk}
      className="ms-verify-modal"
    >
      <div className="ms-verify">
        {!!title && (
          <Alert
            icon={icon}
            type={iconType}
            message={title}
            showIcon={showIcon}
            className="ms-verify-alert"
            style={{ marginBottom: 15 }}
          />
        )}

        {!!desc && <div className="ms-verify-desc">{desc}</div>}

        <Form form={form} autoComplete="off" requiredMark={false} className="ms-verify-form">
          <Row>
            <Form.Item
              label={type === 'code' ? currentLocale.verificationCode : ''}
              name={type}
              getValueFromEvent={(res) => {
                return (res.target.value ?? '').trim();
              }}
              rules={[
                {
                  required: true,
                  message: msg,
                },
                {
                  validator: validateCode,
                },
              ]}
            >
              <Input width="100%" placeholder={msg} />
            </Form.Item>
            {type === 'code' && (
              <Button type="text" onClick={changeCode}>
                {code}
              </Button>
            )}
          </Row>
        </Form>
      </div>
    </MsModal>
  );
});
