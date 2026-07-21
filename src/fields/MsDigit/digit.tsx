import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { ConfigProvider, InputNumber } from 'antd';
import cls from 'classnames';
import { isNil, isNumber, isString, omit } from 'lodash-es';
import { useComposeRef } from 'rc-util/lib/ref';

import type { Ref } from 'react';
import { forwardRef, useContext, useMemo, useRef, useState } from 'react';
import type { DigitProps, MsDigitRef } from './types';

import { useUpdateEffect } from 'ahooks';
import './index.less';

const Digit = forwardRef((props: DigitProps, ref: Ref<MsDigitRef>) => {
  const { className, style, onFocus, onBlur, onSearch, value, onChange, max, min, disabled } =
    props;
  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();
  const innerRef = useRef<HTMLInputElement>(null);
  const composeRef = useComposeRef(ref, innerRef);

  const [focused, setFocused] = useState(false);

  /**
   * 点击新增
   * @param event
   */
  const handleClickPlus: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const upElement = innerRef.current?.parentElement?.parentElement?.querySelector(
      `.${prefixCls}-input-number-handler-wrap .${prefixCls}-input-number-handler-up`,
    );
    upElement?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    upElement?.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
  };

  /**
   * 点击减少
   * @param event
   */
  const handleClickMinus: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const downElement = innerRef.current?.parentElement?.parentElement?.querySelector(
      `.${prefixCls}-input-number-handler-wrap .${prefixCls}-input-number-handler-down`,
    );
    downElement?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
    downElement?.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
  };

  const disabledMinus = useMemo(() => {
    if (isNil(value)) return false;
    return Number(value) <= min;
  }, [value, min]);

  const disabledPlus = useMemo(() => {
    if (isNil(value)) return false;
    return Number(value) >= max;
  }, [value, max]);

  /**
   * 当范围变化时，如果超过范围自动重置到最接近的范围
   */
  useUpdateEffect(() => {
    if (isNil(value)) return;
    const numValue = isString(value) ? parseInt(value) : value;

    if (isNumber(min) && numValue < min) {
      onChange?.(min);
    }

    if (isNumber(max) && numValue > max) {
      onChange?.(max);
    }
  }, [max, min]);

  return (
    <span
      className={cls(
        'ms-digit',
        `${prefixCls}-input-affix-wrapper`,
        focused ? `${prefixCls}-input-affix-wrapper-focused` : undefined,
        disabled ? `${prefixCls}-input-affix-wrapper-disabled` : undefined,
        className,
      )}
      style={style}
    >
      <MinusOutlined
        className={cls(
          'ms-digit-btn',
          'ms-digit-minus-btn',
          disabled || disabledMinus ? 'ms-digit-btn-disabled' : undefined,
        )}
        onClick={handleClickMinus}
        role="button"
      />
      <InputNumber
        {...omit(props, 'onSearch')}
        bordered={false}
        controls={true}
        className="ms-digit-input"
        ref={composeRef}
        onChange={(event) => {
          onChange?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            // @ts-ignore
            onSearch?.(event.target.value);
          }
        }}
      />
      <PlusOutlined
        className={cls(
          'ms-digit-btn',
          'ms-digit-plus-btn',
          disabled || disabledPlus ? 'ms-digit-btn-disabled' : undefined,
        )}
        onClick={handleClickPlus}
        role="button"
      />
    </span>
  );
});

export default Digit;
