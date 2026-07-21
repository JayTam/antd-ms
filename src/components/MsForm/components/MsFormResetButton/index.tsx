import { Button, Form, Popconfirm } from 'antd';
import type { MsFormProps } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsFormResetButton<P, R, D>(props: MsFormProps<P, R, D>) {
  const { form: formInstance, loading, submitter } = props;
  const { globalLocale } = useLocale();

  const form = Form.useFormInstance() ?? formInstance;

  // 点击确认的回调
  const onConfirm = () => {
    form.resetFields();
    submitter?.resetBtnConfirmProps?.onConfirm?.();
  };

  if (!submitter?.resetBtnConfirmProps) {
    return (
      <Button onClick={() => form.resetFields()} loading={loading} {...submitter?.resetBtnProps}>
        {submitter?.resetText ?? globalLocale.reset}
      </Button>
    );
  }

  return (
    <Popconfirm
      okText={globalLocale.ok}
      cancelText={globalLocale.cancel}
      {...submitter?.resetBtnConfirmProps}
      onConfirm={onConfirm}
    >
      <Button loading={loading} {...submitter?.resetBtnProps}>
        {submitter?.resetText ?? globalLocale.reset}
      </Button>
    </Popconfirm>
  );
}

export default MsFormResetButton;
