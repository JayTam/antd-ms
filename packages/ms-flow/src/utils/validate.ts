import type { Cell } from '@antv/x6';
import { isNil } from 'lodash-es';

export function setErrorStatus(cell?: Cell) {
  if (isNil(cell)) return;

  if (cell.isNode()) {
    cell.attr('body/stroke', '#fd5352');
    cell.prop('dataStatus', 'error');
  }

  if (cell.isEdge()) {
    cell.attr('line/stroke', '#fd5352');
    cell.prop('dataStatus', 'error');
  }
}

export function setSuccessStatus(cell?: Cell) {
  if (isNil(cell)) return;

  if (cell.isNode()) {
    cell.attr('body/stroke', '#8f8f8f');
    cell.prop('dataStatus', 'success');
  }

  if (cell.isEdge()) {
    cell.attr('line/stroke', '#8f8f8f');
    cell.prop('dataStatus', 'success');
  }
}
