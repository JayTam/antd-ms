import { useDeepCompareEffect, useRequest } from 'ahooks';
import { cloneDeep, isFunction, isNil, merge } from 'lodash-es';
import type { MsBaseFormProps } from '../components/MsBaseForm';
import { parseFormValues } from '../utils/formValues';

/**
 * 处理表单初始值的远程请求，并与 initialValue 合并
 * @param props
 * @returns
 */
function useFormRequest<P, R, D>(props: MsBaseFormProps<P, R, D>) {
  const {
    initialValues: originInitialValues,
    dataSource,
    request,
    skipRequest,
    postRes = (res) => (res as any)?.data,
    params,
    debounceTime = 0,
    refreshOnWindowFocus = false,
    loading,
    setLoading,
    columns,
    form,
    valuesNormal,
  } = props;

  const propsInitialValues = valuesNormal
    ? originInitialValues
    : parseFormValues(originInitialValues, columns);

  const data = useRequest(
    async (loadingState: boolean = true) => {
      if (loadingState) setLoading(true);
      const res = await request?.(params as P);
      const data = res ? postRes(res) : {};
      const remoteInitialValues = valuesNormal ? data : parseFormValues(data, columns);
      // 合并 MsForm.initialValues 和 request 远程获取初始值
      return merge(cloneDeep(propsInitialValues), remoteInitialValues);
    },
    {
      manual: true,
      debounceWait: debounceTime,
      refreshOnWindowFocus,
      onFinally: () => setLoading(false),
    },
    [
      () => {
        return {
          onBefore: () => {
            // 跳过请求
            if (skipRequest?.(params as P)) {
              setLoading(false);
              return { stopNow: true };
            }
            return {};
          },
        };
      },
    ],
  );

  // 规避引用变更就重新请求，要值发生变化才重新请求
  useDeepCompareEffect(() => {
    if (isFunction(request)) {
      data.runAsync().then(() => {
        // 等初始值状态变更之后才重置，不能设置 0 一些项目有问题
        setTimeout(() => form?.resetFields(), 100);
      });
    }
  }, [params]);

  // MsDescriptions dataSource 状态更新同步表单状态
  useDeepCompareEffect(() => {
    if (isNil(dataSource)) return;
    if (valuesNormal) {
      form?.setFieldsValue(dataSource as any);
    } else {
      form?.setFieldsValue(parseFormValues(dataSource as any, columns));
    }
  }, [dataSource]);

  // 表单初始值
  const initialValues = isFunction(request) ? data.data : propsInitialValues;

  return { ...data, loading, initialValues };
}

export default useFormRequest;
