import { transformColumnsToSchema } from '@jaytam/antd-ms/components/MsForm/utils/schema';
import { omitEmptyDeep, omitNilDeep, omitPrivateDeep, trimValuesDeep } from '@jaytam/antd-ms/utils';
import { SchemaRender } from '@jaytam/schema-render';
import { useControllableValue } from 'ahooks';
import { Button, Col, Form, Row, Skeleton, Steps } from 'antd';
import { isArray, isFunction, omit } from 'lodash-es';
import { useRef, useState } from 'react';

import MsBaseForm from '../MsBaseForm';
import MsSubmitterContainer from '../MsFormSubmitterContainer';

import { MsTitle } from '@jaytam/antd-ms';
import type { MsFormActionType, MsFormColumns } from '../../types';
import { transformPrimitiveType } from '../../utils/submitValues';
import { resolveNamePathList } from '../../utils/validate';
import type { MsStepsFormContainerProps } from './types';
import useFormInitLoading from '../../hooks/useFormLoading';
import useFormSubmit from '../../hooks/useFormSubmit';
import { useComposeRef } from 'rc-util/lib/ref';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsStepsFormContainer<P, R, D>(props: MsStepsFormContainerProps<P, R, D>) {
  const {
    form: formInstance,
    submitter,
    steps = [],
    stepsProps: _stepsProps = {},
    column: columnNumber = 1,
    onStepChangeFailed,
    omitNilValues = true,
    omitPrivateValues = true,
    trimValues = true,
    omitEmptyValues = false,
    onFinishSuccess,
    children,
    rowProps = { gutter: 32 },
    valuesNormal,
    actionRef,
    scrollToFirstError,
  } = props;

  const formProps = omit(props, 'children', 'onFinishSuccess');
  const { currentLocale, globalLocale, fullLocale } = useLocale('MsForm');

  const innerRef = useRef<MsFormActionType>(null);
  const composeRef = useComposeRef(actionRef ?? null, innerRef);

  const { afterChange, validateNextStep, disabledValidateStep, ...stepsProps } = _stepsProps;

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, handleFinish, handleSubmit } = useFormSubmit(props, form, onFinishSuccess);

  const [nextLoading, setNextLoading] = useState(false);
  const [stepCurrent, setStepCurrent] = useControllableValue(stepsProps, {
    valuePropName: 'current',
    defaultValuePropName: 'defaultCurrent',
    defaultValue: 0,
  });

  const prevColumns = steps[stepCurrent - 1];
  const nextColumns = steps[stepCurrent + 1];

  // 合并分步表单的 columns
  const columns = steps
    .map((step) => step.columns)
    .reduce((prev, next) => [...prev, ...next], []) as MsFormColumns<D>;

  const transformValues = (values: any): any => {
    const values1 = trimValues ? trimValuesDeep(values) : values;
    const values2 = omitNilValues ? omitNilDeep(values1) : values1;
    const values3 = omitEmptyValues ? omitEmptyDeep(values2) : values2;
    const values4 = omitPrivateValues ? omitPrivateDeep(values3) : values3;
    return transformPrimitiveType(values4, columns);
  };

  /**
   * 表单校验失败
   * @param param0
   */
  const handleStepChangeFailed = (error: any) => {
    const { values, ...rest } = error;
    // 展开所有 Collapse
    innerRef.current?.openAllCollapse?.();
    // 滚动到第一个错误字段
    if (scrollToFirstError) {
      const scrollOption: any =
        scrollToFirstError === true ? { behavior: 'smooth', block: 'center' } : scrollToFirstError;
      setTimeout(() => form.scrollToField(error?.errorFields[0]?.name, scrollOption), 300);
    }
    onStepChangeFailed?.({ values: transformValues(values), ...rest });
  };

  /**
   * 分步表单状态变更
   * 当前分步表单，表单项校验
   * @param nextCurrent 要变更step的索引
   */
  async function handleStepChange(nextCurrent: number) {
    if (!isArray(steps[stepCurrent]?.columns)) return;
    const currentColumns = steps[stepCurrent]?.columns;
    const namePathList = resolveNamePathList(currentColumns);

    // 不校验
    if (disabledValidateStep) {
      setStepCurrent(nextCurrent);
      afterChange?.(nextCurrent, steps);
      return;
    }

    if (nextCurrent > stepCurrent) {
      // 前进
      try {
        await form.validateFields(namePathList, { recursive: true });
        if (isFunction(validateNextStep)) {
          setNextLoading(true);
          const currentStepValues = form.getFieldsValue(namePathList);
          const isNext = await validateNextStep(
            transformValues(currentStepValues),
            nextCurrent,
            steps,
          );
          if (isNext) {
            setStepCurrent(nextCurrent);
            afterChange?.(nextCurrent, steps);
          }
          setNextLoading(false);
        } else {
          setStepCurrent(nextCurrent);
          afterChange?.(nextCurrent, steps);
        }
      } catch (error: any) {
        handleStepChangeFailed(error);
      }
    } else {
      // 返回虽然校验当前页，但不阻塞分步跳转，同时要清除掉错误信息
      try {
        await form.validateFields(namePathList, { recursive: true });
      } catch (error: any) {
        // 去掉错误校验状态
        form.setFields(
          error.errorFields.map((item: any) => ({
            name: item.name,
            errors: undefined,
          })),
        );
      } finally {
        setStepCurrent(nextCurrent);
        afterChange?.(nextCurrent, steps);
      }
    }
  }

  // 分步指示器
  const formStepsNode = (
    <Steps
      {...stepsProps}
      current={stepCurrent}
      onChange={(nextCurrent) => handleStepChange(nextCurrent)}
      items={steps.map((step, index) => {
        return { ...omit(step, 'columns'), disabled: step?.disabled ?? index > stepCurrent + 1 };
      })}
    />
  );

  // 表单内容
  const formContentNode = steps
    .map(({ columns }) =>
      transformColumnsToSchema({ columns, columnNumber, form, loading, valuesNormal }, fullLocale),
    )
    .map((schema, index) => {
      return (
        <Row
          {...rowProps}
          style={{ ...rowProps?.style, display: stepCurrent === index ? undefined : 'none' }}
          key={index}
        >
          <SchemaRender schema={schema} />
        </Row>
      );
    });

  // 提交按钮
  const submitNode = (
    <MsSubmitterContainer {...props}>
      {loading ? (
        <>
          <Skeleton.Button active />
          <Skeleton.Button active />
        </>
      ) : (
        <>
          {prevColumns && (
            <Button onClick={() => handleStepChange(stepCurrent - 1)} {...submitter?.prevBtnProps}>
              {submitter?.prevText
                ? submitter?.prevText?.(stepCurrent)
                : `${currentLocale.prev}：${prevColumns.title}`}
            </Button>
          )}
          {nextColumns && (
            <Button
              onClick={() => handleStepChange(stepCurrent + 1)}
              loading={nextLoading}
              {...submitter?.nextBtnProps}
            >
              {submitter?.nextText
                ? submitter?.nextText?.(stepCurrent)
                : `${currentLocale.next}：${nextColumns.title}`}
            </Button>
          )}
          {stepCurrent === steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={submitLoading}
              {...submitter?.submitBtnProps}
            >
              {submitter?.submitText ?? globalLocale.submit}
            </Button>
          ) : null}
        </>
      )}
    </MsSubmitterContainer>
  );

  // 整个表单
  const formNode = (
    <MsBaseForm
      footerRender={submitNode}
      titleRender={
        <MsTitle
          {...omit(formProps, 'children', 'className', 'style')}
          titleSize={formProps.noCard ? 'middle' : 'large'}
          titleType={formProps.titleType ?? (props.noCard ? 'gradient' : 'common')}
        />
      }
      {...formProps}
      columns={columns}
      formRender={
        stepsProps.direction === 'vertical' ? (
          // 纵向分步器
          <Row gutter={rowProps.gutter}>
            <Col>{formStepsNode}</Col>
            <Col style={{ flex: '1' }}>{formContentNode}</Col>
          </Row>
        ) : (
          // 横向分步器
          <>
            <Form.Item>{formStepsNode}</Form.Item>
            {formContentNode}
          </>
        )
      }
      form={form}
      loading={loading}
      setLoading={setLoading}
      onFinish={handleFinish}
      actionRef={composeRef}
    />
  );

  return children?.(formNode, submitNode, formProps);
}

export default MsStepsFormContainer;
