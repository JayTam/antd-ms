import { useDevopsLayoutContext } from '../../MsDevopsLayout/context';
import { useMsLayout } from '../../MsLayout/context';
import type { MsTableProps } from '../types';

/**
 * 本 hook 是帮助 sticky=true 转化成合适的配置，降低配置的复杂度
 * 由于业务系统的页面容器是局部滚动，导致 antd table 的 sticky=true 不能达到预期的效果
 */
function useSticky<P, R, D>(props: MsTableProps<P, R, D>): MsTableProps<P, R, D>['sticky'] {
  const { sticky } = props;
  const layout = useMsLayout();
  const devopsLayout = useDevopsLayoutContext();

  if (sticky === true) {
    if (layout.inContext) {
      const msLayoutPadding = 12;
      return {
        offsetHeader: -msLayoutPadding,
        offsetScroll: -msLayoutPadding,
        offsetSummary: -msLayoutPadding,
        getContainer() {
          return layout?.pageRef?.current ?? document.body;
        },
      };
    }

    if (devopsLayout.inContext) {
      const devopsLayoutPadding = 16;
      return {
        offsetHeader: -devopsLayoutPadding,
        offsetScroll: -devopsLayoutPadding,
        offsetSummary: -devopsLayoutPadding,
        getContainer() {
          return devopsLayout?.pageRef?.current ?? document.body;
        },
      };
    }
  }

  return sticky;
}

export default useSticky;
