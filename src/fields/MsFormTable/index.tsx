import { ModeContext, useFieldModeContext } from '@jaytam/antd-ms/components/MsForm/contexts/mode';
import { forwardRef, useMemo } from 'react';
import useModeRender from '../../hooks/useModeRender';
import enhanceField from '../enhanceField';
import FormTable from './formTable';
import type { MsFormTableProps, MsFormTableRef } from './types';

const MsFormTable = forwardRef((props: MsFormTableProps, ref: MsFormTableRef) => {
  const { fieldProps } = props;
  const { mode, emptyText, enumLoadingType } = useFieldModeContext(props);

  const editDom = <FormTable ref={ref} {...fieldProps} />;

  const readDom = <FormTable ref={ref} {...fieldProps} hideAddButton actions={[]} />;

  const dom = useModeRender(props, editDom, readDom);

  const value = useMemo(() => {
    return {
      mode,
      emptyText,
      enumLoadingType,
    };
  }, [emptyText, enumLoadingType, mode]);

  /** 想要 column.mode 对下面所有字段生效，需在次再设置一层 ModeContext */
  return <ModeContext.Provider value={value}>{dom}</ModeContext.Provider>;
});

export default enhanceField(MsFormTable);
