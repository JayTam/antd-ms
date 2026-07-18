import { valueEnumToOptions } from '@jaytam/antd-ms/utils';
import { isFunction } from 'lodash-es';
import type { ResourceGroupProps } from '../types';

type QueryDepartmentProps = {
  request?: ResourceGroupProps['departmentRequest'];
  params?: ResourceGroupProps['departmentParams'];
  postRes?: ResourceGroupProps['departmentPostRes'];
  valueEnumFiledNames?: ResourceGroupProps['departmentValueEnumFiledNames'];
};

const queryDepartment = async (props: QueryDepartmentProps, valuesNormal?: boolean) => {
  const { request, params, postRes = (res) => res.data, valueEnumFiledNames } = props;
  if (isFunction(request)) {
    const originRes = await request(params);
    const opts = isFunction(postRes) ? postRes(originRes) : originRes;
    return valueEnumToOptions(opts, valueEnumFiledNames, valuesNormal, false);
  }
};

export default queryDepartment;
