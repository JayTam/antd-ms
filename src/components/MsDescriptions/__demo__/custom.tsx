/**
 * title: 自定义渲染
 * background: "#f0f3f4"
 */
import type { MsDescriptionsColumns } from '@jaytam/antd-ms';
import { MsDescriptions } from '@jaytam/antd-ms';
import { Input, Row } from 'antd';

const request = () => {
  return new Promise((resolve) => {
    const res = {
      data: {
        name: 'ECS-instance-1667722950291',
        storage: 100,
        network: 1,
        ip: '192.186.1.1',
        createAt: new Date(),
        updateAt: new Date(),
        num: 3,
      },
    };
    setTimeout(() => resolve(res), 2000);
  });
};

/**
 * 自定义编辑模式组件
 */
const CustomEditField = ({ value, onChange }: { value?: string; onChange?: () => void }) => {
  return (
    <Row>
      <div>编辑模式自定义</div>
      <Input value={value} onChange={onChange} />
    </Row>
  );
};

export default () => {
  const columns: MsDescriptionsColumns = [
    {
      title: '自定义',
      dataIndex: 'ip',
      fieldReadRender: (form) => <a>只读模式自定义 {form.getFieldValue('ip')}</a>,
      fieldRender: () => <CustomEditField />,
      editable: true,
    },
  ];

  return <MsDescriptions request={request} columns={columns} column={2} />;
};
