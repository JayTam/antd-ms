import { EditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import MsModal from '../../../MsModal';
import type { EditConfig, MsInstanceColumnType } from '../../types';
import InstanceEditModal from '../InstanceEditModal';
import { useLocale } from '@jaytam/antd-ms/locale';

type EditableTitleProps<D> = {
  column?: MsInstanceColumnType<D>;
};

function EditableTitle<D>(props: EditableTitleProps<D>) {
  const { column } = props;

  const { globalLocale } = useLocale();

  const editable = column?.editable as EditConfig<D>;

  const { columns, onClick } = editable ?? {};

  if (!editable) return null;

  const { editIcon = <EditOutlined />, editText, editTooltip, disabled, hidden } = editable;

  function handleClick() {
    if (column) {
      const openTitle =
        columns?.length === 1 ? (
          <>
            {globalLocale.edit}
            {columns[0].title}
          </>
        ) : (
          globalLocale.edit
        );
      onClick?.();
      MsModal.open(InstanceEditModal, {
        labelCol: { flex: '90px' },
        title: openTitle,
        ...editable,
      }).then(() => {
        editable?.onFinishSuccess?.();
      });
    }
  }

  if (hidden) {
    return null;
  }

  return (
    <span className="ms-instance-action">
      <Tooltip title={editTooltip}>
        <Button size="small" type="text" icon={editIcon} onClick={handleClick} disabled={disabled}>
          {editText}
        </Button>
      </Tooltip>
    </span>
  );
}

export default EditableTitle;
