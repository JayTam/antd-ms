import { Skeleton } from 'antd';
import { useFieldModeContext } from '../../../contexts/mode';

/**
 * content骨架效果，区分只读编辑模式
 * @returns
 */
function ContentSkeleton() {
  const { mode } = useFieldModeContext();
  return <Skeleton.Input block active size={mode === 'edit' ? 'default' : 'small'} />;
}

export default ContentSkeleton;
