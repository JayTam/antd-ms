import { deepMerge, isNamePathEqual } from '@jaytam/antd-ms/utils';
import { Form } from 'antd';
import classnames from 'classnames';
import { isNil, isObject, merge, omit } from 'lodash-es';
import { useImperativeHandle, useMemo } from 'react';

import MsDrawer from '../MsDrawer';
import MsBaseForm from '../MsForm/components/MsBaseForm';

import type { EditConfig } from '../MsForm/types';
import MsModal from '../MsModal';
import { MsPageContext } from '../MsPage/contexts/page';
import DescriptionsCardContainer from './components/DescriptionsCardContainer';
import DescriptionsEditDrawer from './components/DescriptionsEditDrawer';
import DescriptionsEditModal from './components/DescriptionsEditModal';
import { MsDescriptionsEditContext } from './contexts/edit';
import useDescriptionsRequest from './hooks/useDescriptionsRequest';

import './index.less';

import type { DefaultPostRes } from '../types';
import DescriptionTitle from './components/DescriptionTitle';
import type { MsDescriptionsColumns, MsDescriptionsColumnType, MsDescriptionsProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsDescriptions = <P, R, D = DefaultPostRes<R>>(props: MsDescriptionsProps<P, R, D>) => {
  const {
    title,
    titleType,
    titleColumn,
    columns = [],
    labelCol = { flex: '90px' },
    modalProps,
    drawerProps,
    request,
    actionRef,
    extra,
    divider,
    className,
    form: formInstance,
    editFormProps,
    ...formProps
  } = props;
  const [form] = Form.useForm(formInstance);
  const { globalLocale } = useLocale();

  const { inPage, loading, setLoading, refresh, refreshLoading, formActionRef } =
    useDescriptionsRequest(props);

  // 所有字段，包含标题字段
  const allColumns = useMemo(() => {
    const _columns = isNil(titleColumn) ? columns : [titleColumn, ...columns];
    return _columns.map((column) => {
      const editConfig = column?.editable;
      const formItemProps = isObject(editConfig)
        ? editConfig.formItemProps ?? column.formItemProps
        : column.formItemProps;
      const fieldProps = isObject(editConfig)
        ? editConfig.fieldProps ?? column.fieldProps
        : column.fieldProps;
      return {
        ...omit(column, 'colProps'),
        formItemProps,
        fieldProps,
        colSize: 1,
      };
    });
  }, [columns, titleColumn]);

  // 所有可编辑的字段
  const editableColumns = useMemo(
    () => allColumns.filter((column) => !!column.editable),
    [allColumns],
  );

  /**
   * 打开多项描述列表配置的编辑弹窗
   * @param columns 描述列表配置
   * @param editableConfig 编辑配置
   */
  const openColumnsEditor = <D,>(
    columns: MsDescriptionsColumns<D>,
    editableConfig?: EditConfig<D>,
  ) => {
    const initialValues = form.getFieldsValue();
    const { type = 'modal', submitter, onClick, onFinishSuccess } = editableConfig ?? {};
    const openTitle =
      columns.length === 1 ? (
        <>
          {globalLocale.edit}
          {columns[0].title}
        </>
      ) : (
        globalLocale.edit
      );

    const commonProps = {
      labelCol,
      ...formProps,
      ...editFormProps,
      title: openTitle,
      modalProps: merge(modalProps, editableConfig?.modalProps),
      drawerProps: merge(drawerProps, editableConfig?.drawerProps),
      submitter,
      initialValues,
      columns,
    };

    if (type === 'modal') {
      onClick?.();
      MsModal.open(DescriptionsEditModal, commonProps).then((values) => {
        form.setFieldsValue(values);
        refresh();
        onFinishSuccess?.();
      });
    }

    if (type === 'drawer') {
      onClick?.();
      MsDrawer.open(DescriptionsEditDrawer, commonProps).then((values) => {
        form.setFieldsValue(values);
        refresh();
        onFinishSuccess?.();
      });
    }
  };

  /**
   * 打开单项描述column的编辑弹窗
   * @param column 描述配置
   */
  const openSingleColumnEditor = (column: MsDescriptionsColumnType<D>) => {
    const editableConfig = isObject(column.editable) ? column.editable : {};
    const { openFields = [], openSelfField = true } = editableConfig;
    if (openSelfField) openFields.push(column.dataIndex);
    const openColumns = allColumns?.filter(({ dataIndex }) =>
      openFields.find((field) => isNamePathEqual(field, dataIndex)),
    );
    openColumnsEditor(openColumns, editableConfig);
  };

  useImperativeHandle(actionRef, () => ({
    // 打开弹窗
    openEditor: (config) => {
      const { openFields } = config ?? {};
      if (isNil(openFields)) {
        // 打开所有可编辑字段
        openColumnsEditor(editableColumns, config);
      } else {
        // 打开指定字段，column可不为editable
        const openColumns = allColumns?.filter(({ dataIndex }) =>
          openFields.find((field) => isNamePathEqual(field, dataIndex)),
        );
        openColumnsEditor(openColumns, config);
      }
    },
    // 刷新 request
    reload: (loading = false) => formActionRef.current?.reload(loading) as Promise<void>,
  }));

  return (
    <MsPageContext.Provider value={{ inPage, refresh }}>
      {/* 从单项字段上的编辑按钮打开 */}
      <MsDescriptionsEditContext.Provider value={{ openEditor: openSingleColumnEditor }}>
        <DescriptionsCardContainer {...props}>
          <div className={classnames('ms-descriptions', className)}>
            <MsBaseForm
              actionRef={formActionRef}
              form={form}
              titleRender={(initialValues) => (
                <DescriptionTitle
                  {...props}
                  initialValues={initialValues}
                  loading={loading}
                  refreshLoading={refreshLoading}
                  onRefresh={refresh}
                />
              )}
              labelCol={labelCol}
              colon={false}
              column={3}
              mode="read"
              {...formProps}
              onFinish={async (values: D) => {
                const dataSource = formProps.initialValues ?? (formProps.dataSource as any) ?? {};
                await formProps?.onFinish?.(values, deepMerge(dataSource, values));
              }}
              initialValues={formProps.initialValues ?? (formProps.dataSource as any)}
              columns={columns}
              loading={loading}
              setLoading={setLoading}
              request={request}
              requiredMark={false}
              contentClassName="ms-descriptions-content"
            />
          </div>
        </DescriptionsCardContainer>
      </MsDescriptionsEditContext.Provider>
    </MsPageContext.Provider>
  );
};

export default MsDescriptions;
