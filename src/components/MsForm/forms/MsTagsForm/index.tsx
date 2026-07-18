import { EditingActionController } from '@jaytam/antd-ms/components/MsTable/components/MsTableEditable';
import { TABLE_SPACE } from '@jaytam/antd-ms/components/MsTable/constants';
import useFilterNumber from '@jaytam/antd-ms/components/MsTable/hooks/useFilterNumber';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { Form, Row } from 'antd';
import { get, isNil, omit, pick } from 'lodash-es';
import { useMemo } from 'react';
import MsBaseForm from '../../components/MsBaseForm';
import { transformColumnsToSchema } from '../../utils/schema';
import { isRequired } from '../../utils/validate';
import TagsField from './TagsField';
import './index.less';
import type { MsTagsFormProps } from './types';

import React from 'react';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 筛选标签表单
 * @param props
 * @returns
 */
function MsTagsForm<P, R, D>(props: MsTagsFormProps<P, R, D>) {
  const { form: formInstance, columns = [], query, onClear, onDelete } = props;
  const [form] = Form.useForm(formInstance);

  const { globalLocale, fullLocale } = useLocale();

  /** 后续处理的中间变量 */
  const list = cloneDeepWithReactNode(columns).map((column) => {
    const newColumn = omit(cloneDeepWithReactNode(column), [
      'ellipsis',
      'editable',
      'copyable',
      'actions',
    ]);

    newColumn._colProps = (colProps) => {
      // @ts-ignore MsTable Column 的属性，开启 splitFilterTags 不再套一层 Col
      if (newColumn.splitFilterTags) {
        return { ...pick(colProps, 'key'), component: React.Fragment };
      }
      return { ...pick(colProps, 'key') };
    };
    newColumn._formItemProps = (formItemProps) => ({ ...formItemProps, noStyle: true });

    const hideCloseIcon = isRequired(column, form);

    return {
      column: {
        ...newColumn,
        // 如果没有值，则隐藏筛选标签
        hideInForm: isNil(get(query, newColumn?.dataIndex ?? [])),
        // 纯 field 渲染，不需要额外嵌套的
        plainReadField: true,
        fieldReadRender: (
          <TagsField
            {...newColumn}
            query={query}
            columns={columns}
            form={form}
            onDelete={onDelete}
            hideCloseIcon={hideCloseIcon}
          />
        ),
      },
      hideCloseIcon,
    };
  });

  /** 筛选标签的表单项 */
  const tagsColumns = list.map((item) => item.column);

  /** 隐藏清空按钮 */
  const hideCleanBtn = useMemo(
    () => list.filter((item) => !item.column.hideInForm).every((item) => item.hideCloseIcon),
    [list],
  );

  /** 正在筛选的数量 */
  const currentFilterNum = useFilterNumber(tagsColumns, query);

  /**
   * 清空筛选标签，必选不清空
   */
  function handleClear() {
    onClear?.();
  }
  const schema = transformColumnsToSchema(
    {
      columnNumber: 1,
      columns: tagsColumns,
      loading: false,
      form,
    },
    fullLocale,
  );

  const clearSchema = {
    key: '_clear',
    component: 'col',
    children: {
      component: 'a',
      className: 'ms-tags-form-btn',
      onClick: handleClear,
      children: globalLocale.clear,
    },
  };

  if (currentFilterNum <= 0) {
    return <></>;
  }

  return (
    <div className="ms-tags-form">
      <EditingActionController wrapperDisplay="inline-block">
        <MsBaseForm
          {...props}
          request={undefined}
          // 注意：表单的实际状态是 query，不能绑定 form
          form={undefined}
          columns={columns}
          formRender={
            <Row gutter={[TABLE_SPACE / 4, TABLE_SPACE / 4]}>
              <SchemaRender schema={hideCleanBtn ? schema : [...schema, clearSchema]} />
            </Row>
          }
          mode="read"
          successNotify={false}
          loading={false}
          colon={false}
          labelCol={{ flex: undefined }}
          setLoading={() => {}}
          enumLoadingType="tags"
        />
      </EditingActionController>
    </div>
  );
}

export default MsTagsForm;
