import { SyncOutlined } from '@ant-design/icons';
import { useMount, useUpdateEffect } from 'ahooks';
import { Select, Spin, Tabs } from 'antd';
import { isString, merge, pick, uniqBy } from 'lodash-es';
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import Department from './components/Department';
import { DEFAULT_PAGINATION_PARAMS, DEFAULT_RESOURCE_FIELD_NAMES } from './config';
import useFetchResource from './hooks/useFetchResource';
import './style.less';
import type {
  DataType,
  DepartmentSelectType,
  LabelValue,
  MsResourceGroupProps,
  MsResourceGroupRef,
} from './types';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import { useLocale } from '@jaytam/antd-ms/locale';

const MsResourceGroup = forwardRef((props: MsResourceGroupProps, ref: MsResourceGroupRef) => {
  const { fieldProps } = props;
  const {
    value,
    onChange,
    enterpriseCentre,
    extra = true,
    resourceRequest,
    resourceParams: _resourceParams,
    resourceFiledNames,
    resourceValueEnumFiledNames,
    resourcePostRes,
    labelInValue,
    defaultValue,
    codeInLabel,
    actionRef,
    style,
  } = fieldProps ?? {};

  // 选择的资源组
  const [resourceValue, setResourceValue] = useState<LabelValue>();

  const [options, setOptions] = useState<DataType[]>([]);

  // 控制下拉框的显隐
  const [open, setOpen] = useState(false);

  // 部门组件的actionRef
  const departmentRef = useRef<DepartmentSelectType>(null);

  //资源组的请求参数
  const [resourceParams, setResourceParams] = useState({
    ...DEFAULT_PAGINATION_PARAMS,
    ...(_resourceParams ?? {}),
  });

  const _resourceValueEnumFiledNames = merge(
    DEFAULT_RESOURCE_FIELD_NAMES,
    resourceValueEnumFiledNames,
  );
  // 获取资源组的options
  const {
    loading,
    data: resourceData,
    refresh,
  } = useFetchResource({
    params: resourceParams,
    request: resourceRequest,
    postRes: resourcePostRes,
    fieldNames: resourceFiledNames,
    valueEnumFiledNames: _resourceValueEnumFiledNames,
    codeInLabel,
  });

  const { currentLocale } = useLocale('MsResourceGroup');

  useUpdateEffect(() => {
    const list = resourceData?.data ?? [];
    // 转换资源组标识的值
    list.forEach((item: DataType) => {
      item.resourceCode = item[_resourceValueEnumFiledNames?.resourceCode];
    });
    const opts = [...options, ...list];
    // 给options去重
    setOptions(uniqBy(opts, 'value'));
    //如果当前参数是第一页并且没有value，默认选中第一项功能
    if (props?.fieldProps?.defaultSelectFirst && resourceParams?.pageNo === 1 && !resourceValue) {
      setResourceValue(pick(opts[0], ['label', 'value']));
      onChange?.(labelInValue ? pick(opts[0], ['label', 'value']) : opts[0]?.value);
    }
  }, [resourceData]);

  // 更新resource value
  const updateValue = (val?: string | LabelValue) => {
    if (isString(val)) {
      setResourceValue({ value: val });
    } else {
      setResourceValue(val);
    }
  };

  useMount(() => {
    // defaultValue和value初始化时合并
    const val = value !== undefined ? value : defaultValue;
    updateValue(val);
  });

  // 当value变更时
  useUpdateEffect(() => {
    updateValue(value);
  }, [value]);

  // 刷新资源组
  const handleRefresh = () => {
    setOptions([]);
    // 如果当前为第一页则强制请求，如果不是则改变参数为第一页，检测到参数变更自动重新请求
    if (resourceParams.pageNo === 1) {
      refresh();
    } else {
      setResourceParams({ ...resourceParams, pageNo: 1 });
    }

    // 开通企业中心刷新root部门
    if (enterpriseCentre) {
      departmentRef?.current?.refreshRootDepartment?.();
    }
  };

  // 点击加载更多的事件
  const handleClickLoadMore = () => {
    setResourceParams({ ...resourceParams, pageNo: resourceData?.current + 1 });
  };

  // 资源组change事件
  const handleResourceChange = (val: LabelValue) => {
    setResourceValue(val);
    onChange?.(labelInValue ? val : val?.value);
  };

  useImperativeHandle(actionRef, () => ({
    reload: handleRefresh,
  }));

  const { getPopupContainer } = useFieldPopupContainer();

  //加载更多
  const loadMoreRender = useMemo(() => {
    // 定义加载更多为null
    let loadMore = null;
    // 如果在加载中并且_options有值则渲染loading效果
    if (loading && options.length > 0) {
      loadMore = <Spin size="small" />;
    } else if (resourceData?.current < Math.ceil(resourceData?.total / resourceData?.pageSize)) {
      // 如果当前页码小于分页数则渲染加载更多
      loadMore = <a onClick={handleClickLoadMore}>{currentLocale.loadMore}</a>;
    }
    return loadMore ? (
      <div style={{ height: '32px', textAlign: 'center', lineHeight: '32px' }}>{loadMore}</div>
    ) : null;
  }, [resourceData, loading, currentLocale]);

  // 自定义下拉框内容
  const dropdownRender = (menu: React.ReactNode) => {
    const items = [
      {
        label: currentLocale.nameSelect,
        key: '1',
        children: (
          <>
            {menu}
            {loadMoreRender}
          </>
        ),
      },
      {
        label: currentLocale.departmentSelect,
        key: '2',
        children: (
          <Department
            {...fieldProps}
            departmentRef={departmentRef}
            setOpen={setOpen}
            resourceValue={resourceValue}
            resourceChange={handleResourceChange}
          />
        ),
      },
    ];

    // 开通企业中心
    if (enterpriseCentre) {
      return <Tabs defaultActiveKey="1" className="ms-resource-tabs" items={items} />;
    }
    return (
      <>
        {menu}
        {loadMoreRender}
      </>
    );
  };

  const selectDom = (
    <>
      <Select
        open={open}
        value={resourceValue}
        onChange={handleResourceChange}
        onDropdownVisibleChange={(visible) => setOpen(visible)}
        style={{ width: '100%', ...style }}
        ref={ref}
        loading={loading}
        optionFilterProp={'label'}
        showSearch
        allowClear
        labelInValue
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        notFoundContent={null}
        getPopupContainer={getPopupContainer}
        options={options}
        dropdownRender={dropdownRender}
      />
      {extra && (
        <div style={{ marginTop: '4px' }}>
          <span>
            <a onClick={handleRefresh}>
              <SyncOutlined style={{ marginRight: '4px' }} />
              {currentLocale.flush}{' '}
            </a>
          </span>
          {currentLocale.addTip}{' '}
          <a href="/resource/resourceGroup" target="_blank">
            {currentLocale.toCreate}&gt;
          </a>
        </div>
      )}
    </>
  );

  const editDom = selectDom;

  const readDom = labelInValue ? (value as LabelValue)?.label : (value as string);

  return useModeRender(props, editDom, readDom);
});

export default enhanceField(MsResourceGroup);
