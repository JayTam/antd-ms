import { QuestionCircleOutlined } from '@ant-design/icons';
import type { MsFormColumnType } from '@jaytam/antd-ms';
import { Form, Tooltip } from 'antd';
import { isFunction } from 'lodash-es';

type TableTitleProps = {
  column: MsFormColumnType;
};

function TableTitle(props: TableTitleProps) {
  const { column } = props;
  const { title } = column;
  const form = Form.useFormInstance();

  const formItemProps = isFunction(column.formItemProps)
    ? column.formItemProps(form)
    : column.formItemProps;

  const tooltip = column.tooltip ?? formItemProps?.tooltip;

  const required = formItemProps?.rules?.find((rule) => {
    const newRule = isFunction(rule) ? rule(form) : rule;
    return newRule.required;
  });

  return (
    <>
      {(formItemProps?.required || required) && (
        <span
          style={{
            color: '#ff4d4f',
            marginRight: 4,
            fontSize: 12,
            lineHeight: 1,
            fontFamily: 'SimSun, sans-serif',
          }}
        >
          *
        </span>
      )}
      {title}
      {tooltip && (
        <Tooltip title={<>{tooltip}</>}>
          <QuestionCircleOutlined style={{ marginLeft: 4, cursor: 'pointer' }} />
        </Tooltip>
      )}
    </>
  );
}

export default TableTitle;
