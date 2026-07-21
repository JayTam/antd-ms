import { SearchOutlined } from '@ant-design/icons';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { Button, Input } from 'antd';
import { isNil, isUndefined } from 'lodash-es';
import { useMemo, useRef, useState } from 'react';
import AggrSelect from './AggrSelect';

import './index.less';
import MsAggrField from './MsAggrField';
import type { MsAggrFieldActionType } from './MsAggrField/types';

import { useUpdateEffect } from 'ahooks';
import type { MsAggrFormProps } from './types';
import { LEGAL_VALUE_TYPES } from './utils';

/**
 * 聚合筛选器，本质上不是一个表单，所以不对外暴露
 * @param props
 * @returns
 */
function MsAggrForm<P, R, D>(props: MsAggrFormProps<P, R, D>) {
  const { columns = [], form, isShowValueInField = false } = props;

  const options = useMemo(() => {
    return (
      columns
        // 过滤不合法类型
        ?.filter(({ valueType = 'text' }) => LEGAL_VALUE_TYPES.includes(valueType))
        // 过滤没设置dataIndex
        ?.filter(({ dataIndex }) => !isNil(dataIndex))
        // 过滤自定义组件
        ?.filter(({ fieldReadRender }) => isUndefined(fieldReadRender))
        ?.map((column) => ({
          key: column.dataIndex?.toString() ?? '',
          label: column.title,
        }))
        ?.filter((item) => {
          if (isNil(item.key)) {
            return false;
          }
          if (item.key === '') {
            return false;
          }
          return true;
        })
    );
  }, [columns]);

  const [selectKey, setSelectKey] = useState<string | undefined>(options?.[0]?.key);
  const fieldActionRef = useRef<MsAggrFieldActionType>(null);

  useUpdateEffect(() => {
    const isIn = options.some((item) => item.key === selectKey);
    if (!selectKey || !isIn) {
      setSelectKey(options?.[0]?.key);
    }
  }, [options, selectKey]);

  const currentColumn = useMemo(() => {
    return cloneDeepWithReactNode(columns)?.find(
      (column) => column.dataIndex?.toString() === selectKey,
    );
  }, [columns, selectKey]);

  // 如果没有可选项，则不渲染该组件
  if (options.length === 0) {
    return <></>;
  }

  return (
    <div className="ms-aggr-form">
      <Input.Group compact>
        <div className="ms-aggr-form-select-query">
          <AggrSelect value={selectKey} onChange={setSelectKey} options={options} />
          {currentColumn && (
            <MsAggrField
              key={selectKey}
              {...currentColumn}
              id={selectKey}
              form={form}
              actionRef={fieldActionRef}
              isShowValueInField={isShowValueInField}
            />
          )}
        </div>
        <Button
          icon={<SearchOutlined className="ms-aggr-search-icon" />}
          onClick={() => {
            fieldActionRef.current?.search();
          }}
        />
      </Input.Group>
    </div>
  );
}

export default MsAggrForm;
