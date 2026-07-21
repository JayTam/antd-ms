import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { Form, Row } from 'antd';
import { isFunction, isNil, isUndefined, omit, pick } from 'lodash-es';
import { isValidElement, useMemo } from 'react';

import type { MsFormColumnType, MsTableColumnType } from '@jaytam/antd-ms';
import MsBaseForm from '@jaytam/antd-ms/components/MsForm/components/MsBaseForm';
import { SELECT_PLACEHOLDER_VALUE_TYPES } from '@jaytam/antd-ms/components/MsForm/constants';
import { transformColumnsToSchema } from '@jaytam/antd-ms/components/MsForm/utils/schema';
import { TABLE_SPACE } from '@jaytam/antd-ms/components/MsTable/constants';
import SelectQuery from './SelectQuery';
import type { MsQueryFormProps } from './types';
import cls from 'classnames';

import './index.less';
import useFormInitLoading from '../../hooks/useFormLoading';
import useFormSubmit from '../../hooks/useFormSubmit';
import { useLocale } from '@jaytam/antd-ms/locale';

/** 支持回车触发搜索的类型 */
const ENTER_SEARCH_TYPES = ['search', 'digit', 'number'];

/**
 * 是否为普通的输入框类型
 */
function isInputType(column: MsFormColumnType) {
  if (column.fieldRender) {
    return false;
  }
  if (column.fieldReadRender) {
    return false;
  }
  if (isNil(column.valueType)) {
    return true;
  }
  return ['text', 'textArea'].includes(column.valueType);
}

function MsQueryForm<P, R, D>(props: MsQueryFormProps<P, R, D>) {
  const {
    form: formInstance,
    columns = [],
    hiddenColumns = [],
    isValidateForm,
    searchConfig,
    mountInitialValues,
    defaultMergeInput = true,
    extraNodeList,
    extraNodeHiddenList,
  } = props;

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, handleFinish, handleSubmitNoThrottle } = useFormSubmit(props, form);
  const { fullLocale } = useLocale();

  // 选择类表单项
  const expendColumns = useMemo(() => {
    const newColumns = columns
      ?.filter((column: any) => {
        const isInput = isInputType(column);
        const isMergeInput = column.mergeInputIncludeQuery ?? defaultMergeInput;
        return !(isInput && isMergeInput);
      })
      ?.map((column) => {
        const newColumn = cloneDeepWithReactNode(column);
        if (isInputType(column)) {
          newColumn.valueType = 'search';
        }
        newColumn._colProps = (colProps) => pick(colProps, 'key', 'style');
        newColumn._formItemProps = (formItemProps) => ({
          ...formItemProps,
          label: (newColumn as MsTableColumnType).showLabelWhenQuery ? formItemProps.label : null,
        });
        newColumn._fieldProps = (handledFieldProps) => {
          // handledFieldProps 是经过处理之后的 fieldProps
          // originFieldProps 是用户提供的 fieldProps
          const originFieldProps = isFunction(column.fieldProps)
            ? (column.fieldProps(form) as Record<string, any>)
            : column.fieldProps ?? {};

          // extraFieldProps 是要修改的 fieldProps
          const extraFieldProps: Record<string, any> = {
            style: { minWidth: 140, ...handledFieldProps.style },
          };
          // query 不需要width=100%，删除在transform设置的默认值width=100%
          if (handledFieldProps?.style?.width === '100%') {
            handledFieldProps.style.width = undefined;
          }

          if (SELECT_PLACEHOLDER_VALUE_TYPES.includes(column.valueType ?? 'text')) {
            extraFieldProps.placeholder = originFieldProps.placeholder ?? column.title;
          }

          if (
            isUndefined(originFieldProps.onSearch) &&
            ENTER_SEARCH_TYPES.includes(newColumn.valueType ?? 'text')
          ) {
            extraFieldProps.onSearch = handleSubmitNoThrottle;
          }

          return { ...handledFieldProps, ...extraFieldProps };
        };
        return newColumn;
      });

    if (extraNodeList) {
      return [
        ...newColumns,
        ...extraNodeList
          .filter((expendNode) => !isNil(expendNode))
          .map((expendNode, index) => {
            return {
              fieldRender: isValidElement(expendNode) ? expendNode : <>{expendNode}</>,
              _colProps: (colProps: any) => ({
                ...omit(colProps, 'span'),
                style: {
                  display: extraNodeHiddenList?.[index] ? 'none' : colProps?.style?.display,
                },
              }),
              _formItemProps: (formItemProps: any) => ({
                ...formItemProps,
                label: null,
              }),
            };
          }),
      ];
    }

    return newColumns;
  }, [
    columns,
    defaultMergeInput,
    extraNodeHiddenList,
    extraNodeList,
    form,
    handleSubmitNoThrottle,
  ]);

  // 输入类表单项
  const mergedColumns = useMemo(() => {
    return columns
      .filter(isInputType)
      .filter((column: any) => column.mergeInputIncludeQuery ?? defaultMergeInput);
  }, [columns, defaultMergeInput]);

  return (
    <>
      <MsBaseForm
        {...props}
        className={cls('ms-query-form', props.className ?? searchConfig?.className)}
        style={props.style ?? searchConfig?.style}
        labelCol={{}}
        form={form}
        loading={loading}
        setLoading={setLoading}
        onFinish={handleFinish}
        successNotify={false}
        formRender={
          <Row gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}>
            {/* 聚合输入器 */}
            {mergedColumns.length > 0 ? (
              <SelectQuery
                loading={submitLoading}
                isValidateForm={isValidateForm}
                columns={mergedColumns}
                mountInitialValues={mountInitialValues}
                searchConfig={searchConfig}
              />
            ) : null}

            <SchemaRender
              schema={transformColumnsToSchema(
                {
                  columnNumber: 1,
                  columns: expendColumns,
                  loading,
                  form,
                },
                fullLocale,
              )}
            />
            <SchemaRender
              schema={transformColumnsToSchema(
                {
                  columnNumber: 1,
                  columns: hiddenColumns,
                  loading,
                  form,
                },
                fullLocale,
              )}
            />
          </Row>
        }
      />
    </>
  );
}

export default MsQueryForm;
