import { Form } from 'antd';
import MsDrawer from '../../MsDrawer';
import type { MsFormProps } from '../../MsForm';
import { deepMerge } from '@jaytam/antd-ms/utils';

import MsForm from '../../MsForm/forms/MsForm';
import type { MsDescriptionsProps } from '../types';

type DescriptionsEditDrawerProps = Omit<MsFormProps, 'onFinish'> &
  Pick<MsDescriptionsProps<any, any, any>, 'onFinish'>;

/**
 * 弹窗编辑抽屉，主要用于所有字段编辑
 */
const DescriptionsEditDrawer = MsDrawer.create((props: DescriptionsEditDrawerProps) => {
  const { drawerProps, modalProps, ...formProps } = props;
  const [form] = Form.useForm();
  const drawer = MsDrawer.useDrawer();

  return (
    <MsForm
      {...formProps}
      column={1}
      form={form}
      formType="DrawerForm"
      drawerProps={{ ...drawerProps, ...drawer.props }}
      onFinish={async (values: any) => {
        const dataSource = formProps.initialValues ?? (formProps.dataSource as any) ?? {};
        await props.onFinish?.(values, deepMerge(dataSource, values));
        drawer.resolve(form.getFieldsValue());
      }}
    />
  );
});

export default DescriptionsEditDrawer;
