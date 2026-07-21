import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import BaseSelect from '../EditSelect/BaseSelect';
import { CaretDownOutlined } from '@ant-design/icons';
import ClickEditWrap from '@jaytam/antd-ms/fields/components/ClickEditWrap';
import type { MsSelectRef, SelectProps } from '../../types';

const ClickEditSelect = forwardRef(
  (props: SelectProps & { readDom?: ReactNode }, ref: MsSelectRef) => {
    const { readDom, readOnly, ...restProps } = props;

    return (
      <ClickEditWrap readDom={readDom} ellipsis mode="select" readOnly={readOnly}>
        <BaseSelect
          ref={ref}
          showSearch={false}
          bordered={false}
          showArrow
          suffixIcon={<CaretDownOutlined style={{ color: '#464f5c' }} />}
          {...restProps}
        />
      </ClickEditWrap>
    );
  },
);

export default ClickEditSelect;
