import { Row, Select, Spin } from 'antd';
import cls from 'classnames';
import { isNil } from 'lodash-es';
import { forwardRef } from 'react';

import type { SelectProps } from '../../types';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import useMutipleClearBlur from '../../hooks/useMutipleClearBlur';

const BaseSelect = forwardRef<any, SelectProps>((props, ref) => {
  const {
    loading,
    refreshButton,
    initialLoading,
    className,
    requestSearchKey,
    mode,
    ...selectProps
  } = props;

  const { getPopupContainer } = useFieldPopupContainer();

  const extraSelectProps = useMutipleClearBlur(
    props,
    ref,
    (props) => props.mode === 'multiple' || props.mode === 'tags',
  );

  const dropdownLoadingNode = (
    <Row justify="center" style={{ padding: 30 }}>
      <Spin />
    </Row>
  );

  return (
    <Select
      loading={loading}
      allowClear
      filterOption={isNil(requestSearchKey)}
      optionFilterProp={'label'}
      showSearch
      notFoundContent={loading ? dropdownLoadingNode : undefined}
      getPopupContainer={getPopupContainer}
      className={cls(initialLoading ? 'initial-loading' : undefined, className)}
      {...selectProps}
      mode={mode}
      // mode=multiple 时， value=null 会莫名展示一个空标签，本身属于 antd 问题，这里做一下兼容
      value={mode === 'multiple' ? selectProps.value ?? undefined : selectProps.value}
      {...extraSelectProps}
    />
  );
});

export default BaseSelect;
