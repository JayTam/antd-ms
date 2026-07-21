import type { Node } from '@antv/x6';
import attrs from './attrs';
import ports from './ports';

const ellipse: Node.Metadata = {
  shape: 'ellipse',
  width: 80,
  height: 40,
  attrs: attrs,
  ports: ports,
};

export default ellipse;
