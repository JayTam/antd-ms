import { useFullscreen, useUpdateEffect } from 'ahooks';
import { Col, Form, Row, Spin, Table } from 'antd';
import cs from 'classnames';
import { isFunction, isNil, isObject, isUndefined, omit, pick } from 'lodash-es';

import type { ReactElement, Ref } from 'react';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ValueEnumContext } from '../MsForm/contexts/enum';
import { parseFormValues, undefinedFormValues } from '../MsForm/utils/formValues';
import { isRequired } from '../MsForm/utils/validate';
import MsTableCardContainer from './components/MsTableCardContainer/index';
import { useColumnsResizable } from './components/MsTableColumnTitle/hook';
import {
  MsTableEditableCell,
  MsTableEditableContainer,
  MsTableEditableRow,
} from './components/MsTableEditable';
import MsTableFilter from './components/MsTableFilter';
import MsTablePagination from './components/MsTablePagination';
import MsTableSelection from './components/MsTableSelection';
import useTableSelection from './components/MsTableSelection/useTableSelection';
import {
  CURRENT_KEY,
  FRONTEND_PAGINATION_KEY,
  PAGE_SIZE_KEY,
  SEARCHING_KEY,
  TABLE_FORM_NAME,
  TABLE_INTERNAL_KEYS,
  TABLE_SPACE,
} from './constants';
import { MsTableToolsContext } from './contexts/tools';
import useScroll from './hooks/useScroll';
import useExpandable from './hooks/useExpandable';
import useQuery from './hooks/useQuery';
import useTableColumns from './hooks/useTableColumns';
import useTableRequest from './hooks/useTableRequest';

import './index.less';

import type { MsTableColumnsNoGroup, MsTableComponentProps } from './types';

