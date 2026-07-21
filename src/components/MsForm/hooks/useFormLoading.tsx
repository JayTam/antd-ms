import { useState } from 'react';
import type { MsFormProps } from '..';
import { isFunction } from 'lodash-es';

function useFormInitLoading<P, R, D>(props: Pick<MsFormProps<P, R, D>, 'request'>) {
  const { request } = props;

  const [loading, setLoading] = useState(isFunction(request));

  return { loading, setLoading };
}

export default useFormInitLoading;
