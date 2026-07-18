import type { MsFormColumns } from '@jaytam/antd-ms';
import { SELECT_VALUE_TYPES } from '@jaytam/antd-ms/components/MsForm/constants';
import { transformColumnsToSchema } from '@jaytam/antd-ms/components/MsForm/utils/schema';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { Form, Popconfirm } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import cs from 'classnames';
import { isNil, merge } from 'lodash-es';
import React from 'react';

import { useTableEditableContext } from '../../../contexts/editable';
import { useEditableRowContext } from '../../../contexts/editableRow';
import EditingActionController from '../EditingActionController';
import { cancelNewRowEditSymbol, isNewRowSymbol } from '../MsTableEditableContainer';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 重写表格Cell组件，用于支持编辑行功能
 * @param props
 * @returns
 */
function EditableCell(props: any) {
  const { column, record, index, ...restProps } = props;
  const form = Form.useFormInstance();
  const { editable: globalEditable, globalEditing, tableAreaRef } = useTableEditableContext();
  const { editing: rowEditing, setEditing: setRowEditing, loading } = useEditableRowContext();
  const { getPrefixCls } = React.useContext(ConfigContext);
  const { currentLocale, globalLocale, fullLocale } = useLocale('MsTable');
  // 是否可编辑
  const rowEditable = isNil(column) ? false : column?.editable ?? globalEditable;
  // 是否操作列
  const isActionColumn = column?.valueType === 'action';
  // 是否新增行
  const isNewRow = Boolean(record?.[isNewRowSymbol]);

  const editingActions = [
    {
      label: rowEditable?.saveText ?? globalLocale.save,
      loading,
      onClick: handleSubmit,
    },
    {
      label: (
        <Popconfirm title={currentLocale.confirmCancel} onConfirm={handleCancel}>
          {rowEditable?.cancelText ?? globalLocale.cancel}
        </Popconfirm>
      ),
    },
  ];

  const actionOperation = {
    startEdit: () => {
      if (globalEditing) {
        EditingActionController.warnEditing(fullLocale);
      } else {
        setRowEditing(true);
      }
    },
    editing: rowEditing,
    editingActions,
  };

  // 未开启编辑，常规化渲染列
  if (rowEditable === false) {
    return <td {...restProps}>{props.children}</td>;
  }

  // 提交
  function handleSubmit() {
    form.submit();
  }

  // 取消
  function handleCancel() {
    setRowEditing(false);
    form.resetFields();
    if (isNewRow) {
      record?.[cancelNewRowEditSymbol]?.();
    }
    globalEditable?.onCancel?.(record);
  }

  // 操作列
  if (isActionColumn) {
    return (
      <td {...restProps} className={cs('ms-table-edit-cell', restProps.className)}>
        {column.render(undefined, record, index, actionOperation)}
      </td>
    );
  }

  // 普通列，正在编辑状态
  if (rowEditing) {
    const columns: MsFormColumns = [
      merge(cloneDeepWithReactNode(column), {
        _colProps: (colProps: any) => {
          return { component: React.Fragment, key: colProps.key };
        },
        _formItemProps: (formItemProps: any) => {
          return { ...formItemProps, label: null };
        },
        _fieldProps: (fieldProps: any) => {
          if (SELECT_VALUE_TYPES.includes(column.valueType ?? 'text')) {
            return {
              ...fieldProps,
              getPopupContainer: (triggerNode: HTMLElement) =>
                tableAreaRef?.current ?? triggerNode.parentElement ?? document.body,
            };
          }
          return fieldProps;
        },
      }),
    ];

    const schema = transformColumnsToSchema(
      {
        columns,
        columnNumber: 1,
        form,
        loading: false,
      },
      fullLocale,
    );

    const prefixCls = getPrefixCls('table');

    // 剔除省略样式，会影响选择器组件弹出层
    const className = restProps.className.replace(prefixCls + '-cell-ellipsis', '');

    return (
      <td {...restProps} className={cs('ms-table-edit-cell', className)}>
        <SchemaRender schema={schema} />
      </td>
    );
  }

  // 普通列，未编辑状态
  return <td {...restProps}>{props.children}</td>;
}

export default EditableCell;
