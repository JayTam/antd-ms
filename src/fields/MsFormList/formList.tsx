import { Col, Form, Row } from 'antd';
import { isFunction } from 'lodash-es';
import React from 'react';
import FormListActions from './components/FormListActions';
import FormListAddButton from './components/FormListAddButton';
import FormListRowForm from './components/FormListRowForm';
import FormListWrapper from './components/FormListWrapper';
import type { FormListProps } from './types';

const FormList = React.forwardRef<HTMLDivElement, FormListProps>((props, ref) => {
  const { gutter = 20, indexRender, addButtonPosition = 'bottom' } = props;

  return (
    <FormListWrapper {...props}>
      {(fields, operation, { errors }, action) => {
        return (
          <div className="ms-form-list" ref={ref}>
            {addButtonPosition === 'top' && (
              <FormListAddButton
                fields={fields}
                listProps={props}
                action={action}
                style={{ marginBottom: 24 }}
              />
            )}
            {fields.map((fieldItem, index: number) => (
              <Row key={fieldItem.key} wrap={false} gutter={gutter}>
                {/* 索引 */}
                {isFunction(indexRender) ? (
                  <Col>
                    <div style={{ height: 32, lineHeight: '32px' }}>{indexRender(index)}</div>
                  </Col>
                ) : null}
                {/* 表单 */}
                <Col flex={1}>
                  <Row gutter={gutter}>
                    <FormListRowForm
                      key={fieldItem.key}
                      fieldItem={fieldItem}
                      index={index}
                      fields={fields}
                      listProps={props}
                    />
                  </Row>
                </Col>
                {/* 操作按钮 */}
                <Col>
                  <FormListActions
                    key={fieldItem.key}
                    index={index}
                    fields={fields}
                    operation={operation}
                    action={action}
                    listProps={props}
                  />
                </Col>
              </Row>
            ))}
            {addButtonPosition === 'bottom' && (
              <FormListAddButton fields={fields} listProps={props} action={action} />
            )}
            <Form.ErrorList errors={errors} />
          </div>
        );
      }}
    </FormListWrapper>
  );
});

export default FormList;
