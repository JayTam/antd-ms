import { Form } from 'antd';
import { FormContext } from 'antd/es/form/context';
import { isNil } from 'lodash-es';
import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import type { MsGroupProps } from '../types';

type GroupContainerProps = MsGroupProps & {
  titleRender?: ReactNode;
  contentRender?: ReactNode;
  children?: ReactNode;
};

function GroupContainer(props: GroupContainerProps) {
  const { fieldProps = {}, formItemProps = {}, titleRender, contentRender } = props;
  const { indent, indentAll } = fieldProps;
  const { labelCol, wrapperCol } = formItemProps;

  const subFormContext = React.useContext(FormContext);

  const groupFormContext = useMemo(() => {
    if (!isNil(labelCol)) {
      subFormContext.labelCol = labelCol;
    }
    if (!isNil(wrapperCol)) {
      subFormContext.wrapperCol = wrapperCol;
    }
    return subFormContext;
  }, [labelCol, subFormContext, wrapperCol]);

  if (indentAll) {
    return (
      <Form.Item label=" " colon={false}>
        <FormContext.Provider value={groupFormContext}>
          {titleRender}
          {contentRender}
        </FormContext.Provider>
      </Form.Item>
    );
  }

  if (indent) {
    return (
      <>
        {titleRender}
        <Form.Item label=" " colon={false}>
          <FormContext.Provider value={groupFormContext}>{contentRender}</FormContext.Provider>
        </Form.Item>
      </>
    );
  }

  return (
    <>
      {titleRender}
      {contentRender}
    </>
  );
}

export default GroupContainer;
