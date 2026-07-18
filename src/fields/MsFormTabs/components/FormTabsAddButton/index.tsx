import type { ButtonProps } from 'antd';
import { Button, Form, type FormListFieldData } from 'antd';
import { isFunction, isNil, isNumber } from 'lodash-es';
import { useMemo, type CSSProperties } from 'react';
import type { FormTabsProps } from '../../types';
import { MsAddOutlined } from '@jaytam/icons';
import cls from 'classnames';
import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

type FormTabsAddButtonProps = {
  fields?: FormListFieldData[];
  listProps?: FormTabsProps;
  style?: CSSProperties;
  onAdd?: ButtonProps['onClick'];
};

function FormTabsAddButton(props: FormTabsAddButtonProps) {
  const { listProps = {}, fields = [], style, onAdd } = props;
  const { globalLocale } = useLocale();
  const {
    max,
    hideAddButton = false,
    addButtonText = globalLocale.add,
    addButtonProps,
    hideAddButtonLimitText,
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

  // 用户配置，隐藏新增按钮
  if (hideAddButton) return null;
  // 超过最大限制，隐藏新增按钮
  const disabled = !isNil(max) && fields.length >= max;

  return (
    <Button
      className={cls('box-tabs-add')}
      disabled={disabled}
      onClick={onAdd}
      style={style}
      {...addButtonProps}
    >
      <MsAddOutlined className="box-tabs-add-icon" />
      <p className="box-tabs-add-text">
        {isFunction(addButtonText) ? addButtonText(form) : addButtonText}
        {lengLimitText}
      </p>
    </Button>
  );
}

export default FormTabsAddButton;
