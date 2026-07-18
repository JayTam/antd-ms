import { useMemoizedFn } from 'ahooks';
import { isNil } from 'lodash-es';
import { useEffect, useRef } from 'react';

/**
 * 解决开启 syncToValueEnum 并且有初始值时，初始值对应的 option 没有设置到 form 中
 * @param value
 */
function useInitialValueEnumSyncToForm(props: any) {
  const { value, onChange, options, valueEnumSyncToForm } = props;

  const hasSyncRef = useRef(!valueEnumSyncToForm);

  const hasInitialValueRef = useRef(!isNil(value));

  const updateChange = useMemoizedFn(() => {
    const option = options.find((option: any) => option.value === value);
    if (option) {
      onChange?.(value, option);
      hasSyncRef.current = true;
    }
  });

  useEffect(() => {
    if (hasInitialValueRef.current === false) {
      return;
    }
    if (hasSyncRef.current) {
      return;
    }
    updateChange();
  }, [options, updateChange]);
}

export default useInitialValueEnumSyncToForm;
