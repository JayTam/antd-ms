import type { ReactNode } from 'react';
import { useFieldModeContext } from '../../components/MsForm/contexts/mode';

/**
 * MsFiled不同mode的渲染方法，必须传编辑模式的dom
 * 编辑模式是必传，只读模式
 * @param props
 * @param editDom 编辑模式下的 dom
 * @param readDom 只读模式下的 dom
 * @returns
 */
function useModeRender(
  props: any,
  editDom: ReactNode,
  readDom: ReactNode,
  clickEditDom?: ReactNode,
): ReactNode {
  const { mode, emptyText } = useFieldModeContext(props);

  if (mode === 'read') {
    if (readDom === 0) return 0;
    return readDom || emptyText;
  }
  if (mode === 'clickEdit' && clickEditDom) {
    return clickEditDom;
  }
  if (['edit', 'clickEdit'].includes(mode)) {
    return editDom;
  }

  return <></>;
}

export default useModeRender;
