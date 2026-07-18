import { Skeleton } from 'antd';
import { useFieldModeContext } from '../../../contexts/mode';

/**
 * label骨架效果，区分只读编辑模式
 * @returns
 */
function LabelSkeleton() {
  const { mode } = useFieldModeContext();
  return (
    <Skeleton.Button
      block
      active
      style={{ borderRadius: 0 }}
      size={mode === 'edit' ? 'default' : 'small'}
    />
  );
}

export default LabelSkeleton;
