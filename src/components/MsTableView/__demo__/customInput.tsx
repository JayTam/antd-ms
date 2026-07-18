import { Input } from 'antd';

const CustomInput = (props: any) => {
  const { formProps } = props;
  return (
    <div style={{ width: '100%' }}>
      <Input {...formProps} allowClear placeholder="自定义输入组件" />
    </div>
  );
};
export default CustomInput;
