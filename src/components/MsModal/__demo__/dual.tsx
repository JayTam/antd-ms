/**
 * title: 两栏布局弹窗
 * description:
 */
import { MsForm, MsModal, MsRichText, setField } from '@jaytam/antd-ms';
import { Button, Form, Space } from 'antd';
setField('richText', MsRichText);

const MyModal = MsModal.create(() => {
  const modal = MsModal.useModal();
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <MsModal
      {...modal.props}
      type="dual-column"
      title="评审纪要"
      footer={
        <Space>
          <Button type="primary" onClick={() => form.submit()}>
            纪要归档
          </Button>
          <Button>保存草稿</Button>
          <Button onClick={() => modal.close()}>取消</Button>
        </Space>
      }
      rightContentRender={
        <div className="ms-demo-left-content">
          <MsForm
            noCard
            onFinish={handleFinish}
            form={form}
            labelCol={{ style: { width: 90 } }}
            columns={[
              {
                title: '实例名称',
                dataIndex: 'name',
                formItemProps: { rules: [{ required: true }] },
              },
              {
                title: '网络类型',
                dataIndex: 'network',
                valueType: 'select',
                valueEnum: {
                  1: '私有网络',
                  2: '专有网络',
                },
                fieldProps: {
                  defaultSelectFirst: true,
                },
              },
              {
                title: '付费方式',
                dataIndex: 'payMode',
                valueType: 'select',
              },
              {
                title: '地域',
                dataIndex: 'region',
                valueType: 'select',
              },
              {
                title: '可用区',
                dataIndex: 'zone',
                valueType: 'select',
              },
              {
                title: '节点数',
                dataIndex: 'num',
                valueType: 'digit',
              },
            ]}
            submitter={{ render: () => undefined }}
          />
        </div>
      }
    >
      <MsForm
        noCard
        onFinish={handleFinish}
        form={form}
        column={2}
        labelCol={{ span: 24 }}
        columns={[
          {
            title: '标题',
            dataIndex: 'name',
            colSize: 2,
            formItemProps: { rules: [{ required: true }] },
          },
          {
            title: '详细描述',
            dataIndex: 'description',
            valueType: 'richText',
            colSize: 2,
            formItemProps: { rules: [{ required: true }] },
          },
          {
            title: '关联子系统',
            dataIndex: 'system',
            valueType: 'select',
            valueEnum: {
              1: '私有网络',
              2: '专有网络',
            },
            fieldProps: {
              defaultSelectFirst: true,
            },
          },
          {
            title: '关联计划',
            dataIndex: 'plan',
            valueType: 'select',
          },
          {
            title: '关联迭代',
            dataIndex: 'sprit',
            valueType: 'select',
          },
          {
            title: '关联卡片',
            dataIndex: 'cards',
            valueType: 'select',
          },
        ]}
        submitter={{ render: () => undefined }}
      />
    </MsModal>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsModal.open(MyModal)}>打开</Button>
    </>
  );
};
