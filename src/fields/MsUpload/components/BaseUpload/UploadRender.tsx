import type { UploadEditProps } from '../../types';

const UploadRender = (props: UploadEditProps['uploadConfig']) => {
  const { children, uploadSuffixRender } = props;

  // 后缀节点
  const SuffixFieldNode = uploadSuffixRender && (
    <span onClick={(e) => e.stopPropagation()} style={{ paddingLeft: '8px', flex: '1' }}>
      {uploadSuffixRender}
    </span>
  );

  if (SuffixFieldNode) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
        {children}
        {SuffixFieldNode}
      </div>
    );
  }
  return children;
};

export default UploadRender;
