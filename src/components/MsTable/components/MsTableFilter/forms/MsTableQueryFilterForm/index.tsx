import type { MsFormColumns } from '@jaytam/antd-ms';
import MsQueryForm from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm';
import useFilterNumber from '@jaytam/antd-ms/components/MsTable/hooks/useFilterNumber';
import { needSubmitForm } from '@jaytam/antd-ms/components/MsTable/utils';
import { useMount } from 'ahooks';
import { Form } from 'antd';
import { isFunction } from 'lodash-es';
import { useMemo, useRef } from 'react';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import PopoverForm from '../MsTableFilterForm/PopoverForm';
import type { PopoverFormActionType } from '../MsTableFilterForm/PopoverForm/types';
import type { MsTableQueryFilterFormProps } from './types';

function MsTableQueryFilterForm<P, R, D>(props: MsTableQueryFilterFormProps<P, R, D>) {
  const { columns = [], form: formInstance, extraProps = {}, initialValues, ...formProps } = props;
  const { searchConfig, mountInitialValues, query } = extraProps;
  const [form] = Form.useForm(formInstance);

  /** 在筛选区域展示的数量 */
  const QUERY_LIMIT = searchConfig?.showNumberInQueryFilter ?? 3;

  const actionRef = useRef<PopoverFormActionType>(null);

  /** 动态化过滤，如果是静态过滤则 column.hideInForm 功能失效，如果不考虑 column.hideInForm 则query区域展示的个数是错误的 */
  const hiddenColumns = columns.filter(
    (column) => !(isFunction(column.hideInForm) ? column.hideInForm?.(form) : column.hideInForm),
  );
  const { searchColumns, hiddenFormColumns } = resolveFilterColumns(hiddenColumns);

  const { queryColumns, allColumns, filterColumns } = useMemo(() => {
    // 分成两部分，能看到的和不能看到的，不能看到（search=false, filters=true）
    const showColumns = searchColumns.filter((column) => column.search);
    const hideColumns = searchColumns.filter((column) => !column.search);

    // 合并输入项
    const mergeInputColumns = showColumns.filter(
      ({ valueType = 'text', mergeInputIncludeQuery = false }) =>
        valueType === 'text' && mergeInputIncludeQuery,
    );

    const queryLength =
      QUERY_LIMIT + (mergeInputColumns.length === 0 ? 0 : mergeInputColumns.length - 1);

    // query 类型，前三个
    const queryColumns = showColumns.filter(
      (column, index) => index < queryLength,
    ) as MsFormColumns<D>;

    // filter 类型，除前三个之外
    const filterColumns = showColumns.filter(
      (_, index) => index >= queryLength,
    ) as MsFormColumns<D>;

    // 所有筛选 columns
    const allColumns = [
      ...queryColumns.map((column) => ({ ...column, colProps: { style: { display: 'none' } } })),
      ...filterColumns,
      ...hideColumns,
    ] as MsFormColumns<D>;

    return { queryColumns, allColumns, filterColumns };
  }, [QUERY_LIMIT, searchColumns]);

  const filterNum = useFilterNumber(filterColumns, query);

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

  // 是否隐藏高级（popover）筛选器
  const isHiddenPopoverFilter = filterColumns.length === 0;

  const containerRef = useRef<HTMLDivElement>(null);

  const PopoverFormNode = (
    <PopoverForm
      key="filter"
      {...formProps}
      initialValues={initialValues}
      form={form}
      columns={allColumns}
      filterNum={filterNum}
      searchConfig={searchConfig}
      actionRef={actionRef}
      getPopupContainer={(triggerNode) => containerRef.current ?? triggerNode}
      // 关闭表单缓存，使用table的缓存
      disabledFieldCache
      onValuesChange={handleValuesChange}
    />
  );

  return (
    <EditingActionController>
      <div ref={containerRef} className="ms-table-query-filter">
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
          onSearch={() => form.submit()}
          extraNodeList={[PopoverFormNode, searchConfig?.extraRender]}
          extraNodeHiddenList={[isHiddenPopoverFilter]}
        />
      </div>
    </EditingActionController>
  );
}

export default MsTableQueryFilterForm;
