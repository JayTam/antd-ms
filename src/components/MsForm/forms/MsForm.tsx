import MsTagsForm from './MsTagsForm';
import MsDrawerForm from './MsDrawerForm';
import MsDrawerStepForm from './MsDrawerStepsForm';
import MsModalForm from './MsModalForm';
import MsModalStepsForm from './MsModalStepsForm';
import MsNormalForm from './MsNormalForm';
import MsQueryForm from './MsQueryForm';
import MsSearchForm from './MsSearchForm';
import MsStepForm from './MsStepForm';

import type { DefaultPostRes } from '../../types';
import type { MsFormProps } from '../types';
import MsFormColumnContainer from '../components/MsFormColumnContainer';

const MsForm = <P, R = any, D = DefaultPostRes<R>>(props: MsFormProps<P, R, D>) => {
  const { formType = 'Form', columnSet } = props;

  function formRender(columns: MsFormProps<P, R, D>['columns']) {
    // 查询表单
    if (formType === 'QueryForm') {
      return <MsQueryForm {...props} columns={columns} />;
    }

    // 搜索表单
    if (formType === 'SearchForm') {
      return <MsSearchForm {...props} columns={columns} />;
    }

    // 筛选
    if (formType === 'TagsForm') {
      return <MsTagsForm {...props} columns={columns} />;
    }

    // 弹窗表单
    if (formType === 'ModalForm') {
      return <MsModalForm {...props} columns={columns} />;
    }

    // 抽屉表单
    if (formType === 'DrawerForm') {
      return <MsDrawerForm {...props} columns={columns} />;
    }

    // 分步表单
    if (formType === 'StepsForm') {
      return <MsStepForm {...props} columns={columns} />;
    }

    // 弹窗分步表单
    if (formType === 'ModalStepsForm') {
      return <MsModalStepsForm {...props} columns={columns} />;
    }

    // 抽屉分步表单
    if (formType === 'DrawerStepsForm') {
      return <MsDrawerStepForm {...props} columns={columns} />;
    }

    // 普通表单
    if (formType === 'Form') {
      return <MsNormalForm {...props} columns={columns} />;
    }
    return null;
  }

  if (columnSet?.enable) {
    return (
      <MsFormColumnContainer {...props}>{(columns) => formRender(columns)}</MsFormColumnContainer>
    );
  }

  return formRender(props.columns);
};

export default MsForm;
