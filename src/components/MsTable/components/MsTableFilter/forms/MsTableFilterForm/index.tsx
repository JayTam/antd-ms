import type { MsFormColumns } from '@jaytam/antd-ms';
import MsQueryForm from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm';
import useFilterNumber from '@jaytam/antd-ms/components/MsTable/hooks/useFilterNumber';
import { useMount } from 'ahooks';
import { Form } from 'antd';
import { useRef } from 'react';
import { needSubmitForm } from '../../../../utils';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import PopoverForm from './PopoverForm';
import type { PopoverFormActionType } from './PopoverForm/types';
import type { MsTableFilterFormProps } from './types';

function MsTableFilterForm<P, R, D>(props: MsTableFilterFormProps<P, R, D>) {
  const { columns = [], form: formInstance, extraProps = {}, initialValues, ...formProps } = props;
  const { searchConfig, mountInitialValues, query } = extraProps;
  const [form] = Form.useForm(formInstance);
  const { filterType = 'query' } = searchConfig ?? {};

  const actionRef = useRef<PopoverFormActionType>(null);

  const { searchColumns, searchFormColumns, hiddenFormColumns } = resolveFilterColumns(columns);

  // query 类型
  const queryColumns = searchColumns.filter((column) => {
    if (filterType === 'filter') {
      return column.showInQueryWhenFilter ?? column.showInQuery;
    }
    return true;
  }) as MsFormColumns<D>;

  /**
   * 针对MsQueryForm中的选择类组件值改变就触发表单提交
   * 注意大坑：antd中一个form绑定多个Form，只有最有一个Form才能触发onValuesChange
   */
  const handleValuesChange = (changedValues: any, values: any) => {
    if (needSubmitForm(queryColumns, changedValues, values)) {
      // 解决 formItemProps.rules 异常
      setTimeout(() => form.submit(), 0);
    }
  };

  const filterNum = useFilterNumber(searchFormColumns, query);

  useMount(() => {
    if (mountInitialValues) {
      form.setFieldsValue(mountInitialValues);
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <EditingActionController>
      <div ref={containerRef} className="ms-table-filter">
        <MsQueryForm
          {...formProps}
          form={form}
          columns={queryColumns}
          hiddenColumns={hiddenFormColumns}
          successNotify={false}
          // filter关闭query校验，由 filter 内表单校验
          isValidateForm={false}
          onValuesChange={handleValuesChange}
          // 关闭表单缓存，使用table的缓存
          disabledFieldCache
          searchConfig={searchConfig}
          mountInitialValues={mountInitialValues}
          onSearch={() => {
            form
              .validateFields()
              .then(() => {
                form.submit();
              })
              .catch(() => {
                // TODO: 判断是否 selectQuery 当前字段
                actionRef.current?.openEditor();
              });
          }}
          extraNodeList={[
            <PopoverForm
              key="filter"
              {...formProps}
              initialValues={initialValues}
              form={form}
              columns={searchFormColumns}
              filterNum={filterNum}
              searchConfig={searchConfig}
              actionRef={actionRef}
              getPopupContainer={(triggerNode) => containerRef.current ?? triggerNode}
              // 关闭表单缓存，使用table的缓存
              disabledFieldCache
              onValuesChange={handleValuesChange}
            />,
            searchConfig?.extraRender,
          ]}
        />
      </div>
    </EditingActionController>
  );
}

export default MsTableFilterForm;
