import { useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import { type FC, type ReactNode } from 'react';
import ComponentMeta from '../../builtins/ComponentMeta';
import ComponentTitle from '../../builtins/ComponentTitle';
import BackTop from './BackTop';
import '../../styles/heti.less';
import './index.less';

const Content: FC<{ children: ReactNode }> = (props) => {
  const sidebar = useSidebarData();
  const { themeConfig } = useSiteData();
  const { frontmatter } = useRouteMeta();

  return (
    <div
      className="dumi-default-content"
      data-no-sidebar={!sidebar || frontmatter.sidebar === false || undefined}
      data-no-footer={themeConfig.footer === false || undefined}
    >
      <ComponentTitle />

      <ComponentMeta />
      {props.children}

      <BackTop />
    </div>
  );
};

export default Content;
