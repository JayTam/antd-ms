import { MsTitle } from '@jaytam/antd-ms';
import { Form } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { isFunction, isNil } from 'lodash-es';

import MsField from '../../../MsField';

import { useMsPage } from '@jaytam/antd-ms/components/MsPage/contexts/page';
import type { MsDescriptionsProps } from '../../types';
import ActionsTitle from './components/ActionsTitle';
import CopyableTitle from './components/CopyableTitle';
import DescriptionsExtra from './components/DescriptionsExtra';
import EditableTitle from './components/EditableTitle';

type DescriptionTitleProps<P, R, D> = MsDescriptionsProps<P, R, D> & {
  loading?: boolean;
  refreshLoading?: boolean;
  onRefresh?: () => void;
};

function DescriptionTitle<P, R, D>(props: DescriptionTitleProps<P, R, D>) {
  const { noCard: _noCard, title, titleType, titleColumn, initialValues, loading, extra } = props;
  const form = Form.useFormInstance();

  const { inPage } = useMsPage();
  const noCard = inPage ? true : _noCard;

  const hideTitle = isNil(title) && isNil(titleColumn);
  const titleExtra = isFunction(extra) ? extra(initialValues as D) : extra;
  const hideExtra = isNil(titleExtra);

  if (hideTitle && hideExtra) return null;

  // 子容器默认 gradient 类型
  const titleDom = isFunction(title) ? title(initialValues as D) : title;
  const type = titleType ?? (noCard ? 'gradient' : 'common');
  const titleSize = noCard ? 'middle' : 'large';
  const extraDom = <DescriptionsExtra {...props} extra={titleExtra} />;

  // titleColumn 模式
  if (titleColumn) {
    const fieldReadRender = isFunction(titleColumn.fieldReadRender)
      ? titleColumn.fieldReadRender?.(form)
      : titleColumn.fieldReadRender;

    return (
      <MsTitle
        loading={loading}
        titleType={type}
        titleSize={titleSize}
        titleSuffix={
          <>
            <CopyableTitle titleColumn={titleColumn} />
            <EditableTitle titleColumn={titleColumn} />
            <ActionsTitle titleColumn={titleColumn} />
          </>
        }
        extra={extraDom}
        ignoreTitleReset
      >
        <FormItem name={titleColumn?.dataIndex as any} noStyle {...titleColumn.formItemProps}>
          {fieldReadRender ? fieldReadRender : <MsField valueType="text" ellipsis={false} />}
        </FormItem>
      </MsTitle>
    );
  }

  // title 模式
  return (
    <MsTitle
      titleType={type}
      titleSize={titleSize}
      loading={loading}
      extra={extraDom}
      ignoreTitleReset
    >
      {titleDom}
    </MsTitle>
  );
}

export default DescriptionTitle;
