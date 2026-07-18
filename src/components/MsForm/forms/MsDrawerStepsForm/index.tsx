import type { MsFormProps } from '@jaytam/antd-ms';
import MsDrawer from '../../../MsDrawer';
import MsStepsFormContainer from '../../components/MsStepsFormContainer';

function MsDrawerStepForm<P, R, D>(props: MsFormProps<P, R, D>) {
  const { title, width, drawerProps } = props;

  return (
    <MsStepsFormContainer
      {...props}
      footerRender={null}
      titleRender={null}
      onFinishSuccess={() => {
        drawerProps?.onClose?.();
      }}
    >
      {(formDom, submitDom) => (
        <MsDrawer
          title={title}
          width={width}
          footer={submitDom}
          destroyOnClose={true}
          {...drawerProps}
          // 由于 MsForm 中的 ModalForm 不支持 onCancel 异步，所以重写
          onCancel={async () => drawerProps?.onCancel?.()}
        >
          {formDom}
        </MsDrawer>
      )}
    </MsStepsFormContainer>
  );
}

export default MsDrawerStepForm;
