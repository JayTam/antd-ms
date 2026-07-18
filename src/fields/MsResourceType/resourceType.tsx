import { Button, Checkbox, Col, Empty, Input, Row, Select, Space, Spin } from 'antd';
import { isArray, isNil } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

import ProductCheckbox from './ProductCheckbox';

import type { ResourceTypeOption, ResourceTypeProps } from './types';

import { useControllableValue, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import './index.less';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

function ResourceType(props: ResourceTypeProps) {
  const { initialLoading, options, loading, ...restProps } = props;

  const [value, onChange] = useControllableValue<string[]>(props);

  const [currentProductCode, setCurrentProductCode] = useState<string>();

  const [selectResourceTypes, setSelectResourceTypes] = useState<string[]>([]);
  const { currentLocale, globalLocale } = useLocale('MsResourceType');

  const [open, setOpen] = useState(false);

  const [searchText, setSearchText] = useState<string>();

  const { getPopupContainer } = useFieldPopupContainer();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      setSelectResourceTypes(value ?? []);
    } else {
      timer = setTimeout(() => {
        setSelectResourceTypes([]);
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [open, value]);

  /**
   * 重构树形结构，外层是产品分类，内层是资源类型
   */
  const productList = useMemo(() => {
    const list: ResourceTypeOption[] = [];
    options
      ?.filter((option) => {
        if (isNil(searchText) || searchText === '') {
          return true;
        } else {
          if (option.productName?.toUpperCase().includes(searchText?.toUpperCase())) {
            return true;
          } else {
            return option.label?.toUpperCase().includes(searchText?.toUpperCase());
          }
        }
      })
      ?.forEach((option) => {
        const index = list.findIndex((item) => item.productCode === option.productCode);
        if (index > -1) {
          const childrenList = list[index].children;
          if (isArray(childrenList)) {
            childrenList?.push(option);
          }
        } else {
          list.push({ ...option, children: [option] });
        }
      });

    return list;
  }, [options, searchText]);

  useUpdateEffect(() => {
    if (productList[0]) {
      setCurrentProductCode(productList[0].productCode);
    } else {
      setCurrentProductCode(undefined);
    }
  }, [productList]);

  /**
   * 当前选中的资源类型列表
   */
  const currentResourceTypeList = useMemo(() => {
    const index = productList.findIndex((product) => product.productCode === currentProductCode);
    if (index > -1) {
      return productList[index].children;
    } else {
      return [];
    }
  }, [productList, currentProductCode]);

  const ContentNode = (
    <>
      <Row>
        <Input
          size="small"
          value={searchText}
          onChange={(event) => setSearchText(event.target?.value)}
          allowClear
          placeholder={currentLocale.searchType}
          // @ts-ignore 强制设置状态，不受 FormItem 校验失败影响变成红色输入框
          status="default"
        />
      </Row>
      <Row className="resource-type-content" gutter={16}>
        {productList.length === 0 ? (
          <>
            <Row justify="center" style={{ padding: 30, width: '100%' }}>
              <Empty description={currentLocale.noType} />
            </Row>
          </>
        ) : (
          <>
            <Col className="product-container" span={10}>
              {productList.map((product) => (
                <ProductCheckbox
                  key={product.productCode}
                  product={product}
                  currentProductCode={currentProductCode}
                  setCurrentProductCode={setCurrentProductCode}
                  selectResourceTypes={selectResourceTypes}
                  setSelectResourceTypes={setSelectResourceTypes}
                />
              ))}
            </Col>
            <Col>
              <div className="line" />
            </Col>
            <Col className="resource-type-container" flex="auto">
              {currentResourceTypeList?.map((resourceType) => (
                <Row key={resourceType.value} className="resource-type-item">
                  <Checkbox
                    className="resource-type-name"
                    checked={selectResourceTypes?.includes(resourceType.value)}
                    onChange={(event) => {
                      const changeChecked = event.target?.checked;
                      if (changeChecked) {
                        setSelectResourceTypes([...selectResourceTypes, resourceType.value]);
                      } else {
                        setSelectResourceTypes?.(
                          selectResourceTypes?.filter((item) => item !== resourceType.value),
                        );
                      }
                    }}
                  >
                    {resourceType.label}
                  </Checkbox>
                </Row>
              ))}
            </Col>
          </>
        )}
      </Row>
      <div className="line-h" />
      <Row justify={'end'}>
        <Space>
          <Button size="small" onClick={() => setSelectResourceTypes([])}>
            {globalLocale.reset}
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => {
              onChange?.(selectResourceTypes);
              setOpen(false);
            }}
          >
            {globalLocale.ok}
          </Button>
        </Space>
      </Row>
    </>
  );

  const LoadingNode = (
    <Row justify="center" style={{ padding: 30 }}>
      <Spin />
    </Row>
  );

  return (
    <Select
      value={value}
      onChange={(value, option) => {
        onChange(value, option);
        setSelectResourceTypes(value);
      }}
      options={options as any}
      loading={loading}
      allowClear={true}
      {...restProps}
      dropdownMatchSelectWidth={false}
      dropdownRender={() => {
        return (
          <div className="resource-type-dropdown-container">
            {loading ? LoadingNode : ContentNode}
          </div>
        );
      }}
      mode="multiple"
      maxTagCount="responsive"
      maxTagPlaceholder={(values) =>
        replaceMessage(currentLocale.maxPlaceholder, { length: Object.values(values).length })
      }
      filterOption={false}
      open={open}
      showArrow={true}
      showSearch={false}
      onDropdownVisibleChange={setOpen}
      getPopupContainer={getPopupContainer}
      className={classNames(initialLoading ? 'initial-loading' : undefined, props.className)}
    />
  );
}

export default ResourceType;
