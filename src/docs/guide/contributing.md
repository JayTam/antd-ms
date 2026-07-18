---
title: 贡献指南
order: 1
toc: content
group:
  title: 其他
---

# 贡献指南

这篇指南会指导如何参与到 `antd-ms` 的开发中来，请你在开发之前花几分钟来阅读一遍这篇指南。

## 项目结构

该站点使用 `dumi` 组件研发解决方案，打包工具使用的是推荐 `father` 而不是 `webpack`，核心原因是 <a href="https://github.com/umijs/father-next/blob/master/docs/guide/build-mode.md" target="_blank">bundless 构建模式</a>，相关的配置项目请看 <a href="https://d.umijs.org/" target="_blank">dumi 文档</a> 和 <a href="https://github.com/umijs/father-next/blob/master/docs/guide/index.md" target="_blank">father 文档</a>。

代码风格检查，基于 `@umijs/fabric` 的 `eslint` 和 `prettier` 配置，`stylelint` 比较鸡肋就没有使用，`huksy` 提供 git hooks 功能，`lintstaged` 只检查本次 commit 提交的代码。

<Tree>
  <ul>
    <li>
      .dumi
      <small>dumi框架自动生成</small>
    </li>
    <li>
      .husky
      <small>git hooks 在各个阶段执行命令的配置</small>
      <ul>
        <li>
          pre-commit
          <small>git hooks 在 pre-commit 阶段执行命令的配置</small>
        </li>
      </ul>
    </li>
    <li>
      .dist
      <small>文档打包生成文件目录</small>
    </li>
    <li>
      lib
      <small>组件库打包生成文件目录</small>
      <ul>
        <li>
          esm
          <small>组件库打包生成的 es module</small>
        </li>
        <li>
          cjs
          <small>组件库打包生成的 commonjs </small>
        </li>
      </ul>
    </li>
    <li>
      public
      <small>文档打包之后不做处理，直接复制到 dist 目录</small>
    </li>
    <li>
      src
      <small>dumi框架自动生成</small>
      <ul>
        <li>
          docs
          <small>站点文档目录，dumi会扫描该目录下的 md 文件生成文档，采用约定式生成路由</small>
        </li>
        <li>
          components
          <ul>
            <li>
            index.ts
            <small>导出文件，导出 component 及 ts 类型</small>
            </li>
          </ul>
        </li>
        </li>
        <li>
          hooks
          <ul>
            <li>
            index.ts
            <small>导出文件，导出 hook 及 ts 类型</small>
            </li>
          </ul>
        </li>
        <li>
          utils
          <ul>
            <li>
            index.ts
            <small>导出文件，导出 util 及 ts 类型</small>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      .dumirc.ts
      <small>dumi配置文件</small>
    </li>
    <li>
      .editorconfig
    </li>
    <li>
      .fatherrc.ts
      <small>fatherrc配置文件，组件库打包工具，默认使用 bundless 模式</small>
    </li>
    <li>
      .gitattributes
      <small>git 配置文件，统一末尾换行符为 lf</small>
    </li>
    <li>
      .gitignore
    </li>
    <li>
      .lintstagedrc.js
      <small>git hooks 提交只检查 staged 文件，不用全项目检查</small>
    </li>
    <li>
      .prettierrc.js
    </li>
    <li>
      .eslintrc.js
    </li>
    <li>
      .prettierignore
    </li>
    <li>
      .tsconfig.json
      <small>ts 项目配置文件</small>
    </li>
    <li>
      .typing.d.ts
      <small>整个项目公共类型声明文件</small>
    </li>
    <li>
      .package.json
    </li>
    <li>
      pnpm-lock.yaml
    </li>
    <li>
      .README.md
    </li>

  </ul>
</Tree>

## 分支管理

目前暂存两个主版本号 `v1.x` 和 `v2.x`，都是基于 `antd v4`

