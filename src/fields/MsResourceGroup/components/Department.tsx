import { useUpdateEffect } from 'ahooks';
import { Col, Input, Row, Tree } from 'antd';
import { cloneDeep, includes, merge } from 'lodash-es';
import React, { useImperativeHandle, useMemo, useState } from 'react';
import useFieldRequest from '../../../hooks/useFieldRequest';
import { DEPARTMENT_FIELD_NAMES } from '../config';
import type {
  DataNode,
  DataType,
  DepartmentSelectType,
  LabelValue,
  ResourceGroupProps,
} from '../types';
import queryDepartment from '../utils/queryDepartment';
import { highLight } from '../utils/searchResource';
import { parsingToTreeOptions } from '../utils/valueEnumFiled';
import DepartmentResource from './DepartmentResource';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import { useLocale } from '@jaytam/antd-ms/locale';

type DepartmentSelectProps = ResourceGroupProps & {
  resourceValue?: LabelValue;
  resourceChange: (val: LabelValue) => void;
  setOpen?: (open: boolean) => void;
  departmentRef?: React.Ref<DepartmentSelectType>;
};

const DepartmentSelect = (props: DepartmentSelectProps) => {
  const {
    rootRequest,
    rootParams,
    rootValueEnumFiledNames,
    rootPostRes,
    departmentRequest,
    departmentParams,
    departmentValueEnumFiledNames,
    departmentPostRes,
    departmentRef,
  } = props;

  const { valuesNormal } = useMsFormContext();

  // 部门root的转换信息
  const _rootValueEnumFiledNames = merge(DEPARTMENT_FIELD_NAMES, rootValueEnumFiledNames);

  // 子部门的转换信息
  const _departmentValueEnumFiledNames = merge(
    DEPARTMENT_FIELD_NAMES,
    departmentValueEnumFiledNames,
  );

  // root部门的请求
  const {
    options: rootOptions,
    loading: rootLoading,
    refreshRequest,
  } = useFieldRequest({
    request: rootRequest,
    params: rootParams,
    cacheRequest: false,
    postRes:
      rootPostRes ??
      ((res) => {
        return [res.data];
      }),
    valueEnumFiledNames: _rootValueEnumFiledNames,
  });

  const { currentLocale } = useLocale('MsResourceGroup');

  //部门树的数据
  const [treeData, setTreeData] = useState<DataNode[]>();
  //当前点击的部门id
  const [departmentId, setDepartmentId] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();

  // 当root部门options改变时，重设部门树的数据
  useUpdateEffect(() => {
    setTreeData(parsingToTreeOptions(rootOptions));
  }, [rootOptions]);

  // 计算并更新部门树的数据
  const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
    list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });

  const onLoadData = async ({ key, children }: any) => {
    if (children) {
      return;
    }
    const data = await queryDepartment(
      {
        request: departmentRequest,
        params: merge({ departmentId: key }, departmentParams),
        postRes: departmentPostRes,
        valueEnumFiledNames: _departmentValueEnumFiledNames,
      },
      valuesNormal,
    );
    setTreeData((origin) => updateTreeData(origin as DataNode[], key, parsingToTreeOptions(data)));
  };

  // 选择树节点时的函数
  const onSelectDepartment = (selectedKeys: React.Key[]) => {
    setDepartmentId(selectedKeys[0] as string);
  };

  // 搜索框的值改变时
  const searchChange = (e: DataType) => {
    const val = e?.target?.value;
    setSearchValue(val);
  };

  // 当树的原始数据变更或者搜索值变更时，重新组合树的值
  const treeList = useMemo(() => {
    const loop = (data: DataType[]) => {
      if (!(data && data.length)) {
        return;
      }
      const newChildren: DataType[] = [];
      data.forEach((item) => {
        if (includes(item?.title, searchValue)) {
          item.title = highLight(item?.title, searchValue);
          newChildren.push(item);
          item.children = loop(item.children);
        } else {
          const subs = loop(item.children);
          if ((subs && subs.length) || includes(item.title, searchValue)) {
            item.children = subs;
            newChildren.push(item);
          }
        }
      });
      return newChildren;
    };
    if (!searchValue) {
      return treeData;
    }
    return loop(cloneDeep(treeData) ?? []);
  }, [treeData, searchValue]);

  useImperativeHandle(departmentRef, () => ({
    refreshRootDepartment: refreshRequest,
  }));

  return (
    <>
      <Row>
        <Col span={12} style={{ borderRight: '1px solid #f0f0f0', padding: '12px' }}>
          <Input.Search
            style={{ marginBottom: '12px' }}
            onChange={searchChange}
            placeholder={currentLocale.inputDepartment}
          />
          <Tree
            loadData={onLoadData}
            style={{ maxHeight: '256px', overflowY: 'scroll' }}
            treeData={treeList}
            onSelect={onSelectDepartment}
          />
        </Col>
        <Col span={12} style={{ padding: '12px', maxHeight: '320px', overflowY: 'scroll' }}>
          {departmentId && <DepartmentResource departmentId={departmentId} {...props} />}
        </Col>
      </Row>
    </>
  );
};

export default DepartmentSelect;