import { MsTitle } from '@jaytam/antd-ms';
import { EditingActionController } from './components/MsTableEditable';
import useSticky from './hooks/useSticky';
import { resolveRender } from './utils/render';
import { stringifySorter } from './utils/sorter';
import { mergeFilters } from './utils/tableFilter';
import { MsTableContext } from './contexts/table';
import MsResizableTable from './components/MsResizableTable';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsTableComponent = forwardRef(
  <P extends object, R, D extends object>(
    props: MsTableComponentProps<P, R, D>,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {
      rowKey = 'id',
      params = {},
      request,
      columns = [],
      postRes,
      borderedHead,
      storeName,
      title,
      size: initialSize = 'small',
      columnsResizable = true,
      toolbar,
      barRender,
      menuRender,
      creatorRender,
      paginationType = 'page',
      filterbarRender,
      toolbarRender,
      tableRender,
      contentRender,
      filteredViewRender,
      selectionButtonsRender,
      footerRender,
      footer,
      pollingBy,
      polling,
      pagination = {},
      manualRequest = false,
      search = { filterType: 'query' },
      beforeSearchSubmit,
      resetDepsParmaKeys = ['region', 'regionCode'],
      showSpinning = true,
      formRef,
      actionRef,
      editable,
      onRow,
      onLoad,
      onRequestError,
      onSubmit,
      onReset,
      onRefresh,
      onClear,
      onChange,
      afterChange,
      ...resetProps
    } = props;

    const [form] = Form.useForm(props.search === false ? undefined : props.search?.formProps?.form);
    /** 行高 */
    const [size, setSize] = useState(initialSize);

    const editableContainerRef = useRef<{ isEditing: boolean }>(null);
    const { fullLocale } = useLocale();

    const checkTableEditing = () =>
      EditingActionController.checkEditingAction(editableContainerRef, fullLocale);

    /** 缓存 valueEnum */
    const [requestValeEnumMap, setRequestValeEnumMap] = useState<Record<string, any>>({});
    /** 缓存 valueEnum Promise */
    const requestValeEnumMapRef = useRef<Record<string, Promise<any>>>({});

    /** 表格及表单状态 */
    const {
      defaultQuery,
      defaultSortOrder,
      formInitialValues,
      mountInitialValues,
      query,
      setQuery,
    } = useQuery(props);

    /** 表格请求 */
    const {
      loading,
      data,
      res,
      refreshAsync,
      changeData,
      run,
      runAsync,
      queryState,
      contentLoadingRef,
    } = useTableRequest(props, {
      query,
      form,
      handleRefresh,
    });
    /** 表格选择器 */
    const tableSelectionProps = useTableSelection(props, {
      res,
      dataSource: data,
    });
    const { rowSelection, selectedRows, clearSelected, clearSelectedOnSearch } =
      tableSelectionProps;

    const { expandable, clearExpandedRowKeys } = useExpandable(props, { changeData });

    /** 表格 sticky */
    const tableSticky = useSticky(props);

    /** 全屏 */
    const fullscreenRef = useRef<HTMLElement>(null);
    const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullscreenRef, {
      pageFullscreen: { zIndex: 1000 },
    });

    // 表格滚动
    const { scroll, tableAreaRef, footerAreaRef, tableFooterAreaRef, scrollToFirstRow } = useScroll(
      props,
      { size, data },
    );

    useUpdateEffect(() => {
      handleSearch(query);
    }, [JSON.stringify(omit(params, resetDepsParmaKeys, TABLE_INTERNAL_KEYS))]);

    useUpdateEffect(() => {
      handleReset();
    }, [JSON.stringify(pick(params, resetDepsParmaKeys))]);

    /** 表格 columns */
    const tableColumns = useTableColumns(props, {
      query,
      requestValeEnumMap,
      onSearch: handleRefresh,
    });

    /** 是否表单重置中，为了跳过重置触发的 onSubmit 事件 */
    const restingRef = useRef(false);

    /**
     * 搜索
     * @param values 搜索参数
     * @param isNew 是否是新的查询，新的查询将重置分页相关参数（pageSize除外），重置排序相关参数
     */
    async function handleSearch(values: any = {}, isNew = true) {
      if (checkTableEditing()) return;

      contentLoadingRef.current = true;
      clearSelectedOnSearch();
      if (restingRef.current) restingRef.current = false;
      else onSubmit?.();
      const newQuery = isNew
        ? { ...values, ...defaultQuery, ...defaultSortOrder, [PAGE_SIZE_KEY]: query[PAGE_SIZE_KEY] }
        : { ...query, ...values };
      setQuery(newQuery);
      const res = await runAsync({ ...newQuery, [SEARCHING_KEY]: 1 });
      clearExpandedRowKeys?.();
      return res;
    }

    /**
     * 搜索并重置表单状态，从 actionRef 外部传参数搜索，需要逆向同步状态给表单
     * @param values 搜索参数
     * @param isNew 是否是新的查询，新的查询将重置分页相关参数（pageSize除外），重置排序相关参数
     */
    async function handleSearchSyncForm(values: any = {}, isNew = true) {
      if (checkTableEditing()) return;
      contentLoadingRef.current = true;
      clearSelectedOnSearch();
      onSubmit?.();
      const newQuery = isNew
        ? { ...values, ...defaultQuery, ...defaultSortOrder, [PAGE_SIZE_KEY]: query[PAGE_SIZE_KEY] }
        : { ...query, ...values };
      if (isNew) {
        const formValues = parseFormValues(newQuery, columns);
        const allValues = undefinedFormValues(formValues, columns);
        form.setFieldsValue(allValues as D);
      } else {
        form.setFieldsValue(values);
      }
      setQuery(newQuery);
      const res = await runAsync({ ...newQuery, [SEARCHING_KEY]: 1 });
      clearExpandedRowKeys?.();
      return res;
    }

    /**
     * 刷新数据，不会重置查询表单，不会触发onSubmit事件
     * @param resetPageIndex 是否重置页码
     * @param page 页码
     * @returns
     */
    async function handleRefresh(resetPageIndex?: boolean, page = 1) {
      if (checkTableEditing()) return;
      contentLoadingRef.current = true;
      clearSelectedOnSearch();
      onRefresh?.();
      let res;
      if (resetPageIndex) {
        const newQuery = { ...query, ...defaultQuery, [CURRENT_KEY]: page };
        setQuery(newQuery);
        if (pagination && pagination.frontPagination) {
          res = await runAsync({ ...newQuery, [FRONTEND_PAGINATION_KEY]: 1 });
        } else {
          res = await runAsync(newQuery);
        }
      } else {
        if (pagination && pagination.frontPagination) {
          res = await runAsync({ ...query, [FRONTEND_PAGINATION_KEY]: 1 });
        } else {
          res = await refreshAsync();
        }
      }
      clearExpandedRowKeys?.();
      return res;
    }

    /**
     * 重置查询表单到默认值
     */
    async function handleReset() {
      if (checkTableEditing()) return;
      contentLoadingRef.current = true;
      restingRef.current = true;
      clearSelectedOnSearch();
      onReset?.();
      form.resetFields();
      form.submit();
    }

    /**
     * 清空查询表单，必填校验不清空
     */
    async function handleClear() {
      contentLoadingRef.current = true;
      restingRef.current = true;
      clearSelectedOnSearch();
      // 清空字段
      const fieldDataList = (columns as MsTableColumnsNoGroup)
        ?.filter((column) => !isRequired(column, form))
        ?.filter((column) => !isNil(column.dataIndex))
        ?.map((column) => ({ name: column.dataIndex, value: undefined }));
      form.setFields(fieldDataList);
      form.submit();
      onClear?.();
    }

    /**
     * 页码切换
     * @param current 当前页码
     * @param pageSize 每页多少个
     * @param pageStart 游标翻页起点
     * @param pageType 游标翻页方向(前一页|后一页)
     */
    const handlePaginationChange = (
      current?: number,
      pageSize?: number,
      pageStart?: string,
      pageType?: 'prev' | 'next',
    ) => {
      if (checkTableEditing()) return;
      contentLoadingRef.current = true;
      const newQuery = { ...query, current, pageSize, pageStart, pageType };
      setQuery(newQuery);
      onSubmit?.();
      run(newQuery);
      if (pagination) {
        pagination?.afterChange?.(current, pageSize, pageStart, pageType);
      }
      // 滚动到表格第一行
      scrollToFirstRow();
    };

    useImperativeHandle(actionRef, () => ({
      /**
       * @deprecated 已弃用，搜索用 search 代替，刷新用 reload 代替
       */
      refresh: handleSearchSyncForm,
      search: handleSearchSyncForm,
      reload: () => handleRefresh(false),
      reloadAndRest: () => handleRefresh(true),
      reset: handleReset,
      clearSelected,
      getDataSource: () => data,
      setDataSource: changeData,
      getSelected: () => selectedRows,
    }));

    useImperativeHandle(formRef, () => form);

    /**
     * 筛选栏和表格之间区域
     * @param dataSource
     * @returns
     */
    function spaceRender(dataSource: D[]) {
      const result = resolveRender(filteredViewRender, {
        dataSource,
        loading,
        values: query,
      });
      if (result) {
        return <div style={{ paddingBottom: TABLE_SPACE }}>{result}</div>;
      }
    }

    /**
     * 表格 footer
     * @param dataSource
     * @returns
     */
    function tableFooterRender(dataSource: D[]) {
      if (footer) {
        return (
          <div className="ms-table-content-footer">
            <Row
              ref={tableFooterAreaRef}
              justify="space-between"
              align="middle"
              style={{ marginTop: TABLE_SPACE }}
            >
              {footer(dataSource)}
            </Row>
          </div>
        );
      }

      const showPagination = Boolean(pagination) && request;
      const showSelection = Boolean(selectionButtonsRender) || Boolean(props.rowSelection); // 这里 props.rowSelection 判断要用原始参数

      if (!showSelection && !showPagination) return null;

      return (
        <div className="ms-table-content-footer">
          <Row
            ref={tableFooterAreaRef}
            justify="space-between"
            align="middle"
            style={{ marginTop: TABLE_SPACE }}
          >
            <Col>
              {/* 多选操作按钮 */}
              {showSelection && (
                <EditingActionController>
                  <MsTableSelection {...tableSelectionProps} tableProps={props} />
                </EditingActionController>
              )}
            </Col>
            <Col>
              {/* 分页器 */}
              {showPagination && (
                <EditingActionController>
                  <MsTablePagination
                    {...pagination}
                    onChange={handlePaginationChange}
                    dataSource={dataSource}
                    current={query.current}
                    pageStart={query.pageStart}
                    pageType={query.pageType}
                    pageSize={query.pageSize}
                    total={queryState.total}
                    hasNext={queryState.hasNext}
                    hasPrev={queryState.hasPrev}
                    tableProps={props}
                  />
                </EditingActionController>
              )}
            </Col>
          </Row>
        </div>
      );
    }

    /**
     * 表格主体
     * @param dataSource
     * @returns
     */
    const tableWrapperRender = (dataSource: D[]) => {
      const showLoading = loading && contentLoadingRef.current;
      const resolveRenderProps = {
        dataSource: dataSource,
        loading: showLoading,
        values: query,
      };

      // tableRender 仅表格区域，不包含分页器
      const tableRenderResult = resolveRender(tableRender, resolveRenderProps);
      if (isUndefined(tableRender) === false) {
        return tableRenderResult;
      }

      // contentRender 整个内容区域
      const contentRenderResult = resolveRender(contentRender, resolveRenderProps);
      if (isUndefined(contentRender) === false) {
        return (
          <>
            {contentRenderResult}
            {tableFooterRender(dataSource)}
          </>
        );
      }

      return (
        // MsTableContext 不能放在 MsTableFilter 之上，不然会影响筛选器 getPopupContainer 挂载位置
        <MsTableContext.Provider value={{ inContext: true, popupMountRef: tableAreaRef }}>
          {/* 表格 */}
          <div className="ms-table-content" ref={tableAreaRef}>
            <MsResizableTable
              {...resetProps}
              columnsResizable={columnsResizable}
              columns={tableColumns}
              ref={ref}
              rowKey={rowKey}
              dataSource={dataSource}
              className={cs(
                borderedHead ? 'ms-table-bordered-thead' : undefined,
                resetProps.className,
              )}
              bordered={borderedHead ? true : resetProps.bordered}
              components={{
                ...resetProps.components,
                body: {
                  // 编辑模式
                  cell: isNil(editable) ? undefined : MsTableEditableCell,
                  row: isNil(editable) ? undefined : MsTableEditableRow,
                  ...resetProps.components?.body,
                },
              }}
              pagination={false}
              size={size}
              sticky={tableSticky}
              scroll={scroll}
              // 分页未集成在Table中，不用处理
              onChange={(_, filters, sorter, extra) => {
                if (checkTableEditing()) return;
                // 滚动到表格第一行
                scrollToFirstRow();
                // 使用 onChange 重写
                if (onChange) {
                  onChange(filters, sorter, extra);
                  return;
                }
                // 筛选
                const filterQuery = mergeFilters(query, filters, columns);
                // 排序
                const sorterQuery = stringifySorter(filterQuery, sorter);
                if (extra.action === 'sort') {
                  handleSearchSyncForm(sorterQuery, false);
                }
                if (extra.action === 'filter') {
                  handleSearchSyncForm(sorterQuery, true);
                }
                // 不改变组件逻辑的 onChange 事件
                afterChange?.(filters, sorter, extra);
              }}
              rowSelection={rowSelection}
              // 编辑模式，设置RowEdit需要属性
              onRow={
                isNil(editable)
                  ? onRow
                  : (record, index) => {
                      const editableOnRow = { record } as any;
                      if (isFunction(onRow)) {
                        const onRowValue = onRow(record, index);
                        return { ...onRowValue, ...editableOnRow };
                      }
                      return editableOnRow;
                    }
              }
              expandable={expandable}
            />
          </div>
          {/* 表格 footer */}
          {tableFooterRender(dataSource)}
        </MsTableContext.Provider>
      );
    };

    /**
     * 组件整体的 footer，不是 table footer
     * @param dataSource
     * @returns
     */
    function footerWrapperRender(dataSource: D[]) {
      const footerRenderResult = resolveRender(footerRender, {
        dataSource,
        loading,
        values: query,
      });
      if (isUndefined(footerRender) === false) {
        return (
          <Row className="ms-table-footer" ref={footerAreaRef} style={{ marginTop: TABLE_SPACE }}>
            {footerRenderResult}
          </Row>
        );
      }
    }

    return (
      <>
        <ValueEnumContext.Provider
          value={{
            inTableContext: true,
            getValueEnum: (key) => requestValeEnumMap[key],
            getValueEnumPromise: (key) => requestValeEnumMapRef.current[key],
            setValueEnum(key, valueEnum) {
              const dataIndex = key.split('&')[0];
              setRequestValeEnumMap((prev) => ({
                ...prev,
                [dataIndex]: valueEnum,
                [key]: valueEnum,
              }));
            },
            setValueEnumPromise(key, valueEnumPromise) {
              const dataIndex = key.split('&')[0];
              if (requestValeEnumMapRef.current) {
                requestValeEnumMapRef.current[dataIndex] = valueEnumPromise;
                requestValeEnumMapRef.current[key] = valueEnumPromise;
              }
            },
          }}
        >
          <MsTableToolsContext.Provider
            value={{
              reload: { loading, onReload: handleRefresh },
              size: { size, setSize },
              fullScreen: { isFullscreen, onToggleFullscreen: toggleFullscreen },
            }}
          >
            <MsTableCardContainer {...props} _fullscreenRef={fullscreenRef}>
              {/* 编辑表格 */}
              <MsTableEditableContainer
                {...props}
                dataSource={data}
                tableAreaRef={tableAreaRef}
                innerActionRef={editableContainerRef}
                reload={handleRefresh}
              >
                {(dataSource) => (
                  <>
                    {/* 表格标题 */}
                    <MsTitle
                      {...omit(props, 'children', 'className', 'style', 'loading')}
                      titleSize={props.noCard ? 'middle' : 'large'}
                      titleType={props.titleType ?? (props.noCard ? 'gradient' : 'common')}
                    />
                    {/* 表格筛选 */}
                    <MsTableFilter
                      {...(props.search === false ? {} : props.search?.formProps)}
                      name={TABLE_FORM_NAME}
                      form={form}
                      initialValues={formInitialValues}
                      tableProps={{ ...props, dataSource }}
                      formExtraProps={{
                        submitLoading: loading,
                        mountInitialValues,
                        query,
                      }}
                      onFinish={handleSearch}
                      onReset={handleReset}
                      onClear={handleClear}
                    />

                    {spaceRender(dataSource)}
                    {/* 表格内容 */}
                    {showSpinning ? (
                      <Spin
                        spinning={
                          loading &&
                          (isObject(polling) && polling.showSpinning
                            ? true
                            : contentLoadingRef.current)
                        }
                      >
                        {tableWrapperRender(dataSource)}
                      </Spin>
                    ) : (
                      tableWrapperRender(dataSource)
                    )}
                    {/* 整个组件的 footer 区域 */}
                    {footerWrapperRender(dataSource)}
                  </>
                )}
              </MsTableEditableContainer>
            </MsTableCardContainer>
          </MsTableToolsContext.Provider>
        </ValueEnumContext.Provider>
      </>
    );
  },
);

export default MsTableComponent as <P, R, D>(
  props: MsTableComponentProps<P, R, D> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
