import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import { FormContext } from 'antd/es/form/context';
import { isNil } from 'lodash-es';
import React, { useMemo, type ReactNode } from 'react';

type IndentContainerProps = {
  children?: ReactNode;
  formItemProps?: FormItemProps;
};

/**
 * 缩进容器组件
 */
function IndentContainer(props: IndentContainerProps) {
  const { children, formItemProps } = props;

  const subFormContext = React.useContext(FormContext);

  // 继承父表单的 labelCol 和 wrapperCol
  const newSubFormContext = useMemo(() => {
    const { labelCol, wrapperCol } = formItemProps ?? {};
    if (!isNil(labelCol)) {
      subFormContext.labelCol = labelCol;
    }
    if (!isNil(wrapperCol)) {
      subFormContext.wrapperCol = wrapperCol;
    }
    return subFormContext;
  }, [subFormContext, formItemProps]);

  return (
    <Form.Item label=" " colon={false}>
      <FormContext.Provider value={newSubFormContext}>{children}</FormContext.Provider>
    </Form.Item>
  );
}

export default IndentContainer;
