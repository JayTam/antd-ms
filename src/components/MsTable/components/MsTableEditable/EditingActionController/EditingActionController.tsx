import { isNil } from 'lodash-es';
import type { ReactNode } from 'react';
import { MsModal } from '../../../../index';
import { useTableEditableContext } from '../../../contexts/editable';

import './index.less';
import { useLocale } from '@jaytam/antd-ms/locale';

export type EditingActionControllerProps = {
  children?: ReactNode;
  fullWidth?: boolean;
  /** 编辑状态会用一个 wrapper 元素嵌套，display 是用来控制 wrapper 元素的样式 */
  wrapperDisplay?: React.CSSProperties['display'];
};

/**
 * 编辑状态控制器，当处于编辑状态中禁止操作
 */
function EditingActionController(props: EditingActionControllerProps) {
  const { fullWidth = false, children, wrapperDisplay } = props;
  const { editable, globalEditing } = useTableEditableContext();

  const { currentLocale, globalLocale } = useLocale('MsTable');

  // 非编辑表格上下文
  if (isNil(editable)) {
    return children;
  }

  // 非编辑状态，正常渲染
  if (!globalEditing) {
    return children;
  }

  return (
    <div
      className="ms-table-editing"
      style={{ width: fullWidth ? '100%' : undefined, display: wrapperDisplay }}
    >
      {children}
      <div
        className="ms-table-editing-mask"
        title={currentLocale.inEditNoOperate}
        onClick={() => {
          MsModal.warning({ title: globalLocale.tip, content: currentLocale.tipSaveEdit });
        }}
      />
    </div>
  );
}

export default EditingActionController;
