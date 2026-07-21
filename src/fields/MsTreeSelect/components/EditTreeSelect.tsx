import type { PropsWithChildren, ReactElement } from 'react';
import { forwardRef } from 'react';
import type { MsTreeSelectRef, TreeSelectProps } from '../types';
import { Row, Spin, TreeSelect } from 'antd';
import cls from 'classnames';
import { useFieldPopupContainer } from '@jaytam/antd-ms/hooks';
import useMutipleClearBlur from '../../MsSelect/hooks/useMutipleClearBlur';

type EditTreeSelectComponentType = (
  props: PropsWithChildren<TreeSelectProps> & { ref?: MsTreeSelectRef },
) => ReactElement;

const EditTreeSelect = forwardRef((props: TreeSelectProps, ref: MsTreeSelectRef) => {
  const { className, loading, initialLoading, ...restProps } = props;

  const { getPopupContainer } = useFieldPopupContainer();

  const dropdownLoadingNode = (
    <Row justify="center" style={{ padding: 30 }}>
      <Spin />
    </Row>
  );

  const extraProps = useMutipleClearBlur(props, ref, ({ multiple }) => !!multiple);

  return (
    <TreeSelect
      loading={loading}
      allowClear
      showSearch
      notFoundContent={loading ? dropdownLoadingNode : undefined}
      getPopupContainer={getPopupContainer}
      className={cls(initialLoading ? 'initial-loading' : undefined, className)}
      {...restProps}
      {...extraProps}
    />
  );
});

export default EditTreeSelect as EditTreeSelectComponentType;
