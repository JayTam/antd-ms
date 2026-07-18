/**
 * title: 两栏布局抽屉
 * description:
 */
import { MsDrawer, MsForm, MsRichText, setField } from '@jaytam/antd-ms';
import { Button, Form, Space } from 'antd';
setField('richText', MsRichText);

const MyModal = MsDrawer.create((props: { title: string; width: string | number }) => {
  const { title, width } = props;
  const drawer = MsDrawer.useDrawer();
  const [form] = Form.useForm();
  const handleFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <MsDrawer
      {...drawer.props}
      type="dual-column"
      pureBackground={true}
      title={title}
      width={width}
      footer={
        <Space>
          <Button type="primary" onClick={() => form.submit()}>
            提交
          </Button>
          <Button onClick={() => drawer.close()}>关闭</Button>
        </Space>
      }
      rightContentWidth={'24%'}
      rightContentRender={
        <div className="ms-demo-left-content">
          <MsForm
            noCard
            onFinish={handleFinish}
            form={form}
            labelCol={{ style: { width: 90 } }}
            columns={[
              {
                title: '优先级',
                dataIndex: 'priority',
                valueType: 'select',
                valueEnum: {
                  1: 'P0',
                  2: 'P1',
                  3: 'P2',
                  4: 'P3',
                },
                fieldProps: {
                  defaultSelectFirst: true,
                },
              },
              {
                title: '期望完成时间',
                dataIndex: 'expEndTime',
                valueType: 'date',
              },
              {
                title: '受理人',
                dataIndex: 'assignee',
                valueType: 'userPopover',
                formItemProps: { rules: [{ required: true }] },
              },
              {
                title: '提交人',
                dataIndex: 'proposer',
                valueType: 'userPopover',
                formItemProps: { rules: [{ required: true }] },
                initialValue: [
                  {
                    value: 'san.zhang@msxf.com',
                    email: 'san.zhang@msxf.com',
                    fullName:
                      '集团_马上消费金融股份有限公司-CTO直管部门-技术部-金融科技研发部-公共平台研发部-平台产品化团队',
                    fullCode: '/D10541/D10185/D10017/D10558/D10463/D11195',
                    label: '张三',
                  },
                ],
              },
              {
                title: '开发负责人',
                dataIndex: 'devLeaders',
                valueType: 'userPopover',
              },
              {
                title: '标签',
                dataIndex: 'tags',
                valueType: 'digit',
              },
              {
                title: '附件',
                dataIndex: 'upload',
                valueType: 'upload',
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
    </MsDrawer>
  );
});

export default () => {
  return (
    <>
      <Button onClick={() => MsDrawer.open(MyModal, { title: '新增提测', width: '80%' })}>
        打开
      </Button>
    </>
  );
};
