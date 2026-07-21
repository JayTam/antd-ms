import { Cascader, Row, Spin } from 'antd';
import type { CascaderProps, MsCascaderRef } from '../types';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import { forwardRef } from 'react';
import cls from 'classnames';
import useMutipleClearBlur from '../../MsSelect/hooks/useMutipleClearBlur';

const EditCascader = forwardRef(
  (props: CascaderProps & { onRefreshOptions?: () => void }, ref: MsCascaderRef) => {
    const {
      className,
      loading,
      initialLoading,
      defaultOpen = false,
      onChange,
      onClear,
      onDropdownVisibleChange,
      loadChildrenData,
      onRefreshOptions,
      ...restProps
    } = props;
    const { getPopupContainer } = useFieldPopupContainer();

    const dropdownLoadingNode = (
      <Row justify="center" style={{ padding: 30 }}>
        <Spin />
      </Row>
    );

    const extraProps = useMutipleClearBlur(props, ref, (props) => !!props.multiple);

    return (
      <Cascader
        loading={loading}
        defaultOpen={defaultOpen}
        allowClear
        showSearch
        notFoundContent={loading ? dropdownLoadingNode : undefined}
        getPopupContainer={getPopupContainer}
        loadData={(selectedOptions) => {
          const targetOption = selectedOptions[selectedOptions.length - 1];
          targetOption.loading = true;
          loadChildrenData?.(targetOption)
            .then((children) => {
              targetOption.loading = false;
              targetOption.children = children;
              onRefreshOptions?.();
            })
            .catch(() => {
              targetOption.loading = false;
              targetOption.children = [];
              onRefreshOptions?.();
            });
        }}
        className={cls(initialLoading ? 'initial-loading' : undefined, className)}
        {...restProps}
        {...extraProps}
      />
    );
  },
);

export default EditCascader;
