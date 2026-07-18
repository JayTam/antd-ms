import type { Node } from '@antv/x6';

const ports: Node.Metadata['ports'] = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          magnet: true,
          stroke: '#8f8f8f',
          r: 4,
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          magnet: true,
          stroke: '#8f8f8f',
          r: 4,
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          magnet: true,
          stroke: '#8f8f8f',
          r: 4,
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          magnet: true,
          stroke: '#8f8f8f',
          r: 4,
        },
      },
    },
  },
};

export default ports;
