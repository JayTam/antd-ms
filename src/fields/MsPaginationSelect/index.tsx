import { useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { DEFAULT_PAGINATION_FIELD_NAMES } from '@jaytam/antd-ms/components/MsTable/constants';
import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { useRequest } from 'ahooks';

import type { InputProps } from 'antd';
import { Col, Divider, Input, Row, Select, Skeleton, Spin } from 'antd';
import { isFunction, merge } from 'lodash-es';
import { forwardRef, useState } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import Pagination from './components/Pagination';
import type { MsPaginationSelectProps, MsPaginationSelectRef } from './types';
import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * Select 选择器组件
 */
const MsPaginationSelect = forwardRef(
  (props: MsPaginationSelectProps, ref: MsPaginationSelectRef) => {
    const { request, params, debounceTime = 500, postRes, valueEnumFiledNames } = props;
    const { fieldProps } = props;

    const { valuesNormal } = useMsFormContext();
    const { currentLocale } = useLocale('MsPaginationSelect');

    const SEARCH_KEY = fieldProps?.searchKey ?? 'searchKey';

    const FIELD_NAMES = merge({ ...DEFAULT_PAGINATION_FIELD_NAMES }, fieldProps?.fieldNames);

    const [query, setQuery] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
      [SEARCH_KEY]: fieldProps?.searchInputProps?.defaultValue,
    });

    const { mode } = useFieldModeContext(props);

    const paginationRequest = async (paginationParams: any) => {
      const requestParams = {
        [FIELD_NAMES.current]: query.current,
        [FIELD_NAMES.pageSize]: query.pageSize,
        [SEARCH_KEY]: query[SEARCH_KEY],
        ...params,
        ...paginationParams,
      };
      const res = await request?.(requestParams);
      let data: any;
      if (isFunction(postRes)) {
        data = postRes?.(res) ?? res;
      } else {
        data = {
          data: res?.data?.[FIELD_NAMES.data],
          pageSize: res?.data?.[FIELD_NAMES.pageSize],
          total: res?.data?.[FIELD_NAMES.total],
        };
      }
      data.data = valueEnumToOptions(data.data, valueEnumFiledNames, valuesNormal);

      setQuery((prev) => ({ ...prev, total: data.total }));
      return data;
    };

    const { loading, data, run } = useRequest<any, any>(paginationRequest, {
      debounceWait: debounceTime,
      refreshDeps: [JSON.stringify(params)],
    });

    const handleSearchChange: InputProps['onChange'] = (event) => {
      const value = event.target.value === '' ? undefined : event.target.value;
      const newPrams = { current: 1, [SEARCH_KEY]: value };
      setQuery((prev) => ({ ...prev, ...newPrams }));
      run({ ...newPrams });
    };

    const editDom = (
      <Select
        allowClear
        {...fieldProps}
        ref={ref}
        loading={loading}
        options={data?.data}
        showSearch={false}
        dropdownRender={(menu) => (
          <div
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onMouseDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div style={{ padding: '8px' }}>
              <Input
                value={query[SEARCH_KEY]}
                onChange={handleSearchChange}
                size="small"
                placeholder={currentLocale.search}
                allowClear
                {...fieldProps?.searchInputProps}
              />
            </div>

            <Spin spinning={loading}>{menu}</Spin>

            <Divider style={{ margin: '8px 0' }} />
            <Row justify="space-between" style={{ padding: '4px 8px' }}>
              <Col>{fieldProps?.dropdownFooterLeftRender}</Col>
              <Col>
                <Pagination
                  current={query.current}
                  pageSize={query.pageSize}
                  total={query.total}
                  onChange={(page, pageSize) => {
                    const newParmas = { current: page, pageSize };
                    setQuery((prev) => ({ ...prev, ...newParmas }));
                    run({ ...query, ...newParmas });
                  }}
                />
              </Col>
            </Row>
          </div>
        )}
      />
    );

    const readDom = 'label';

    const dom = useModeRender(props, editDom, readDom);

    if (mode === 'read' && loading) {
      return <Skeleton.Input block active size="small" />;
    }

    return dom;
  },
);

export default enhanceField(MsPaginationSelect);
