import React, { useMemo, useRef, useState, useCallback, memo } from 'react';
import { MsField, valueEnumToOptions } from '@jaytam/antd-ms';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  useCreation,
  useDeepCompareEffect,
  useHover,
  useLocalStorageState,
  useMemoizedFn,
  useUpdateEffect,
} from 'ahooks';
import { Form, Popover } from 'antd';
import { handleVerifyField } from '../../utils';
import { isFunction } from 'lodash-es';
import { EMPTY_TYPE_ARRAY } from '../RulesConfig/constant';

import type { BaseRule, RcBasicItem, RcFieldItem } from '../RulesConfig';

import './index.less';
import moment from 'moment';
import { useLocale } from '@jaytam/antd-ms/locale';

type TooltipVerifyFieldProps = {
  pk: string;
  verifyFieldProps: RcFieldItem;
  lineData: RcBasicItem;
  onFieldChange: (
    valueObj: unknown,
    field: string,
    valueType: string,
    selectdLabelName?: string,
  ) => void;
};

const TooltipVerifyField: React.FC<TooltipVerifyFieldProps> = ({
  pk,
  verifyFieldProps,
  lineData,
  onFieldChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const {
    fieldProps = {},
    dataIndex,
    valueType,
    fieldRender,
    fieldReadRender,
    selectdLabelName,
    rules: _rules,
    dependencies,
    hideInForm,
    handleCurrentField,
    resetFieldProps,
    params,
    request,
    ...other
  } = verifyFieldProps;

  const [hisArr, setHisArr] = useLocalStorageState<Record<string, string[]>>('hisDepArr', {
    defaultValue: {},
    listenStorageChange: true,
  });

  const form = Form.useFormInstance();
  const isHovering = useHover(ref);
  const { currentLocale } = useLocale('MsRulesConfig');

  const getFieldRender = useMemo(() => (fieldRender ? { fieldRender } : {}), [fieldRender]);
  const getFieldReadRender = useMemo(
    () =>
      fieldReadRender
        ? {
            fieldReadRender: isFunction(fieldReadRender)
              ? fieldReadRender(lineData)
              : fieldReadRender,
          }
        : {},
    [fieldReadRender, lineData],
  );

  // 处理fieldConfig为函数动态设置fieldProps属性
  const fieldConfig = useMemo<Record<string, any>>(() => {
    if (resetFieldProps && isFunction(resetFieldProps)) {
      return { ...fieldProps, ...resetFieldProps(lineData) };
    }
    return fieldProps;
  }, [fieldProps, lineData, resetFieldProps]);

  // 有依赖值请求接口加上参数
  const depParams = useMemo(() => {
    if (isFunction(request) && dependencies && dependencies.length > 0) {
      const depPramas = {};
      dependencies.forEach((depItem) => {
        Reflect.set(depPramas, depItem, lineData[depItem]);
      });
      return depPramas;
    }
    return {};
  }, [dependencies, lineData, request]);

  const hiddenField = useMemo(() => {
    if (isFunction(hideInForm) && dependencies && dependencies.length > 0) {
      const depValue = {};
      dependencies.forEach((depItem) => {
        Reflect.set(depValue, depItem, lineData[depItem]);
      });
      return hideInForm(depValue);
    }

    return !!hideInForm;
  }, [hideInForm, dependencies, lineData]);

  const fieldValue = useCreation(() => {
    if (valueType === 'select' && (fieldConfig as any)?.labelInValue)
      return { value: lineData?.[dataIndex] !== '' ? lineData?.[dataIndex] : void 0 };
    if (lineData?.[dataIndex] !== '' && lineData?.[dataIndex] !== undefined) {
      if (valueType === 'dateRange' || valueType === 'date') return moment(lineData?.[dataIndex]);
      if (lineData?.[dataIndex] === 'false') return false;
      if (lineData?.[dataIndex] === 'true') return true;
      if (hiddenField) return void 0;
      return lineData?.[dataIndex];
    }
    return void 0;
  }, [dataIndex, hiddenField, fieldConfig, lineData, valueType]);

  useUpdateEffect(() => {
    if (form && isFunction(form.setFieldValue)) {
      form?.setFieldValue(`${pk}_${dataIndex}`, fieldValue);
    }
  }, [dataIndex, fieldValue, form, pk]);

  // useUpdateEffect(() => {
  //   if (hiddenField) {
  //     // todo 并发情况处理
  //     // onFieldChange(fieldValue, dataIndex, valueType, selectdLabelName || '');
  //     console.log(fieldValue, dataIndex, valueType, selectdLabelName || '');
  //   }
  // }, [hiddenField]);

  const setCurrentField = useMemoizedFn((currentValue: any) => {
    const valueEnum = valueEnumToOptions(other.valueEnum);
    const currentLabel = valueEnum?.find((vItem) => vItem.value === currentValue)?.label;
    const vObj =
      (fieldConfig as Record<string, any>)?.labelInValue && valueType === 'select'
        ? { label: currentLabel, value: currentValue }
        : currentValue;
    onFieldChange(vObj, dataIndex, valueType, selectdLabelName || '');
  });

  useDeepCompareEffect(() => {
    if (isFunction(handleCurrentField) && dependencies && dependencies.length > 0) {
      const newObj = { ...hisArr };
      dependencies.forEach((depItem) => {
        if (
          hisArr &&
          hisArr?.[depItem]?.length > 0 &&
          hisArr[depItem].slice(-1)[0] !== (lineData[depItem] ?? null)
        ) {
          handleCurrentField(depItem, lineData, setCurrentField);
        }

        if (hisArr && hisArr?.[depItem]?.length) {
          Reflect.set(newObj, depItem, [...hisArr[depItem].slice(-1), lineData[depItem]]);
          setHisArr(newObj);
        } else {
          Reflect.set(newObj, depItem, [null, lineData[depItem]]);
          setHisArr(newObj);
        }
      });
    }
  }, [lineData]);

  const verifyFieldRules = useCallback(async () => {
    const returnErrOr = (status: 'error' | 'success', msg?: string) => {
      if (status === 'error') {
        setTooltipOpen(true);
        setErrorMsg(msg || currentLocale.verifyError);
        return Promise.reject(new Error(`${msg}` || currentLocale.verifyError));
      } else {
        setErrorMsg(msg ?? '');
        setTooltipOpen(false);
        return Promise.resolve();
      }
    };
    if (_rules && _rules?.length > 0) {
      const requiredLine: BaseRule | null = _rules?.find((item) => item.required) || null;
      const filledRules: BaseRule[] | never[] =
        _rules.filter((item) => !!item && !item.required) || [];
      // 必填
      if (
        requiredLine?.required &&
        (EMPTY_TYPE_ARRAY.includes(fieldValue) || fieldValue?.length === 0)
      ) {
        return await returnErrOr('error', requiredLine?.message || currentLocale.verifyError);
      }
      // 其他校验
      if (filledRules.length > 0) {
        for (let i = 0; i <= filledRules.length; i++) {
          const customVerify = filledRules[i]?.validator;
          if (customVerify && isFunction(customVerify) && filledRules[i]) {
            const [status, msg] = await customVerify(lineData);
            if (status === 'error') {
              return await returnErrOr(status, msg);
            }
          }
          if (!customVerify && filledRules[i]) {
            const [status, msg] = handleVerifyField(fieldValue, filledRules[i] as BaseRule);
            if (status === 'error') {
              return await returnErrOr(status, msg);
            }
          }
        }
      }
    }
    return await returnErrOr('success', '');
  }, [_rules, fieldValue, lineData]);

  return (
    <>
      {!hiddenField && (
        <div className="ms-rules-config-field" ref={ref}>
          <Popover
            open={isHovering && tooltipOpen}
            content={
              <span>
                <ExclamationCircleOutlined
                  style={{ marginRight: 4, color: '#f54545', verticalAlign: 'middle' }}
                />
                {errorMsg}
              </span>
            }
            placement={'top'}
            destroyTooltipOnHide
          >
            <Form.Item
              label={''}
              name={`${pk}_${dataIndex}`}
              help={<></>}
              rules={[{ validator: verifyFieldRules }]}
              dependencies={dependencies?.map((depIndex) => `${pk}_${depIndex}`) ?? []}
            >
              <MsField
                {...other}
                {...getFieldRender}
                {...getFieldReadRender}
                valueType={valueType ?? 'text'}
                params={{ ...params, ...depParams }}
                request={request}
                fieldProps={{
                  ...(fieldConfig as object),
                  id: dataIndex,
                  value: fieldValue,
                  onChange: (value: any) => {
                    if (
                      valueType === 'text' ||
                      valueType === 'textArea' ||
                      (!valueType && !fieldRender)
                    ) {
                      onFieldChange(value?.target?.value || '', dataIndex, valueType);
                    } else {
                      if (moment.isMoment(value)) {
                        const formatValue = moment(value).format(
                          fieldConfig?.format ? fieldConfig.format : 'YYYY-MM-DD',
                        );
                        onFieldChange(formatValue, dataIndex, valueType, '');
                      } else {
                        onFieldChange(value, dataIndex, valueType, selectdLabelName || '');
                      }
                    }
                  },
                }}
              />
            </Form.Item>
          </Popover>
        </div>
      )}
    </>
  );
};

export default memo(TooltipVerifyField);
