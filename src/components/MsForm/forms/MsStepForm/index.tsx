import MsFormCardContainer from '../../components/MsFormCardContainer';
import MsStepsFormContainer from '../../components/MsStepsFormContainer';
import type { MsFormProps } from '../../types';

function MsStepForm<P, R, D>(props: MsFormProps<P, R, D>) {
  return (
    <MsFormCardContainer {...props}>
      <MsStepsFormContainer {...props}>{(formDom) => formDom}</MsStepsFormContainer>
    </MsFormCardContainer>
  );
}

export default MsStepForm;
