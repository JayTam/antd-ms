import type { MsFormColumns } from '@jaytam/antd-ms';
import MsConfirm from '@jaytam/antd-ms/components/MsConfirm';
import MsDrawer from '@jaytam/antd-ms/components/MsDrawer';
import MsEmpty from '@jaytam/antd-ms/components/MsEmpty';
import MsBaseForm from '@jaytam/antd-ms/components/MsForm/components/MsBaseForm';
import MsAggrForm from '@jaytam/antd-ms/components/MsForm/forms/MsAggrForm';
import MsTagsForm from '@jaytam/antd-ms/components/MsForm/forms/MsTagsForm';
import { isRequired } from '@jaytam/antd-ms/components/MsForm/utils/validate';
import MsModal from '@jaytam/antd-ms/components/MsModal';
import useFilterNumber from '@jaytam/antd-ms/components/MsTable/hooks/useFilterNumber';
import type { MsTableColumnsNoGroup } from '@jaytam/antd-ms/components/MsTable/types';
import { ViewModal } from '@jaytam/antd-ms/components/MsViewList/components/ViewModal';
import {
  FIELD_NAMES,
  getViewFormSaveDefaultMenu,
} from '@jaytam/antd-ms/components/MsViewList/constants';
import type { MsViewListItemType } from '@jaytam/antd-ms/components/MsViewList/types';
import { mergeMenu } from '@jaytam/antd-ms/components/MsViewList/utils';
import {
  MsArrowDownDoubleOutlined,
  MsArrowRightTopOutlined,
  MsCancelFilled,
  MsScreenOutlined,
} from '@jaytam/icons';
import { useControllableValue, useEventListener, useMemoizedFn, useMount } from 'ahooks';
import { Badge, Button, Col, Form, Row, Space, Spin, Tooltip } from 'antd';
import classNames from 'classnames';
import { isNil } from 'lodash-es';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { COLUMN_KEY } from '../../../MsTableColumnContainer/utils/column';
import { EditingActionController } from '../../../MsTableEditable';
import { resolveFilterColumns } from '../../utils';
import { MsConfirmModal } from './components/MsConfirmModal';
import { MsFormColumnSetDrawer } from './components/MsFormColumnSetDrawer';
import './index.less';
import type { FieldListType, MsTableViewFormProps, ViewFormSaveType } from './types';
import {
  diffKeColumnsFun,
  filterEmptyAttr,
  inQueryColumnsFun,
  isElementInContainerViewport,
  removeColumnsItem,
  selectColumnsFun,
} from './utils';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsTableViewForm<P, R, D>(props: MsTableViewFormProps<P, R, D>) {
  const { form: formInstance, columns = [], extraProps = {}, initialValues, ...formProps } = props;
  const { searchConfig, creatorRender, toolRender, query, viewForm = {} } = extraProps;
  const MS_VIEW_FORM_ITEM_WRAPPER = 'ms-view-form-item-wrapper';
  const {
    tableColumns: table,
    isShowTabs = false,
    saveBtnDropdown = [],
    viewItemData,
    onSaveView,
    onSaveAsNewView,
    onRefreshMsView,
    fieldNames: _fieldNames,
    style = {},
    actionRef,
    className,
    drawerProps,
    loading = false,
    defaultValue,
    clearFieldsKeepDefaultVal = false,
    maxLine = 4,
    SaveBtn,
    ResetBtn,
    setShowBtn,
    ViewNameTitle,
  } = viewForm || {};
  const formAction = useRef(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const lastFormItemRef = useRef<HTMLDivElement>(null);
  const [showArrowDownIcon, setShowArrowDownIcon] = useState(false);
  const fieldNames = useMemo(() => ({ ...FIELD_NAMES, ..._fieldNames }), [_fieldNames]);
  const [openAdvanceForm, setOpenAdvanceForm] = useState(false);

  const { currentLocale, globalLocale } = useLocale('MsViewList');

  // 视图表单数据
  const [fieldList, setFieldList] = useControllableValue<FieldListType>(viewForm, {
    defaultValue: [],
    valuePropName: 'fieldList',
  });

  const [form] = Form.useForm(formInstance);
  // 请求表单
  const handleSubmit = useCallback(() => {
    form.submit();
  }, [form]);

  // 设置diffKey
  const diffKeColumns = useMemo(() => diffKeColumnsFun(columns), [columns]);

  // 筛选出已选择的表单展示
  const selectColumns = useMemo(
    () => selectColumnsFun(diffKeColumns, fieldList),
    [diffKeColumns, fieldList],
  );
  // 当前所有表单的dataIndex
  const searchKeyList = useMemo(() => {
    return (
      selectColumns
        ?.map((item) => item?.dataIndex || item?._key)
        ?.filter((item) => Boolean(item)) || []
    );
  }, [selectColumns]);

  // 过滤column
  const { searchColumns: tableColumns } = useMemo(
    () => resolveFilterColumns(selectColumns),
    [selectColumns],
  );

  // 所有表单项
  const formColumns = tableColumns.map((column: any) => {
    const diffKey = column[COLUMN_KEY];
    const disabled = column?.columnSet?.disabled ?? false;
    return {
      ...column,
      _fieldProps: (fieldProps: any) => {
        return {
          getPopupContainer: () => document.body,
          ...fieldProps,
          // 添加关闭按钮
          suffixRender: (
            // 占位
            <div style={{ width: 10, marginLeft: -8 }}>
              {!disabled && (
                <Tooltip title={currentLocale.deleteCondition}>
                  <MsCancelFilled
                    className="ms-view-form-item-del"
                    onClick={() => {
                      setShowBtn?.(true);
                      setFieldList?.((p) => p.filter((item) => item.dataIndex !== diffKey));
                    }}
                  />
                </Tooltip>
              )}
            </div>
          ),
        };
      },
    };
  }) as MsFormColumns;
  // 聚合筛选器(设置showInQuery才可显示)
  const inQueryColumns = useMemo(() => inQueryColumnsFun(tableColumns), [tableColumns]);

  // 是否展示空状态
  const showEmpty = useMemo(
    () => !!removeColumnsItem(fieldList, searchKeyList)?.length,
    [fieldList, searchKeyList],
  );
  // 已筛选项目数量
  const filterNum = useFilterNumber(formColumns, query);
  // 打开选择Columns的弹窗
  const openDrawer = () => {
    MsDrawer.open(MsFormColumnSetDrawer, {
      ...viewForm,
      columns: diffKeColumns,
      drawerProps,
      fieldList,
      setFieldList: (v: FieldListType) => {
        setShowBtn?.(true);
        setFieldList?.(v);
      },
    });
  };

  //  组装新的数据返回(保存使用)
  const getFormFiledParams = useMemoizedFn(() => {
    const obj = form.getFieldsValue() || {};
    const formData = removeColumnsItem(fieldList, searchKeyList)?.map((item) => {
      const newItem = { ...item };
      if (obj.hasOwnProperty(item.dataIndex)) {
        // @ts-ignore
        newItem.value = obj[item.dataIndex];
      }
      return newItem;
    });
    const data = {
      fields: {
        form: formData || [],
        table: table || [],
      },
    };
    return data;
  });

  // 重置表单
  const handleRest = useCallback(async () => {
    const res = defaultValue ?? [];
    setFieldList?.(res);
    const newValues = res.reduce((acc: any, item: any) => {
      acc[item.dataIndex] = item.value ? item.value : undefined;
      return acc;
    }, {});
    formProps.onClear?.();
    form.setFieldsValue(newValues);
    setShowBtn?.(false);
  }, [defaultValue, form, formProps, setFieldList, setShowBtn]);

  // 刷新数据并关闭保存按钮
  const handleRefresh = useCallback(() => {
    onRefreshMsView?.();
    setShowBtn?.(false);
  }, [onRefreshMsView, setShowBtn]);

  // 打开保存弹窗
  const openSaveModal = useCallback(
    (type: ViewFormSaveType) => {
      MsConfirm.open(MsConfirmModal, {
        data: {
          ...viewItemData,
          ...getFormFiledParams(),
        },
        type,
        onFinish: onSaveView,
        onRefresh: handleRefresh,
        title: currentLocale.confirmOverwrite,
        content: currentLocale.tipOverwrite,
      });
    },
    [getFormFiledParams, handleRefresh, onSaveView, viewItemData, currentLocale],
  );
  // 打开另存为弹窗
  const openSaveAsModal = useCallback(
    (type: ViewFormSaveType) => {
      MsModal.open(ViewModal, {
        data: {
          ...getFormFiledParams(),
          [fieldNames.title]: '',
        },
        fieldNames,
        type,
        handleRefresh,
        onViewAction: onSaveAsNewView,
      });
    },
    [fieldNames, getFormFiledParams, handleRefresh, onSaveAsNewView],
  );
  const renderMenu = useCallback(
    (data: MsViewListItemType) => {
      const VIEW_FORM_SAVE_DEFAULT_MENU = getViewFormSaveDefaultMenu(currentLocale);
      const res =
        typeof saveBtnDropdown === 'function'
          ? mergeMenu(saveBtnDropdown(data), VIEW_FORM_SAVE_DEFAULT_MENU)
          : mergeMenu(saveBtnDropdown, VIEW_FORM_SAVE_DEFAULT_MENU);
      return res.filter((item) => !Boolean(item?.hidden));
    },
    [saveBtnDropdown, currentLocale],
  );
  useMount(() => {
    handleSubmit();
  });

  // 点击菜单
  const handleMenu = useCallback(
    (menuInfo: MenuInfo) => {
      const { key, domEvent } = menuInfo;
      switch (key) {
        case 'save':
          openSaveModal(key);
          break;
        case 'saveAs':
          openSaveAsModal(key);
          break;
        default:
          break;
      }
      domEvent?.stopPropagation();
    },
    [openSaveAsModal, openSaveModal],
  );
  // 清空字段
  const clearFields = () => {
    const fieldDataList = (tableColumns as MsTableColumnsNoGroup)
      ?.filter((column) => !isRequired(column, form))
      ?.filter((column) => !isNil(column.dataIndex))
      ?.map((column) => ({ name: column.dataIndex, value: undefined }));
    form.setFields(fieldDataList);
    formProps?.onClear?.();
  };

  // 清空字段保留默认值
  const clearNotDefaultFields = () => {
    const newValues = fieldList
      ?.filter((item) => item?.value)
      ?.reduce((acc: any, item: any) => {
        acc[item.dataIndex] = item?.value;
        return acc;
      }, {});
    formProps?.onClear?.();
    form.setFieldsValue(newValues);
  };

  // 聚合表单
  const AggrForm = useMemo(() => {
    return (
      <EditingActionController>
        <MsAggrForm
          {...formProps}
          form={form}
          isShowValueInField
          columns={inQueryColumns}
          searchConfig={searchConfig}
          // 关闭表单缓存，使用table缓存
          disabledFieldCache
        />
      </EditingActionController>
    );
  }, [form, formProps, inQueryColumns, searchConfig]);

  // 高级筛选
  const AdvancedFilter = useMemo(() => {
    return (
      <EditingActionController>
        <Badge className="ms-table-filter-num-badge" color="#388eff" count={filterNum}>
          <Button
            icon={
              openAdvanceForm ? (
                <MsArrowRightTopOutlined style={{ transform: 'rotate(270deg)' }} />
              ) : (
                <MsScreenOutlined />
              )
            }
            onClick={() => setOpenAdvanceForm((prev) => !prev)}
          >
            {currentLocale.advancedFilter}
          </Button>
        </Badge>
      </EditingActionController>
    );
  }, [filterNum, openAdvanceForm, currentLocale]);

  // 视图类型为topTabs时的头部组件
  const TabsHeader = useMemo(() => {
    return (
      <>
        <Row justify="space-between" align="middle">
          <Col>
            <Space style={{ position: 'relative', top: '-7px' }}>
              {AggrForm}
              {AdvancedFilter}
            </Space>
          </Col>
          <Col>
            <Space>
              {toolRender}
              {creatorRender}
            </Space>
          </Col>
        </Row>
      </>
    );
  }, [AdvancedFilter, AggrForm, creatorRender, toolRender]);

  // 视图类型为leftMenu时的头部组件
  const MenuHeader = useMemo(() => {
    return (
      <Row justify="space-between">
        <Col>
          <Space>
            {ViewNameTitle}
            {SaveBtn}
            {ResetBtn}
          </Space>
        </Col>
        <Col
          style={{
            height: '48px',
            display: 'flex',
            alignItems: 'start',
          }}
        >
          <Space>
            {AggrForm}
            {AdvancedFilter}
            {toolRender}
            {creatorRender}
          </Space>
        </Col>
      </Row>
    );
  }, [AdvancedFilter, AggrForm, ResetBtn, SaveBtn, ViewNameTitle, creatorRender, toolRender]);

  // 处理是否显示下拉箭头Icon
  const handleShowArrowDownIcon = () => {
    if (!formContentRef.current || !lastFormItemRef.current) {
      return;
    }

    const inViewport = isElementInContainerViewport(
      lastFormItemRef.current,
      formContentRef.current,
    );

    setShowArrowDownIcon(!inViewport);
  };

  useEffect(handleShowArrowDownIcon, [formColumns.length, openAdvanceForm]);
  useEventListener('scroll', handleShowArrowDownIcon, { target: formContentRef });
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [openAdvanceForm]);

  // 将打开排序弹窗和置顶操作抛出去方便外部调用
  useImperativeHandle(actionRef, () => ({
    getFormFiledParams,
    handleMenu,
    renderMenu,
    handleRest,
  }));

  return (
    <Spin spinning={loading}>
      <div style={style} className={className}>
        {isShowTabs ? TabsHeader : MenuHeader}
        <div>
          <div
            className={classNames({
              'ms-view-form-container': true,
              open: openAdvanceForm,
            })}
          >
            <EditingActionController fullWidth>
              {!showEmpty && (
                <MsEmpty
                  description={
                    <>
                      {currentLocale.noCondition}
                      <span
                        onClick={openDrawer}
                        style={{
                          color: '#006eff',
                          cursor: 'pointer',
                          marginLeft: 6,
                        }}
                      >
                        {currentLocale.toAdd}
                      </span>
                    </>
                  }
                />
              )}
              <div>
                <MsBaseForm
                  layout="horizontal"
                  colon={false}
                  {...formProps}
                  contentRef={formContentRef}
                  contentClassName={MS_VIEW_FORM_ITEM_WRAPPER}
                  onValuesChange={(changedValues, allValues) => {
                    setShowBtn?.(true);
                    formProps?.onValuesChange?.(changedValues, allValues);
                  }}
                  rowProps={{
                    gutter: 32,
                    style: {
                      maxHeight: `${48 * maxLine + 2}px`,
                      paddingTop: formColumns?.length > maxLine * 2 ? '1px' : '0px',
                    },
                  }}
                  actionRef={formAction}
                  className={classNames('ms-view-form', formProps.className)}
                  style={formProps?.style ?? searchConfig?.style}
                  form={form}
                  columns={[
                    ...formColumns,
                    // 最后一个表单项：用来判断是否滚动到底部，勿删
                    {
                      title: '',
                      formItemProps: { className: 'ms-view-form-item-last' },
                      fieldRender: () => {
                        return <div ref={lastFormItemRef} />;
                      },
                    },
                  ]}
                  loading={false}
                  successNotify={false}
                  setLoading={() => {}}
                  column={searchConfig?.column ?? 2}
                  footerRender={
                    showEmpty && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          flexDirection: 'column',
                        }}
                      >
                        {/* 下拉箭头 */}
                        {showArrowDownIcon ? (
                          <div className="ms-arrow-down-double-wrap">
                            <MsArrowDownDoubleOutlined
                              style={{ color: '#106FFB' }}
                              onClick={() => {
                                formContentRef.current?.scrollTo({
                                  behavior: 'smooth',
                                  top: formContentRef.current?.scrollHeight,
                                });
                              }}
                            />
                          </div>
                        ) : null}
                        {/* 按钮容器 */}
                        <div className="ms-view-btn-wrap">
                          <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => setOpenAdvanceForm(false)}
                          >
                            {currentLocale.foldFilter}
                          </Button>
                          <Button onClick={openDrawer}>{currentLocale.addCondition}</Button>
                          <Button type="primary" onClick={handleSubmit}>
                            {globalLocale.query}
                          </Button>
                        </div>
                      </div>
                    )
                  }
                  labelCol={{ flex: searchConfig?.labelWidth, ...formProps?.labelCol }}
                />
              </div>
            </EditingActionController>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <MsTagsForm
              form={form}
              query={filterEmptyAttr(form.getFieldsValue(true))}
              columns={tableColumns as MsFormColumns}
              onClear={() => {
                if (clearFieldsKeepDefaultVal) {
                  clearNotDefaultFields();
                } else {
                  clearFields();
                }
                form.submit();
                setShowBtn?.(true);
              }}
              searchConfig={searchConfig}
              onDelete={() => setShowBtn?.(true)}
              // 关闭表单缓存，使用table的缓存
              disabledFieldCache
            />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default MsTableViewForm;
