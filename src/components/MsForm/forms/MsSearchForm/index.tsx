import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SchemaRender } from '@jaytam/schema-render';
import { useMount } from 'ahooks';
import { Button, Form, Row, Skeleton, Space } from 'antd';
import { max } from 'lodash-es';
import { useState } from 'react';

import MsBaseForm from '../../components/MsBaseForm';
import MsSubmitterContainer from '../../components/MsFormSubmitterContainer';
import { transformColumnsToSchema } from '../../utils/schema';

import type { MsSearchFormProps } from './types';
import useResponsiveSize from './useResponsiveSize';
import useFormInitLoading from '../../hooks/useFormLoading';
import useFormSubmit from '../../hooks/useFormSubmit';
import { useLocale } from '@jaytam/antd-ms/locale';

/**
 * 搜索表单
 * @param props
 */
function MsSearchForm<P, R, D>(props: MsSearchFormProps<P, R, D>) {
  const {
    form: formInstance,
    mountInitialValues,
    column,
    columns = [],
    hiddenColumns = [],
    submitter,
    defaultCollapsed,
    labelCol = { flex: '80px' },
    onSubmit,
    onReset,
    rowProps = { gutter: 16 },
  } = props;

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, handleFinish, handleSubmitNoThrottle } = useFormSubmit(props, form);

  const { globalLocale, fullLocale } = useLocale();

  // 响应式列数量
  const columnNumber = useResponsiveSize(column);
  // 是否折叠
  const [collapsed, setCollapsed] = useState(defaultCollapsed ?? true);
  // 显示折叠按钮
  const showCollapsed = columns.length > columnNumber - 1;

  const handleRest = () => {
    form.resetFields();
    (onReset as any)?.();
  };

  const handleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const formColumns = [
    ...columns.map((column, index) => {
      const minColumnNumber = max([columnNumber - 1, 1]) ?? 1;
      if (index >= minColumnNumber && collapsed) {
        return { ...column, colProps: { style: { display: 'none' } } };
      }
      return column;
    }),
    {
      key: 'submit',
      colProps: { flex: 'auto' },
      fieldRender: (
        <MsSubmitterContainer {...props} form={form}>
          <Row justify="end">
            <Space>
              {loading ? (
                <>
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </>
              ) : (
                <>
                  {/* 查询按钮 */}
                  <Button
                    type="primary"
                    loading={submitLoading}
                    onClick={() => {
                      handleSubmitNoThrottle();
                      onSubmit?.();
                    }}
                    {...submitter?.submitBtnProps}
                  >
                    {submitter?.submitText ?? globalLocale.query}
                  </Button>
                  {/* 重置按钮 */}
                  <Button
                    disabled={submitLoading}
                    onClick={handleRest}
                    {...submitter?.resetBtnProps}
                  >
                    {submitter?.resetText ?? globalLocale.reset}
                  </Button>
                  {/* 折叠按钮 */}
                  {showCollapsed && (
                    <Button type="link" onClick={handleCollapsed}>
                      {collapsed ? globalLocale.expand : globalLocale.fold}
                      {collapsed ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                  )}
                </>
              )}
            </Space>
          </Row>
        </MsSubmitterContainer>
      ),
    },
  ];

  // 手动设置初始值，便于 resetFields 还原真实的初始值
  useMount(() => {
    if (mountInitialValues) form.setFieldsValue(mountInitialValues);
  });

  // 没有搜索项则隐藏提交按钮
  if (columns.length === 0) return null;

  return (
    <MsBaseForm
      {...props}
      onFinish={handleFinish}
      columns={formColumns}
      formRender={
        <Row {...rowProps}>
          <SchemaRender
            schema={transformColumnsToSchema(
              { columnNumber, columns: formColumns, loading, form },
              fullLocale,
            )}
          />
          <SchemaRender
            schema={transformColumnsToSchema(
              {
                columnNumber,
                columns: hiddenColumns,
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
  );
}

export default MsSearchForm;
