import { useLayoutEffect, useRef, useState } from 'react';

/** 获取某个元素距离顶部高度
 * 用于MsLayout和MsDevopsLayout公用
 */
const useElementOffsetTop = <T extends HTMLElement>(initialVal = 0) => {
  const [offsetTop, setOffsetTop] = useState(initialVal);
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const top = ref.current?.getBoundingClientRect()?.top;
    setOffsetTop(top || 0);
  }, []);

  return {
    offsetTop,
    ref,
  };
};

export default useElementOffsetTop;
