import { useControllableValue } from 'ahooks';
import type { InputProps, InputRef } from 'antd';
import { Input, Tooltip } from 'antd';
import { isUndefined } from 'lodash-es';
import type { Ref } from 'react';
import { forwardRef, useRef } from 'react';
import { findClosest, isNumberConsecutive, prettifyValidRangeTips } from '../utils';

export type IpCellProps = Omit<InputProps, 'onChange'> & {
  dot?: boolean;
  /** 切换到下个 cell */
  onNext?: () => void;
  /** 切换到上个 cell */
  onPrev?: () => void;
  onChange?: (value: string) => void;
  max?: number;
  min?: number;
  /** 合法 value 范围 */
  validValueRange?: number[];
};

const IpCell = forwardRef((props: IpCellProps, ref: Ref<InputRef>) => {
  const {
    dot = true,
    onNext,
    onPrev,
    className,
    max = 255,
    min = 0,
    value: _value,
    onChange: _onChange,
    validValueRange,
    onBlur,
    ...inputProps
  } = props;

  const [value, onChange] = useControllableValue(props);

  const pendingArrowRight = useRef(false);
  const pendingLeftRight = useRef(false);
  const pendingBackspace = useRef(false);

  const handleChange: InputProps['onChange'] = (event) => {
    const newValue: string = event.target?.value;
    const formatValueString = newValue.replace(/[^\d]/g, '');
    const length = formatValueString.length;
    const formatValueNumber = formatValueString === '' ? undefined : parseInt(formatValueString);

    if (isUndefined(formatValueNumber)) {
      onChange('');
    } else {
      // 最大限制 255
      if (formatValueNumber >= max) {
        onChange(max.toString());
        onNext?.();
        return;
      }
      // 最小限制 0
      if (formatValueNumber <= min) {
        onChange(min.toString());
        return;
      }
      // 过滤之后
      onChange(formatValueNumber.toString());

      // 输入超过3位自动跳转下一项
      if (length >= 3) {
        onNext?.();
      }
    }
  };

  const handleBlur: InputProps['onBlur'] = (event) => {
    // 重置缓冲
    pendingArrowRight.current = false;
    pendingLeftRight.current = false;
    pendingBackspace.current = false;
    // 有限制范围
    if (validValueRange) {
      const newValue: string = event.target?.value;
      const formatValueString = newValue.replace(/[^\d]/g, '');
      const formatValueNumber = formatValueString === '' ? undefined : parseInt(formatValueString);
      if (isUndefined(formatValueNumber)) {
        return;
      }
      if (!validValueRange.includes(formatValueNumber)) {
        const closeValue = findClosest(formatValueNumber, validValueRange);
        onChange?.(closeValue);
      }
    }
    onBlur?.(event);
  };

  const tooltipRender = () => {
    if (validValueRange) {
      if (validValueRange.length == 0) {
        return null;
      }

      if (isNumberConsecutive(validValueRange)) {
        return [validValueRange[0], validValueRange[validValueRange.length - 1]].join(' - ');
      }

      return prettifyValidRangeTips(validValueRange);
    }

    return `${min} - ${max}`;
  };

  return (
    <span className={className}>
      <Tooltip title={tooltipRender()} trigger="focus">
        <Input
          disabled={validValueRange && validValueRange.length === 0}
          {...inputProps}
          className="ip-input"
          value={value}
          onChange={handleChange}
          ref={ref}
          bordered={false}
          onBlur={handleBlur}
          // onPasteCapture={}
          onKeyUp={(event) => {
            const inputEl = event.target as HTMLInputElement;
            const length = inputEl.value?.length ?? 0;
            const current = inputEl.selectionStart ?? 0;

            // 数字键
            const NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            // 回退键
            const BACKSPACE_KEY = 'Backspace';
            // 左键
            const ARROW_LEFT_KEY = 'ArrowLeft';
            // 右键
            const ARROW_RIGHT_KEY = 'ArrowRight';

            // 按下 "." 直接切换到下一个 cell
            if (event.key === '.' && current >= 1) {
              onNext?.();
              return;
            }

            // 按下 "Backspace" 删除，当没有内容切换到上一个 cell
            if (event.key === BACKSPACE_KEY) {
              if (current === 0) {
                if (pendingBackspace.current) {
                  onPrev?.();
                } else {
                  pendingBackspace.current = true;
                }
              }
            } else {
              if (NUMBER_KEYS.includes(event.key)) {
                pendingBackspace.current = false;
              }
            }

            // 按下 "left", "right"，切换左右
            if (inputEl.selectionStart === inputEl.selectionEnd) {
              /** 无内容时 */
              if (length === 0) {
                if (event.key === ARROW_LEFT_KEY) {
                  onPrev?.();
                  return;
                }
                if (event.key === ARROW_RIGHT_KEY) {
                  onNext?.();
                  return;
                }
              }

              /** 有内容时 */

              // 向左
              if (event.key === ARROW_LEFT_KEY) {
                if (current === 0) {
                  if (pendingLeftRight.current) {
                    onPrev?.();
                  } else {
                    pendingLeftRight.current = true;
                  }
                }
              } else {
                if ([...NUMBER_KEYS, ARROW_RIGHT_KEY].includes(event.key)) {
                  pendingLeftRight.current = false;
                }
              }

              // 向右
              if (event.key === ARROW_RIGHT_KEY) {
                if (current === length) {
                  if (pendingArrowRight.current) {
                    onNext?.();
                  } else {
                    pendingArrowRight.current = true;
                  }
                }
              } else {
                if ([...NUMBER_KEYS, ARROW_LEFT_KEY].includes(event.key)) {
                  pendingArrowRight.current = false;
                }
              }
            }
          }}
        />
      </Tooltip>

      {dot && <span className="dot" />}
    </span>
  );
});

export default IpCell;
