import { DownOutlined } from '@ant-design/icons';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { useMount } from 'ahooks';
import { Button, Form, Row, Space } from 'antd';
import { isFunction } from 'lodash-es';
import { useState } from 'react';

import MsBaseForm from '../../components/MsBaseForm';
import { transformColumnsToSchema } from '../../utils/schema';
import useResponsiveSize from '../MsSearchForm/useResponsiveSize';

import './index.less';

import type { MsAdvanceFormProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 搜索表单
 * @param props
 */
function MsAdvanceForm<P, R, D>(props: MsAdvanceFormProps<P, R, D>) {
  const {
    form: formInstance,
    request,
    mountInitialValues,
    column,
    columns = [],
    submitter,
    labelCol = { flex: '80px' },
    onSubmit,
    onReset,
    onCollapsed,
    rowProps = { gutter: 16 },
  } = props;

  const [form] = Form.useForm(formInstance);
  const { currentLocale, globalLocale, fullLocale } = useLocale('MsForm');

  const [loading, setLoading] = useState(isFunction(request));

  // 常规表单项
  const tableSearchColumns = cloneDeepWithReactNode(columns).map((column) => {
    column._fieldProps = (fieldProps) => {
      return {
        ...fieldProps,
        allowClear: fieldProps.allowClear ?? true,
      };
    };
    return column;
  });

  // 响应式列数量
  const columnNumber = useResponsiveSize(column);

  const handleSubmit = () => {
    form.submit();
    onSubmit?.();
  };

  const handleRest = () => {
    form.resetFields();
    (onReset as any)?.();
  };

  const formColumns = tableSearchColumns;

  // 手动设置初始值，便于 resetFields 还原真实的初始值
  useMount(() => {
    if (mountInitialValues) {
      form.setFieldsValue(mountInitialValues);
    }
  });

  // 没有搜索项则隐藏提交按钮
  if (tableSearchColumns.length === 0) return null;

  return (
    <div className="ms-advance-form">
      <MsBaseForm
        {...props}
        layout="vertical"
        columns={formColumns}
        formRender={
          <Row {...rowProps}>
            <SchemaRender
              schema={transformColumnsToSchema(
                {
                  columnNumber,
                  columns: formColumns,
                  loading,
                  form,
                },
                fullLocale,
              )}
            />
          </Row>
        }
        successNotify={false}
        labelCol={labelCol}
        form={form}
        loading={loading}
        setLoading={setLoading}
      />
      <Space>
        {/* 查询按钮 */}
        <Button type="primary" onClick={handleSubmit} {...submitter?.submitBtnProps}>
          {submitter?.submitText ?? globalLocale.query}
        </Button>
        {/* 重置按钮 */}
        <Button onClick={handleRest} {...submitter?.resetBtnProps}>
          {submitter?.resetText ?? globalLocale.reset}
        </Button>
        <Button type="link" onClick={() => onCollapsed?.()}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DownOutlined className="collapse-icon" /> <span>{currentLocale.hideFilter}</span>
          </div>
        </Button>
      </Space>
    </div>
  );
}

export default MsAdvanceForm;
