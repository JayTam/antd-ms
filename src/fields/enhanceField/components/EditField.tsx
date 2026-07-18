import type { MsDescriptionsColumnType } from '@jaytam/antd-ms';
import { MsDescriptionsEditContext } from '@jaytam/antd-ms/components/MsDescriptions/contexts/edit';
import type { EditConfig } from '@jaytam/antd-ms/components/MsForm/types';
import { useLocale } from '@jaytam/antd-ms/locale';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { Button, Tooltip } from 'antd';
import { isObject } from 'lodash-es';
import { useContext } from 'react';

type EditFieldProps<D> = { column: MsDescriptionsColumnType<D> };

/**
 * 编辑按钮组件
 * @param param0
 * @returns
 */
function EditField<D>(props: EditFieldProps<D>) {
  const { column } = props;
  const { openEditor } = useContext(MsDescriptionsEditContext);

  const { globalLocale } = useLocale();

  const editable = column?.editable as EditConfig<D>;

  if (!editable) return null;

  if (isObject(editable) && editable.type === 'none') return null;

  const { editIcon, editText = globalLocale.edit, editTooltip } = editable;

  function handleClick() {
    openEditor(cloneDeepWithReactNode(column));
  }

  return (
    <Tooltip title={editTooltip}>
      <Button size="small" type="link" icon={editIcon} onClick={handleClick}>
        {editText}
      </Button>
    </Tooltip>
  );
}

export default EditField;
