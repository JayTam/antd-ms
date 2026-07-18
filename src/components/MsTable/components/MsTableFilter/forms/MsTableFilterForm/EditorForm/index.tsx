import { CloseOutlined } from '@ant-design/icons';
import type { MsFormProps } from '@jaytam/antd-ms';
import MsBaseForm from '@jaytam/antd-ms/components/MsForm/components/MsBaseForm';
import { Button, Form, Row, Space } from 'antd';
import classNames from 'classnames';
import { omit } from 'lodash-es';
import type { MsTableSearchType } from '../../../../../types';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type EditFormProps<P, R, D> = MsFormProps<P, R, D> & {
  searchConfig?: MsTableSearchType<P, R, D>;
  onSubmit?: () => void;
  onReset?: () => void;
  onClose?: () => void;
  onClear?: () => void;
};

/**
 * 编辑表单
 * @param props
 * @returns
 */
function EditForm<P, R, D>(props: EditFormProps<P, R, D>) {
  const {
    searchConfig,
    form: formInstance,
    columns,
    onSubmit,
    onReset,
    onClose,
    onClear,
    ...formProps
  } = props;

  const [form] = Form.useForm(formInstance);
  const { currentLocale } = useLocale('MsTable');

  const formColumns = columns?.map((column) => {
    return {
      ...column,
      _fieldProps: (fieldProps: any) => omit(fieldProps, 'style'),
    };
  });

  const handleSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
      onSubmit?.();
    });
  };

  const handleReset = () => {
    onReset?.();
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <div
      className={classNames('ms-editor-form-wrapper', searchConfig?.className)}
      style={searchConfig?.filterStyle}
    >
      <Row className="ms-editor-form-header" justify="space-between">
        <p className="ms-editor-form-title">{currentLocale.filterCondition}</p>
        <CloseOutlined className="ms-editor-form-close" onClick={onClose} />
      </Row>

      <MsBaseForm
        layout="horizontal"
        colon={false}
        {...formProps}
        className={classNames('ms-editor-form', formProps.className)}
        style={formProps?.style ?? searchConfig?.style}
        form={form}
        columns={formColumns}
        loading={false}
        successNotify={false}
        setLoading={() => {}}
        column={searchConfig?.column ?? 2}
        labelCol={{ flex: searchConfig?.labelWidth, ...formProps?.labelCol }}
      />

      <Row justify="end">
        <Space>
          {searchConfig?.showClearBtn && (
            <Button onClick={handleClear}>{searchConfig?.clearText}</Button>
          )}
          {searchConfig?.showResetBtn && (
            <Button onClick={handleReset}>{searchConfig?.resetText}</Button>
          )}
          {searchConfig?.showSubmitBtn && (
            <Button type="primary" onClick={handleSubmit}>
              {searchConfig?.submitText}
            </Button>
          )}
        </Space>
      </Row>
    </div>
  );
}

export default EditForm;
