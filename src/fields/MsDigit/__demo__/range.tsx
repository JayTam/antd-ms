/**
 * title: 范围
 * description:
 */
import { MsForm } from '@jaytam/antd-ms';

export default () => {
  return (
    <>
      <MsForm
        noCard
        columns={[
          {
            title: '最小值',
            dataIndex: 'min',
            valueType: 'digit',
            initialValue: 1,
            colSize: 1 / 2,
          },
          {
            title: '最大值',
            dataIndex: 'max',
            valueType: 'digit',
            initialValue: 10,
            colSize: 1 / 2,
          },
          {
            title: '验证范围',
            valueType: 'digit',
            dataIndex: 'num',
            dependencies: ['min', 'max'],
            initialValue: 20,
            fieldProps: (form) => {
              return {
                min: form.getFieldValue('min'),
                max: form.getFieldValue('max'),
              };
            },
          },
        ]}
      />
    </>
  );
};
