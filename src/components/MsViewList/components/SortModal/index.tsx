import { MsEmpty } from '@jaytam/antd-ms';
import MsModal from '@jaytam/antd-ms/components/MsModal';
import MsSortable from '@jaytam/antd-ms/components/MsSortable';
import { useState } from 'react';

export const MyModal = MsModal.create((props: any) => {
  const {
    items,
    fieldNames,
    onChangeSort,
    sortModalProps = {},
    sortableProps = {},
    handleRefresh,
    onSortView,
    emptyText,
    ...resetProps
  } = props;
  const { onChange, onClickTop, ...resetSortableProps } = sortableProps || {};
  const modal = MsModal.useModal();
  const [list, setList] = useState(items);
  const handleOk = async () => {
    await onSortView?.(list);
    onChangeSort?.(list);
    handleRefresh?.();
  };

  const modalResetProps = { ...modal.props, ...resetProps, ...sortModalProps };

  return (
    <MsModal {...modalResetProps} onOk={handleOk}>
      {list?.length ? (
        <MsSortable
          {...resetSortableProps}
          items={list}
          onChange={(items, item) => {
            setList(items);
            onChange?.(items, item);
          }}
          onClickTop={(items, item) => {
            setList(items);
            onChange?.(items, item);
            onClickTop?.(items, item);
          }}
          fieldNames={fieldNames}
        />
      ) : (
        <MsEmpty description={emptyText} />
      )}
    </MsModal>
  );
});
