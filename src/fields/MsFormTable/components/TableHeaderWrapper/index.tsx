import { omit } from 'lodash-es';
import type { ReactNode } from 'react';
import './index.less';

type TableHeaderWrapperProps = {
  className?: string;
  topRender?: ReactNode;
  children?: ReactNode;
  columnNum?: number;
};

function TableHeaderWrapper(props: TableHeaderWrapperProps) {
  const { children, topRender, columnNum, ...restProps } = props;

  if (topRender) {
    return (
      <thead {...restProps}>
        {children}
        <tr className="ms-table-top-tr">
          <td colSpan={0} style={{ visibility: 'hidden' }}>
            {topRender}
          </td>
          <td colSpan={columnNum} className="ms-form-table-top-tr">
            {topRender}
          </td>
        </tr>
      </thead>
    );
  }

  return <thead {...omit(props, 'topRender', 'columnNum')} />;
}

export default TableHeaderWrapper;
