import type { MsFormColumns } from '@jaytam/antd-ms';
import MsForm from '@jaytam/antd-ms/components/MsForm';
import MsModal from '@jaytam/antd-ms/components/MsModal';
import type { ViewModalType } from '@jaytam/antd-ms/components/MsViewList/types';
import { Form } from 'antd';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';
import { useMemo } from 'react';

export const ViewModal = MsModal.create((props: ViewModalType) => {
  const { data = {}, type = 'add', fieldNames, handleRefresh, onViewAction } = props;
  const { currentLocale } = useLocale('MsViewList');
  const modal = MsModal.useModal();
  const VIEW_ACTION_MODAL_TITLE = useMemo(() => {
    return {
      add: currentLocale.add,
      edit: currentLocale.edit,
      save: currentLocale.save,
      saveAs: currentLocale.saveAs,
    };
  }, [currentLocale]);
  const columns: MsFormColumns = [
    {
      dataIndex: fieldNames?.title,
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value?.trim()) {
                return Promise.reject(currentLocale.nameTip);
              } else if (value?.trim()?.length > 20) {
                return Promise.reject(currentLocale.lengthTip);
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
      },
      fieldProps: {
        maxLength: 50,
        width: 172,
        placeholder: currentLocale.nameTip,
      },
    },
  ];
  const [form] = Form.useForm();

  // 取消
  const handleCancel = () => {
    form.resetFields();
    modal.close();
  };
  // 确认
  const onFinish = async () => {
    const res = await form.validateFields();
    await onViewAction?.({ ...data, ...res }, type);
    handleRefresh?.();
  };

  return (
    <MsForm
      noCard
      form={form}
      title={VIEW_ACTION_MODAL_TITLE[type]}
      formType="ModalForm"
      modalProps={modal.props}
      initialValues={data}
      columns={columns}
      autoComplete="off"
      onFinish={onFinish}
      successNotify={false}
      className="ms-add-view-form"
      submitter={{
        cancelBtnProps: { onClick: handleCancel },
      }}
    />
  );
});
