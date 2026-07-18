import { Form } from 'antd';

import { merge } from 'lodash-es';
import type { MsFormProps } from '../../MsForm';
import MsForm from '../../MsForm';
import MsModal from '../../MsModal';

type InstanceEditModalProps = MsFormProps & {
  onClose?: () => void;
};

/**
 * 弹窗编辑框，主要用于单项编辑
 */
const InstanceEditModal = MsModal.create((props: InstanceEditModalProps) => {
  const { modalProps } = props;
  const [form] = Form.useForm();
  const modal = MsModal.useModal();

  const handleFinish = async (values: any) => {
    await props.onFinish?.(values);
    modal.resolve(form.getFieldsValue());
  };

  return (
    <MsForm
      {...props}
      column={1}
      form={form}
      formType="ModalForm"
      modalProps={merge(modal.props, modalProps)}
      onFinish={handleFinish}
    />
  );
});

export default InstanceEditModal;
