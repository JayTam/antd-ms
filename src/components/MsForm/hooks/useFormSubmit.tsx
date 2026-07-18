import type { MsFormProps } from '..';
import type { FormInstance } from 'antd';
import { useControllableValue, useThrottleFn } from 'ahooks';

function useFormSubmit<P, R, D>(
  props: Pick<MsFormProps<P, R, D>, 'onFinish'>,
  form: FormInstance,
  onFinishSuccess?: () => void,
) {
  const { onFinish } = props;

  const [submitLoading, setSubmitLoading] = useControllableValue(props, {
    valuePropName: 'submitLoading',
    trigger: 'setSubmitLoading',
    defaultValue: false,
  });

  const handleFinish = async (values: any) => {
    try {
      setSubmitLoading(true);
      await onFinish?.(values);
      onFinishSuccess?.();
    } finally {
      setSubmitLoading(false);
    }
  };

  const { run } = useThrottleFn(
    async () => {
      form.submit();
    },
    { wait: 1000, leading: true, trailing: false },
  );

  return {
    submitLoading,
    setSubmitLoading,
    handleFinish,
    handleSubmit: run,
    handleSubmitNoThrottle: () => {
      form.submit();
    },
  };
}

export default useFormSubmit;
