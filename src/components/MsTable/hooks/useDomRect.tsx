import { useDebounceFn, useDeepCompareEffect, useEventListener } from 'ahooks';
import { useState } from 'react';

/**
 * 获取元素相对于浏览器视窗上下左右的位置
 * @param target
 * @returns
 */
const useDomRect = (
  target: HTMLElement | null,
  deps: any[] = [],
): [DOMRect | null, { width: number; height: number } | null] => {
  const [domRect, setDomRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);

  const { run: update } = useDebounceFn(
    () => {
      if (target) {
        setDomRect(target.getBoundingClientRect());
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      }
    },
    { wait: 50 },
  );

  useEventListener('resize', update);

  useDeepCompareEffect(update, deps);

  return [domRect, viewport];
};

export default useDomRect;
