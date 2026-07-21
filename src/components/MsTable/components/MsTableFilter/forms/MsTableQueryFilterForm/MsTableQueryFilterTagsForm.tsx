import type { MsFormColumns, MsTableProps } from '@jaytam/antd-ms';
import MsTagsForm from '@jaytam/antd-ms/components/MsForm/forms/MsTagsForm';
import type { MsQueryFormProps } from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm/types';
import { needSubmitForm } from '@jaytam/antd-ms/components/MsTable/utils';
import { useMount } from 'ahooks';
import { Form } from 'antd';
import { useMemo } from 'react';
import type { MsTableFormExtraProps } from '../../types';
import { resolveFilterColumns } from '../../utils';

type MsTableQueryFilterTagsFormProps<P, R, D> = Omit<MsQueryFormProps<P, R, D>, 'columns'> & {
  columns?: MsTableProps<P, R, D>['columns'];
  extraProps?: MsTableFormExtraProps<P, R, D>;
};

function MsTableQueryFilterTagsForm<P, R, D>(props: MsTableQueryFilterTagsFormProps<P, R, D>) {
  const { form: formInstance, columns = [], extraProps = {}, ...formProps } = props;
  const { searchConfig, mountInitialValues, query } = extraProps;

  const [form] = Form.useForm(formInstance);

  // 在筛选区域展示的数量
  const QUERY_LIMIT = searchConfig?.showNumberInQueryFilter ?? 3;

  const { searchColumns, searchFormColumns, onlyFilterFormColumns } = resolveFilterColumns(columns);

  // query 类型，前三个
  const queryColumns = useMemo(() => {
    // 合并输入项
    const mergeInputColumns = searchColumns.filter(
      ({ valueType = 'text', mergeInputIncludeQuery = false }) =>
        valueType === 'text' && mergeInputIncludeQuery,
    );

    const queryLength =
      mergeInputColumns.length === 0 ? QUERY_LIMIT : QUERY_LIMIT + mergeInputColumns.length - 1;

    return searchColumns.filter((column, index) => index < queryLength) as MsFormColumns;
  }, [QUERY_LIMIT, searchColumns]);

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

  useMount(() => {
    if (mountInitialValues) {
      form.setFieldsValue(mountInitialValues);
    }
  });

  return (
    <MsTagsForm
      {...formProps}
      form={form}
      initialValues={undefined}
      component={false}
      columns={[...searchFormColumns, ...onlyFilterFormColumns]}
      successNotify={false}
      onValuesChange={handleValuesChange}
      // 关闭表单缓存，使用table的缓存
      disabledFieldCache
      searchConfig={searchConfig}
      query={query}
    />
  );
}

export default MsTableQueryFilterTagsForm;
