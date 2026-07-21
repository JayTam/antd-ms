import { useDevopsLayoutContext } from '@jaytam/antd-ms/components/MsDevopsLayout/context';
import { Card, Form, Row, Space } from 'antd';
import classNames from 'classnames';
import { isFunction, isNull } from 'lodash-es';

import { useMsLayout } from '../../../MsLayout/context';
import type { MsFormProps } from '../../types';
import React from 'react';

/**
 * 表单提交按钮容器
 * @param props
 * @returns
 */
function MsSubmitterContainer<P, R, D>(props: MsFormProps<P, R, D>) {
  const { submitter, children, form: formInstance, formType = 'Form' } = props;

  const form = Form.useFormInstance() ?? formInstance;
  // 业务布局上下文
  const msLayoutContext = useMsLayout();
  // devops布局上下文
  const devopsLayoutContext = useDevopsLayoutContext();

  function calcMenuWidth() {
    if (msLayoutContext.inContext) {
      return msLayoutContext.menuWidth;
    }

    if (devopsLayoutContext.inContext) {
      return devopsLayoutContext.menuWidth;
    }

    return 0;
  }

  // 是抽屉表单
  const isDrawer = ['DrawerForm', 'DrawerStepsForm'].includes(formType);

  function submitterRender() {
    if (React.isValidElement(submitter?.render)) {
      return submitter.render;
    }

    if (isFunction(submitter?.render)) {
      return submitter.render?.(form);
    }

    if (isNull(submitter?.render)) {
      return null;
    }

    // 抽屉确认按钮靠左，其他情况靠右
    return isDrawer ? (
      <Row justify="space-between">
        <Space>
          {submitter?.beforeButtonRender}
          {children}
          {submitter?.afterButtonRender}
        </Space>
        <div>{submitter?.extraRender}</div>
      </Row>
    ) : (
      <Row justify="space-between">
        <div>{submitter?.extraRender}</div>
        <Space>
          {submitter?.beforeButtonRender}
          {children}
          {submitter?.afterButtonRender}
        </Space>
      </Row>
    );
  }

  if (submitter?.type === 'fixed') {
    return (
      <Card
        bodyStyle={{ padding: 16 }}
        className={classNames('ms-form-submitter', 'fixed')}
        style={{ left: calcMenuWidth() }}
      >
        {submitterRender()}
      </Card>
    );
  }

  return submitterRender();
}

export default MsSubmitterContainer;
