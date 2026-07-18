import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import { Col, Form, Table } from 'antd';
import { isArray, isFunction, isNil, isObject } from 'lodash-es';
import { useComposeRef } from 'rc-util/lib/ref';
import React, { useRef } from 'react';

import type { NamePath } from 'antd/es/form/interface';
import type { ColumnType } from 'antd/es/table';
import FormListActions from '../MsFormList/components/FormListActions';
import FormListAddButton from '../MsFormList/components/FormListAddButton';
import FormListWrapper from '../MsFormList/components/FormListWrapper';
import EditableCell from './components/EditableCell';
import TableHeaderWrapper from './components/TableHeaderWrapper';
import TableTitle from './components/TableTitle';
import cls from 'classnames';
import './index.less';

import type { FormTableProps } from './types';
import { MsFormTableContext } from './context';
import { useLocale } from '@jaytam/antd-ms/locale';

type TableColumns = ColumnType<any>[];

/**
 * formTable 结合了 Form.List 和 Table 组件，其基本实现思路如下：
 *
 * 1. 使用 fields 数据生成 columns 配置。
 * 2. 将生成的 columns 和 fields 分别作为 Table 组件的 columns 和 dataSource 属性：
 *    <Table columns={columns} dataSource={fields} />
 *
 * 关于如何在 columns 中表达不同的行（即不同单元格的行为）：
 *
 * - 通过 onCell 函数可以根据当前行的数据动态设置每个单元格（cell）的属性。这使得每个 cell 的显示和行为可以根据具体需求进行定制。
 * - EditableCell 组件用于重写默认的 cell 渲染逻辑，将其转换为可编辑的表单项。
 */
const FormTable = React.forwardRef<HTMLDivElement, FormTableProps>((props, ref) => {
  const { globalLocale } = useLocale();
  const {
    actions = ['del'],
    indexTitle = globalLocale.orderNum,
    indexRender,
    indexWidth,
    indexColumn,
    actionsWidth,
    actionsColumn,
    tableProps,
    addButtonPosition = 'bottom',
    hideAddButton,
    _columns = [],
    _formItemProps: formItemProps,
  } = props;

  const tableRef = useRef<HTMLDivElement>(null);
  const composeRef = useComposeRef(ref, tableRef);

  /**
   * 关于 _columns([], 0) 的使用说明：
   *
   * 我们通过调用 _columns([], 0) 来初始化 columns。这里可能看起来像是牺牲了动态性，但实际上：
   * - columns 包含两部分：TableColumns 和 MsFormColumns。
   * - TableColumns 部分的设计并不需要额外的动态性，因为它已经通过诸如 onCell, title 等函数实现了必要的动态行为。
   * - 对于 MsFormColumns，尽管初始调用 _columns([], 0) 提供了一个静态起点，但在后续过程中，我们通过重写 onCell 函数来实现所需的动态化。
   *
   * 综上所述，虽然初始调用 _columns([], 0) 可能显得缺乏动态性，但结合整个配置和后续处理逻辑，它实际上满足了设计需求并支持了必要的灵活性。
   */
  const columns = (isFunction(_columns) ? _columns([], 0) : _columns).filter((column) => {
    if (isNil(column.hideInForm)) return true;
    // 这里不处理 column.hideInForm 为函数的情况，由 EditableCell 来实现动态化
    if (isFunction(column.hideInForm)) return true;
    return !column.hideInForm;
  });

  return (
    <FormListWrapper {...props}>
      {(fields, operation, { errors }, action) => {
        /**
         * 表单列
         */
        const formColumns: TableColumns = columns.map((column, colIndex) => ({
          ...column,
          ellipsis: true,
          title: <TableTitle column={column} />,
          onCell: (record, rowIndex) => {
            if (isNil(rowIndex)) return {};

            // 重点：动态生成的当前 cell 的 column
            const rowColumns = (
              isFunction(_columns)
                ? _columns(mergeNamePath(formItemProps?.name, rowIndex), rowIndex)
                : _columns
            ).filter((column) => {
              if (isNil(column.hideInForm)) return true;
              // 这里不处理 column.hideInForm 为函数的情况，由 EditableCell 来实现动态化
              if (isFunction(column.hideInForm)) return true;
              return !(column.hideInForm === true);
            }) as TableColumns;

            const cellColumn = rowColumns[colIndex];

            // 提供给 EditableCell 组件的参数，用于生成单个 cell 的 schema 表单项
            const cellProps = {
              index: rowIndex,
              column: cellColumn,
              list: { key: rowIndex, index: rowIndex, fields },
              valign: 'top',
            };

            // 重写 onCell 方法
            if (isFunction(cellColumn?.onCell)) {
              const resetCellProps = cellColumn?.onCell(record, rowIndex);
              if (isObject(resetCellProps)) {
                return {
                  ...cellProps,
                  ...resetCellProps,
                };
              }
            }
            return cellProps;
          },
        }));

        /**
         * 索引列
         */
        const indexColumns: TableColumns = isFunction(indexRender)
          ? [
              {
                title: indexTitle,
                width: indexWidth,
                render: (value, record, index) => (
                  <div
                    className="form-table-order-cell"
                    style={{ display: 'flex', alignItems: 'center', height: 32 }}
                  >
                    {indexRender(index)}
                  </div>
                ),
                onCell: () => ({ valign: 'top' }),
                ...indexColumn,
              },
            ]
          : [];

        /**
         * 操作列
         */
        const actionColumns: TableColumns =
          isArray(actions) && actions.length > 0
            ? [
                {
                  width: actionsWidth,
                  title: globalLocale.operate,
                  onCell: () => ({ valign: 'top' }),
                  render: (value, record, index) => {
                    return (
                      <Col span={24} className="form-table-action-cell">
                        <FormListActions
                          index={index}
                          fields={fields}
                          operation={operation}
                          listProps={props}
                          action={action}
                        />
                      </Col>
                    );
                  },
                  ...actionsColumn,
                },
              ]
            : [];

        /**
         * 合并成表格列
         */
        const tableColumns = [...indexColumns, ...formColumns, ...actionColumns];

        return (
          <div
            ref={composeRef}
            className={cls('ms-form-table', {
              'hide-bottom-border': hideAddButton || addButtonPosition === 'top',
            })}
          >
            <MsFormTableContext.Provider value={{ popupMountRef: tableRef, inContext: true }}>
              <Table
                components={{
                  body: { cell: EditableCell },
                  header: {
                    wrapper: (wrapperProps: any) => {
                      // 如果操作按钮上有 add ，则隐藏新增按钮
                      const existAddButton = actions.findIndex((action) => action === 'add') > -1;
                      if (existAddButton || hideAddButton || addButtonPosition !== 'top') {
                        return <TableHeaderWrapper {...wrapperProps} />;
                      }

                      return (
                        <TableHeaderWrapper
                          {...wrapperProps}
                          columnNum={tableColumns.length}
                          topRender={
                            addButtonPosition === 'top' ? (
                              <FormListAddButton
                                fields={fields}
                                listProps={props}
                                action={action}
                              />
                            ) : undefined
                          }
                        />
                      );
                    },
                  },
                }}
                pagination={false}
                {...tableProps}
                rowKey="name"
                columns={tableColumns}
                dataSource={fields}
                footer={
                  addButtonPosition === 'bottom'
                    ? () => <FormListAddButton fields={fields} listProps={props} action={action} />
                    : undefined
                }
              />
              <Form.ErrorList errors={errors} />
            </MsFormTableContext.Provider>
          </div>
        );
      }}
    </FormListWrapper>
  );
});

export default FormTable;
