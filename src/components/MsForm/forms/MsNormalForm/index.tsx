import { Button, Form, Skeleton } from 'antd';
import { omit } from 'lodash-es';

import MsBaseForm from '../../components/MsBaseForm';
import MsFormCardContainer from '../../components/MsFormCardContainer';
import MsSubmitterContainer from '../../components/MsFormSubmitterContainer';
import MsFormResetButton from '../../components/MsFormResetButton';

import { MsTitle } from '@jaytam/antd-ms';
import type { MsFormProps } from '../../types';
import useFormSubmit from '../../hooks/useFormSubmit';
import useFormInitLoading from '../../hooks/useFormLoading';
import MsFormAnchor from '../../components/MsFormAnchor';
import { useLocale } from '@jaytam/antd-ms/locale';

function MsNormalForm<P, R, D>(props: MsFormProps<P, R, D>) {
  const { form: formInstance, submitter } = props;

  const [form] = Form.useForm(formInstance);
  const { loading, setLoading } = useFormInitLoading(props);
  const { submitLoading, handleFinish, handleSubmit } = useFormSubmit(props, form);

  const { globalLocale } = useLocale();

  const titleRender = (
    <MsTitle
      {...omit(props, 'children', 'className', 'style')}
      titleSize={props.noCard ? 'middle' : 'large'}
      titleType={props.titleType ?? (props.noCard ? 'gradient' : 'common')}
    />
  );

  const footerRender = (
    <MsSubmitterContainer {...props}>
      {loading ? (
        <>
          <Skeleton.Button active />
          <Skeleton.Button active />
        </>
      ) : (
        <>
          <MsFormResetButton disabled={submitLoading} {...props} />
          <Button
            type="primary"
            loading={submitLoading}
            onClick={handleSubmit}
            {...submitter?.submitBtnProps}
          >
            {submitter?.submitText ?? globalLocale.submit}
          </Button>
        </>
      )}
    </MsSubmitterContainer>
  );

  return (
    <MsFormCardContainer {...props}>
      <MsFormAnchor {...props} />
      <MsBaseForm
        {...props}
        form={form}
        titleRender={titleRender}
        footerRender={footerRender}
        loading={loading}
        setLoading={setLoading}
        onFinish={handleFinish}
      />
    </MsFormCardContainer>
  );
}

export default MsNormalForm;
