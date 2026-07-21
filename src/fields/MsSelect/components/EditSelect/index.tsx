import { forwardRef } from 'react';
import type { MsSelectRef, SelectProps } from '../../types';
import CheckboxSelect from './CheckboxSelect';
import BaseSelect from './BaseSelect';
import { Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const EditSelect = forwardRef(
  (props: SelectProps & { onRefresh?: () => void }, ref: MsSelectRef) => {
    const { checkbox, refreshButton, onRefresh, style, ...restProps } = props;

    const selectProps = { ref, ...restProps, style: refreshButton ? { width: '100%' } : style };

    const selectNode = checkbox ? (
      <CheckboxSelect {...selectProps} />
    ) : (
      <BaseSelect {...selectProps} />
    );

    if (refreshButton) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', ...style }}>
          {selectNode}
          <Button type="link" onClick={() => onRefresh?.()} icon={<SyncOutlined />} />
        </div>
      );
    }

    return selectNode;
  },
);

export default EditSelect;
