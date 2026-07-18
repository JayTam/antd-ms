import type { RefSelectProps } from 'antd';
import { useRef } from 'react';
import { useComposeRef } from 'rc-util/lib/ref';

type Props = {
  onClear?: () => void;
  onChange?: (...args: any[]) => void;
  onDropdownVisibleChange?: (open: boolean) => void;
  defaultOpen?: boolean;
};

type Ref = Pick<RefSelectProps, 'blur' | 'focus'>;

/**
 * 解决 antd 多选选择器，在点击选择器上的删除按钮时，无法触发失焦事件，影响在 MsTable 的交互体验
 * @param props 组件参数，如果重写这几个属性请单独再次传入到此参数中，onClear, onDeselect, onDropdownVisibleChange, defaultOpen
 * @param ref 组件 Ref
 * @param isMutiple 是否多选
 * @returns 重写的参数，追加到 props 后面，覆盖原有属性
 */
function useMutipleClearBlur<P extends Props, R extends Ref>(
  props: P,
  ref: React.Ref<R>,
  isMutiple: (props: P) => boolean,
): Pick<P, 'onChange' | 'onClear' | 'onDropdownVisibleChange' | 'defaultOpen'> & {
  ref: React.Ref<R>;
} {
  const { onClear, onChange, onDropdownVisibleChange, defaultOpen } = props;

  const innerRef: React.Ref<R> = useRef(null);
  const composeRef = useComposeRef(ref, innerRef);
  const openRef = useRef(defaultOpen);

  const handleClear: typeof onClear = () => {
    onClear?.();
    if (isMutiple(props)) {
      setTimeout(() => innerRef.current?.blur(), 0);
    }
  };

  const handleChange: typeof onChange = (...args) => {
    onChange?.(...args);
    // 解决多选时点击标签上的删除不会触发失焦事件
    if (isMutiple(props) && !openRef.current) {
      innerRef.current?.focus();
      innerRef.current?.blur();
    }
  };

  const handleDropdownVisibleChange = (open: boolean) => {
    onDropdownVisibleChange?.(open);
    if (isMutiple(props)) openRef.current = open;
  };

  return {
    ref: composeRef,
    defaultOpen,
    onClear: handleClear,
    onChange: handleChange,
    onDropdownVisibleChange: handleDropdownVisibleChange,
  };
}

export default useMutipleClearBlur;
