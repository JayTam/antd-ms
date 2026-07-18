import { transformColumnsToSchema } from '@jaytam/antd-ms/components/MsForm/utils/schema';
import { omitEmptyDeep, omitNilDeep, omitPrivateDeep, trimValuesDeep } from '@jaytam/antd-ms/utils';
import { SchemaRender, setComponents } from '@jaytam/schema-render';

import type { FormProps } from 'antd';
import { Form, notification, Row } from 'antd';
import cls from 'classnames';
import { isFunction, omit } from 'lodash-es';
import { useImperativeHandle } from 'react';
import useFormRequest from '../../hooks/useFormRequest';
import { transformPrimitiveType } from '../../utils/submitValues';

import './index.less';

import type { MsBaseFormProps } from './types';

import config from '../../../MsField/config';
import MsFormProvider from './components/MsFormProvider';
import MsFormModeProvider from './components/MsFormModeProvider';
import MsFormValueEnumProvider from './components/MsFormValueEnumProvider';
import { useMsFormContext } from '../../contexts/form';
import { useMsFormColumnContext } from '../../contexts/column';
import { scrollToError } from '../../utils/scollError';
import { useLocale } from '@jaytam/antd-ms/locale';
setComponents(config);

export type { MsBaseFormProps };

// 需要剔除的字段，所有 MsFormProps 的属性都需要剔除
const omitPropsKeys = [
  'initialValues',
  'columns',
  'submitter',
  'onFinish',
  'onSubmit',
  'onReset',
  'omitNilValues',
  'omitEmptyValues',
  'omitPrivateValues',
  'trimValues',
  'noCard',
  'formType',
  'title',
  'width',
  'request',
  'params',
  'postRes',
  'debounceTime',
  'refreshOnWindowFocus',
  'column',
  'steps',
  'successNotify',
  'successNotifyProps',
  'modalProps',
  'drawerProps',
  'stepsProps',
  'trigger',
  'open',
  'onClose',
  'titleRender',
  'formRender',
  'footerRender',
  'loading',
  'setLoading',
  'submitLoading',
  'setSubmitLoading',
  'dataSource',
  'disabledFieldCache',
  'isValidateForm',
  'onSearch',
  'onClear',
  'searchConfig',
  'mountInitialValues',
  'defaultCollapsed',
  'defaultMergeInput',
  'onCollapsed',
  'extraNodeList',
  'extraNodeHiddenList',
  'hiddenColumns',
  'valuesNormal',
  'scrollToFirstError',
];

function MsBaseFormContent<P, R, D>(props: MsBaseFormProps<P, R, D>) {
  const {
    form: formInstance,
    columns = [],
    onFinish,
    onFinishFailed,
    titleRender,
    footerRender,
    formRender,
    labelCol = { flex: '80px' },
    column: columnNumber = 1,
    omitNilValues = true,
    omitPrivateValues = true,
    trimValues = true,
    omitEmptyValues = false,
    successNotify = true,
    successNotifyProps,
    layout,
    mode,
    actionRef,
    contentRef,
    contentClassName,
    hideFormRenderRow = false,
    enumLoadingType,
    emptyText,
    rowProps = { gutter: 32 },
    valuesNormal,
    scrollToFirstError = true,
    ...formProps
  } = props;

  const [form] = Form.useForm(formInstance);
  const { openColumnSet } = useMsFormColumnContext();
  const { currentLocale, fullLocale } = useLocale('MsForm');
  // 远程获取初始值
  const { loading, initialValues, runAsync } = useFormRequest({ ...props, form });
  const formContext = useMsFormContext();

  /**
   * 转换 onFinish 提交值
   * @param values
   * @returns
   */
  const transformValues = (values: any): any => {
    const values1 = trimValues ? trimValuesDeep(values) : values;
    const values2 = omitNilValues ? omitNilDeep(values1) : values1;
    const values3 = omitEmptyValues ? omitEmptyDeep(values2) : values2;
    const values4 = omitPrivateValues ? omitPrivateDeep(values3) : values3;
    return transformPrimitiveType(values4, columns);
  };

  /**
   * 表单提交
   * @param values
   */
  const handleFinish = async (values: any) => {
    await onFinish?.(transformValues(values));
    if (successNotify) {
      notification.success(successNotifyProps ?? { message: currentLocale.operateSuccess });
    }
  };

  /**
   * 表单校验失败
   * @param param0
   */
  const handleFinishFailed: FormProps<D>['onFinishFailed'] = (error) => {
    const { values, ...rest } = error;

    // 校验错误时，展开所有 collapse 组件
    formContext?.openAllCollapse();

    // 滚动到第一个错误字段
    scrollToError({ error, form, columns, scrollToFirstError });

    onFinishFailed?.({ values: transformValues(values), ...rest });
  };

  useImperativeHandle(actionRef, () => ({
    openColumnSet,
    reload: (loading) =>
      runAsync(loading).then(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              form?.resetFields();
              resolve();
            }, 0);
          }),
      ),
    openAllCollapse: formContext.openAllCollapse,
    closeAllCollapse: formContext.closeAllCollapse,
  }));
  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout={layout}
      labelCol={layout === 'vertical' ? undefined : labelCol}
      labelAlign="left"
      colon={false}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      {...(omit(formProps, omitPropsKeys) as any)}
    >
      {/* 标题 */}
      {isFunction(titleRender) ? titleRender(initialValues) : titleRender}

      {/* 表单项 */}
      <>
        {formRender ? (
          formRender
        ) : hideFormRenderRow ? (
          <SchemaRender
            schema={transformColumnsToSchema(
              {
                columns,
                form,
                columnNumber,
                loading,
                valuesNormal,
              },
              fullLocale,
            )}
          />
        ) : (
          <Row {...rowProps} ref={contentRef} className={cls(contentClassName, rowProps.className)}>
            <SchemaRender
              schema={transformColumnsToSchema(
                {
                  columns,
                  form,
                  columnNumber,
                  loading,
                  valuesNormal,
                },
                fullLocale,
              )}
            />
          </Row>
        )}
      </>

      {/* 自定义 children */}
      {formProps.children}

      {/* 提交 */}
      {footerRender}

      {/* 浏览器兼容：规避当只有一个输入框时，回车会额外触发表单提交 */}
      <input style={{ display: 'none' }} />
    </Form>
  );
}

export default function <P, R, D>(props: MsBaseFormProps<P, R, D>) {
  return (
    <MsFormProvider {...props}>
      <MsFormValueEnumProvider {...props}>
        <MsFormModeProvider {...props}>
          <MsBaseFormContent {...props} />
        </MsFormModeProvider>
      </MsFormValueEnumProvider>
    </MsFormProvider>
  );
}
