import MsQueryForm from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm';
import { needSubmitForm } from '@jaytam/antd-ms/components/MsTable/utils';
import { useMount } from 'ahooks';
import { Form } from 'antd';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import type { MsTableQueryFormProps } from './types';

function MsTableQueryForm<P, R, D>(props: MsTableQueryFormProps<P, R, D>) {
  const { form: formInstance, columns = [], extraProps = {}, ...formProps } = props;
  const { searchConfig, mountInitialValues } = extraProps;

  const [form] = Form.useForm(formInstance);

  const { searchFormColumns, hiddenFormColumns } = resolveFilterColumns(columns);

  /**
   * 针对MsQueryForm中的选择类组件值改变就触发表单提交
   * 注意大坑：antd中一个form绑定多个Form，只有最有一个Form才能触发onValuesChange
   */
  const handleValuesChange = (changedValues: any, values: any) => {
    if (needSubmitForm(searchFormColumns, changedValues, values)) {
      // 解决 formItemProps.rules 异常
      setTimeout(() => form.submit(), 0);
    }
  };

  useMount(() => {
    if (mountInitialValues) {
      form.setFieldsValue(mountInitialValues);
    }
  });

  return (
    <EditingActionController>
      <MsQueryForm
        {...formProps}
        form={form}
        columns={searchFormColumns}
        hiddenColumns={hiddenFormColumns}
        successNotify={false}
        onValuesChange={handleValuesChange}
        // 关闭表单缓存，使用table的缓存
        disabledFieldCache
        searchConfig={searchConfig}
        mountInitialValues={mountInitialValues}
      />
    </EditingActionController>
  );
}

export default MsTableQueryForm;
