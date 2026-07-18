import { isFunction, omit } from 'lodash-es';
import type { MsFormColumns, MsFormProps } from '../../types';
import { Form, Steps, type FormInstance } from 'antd';
import { useState } from 'react';
import './index.less';

/**
 * 解析 columns 中的分组
 * @param columns
 */
function parseGroups(columns: MsFormColumns, form: FormInstance) {
  return columns
    .filter(({ valueType = 'text' }) => ['group', 'collapse'].includes(valueType))
    .map(({ title, fieldProps, dataIndex }) => {
      const id = isFunction(fieldProps) ? fieldProps(form)?.id : fieldProps?.id;
      return { title: title, id: dataIndex?.toString() ?? id };
    });
}

function MsFormAnchor<P, R, D>(props: MsFormProps<P, R, D>) {
  const { anchorGroup, form: formInstance, columns = [], anchorStepsProps } = props;

  const [form] = Form.useForm(formInstance);
  const [current, setCurrent] = useState(0);

  const groups = parseGroups(columns, form);

  if (!anchorGroup) return null;

  return (
    <div className="ms-steps-anchor">
      <Steps
        {...anchorStepsProps}
        current={current}
        onChange={setCurrent}
        items={groups.map((group) => ({
          title: group.title,
          onClick: () => {
            document.getElementById(group.id)?.scrollIntoView({ behavior: 'smooth' });
          },
        }))}
      />
    </div>
  );
}

export default MsFormAnchor;
