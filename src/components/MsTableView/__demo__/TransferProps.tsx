import React from 'react';

const TransferProps = ({
  id,
  onChange,
  value,
  children,
}: {
  id?: string;
  onChange?: (v: any) => void;
  value?: any;
  children: (v: {
    onChange?: (v: any) => void;
    value?: any;
    id?: string;
  }) => React.ReactNode | Element;
}): any => {
  if (React.isValidElement(children)) {
    return children;
  }
  if (children instanceof Function) {
    return children({ onChange, value, id });
  }
  return null;
};

export default TransferProps;
