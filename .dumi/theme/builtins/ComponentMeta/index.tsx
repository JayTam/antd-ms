import { GitlabOutlined, WechatWorkOutlined, EditOutlined } from '@ant-design/icons';
import { MsCopy } from '@jaytam/antd-ms';
import { Tooltip } from 'antd';
import { useRouteMeta, useMatchedRoute } from 'dumi';
import contributorsMap from '../../../../scripts/data/contributors.json';
const userData = require('../../../../scripts/data/user');

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

  // @ts-ignore
  const contributors = contributorsMap[atom];

  /** 默认主维护人，取最多贡献者 */
  const defaultMaintainer = userData.emailToUser[contributors?.[0]?.email]?.userName;

  /** 组件维护人 */
  const maintainerUser = userData.userList.find(
    (item: any) => item.userName === (meta.frontmatter.maintainer ?? defaultMaintainer),
  );

  /** 飞书聊天链接 */
  const chatUrl = 'https://example.com/chat?openId=' + maintainerUser.userId;

  /** 文档链接 */
  const docUrl = gitlabAtomUrl + '/index.md';

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
          <span className="component-meta-item-label">维护</span>
          <span className="component-meta-item-value">
            <Tooltip
              title={
                <>
                  <div>主维护人忙可以联系贡献人！</div>
                </>
              }
              placement="right"
            >
              <a target="_blank" href={chatUrl}>
                <WechatWorkOutlined />
                {maintainerUser.userName} - {maintainerUser.email}
              </a>
            </Tooltip>
          </span>
        </div>

        <div className="component-meta-item">
          <span className="component-meta-item-label">源码</span>
          <span className="component-meta-item-value">
            <a target="_blank" href={gitlabAtomUrl}>
              <GitlabOutlined /> {atomUrlName}
            </a>
          </span>
        </div>

        {!meta.frontmatter.hideContributor && (
          <div className="component-meta-item">
            <span className="component-meta-item-label">贡献</span>
            <span className="component-meta-item-value disabled-hover">
              {contributors?.map((contributor: any) => {
                const chineseName =
                  userData.emailToUser[contributor.email]?.userName ?? contributor.email;
                return (
                  <Tooltip
                    placement="bottom"
                    mouseLeaveDelay={0}
                    key={contributor.email}
                    title={
                      <>
                        <div>提交Commit数：{contributor.commits}</div>
                        <div>新增代码行数：{contributor.insertions}</div>
                        <div>删除代码行数：{contributor.deletions}</div>
                      </>
                    }
                  >
                    <a className="contributor-item">{chineseName}</a>
                  </Tooltip>
                );
              })}
            </span>
          </div>
        )}

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
