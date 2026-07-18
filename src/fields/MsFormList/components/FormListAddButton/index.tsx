import { MsAddOutlined } from '@jaytam/icons';
import { Button, Form, Skeleton, type FormListFieldData } from 'antd';
import { isFunction, isNil, isNumber } from 'lodash-es';
import { useMemo, type CSSProperties } from 'react';
import type { FormListOperationAction, FormListProps } from '../../types';
import cls from 'classnames';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

export type FormListAddButtonProps = {
  fields: FormListFieldData[];
  listProps: FormListProps;
  action: FormListOperationAction;
  style?: CSSProperties;
};

function FormListAddButton(props: FormListAddButtonProps) {
  const { listProps, action, fields, style } = props;
  const { globalLocale } = useLocale();
  const {
    max,
    actions = ['del'],
    hideAddButton = false,
    addButtonRender,
    addButtonProps,
    addButtonText = globalLocale.add,
    hideAddButtonLimitText,
    _loading: loading = false,
  } = listProps;
  const form = Form.useFormInstance();

  const lengLimitText = useMemo(() => {
    if (hideAddButtonLimitText) return null;
    if (isNumber(max) === false) return null;

    return (
      <span>
        （{fields.length ?? 0}/{max}）
      </span>
    );
  }, [fields.length, hideAddButtonLimitText, max]);

  // 操作列有新增，隐藏新增按钮
  if (actions.findIndex((action: any) => action === 'add') > -1) return null;
  // 用户配置，隐藏新增按钮
  if (hideAddButton) return null;

  if (loading) return <Skeleton.Input block active />;

  // 自定义新增按钮
  if (isFunction(addButtonRender)) {
    return addButtonRender(action.add);
  }

  return (
    <Button
      onClick={action.add}
      type="link"
      style={style}
      // 超过最大限制，禁用新增按钮
      disabled={!isNil(max) && fields.length >= max}
      {...addButtonProps}
      className={cls('ms-form-list-add-btn', addButtonProps?.className)}
    >
      <div className="ms-form-list-add-btn-content">
        <MsAddOutlined className="ms-form-list-add-icon" />
        <span className="ms-form-list-add-text">
          {isFunction(addButtonText) ? addButtonText(form) : addButtonText}
        </span>
        {lengLimitText}
      </div>
    </Button>
  );
}

export default FormListAddButton;
