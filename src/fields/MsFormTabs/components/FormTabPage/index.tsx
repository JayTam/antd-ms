import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import transformColumnsToSchema from '@jaytam/antd-ms/components/MsForm/utils/schema/transformColumnsToSchema';
import { SchemaRender } from '@jaytam/schema-render';

import type { FormListFieldData } from 'antd';
import { Form, Row } from 'antd';
import { isFunction } from 'lodash-es';
import type { FormTabsProps } from '../../types';
import { useLocale } from '@jaytam/antd-ms/locale';

type FormTabPageProps = {
  index: number;
  fieldItem: FormListFieldData;
  fields: FormListFieldData[];
  listProps: FormTabsProps;
};

function FormTabPage(props: FormTabPageProps) {
  const { fields, fieldItem, listProps = {}, index } = props;
  const {
    _columns: columns = [],
    _loading: loading = false,
    _formItemProps: formItemProps,
    _valuesNormal: valuesNormal,
    gutter = 20,
  } = listProps;
  const form = Form.useFormInstance();
  const { fullLocale } = useLocale();

  const formListName = formItemProps?.name;

  const listColumns = (
    isFunction(columns) ? columns(mergeNamePath(formListName, index), index) : columns
  ).map((item: any) => ({ ...item, _listNamePath: formListName }));

  const schema = transformColumnsToSchema(
    {
      columns: listColumns,
      columnNumber: 1,
      form,
      loading,
      basePathName: formListName,
      list: { key: fieldItem.key, index: index, fields },
      valuesNormal,
    },
    fullLocale,
  );

  return (
    <Row gutter={gutter}>
      <SchemaRender schema={schema} />
    </Row>
  );
}

export default FormTabPage;
