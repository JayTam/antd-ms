import { Skeleton } from 'antd';
import { forwardRef } from 'react';

import { useFieldModeContext } from '../../components/MsForm/contexts/mode';
import useFieldRequest from '../../hooks/useFieldRequest';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import ResourceType from './resourceType';
import { getResourceTypeList } from './service';

import type { MsResourceTypeProps, MsResourceTypeRef } from './types';

/**
 * 资源类型选择器
 */
const MsResourceType = forwardRef((props: MsResourceTypeProps, ref: MsResourceTypeRef) => {
  const { initialLoading, loading, label, fieldProps } = useFieldRequest({
    request: getResourceTypeList,
    postRes: (res) => res?.data?.list,
    valueEnumFiledNames: { label: 'resourceTypeName', value: 'resourceTypeCode' },
    ...props,
    fieldProps: {
      mode: 'multiple',
      ...props.fieldProps,
    },
  });
  const { mode } = useFieldModeContext(props);

  const editDom = (
    <ResourceType {...fieldProps} loading={loading} ref={ref} initialLoading={initialLoading} />
  );

  const readDom = label;

  const dom = useModeRender(props, editDom, readDom);

  if (mode === 'read' && loading) {
    return <Skeleton.Input block active size="small" />;
  }

  return dom;
});

export default enhanceField(MsResourceType);
