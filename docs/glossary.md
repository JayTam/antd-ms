# Glossary — 去标识化术语对照

本表记录 `@jaytam/antd-ms` 去标识化改造中涉及的术语映射，配合 ADR-0001 使用。

## 范围类术语

| 术语 | 含义 | 处理 |
| --- | --- | --- |
| **B 档范围** | 清文案 + 链接，保留代码符号 | 本项目采用的范围 |
| **代码符号**（保留类） | `Ms*` 组件名、`@jaytam/ms-*` 包名、`ms-*` 目录名、`msXxx` 变量名 | 一律保留，属公开 API |
| **内网品牌词**（清类） | `马上云` `马上消费金融股份有限公司` `维科群` `ms-ui` `msxf` `msxfyun` `msxfcloud` `codelab.msxf.com` `gitlab.msxf.com` 等出现在文案/链接中的字样 | 替换或删除 |

## 业务术语 → 中性词

| 原词（中文） | 原词（英文） | 替换为 |
| --- | --- | --- |
| 马上云公共组件库 | — | 基于 Ant Design 二次封装的个人开源组件库 |
| 马上云业务 | — | 业务组件（dumi 组件分组标题） |
| 马上云资源接口 | — | 资源接口 |
| 马上云业务线 | — | 业务线 |
| 马上云设计规范 | — | 设计规范 |
| 马上用户（`ms: '马上'`） | `ms` (i18n key) | `内部用户` / `Internal User` |
| 维科群用户（`wkUser`） | `wkUser: 'WeChat Group User'` | `外部用户` / `External User` |
| 维科群（`wkq`） | `wkq: 'WeChat Group'` | `外部群` / `External Group` |
| 维科之家聊天会话 | — | 删除整句 |
| 马上资产 / 非马上资产 | — | 内部资产 / 外部资产 |
| 集团\_马上消费金融股份有限公司-CTO 直管部门-技术部-金融科技研发部-公共平台研发部-平台产品化团队 | — | 公司-技术中心-研发部-前端组-平台化团队（保留同级深度，前缀"公司"不带"某"） |
| `san.zhang@msxf.com` | — | `san.zhang@gmail.com` |
| `ms-ui` 组件库 | — | `antd-ms` |
| 团体云 | — | 业务系统 |
| `http://mscloud-admin-sit.msxfcloud.test/user/login` | — | `https://login.example.com` |
| `MSCLOUD_ENV` | — | 保留环境变量名（内部实现不破坏），注释由"马上云"改为中性词 |

## 内网域名 → 外网地址

| 原域名 | 处理 |
| --- | --- |
| `codelab.msxf.com/gc-pbs/gc-ui-fe` | `github.com/JayTam/antd-ms` |
| `codelab.msxf.com/gc-common/gc-ui-fe` | `github.com/JayTam/antd-ms` |
| `gitlab.msxf.com/mscloud/cloud-ui-frontend` | `github.com/JayTam/antd-ms` |
| `ui.msxf.msxfyun.test` `ui-next.msxf.msxfyun.test` | 移除 |
| `mscloud-*.msxf.msxfyun.test` `mscloud-*.msxfcloud.test` `*.msxf.local` | 移除所有 proxy 配置 |

## VSCode 拼写词典剔除项

- `msxf`
- `msxfjacp`

## 保留项

- `kong.png` `weike.png`：文件保留（dumi 主题兜底图 / `introduce.md` 引用），仅清除关联文案。
- `MsField` `MsTable` `MsForm` `Ms*` 一切 `Ms` 前缀组件：保留公开 API。
- `@jaytam/ms-request` `@jaytam/ms-flow` `@jaytam/ms-gantt` 等已发包包名：保留。
- `packages/ms-request/` 目录、`msRequest` 变量名等非公开 `ms` 字符串：保留。
