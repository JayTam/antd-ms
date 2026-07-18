import type { Node } from '@antv/x6';
import attrs from './attrs';
import ports from './ports';

const circle: Node.Metadata = {
  shape: 'circle',
  width: 50,
  height: 50,
  attrs: attrs,
  ports: ports,
};

export default circle;
