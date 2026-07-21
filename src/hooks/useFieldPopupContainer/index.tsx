import { useMsFormContext } from '@jaytam/antd-ms/components/MsForm/contexts/form';
import { useMsTableContext } from '@jaytam/antd-ms/components/MsTable/contexts/table';
import { useMsFormTableContext } from '@jaytam/antd-ms/fields/MsFormTable/context';

/**
 * MsTable 和 MsFormTable 组件下，选择器的挂载点不能是父元素
 */
function useFieldPopupContainer() {
  const formTableContext = useMsFormTableContext();
  const tableContext = useMsTableContext();
  const formContext = useMsFormContext();

  function getPopupContainer(triggerNode: HTMLElement): HTMLElement {
    if (formTableContext.inContext) {
      return formTableContext.popupMountRef?.current ?? triggerNode.parentElement ?? document.body;
    }

    if (tableContext.inContext) {
      return tableContext.popupMountRef?.current ?? triggerNode.parentElement ?? document.body;
    }

    if (formContext.getPopupContainer) {
      return formContext.getPopupContainer(triggerNode);
    }

    return triggerNode.parentElement ?? document.body;
  }

  return { getPopupContainer };
}

export default useFieldPopupContainer;
