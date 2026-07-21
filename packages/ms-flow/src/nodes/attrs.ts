import type { Node } from '@antv/x6';

const attrs: Node.Metadata['attrs'] = {
  body: {
    fill: '#fff',
    stroke: '#8f8f8f',
    strokeWidth: 1,
  },
  label: {
    fill: '#333',
    textWrap: {
      refWidth: '100%',
    },
  },
};

export default attrs;