- `v2.x` 对用 `dev-master` 分支，该版本是经过组件 UI 设计/评审，研发设计/评审再进行开发，同时吸取了 `v1` 精华部分的设计，相较于 `v1` 有质的提升。
- `v1.x` 对应 `dev-v1` 分支，该版本的是开发人员个人贡献的，未经过评审，应用场景比较局限和组件 API 设计也不规范。

组件库开发都是基于 `dev-master` 分支创建 `feature` 分支进行开发，开发完成之后再合并回 `dev-master` 分支，最后删除本地和远程的 `feature` 分支，具体细节步骤请看下面的开发流程。

## 开发流程

在你 clone 了 <a href="https://gitlab.msxf.com/mscloud/cloud-ui-frontend" target="_blank">antd-ms 代码</a> 并且使用 `pnpm install` 安装完依赖后，你还可以运行下面几个常用的命令：

- `pnpm start` 在本地运行文档网站
- `pnpm build` 构建 antd-ms 的 esm 版本到 lib/esm 目录
- `pnpm build:docs` 构建 antd-ms 的静态文档网站代码到 dist 目录
- `pnpm lint` 检查代码风格

### components 开发

1. 以 `MsSelect` 组件为例，基于 `dev-master` 新建 `dev-ms-select` feature 分支。

```shell
# 在 dev-master 分支下
git checkout -b dev-ms-select
# 推送到远端并建立关联
git push origin dev-ms-select
git push --set-upstream origin dev-ms-select:dev-ms-select
```

2. 在 `src/components` 下创建`MsSelect`目录，目录结构如下，组件 API 命名请参考<a href="https://github.com/ant-design/ant-design/wiki/API-Naming-rules" target="_blank"> API 规范 </a>。

:::warning

所有的组件命名都必须以 `Ms` 开头，命名使用 UperCamelCase（大驼峰）风格。

:::

<Tree>
  <ul>
    <li>
      components
      <ul>
        <li>
          MsSelect
          <small>组件目录</small>
          <ul>
            <li>
              __demo__
              <small>演示代码目录</small>
              <ul>
              <li>
                basic.md
                <small>基础的组件演示代码</small>
              </li> 
              <li>
                select-request.md
                <small>演示代码文件命名，多个单词使用 "-" 分割</small>
              </li>
              </ul>
            </li>
            <li>
              __test__
              <small>单测目录</small>
              <ul>
              <li>
                index.test.tsx
                <small>组件单测文件</small>
              </li> 
              <li>
                demo.test.tsx
                <small>demo单测文件</small>
              </li> 
              </ul>
            </li>
            <li>
              components
              <small>如果组件较复杂，可以创建该目录存放子组件代码（可选）</small>
            </li>
            <li>
              select.tsx
              <small>组件代码</small>
            </li>
            <li>
              index.ts
              <small>组件导出口，包含组件代码和 ts 类型</small>
            </li>
            <li>
              types.ts
              <small>组件类型，如果类型声明不多，可直接写在 select.tsx 中（可选）</small>
            </li>
            <li>
              index.md
              <small>组件文档</small>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</Tree>

3. 在 `src/components/MsSelect/index.ts` 导出代码和类型。

```ts
import MsSelect from './select';
import type { MsSelectProps, MsSelectActionType } from './types';

export default MsSelect;
export type { MsSelectProps, MsSelectActionType };
```

4. 在 `src/components/index.ts` 导出代码和类型。

```ts
export { default as MsSelect } from './MsSelect';
export type { MsSelectProps, MsSelectActionType } from './MsSelect';
```

5. `pnpm commit` 按照提示填写 <a href="/guide/standard#git-message-规范" target="_blank">Git Message 规范</a>，比较熟悉的可手写规范。

```shell
pnpm commit
# or
git commit -m "feat(ms-select): 新增MsSelect组件"
```

6. 合并到 `dev-master` 分支中，并删除 feature 分支。

