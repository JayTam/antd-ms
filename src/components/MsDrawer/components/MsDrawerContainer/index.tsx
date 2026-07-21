import type { MsDrawerProps } from '../../types';
import DualColumn from '../DualColumn';

const MsDrawerContainer = (props: MsDrawerProps) => {
  const { preContentRender, suffixContentRender, type, children: _children } = props;

  const children = (
    <>
      {preContentRender}
      {_children}
      {suffixContentRender}
    </>
  );

  // 左右两栏布局
  if (type === 'dual-column') {
    return <DualColumn {...props}>{children}</DualColumn>;
  }

  return children;
};

export default MsDrawerContainer;
