import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import transformColumnsToSchema from '@jaytam/antd-ms/components/MsForm/utils/schema/transformColumnsToSchema';
import { SchemaRender } from '@jaytam/schema-render';

import type { FormListFieldData } from 'antd';
import { Form } from 'antd';
import { isFunction } from 'lodash-es';
import type { FormListProps } from '../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type FormListRowFormProps = {
  index: number;
  fieldItem: FormListFieldData;
  fields: FormListFieldData[];
  listProps: FormListProps;
};

function FormListRow(props: FormListRowFormProps) {
  const { fields, fieldItem, listProps = {}, index } = props;
  const {
    _columns: columns = [],
    _loading: loading = false,
    _formItemProps: formItemProps,
    _valuesNormal: valuesNormal,
  } = listProps;

  const form = Form.useFormInstance();
  const { fullLocale } = useLocale();

  const formListName = formItemProps?.name;

  const listColumns = isFunction(columns)
    ? columns(mergeNamePath(formListName, index), index)
    : columns;

  const schema = transformColumnsToSchema(
    {
      columns: listColumns.map((item: any) => ({
        ...item,
        _listNamePath: formListName,
      })),
      columnNumber: listColumns.length,
      form,
      loading: loading,
      basePathName: formListName,
      list: { key: fieldItem.key, index: index, fields },
      valuesNormal,
    },
    fullLocale,
  );

  return <SchemaRender schema={schema} />;
}

/**
 * 性能优化：当移动时，避免整个 list 重新渲染，只渲染变化的两列
 * 该优化方案存在问题，暂时弃用，待后续解决，formList 和 formTable 都存在该问题。
 * 当存在依赖时，column.params为函数，要访问异步数据，因为 fieldItem.name 未变化，导致组件无法更新
 *
 */
// export default memo(
//   FormListRow,
//   (prevProps, nextProps) => prevProps.fieldItem.name === nextProps.fieldItem.name,
// );

export default FormListRow;
