import { MsForm } from '@jaytam/antd-ms/components';
import { mergeNamePath } from '@jaytam/antd-ms/components/MsForm/utils/namePath';
import type { FormListOperation } from 'antd';
import { Form, message } from 'antd';
import type { FormListProps as AntFormListProps, FormListFieldData } from 'antd/es/form';
import type { NamePath } from 'antd/es/form/interface';
import { isFunction, isNumber } from 'lodash-es';
import type { FormTableProps } from '../../MsFormTable/types';
import type { FormListOperationAction, FormListProps } from '../types';
import { MsFormListContext } from '../context';
import { replaceMessage, useLocale } from '@jaytam/antd-ms/locale';

type FormListWrapperProps = (FormListProps & FormTableProps) & {
  children?: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: {
      errors: React.ReactNode[];
      warnings: React.ReactNode[];
    },
    action: FormListOperationAction,
  ) => React.ReactNode;
};

/**
 * 套一层 FormList，
 * 1. 实现 remove 和 move 同步 VALUE_ENUM_SYNC_BASE_PATH 功能
 * 2. 实现自定义的操作功能
 * @param props
 * @returns
 */
const FormListWrapper = (props: FormListWrapperProps) => {
  const {
    max,
    min,
    addDefaultValue,
    addButtonPosition = 'bottom',
    addValidate = false,
    watchList,
    children,
    _loading: loading = false,
    _formItemProps: formItemProps = {},
    _valuesNormal: valuesNormal = false,
  } = props;

  const formListName = formItemProps?.name;

  const { currentLocale } = useLocale('MsFormList');

  const form = Form.useFormInstance();

  // 监听 list 本身，list下任一字段变更都会引起 list 变更
  Form.useWatch(watchList ? formListName : '_', form);

  // 重新触发校验
  const validateFormList = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        form
          .validateFields(formListName, { recursive: true })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      }, 0);
    });

  return (
    <MsFormListContext.Provider
      value={{
        inContext: true,
        formItemProps,
        valuesNormal,
        loading,
      }}
    >
      <Form.List {...formItemProps} name={formItemProps?.name as string}>
        {(fields, originOperation, meta) => {
          /**
           * 主要实现 remove 和 move 同步 VALUE_ENUM_SYNC_BASE_PATH 功能
           */
          const operation: FormListOperation = {
            add: originOperation.add,
            remove: (index) => {
              originOperation.remove(index);
              /** 后面同步修改 ValueEnum */
              const listValue = form.getFieldValue([
                MsForm.VALUE_ENUM_SYNC_BASE_PATH,
                formListName,
              ]);
              if (listValue) {
                listValue?.splice(index, 1);
                form.setFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, formListName], listValue);
              }
            },
            move: (from, to) => {
              originOperation.move(from, to);
              /** 后面同步修改 ValueEnum */
              const listValue = form.getFieldValue([
                MsForm.VALUE_ENUM_SYNC_BASE_PATH,
                formListName,
              ]);
              if (listValue) {
                const formValue = listValue[from];
                const toValue = listValue[to];
                listValue?.splice(to, 1, formValue);
                listValue?.splice(from, 1, toValue);
                form.setFieldValue([MsForm.VALUE_ENUM_SYNC_BASE_PATH, formListName], listValue);
              }
            },
          };

          /**
           * 重新实现之后的操作
           */
          const action = {
            /** 添加行 */
            add: async () => {
              if (isNumber(max)) {
                if (fields.length >= max) {
                  message.destroy();
                  message.error(replaceMessage(currentLocale.maxTip, { max }));
                  return false;
                }
              }
              const defaultValue = isFunction(addDefaultValue)
                ? addDefaultValue(fields)
                : addDefaultValue;

              const insertIndex = addButtonPosition === 'bottom' ? undefined : 0;

              if (addValidate) {
                const isValidate = await validateFormList();
                if (isValidate) operation.add(defaultValue, insertIndex);
              } else {
                operation.add(defaultValue, insertIndex);
              }
              return true;
            },
            /** 移除行 */
            remove: (index: number) => {
              if (isNumber(min)) {
                if (fields.length <= min) {
                  message.destroy();
                  message.error(replaceMessage(currentLocale.minTip, { min }));
                  return false;
                }
              }
              operation.remove(index);
              validateFormList();
            },
            /** 移动行 */
            move: (index: number, type: 'up' | 'down') => {
              if (type === 'up') {
                operation.move(index, index - 1);
              }
              if (type === 'down') {
                operation.move(index, index + 1);
              }
              validateFormList();
            },
            /** 复制行 */
            copy: (index: number) => {
              const indexPathName = mergeNamePath(formListName, index);
              const values = form.getFieldValue(indexPathName);
              operation.add(values);
              validateFormList();
            },
          };

          return children?.(fields, originOperation, meta, action);
        }}
      </Form.List>
    </MsFormListContext.Provider>
  );
};

export default FormListWrapper;
