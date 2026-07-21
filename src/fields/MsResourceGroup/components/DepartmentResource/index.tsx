import { useDeepCompareEffect } from 'ahooks';
import { Spin } from 'antd';
import { find, merge, pick, uniqBy } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGINATION_PARAMS, DEPARTMENT_RESOURCE_FIELD_NAMES } from '../../config';
import useFetchResource from '../../hooks/useFetchResource';
import type { DataType, LabelValue, ResourceGroupProps } from '../../types';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type DepartmentResourceProps = ResourceGroupProps & {
  departmentId?: string;
  resourceValue?: LabelValue;
  resourceChange?: (val: LabelValue) => void;
  setOpen?: (open: boolean) => void;
};

const DepartmentResource = (props: DepartmentResourceProps) => {
  const {
    departmentId,
    dResourceRequest,
    dResourceParams = {},
    dResourcePostRes,
    dResourceValueEnumFiledNames,
    dResourceFiledNames,
    resourceValue,
    resourceChange,
    setOpen,
  } = props;

  const { currentLocale } = useLocale('MsResourceGroup');

  //资源组的请求参数
  const [resourceParams, setResourceParams] = useState({
    ...DEFAULT_PAGINATION_PARAMS,
    departmentId: departmentId,
    ...dResourceParams,
  });

  // 资源组的数据转换参数
  const resourceFiledNames = merge(DEPARTMENT_RESOURCE_FIELD_NAMES, dResourceValueEnumFiledNames);
  // 获取资源组的options
  const { loading, data: resourceData } = useFetchResource({
    params: resourceParams,
    fieldNames: dResourceFiledNames,
    request: dResourceRequest,
    postRes: dResourcePostRes,
    valueEnumFiledNames: resourceFiledNames,
  });

  const [options, setOptions] = useState<DataType[]>([]);

  useEffect(() => {
    setOptions([]);
    setResourceParams({ ...resourceParams, pageNo: 1, departmentId: departmentId });
  }, [departmentId]);

  useDeepCompareEffect(() => {
    const list = resourceData?.data ?? [];
    // 转换资源组标识的值
    list.forEach((item: DataType) => {
      item.resourceCode = item[resourceFiledNames?.resourceCode];
    });
    const opts = [...options, ...list];
    const val = find(opts, { value: resourceValue?.value });
    if (val) {
      resourceChange?.({ ...resourceValue, ...pick(val, ['label', 'value']) });
    }
    // 给options去重
    setOptions(uniqBy(opts, 'value'));
  }, [resourceData]);

  // 点击加载更多的事件
  const handleClickLoadMore = () => {
    setResourceParams({ ...resourceParams, pageNo: resourceData?.current + 1 });
  };

  //加载更多渲染
  const loadMoreRender = useMemo(() => {
    // 定义加载更多为null
    let loadMore = null;
    if (options.length > 0) {
      // 如果在加载中并且_options有值则渲染loading效果
      if (loading) {
        loadMore = <Spin size="small" />;
      } else if (resourceData?.current < Math.ceil(resourceData?.total / resourceData?.pageSize)) {
        // 如果当前页码小于分页数则渲染加载更多
        loadMore = <a onClick={handleClickLoadMore}>{currentLocale.loadMore}</a>;
      }
    }
    return loadMore ? (
      <div style={{ height: '32px', textAlign: 'center', lineHeight: '32px' }}>{loadMore}</div>
    ) : null;
  }, [options, loading]);

  // 选择某个资源组的事件
  const handleClickResource = (item: DataType) => {
    resourceChange?.({ label: item?.label, value: item?.value });
    setOpen?.(false);
  };

  if (loading && !options.length) {
    return (
      <div
        style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Spin size="small" />
      </div>
    );
  }

  return (
    <>
      {options.map((item) => {
        return (
          <div
            className={`department-resource-option ${
              resourceValue?.value === item?.value ? 'department-resource-option-select' : ''
            }`}
            key={item?.value}
            title={item?.label}
            onClick={() => handleClickResource(item)}
          >
            {item?.label}
          </div>
        );
      })}
      {loadMoreRender}
    </>
  );
};

export default DepartmentResource;