```shell
git checkout dev-master
git merge dev-ms-select
# 删除本地和远程分支
git branch -D dev-ms-select
git push origin --delete dev-ms-select
```

### hooks 开发

1. 以 `useRequest` 为例，基于 `dev-master` 新建 `dev-use-request` feature 分支。

```shell
# 在 dev-master 分支下
git checkout -b dev-use-request
# 推送到远端并建立关联
git push origin dev-use-request
git push --set-upstream origin dev-use-request:dev-use-request
```

2. 在 `src/hooks` 下创建 `useRequest` 目录，目录结构如下，API 命名请参考<a href="https://github.com/ant-design/ant-design/wiki/API-Naming-rules" target="_blank"> API 规范 </a>。

:::warning

所有的 hook 命名都必须以 `use` 开头，命名使用 lowerCamelCase（小驼峰）风格。

:::

```
└── hooks
  └── useRequest
    ├── __demo__                  演示代码目录
    │    ├── basic.md             基础的演示代码
    │    └── select-request.md    演示代码文件命名，多个单词使用 "-" 分割
    ├── index.ts(x)               hook 代码和 ts 类型
    ├── types.ts                  类型文件，如果类型声明不多，可直接写在 index.ts(x) 中（可选）
    └── index.md                  hook 文档
```

3. 在 `src/hooks/index` 导出代码和类型。

```ts
export { default as useRequest } from './useRequest';
export type { RequestOption } from './useRequest';
```

4. `pnpm commit` 按照提示填写 <a href="/guide/standard#git-message-规范" target="_blank">Git Message 规范</a>，比较熟悉的可手写规范。

```shell
pnpm commit
# or
git commit -m "feat(use-request): 新增 useRequest"
```

5. 合并到 `dev-master` 分支中，并删除 feature 分支。

```shell
git checkout dev-master
git merge dev-use-request
# 删除本地和远程分支
git branch -D dev-use-request
git push origin --delete dev-use-request
```

### utils 开发

1. 以 `request` 为例，基于 `dev-master` 新建 `dev-request` feature 分支。

```shell
# 在 dev-master 分支下
git checkout -b dev-request
# 推送到远端并建立关联
git push origin dev-request
git push --set-upstream origin dev-request:dev-request
```

2. 在 `src/utils` 下创建 `request` 的目录，目录结构如下，API 命名请参考<a href="https://github.com/ant-design/ant-design/wiki/API-Naming-rules" target="_blank"> API 规范 </a>。

```
└── utils
  └── request
    ├── __demo__                  演示代码目录
    │    ├── basic.md             基础的演示代码
    │    └── select-request.md    演示代码文件命名，多个单词使用 "-" 分割
    ├── index.ts(x)               util 代码和 ts 类型
    ├── types.ts                  类型文件，如果类型声明不多，可直接写在 index.ts(x) 中（可选）
    └── index.md                  util 文档
```

3. 在 `src/hooks/index` 导出代码和类型。

```ts
export { default as request } from './request';
export type { RequestOption } from './request';
```

4. `pnpm commit` 按照提示填写 <a href="/guide/standard#git-message-规范" target="_blank">Git Message 规范</a>，比较熟悉的可手写规范。

```shell
pnpm commit
# or
git commit -m "feat(request): 新增 request 工具"
```

5. 合并到 `dev-master` 分支中，并删除 feature 分支。

```shell
git checkout dev-master
git merge dev-request
# 删除本地和远程分支
git branch -D dev-request
git push origin --delete dev-request
```

## 组件库发布

### 测试版

在开发分支可直接操作，运行 `pnpm release:development` 发布测试版本号。

### 正式版

只能在 `dev-master` 分支发布正式版本号：

- 修订号：运行 `pnpm release:patch`
- 次版本号：运行 `pnpm release:minor`
- 主版本号：运行 `pnpm release:major`

:::info{title=首次发布}

如果是第一次发布需要先添加账户 `npm adduser --registry http://npm.msxf.com` 按照提示注册账号信息

:::
