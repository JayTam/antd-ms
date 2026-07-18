import type { MsFormColumns } from '@jaytam/antd-ms';
import { RESOURCE_TAGS_VALUE_TYPES } from '@jaytam/antd-ms/components/MsForm/constants';
import MsAdvanceForm from '@jaytam/antd-ms/components/MsForm/forms/MsAdvanceForm';
import MsAggrForm from '@jaytam/antd-ms/components/MsForm/forms/MsAggrForm';
import MsTagsForm from '@jaytam/antd-ms/components/MsForm/forms/MsTagsForm';
import MsQueryForm from '@jaytam/antd-ms/components/MsForm/forms/MsQueryForm';
import { needSubmitForm } from '@jaytam/antd-ms/components/MsTable/utils';
import { Button, Col, Form, Row, Tooltip } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import './index.less';
import type { MsTableAggrFormProps } from './types';
import { TABLE_SPACE } from '@jaytam/antd-ms/components/MsTable/constants';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsTableAggrForm<P, R, D>(props: MsTableAggrFormProps<P, R, D>) {
  const { form: formInstance, columns = [], extraProps = {}, initialValues, ...formProps } = props;
  const { searchConfig, mountInitialValues, creatorRender, toolRender, query } = extraProps;
  const [openAdvanceForm, setOpenAdvanceForm] = useState(false);
  const [form] = Form.useForm(formInstance);
  const { currentLocale } = useLocale('MsTable');
  const { searchColumns, searchFormColumns, onlyFilterFormColumns, hiddenFormColumns } =
    resolveFilterColumns(columns, {
      ignoreMergeInputIncludeQuerySort: true,
    });

  /** 聚合筛选器 */
  const aggrColumns = searchColumns
    // 设置 showInQuery 才可显示
    .filter(({ showInQuery }) => showInQuery)
    // mergeInputIncludeQuery=false 不在聚合筛选器中显示
    .filter(({ mergeInputIncludeQuery = true }) => mergeInputIncludeQuery)
    .filter((column) => {
      if (!column.search && column.filters) {
        return false;
      }
      return true;
    }) as MsFormColumns;

  /** 高级筛选器 */
  const advanceColumns = searchColumns.filter(
    ({ valueType = 'text' }) => !RESOURCE_TAGS_VALUE_TYPES.includes(valueType),
  ) as MsFormColumns;

  /** 展示在query区域的筛选器 */
  const queryColumns = searchColumns
    // 设置 showInQuery 才可显示
    .filter(({ showInQuery }) => showInQuery)
    .filter(
      ({ valueType = 'text', mergeInputIncludeQuery }) =>
        RESOURCE_TAGS_VALUE_TYPES.includes(valueType) || mergeInputIncludeQuery === false,
    )
    // 资源标签类型始终排在最后
    .sort(({ valueType: x1 = 'text' }, { valueType: x2 = 'text' }) => {
      if (RESOURCE_TAGS_VALUE_TYPES.includes(x1)) {
        return 1;
      }
      if (RESOURCE_TAGS_VALUE_TYPES.includes(x2)) {
        return -1;
      }
      return 0;
    }) as MsFormColumns;

  const handleValuesChange = (changedValues: any, values: any) => {
    if (needSubmitForm(queryColumns, changedValues, values)) {
      // 解决 formItemProps.rules 异常
      setTimeout(() => form.submit(), 0);
    }
  };

  return (
    <>
      <Row
        gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}
        style={{
          paddingBottom: TABLE_SPACE,
        }}
      >
        {creatorRender && <Col>{creatorRender}</Col>}
        <Col flex={1}>
          <Row justify="space-between">
            <Col>
              <Row gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}>
                <Col>
                  <EditingActionController>
                    <MsAggrForm
                      {...formProps}
                      form={form}
                      columns={aggrColumns}
                      searchConfig={searchConfig}
                      // 关闭表单缓存，使用table的缓存
                      disabledFieldCache
                    />
                  </EditingActionController>
                </Col>
                <Col>
                  <EditingActionController>
                    <MsQueryForm
                      {...formProps}
                      form={form}
                      columns={queryColumns}
                      hiddenColumns={hiddenFormColumns}
                      searchConfig={searchConfig}
                      // 关闭表单缓存，使用table的缓存
                      disabledFieldCache
                    />
                  </EditingActionController>
                </Col>
              </Row>
            </Col>
            <Col>
              <EditingActionController>
                <Tooltip
                  title={openAdvanceForm ? currentLocale.foldFilter : currentLocale.expandFilter}
                >
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => setOpenAdvanceForm((prev) => !prev)}
                  >
                    {currentLocale.advancedFilter}
                  </Button>
                </Tooltip>
              </EditingActionController>
            </Col>
          </Row>
        </Col>
        {toolRender && <Col>{toolRender}</Col>}
      </Row>
      {/* 高级筛选必须放在最后，因为 onValuesChange 只有最后一个 Form 组件会触发，所以通过样式 column-reverse 反转一下 */}
      <Row style={{ flexDirection: 'column-reverse' }}>
        {/* 筛选标签，hideFilterTags 可控制显隐 */}
        {extraProps?.searchConfig?.hideFilterTags ? null : (
          <MsTagsForm
            form={form}
            query={query}
            columns={[...searchFormColumns, ...onlyFilterFormColumns]}
            searchConfig={searchConfig}
            // 关闭表单缓存，使用table的缓存
            disabledFieldCache
            onClear={formProps.onClear}
          />
        )}
        <div
          className={classNames('ms-advance-form-container', openAdvanceForm ? 'open' : undefined)}
        >
          <EditingActionController fullWidth>
            <MsAdvanceForm
              {...formProps}
              form={form}
              columns={advanceColumns}
              successNotify={false}
              searchConfig={searchConfig}
              initialValues={initialValues}
              mountInitialValues={mountInitialValues}
              onCollapsed={() => setOpenAdvanceForm(false)}
              onValuesChange={handleValuesChange}
              // 关闭表单缓存，使用table的缓存
              disabledFieldCache
            />
          </EditingActionController>
        </div>
      </Row>
    </>
  );
}

export default MsTableAggrForm;
