import { EditOutlined } from '@ant-design/icons';
import type { EditConfig } from '@jaytam/antd-ms/components/MsForm/types';
import { cloneDeepWithReactNode } from '@jaytam/antd-ms/utils';
import { Button, Tooltip } from 'antd';
import { isObject } from 'lodash-es';
import { useContext } from 'react';
import { MsDescriptionsEditContext } from '../../../contexts/edit';
import type { MsDescriptionsColumnType } from '../../../types';

type EditableTitleProps<D> = {
  titleColumn?: MsDescriptionsColumnType<D>;
};

function EditableTitle<D>(props: EditableTitleProps<D>) {
  const { titleColumn } = props;
  const { openEditor } = useContext(MsDescriptionsEditContext);

  const editable = titleColumn?.editable as EditConfig<D>;

  if (!editable) return null;

  if (isObject(editable) && editable.type === 'none') return null;

  const { editIcon = <EditOutlined />, editText, editTooltip } = editable;

  function handleClick() {
    if (titleColumn) {
      openEditor(cloneDeepWithReactNode(titleColumn));
    }
  }

  return (
    <Tooltip title={editTooltip}>
      <Button size="small" type="link" icon={editIcon} onClick={handleClick}>
        {editText}
      </Button>
    </Tooltip>
  );
}

export default EditableTitle;
