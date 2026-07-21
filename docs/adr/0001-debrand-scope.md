# ADR-0001：去标识化范围与个人开源化改造

- 状态：Accepted
- 日期：2026-07-21
- 决策者：JayTam

## 背景

本仓库 `@jaytam/antd-ms` 起源于"马上消费金融"内网组件库（原内部名 `ms-ui`），仓库历史托管在内网 GitLab（`codelab.msxf.com/gc-pbs/gc-ui-fe`、`gitlab.msxf.com/mscloud/cloud-ui-frontend`），文档站与示例中大量出现"马上云 / 马上消费金融股份有限公司 / 维科群 / ms-ui / `*.msxfyun.test` / `*.msxfcloud.test` / `codelab.msxf.com`"等内部品牌词和内网地址。

现将其改造为个人开源项目，需界定去标识化的边界，并明确新身份、托管地址、文档与历史记录的处理方式。

## 决策

### 1. 范围（B 档：清文案 + 链接，留代码符号）

清掉以下"马上消费"系标识：

- **中文业务术语**：`马上云` `马上资产` `马上消费金融股份有限公司…` `维科群` `维科之家` 等出现在文档、注释、`src/locale/*`、demo 中的品牌词。
- **内网域名**：`*.msxfyun.test` `*.msxfcloud.test` `*.msxf.local` `codelab.msxf.com` `gitlab.msxf.com`。
- **内网仓库路径**：`gc-pbs/gc-ui-fe` `gc-common/gc-ui-fe` `mscloud/cloud-ui-frontend`。
- **VSCode 拼写词典**：`msxf` `msxfjacp` 等内网关键词。
- **demo 邮箱**：`@msxf.com` → `@gmail.com`。
- **旧名 `ms-ui`**：仅出现在 `CHANGELOG.md` 一处，改为 `antd-ms`。

**保留**以下代码符号（公开 API 不破坏）：

- `Ms*` 组件名（`MsTable` `MsForm` `MsField` 等）及其目录 `src/fields/Ms*`、`src/components/Ms*`。
- 包名前缀 `@jaytam/ms-request`、`@jaytam/ms-flow`、`@jaytam/ms-gantt` 等已发到 npm 的 scoped 包。
- 其余中性英文短词 `ms`（如 `ms-table`、`msRequest`、`msField` 等目录名/变量名）。

### 2. 新身份

不立新品牌。对外文案统一写为"一个基于 Ant Design 二次封装的个人开源组件库"，仓库名仍为 `antd-ms`。

### 3. 托管与链接

`package.json` / `packages/ms-request/package.json` 等所有 `homepage` / `bugs` / `repository` 字段，及 dumi 主题里的源码跳转链接，统一指向：

- 仓库：`https://github.com/JayTam/antd-ms`
- Issues：`https://github.com/JayTam/antd-ms/issues`

### 4. 历史记录（CHANGELOG）

策略 B：保留条目文字，把所有内网链接重写为新仓库地址：

- `https://codelab.msxf.com/gc-pbs/gc-ui-fe/...` → `https://github.com/JayTam/antd-ms/...`
- `https://gitlab.msxf.com/mscloud/cloud-ui-frontend/...` → `https://github.com/JayTam/antd-ms/...`

代价：旧 commit hash 在新仓库中不存在，点击会 404——已接受。

### 5. demo / 组织架构示例数据

`MsResourceGroup` / `MsFormTable` / `MsUserPopover` 的 demo 与测试中的 `"集团_马上消费金融股份有限公司-CTO直管部门-技术部-…-XX团队"` 全部替换为以 **"公司"** 为前缀的通用占位（不带"某"），保留原层级深度。

### 6. `MsUserGroup` 运行时枚举

`src/locale/zh_CN.ts` / `en_US.ts` 里：

- `ms: '马上'` / `wkUser: '维科群用户'` / `wkq: '维科群'` → `内部用户` / `外部用户` / `外部群`（英文对应 `Internal User` / `External User` / `External Group`）。

`kong.png` `weike.png` 静态资源文件**保留**（被 dumi 主题兜底图和 `introduce.md` 引用，删除会破坏渲染），仅清文案。

### 7. `ms-request` 文档示例

`packages/ms-request/README.md` / `global.d.ts` / `msRequest.tsx` 注释中的内网登录域名、`MSCLOUD_ENV` 等内网标识，替换为通用占位：

- `http://mscloud-admin-sit.msxfcloud.test/user/login` → `https://login.example.com`
- "马上云 / 团体云" → "业务系统" 等中性词。

### 8. dumi 主题

- `.dumi/theme/builtins/ComponentMeta`：源码跳转链接 → GitHub；删除"点击打开维科之家聊天会话"那句。
- `.dumi/theme/builtins/ComponentTitle`：源码跳转链接 → GitHub。
- `.dumi/theme/slots/HeaderExtra`：删除 `http://ui-next.msxf.msxfyun.test/` 入口。
- `.dumirc.ts`：删除所有内网 proxy 配置段；`socialLinks.gitlab` → `https://github.com/JayTam/antd-ms`。

### 9. 组件分组标题

`MsResourceType` `MsResourceGroup` `MsPartUpload` `MsPresetResourceTags` 等组件 `index.md` 顶部的 `title: 马上云业务` 统一改为 `业务组件`。

### 10. 功能性文案中最小改动

`MsPresetResourceTags/index.md` 升级说明、`CHANGELOG` 中 `MsConfigProvider 全局修改马上云资源接口版本号` 等功能描述，仅去掉品牌词：`马上云业务线` → `业务线`、`马上云资源接口` → `资源接口`，保留语义。

### 11. 版本、作者、提交规范

- `version`：保留 `2.24.1`，去标识化不算破坏性变更。
- `package.json` 新增 `author: "JayTam"`。
- 保留 commitlint + husky + standard-version + commitizen 现有规范。

### 12. 提交方式

所有改动汇总为一个 commit，message：

```
chore: debrand 马上消费 references and convert to personal open-source project
```

## 影响与后续

- 公开 API 无破坏性变更，下游无需改动。
- `CHANGELOG.md` 中旧 commit hash 链接失效（接受）。
- 文档站可托管到任意外网环境，不再依赖内网代理。
- dumi 站点保持可运行；`kong.png` / `weike.png` 等静态资源保留，仅在文案层去标识。
