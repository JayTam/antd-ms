import type { MsFormColumns, MsFormProps } from '@jaytam/antd-ms';
import { MsForm } from '@jaytam/antd-ms';
import { useClickAway, useMount } from 'ahooks';
import { Form } from 'antd';
import { isNil } from 'lodash-es';
import { useContext, useEffect, useRef } from 'react';
import { MsFlowContext } from '../../context';

type ConfigFormProps = {
  initialValues?: any;
  columns?: MsFormColumns;
  onValuesChange?: MsFormProps['onValuesChange'];
};

function ConfigForm(props: ConfigFormProps) {
  const { initialValues, columns, onValuesChange } = props;
  const [form] = Form.useForm();
  const { graph, currentCell, setCurrentCell } = useContext(MsFlowContext);
  const ref = useRef<HTMLDivElement>(null);

  /**
   * 表单校验
   * @returns
   */
  const formValidate = () =>
    form
      .validateFields()
      .then(() => {
        graph?.trigger('cell:success', currentCell);
      })
      .catch(() => {
        graph?.trigger('cell:error', currentCell);
      });

  useClickAway(() => {
    if (isNil(currentCell)) return;
    formValidate();
  }, ref);

  useMount(() => {
    if ((currentCell as any)?.store.formStatus === 'error') {
      formValidate();
    }
  });

  useEffect(() => {
    const handleBlankClick = () => {
      formValidate().finally(() => {
        setCurrentCell?.(undefined);
      });
    };

    const handleCellClick = ({ cell }: any) => {
      formValidate().finally(() => {
        setCurrentCell?.(cell);
      });
    };

    const handleNodeAdd = ({ node }: any) => {
      formValidate().finally(() => {
        setCurrentCell?.(node);
      });
    };

    const handleEdgeConnect = ({ edge }: any) => {
      formValidate().finally(() => {
        setCurrentCell?.(edge);
      });
    };

    const handleCellChangeDate = ({ current }: any) => {
      form.setFieldsValue(current);
    };

    graph?.on('blank:click', handleBlankClick);
    graph?.on('cell:click', handleCellClick);
    graph?.on('node:added', handleNodeAdd);
    graph?.on('edge:connected', handleEdgeConnect);
    graph?.on('cell:change:data', handleCellChangeDate);

    return () => {
      graph?.off('blank:click', handleBlankClick);
      graph?.off('cell:click', handleCellClick);
      graph?.off('node:added', handleNodeAdd);
      graph?.off('edge:connected', handleEdgeConnect);
      graph?.off('cell:change:data', handleCellChangeDate);
    };
  }, [graph, currentCell, form, setCurrentCell]);

  return (
    <div ref={ref}>
      <MsForm
        form={form}
        noCard
        successNotify={false}
        initialValues={initialValues}
        columns={columns}
        layout="vertical"
        onValuesChange={onValuesChange}
        submitter={{ submitBtnProps: { hidden: true }, resetBtnProps: { hidden: true } }}
      />
    </div>
  );
}

export default ConfigForm;
