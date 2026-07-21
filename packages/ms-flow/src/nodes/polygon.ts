import type { Node } from '@antv/x6';
import attrs from './attrs';
import ports from './ports';

const polygon: Node.Metadata = {
  shape: 'polygon',
  width: 40,
  height: 40,
  points: '100,10 40,198 190,78 10,78 160,198',
  attrs: attrs,
  ports: ports,
};

export default polygon;
