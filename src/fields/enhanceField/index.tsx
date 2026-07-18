import {
  LIST_VALUE_TYPES,
  OBJECT_VALUE_TYPES,
  RESOURCE_TAG_VALUE_TYPES,
} from '@jaytam/antd-ms/components/MsForm/constants';
import { Col, Form, Row, Typography } from 'antd';
import { isFunction, isUndefined, omit, pick } from 'lodash-es';
import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { useFieldModeContext } from '../../components/MsForm/contexts/mode';
import ActionsField from './components/ActionsField';
import CopyField from './components/CopyField';
import EditField from './components/EditField';
import { useFieldProps } from './useFieldProps';

/** 扩展的 fieldProps 属性，传递给 antd 组件需要剔除掉 */
const COMMON_FIELD_PROPS = ['preRender', 'suffixRender', 'preGap', 'suffixGap'];

/** 受控属性 */
const CONTROLLED_PROPS = ['id', 'value', 'onChange', 'onBlur'];

/** 完全由 field 组件实现的类型 */
const FIELD_RENDER_TYPES = [
  ...LIST_VALUE_TYPES,
  ...OBJECT_VALUE_TYPES,
  ...RESOURCE_TAG_VALUE_TYPES,
  'empty',
];

/** 只读模式下，默认不开启省略的类型 */
const NO_ELLIPSIS_TYPES = [
  'upload',
  'userPopover',
  'userGroup',
  'codeEditor',
  'diffEditor',
  'richText',
];

/**
 * Field 组件增强，MsField components 所有组件都要使用该组件包裹
 * @param WrappedComponent
 * @returns
 */
function enhanceField<C extends React.ComponentType>(WrappedComponent: C): C {
  const Enhanced = forwardRef((inputProps: any, ref: any) => {
    // 将value和onChange属性赋值给fieldProps对象
    const props = useFieldProps(inputProps);
    const { fieldReadRender, fieldRender, fieldProps, editable, copyable, ellipsis, actions } =
      props;
    // 受控属性
    const controlledProps = pick(fieldProps, CONTROLLED_PROPS);

    /**
     * 合并 column.fieldProps 配置的受控属性和传入组件的受控属性，要保证两种使用方式都能正确运行
     * @param reactNodeProps
     * @returns
     */
    const getMergedControlledProps = (reactNodeProps: any) => {
      const wrappedOnChange = (...args: any) => {
        controlledProps.onChange?.(...args);
        reactNodeProps.onChange?.(...args);
      };

      const wrappedOnBlur = (...args: any) => {
        controlledProps.onBlur?.(...args);
        reactNodeProps.onBlur?.(...args);
      };

      return {
        ...reactNodeProps,
        ...controlledProps,
        onChange: wrappedOnChange,
        onBlur: wrappedOnBlur,
      };
    };

    const form = Form.useFormInstance();
    const { mode } = useFieldModeContext(props);

    // 渲染包裹的组件，并传递新的fieldProps以及其余的属性
    let component = (
      <WrappedComponent {...props} fieldProps={omit(fieldProps, COMMON_FIELD_PROPS)} ref={ref} />
    );

    // 是否存在前缀或后缀
    const isPreSuffix = fieldProps?.preRender || fieldProps?.suffixRender ? true : false;

    // 前缀节点
    const PreFieldNode = fieldProps?.preRender && (
      <span style={{ paddingRight: fieldProps.preGap ?? 8, ...(fieldProps?.preStyle ?? {}) }}>
        {fieldProps?.preRender}
      </span>
    );

    // 后缀节点
    const SuffixFieldNode = fieldProps?.suffixRender && (
      <span style={{ paddingLeft: fieldProps.suffixGap ?? 8, ...(fieldProps?.suffixStyle ?? {}) }}>
        {fieldProps?.suffixRender}
      </span>
    );

    // 编辑模式
    if (mode === 'edit') {
      // 自定义编辑组件渲染
      if (fieldRender) {
        if (isValidElement(fieldRender)) {
          component = cloneElement(fieldRender, getMergedControlledProps(fieldRender.props));
        } else if (isFunction(fieldRender)) {
          const fieldElement = fieldRender(form);
          if (isValidElement(fieldElement)) {
            component = cloneElement(fieldElement, getMergedControlledProps(fieldElement.props));
          } else {
            component = fieldElement;
          }
        } else {
          component = fieldRender;
        }
      }

      // 完全由 field 组件渲染
      if (
        FIELD_RENDER_TYPES.includes(props.valueType) ||
        props.plainField ||
        props.plainEditField
      ) {
        return component;
      }

      // 有前缀或者后缀
      if (isPreSuffix) {
        return (
          <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {PreFieldNode}
            {component}
            {SuffixFieldNode}
          </div>
        );
      }
    }

    // 只读模式
    if (mode === 'read') {
      // 自定义只读组件渲染
      if (fieldReadRender) {
        if (isValidElement(fieldReadRender)) {
          component = cloneElement(
            fieldReadRender,
            getMergedControlledProps(fieldReadRender.props),
          );
        } else if (isFunction(fieldReadRender)) {
          const fieldReadElement = fieldReadRender(form);
          if (isValidElement(fieldReadElement)) {
            component = cloneElement(
              fieldReadElement,
              getMergedControlledProps(fieldReadElement.props),
            );
          } else {
            component = fieldReadElement;
          }
        } else {
          component = fieldReadRender;
        }
      }
      // 完全由 field 组件渲染
      if (
        FIELD_RENDER_TYPES.includes(props.valueType) ||
        props.plainField ||
        props.plainReadField
      ) {
        return component;
      }

      const defaultEllipsis = NO_ELLIPSIS_TYPES.includes(props.valueType)
        ? undefined
        : { tooltip: component };

      // 只读模式都会用到 ellipsis，所以全部用 Text 组件包裹
      const contentDom = (
        <Typography.Text ellipsis={isUndefined(ellipsis) ? defaultEllipsis : ellipsis}>
          {PreFieldNode}
          {component}
          {SuffixFieldNode}
        </Typography.Text>
      );

      // 只读模式带操作按钮
      if (editable || copyable || actions?.length > 0) {
        return (
          <Row align="middle" gutter={20} wrap={false}>
            {/* TODO: 设置最大宽度临时解决，后续待优化 */}
            <Col style={{ maxWidth: '70%' }}>{contentDom}</Col>
            <Col>
              <Row align="middle" wrap={false}>
                <CopyField column={props._column} copyNode={component} />
                <EditField column={props._column} />
                <ActionsField column={props._column} />
              </Row>
            </Col>
          </Row>
        );
      }

      return contentDom;
    }

    return component;
  });

  // 包装显示名称以便调试
  Enhanced.displayName = `EnhanceField(${getDisplayName(WrappedComponent)})`;

  return Enhanced as unknown as C;
}

function getDisplayName<C extends React.ComponentType>(WrappedComponent: C) {
  return WrappedComponent.displayName || WrappedComponent.name || 'FieldComponent';
}

export default enhanceField;
