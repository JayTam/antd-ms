/**
 * title: 自定义字段
 * description:
 */
import type { MsFormColumns } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { Input } from 'antd';

/** 编辑组件 */
const EditField = (props: { id?: string; value?: string; onChange?: (event: any) => void }) => {
  const { id, value, onChange } = props;

  return (
    <div id={id}>
      <Input value={value} onChange={onChange} />
      <span>{value}</span>
    </div>
  );
};

/** 只读组件 */
const ReadField = (props: { id?: string; value?: string; onChange?: (event: any) => void }) => {
  const { id, value } = props;

  return <div id={id}>{value}</div>;
};

export default () => {
  const onFinish = async (values: any) => {
    console.log('submit', values);
  };

  const columns: MsFormColumns = [
    {
      title: '编辑组件',
      dataIndex: 'edit',
      fieldRender: <EditField />,
      initialValue: 'xxxxxxxxxx',
    },
    {
      title: '只读组件',
      dataIndex: 'read',
      mode: 'read',
      fieldRender: <div>xxxxxx</div>,
      fieldReadRender: <ReadField />,
      initialValue: 'yyyyyyyyy',
    },
  ];

  return <MsForm onFinish={onFinish} columns={columns} />;
};
