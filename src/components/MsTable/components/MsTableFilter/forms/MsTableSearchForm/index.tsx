import MsSearchForm from '@jaytam/antd-ms/components/MsForm/forms/MsSearchForm';
import { useMount } from 'ahooks';
import { Form } from 'antd';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import type { MsTableSearchFormProps } from './types';

const MsTableSearchForm = <P, R, D>(props: MsTableSearchFormProps<P, R, D>) => {
  const { form: formInstance, columns, extraProps = {}, ...formProps } = props;
  const { searchConfig, mountInitialValues } = extraProps;
  const [form] = Form.useForm(formInstance);

  const { searchFormColumns, hiddenFormColumns } = resolveFilterColumns(columns);

  useMount(() => {
    if (mountInitialValues) {
      form.setFieldsValue(mountInitialValues);
    }
  });

  return (
    <EditingActionController fullWidth>
      <MsSearchForm
        {...formProps}
        form={form}
        columns={searchFormColumns}
        hiddenColumns={hiddenFormColumns}
        style={searchConfig?.style}
        className={searchConfig?.className}
        column={searchConfig?.column}
        labelCol={{ flex: searchConfig?.labelWidth, ...formProps?.labelCol }}
        defaultCollapsed={searchConfig?.defaultCollapsed}
        disabledFieldCache
      />
    </EditingActionController>
  );
};

export default MsTableSearchForm;
