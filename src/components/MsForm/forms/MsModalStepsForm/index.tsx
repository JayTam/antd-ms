import MsModal from '../../../MsModal';
import MsStepsFormContainer from '../../components/MsStepsFormContainer';
import type { MsFormProps } from '../../types';

/**
 * 分步弹窗表单
 * @param props
 * @returns
 */
function MsModalStepsForm<P, R, D>(props: MsFormProps<P, R, D>) {
  const { title, width, modalProps } = props;

  return (
    <MsStepsFormContainer
      {...props}
      titleRender={null}
      footerRender={null}
      onFinishSuccess={() => {
        modalProps?.onClose?.();
      }}
    >
      {(formDom, submitDom) => (
        <MsModal
          title={title}
          width={width}
          footer={submitDom}
          destroyOnClose={true}
          {...modalProps}
        >
          {formDom}
        </MsModal>
      )}
    </MsStepsFormContainer>
  );
}

export default MsModalStepsForm;
