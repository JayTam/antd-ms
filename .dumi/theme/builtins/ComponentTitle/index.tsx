import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useRouteMeta, useMatchedRoute } from 'dumi';
import './index.less';

function ComponentTitle() {
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

  /** 文档链接 */
  const docUrl = 'https://github.com/JayTam/antd-ms/edit/main/src/' + atomUrlName + '/index.md';

  return (
    <>
      <div className="markdown">
        <h1>
          {meta.frontmatter?.title}
          <Tooltip title="在 GitHub 上编辑此页！">
            <a href={docUrl} target="_blank" className="component-doc-edit-icon">
              <EditOutlined />
            </a>
          </Tooltip>
        </h1>

        {!meta.frontmatter.__autoDescription && meta.frontmatter.description}
      </div>
    </>
  );
}

export default ComponentTitle;
