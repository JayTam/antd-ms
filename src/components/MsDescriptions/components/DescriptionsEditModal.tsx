import { Form } from 'antd';

import type { MsFormProps } from '../../MsForm';
import MsForm from '../../MsForm/forms/MsForm';
import MsModal from '../../MsModal';
import { deepMerge } from '@jaytam/antd-ms/utils';
import type { MsDescriptionsProps } from '../types';

type DescriptionsEditModalProps = Omit<MsFormProps, 'onFinish'> &
  Pick<MsDescriptionsProps<any, any, any>, 'onFinish'>;

/**
 * 弹窗编辑框，主要用于单项编辑
 */
const DescriptionsEditModal = MsModal.create((props: DescriptionsEditModalProps) => {
  const { modalProps, drawerProps, ...formProps } = props;
  const modal = MsModal.useModal();
  const [form] = Form.useForm();

  return (
    <MsForm
      {...formProps}
      column={1}
      form={form}
      formType="ModalForm"
      modalProps={{ ...modalProps, ...modal.props }}
      onFinish={async (values) => {
        const dataSource = formProps.initialValues ?? (formProps.dataSource as any) ?? {};
        await props.onFinish?.(values, deepMerge(dataSource, values));
        modal.resolve(form.getFieldsValue());
      }}
    />
  );
});

export default DescriptionsEditModal;
