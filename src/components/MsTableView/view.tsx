import type { MsTableProps, MsTableSearchType } from '@jaytam/antd-ms/components/MsTable';
import MsTable from '@jaytam/antd-ms/components/MsTable';
import { useControllableValue, useUpdateEffect } from 'ahooks';
import { Button, Col, Dropdown, Row, Skeleton, Space, Tabs, Tooltip } from 'antd';

import { MsResizable } from '@jaytam/antd-ms';
import { isFunction, omit } from 'lodash-es';
import type { Key } from 'react';
import { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FIELD_NAMES } from '../MsSortable/constants';
import type { ColumnStateListType } from '../MsTable/components/MsTableColumnContainer/types';
import type {
  FieldListType,
  MsViewFormActionType,
  MsViewFormTypes,
} from '../MsTable/components/MsTableFilter/forms/MsTableViewForm/types';
import MsViewList from '../MsViewList';
import type {
  MsViewListActionType,
  MsViewListItemType,
  MsViewListProps,
} from '../MsViewList/types';
import useViewRequest from './hooks/useViewRequest';
import './index.less';
import type { MsTableViewProps } from './types';
import { MsArrowDownSmOutlined } from '@jaytam/icons';
import { useRequest } from 'ahooks';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsTableView = (props: MsTableViewProps) => {
  const {
    // 组件本身
    style = {},
    className,
    actionRef,
    // view
    viewTitle,
    viewItems = [],
    fieldNames: _fieldNames,
    viewLoading,
    viewParams,
    viewType = 'leftMenu',
    maxLine = 4,
    onAddView,
    onEditView,
    onDeleteView,
    viewRequest,
    viewPostRes,
    viewDebounceTime,
    viewItemDropDownMeun,
    viewRefreshOnWindowFocus,
    viewListSortable = true,
    viewProps = {},
    // form
    formLoading,
    saveBtnDropdown,
    formDefaultValue,
    onSaveView,
    onSaveAsNewView,
    // table
    columns = [],
    tableParams,
    tableRequest,
    tablePostRes,
    tableLoading = false,
    tableDebounceTime,
    tableRefreshOnWindowFocus,
    tableProps = {},
    resizableProps,
    hoverOpenView = false,
    msTableViewContentStyle = {},
    formTopViewStyle = {},
    onSortView,
  } = props;

  const [activeId, onClickViewRow] = useControllableValue<Key>(props, {
    valuePropName: 'viewActiveId',
    trigger: 'onClickViewRow',
  });
  // 是否是初始化
  const isInit = useRef<boolean>(true);
  const viewRef = useRef<MsViewListActionType>(null);
  const formRef = useRef<MsViewFormActionType>(null);
  const nameContentRef = useRef<HTMLDivElement>(null);
  const fieldNames = { ...FIELD_NAMES, ..._fieldNames };
  const onChangeViewCount = viewRef.current?.onChangeViewCount;
  const getFormFiledParams = () => formRef.current?.getFormFiledParams?.();
  const { globalLocale } = useLocale();

  const hasViewRequest = isFunction(viewRequest);
  // 是否显示保存区域的按钮
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(isFunction(viewRequest));

  const viewRequestConfig = {
    params: viewParams,
    postRes: viewPostRes,
    request: viewRequest,
    setLoading: setLoading,
    dataSource: viewItems,
    debounceTime: viewDebounceTime,
    refreshOnWindowFocus: viewRefreshOnWindowFocus,
  };

  // 请求数据
  const { data = [], refreshAsync } = useViewRequest(viewRequestConfig);

  const [items, onChangeSort] = useControllableValue<MsViewListItemType[]>(props, {
    defaultValue: [],
    valuePropName: 'viewItems',
    trigger: 'onChangeSort',
  });

  // 刷新数据
  const handleRefresh = useCallback(() => {
    isInit.current = false;
    refreshAsync();
  }, [refreshAsync]);

  useUpdateEffect(() => {
    onChangeSort(data);
    if (!activeId && data?.length) {
      const id = data?.[0][fieldNames.id!];
      onClickViewRow(id);
    }
  }, [data]);

  const handleonClickViewRow: MsViewListProps['onClickViewRow'] = (...args) => {
    onClickViewRow(...args);
    if (activeId + '' !== args[0] + '' && showBtn) {
      setShowBtn(false);
    }
  };
  const viewPropsConfig = {
    ...viewProps,
    items,
    activeId,
    title: viewTitle,
    fieldNames,
    onChangeSort,
    onAddView,
    onEditView,
    onDeleteView,
    onClickViewRow: handleonClickViewRow,
    viewListSortable,
    actionRef: viewRef,
    request: undefined,
    onRefresh: handleRefresh,
    onSortView,
    viewItemDropDownMeun: viewItemDropDownMeun,
    loading: hasViewRequest ? loading : viewLoading,
  };

  // 表单上面的视图组件
  const formTopMsViewConfing = {
    ...omit(
      viewPropsConfig,
      'title',
      'params',
      'style',
      'className',
      'request',
      'showHead',
      'debounceTime',
      'refreshOnWindowFocus',
    ),
    items,
    style: formTopViewStyle,
    className: 'form-top-msview',
    actionBtnPosition: false,
  };

  const { search = {}, viewForm, ...resetTableProps } = tableProps;
  const { saveBtn, saveBtnable = true, resetBtnable = true } = viewForm || {};
  const columnStateApi: any = tableProps?.columnState?.request;
  const { loading: columnStateLoading, runAsync: columnStateRun } = useRequest(columnStateApi, {
    manual: true,
  });
  const renderTableProps: MsTableProps = useMemo(() => {
    return {
      ...resetTableProps,
      columnState: {
        ...resetTableProps?.columnState,
        request: isFunction(columnStateApi) ? columnStateRun : undefined,
      },
    };
  }, [columnStateApi, columnStateRun, resetTableProps]);

  // 筛选表单默认配置
  const searchConfig = {
    filterType: 'view',
    labelWidth: '124px',
    searchText: globalLocale.query,
    resetText: globalLocale.reset,
    submitText: globalLocale.submit,
    filterStyle: {},
    filterHoverStyle: {},
    defaultCollapsed: true,
    ...search,
  } as MsTableSearchType<any, any, any>;

  // 当前的视图数据
  const viewItemData = useMemo(() => {
    const res = items.find((item) => {
      const id = item[fieldNames.id!];
      return id + '' === activeId + '';
    });
    return res;
  }, [items, fieldNames.id, activeId]);

  // 当前的视图数据前5个
  const viewItemsList = useMemo(() => {
    return (
      items?.map((item) => {
        return {
          key: item?.[fieldNames.id!] + '',
          label: item?.[fieldNames.title!],
          children: null,
        };
      }) || []
    );
  }, [fieldNames.id, fieldNames.title, items]);

  // 表格Column
  const [tableColumns, onChangeShowColumns] = useControllableValue<ColumnStateListType>(props, {
    valuePropName: 'tableColumns',
    trigger: 'onChangeShowColumns',
  });
  // 表单数据
  const [fieldList, onChangeField] = useControllableValue<FieldListType>(props, {
    valuePropName: 'fieldList',
    trigger: 'onChangeField',
  });

  // 视图表单
  const formData = useMemo(() => {
    return viewItemData?.fields?.form || [];
  }, [viewItemData?.fields]);

  useUpdateEffect(() => onChangeField(formData), [formData]);

  const [visible, setVisible] = useControllableValue<boolean>(resizableProps, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
    defaultValuePropName: 'defaultOpenValue',
  });
  // 视图名字
  const viewName = useMemo(() => {
    return viewItemData?.[fieldNames.title];
  }, [fieldNames.title, viewItemData]);

  // 是否hover视图名字展示视图
  const showView = useMemo(() => {
    return !visible && hoverOpenView;
  }, [visible, hoverOpenView]);

  // 头部标题的视图名|更多
  const ViewNameTitle = (
    <Tooltip
      zIndex={888}
      placement="bottomLeft"
      title={showView ? <MsViewList {...formTopMsViewConfing} /> : viewName}
      overlayStyle={{ padding: 0, maxWidth: 'unset' }}
      color={showView ? '#fff' : 'rgba(0, 0, 0, 0.85)'}
      overlayInnerStyle={showView ? { padding: 0 } : {}}
      getPopupContainer={() => nameContentRef?.current || document.body}
    >
      <div ref={nameContentRef} className="ms-view-name-content">
        <div className="ms-view-name">{viewType === 'topTabs' ? '更多' : viewName}</div>
        {/* 筛选器下拉菜单icon */}
        {showView && <MsArrowDownSmOutlined className="ms-view-name-content-arrow" />}
      </div>
    </Tooltip>
  );
  const { handleMenu, renderMenu, handleRest } = formRef?.current || {};

  // 保存按钮
  const SaveBtn = useMemo(() => {
    if (!showBtn) return null;
    if (!saveBtnable) return null;
    if (saveBtn) return saveBtn;

    return (
      <Dropdown
        trigger={['hover']}
        menu={{ onClick: (info) => handleMenu?.(info), items: renderMenu?.(viewItemData || {}) }}
      >
        <Button type="text" size="small" className="ms-view-btn-save">
          <Space>
            保存
            <MsArrowDownSmOutlined />
          </Space>
        </Button>
      </Dropdown>
    );
  }, [handleMenu, renderMenu, saveBtn, saveBtnable, showBtn, viewItemData]);

  // 重置按钮
  const ResetBtn = useMemo(() => {
    if (!showBtn) return null;
    if (!resetBtnable) return null;

    return (
      <Button onClick={handleRest} type="text" size="small" className="ms-view-btn-reset">
        重置
      </Button>
    );
  }, [handleRest, resetBtnable, showBtn]);

  // 视图表单配置
  const viewFormConfig = {
    visible,
    fieldList,
    activeId,
    viewItemData,
    viewItemsList,
    onChange: onChangeField,
    saveBtnDropdown,
    actionRef: formRef,
    fieldNames,
    onSaveView,
    onSaveAsNewView,
    onRefreshMsView: handleRefresh,
    tableColumns,
    loading: formLoading,
    defaultValue: formDefaultValue ?? formData,
    ...viewForm,
    hoverOpenView,
    isShowTabs: viewType === 'topTabs',
    maxLine,
    SaveBtn,
    ResetBtn,
    setShowBtn,
    ViewNameTitle,
  } as MsViewFormTypes;

  const resetProps = {
    ...resizableProps,
    open: visible,
    onOpenChange: setVisible,
  };

  // 将刷新操作抛出去方便外部调用
  useImperativeHandle(actionRef, () => ({
    handleRefresh,
    onChangeViewCount,
    getFormFiledParams,
  }));

  return (
    <div className={['ms-table-view', className].join(' ')} style={style}>
      {viewType === 'leftMenu' && (
        <MsResizable {...resetProps}>
          <MsViewList {...viewPropsConfig} />
        </MsResizable>
      )}
      <div
        className="ms-table-view-content"
        style={{
          marginLeft: viewType === 'leftMenu' ? 12 : 0,
          ...msTableViewContentStyle,
        }}
      >
        {viewType === 'topTabs' && (
          <Tabs
            size="large"
            moreIcon={null}
            animated={false}
            items={viewItemsList}
            className="ms-view-tabs-wrapper"
            activeKey={activeId + ''}
            onChange={handleonClickViewRow}
            tabBarExtraContent={
              <Row>
                <Col>
                  <Space style={{ paddingLeft: '8px', paddingTop: '4px' }}>
                    {SaveBtn}
                    {ResetBtn}
                    {ViewNameTitle}
                  </Space>
                </Col>
              </Row>
            }
          />
        )}
        {activeId ? (
          loading && isInit.current ? (
            <Skeleton />
          ) : (
            <>
              {columnStateLoading && <Skeleton />}
              {/* 当初的设计缺陷: columnState 的请求是在MsTable中请求, 但是我需要外面添加骨架屏使用三目判断会导致columnState一直请求,所以使用display 显示掩藏来实现 */}
              <div style={{ display: columnStateLoading ? 'none' : 'unset' }}>
                <MsTable
                  key={activeId}
                  manualRequest={true}
                  params={tableParams}
                  postRes={tablePostRes}
                  refreshOnWindowFocus={tableRefreshOnWindowFocus}
                  debounceTime={tableDebounceTime}
                  request={tableRequest}
                  columns={columns}
                  loading={tableLoading}
                  {...renderTableProps}
                  columnState={{
                    value: tableColumns || [],
                    onChange: onChangeShowColumns,
                    ...renderTableProps.columnState,
                  }}
                  search={searchConfig}
                  viewForm={viewFormConfig}
                  noCard
                />
              </div>
            </>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MsTableView;
