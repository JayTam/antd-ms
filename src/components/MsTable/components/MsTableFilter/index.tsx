import { Col, Row } from 'antd';
import { isUndefined } from 'lodash-es';
import { DEFAULT_SEARCH_CONFIG, TABLE_SPACE } from '../../constants';

import type { MsTableSearchType } from '../../types';
import { resolveRender } from '../../utils/render';
import MsTableAggrForm from './forms/MsTableAggrForm';
import MsTableFilterForm from './forms/MsTableFilterForm';
import MsTableQueryFilterForm from './forms/MsTableQueryFilterForm';
import MsTableQueryFilterTagsForm from './forms/MsTableQueryFilterForm/MsTableQueryFilterTagsForm';
import MsTableQueryForm from './forms/MsTableQueryForm';
import MsTableSearchForm from './forms/MsTableSearchForm';
import MsTableViewForm from './forms/MsTableViewForm';
import MsTableTools from './MsTableTools';
import QueryFilterLayout from './QueryFilterLayout';
import type { MsTableFilterProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 表格筛选区域
 * @param props
 */
function MsTableFilter<P, R, D>(props: MsTableFilterProps<P, R, D>) {
  const { tableProps = {}, formExtraProps = {}, ...restProps } = props;
  const { globalLocale } = useLocale();
  const {
    search = {},
    columns = [],
    dataSource = [],
    barRender,
    menuRender,
    creatorRender,
    filterbarRender,
    viewForm = {},
    toolbarRender,
  } = tableProps;
  if (search === false) return null;

  // 筛选表单配置
  const searchConfig: MsTableSearchType<P, R, D> = {
    ...DEFAULT_SEARCH_CONFIG,
    searchText: globalLocale.query,
    resetText: globalLocale.reset,
    submitText: globalLocale.submit,
    clearText: globalLocale.clear,
    labelWidth: search.filterType === 'view' ? '124px' : DEFAULT_SEARCH_CONFIG.labelWidth,
    ...search,
  };

  // 合并表单属性
  const formProps = { ...restProps, columns, extraProps: { ...formExtraProps, searchConfig } };

  const renderProps = {
    dataSource,
    loading: formExtraProps.submitLoading ?? false,
    values: formExtraProps.query ?? {},
  };

  const creatorRenderResult = resolveRender(creatorRender, renderProps);
  const menuRenderResult = resolveRender(menuRender, renderProps);
  const toolRenderResult = resolveRender(toolbarRender, renderProps);

  // 菜单
  const MenuNode = menuRenderResult && (
    <div style={{ paddingBottom: TABLE_SPACE }}>{menuRenderResult}</div>
  );
  // 工具按钮
  const ToolsNode = <MsTableTools {...tableProps} toolbarRender={toolRenderResult} />;

  /** 基础通用的布局属性 */
  const baseLayoutProps = {
    barRender,
    filterRender: filterbarRender,
    creatorRender: creatorRenderResult,
    menuRender: menuRenderResult,
    toolRender: ToolsNode,
  };

  if (searchConfig.filterType === 'query') {
    return (
      <QueryFilterLayout {...baseLayoutProps} formRender={<MsTableQueryForm {...formProps} />} />
    );
  }

  if (searchConfig.filterType === 'filter') {
    return (
      <QueryFilterLayout {...baseLayoutProps} formRender={<MsTableFilterForm {...formProps} />} />
    );
  }

  if (searchConfig.filterType === 'query-filter') {
    return (
      <QueryFilterLayout
        {...baseLayoutProps}
        menuPosition="filter"
        rowReverse
        formRender={<MsTableQueryFilterForm {...formProps} defaultMergeInput={false} />}
        tagsRender={search.hideFilterTags ? null : <MsTableQueryFilterTagsForm {...formProps} />}
      />
    );
  }

  // if (searchConfig.filterType === 'light-query-filter') {
  //   return (
  //     <MsTableFilterLayout
  //       {...baseLayoutProps}
  //       menuPosition="filter"
  //       rowReverse
  //       formRender={<MsTableQueryFilterForm {...formProps} defaultMergeInput={false} />}
  //       tagsRender={search.hideFilterTags ? null : <MsTableQueryFilterTagsForm {...formProps} />}
  //     />
  //   );
  // }

  if (searchConfig.filterType === 'aggr') {
    return (
      <div className="ms-table-filter">
        {MenuNode}
        {isUndefined(barRender) ? (
          <MsTableAggrForm
            {...formProps}
            extraProps={{
              ...formProps.extraProps,
              creatorRender: creatorRenderResult,
              toolRender: ToolsNode,
            }}
          />
        ) : (
          barRender
        )}
      </div>
    );
  }

  if (searchConfig.filterType === 'search') {
    return (
      <div className="ms-table-filter">
        {MenuNode}
        {isUndefined(filterbarRender) ? <MsTableSearchForm {...formProps} /> : filterbarRender}
        {isUndefined(barRender) ? (
          // 没有创建按钮就隐藏工具栏
          isUndefined(creatorRenderResult) ? null : (
            <Row
              justify="space-between"
              align="top"
              wrap={false}
              style={{
                paddingBottom: TABLE_SPACE,
              }}
            >
              <Col>{creatorRenderResult}</Col>
              <Col>{ToolsNode}</Col>
            </Row>
          )
        ) : (
          barRender
        )}
      </div>
    );
  }

  /**
   * @deprecated 废弃的类型，light-query-filter 代替，不过为了兼容继续保留
   */
  if (searchConfig.filterType === 'light-query') {
    return (
      <div className="ms-table-filter">
        {isUndefined(barRender) ? (
          <Row
            justify="space-between"
            align="top"
            wrap={false}
            gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}
            style={{ paddingBottom: TABLE_SPACE }}
          >
            <Col>
              <Row wrap={false} gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}>
                <Col>{creatorRenderResult}</Col>
                <Col>
                  {isUndefined(filterbarRender) ? (
                    <MsTableQueryForm {...formProps} defaultMergeInput={false} />
                  ) : (
                    filterbarRender
                  )}
                </Col>
              </Row>
            </Col>
            <Col>{menuRenderResult}</Col>
          </Row>
        ) : (
          barRender
        )}
      </div>
    );
  }

  /**
   * @deprecated 废弃的类型，light-query-filter 代替，不过为了兼容继续保留
   */
  if (searchConfig.filterType === 'light-query-right') {
    if (!isUndefined(barRender)) return <>{barRender}</>;

    if (isUndefined(menuRender)) {
      return (
        <div className="ms-table-filter">
          <Row
            justify="space-between"
            align="top"
            wrap={false}
            gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}
            style={{ paddingBottom: TABLE_SPACE }}
          >
            <Col>
              {isUndefined(filterbarRender) ? (
                <MsTableQueryForm {...formProps} defaultMergeInput={false} />
              ) : (
                filterbarRender
              )}
            </Col>
            <Col>{creatorRenderResult}</Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="ms-table-filter">
        <Row
          justify="space-between"
          align="top"
          wrap={false}
          gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}
          style={{ paddingBottom: TABLE_SPACE }}
        >
          <Col>{menuRenderResult}</Col>
          <Col>
            <Row wrap={false} gutter={[TABLE_SPACE / 2, TABLE_SPACE / 2]}>
              <Col>
                {isUndefined(filterbarRender) ? (
                  <MsTableQueryForm {...formProps} defaultMergeInput={false} />
                ) : (
                  filterbarRender
                )}
              </Col>
              <Col>{creatorRenderResult}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  if (searchConfig.filterType === 'view') {
    return (
      <>
        {MenuNode}
        {isUndefined(barRender) ? (
          <MsTableViewForm
            {...formProps}
            extraProps={{
              viewForm,
              ...formProps.extraProps,
              creatorRender: creatorRenderResult,
              toolRender: ToolsNode,
            }}
          />
        ) : (
          barRender
        )}
      </>
    );
  }
  return null;
}

export default MsTableFilter;
