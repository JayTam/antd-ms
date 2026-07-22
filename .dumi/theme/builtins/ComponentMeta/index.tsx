import { GitlabOutlined } from '@ant-design/icons';
import { MsCopy } from '@jaytam/antd-ms';
import { Tooltip } from 'antd';
import { useRouteMeta, useMatchedRoute } from 'dumi';

import './index.less';

function ComponentMeta() {
  const meta = useRouteMeta();
  const route = useMatchedRoute();

  if (!meta._atom_route) return null;

  const atom = meta.frontmatter.atomId ?? route.id.split('/')[1];

  const type: 'component' | 'field' | undefined = route.path?.startsWith('components')
    ? 'component'
    : route.path?.startsWith('fields')
    ? 'field'
    : undefined;

  const atomUrlName =
    type === 'component' ? 'components/' + atom : type === 'field' ? 'fields/' + atom : undefined;

  /** source atom 链接 */
  const gitlabAtomUrl = 'https://github.com/JayTam/antd-ms/tree/main/src/' + atomUrlName;

  const importStmant = meta.frontmatter.import ?? `import { ${atom} } from "@jaytam/antd-ms;"`;

  return (
    <>
      <div className="component-meta">
        {type === 'component' && !meta.frontmatter.hideImport && (
          <div className="component-meta-item">
            <span className="component-meta-item-label">引用</span>
            <MsCopy text={importStmant}>
              <Tooltip title="点击复制代码" placement="right">
                <span className="component-meta-item-value">{importStmant}</span>
              </Tooltip>
            </MsCopy>
          </div>
        )}

        <div className="component-meta-item">
          <span className="component-meta-item-label">源码</span>
          <span className="component-meta-item-value">
            <a target="_blank" href={gitlabAtomUrl}>
              <GitlabOutlined /> {atomUrlName}
            </a>
          </span>
        </div>

        {meta.frontmatter.version && (
          <div className="component-meta-item">
            <span className="component-meta-item-label">版本</span>
            <span className="component-meta-item-value danger">
              自 {meta.frontmatter.version} 起支持
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ComponentMeta;
