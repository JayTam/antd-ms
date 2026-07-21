---
title: 版本迭代
toc: content
---

# 版本迭代

`antd-ms` 遵循 [Semantic Versioning 2.0.0](/guide/standard#版本号规范) 语义化版本规范。结合下面的 [更新日志](/guide/changelog#更新日志)、<a href="https://weikezhijia.feishu.cn/wiki/HUWZwAcjIirLydkQsrSctNkUnYg" target="_blank">正式版问题</a> 和 <a href="https://weikezhijia.feishu.cn/wiki/HUWZwAcjIirLydkQsrSctNkUnYg" target="_blank">Breaking Changes</a>，可以更全面地掌握组件库的更新状态与潜在影响。​

# 发布规则及周期

- 修订版本号：缺陷修复或小功能，每天都可能发布。
- 次版本号：新组件或大功能，发布周期大概每月一次。
- 主版本号：组件库基础架构调整，发布周期不确定。

# 更新日志

## [2.24.0](https://github.com/JayTam/antd-ms/compare/v2.23.6-2025112110...v2.24.0) (2025-12-02)

### Features

- 组件库增加国际化能力 ([f2ba45a](https://github.com/JayTam/antd-ms/commit/f2ba45abbacf9ae11b66f947e8a6d7a9f508fc83))
- **ms-drawer:** 实现不重新打开抽屉，动态更新抽屉内容，使用 MsDrawer.DrawerHolder 组件 ([8679ade](https://github.com/JayTam/antd-ms/commit/8679ade065384927b88ba1a23f7ef66f79842b2f))
- **ms-modal:** 实现不重新打开弹窗，动态更新弹窗内容，使用 MsModal.ModalHolder 组件 ([4e265b6](https://github.com/JayTam/antd-ms/commit/4e265b651d055abf37c3082a6fc0dbe5ede697bb))
- **ms-table-view:** 过滤后端返回的表单数据 dataindex 不在 columns 的数据 ([203ee10](https://github.com/JayTam/antd-ms/commit/203ee105448930bfd7e5e729937ff6ea1cb84599))
- **ms-table:** toolbar 下所有工具按钮新增 btnProps 属性 ([e0516c5](https://github.com/JayTam/antd-ms/commit/e0516c523948c2414dcad6c6ffa70f0aab4a9bb7))
- **ms-upload:** 文件上传支持粘贴类型，支持 MP4 文件播放预览 ([f4622f6](https://github.com/JayTam/antd-ms/commit/f4622f6d191b2147879e2ef0b7ecee81ef74b35e))

### [2.23.6](https://github.com/JayTam/antd-ms/compare/v2.23.5-2025111415...v2.23.6) (2025-11-21)

### Features

- **ms-table:** 实现 column.valueType=cascader，表格列展示自动根据 options 映射 label ([942270a](https://github.com/JayTam/antd-ms/commit/942270ae39f48037a3e8577d916a392900649046))
- **ms-table:** 新增 polling.showSpinning 开启轮询时的表格加载效果 ([da277b2](https://github.com/JayTam/antd-ms/commit/da277b2df740f2741abf238f0b17df7232b1b780))

### Bug Fixes

- **ms-copy:** msCopy 类型为 default 时支持 ellipsis ([2d2c386](https://github.com/JayTam/antd-ms/commit/2d2c3862e913228891b4f5a0889562112dc5b8ad))
- **ms-form:** 修复只读模式下 value=0 显示 "-" 空占位 ([1da7bee](https://github.com/JayTam/antd-ms/commit/1da7bee23ba12f738001f4e9d4e7e90ede841c73))
- **ms-table-view:** 修复视图组件 Tabs 视图模式下切换导致 Tabs 消失，并优化切换时骨架过渡效果 ([9284932](https://github.com/JayTam/antd-ms/commit/9284932f8d2536779659db1917d702ee59d6f39d))

### [2.23.5](https://github.com/JayTam/antd-ms/compare/v0.0.1-2025111116...v2.23.5) (2025-11-14)

### Features

- **ms-rules-config:** 初始行参数命名合理化 ([391dfa5](https://github.com/JayTam/antd-ms/commit/391dfa5867d71124310d43ad336f3be94fb2d685))
- **ms-rules-config:** 添加初始化行的赋值 ([8228a9f](https://github.com/JayTam/antd-ms/commit/8228a9f8fe45ff168d663abc156070cb9e1bc8e2))

### Bug Fixes

- **ms-table-view:** 优化视图筛选条件样式 ([1136cb6](https://github.com/JayTam/antd-ms/commit/1136cb64eac49174743bcf0fd9519b9207834001))
- **ms-table:** 修复 aggr 筛选类型下，筛选项清空但是选择器未清空 ([8a93562](https://github.com/JayTam/antd-ms/commit/8a93562fc827562c9f97ef275ff58f9f34db1f65))

### [2.23.4](https://github.com/JayTam/antd-ms/compare/v2.23.3...v2.23.4) (2025-11-10)

### Features

- **ms-auto-complete:** 将该组件 fieldProps.autoSelect 配置默认关闭 ([c8a2475](https://github.com/JayTam/antd-ms/commit/c8a2475f82650076bb024830fc7698508eb9a61f))
- **ms-form:** 新增 getPopupContainer 属性可以统一设置所有字段组件 ([0054705](https://github.com/JayTam/antd-ms/commit/0054705a6748edff9cd288590a4eb7542cf2e740))
- **ms-user-popover:** 支持精确控制某个人员是否可以删除，支持精确控制某个人员是否可以调整 ([5d2c7b6](https://github.com/JayTam/antd-ms/commit/5d2c7b66a30b4aa386234b15ff3e5e2fbcc52cd7))

### Bug Fixes

- **ms-table:** 修复 request 请求失败时，编辑表格新增行时会白屏报错 ([e1084fb](https://github.com/JayTam/antd-ms/commit/e1084fbacc3d66e7b320fe716d2158b918bf1cab))

### [2.23.3](https://github.com/JayTam/antd-ms/compare/v2.23.1...v2.23.3) (2025-11-05)

### Features

- **ms-copy:** 省略时支持 tooltip 提示 ([4dc5021](https://github.com/JayTam/antd-ms/commit/4dc50210d4f6235d5e8b973b416b8d72166a8e6d))
- **ms-resizable:** 新增支持从右侧展开收起容器 ([a27269b](https://github.com/JayTam/antd-ms/commit/a27269bdf6a878d39455a0a3a8aaf59635551d36))

### Bug Fixes

- **ms-status:** 修复 Tooltip 包裹 MsStatus，hover 上去未生效 ([08c52ae](https://github.com/JayTam/antd-ms/commit/08c52aee6d9b77002ffcadd19a7bdf5889310475))

### [2.23.2](https://github.com/JayTam/antd-ms/compare/v2.23.1...v2.23.2) (2025-10-24)

### Features

- **ms-copy:** 省略时支持 tooltip 提示 ([4dc5021](https://github.com/JayTam/antd-ms/commit/4dc50210d4f6235d5e8b973b416b8d72166a8e6d))

### Bug Fixes

- **ms-status:** 修复 Tooltip 包裹 MsStatus，hover 上去未生效 ([08c52ae](https://github.com/JayTam/antd-ms/commit/08c52aee6d9b77002ffcadd19a7bdf5889310475))

### [2.23.1](https://github.com/JayTam/antd-ms/compare/v2.23.0...v2.23.1) (2025-10-23)

### Features

- **ms-devops-layout:** 导航选中了下级菜单，对应的上级菜单调整为主色，且字重从 500 调整为 400。 demo 中调整 icon 类型 ([6ed90e3](https://github.com/JayTam/antd-ms/commit/6ed90e32ba3db388deccec0a475087e70792178d))
- **ms-rules-config:** 添加条件的默认值设置 ([7e52fa5](https://github.com/JayTam/antd-ms/commit/7e52fa51a906120227eefc59a0a07b825fd966f1))
- **ms-tabs:** 将 MsTabs 默认 type 类型的上下 padding 从 16px 调整为 9px ([0541e0a](https://github.com/JayTam/antd-ms/commit/0541e0a4d61e1570b0448d5ed9d0db19e630139e))
- **user-group:** 支持单独设置某一类型是否支持 filterSearchResult ([2ec7e34](https://github.com/JayTam/antd-ms/commit/2ec7e34c9a686ba00e0d1fc0d00b658dbaa038dc))

### Bug Fixes

- **ms-descriptions:** 优化描述列表分组的样式 ([98871e3](https://github.com/JayTam/antd-ms/commit/98871e37d83f8cd35d903df7e0e4cd919aba3797))
- **ms-rules-config:** 修复单层条件未设置最大条件数，操作按钮显示异常问题 ([377af86](https://github.com/JayTam/antd-ms/commit/377af86f08d347caf8fe85f4d5c78bb365317650))
- **ms-table:** 修复使用 columnState.request 时，选字段中固定在左侧，不固定，固定在右侧分组顺序混乱 ([fe2c2e7](https://github.com/JayTam/antd-ms/commit/fe2c2e7e42dfacbbc4792a7c4aa4c31cac8f96fb))

## [2.23.0](https://github.com/JayTam/antd-ms/compare/v2.22.17...v2.23.0) (2025-09-26)

### Features

- **ms-form-list:** 当设置 fieldProps.max 会在新增按钮范围显示，fieldProps.hideAddButtonLimitText 可关闭该范围显示 ([1f4083e](https://github.com/JayTam/antd-ms/commit/1f4083e01935d76b0e7632afe1dd629b65f056fa))
- **ms-form-tabs:** 新增选项列表 field 组件 ([afd787e](https://github.com/JayTam/antd-ms/commit/afd787e8e79805acc9f843973df9e2a479e4bed6))
- **ms-form:** 实现分步表单中有 collapse 折叠，当点击下一步校验错误时，自动展开 collapse 并滚动到错误位置 ([b3d04c3](https://github.com/JayTam/antd-ms/commit/b3d04c3dbc5f1c00e52ee6aa13c9e9429de6b01c))

### Bug Fixes

- **ms-devops-layout:** 修复 noAuthRedirectPath 中 roles 为空数组时未提交的问题 ([f3a769d](https://github.com/JayTam/antd-ms/commit/f3a769d3d12d0b33a3a59afa47eefc9a71edf2cc))
- **ms-form-list:** 修复 valuesNormal 在 formList 场景下，列表子项目设置 initialValue 未生效 ([ad8b568](https://github.com/JayTam/antd-ms/commit/ad8b568542bfa0f32cf81dab31be003cdc7ee842))
- **ms-form:** 修复 valuesNormal 对 formList,formTable,formTabs 列表组件下子项的 column.initialValue 不生效 ([dc30453](https://github.com/JayTam/antd-ms/commit/dc30453b9902ce3b9e9554394c63cec147f0d354))
- **ms-form:** 修复开启 valueEnumSyncToForm 并且存在初始值时，未将初始值对应的 option 同步到 form ([c86035d](https://github.com/JayTam/antd-ms/commit/c86035d00c0468ac1be4296254565d84514cbc2c))

### [2.22.17](https://github.com/JayTam/antd-ms/compare/v2.22.16...v2.22.17) (2025-09-23)

### Features

- **ms-image:** 新增错误占位图 ([8defeb8](https://github.com/JayTam/antd-ms/commit/8defeb8dc99081c8511f45454b52fdc66f4ff07f))
- **ms-rules-config:** 增加单组条件最大添加数量功能 ([6dd3c8a](https://github.com/JayTam/antd-ms/commit/6dd3c8add566241e494d852a4f5ee213590e7ac3))

### [2.22.16](https://github.com/JayTam/antd-ms/compare/v2.22.15...v2.22.16) (2025-09-18)

### Features

- **ms-table:** 列拖移功能重构，优化用户体验 ([7e3674b](https://github.com/JayTam/antd-ms/commit/7e3674b7eeabd5447a621d876fb95c2b118198a6))
- **ms-table:** 新增 column.ellipsis.showTooltip 内容区域使用 Tooltip 展示省略 ([032f083](https://github.com/JayTam/antd-ms/commit/032f0837d10f66c8239ad031e5322bed946f9683))
- **ms-table:** 优化表头宽度较窄时开启 column.tooltip，仅省略文字内容，始终显示 tooltip 提示图标 ([69e5d21](https://github.com/JayTam/antd-ms/commit/69e5d21fddaf55eb0d90843053644cd0b9a6f6f4))
- **ms-user-group:** 支持 filterSearchResult 属性，可以控制是否根据 search 值来过滤返回结果 ([39415ce](https://github.com/JayTam/antd-ms/commit/39415ce974f7f8de44507abc79f5cbac8459663e))
- **ms-user-group:** user-group 组件支持岗位的显示 ([488db9a](https://github.com/JayTam/antd-ms/commit/488db9a8f7eff5678ad5f5bbf6a2ca637b48fab0))

### Bug Fixes

- **user-popover:** 增加监听 table 类型的 user-popover 的父容器宽度变化，修复父容器宽度变化时显示的头像数不正确的问题 ([d2b08ff](https://github.com/JayTam/antd-ms/commit/d2b08ffb4bd1016a72203e8767d2d5dbf5e8bcbe))

### [2.22.15](https://github.com/JayTam/antd-ms/compare/v2.22.14...v2.22.15) (2025-09-12)

### Features

- **UserPopover:** 用户组件新增职位显示 ([b6be060](https://github.com/JayTam/antd-ms/commit/b6be0608f32a7bcd3ca9961d8d5ec70b112a7b82))

### Bug Fixes

- **ms-form:** 修复分步表单 stepsProps.defaultCurrent 失效 ([8a60d40](https://github.com/JayTam/antd-ms/commit/8a60d40a5b4145114b0366f210eae6689e93f804))
- **ms-icons:** 修复引入 @rc-component/father-plugin 导致 umi2 项目存在兼容性问题 ([b78d5ef](https://github.com/JayTam/antd-ms/commit/b78d5ef43ff2ca32e94180e94d8552457b18ad51))
- **ms-rules-config:** 修复 fieldReadRender 不为函数返回问题 ([8fc4ff0](https://github.com/JayTam/antd-ms/commit/8fc4ff0b569d0cf760025f1a1978bf332edf827d))

### [2.22.14](https://github.com/JayTam/antd-ms/compare/v2.22.13...v2.22.14) (2025-09-09)

### Features

- **ms-icons:** 根据 antd-ms 组件库图标完善 ms-icons 图标 ([a55b58b](https://github.com/JayTam/antd-ms/commit/a55b58b1fd2f198e4dfe0c6642fc8c827144abd8))
- **ms-rules-config:** 此组件中重写 fieldReadRender 方法 ([53d38b0](https://github.com/JayTam/antd-ms/commit/53d38b056518cf09100fcdf50e49a2c948147eec))

### Bug Fixes

- **ms-cascader:** 修复 fieldProps.loadChildrenData 异步报错 loading 状态未取消 ([28b205f](https://github.com/JayTam/antd-ms/commit/28b205fbf281b5eab3b774cd19f3fc7f372fde8d))
- **ms-dropdown:** 优化 dropdown 中 buttonType 设置为 primary 后，同时设置为 disabled 为 true 时的样式效果 ([1922148](https://github.com/JayTam/antd-ms/commit/1922148e68dc60c9e0a741ea179e41bd67de26e7))
- **ms-table-view:** 初始化时计算下拉箭头显示情况;聚合表单点击搜索时根据参数决定是否情况 field 的值 ([02e5b6d](https://github.com/JayTam/antd-ms/commit/02e5b6d3a124dc11db6951c896e386efb8b0b2e9))

### [2.22.13](https://github.com/JayTam/antd-ms/compare/v2.22.12...v2.22.13) (2025-09-04)

### Features

- **ms-actions:** 优化更多下拉菜单的滚动样式，上下各留 4px 区域 ([2ddc8f2](https://github.com/JayTam/antd-ms/commit/2ddc8f223df38b0836257d771dea809e701e73d1))
- **ms-cascader:** 新增 fieldProps.loadChildrenData 处理异步加载子项 ([3e19f8e](https://github.com/JayTam/antd-ms/commit/3e19f8e820b5bd267fc591ca4d83b7136397b9fb))
- **ms-statistic:** 副指标位置增加 follow 值; 指标的鼠标悬浮样式增加过渡效果 ([6d45322](https://github.com/JayTam/antd-ms/commit/6d45322dc074e917a3c7bcfca2176fdf88459f2f))
- **ms-table-view:** 视图类型 UI 调整 ([f4a87bd](https://github.com/JayTam/antd-ms/commit/f4a87bd9ff6850295baf970d33b0d3ba8a6a51dd))

### Bug Fixes

- **ms-ip:** 修复粘贴非法格式时，要剔除合法格式之外的内容 ([ccd707f](https://github.com/JayTam/antd-ms/commit/ccd707fc95083fb00bbf1fffd1038aaec718c646))

### [2.22.12](https://github.com/JayTam/antd-ms/compare/v2.22.11...v2.22.12) (2025-08-28)

### Features

- **ms-table:** 优化 scroll.y=auto-content 在表格 dataSource 变更时触发重新计算滚动高度 ([f7ea931](https://github.com/JayTam/antd-ms/commit/f7ea93197e90df840cc92887084e13dac28b1544))

### Bug Fixes

- **ms-field:** 使用 useDebounceFn 修复 debounce 失效，涉及 user, userGroup, resourceGroup 组件 ([cececc7](https://github.com/JayTam/antd-ms/commit/cececc7d8033ee74f3b9f01c7ed4b67287a1c7b7))
- **ms-form-table:** 修复 formTable 存在三级依赖时，使用 column.skipRequest 异常 ([d3e592c](https://github.com/JayTam/antd-ms/commit/d3e592c9533eb806653998fa0e08201340727557))
- **ms-request:** 修复 sentry 报错，401 场景下 request 未返回 reject，无业务影响 ([05343b1](https://github.com/JayTam/antd-ms/commit/05343b1e1219fb2aec448d84d8117b0fc57a06d0))
- **ms-table:** 修复监听浏览器 resize 事件防抖失效，进而优化性能 ([0a73919](https://github.com/JayTam/antd-ms/commit/0a739191b50383fcabbc2ccc3a33390c74247527))
- **ms-table:** 修复列设置 columnState.defaultValue 失效，2.22.3 引入的问题 ([1a93980](https://github.com/JayTam/antd-ms/commit/1a9398011200a494b760ee07b3ac4def703cc5a3))
- **ms-tabs:** 修复 ms-tabs 在 card 类型下，英文使用默认字体类型时的抖动问题 ([eda6550](https://github.com/JayTam/antd-ms/commit/eda6550bad62f0e4959c45699a4327dd17ef180b))
- **ms-user-group:** 修复清空搜索查询值时未触发重新查询的问题 ([2c0444e](https://github.com/JayTam/antd-ms/commit/2c0444e6a3cbd4d4fd15a5cb44f55a4995e50a31))

### [2.22.11](https://github.com/JayTam/antd-ms/compare/v2.22.10...v2.22.11) (2025-08-21)

### Features

- **ms-form:** 新增 stepsProps.disabledValidateStep 关闭分步时的表单校验 ([6950832](https://github.com/JayTam/antd-ms/commit/695083287af3a68fafcaf02885fe57c9ab9f03c0))
- **ms-form:** 新增 anchorGroup 可根据分组生成分步样式的锚点控制器 ([5a6546f](https://github.com/JayTam/antd-ms/commit/5a6546f3c5ffe43e98fccad4a707598e714c1d72))
- **ms-layout:** 菜单支持 inlineIndent 配置 ([65ba995](https://github.com/JayTam/antd-ms/commit/65ba995e2b25ff46ec2e9ac9c4d849dcb7c4da5b))
- **ms-rules-config:** 删除按钮二次弹窗提示 ([9795b15](https://github.com/JayTam/antd-ms/commit/9795b15f013c5f45df79cbe06f17c2bb7af5a8cf))
- **ms-rules-config:** 统一按钮样式及回显清空修复 ([00b315f](https://github.com/JayTam/antd-ms/commit/00b315fcae0fc08c68849404e8568fdbfa032711))
- **ms-rules-config:** 组件渲染问题修复，添加自定义校验，开发 MsField 联动 ([a519298](https://github.com/JayTam/antd-ms/commit/a519298743d58037f1904b59f8ba7642097841c9))
- **ms-rules-config:** 组只有一条数据时，隐藏组特定样式 ([f510f36](https://github.com/JayTam/antd-ms/commit/f510f36e255bb42932d4df57f1254da7017521ce))
- **ms-table:** 必填项的筛选标签样式优化 ([c128750](https://github.com/JayTam/antd-ms/commit/c128750fe59771373a304ccfcf41fd52d1f8f04a))
- **ms-table:** 去掉表格无数据时隐藏批量选择和分页器特性 ([0a36d11](https://github.com/JayTam/antd-ms/commit/0a36d11c4e80ac9b7aaad7f84ee493b975b02572))
- **ms-table:** 修改工具栏导出数据按钮 icon ([72f5126](https://github.com/JayTam/antd-ms/commit/72f51260efd24e210871436fb312165f37a6092e))
- **ms-table:** 优化表格提交 1s 节流引起的不友好交互体验 ([3b9219a](https://github.com/JayTam/antd-ms/commit/3b9219aecb53a98a5348dd9b6e91be0e14a78048))
- **ms-user-group:** 支持传入自定义的 searchType ([ddd5368](https://github.com/JayTam/antd-ms/commit/ddd5368e75affb9128b74e4dbf671a02617d9bb3))

### Bug Fixes

- **ms-form:** 修复 request 远程请求会合并修改 initialValues 的值，同时使用会产生问题 ([468c9eb](https://github.com/JayTam/antd-ms/commit/468c9eb1a9a7426ebc93cdb6aa46ee2500a10ab4))
- **ms-instance:** 禁用时，禁止触发 onClick 事件 ([e72fce9](https://github.com/JayTam/antd-ms/commit/e72fce9a8b0917ecb5ad35aaac6d2787e6f04432))
- **ms-layout:** 修复从二级导航跳转到一级导航时，未展开一级导航 ([c7cb77b](https://github.com/JayTam/antd-ms/commit/c7cb77b23c19496d479ee645fa47ef36b12fec33))
- **ms-pagination-select:** 修复点击下拉框中的空白区域会关闭弹窗 ([0c0d6f1](https://github.com/JayTam/antd-ms/commit/0c0d6f1acec5c173a7f25eca4aa1d35f75e786f1))
- **ms-select:** 修复当选择器多选时，value=null 选择器会渲染一个空标签 ([28d4b2d](https://github.com/JayTam/antd-ms/commit/28d4b2dde9afa88f933f3da67f4bca54946a3be8))
- **ms-table:** 修复 scroll.y=auto-content，当筛选出现筛选标签时，没有重新计算滚动高度 ([697ba4f](https://github.com/JayTam/antd-ms/commit/697ba4fe969ab0f1aa9d8de3fcd7c2e206eaee9b))
- **ms-table:** 修复开启 columnsResizable 时，动态更新 column.width 页面不会重新渲染 ([c0b90b3](https://github.com/JayTam/antd-ms/commit/c0b90b380c9c1cabe6b1d99210c909a8c72e0efc))

### [2.22.10](https://github.com/JayTam/antd-ms/compare/v2.22.9...v2.22.10) (2025-08-11)

### Features

- **ms-form:** 实现表单显示字段设置存储到本地（indexDB）或服务端 ([c9e06b6](https://github.com/JayTam/antd-ms/commit/c9e06b6492ec1c5dadd9a55f1e97479d50669844))
- **ms-statistic:** 补齐副指标 position 属性的 API 文档 ([66d2c98](https://github.com/JayTam/antd-ms/commit/66d2c98e008b0c22ce1256f754bbc6d18b944b74))
- **ms-statistic:** item 增加 hoverable 属性 ([16097d0](https://github.com/JayTam/antd-ms/commit/16097d0d62eb7bcd5505d9b9657239f984d3ced7))
- **ms-table-view:** 视图组件去掉横向滚动条;固定查询按钮在最后面;条件删除按钮添加 tooltip 提示;优化筛选框内的弹出框挂在位置;底部增加收起筛选按钮 ([6736054](https://github.com/JayTam/antd-ms/commit/673605416abb6423172c412800402cdc5571e435))
- **ms-table:** scroll.y=auto-content 支持各种 render 更新时滚动高度动态更新 ([611c209](https://github.com/JayTam/antd-ms/commit/611c2092a5622831dabf0a846c8b3de6af2c1882))
- **ms-user-group:** 增加一键清除的功能，一键清除支持自定义 popconfirm 的表现 ([ec85dba](https://github.com/JayTam/antd-ms/commit/ec85dba403a671f6ad56d4168d38c93ac669ad1c))

### Bug Fixes

- **ms-table:** 修复列设置保存功能失效，自 2.22.3 引入该问题 ([f039625](https://github.com/JayTam/antd-ms/commit/f0396253891371a11d3aa987aa9d376581c3457e))

### [2.22.9](https://github.com/JayTam/antd-ms/compare/v2.22.8...v2.22.9) (2025-08-07)

### Features

- **ms-actions:** 新增 expendMoreWhenSingle，当更多下拉菜单只有一个 item 时，展开更多按钮中的这个 item，默认不开启该功能 ([c38d049](https://github.com/JayTam/antd-ms/commit/c38d049930ff9d7656d072eb0b72dcbd58d3daa0))
- **ms-descriptions:** 新增 skipRequest 可控制跳过请求 ([895e5b1](https://github.com/JayTam/antd-ms/commit/895e5b15ae241f872cbe204888a6cb4b746edeaf))
- **ms-form:** 新增 skipRequest 可控制跳过请求 ([fbc6f08](https://github.com/JayTam/antd-ms/commit/fbc6f085d850b98b5e39dfeb5a391e6c7ad4cffe))
- **ms-page:** 新增 skipRequest 可控制跳过请求 ([f7c87a7](https://github.com/JayTam/antd-ms/commit/f7c87a7fc63abd89e6210879b48e8ea10ebf8208))
- **ms-table:** 新增 skipRequest 可控制跳过请求 ([27ba8cf](https://github.com/JayTam/antd-ms/commit/27ba8cf164325e7474ae46633502f99785c3587f))
- **ms-table:** 修改 polling.pollingErrorRetryCount 错误轮询次数从默认 3 次改成 0 次 ([1dfc12b](https://github.com/JayTam/antd-ms/commit/1dfc12bdf7e26a67239612659a3b79326400394c))
- **ms-table:** 优化 aggr 用户体验，在无值的情况下点击搜索按钮触发表格刷新 ([f077153](https://github.com/JayTam/antd-ms/commit/f0771530addfd76f942d43943bd2d52939e0ed5e))
- **ms-table:** 优化请求顺序，table request 优先于 column request ([9ab7249](https://github.com/JayTam/antd-ms/commit/9ab72490043751e9c526063724928e2964d6f698))
- **ms-table:** 优化筛选、翻页滚动到第一行时，滚动到可看见表头 ([ba1d171](https://github.com/JayTam/antd-ms/commit/ba1d171231ed465b5d2bbbe41f663aa4f4089173))

### Bug Fixes

- **ms-form:** 修复 2.22.8 优化防暴力点击引发的偶现无法提交问题 ([e178253](https://github.com/JayTam/antd-ms/commit/e17825339c3c4ebe1c305eebcb0e528b80f3a5f1))

### [2.22.8](https://github.com/JayTam/antd-ms/compare/v2.22.5...v2.22.8) (2025-07-31)

### Features

- **ms-cascader:** 优化 mutiple 时，点击标签删除不会触发失焦事件 ([a6ed2f4](https://github.com/JayTam/antd-ms/commit/a6ed2f4e4f41b06c383411723df8802e9069f4db))
- **ms-devops-page:** 增加默认的类名，便于自定义调整样式 ([5e5fdca](https://github.com/JayTam/antd-ms/commit/5e5fdcad9e55020341070a4f2d962de5b1611acc))
- **ms-form:** 优化确认按钮防暴力点击，确认按钮事件节流 1 秒，在检验之前开启 loading ([2df51c4](https://github.com/JayTam/antd-ms/commit/2df51c4f5b03a009b0ac487f498b9907f4b90d62))
- **ms-request:** 新增角色授权，@陈亦铭 公共业务逻辑 ([8b8c36c](https://github.com/JayTam/antd-ms/commit/8b8c36ca0f2a01b77cbe900a920d797c48007483))
- **ms-rules-config:** 添加表单行自适应换行 ([6275e53](https://github.com/JayTam/antd-ms/commit/6275e538d9d86c51f3028ae8bbcda94f958da87e))
- **ms-rules-config:** 添加删除按钮位置自定义 ([d153a7a](https://github.com/JayTam/antd-ms/commit/d153a7a4617f30e9a7294a5ce2a7bb62c1770864))
- **ms-rules-config:** 添加只读模式样式优化 ([7c8effa](https://github.com/JayTam/antd-ms/commit/7c8effa8267cae59ad4ceee12601e9de779369dd))
- **ms-select:** 优化 mutiple 和 tag 模式时，点击标签删除不会触发失焦事件 ([3962696](https://github.com/JayTam/antd-ms/commit/39626964d606f33437449dbc3fe971c8a2f65bd1))
- **ms-tree-select:** 优化 mutiple 时，点击标签删除不会触发失焦事件 ([edfb5d3](https://github.com/JayTam/antd-ms/commit/edfb5d384fb8e83be7326ccc4ead2506a21caf15))

### Bug Fixes

- **ms-form-table:** 修复 formTable 嵌套 formList 时，formList 中不展示 label 和下间距 ([0f396f5](https://github.com/JayTam/antd-ms/commit/0f396f5c7702df5eefd3d2465c31251c43994a28))
- **ms-ip:** 修复传入 ipInputs[x].validValueRange 合法范围不生效 ([9a60e2a](https://github.com/JayTam/antd-ms/commit/9a60e2a8bef62c9e0acbc6faa1d907cd0f35bb1c))

### [2.22.7](https://github.com/JayTam/antd-ms/compare/v2.22.5...v2.22.7) (2025-07-28)

### Features

- **ms-rules-config:** 添加表单行自适应换行 ([6275e53](https://github.com/JayTam/antd-ms/commit/6275e538d9d86c51f3028ae8bbcda94f958da87e))
- **ms-rules-config:** 添加删除按钮位置自定义 ([d153a7a](https://github.com/JayTam/antd-ms/commit/d153a7a4617f30e9a7294a5ce2a7bb62c1770864))
- **ms-rules-config:** 添加只读模式样式优化 ([7c8effa](https://github.com/JayTam/antd-ms/commit/7c8effa8267cae59ad4ceee12601e9de779369dd))

### Bug Fixes

- **ms-field:** 修复自定义组件传 ReactNode 类型时，声明在 ReactNode 上的 onChange, onBlur 等受控属性不生效 ([4d6c025](https://github.com/JayTam/antd-ms/commit/4d6c025e468348f3ff9172390f269baed8c30ffb))
- **ms-preset-resource-tags:** 修复在表格筛选标签中删除某一个同 key 的预置标签和自定义标签，两个都会错误的删除 ([86d11e2](https://github.com/JayTam/antd-ms/commit/86d11e2ad2f2cc09669bcb35e65a0373304596a2))

### [2.22.5](https://github.com/JayTam/antd-ms/compare/v2.22.4...v2.22.5) (2025-07-23)

### Bug Fixes

- **ms-table:** 修复设置显示字段的固定在左侧和右侧功能失效，2.22.3 版本引起 ([7ab29aa](https://github.com/JayTam/antd-ms/commit/7ab29aa34ce77afea698c962bc91e3a73937a421))

### [2.22.4](https://github.com/JayTam/antd-ms/compare/v2.22.3...v2.22.4) (2025-07-23)

### Bug Fixes

- **ms-table:** 修复组件有个别文件引用 lodash 而不是 lodash-es，可能会产生异常 ([5a6d163](https://github.com/JayTam/antd-ms/commit/5a6d1630af714027da21c0228e973ae80f8a9244))

### [2.22.3](https://github.com/JayTam/antd-ms/compare/v2.22.2...v2.22.3) (2025-07-23)

### Features

- **ms-confirm:** 新增 MsConfirm.ConfirmlHolder 用于修改确认弹窗的组件层级 ([28920d9](https://github.com/JayTam/antd-ms/commit/28920d9857a8ca9ee000f63a8c7db081888e050d))
- **ms-drawer:** 新增 MsDrawer.DrawerlHolder 用于修改抽屉的组件层级 ([405ff32](https://github.com/JayTam/antd-ms/commit/405ff324da917879438ec0160b253d692bb626d4))
- **ms-form:** 新增 actionRef.openColumnSet 控制表单项显隐和排序 ([6d9a26a](https://github.com/JayTam/antd-ms/commit/6d9a26a9e764c9af2099e9a9f2d8f889cedd5988))
- **ms-modal:** 新增 MsModal.ModalHolder 用于修改弹窗的组件层级 ([454acf6](https://github.com/JayTam/antd-ms/commit/454acf66079d0ba474b99c4c0986af981c557e3a))
- **ms-rules-config:** 自定义条件按钮样式 ([eed5188](https://github.com/JayTam/antd-ms/commit/eed5188e95dc9e4ab51cbe105e054ef81692e1eb))
- **ms-statistic:** 每个 item 支持 style 和 className 属性 ([b2f50de](https://github.com/JayTam/antd-ms/commit/b2f50de231378757d8d07e5562b5ec1733a44a06))
- **ms-table:** 实现 columnExport 列导出，通过 toolbar.exporting 可打开 ([3367a87](https://github.com/JayTam/antd-ms/commit/3367a87fde0ecf4f57e7d18bb38ea83420dc9043))

### Bug Fixes

- **ms-actions:** 修复当 actionsType=button 且存在隐藏项时，最后一个按钮应保持 button 样式风格。 ([e47eb3e](https://github.com/JayTam/antd-ms/commit/e47eb3e0e1c90252ec294c87226d4d4a84339d70))
- **ms-layout:** 修复在二级菜单时，一级菜单的 submenu 打开悬浮在右侧 ([c3bc6a1](https://github.com/JayTam/antd-ms/commit/c3bc6a182d400164faa7037577b4a7da274bea70))
- **ms-table:** 修复编辑表格保存后出现前后端不一致时，以后端的数据为准，重置编辑表单 ([96a55b8](https://github.com/JayTam/antd-ms/commit/96a55b80e50b2b965e0c230977da03fdb1fdb99f))
- **ms-table:** 修复默认的选择模式下 rowSelection.defaultSelectedRowKeys 失效 ([b4b7e1b](https://github.com/JayTam/antd-ms/commit/b4b7e1ba71a868365c8799b76c7b3cc25399f139))

### [2.22.2](https://github.com/JayTam/antd-ms/compare/v2.22.1...v2.22.2) (2025-07-18)

### Bug Fixes

- **ms-field:** 修复选择器类组件在只读模式下，设置 fieldProps.loading 无效 ([e383552](https://github.com/JayTam/antd-ms/commit/e383552234d9c0a2d865c5ad12820b461b39e2f4))
- **ms-resizeable:** 修复侧边栏默认应该是展开状态 ([8e44d27](https://github.com/JayTam/antd-ms/commit/8e44d27bc098195e29113e794bdad5c24d983f24))
- **ms-table-view:** 修复在使用 Tabs 形式时，初始化不传入 activeId 会导致整个组件渲染为空 ([2899479](https://github.com/JayTam/antd-ms/commit/2899479adde99047d31ef51606ded0290ab8101c))

### [2.22.1](https://github.com/JayTam/antd-ms/compare/v2.22.0...v2.22.1) (2025-07-16)

### Bug Fixes

- **ms-statistic:** 修复 less 引用路径错误，可能引起项目构建失败 ([d52a1aa](https://github.com/JayTam/antd-ms/commit/d52a1aa69f0d3f00e7a6c1617bbbe87ca2d771c0))

## [2.22.0](https://github.com/JayTam/antd-ms/compare/v2.21.14...v2.22.0) (2025-07-15)

### Features

- **ms-field:** 优化 request 首次请求不要受 debounceTime 影响，首次请求立即执行 ([a46bcc3](https://github.com/JayTam/antd-ms/commit/a46bcc3838999512a6ff0237a171600671f82922))
- **ms-statistic:** 新增 MsStatistic 数值统计(指标卡)组件 ([538e909](https://github.com/JayTam/antd-ms/commit/538e9090bd1d09946cef799d5b2a603cc063a90b))
- **ms-table-view:** 视图组件添加视图类型 viewType 属性，用于控制视图切换方式 ([263f47f](https://github.com/JayTam/antd-ms/commit/263f47fb198ccbae3f70ed5f53d5a1e0adb6f55c))
- **ms-table-view:** 视图组件支持 tab 切换视图 ([02bd98c](https://github.com/JayTam/antd-ms/commit/02bd98cc91319f8f8dc6c5ea459fa6ba17a747f3))
- **ms-table-view:** 新增视图组件 ([c8b9bd0](https://github.com/JayTam/antd-ms/commit/c8b9bd06490b9af1c215d9a66bd1904224256097))
- **ms-view:** 新增视图列表组件 ([61bb0b9](https://github.com/JayTam/antd-ms/commit/61bb0b985d7c007cbdc91a9bd2303119e4073552))

### Bug Fixes

- **ms-form:** 修复弹窗/抽屉表单成功提交时，不应该触发 modal.onCancel/drawer.onCancel 事件 ([161dde6](https://github.com/JayTam/antd-ms/commit/161dde618b43fc518ebf3db35d2c0684fec25752))

### [2.21.14](https://github.com/JayTam/antd-ms/compare/v2.21.13...v2.21.14) (2025-07-14)

### Features

- **ms-drawer:** 抽屉支持内容前和内容后自定义渲染节点 ([c81d273](https://github.com/JayTam/antd-ms/commit/c81d273bc867c06d5ec01bea97332ffa0716fea6))
- **ms-form:** 去掉 label 默认超长换行 ([e05438f](https://github.com/JayTam/antd-ms/commit/e05438fa6a0524362b1d65c825576fb29bbf0324))
- **ms-form:** 重置按钮增加二次确认的配置 ([d53935f](https://github.com/JayTam/antd-ms/commit/d53935fd5e0a45165611f1d457deb52f6e007824))
- **ms-modal:** 在弹窗内容前后增加前后插槽 ([79cc92b](https://github.com/JayTam/antd-ms/commit/79cc92b9c73d0e824d3df91606458da5c185b184))
- **ms-pagination-select:** 下拉分页组件筛选输入框接收输入框参数；筛选参数支持剔除空值 ([ea3c680](https://github.com/JayTam/antd-ms/commit/ea3c680cb59853b5e0a13bfc2b15d2778757e884))
- **ms-search:** 分页栏前面支持自定义扩展项 ([fbb324c](https://github.com/JayTam/antd-ms/commit/fbb324c10765641b0a4c19a53436da9a9ab6b9c8))
- **ms-table:** 新增 search.formProps 属性透传筛选表单属性 ([ea2a533](https://github.com/JayTam/antd-ms/commit/ea2a5333eae999397d0fb6008d2b884d74633764))
- **ms-table:** actionRef 增加 getSelected 获取已选择的数据 ([e71727f](https://github.com/JayTam/antd-ms/commit/e71727f30a7cb493f02b6b11bee73bf0e164de2f))

### Bug Fixes

- **ms-form:** 修复 MsForm, MsDescriptions 偶发性问题，request 请求的初始值未能回显 ([ce594cb](https://github.com/JayTam/antd-ms/commit/ce594cbcf563f28ef1dd36813137f4d31b642fbb))
- **ms-layout:** 修复初始 url 为子菜单中的 submenu 时，默认展开未生效 ([10d54f3](https://github.com/JayTam/antd-ms/commit/10d54f3f6c8c8cf74d72b5cc5ef85dc469ba085b))
- **ms-layout:** 修复 defaultCollapsed 未生效 ([81e596d](https://github.com/JayTam/antd-ms/commit/81e596dd83924adc4e0f3937d4ec2b5ffa09f653))
- **ms-rich-text:** 修复编辑器高度计算 ([de32e68](https://github.com/JayTam/antd-ms/commit/de32e6869315d4c9c03996f6d01985e4c1b6f2d7))
- **ms-rich-text:** 修复全屏后点击 Esc 退出再次点击全屏报错；修复全屏时编辑器区域高度未撑满整个页面 ([953b140](https://github.com/JayTam/antd-ms/commit/953b140d10b13121a8ce8e859f1bd6d5032c69b4))
- **ms-table:** 表格自适应高度支持 filteredViewRender 动态高度的情况 ([9cce063](https://github.com/JayTam/antd-ms/commit/9cce06383d5cfc90a42ba20f807be75131b5e31d))
- **ms-title:** 去掉 css :has 语法，chrome 105 之前都不支持 ([c12317b](https://github.com/JayTam/antd-ms/commit/c12317b521c83b183458868395de175239180658))

### [2.21.13](https://github.com/JayTam/antd-ms/compare/v2.21.12...v2.21.13) (2025-07-08)

### Bug Fixes

- **ms-layout:** 恢复菜单层级为 10 ([fa5c97e](https://github.com/JayTam/antd-ms/commit/fa5c97e3ade6aa3c3e609573925b77d47e9cbf98))
- **ms-tabs:** 修复 radio 类型时，disabled 失效的问题 ([7a48caf](https://github.com/JayTam/antd-ms/commit/7a48cafea1cb8b68f1caa4c137aca776a1a11ef6))

### [2.21.12](https://github.com/JayTam/antd-ms/compare/v2.21.11...v2.21.12) (2025-07-04)

### Features

- **ms-form:** submitter.render 支持 ReactNode 类型 ([974b341](https://github.com/JayTam/antd-ms/commit/974b341339e2ee334964660f24a85ce07d426e9e))
- **ms-form:** ui 设计调整，统一所有场景下都是 label 左对齐 ([8542ebf](https://github.com/JayTam/antd-ms/commit/8542ebf63fb984947236ebdccf6868c74bd2d0a8))
- **ms-form:** ui 设计调整表单项间距 32px ([5058bdb](https://github.com/JayTam/antd-ms/commit/5058bdbdea5ab0215a8e9ca38febc42767b3adfe))
- **ms-gantt:** 新增 MsGantt 组件; MsSortable 组件第一个元素不展示置顶 icon 图标 ([afe6e28](https://github.com/JayTam/antd-ms/commit/afe6e28cf7f735fe685b43bb03fe5661fbcb869b))
- **ms-group:** ui 设计调整，去掉分组内容的左右 padding ([edb31d6](https://github.com/JayTam/antd-ms/commit/edb31d6d667a567e9fe8266d476e0574e1aba618))
- **ms-ip:** 实现 fieldProps.ipSelects 可将输入框变成选择器 ([249a092](https://github.com/JayTam/antd-ms/commit/249a09282dd167a5441edbed890c54722ea2afbe))
- **ms-page:** 详情页自动返回 ([69c5440](https://github.com/JayTam/antd-ms/commit/69c54407b445b940c5262c32e87d0a0f8a8241d3))
- **ms-table:** 优化 aggr 筛选器交互，无值点击搜索不会提交搜索 ([6e08725](https://github.com/JayTam/antd-ms/commit/6e08725d3b8c63882ec74dabd073434dd448a371))

### Bug Fixes

- **ms-actions:** 修复 actionsType=button，占用更多按钮那一项按钮样式应该是 button ([b8df435](https://github.com/JayTam/antd-ms/commit/b8df43500ed5ea804df0fa6653c9edd24149ee3a))
- **ms-descriptions:** 修复 column.editable 弹窗编辑会报错，是 2.21.10 引入问题 ([06c281b](https://github.com/JayTam/antd-ms/commit/06c281b40552ea4e0516182ce41772e5e3496a0d))
- **ms-descriptions:** 修复 extra=函数 失效 ([a06c6e1](https://github.com/JayTam/antd-ms/commit/a06c6e18226c0edb9f8d7ebd08d5272758ee8cd7))
- **ms-field:** 修复直接使用 MsField request 缓存异常，会始终缓存 ([3bcd98c](https://github.com/JayTam/antd-ms/commit/3bcd98c0f62336cd394edec3c2ca45bbd320a3cf))
- **ms-form-table:** 修复在 formTable 中使用自定义组件 MsField 选择器时，下拉会被限制在 cell 中 ([ff35f6c](https://github.com/JayTam/antd-ms/commit/ff35f6ce5bb05033de54b4fc8e57b898038a14a4))
- **ms-form:** 修复弹窗抽屉表单中 drawerProps.onCancel 和 modalProps.onCancel 无效 ([6a838c2](https://github.com/JayTam/antd-ms/commit/6a838c2c51a194d6145fcd095dd1165f1ef7ea38))
- **ms-form:** 优化在 MsForm 中设置 valueType=number，没有生成默认的 placeholder ([139297c](https://github.com/JayTam/antd-ms/commit/139297c1d89ff9a72913a348495e1e1a19b9ab80))
- **ms-layout:** 修复菜单和面包屑返回参数不一致的问题 ([3b6fb65](https://github.com/JayTam/antd-ms/commit/3b6fb655b7bc29738bf13d622d5b268c10492a7b))
- **ms-select:** 修复设置 fieldProps.loading 无效 ([18c3a00](https://github.com/JayTam/antd-ms/commit/18c3a00de317546b3962c2eb0b30491f9ecb4e0a))
- **ms-title:** 修复标题宽度超过最大才出现省略，之前是手动设置 50% ([3d493cd](https://github.com/JayTam/antd-ms/commit/3d493cddfe57da892e6e9ca1a4c4b0fd8f8cb2ef))

### [2.21.11](https://github.com/JayTam/antd-ms/compare/v2.21.10...v2.21.11) (2025-06-27)

### Features

- **ms-devops-layout:** 多级导航时，增加 subMenuExactMatchShow 配置，只有在子路由完全匹配时才展开子菜单 ([26cd16e](https://github.com/JayTam/antd-ms/commit/26cd16e1bfacf23ec3046960b7af0c421522e28b))
- **ms-devops-layout:** 增加 pageBackRule 配置，支持统一配置 MsDevopsPage 中的返回按钮的规则 ([51a62fe](https://github.com/JayTam/antd-ms/commit/51a62fedde058f690842526cf71752763380cb04))
- **ms-field:** 新增 column.skipRequest 函数可跳过 params 变更引起的 request 重新请求 ([318391c](https://github.com/JayTam/antd-ms/commit/318391c1597d8e3e2637ada4fbb38eb4527572d1))
- **ms-form-list:** 新增按钮在顶部时，新增数据项在最前面 ([84e1a52](https://github.com/JayTam/antd-ms/commit/84e1a52e459c6bb5906f0284141fb7f8d85e02d3))
- **ms-form-list:** 支持 fieldProps.addButtonRender 自定义新增按钮 ([eaecb63](https://github.com/JayTam/antd-ms/commit/eaecb6308578af285490acaebbe96bf28a53e063))
- **ms-request:** 将 ms-reuqest 抽离成单独库，支持单独升级符合业务变更场景。同时在 ui 中统一导出兼容项目升级直接使用 request ([0bf0c49](https://github.com/JayTam/antd-ms/commit/0bf0c498b5492e30c16e047c72a3599e523a3611))
- **ms-rows:** 优化 tooltip 跟随内容长度自动定位、并且 ellipsis 时正确定位，修复 key 报错问题 ([63a9a31](https://github.com/JayTam/antd-ms/commit/63a9a31afc4a570830ff74bb423b3b13f7b1afc4))
- **ms-rows:** gap 默认值从 8 调整为 4，调整单测用例 ([256bd36](https://github.com/JayTam/antd-ms/commit/256bd361437bf8a0d17bf674afe27e5ddffe7b23))
- **ms-rules-config:** 条件按钮只读模式隐藏及 select 自定义依赖赋值 ([2d1d287](https://github.com/JayTam/antd-ms/commit/2d1d287fd57d097265af061f30357ae329bbc23f))
- **ms-rules-config:** 新增组件横向纵向滚动条以适应条件过多情况 ([7193381](https://github.com/JayTam/antd-ms/commit/71933813d9bb4319d1b99b6413d3248a99f4d317))
- **ms-table:** 筛选器的表单都加上 name，避免筛选表单和编辑表单中字段的 id 冲突 ([0bfad6d](https://github.com/JayTam/antd-ms/commit/0bfad6d933603c6e23b91b13f9dd64e9fc5b9f28))
- **ms-tabs:** 支持透传 useUrlState 的配置 ([e27925b](https://github.com/JayTam/antd-ms/commit/e27925b70e942940c4502fa2c94895ce47b1436d))
- **ms-text-area:** 实现在 formList 和 formTable 使用气泡编辑状态 ([a3d9e6f](https://github.com/JayTam/antd-ms/commit/a3d9e6fcf6e2ef3bad3a5f63404733ca6aaaa2cc))
- **ms-user-group:** type 为 model 时，如果设置 maxCount 时，超过 maxCount 时，多余选项会被禁用 ([f46b039](https://github.com/JayTam/antd-ms/commit/f46b03935731aebd3f8f7ee31c178e5d5aefd9ce))

### Bug Fixes

- **ms-dropdown:** 修复 getPopupContainer 失效的问题， title 优化为可以自定义 ([d73512c](https://github.com/JayTam/antd-ms/commit/d73512cb9db475f35dc3023018075c46bce1e748))
- **ms-form-list:** 修复 formItemProps 为函数时设置的 rules 不生效 ([bf70e48](https://github.com/JayTam/antd-ms/commit/bf70e481c02f008c6f171f8e9aa76eb5a3356a9e))
- **ms-rows:** 修复未配置 key 的报错 ([024684f](https://github.com/JayTam/antd-ms/commit/024684f9802f58cbdb1b2fb940db1e41537486cf))
- **ms-rules-config:** 修改 MsRulesConfig 组件 columns 层级到 fieldProps 外,替换唯一 ID ([08c8313](https://github.com/JayTam/antd-ms/commit/08c8313518f7ad54da2ae85e506e867a8250927e))

### [2.21.10](https://github.com/JayTam/antd-ms/compare/v2.21.9...v2.21.10) (2025-06-25)

### Features

- **ms-actions:** 如果更多按钮中只有一项，则用这一项代替更多按钮的位置 ([d252b9b](https://github.com/JayTam/antd-ms/commit/d252b9bfbaeb2eee7ca7e6ac2118785d1a2bc67b))
- **ms-descriptions:** 新增 onFinish 第二个参数，data 是原始 dataSource 合并修改 values 之后的数据 ([61b2e96](https://github.com/JayTam/antd-ms/commit/61b2e9633b15779c7d54b21fdc34d4e49f284abb))
- **ms-form:** 由于都是固定 label 宽度，所以默认开启 labelWrap 超过长度自动换行 ([7295ba5](https://github.com/JayTam/antd-ms/commit/7295ba52cfefd79b9cac2d1ceac0623f64fc1460))
- **ms-select:** 新增 fieldProps.requestSearchKey 开启服务端搜索可选项 ([580248e](https://github.com/JayTam/antd-ms/commit/580248ed19ad89c3dc4514424d7b9416e446e4ed))
- **ms-table:** 实现 scroll.scrollToFirstRowOnChange 当分页、排序、筛选滚动到第一行数据，默认开启 ([e34bcdf](https://github.com/JayTam/antd-ms/commit/e34bcdf0e2d7e47ffc55ea52ff331f981ed132a3))
- **ms-table:** 优化 borderedHead 在表格的各种情况下都能去掉 cell 之间的边框 ([d863375](https://github.com/JayTam/antd-ms/commit/d86337524eea9a0154db8a4a86c229854dcb0508))
- **ms-table:** 游标分页模式下，当切换页码大小时重置回到首页 ([8aa0c89](https://github.com/JayTam/antd-ms/commit/8aa0c8935d8d9cad824f0d8c10d9914c1c6a388e))
- **ms-table:** query 区域的 digit 和 number 数字输入组件支持回车触发搜索 ([7ba9371](https://github.com/JayTam/antd-ms/commit/7ba9371969fbac96f3eea244047ad05c1f739188))

### Bug Fixes

- **ms-field:** 修复 column.debounceTime 不生效 ([99168f0](https://github.com/JayTam/antd-ms/commit/99168f0b09aeaa7617c7af4e8db97e7a7fae49bf))
- **ms-table:** 修复 rowSelection.selectionButtonsMode=mutiple 未渲染批量操作按钮问题 ([88a69f5](https://github.com/JayTam/antd-ms/commit/88a69f5b6c0c814b9b90d441ba6988766e211f9b))
- **ms-table:** 优化列标题太长时，列设置中的展示效果 ([aabf994](https://github.com/JayTam/antd-ms/commit/aabf99457e9838f021542f439f14fe6eab4077c3))

### [2.21.9](https://github.com/JayTam/antd-ms/compare/v2.21.8...v2.21.9) (2025-06-19)

### Bug Fixes

- **ms-form-table:** 修复选择器下拉菜单被限制在 table cell 中 ([ae2dd20](https://github.com/JayTam/antd-ms/commit/ae2dd20a64eb5e982d9cd72ce0ee4dda5ea55d67))
- **ms-table:** 修复编辑表格点击编辑时，编辑行渲染成空，2.21.6 引入的问题 ([63c182c](https://github.com/JayTam/antd-ms/commit/63c182c0e0ad21c47a97d77431bb22f29a145f58))

### [2.21.8](https://github.com/JayTam/antd-ms/compare/v2.21.7...v2.21.8) (2025-06-17)

### Features

- **ms-form-list:** 根据设计调整底部新增按钮样式，新增 actionsRender 自定义控制操作按钮 ([88881f1](https://github.com/JayTam/antd-ms/commit/88881f12b6ef61bcb706c668604f9dfc58aee58f))
- **ms-form-list:** 新增 fieldProps.watchList 列表下每个字段变更都重新渲染 ([6f4efbd](https://github.com/JayTam/antd-ms/commit/6f4efbd3ca6b03a9fac259f36d76eaaa414928d0))
- **ms-form-table:** 根据设计调整为带边框的样式 ([01b76a1](https://github.com/JayTam/antd-ms/commit/01b76a15d2315a070f559f481f66117b6eb54a76))
- **ms-form:** 实现 valuesNormal ([44ab5aa](https://github.com/JayTam/antd-ms/commit/44ab5aad87b1fc6325d49b998af7eb5d97181d29))
- **ms-pagination-select:** 实现依赖 params 更新重新触发请求；新增 fieldProps.searchInputProps 自定义搜索框 ([1875693](https://github.com/JayTam/antd-ms/commit/1875693b6d1acae994dba128dc349283e15ef209))
- **ms-resource-tags:** 按设计优化资源标签和预置标签相关的样式 ([326a6d7](https://github.com/JayTam/antd-ms/commit/326a6d7b6e2395da6569cbcf7c34c06036652598))

### Bug Fixes

- **ms-form-table:** 修复 column.tooltip 未生效 ([35c0bd3](https://github.com/JayTam/antd-ms/commit/35c0bd338a2cfade7720fb9bbf38be2e116a3419))
- **ms-form-table:** 修复 fieldProps.addButtonProps.disabled 失效 ([37ca70d](https://github.com/JayTam/antd-ms/commit/37ca70d1e10a37dc035d14e8f2bfa95be3ea0671))
- **ms-form-table:** 修复设置 column.fixed=right 之后的样式问题 ([461781d](https://github.com/JayTam/antd-ms/commit/461781d159f3b1e0d27d77487d891c0f3e3e5fa8))
- **ms-resource-tags:** 修复有初始值时回显异常 ([3a5111e](https://github.com/JayTam/antd-ms/commit/3a5111e93fa5016507c29bcda33c0e17eb95aebc))

### [2.21.7](https://github.com/JayTam/antd-ms/compare/v2.21.6...v2.21.7) (2025-06-11)

### Features

- **ms-actions:** 新增 moreDropDownProps 控制下拉菜单 ([ff4a675](https://github.com/JayTam/antd-ms/commit/ff4a675de58d4d0c88b7e9de21dd10fb4afcd935))

### Bug Fixes

- **ms-actions:** 使用体验优化：1.更多下拉菜单居中对齐; 2.tootip 消失动画延迟关闭；3.更多下拉菜单禁用手势精确化（出现禁用手势即弹出禁用提示） ([468d58a](https://github.com/JayTam/antd-ms/commit/468d58af03d133da178c23ebda5e85075a4ed157))
- **ms-actions:** 组件 API 变更，item.disableToolTip 变更为 item.disabledTooltip，已前向兼容但 ts 类型不兼容 ([0db1d83](https://github.com/JayTam/antd-ms/commit/0db1d8317f92b57e04e290b9ff8be277a32e7465))

### [2.21.6](https://github.com/JayTam/antd-ms/compare/v2.21.5...v2.21.6) (2025-06-10)

### Features

- **ms-resizable:** 添加 expandStyle,样式优化 ([bf7ae80](https://github.com/JayTam/antd-ms/commit/bf7ae80acd15fe3a80072c78ab6e1bd4b657d480))
- **ms-table:** 新增 column.splitFilterTags 适用于批量输入场景，将同一个字段多个条件的筛选标签分开展示 ([e1d4e9e](https://github.com/JayTam/antd-ms/commit/e1d4e9e75b6b7441d81925416046b4a72c8f5f47))
- **ms-upload:** 增加 postRes 配置处理上传接口返回值 ([2c7d1b1](https://github.com/JayTam/antd-ms/commit/2c7d1b1aede82de5f061008cbf36cefe1196544e))

### Bug Fixes

- **ms-rich-text:** 富文本只读时，无需聚焦和边框变色 ([103b2ba](https://github.com/JayTam/antd-ms/commit/103b2baccd32d6e174f9389c1a6c90512ecef108))
- **ms-rich-text:** 取消上传图片 base64LimitSize 为 5kb 的默认值 ([9b5dec6](https://github.com/JayTam/antd-ms/commit/9b5dec62e9adc9d5ff7731ce0720b7b461576068))
- **ms-rich-text:** 优化只读模式不应该展示 placeholder ([67760f2](https://github.com/JayTam/antd-ms/commit/67760f229b7170d7ece0e65b5533d6f9d7c2a721))
- **ms-rich-text:** 增强聚焦能力；优化 focus 和校验的样式；修复校验失败自动滚动到富文本 ([28ac1ed](https://github.com/JayTam/antd-ms/commit/28ac1ed2a6bff23e5c78b6c04c8677ecf43d69bf))
- **ms-table:** 修复 pagination.afterChange 不生效（以前只对前端分页生效） ([0936848](https://github.com/JayTam/antd-ms/commit/0936848db589305cf8289a402901e30206d8ee09))
- **ms-table:** 修复自己控制 rowSelection 表格选择状态时，初始化会多调用一次 rowSelection.onChange ([055de76](https://github.com/JayTam/antd-ms/commit/055de76fd383d67fc9cbc02e4760a9dcae6c739c))
- **ms-upload:** 优化只读模式无数据时的样式；只读模式无数据时点击 label 禁止弹出上传弹窗 ([891e0fa](https://github.com/JayTam/antd-ms/commit/891e0fa156f11a90dcc29f73f542016112b0b246))
- **ms-user-popover:** 修复只读，无值时，未显示短横线 ([6469627](https://github.com/JayTam/antd-ms/commit/64696278f9f12f5b3adb0812f86f3abd8de9de1c))

### [2.21.5](https://github.com/JayTam/antd-ms/compare/v2.21.4...v2.21.5) (2025-06-04)

### Bug Fixes

- **ms-user-group:** 修复团队的全选按钮禁用异常 ([71dcc7c](https://github.com/JayTam/antd-ms/commit/71dcc7c4af9d1c232caf5a0a842924357035466d))

### [2.21.4](https://github.com/JayTam/antd-ms/compare/v2.21.3...v2.21.4) (2025-06-04)

### Features

- **ms-actions:** 替换 @jaytam/icons 图标 ([b5f93e2](https://github.com/JayTam/antd-ms/commit/b5f93e2a6ecaeb83c534b934faadee3854d661d4))
- **ms-user-group:** 新增唯科群选择 ([6e35170](https://github.com/JayTam/antd-ms/commit/6e35170c160d290dd8779eede69b66de797bdc31))
- **ms-user-popover:** 新增 addPopoverProps 添加人员的 Popover 组件属性 ([41dbc42](https://github.com/JayTam/antd-ms/commit/41dbc421ac599cc72bad870c3661bdad1288f4d3))

### Bug Fixes

- **ms-user-group:** 修复 2.20.4 优化性能引起的问题，多个组件使用 valueEnumFiledNames 会产生异常 ([c8fa855](https://github.com/JayTam/antd-ms/commit/c8fa855fb6d86fb4ff551a321696f6b11d808e19))
- **ms-user:** 修复 2.20.4 优化性能引起的问题，多个组件使用 valueEnumFiledNames 会产生异常 ([27b0fbc](https://github.com/JayTam/antd-ms/commit/27b0fbc760517f7a97040111566d6ce7e7a93de5))

### [2.21.3](https://github.com/JayTam/antd-ms/compare/v2.21.2...v2.21.3) (2025-05-29)

### Bug Fixes

- **ms-actions:** 修复更多下拉菜单高度超过 200px 未出现滚动条 ([36ef7d6](https://github.com/JayTam/antd-ms/commit/36ef7d6011927754d76676b1d855afcde9a0c997))

### [2.21.2](https://github.com/JayTam/antd-ms/compare/v2.21.1...v2.21.2) (2025-05-29)

### Features

- **ms-actions:** 更多的触发按钮文本从"..."改为"更多"，新增 moreType 控制更多按钮的展示样式 ([ea7da71](https://github.com/JayTam/antd-ms/commit/ea7da714282af3d3c083daf3d56170737acc93c3))
- **ms-actions:** 新增 item.confirmProps 配置操作按钮二次确认提示 ([46aa014](https://github.com/JayTam/antd-ms/commit/46aa01429d6f7e64801b6d2e73112a2783702ea7))
- **ms-actions:** 新增 items 配置 tooltip, disableTooltip, tooltipProps，提示组件实现由 Popover 修改为 Tooltip ([d782ef6](https://github.com/JayTam/antd-ms/commit/d782ef625bb3dee31520cd6be462cc0816b418b9))
- **ms-actions:** 新增 moreText 和 moreRender 可自定义更多按钮内容 ([b322bb5](https://github.com/JayTam/antd-ms/commit/b322bb53936dc965894df013eb9361ed925fe9d8))
- **ms-descriptions:** 接受 mode 属性，可以将描述列表变成表单 ([e3e9d85](https://github.com/JayTam/antd-ms/commit/e3e9d85c52c17ffddb8017326b14f4300a94033f))

### Bug Fixes

- **ms-descriptions:** 优化 titleType=block 标题的骨架错位 ([279689c](https://github.com/JayTam/antd-ms/commit/279689c11db70dba64b00ffbc341c0f236d1e165))
- **ms-table:** 修复 query 的字段切换下拉菜单被列表选择器遮挡问题，2.20.3 引入的问题 ([8beae22](https://github.com/JayTam/antd-ms/commit/8beae229be16453bd0beefdb317d8f70520eb781))

### [2.21.1](https://github.com/JayTam/antd-ms/compare/v2.21.0...v2.21.1) (2025-05-23)

### Features

- **ms-user-group:** 在下拉框中选择的值添加上 searchType ([2ddbe47](https://github.com/JayTam/antd-ms/commit/2ddbe47645d408655df4b2fd623da315d47c03dd))

### Bug Fixes

- **ms-user-group:** 修复 valueEnum 的 disabled 未生效 ([3efdb03](https://github.com/JayTam/antd-ms/commit/3efdb03e8c901b699624b90c8904e3ca79437b70))
- **ms-user-popover:** 常用联系人有效期增加无期限配置 ([c6e9bc7](https://github.com/JayTam/antd-ms/commit/c6e9bc7a2b73b26c09b42e91af138245020db988))
- **ms-user:** 修复多选只读模式显示异常 ([f273c99](https://github.com/JayTam/antd-ms/commit/f273c99f79262ecadc601abc09fe51a6ba905a26))
- **ms-user:** 修改 user loading 状态的样式 ([d25eed7](https://github.com/JayTam/antd-ms/commit/d25eed7afc241f658ce8df4b3a3b67684aab791f))
- **ms-user:** 优化人员条数过多导致卡顿 ([151147b](https://github.com/JayTam/antd-ms/commit/151147b6bef024babccd520f29b0ca8167b8094e))
- **ms-upload:** 上传组件在抽屉中出现滚动条 ([7491fa3](https://github.com/JayTam/antd-ms/commit/7491fa384f58b846cc50093d940c189ff72b22a2))

## [2.21.0](https://github.com/JayTam/antd-ms/compare/v2.20.6...v2.21.0) (2025-05-19)

### Features

- **ms-rules-config:** 新增 MsRulesConfig 字段组件 ([8238146](https://github.com/JayTam/antd-ms/commit/8238146b3e090922d0c121e891840521aafd0bf1))

### [2.20.6](https://github.com/JayTam/antd-ms/compare/v2.20.5...v2.20.6) (2025-05-17)

### Features

- **ms-descriptions:** 新增 editFormProps 便于分开控制编辑抽屉/弹窗的表单属性 ([da424e4](https://github.com/JayTam/antd-ms/commit/da424e4aa2d967d405ad77e7c9fe7302dcee0e0a))
- **ms-form:** 表单项间距默认值 40px 改成 24px，规避可能出现横向滚动条 ([7ee8b8b](https://github.com/JayTam/antd-ms/commit/7ee8b8bdc2a2809392187396ab0689df46edba94))
- **ms-form:** 根据设计优化表单样式，1.去掉所有冒号、2.labelWidth=80px，3.表单页 label 靠左，弹窗表单 label 靠右 ([81a07aa](https://github.com/JayTam/antd-ms/commit/81a07aa4a21201f1cbb0d25650c765c69bb177ee))

### Bug Fixes

- **ms-search:** 修复未传 children 时，内容区域会渲染表格 ([ec791df](https://github.com/JayTam/antd-ms/commit/ec791df087432d9ae967f9dc268c4b48b87205b5))
- **ms-table:** 修复 aggr 筛选器在 2.20.3 引入高级筛选按钮未对齐的样式问题 ([731b980](https://github.com/JayTam/antd-ms/commit/731b980b8be054f3b42989824af5b355af53d354))

### [2.20.5](https://github.com/JayTam/antd-ms/compare/v2.20.4...v2.20.5) (2025-05-14)

### Features

- **ms-form:** 表单中加一个隐藏输入框，只有一个输入框回车不再触发表单提交 ([84d9bfc](https://github.com/JayTam/antd-ms/commit/84d9bfc7418fd779f12d526f3e0019c016e1fcaa))

### Bug Fixes

- **ms-page:** 修复 MsPage 包裹的 MsTitle 的下间距 30px -> 24px ([d331fb4](https://github.com/JayTam/antd-ms/commit/d331fb404192777c4b2ca2657d858a42a3bf4518))
- **ms-search:** 修复 TS 类型问题，column.showInQuery 类型声明缺失 ([1b226ea](https://github.com/JayTam/antd-ms/commit/1b226ea09c8eaf72abd454c7e43a3891bfc07f8d))
- **ms-table:** 修复列设置分组的排序无效，column.columnSet.groupOrder 越大越靠前 ([711915c](https://github.com/JayTam/antd-ms/commit/711915cec81cc3b7cb272a502faaad16d29ba19a))
- **ms-table:** 优化样式，开启 noCard 时筛选区域可能会出现横向滚动条 ([b52d05b](https://github.com/JayTam/antd-ms/commit/b52d05b2a8e6f80936686f000230fdfd951c8156))

### [2.20.4](https://github.com/JayTam/antd-ms/compare/v2.20.3...v2.20.4) (2025-05-12)

### Features

- **ms-user-group:** 1. 支持弹窗打开；2. 优化性能，人员选择超 1w 条时表格筛选会卡顿 ([13ed6eb](https://github.com/JayTam/antd-ms/commit/13ed6ebb17d27a6ab65678f24360081314bce534))

### Bug Fixes

- **ms-descriptions:** 修复 labelAlign=right 文字靠右不生效 ([05c1787](https://github.com/JayTam/antd-ms/commit/05c1787519074c6ae74738362d7e513e8c6e0aa3))
- **ms-digit:** 兼容低版本 rc-util，规避版本低引起 useComposeRef 导出错误的风险 ([6f67ea9](https://github.com/JayTam/antd-ms/commit/6f67ea91484e69f9c094d17c10c65fd20cfcbb7c))

### [2.20.3](https://github.com/JayTam/antd-ms/compare/v2.20.2...v2.20.3) (2025-05-07)

### Features

- **ms-form:** 新增 rowProps 控制表单项间隔，并根据设计将间隔从 20px 调整为 40px ([aa82c49](https://github.com/JayTam/antd-ms/commit/aa82c494b1b620388b26d319e4e076f1c30bcb7f))
- **ms-table:** 表格筛选区域布局优化：创建按钮和筛选器间隔都统一成 8px，aggr 的高级筛选器添加 tooltip，响应式布局优化 ([7928fc0](https://github.com/JayTam/antd-ms/commit/7928fc02008b461ed9c5d5240a0266912ca3fdd4))
- **ms-table:** 新增 search.hideFilterTags 用于控制隐藏筛选标签 ([d78de18](https://github.com/JayTam/antd-ms/commit/d78de18423192f4b0a4b911633ef0dc76f657e72))
- **ms-table:** 优化表格重置与清除功能，取消强制刷新机制，从而消除界面闪烁问题。 ([e572eca](https://github.com/JayTam/antd-ms/commit/e572ecad1489350960c63cb1e682333b3d625876))
- **ms-table:** 优化筛选标签项设为必填校验时，当无法再清空时隐藏清空按钮 ([d898184](https://github.com/JayTam/antd-ms/commit/d898184ffcba8bb94ef83ae97c0c397fc0953e05))

### Bug Fixes

- **ms-table:** 修复 query-filter 筛选器和工具栏之间有多余间隔，使用 grid 重构整个筛选区域的布局 ([19cf0cd](https://github.com/JayTam/antd-ms/commit/19cf0cde76549236ae5b14c61e73ca40a9f941ca))

### [2.20.2](https://github.com/JayTam/antd-ms/compare/v2.20.1...v2.20.2) (2025-04-25)

### Features

- **ms-resource-tags:** 当资源与 VPC 标签一致性检测失败时，展示相应的错误提示，引导用户去修复。 ([8806b3c](https://github.com/JayTam/antd-ms/commit/8806b3c99cc6670043f1d5d315043fcba74e2a59))
- **ms-resource-tags:** 优化当开启 disableTags 且无预置标签时，仅展示 '-' 空提示 ([567bd78](https://github.com/JayTam/antd-ms/commit/567bd78260c90fa7ebdbff1d0d8b45f742f00f62))

### [2.20.1](https://github.com/JayTam/antd-ms/compare/v2.20.0...v2.20.1) (2025-04-23)

### Features

- **ms-verify:** 修改 onCancel 回调函数类型 ([e3fc2ff](https://github.com/JayTam/antd-ms/commit/e3fc2ff1bf1fb7d0da2cf3cb7c39cbfdfbdb7aca))

### Bug Fixes

- **ms-actions:** 修复 limit=0 异常表现，应该折叠所有项，现在是展开所有项 ([9c8559e](https://github.com/JayTam/antd-ms/commit/9c8559e6d867fcd82f1cf39fee84945f36a743b5))
- **ms-user:** 修复 user 的名称和邮箱未正确显示 ([3e5b2ff](https://github.com/JayTam/antd-ms/commit/3e5b2ffc70623ee14c1e0694012c01d1c4686919))

## [2.20.0, 2.19.0](https://github.com/JayTam/antd-ms/compare/v2.18.11...v2.20.0) (2025-04-17)

### ⚠ BREAKING CHANGES

- **ms-field:** 以前 column.focusRequest 不影响其他控制请求触发的，比如 params 变更会重新触发请求，initialRequest 会控制是否发起新请求。现在变更为完全由聚焦触发请求，其他控制请求触发手段失效。

### Features

- **design-token:** 添加公共样式 ([4d6c7ae](https://github.com/JayTam/antd-ms/commit/4d6c7aeb32a7bd1d7ea3b57d0fe66d794eca5842))
- **design-token:** 添加公共 less 变量 ([f3664be](https://github.com/JayTam/antd-ms/commit/f3664befc5f11eef161723815aadc8e6fcbb4b38))
- **ms-actions:** 按钮样式调整 ([05827be](https://github.com/JayTam/antd-ms/commit/05827be0fc98bb5454bd585751040ce40c258d1d))
- **ms-actions:** 根据设计规范，在超过按钮限制时，新增...来代替更多文案的展示 ([906362e](https://github.com/JayTam/antd-ms/commit/906362e95e7aefc10889bdc7813b495d343548d3))
- **ms-actions:** 新增 hidden 属性 ([b98e67c](https://github.com/JayTam/antd-ms/commit/b98e67cb58b4010bcddd89ec73b07d9be288a1bf))
- **ms-actions:** 实现 items 在下拉菜单中的嵌套，之前仅支持 2 层 ([6379d24](https://github.com/JayTam/antd-ms/commit/6379d2432a878be6948474e90dde3f0748c7853e))
- **ms-actions:** 使用 MsDropdown 替换 Dropdown ([04117cf](https://github.com/JayTam/antd-ms/commit/04117cf108ec5975eb994bb7ee1737219473619a))
- **ms-actions:** 新增 hidden 属性 ([54dbefd](https://github.com/JayTam/antd-ms/commit/54dbefd2b31c719d2d6fa2404592b7c95b179e8c))
- **ms-actions:** 样式根据规范调整 ([cd0d0e7](https://github.com/JayTam/antd-ms/commit/cd0d0e7d2e2b450c6213ccb5f16a585b9bd28b88))
- **ms-auto-complete:** 新增 AuoComplete 组件 ([32be6c3](https://github.com/JayTam/antd-ms/commit/32be6c3e7af2f1d438c82d063640d1e70ae69566))
- **ms-cascader:** 实现 enableFullValueInitializer，通过 initialValue 传入叶子节点的值解析出全路径的值 ([5a157f9](https://github.com/JayTam/antd-ms/commit/5a157f9e035d7a58bae124e120a403eb671a2883))
- **ms-cascader:** 实现 labelInValue，单选和多选都支持 ([6ad4469](https://github.com/JayTam/antd-ms/commit/6ad4469343f64da0e3e388f5f0c7a5644cdf3098))
- **ms-checkbox:** 新增 onChange 第二个参数，selectOptions 选中的可选项列表 ([37f8e75](https://github.com/JayTam/antd-ms/commit/37f8e75511023037fbd9ffe9b6817d9f59fe6f14))
- **ms-collapse:** 标题样式新增 block 类型 ([290953b](https://github.com/JayTam/antd-ms/commit/290953bf6f728605cf43ca5b8e6cb74d590be551))
- **ms-collapse:** 新增 noContentPadding 属性控制内容区域不要左右间距 ([2b646b9](https://github.com/JayTam/antd-ms/commit/2b646b99a689a7a8d25758b941e25a4242b53ae2))
- **ms-columns:** 完善 ms-columns 示例及相关配置属性 ([1756523](https://github.com/JayTam/antd-ms/commit/1756523b0e3f3bf688bbc2576ee792307d284c0d))
- **ms-columns:** 增加 ms-columns 组件，增加 ms-columns 组件相关初始化代码 ([ba841f7](https://github.com/JayTam/antd-ms/commit/ba841f720fe831d373217de245b20ecfcac7b141))
- **ms-columns:** columns 支持直接传入 reactNode 节点 ([9df24b5](https://github.com/JayTam/antd-ms/commit/9df24b538281ab8c12572b49743478cfd49a1e27))
- **ms-config-provider:** 新增 MsConfigProvider.useConfig 获取状态的方式 ([b8bd600](https://github.com/JayTam/antd-ms/commit/b8bd600eafcc402789b44d93c11cc353895db150))
- **ms-config-provider:** 支持通过 MsConfigProvider 全局修改资源接口版本号 ([36f2265](https://github.com/JayTam/antd-ms/commit/36f2265c691b680f18ed8c3437381aa2997479c1))
- **ms-copy:** 增加 ellipsis 实现超出一行时显示省略 ([3c8c6e6](https://github.com/JayTam/antd-ms/commit/3c8c6e664046ff40ecab630fb3911e2e2e7af0a4))
- **ms-date-range:** 支持通过 fieldProps.format 格式化只读模式 ([357a9bc](https://github.com/JayTam/antd-ms/commit/357a9bcece0760547f26be30e7b9ba6b52170d12))
- **ms-descriptions:** 实现缺省提示 emptyText 全局配置和 column.emptyText 字段配置 ([15cef56](https://github.com/JayTam/antd-ms/commit/15cef56245844d5a917b183b4e6104c4192c5a3f))
- **ms-devops-layout:** style change ([08f9346](https://github.com/JayTam/antd-ms/commit/08f9346b28a60a89163a8670d31c8eee49efd679))
- **ms-devops-layout:** add page layout, change the style of menu and breadcrumb ([bc90b09](https://github.com/JayTam/antd-ms/commit/bc90b09cb9bcd8a7833c615a645d98cfecf61077))
- **ms-devops-layout:** 增加 breadcrumbMatchMode 属性支持多种类型的面板屑匹配规则 ([c26ca5d](https://github.com/JayTam/antd-ms/commit/c26ca5d9a66e4416f463edc6eabc7ced49ed4663))
- **ms-devops-layout:** menu 自定义样式覆盖 ([0806ff0](https://github.com/JayTam/antd-ms/commit/0806ff037017dfa8afe5f55e7ffac7a3336c05b3))
- **ms-devops-layout:** 支持/path/\*的微前端路径匹配，修复 breadcrumb 不存在时不占据高度，优化样式 ([a2b9310](https://github.com/JayTam/antd-ms/commit/a2b93104d444503a841d3f8c644704dfddccdbee))
- **ms-devops-layout:** 暴露 menuTitle 组件，用户可以自定义标题区的操作 ([36d844e](https://github.com/JayTam/antd-ms/commit/36d844ed2809de2ebbd997d1f35cbe89775f5876))
- **ms-devops-layout:** 菜单 hover 样式优化 ([fc11790](https://github.com/JayTam/antd-ms/commit/fc11790329e1238a69fd276cc7b3637c29a80089))
- **ms-devops-layout:** 调整生成 key 的规则，增加组件测试 ([dfa1a75](https://github.com/JayTam/antd-ms/commit/dfa1a756d0342ace69a79ff2b7c8982a481c7f9c))
- **ms-devops-layout:** 调整 breadcrumb 参数配置 ([04932eb](https://github.com/JayTam/antd-ms/commit/04932eb9625c3876d5805f719db4391427ddd09a))
- **ms-devops-layout:** 调整 menu、breadcrumb 样式 ([21c0717](https://github.com/JayTam/antd-ms/commit/21c07179df6a6bf2834faa74e334543ec894bf18))
- **ms-devops-layout:** 调整 menu 的 icon 图标为 16px，增加 deleteEmptyRoutes 的配置 ([beb0c4f](https://github.com/JayTam/antd-ms/commit/beb0c4fa77cf4a1c16776837669e2e993093b236))
- **ms-devops-layout:** 调整 toolTip 功能的实现 ([8c5e594](https://github.com/JayTam/antd-ms/commit/8c5e59430e3e5649f88b118c40291bd842983871))
- **ms-devops-layout:** 根据设计审查优化样式及交互 ([bf89a73](https://github.com/JayTam/antd-ms/commit/bf89a73fe215effb40d2bebae9d6ec907a906e9d))
- **ms-devops-layout:** 根据新的设计调整导航的样式和交互 ([641806f](https://github.com/JayTam/antd-ms/commit/641806f1c5a4e4384c98b1fea8dd217c8c58c502))
- **ms-devops-layout:** 更新示例和一些入参 ([18fde12](https://github.com/JayTam/antd-ms/commit/18fde12ea196e78b8a1e600b7202ac3c16b5c13c))
- **ms-devops-layout:** 更新样式相关配置 ([b47b307](https://github.com/JayTam/antd-ms/commit/b47b30751ceae3deb88df9f10a750e47ab190b4e))
- **ms-devops-layout:** 更新 menu 相关样式 ([110625b](https://github.com/JayTam/antd-ms/commit/110625b6c4c8b77549c59e16dbff8b07d3fbbec9))
- **ms-devops-layout:** 去掉多级导航的 z-index ([a4be7d2](https://github.com/JayTam/antd-ms/commit/a4be7d293c0bdb348e6943b7df495f0e4a89c934))
- **ms-devops-layout:** 权限菜单支持没有子菜单没权限时递归删除父菜单 ([dc4e485](https://github.com/JayTam/antd-ms/commit/dc4e4856a0d33b4b0672073cb54e09921e269ae8))
- **ms-devops-layout:** 实现多菜单导航的逻辑 ([12dd475](https://github.com/JayTam/antd-ms/commit/12dd47598e3310493030122440f81a1c37c49af6))
- **ms-devops-layout:** 实现在 MsDevopsLayout 之下，MsForm fixed 定位能够根据导航栏宽度正确偏移 ([0bc3968](https://github.com/JayTam/antd-ms/commit/0bc39686e77cd8c511e73a97e542c71922cd3de4))
- **ms-devops-layout:** 使用 MsDevopsPage 时增加隐藏一级标题的能力，并根据设计规范默认提供 8px 的高度 ([6895c33](https://github.com/JayTam/antd-ms/commit/6895c33820a6ab97aa0c59a0596a481814e27a44))
- **ms-devops-layout:** 首次自动展开菜单 ([c1c8dc0](https://github.com/JayTam/antd-ms/commit/c1c8dc0df8362f36e9e45329d5d2024ead09fe8f))
- **ms-devops-layout:** 提升 ms-devops-breadcrumb 中 margin-bottom 的优先级 ([79f06af](https://github.com/JayTam/antd-ms/commit/79f06af59ce7eafd40f530f746810c409e297ea1))
- **ms-devops-layout:** 添加 demo 演示 ([71fd6f4](https://github.com/JayTam/antd-ms/commit/71fd6f406d996a77afaf677b8f8fb69a6d5d56c1))
- **ms-devops-layout:** 文档和传参优化 ([d8ef871](https://github.com/JayTam/antd-ms/commit/d8ef871051d620b8a4f832f64eabdb48d3210c86))
- **ms-devops-layout:** 新增面包屑 breadcrumbExtra、breadcrumbSuffixList 配置， 增加 title 自定义展示等 ([8fc92c3](https://github.com/JayTam/antd-ms/commit/8fc92c3dbda5278f8cf3093d295a6f53d7a8bc33))
- **ms-devops-layout:** 样式微调，增加展开和收起的提示 ([9c464a9](https://github.com/JayTam/antd-ms/commit/9c464a9cfc566ed475fee0f632ccf26bef437ce3))
- **ms-devops-layout:** 优化多导航在 automatch 模式下的匹配 ([9e11c94](https://github.com/JayTam/antd-ms/commit/9e11c94c6f5d676320d12468854c45188e652b10))
- **ms-devops-layout:** 优化自动选中和展开菜单的逻辑，优化样式覆盖 ([92715ed](https://github.com/JayTam/antd-ms/commit/92715ed95caeed652ecac78812a304caedb63415))
- **ms-devops-layout:** 优化 role 和 group 选择逻辑，更新测试快照 ([ea76366](https://github.com/JayTam/antd-ms/commit/ea7636666cb0a75d62f3334605e88a763a856bb5))
- **ms-devops-layout:** 增加菜单折叠选中颜色权重 ([c93ddb4](https://github.com/JayTam/antd-ms/commit/c93ddb43fc466cedb4e85507128c1a248fd344e3))
- **ms-devops-layout:** 增加面包屑 css 选择权重 ([af4a685](https://github.com/JayTam/antd-ms/commit/af4a6850f2346cbeeb24375f879640e7a37ba972))
- **ms-devops-layout:** 增加无权限时的回调函数及重定向页面参数 ([9f2e83f](https://github.com/JayTam/antd-ms/commit/9f2e83f1932aa77726eeafe63d65e513b18c0c16))
- **ms-devops-layout:** 增加自动分组的功能 ([70a890d](https://github.com/JayTam/antd-ms/commit/70a890de65ff227ca8cd43e3ef524a9605c88b00))
- **ms-devops-layout:** 增加自动路由匹配的逻辑 ([95f87c5](https://github.com/JayTam/antd-ms/commit/95f87c50fc5add5cf767af13ab05ace32d79898e))
- **ms-devops-layout:** 增加 bottomNode 配置，可以自定义菜单的底部组件 ([7223236](https://github.com/JayTam/antd-ms/commit/7223236d065a312c20d32f5aad040e08e833b144))
- **ms-devops-layout:** 增加 context 传递是否折叠、面包屑配置值等 ([b83b855](https://github.com/JayTam/antd-ms/commit/b83b855f443f55d6ab72be27fdbe9121211ca95f))
- **ms-devops-layout:** 增加 link 定义， 增加默认只展开一个菜单 ([05b66be](https://github.com/JayTam/antd-ms/commit/05b66be7ed8a0e7957892440a3b00b3a6406cf30))
- **ms-devops-layout:** 增加 menu openkeys 缓存， 修复自动匹配失败的问题 ([bb7988d](https://github.com/JayTam/antd-ms/commit/bb7988dadf185267d532bcb7b8b9e4db0efbf935))
- **ms-devops-layout:** 支持分组变化和 menu 展开事件的传递，优化微前端路由匹配规则 ([7c683d1](https://github.com/JayTam/antd-ms/commit/7c683d1fdaf7ec5e00cb02f7302623889fc74978))
- **ms-devops-layout:** 支持默认展开所有一级菜单或自定义层级的菜单 ([110a29f](https://github.com/JayTam/antd-ms/commit/110a29f11eb601e123e89a4c7eb9070fdffb50ea))
- **ms-devops-layout:** 支持微前端/\*的路由 path ([ff8d667](https://github.com/JayTam/antd-ms/commit/ff8d667f79a16575fc907fa83bfb51a87306f64b))
- **ms-devops-layout:** 支持预设的 menuTitle 及 menuLogo 样式 ([31783fa](https://github.com/JayTam/antd-ms/commit/31783facf72ba5bf90704069479201378cb457e7))
- **ms-devops-layout:** 支持只能展开或收起的路由配置，增加文档示例，更新测试代码 ([ffba062](https://github.com/JayTam/antd-ms/commit/ffba0629e240fb7bd1a7560ac1bfda2e65a53866))
- **ms-devops-layout:** 支持子路由都菜单隐藏时，子路由选中时默认选中主路由，修复路由 query 参数导致匹配失败的问题，完善面包屑的自动选中逻辑 ([3706f2b](https://github.com/JayTam/antd-ms/commit/3706f2ba585ffb63237199ba1035f12b18905203))
- **ms-devops-layout:** 支持 bottomDivider 配置，可以动态配置菜单的分割线 ([6eb7dff](https://github.com/JayTam/antd-ms/commit/6eb7dff9f2cb970099bef18f61f23bc3f5534ec3))
- **ms-devops-layout:** 支持 devopsPage 配置传参，可以实现配置生成 MsDevopsPage 布局 ([ca80faa](https://github.com/JayTam/antd-ms/commit/ca80faa27047efccf22bf806b023843f36a61347))
- **ms-devops-layout:** 支持 noBreadcrumb 属性，交给页面自定义面包屑 ([7004139](https://github.com/JayTam/antd-ms/commit/7004139d271bcde9f82a2dba73e28d20a93d807b))
- **ms-devops-layout:** 支持 noNavigate 配置，可以阻止默认跳转 ([74c7360](https://github.com/JayTam/antd-ms/commit/74c7360f4b2516d752965cb9e9d705350a775706))
- **ms-devops-layout:** 组件初始化 ([49d4f34](https://github.com/JayTam/antd-ms/commit/49d4f34c5442ee8eeed5e697589f241a984d98b6))
- **ms-devops-layout:** add roles auth ([faabe00](https://github.com/JayTam/antd-ms/commit/faabe008c47c5dbb96f17872935ed3815484648c))
- **ms-devops-layout:** add select, click event ([1ef0975](https://github.com/JayTam/antd-ms/commit/1ef09752cc415924867b5882c2815576daefcb43))
- **ms-devops-layout:** api 调整，breadcrumbSuffixList 改为 breadcrumbBeforeList ([2e4b380](https://github.com/JayTam/antd-ms/commit/2e4b38013e752d6c7ac729619030fef26a980ce7))
- **ms-devops-layout:** menu 样式个性化设置 ([01c5e5c](https://github.com/JayTam/antd-ms/commit/01c5e5c08cc6ca24d8ba709262ce96d63f7857bc))
- **ms-devops-layout:** menu 菜单支持 sub 二级菜单的样式设置 ([4cf639b](https://github.com/JayTam/antd-ms/commit/4cf639b8d6a7e0788b1cc4263b8792e9f6be819a))
- **ms-devops-layout:** menu 缓存调整自定义 key 的前缀 ([e0f9440](https://github.com/JayTam/antd-ms/commit/e0f9440ac0c46f36596367e620a5f4f996dcfc64))
- **ms-devops-layout:** menu 样式优化，修复 menu openkeys 的选中问题 ([65b561f](https://github.com/JayTam/antd-ms/commit/65b561f844a747e04edba7c33a802f5350d7f0f0))
- **ms-devops-layout:** menu 自定义的 popover 样式 ([4b1ccfe](https://github.com/JayTam/antd-ms/commit/4b1ccfe488904ecf47080d74825602cee0a198ca))
- **ms-devops-layout:** menu 子菜单样式优化，传递给 antd menu 时去除不必要的属性 ([aeceb44](https://github.com/JayTam/antd-ms/commit/aeceb44662ba307fa6a7b37b6cb77fd4ad6a0fdf))
- **ms-devops-layout:** ms-devops-layout 菜单是否折叠支持受控控制 ([a90ebf5](https://github.com/JayTam/antd-ms/commit/a90ebf5f98f2d173e3807c2c0652d0546e28583f))
- **ms-devops-layout:** MsDevopsPage 中 showBack 使用默认值 ([f4a6c3d](https://github.com/JayTam/antd-ms/commit/f4a6c3d416c4f8c7980b909a2857b70d1f689d3d))
- **ms-devops-layout:** routeItem 支持配置 toolTip 属性，用于标题过长时显示，特别设置 menu 收起时，tooltip 不设置 ([4bed68a](https://github.com/JayTam/antd-ms/commit/4bed68ac07971cb89601eca68b384fe82ccc5ab7))
- **ms-devops-layout:** routePath 的生成规则和面包屑生成规则保持一致，同时支持 path 和 routes 两种方式 ([3e49067](https://github.com/JayTam/antd-ms/commit/3e490675d3e13a0f3379755c41f477f786546df8))
- **ms-devops-layout:** title 支持收缩时的不同展示，优化菜单的选中效果 ([cd175db](https://github.com/JayTam/antd-ms/commit/cd175db0210a45ae71fb1a2b549d0dc0a7a2043b))
- **ms-devops-layout:** update layout function ([5f550e5](https://github.com/JayTam/antd-ms/commit/5f550e54c65cf2addac0dec0422bfcb72f5eb857))
- **ms-devops-page:** 增加 extra 属性，支持自定义渲染操作区 ([9f284d8](https://github.com/JayTam/antd-ms/commit/9f284d862c4d1b19dd49bc4a781fecf84cbcf9d3))
- **ms-devops-page:** 添加 MsDevopsPage 组件及相关文档 ([66a1491](https://github.com/JayTam/antd-ms/commit/66a1491b5fb47bab9ca259d998bb08d2b2109475))
- **ms-devops-page:** 增加 container 的类名传参 ([3c621dd](https://github.com/JayTam/antd-ms/commit/3c621dd9985cf1408d42f0cd6575d23667ba1abf))
- **ms-devops-page:** 增加 noHideTitlePadding 选项，当隐藏标题时可以控制是否展示 padding ([f839c79](https://github.com/JayTam/antd-ms/commit/f839c79e1fd68ba8500688053cee5f719e093c64))
- **ms-digit:** 当范围 min, max 动态变化时，如果 value 超过范围自动重置到最接近的边界 ([c936c86](https://github.com/JayTam/antd-ms/commit/c936c863bd1422f1035d027c0fa7ad07953378ef))
- **ms-digit:** 输入框文字居中样式优化 ([ec04319](https://github.com/JayTam/antd-ms/commit/ec04319df78eba5758fab110251108db1bee74b3))
- **ms-doc-tips:** 接口调试和样式优化 ([1294175](https://github.com/JayTam/antd-ms/commit/12941758fefdb3e7865f4dd5419fd99ff207834d))
- **ms-doc-tips:** 属性查找添加元素冒泡 ([198ca5e](https://github.com/JayTam/antd-ms/commit/198ca5eaf14a7b971f626fb63430b0a89e64dcca))
- **ms-doc-tips:** 新增 type 类型 text，页面渲染帮助中心文档 ([f130a17](https://github.com/JayTam/antd-ms/commit/f130a177681ef0fbfa0a1b6cb9c1bde694124ba9))
- **ms-doc-tips:** 新增 type 类型 text，直接渲染页面文本 ([35594f9](https://github.com/JayTam/antd-ms/commit/35594f90fb58fc0b3406e827d3ff58a9227a40f7))
- **ms-doc-tips:** 添加 MsDocTips 组件 ([97a5f5a](https://github.com/JayTam/antd-ms/commit/97a5f5a006a5a361f7c6f630f725bbdccb8ef9a7))
- **ms-drawer:** 按设计要求将确认按钮方向改成靠左 ([b52da9f](https://github.com/JayTam/antd-ms/commit/b52da9f82d1cae06ae810bd5b9ab5c5bb53f2cfe))
- **ms-drawer:** 实现递归抽屉打开方式 ([651edde](https://github.com/JayTam/antd-ms/commit/651edde76fa8411b92e1f3df00c29ed84ec21d0f))
- **ms-drawer:** 增加抽屉分栏组件 ([5f59f95](https://github.com/JayTam/antd-ms/commit/5f59f95785bb85b71c6842cfe8401a9b5d4bf6b1))
- **ms-dropdown:** 初始化组件 ([57a3a37](https://github.com/JayTam/antd-ms/commit/57a3a37899ac4b03c723377237f2b2226810db24))
- **ms-dropdown:** 基本样式展示 ([186b75c](https://github.com/JayTam/antd-ms/commit/186b75ca69b762a1d1bdb3588ca16047416e3da0))
- **ms-dropdown:** 取消预设 getPopupContainer 传参 ([183a3df](https://github.com/JayTam/antd-ms/commit/183a3dfb53de7af828a2df74c396b2d701d7def0))
- **ms-dropdown:** 完整的样式优化 ([ba7c732](https://github.com/JayTam/antd-ms/commit/ba7c73210959218921635d955c8a3330095d9c43))
- **ms-dropdown:** 支持二次确认功能 ([ece7c86](https://github.com/JayTam/antd-ms/commit/ece7c86adb9af5b18ed20bdb38f677236a8bf6fb))
- **ms-dropdown:** 支持 MsDropdown.Button ([9d08d41](https://github.com/JayTam/antd-ms/commit/9d08d4142a2fe9f87b33518b6501493e97c4828c))
- **ms-dropdown:** arrow 支持自定义样式，支持 buttonType 的设置为 primary ([f371284](https://github.com/JayTam/antd-ms/commit/f371284664dac1cc8573ace0cd0ec8b8cb7a31c1))
- **ms-field:** 点击编辑下样式优化 ([1fbd117](https://github.com/JayTam/antd-ms/commit/1fbd117847f757592d002dc3d2cc40950208e574))
- **ms-field:** 更新 text 和 textarea ([6f5677d](https://github.com/JayTam/antd-ms/commit/6f5677d3cd7757ce0c7a063dd8ea608f82c582bd))
- **ms-field:** 聚焦请求 column.focusRequest 变更为完全由聚焦触发请求，其他控制请求触发手段失效 ([6a44ce4](https://github.com/JayTam/antd-ms/commit/6a44ce49ced9240cb4e823c871f137c454022431))
- **ms-field:** 去除单个 filed 的 memo，seFieldModeContext 增加 props ([585bc56](https://github.com/JayTam/antd-ms/commit/585bc56d3ba231016030f5cbaf03d916d2535013))
- **ms-field:** 增加通用属性 preStyle 和 suffixStyle，用于配置 field 之前或者之后的渲染节点样式 ([3983000](https://github.com/JayTam/antd-ms/commit/39830006242a224cc070ea45cefa63105652b3a2))
- **ms-field:** 增加 clickEdit 点击编辑模式 ([e7925dd](https://github.com/JayTam/antd-ms/commit/e7925dd9754926ae55a62f2e5c6b47793af95339))
- **ms-field:** 针对一些字段组件，默认不开启只读模式省略 ([198bb0a](https://github.com/JayTam/antd-ms/commit/198bb0a42d0e1432e6bce479a930363f862ebc89))
- **ms-field:** 支持只读模式 ([0455e3a](https://github.com/JayTam/antd-ms/commit/0455e3a2ebda34256983c4ae6b6d041008d3ba1d))
- **ms-field:** 支持 initialLeafValue 传参，在有 option 的条件下可以根据叶子节点值获取完整值路径 ([95ae6e9](https://github.com/JayTam/antd-ms/commit/95ae6e93488468674cc4a1897295e49f1421061d))
- **ms-field:** codeEditor, diffEditor, partUpload, richText 较大的字段组件按需引入优化 ([599f28a](https://github.com/JayTam/antd-ms/commit/599f28a6960753164c62549eac3e1e24f58ba0c5))
- **ms-field:** initialLeafValue 处理时，增加 multiple 的判断 ([88a5481](https://github.com/JayTam/antd-ms/commit/88a5481b7e18a9f2fefc0052fa70447716c13cfe))
- **ms-field:** input 和 select 点击编辑模式下，编辑和只读切换时消除样式抖动 ([e73ae38](https://github.com/JayTam/antd-ms/commit/e73ae38c88ce6525abb6a352245b8e2f693a69fe))
- **ms-filed:** 点击编辑表单支持 select 和 text 两种模式 ([392283a](https://github.com/JayTam/antd-ms/commit/392283a9ad75185de121e4bec698a31c32c4a7d5))
- **ms-form-list:** 列表支持设置 dependencies 和 shouldUpdate 动态监听 ([e6d0788](https://github.com/JayTam/antd-ms/commit/e6d07880ab69dc127d8011ac371aa36bfbb9ec96))
- **ms-form-list:** 新增 addButtonPosition 可控制新增按钮位置 ([b4fd46c](https://github.com/JayTam/antd-ms/commit/b4fd46c3a597888b8797f6ae621974cdf330e224))
- **ms-form-list:** 新增 delPopconfirmProps 可配置删除提示 ([4e7e091](https://github.com/JayTam/antd-ms/commit/4e7e09176c0dbb2945defbc5e24dfa07d117cc93))
- **ms-form-table:** 编辑状态下优化 usepopover 的渲染 ([34d3bc0](https://github.com/JayTam/antd-ms/commit/34d3bc08e7accd58bacc8062c353578ec212a6e4))
- **ms-form-table:** 抛出 onMove 事件，readOnly 模式下优化标签样式 ([45a6e61](https://github.com/JayTam/antd-ms/commit/45a6e61c283950e843250adb834effed16f1fb77))
- **ms-form-table:** 新增 addButtonPosition 可控制新增按钮位置 ([bd7ab5a](https://github.com/JayTam/antd-ms/commit/bd7ab5ac63b28cc2b4c39d2cb6939cb2f74b80fc))
- **ms-form-table:** 支持自定义传入 onCell 方法 ([b9f01e5](https://github.com/JayTam/antd-ms/commit/b9f01e50c5ea0a204fd0b17119e67a28caba06d4))
- **ms-form-table:** user-popover 点击编辑模式下适配 ([a42c768](https://github.com/JayTam/antd-ms/commit/a42c7682985a4d3a4238676c3cc7ea408d385352))
- **ms-form-table:** userPopover 适配 formTable 组件 ([29f6b16](https://github.com/JayTam/antd-ms/commit/29f6b169a88943f52ed365ee75cd35e936f4fa91))
- **ms-form:** 按设计规范，抽屉表单确认按钮靠左 ([190e9d6](https://github.com/JayTam/antd-ms/commit/190e9d6d13106ff55c57cb2cde6b4cf0f2525db5))
- **ms-form:** 初步实现聚合筛选表单 ([9c04105](https://github.com/JayTam/antd-ms/commit/9c0410553fcdb3b804d2a50af45817f3345eb0be))
- **ms-form:** 完成聚合筛选器表单开发 ([a7b6f0b](https://github.com/JayTam/antd-ms/commit/a7b6f0bd7fb8908d652d7503b13cc04d9b65915d))
- **ms-form:** 重要特性，枚举缓存由值缓存升级为 promise 缓存 ([a5429cc](https://github.com/JayTam/antd-ms/commit/a5429cc4f77864c6e1ea5f8c91e067e2d7d91711))
- **ms-group:** 新增 noContentPadding 属性控制内容区域不要左右间距 ([42ee57f](https://github.com/JayTam/antd-ms/commit/42ee57fec69dda8397d615730b9e88725cc78355))
- **ms-group:** 新增分组容器类型，满足新版 UI 要求 ([be1e46c](https://github.com/JayTam/antd-ms/commit/be1e46cf5aebff11a251ae47d135e72e9ac3e1de))
- **ms-iconfont:** add devops iconfont ([88d093b](https://github.com/JayTam/antd-ms/commit/88d093b62b0c6dcc7dce2174a719a7ef32c4af3b))
- **ms-icons:** 新增 MsIcons 组件 ([ce9698c](https://github.com/JayTam/antd-ms/commit/ce9698ca4966921067a503054ae1d5e797c48e22))
- **ms-ip:** 新增 cidrPrefixSelectProps 控制 cidr 选择器，去掉 cidrType 改用 cidrPrefixRange 来开启 cidr 模式 ([e21fdb2](https://github.com/JayTam/antd-ms/commit/e21fdb22324a6b0f953e03ee2064b331c714c430))
- **ms-ip:** 新增 MsIp 字段组件，目前支持 ipv4 及 cidr 格式的输入 ([cbcae62](https://github.com/JayTam/antd-ms/commit/cbcae620e2641dc2e3c7b31c9bfa265d5b29820c))
- **ms-ip:** 支持 cidrType=ip，不限制输入范围 ([20faf11](https://github.com/JayTam/antd-ms/commit/20faf11038afe66ce3a7339307b1df2ac755ee41))
- **ms-modal:** 实现 removeOnPopstate 在触发 popState 事件可控制不销毁组件 ([146c769](https://github.com/JayTam/antd-ms/commit/146c769074c432f5e404b57c618ba41fa26e9cd7))
- **ms-modal:** 实现递归弹窗打开方式 ([c289029](https://github.com/JayTam/antd-ms/commit/c289029a3473c4947252843a4a83c945557abc9b))
- **ms-modal:** 两栏布局弹窗样式优化 ([9473477](https://github.com/JayTam/antd-ms/commit/947347761b2ecda5f951c89ffa477fa80772a801))
- **ms-modal:** 两栏布局弹窗约束宽度可以传入 number 和像素以及百分比 ([c01ebf1](https://github.com/JayTam/antd-ms/commit/c01ebf175ff668505e971bb6875cf66a9bee6a4d))
- **ms-modal:** 左右两栏弹窗 ([6c9ad0a](https://github.com/JayTam/antd-ms/commit/6c9ad0a29458d2ea9a0d5736f6a5d6a2c2c045c3))
- **ms-page:** 增加 empty 配置显示缺省图 ([48df0ce](https://github.com/JayTam/antd-ms/commit/48df0cedc838b7ab2957f2825006e48970895980))
- **ms-page:** titleType block 样式修改 ([1a8d087](https://github.com/JayTam/antd-ms/commit/1a8d08720b69c48031354d9a722709f85d5b95ba))
- **ms-preset-resource-tags:** 标签筛选实现重置功能 ([22b1276](https://github.com/JayTam/antd-ms/commit/22b1276d9f44befb8481538ad2b8a19bc1330335))
- **ms-preset-resource-tags:** 基本完成标签筛选功能 ([e8cdd1b](https://github.com/JayTam/antd-ms/commit/e8cdd1b8b6441fa594e157aab3caa546294a6499))
- **ms-preset-resource-tags:** 实现在列表中展示标签 ([fdf3e84](https://github.com/JayTam/antd-ms/commit/fdf3e84f6fee7d6de77f86dd48b441f4f7ce1449))
- **ms-preset-resource-tags:** 完成预置标签在表格中的展示和编辑 ([6f4fdc7](https://github.com/JayTam/antd-ms/commit/6f4fdc7661bffea458625c87cf2d829efed8a429))
- **ms-preset-resource-tags:** 完成资源标签筛选功能 ([0e39c16](https://github.com/JayTam/antd-ms/commit/0e39c1685107685ef01bc913cc50df5dd52ac652))
- **ms-preset-resource-tags:** 预置标签添加 tooltip 提示 ([652178b](https://github.com/JayTam/antd-ms/commit/652178b50c8c8ebe7d76cc1e4e35971ebc35e719))
- **ms-preset-resource-tags:** 自定义标签限制最多 20 个 ([6facada](https://github.com/JayTam/antd-ms/commit/6facada54a473a22a7354a618e35ce14ebc01164))
- **ms-preset-resource-tags:** 预置标签筛选添加条件选择 ([1ae4d76](https://github.com/JayTam/antd-ms/commit/1ae4d76e1dffef8e6cd0a48e58a8f0c4cde3492f))
- **ms-preset-resource-tags:** 预置标签展示优化成 Tag 样式展示 ([c1c6f07](https://github.com/JayTam/antd-ms/commit/c1c6f075acdb05583e8ba2aa34a3175c39e49271))
- **ms-preset-resource-tags:** 预置标签组件在表格中，新增 popoverProps 参数可控制气泡弹窗位置 ([579e9eb](https://github.com/JayTam/antd-ms/commit/579e9ebed08eb19794e08023b034fe5e39700442))
- **ms-preset-resource-tags:** 实现标签筛选交互 ([2f871aa](https://github.com/JayTam/antd-ms/commit/2f871aa8499944ed64ef56bcfc57d7f4ef8982b0))
- **ms-preset-resource-tags:** 新增预置标签组件 ([88aedfe](https://github.com/JayTam/antd-ms/commit/88aedfe9b885bc7635b18d54bb0fce02f1323153))
- **ms-radio:** 新增 onChange 第二个参数，选中的 option ([2126ea0](https://github.com/JayTam/antd-ms/commit/2126ea05ddb0f4a4afd5410d6f090143a5229703))
- **ms-radio:** onChange 事件参数由 event 改成 value ([8506fe9](https://github.com/JayTam/antd-ms/commit/8506fe93f842ee8c77ebb023c686be348df2986d))
- **ms-resizable:** 新增 MsResizable ([4410bdb](https://github.com/JayTam/antd-ms/commit/4410bdbdbc76197c72c0ed8ea0018bd332ad5870))
- **ms-request:** 取消请求函数添加延时特性 ([59a1561](https://github.com/JayTam/antd-ms/commit/59a1561e498e5dd0fb6517898805ffb8f0da9511))
- **ms-resource-tags:** 实现根据 vpc 资源编码动态更新 CreateFormListField ([481c701](https://github.com/JayTam/antd-ms/commit/481c701c1fbacaa9d666cb7c33e5566f194ebc20))
- **ms-resource-tags:** 优化 CreateFormListField 更新时，能保持预置标签的选中项 ([66e24d9](https://github.com/JayTam/antd-ms/commit/66e24d9d01be358cea4718835a27e624c61d4fc8))
- **ms-resource-tags:** 优化 CreateFormListField 提交参数，将 key, value 变更为 tagKey, tagValue 与后端 sdk 统一 ([dd6080e](https://github.com/JayTam/antd-ms/commit/dd6080e911774b30f322a432bf9380487698bee1))
- **ms-resource-tags:** 优化 vpc 继承标签值样式，默认 disabled 样式看不清文字 ([2602666](https://github.com/JayTam/antd-ms/commit/2602666745ac6e78163b1cb36d7d2e441014c790))
- **ms-resource-tags:** createFormListField 提交字段格式满足后端要求，新增 disableTags 禁用自定义标签 ([bc1f3c4](https://github.com/JayTam/antd-ms/commit/bc1f3c4eb1949addf5bdede3901c15ea7a45809e))
- **ms-resource-tags:** 资源标签接口换成 v2 版本 ([f981c97](https://github.com/JayTam/antd-ms/commit/f981c97d72972dd3f8f9b0a784087e04b6659005))
- **ms-resource-tags:** 新增标签在创建页拦截的 field 组件 ([c9088e2](https://github.com/JayTam/antd-ms/commit/c9088e2ee150ef5855bcf2870f90c53db89b3a60))
- **ms-resource-tags:** 资源合并接口支持配置 v2 版 ([9e5100c](https://github.com/JayTam/antd-ms/commit/9e5100c7dff8f02bad275edad6e47ef9997cd52c))
- **ms-resource-type:** 支持自定义配置 request，不使用组件库内置的 ([7e88c9d](https://github.com/JayTam/antd-ms/commit/7e88c9d9cf7cdb5868c996f557c7d1fe6b154a57))
- **ms-resource-type:** 新增资源标签选择组件 ([872966c](https://github.com/JayTam/antd-ms/commit/872966c472ff8a3f38955749cb74a354c192d312))
- **ms-rows:** 调整 ms-columns 为 ms-rows ([857a247](https://github.com/JayTam/antd-ms/commit/857a2475064d1dd8df74ddeb6644fb4405fe2934))
- **ms-rows:** 增加 tooltip 相关配置，更新文档及测试代码 ([ab57af7](https://github.com/JayTam/antd-ms/commit/ab57af796766ce0b1a4617a536c15315be830996))
- **ms-search:** 暴露 searchValues 当前筛选状态 ([99e0215](https://github.com/JayTam/antd-ms/commit/99e0215e7b4e1fd3aef609f302462afe4b7edfd9))
- **ms-sortable:** 提供传感器和修饰器的自定义配置 ([d3b740f](https://github.com/JayTam/antd-ms/commit/d3b740f4d49d9e5eb25371e5964fbaf436a4d605))
- **ms-sortable:** 添加 disabled 属性禁用整个列表拖动;完善 onClickTopp 参数 ([be11456](https://github.com/JayTam/antd-ms/commit/be114564a65601dbc9975f6886a64875bffcdc51))
- **ms-sortable:** 拖动元素置于顶层 ([d33d987](https://github.com/JayTam/antd-ms/commit/d33d9876a130b99705ca8022743118394327eafe))
- **ms-sortable:** 增加拖动事件、传感器设置拖动大于 5px 才触发 ([fcea2c4](https://github.com/JayTam/antd-ms/commit/fcea2c4300fd8ee306bdba8b472bdf38c9c64ae4))
- **ms-sortable:** 增加 sortable 拖动排序组件 ([8817084](https://github.com/JayTam/antd-ms/commit/8817084b3d85aa4468761928964e51c8738e2fee))
- **ms-sortable:** hover 时展示置顶图标 ([e21dfa3](https://github.com/JayTam/antd-ms/commit/e21dfa3496b1c1464764bda64a8ce2bea7ac4f7d))
- **ms-sortable:** MsSortable 组件增加置顶功能 ([b454b7d](https://github.com/JayTam/antd-ms/commit/b454b7d968b6a74c0a13226ffa53db883f5ac68d))
- **ms-status:** 增加 ms-status-tag 的 css 权重 ([816b06c](https://github.com/JayTam/antd-ms/commit/816b06cedec27ff6b405f6cc9ad6bc76de8b756d))
- **ms-svg:** 脚本重新生成 icons ([241cbf6](https://github.com/JayTam/antd-ms/commit/241cbf6517fb5c8e38aa4c875696e043a1edd840))
- **ms-switch:** 只读模式采用文字展示方式 ([dbd0ad7](https://github.com/JayTam/antd-ms/commit/dbd0ad7b3bf04f632dd3884ee194f4677d42f585))
- **ms-table:** 编辑表格 addRow 返回新增行 id ([f7ff48a](https://github.com/JayTam/antd-ms/commit/f7ff48af8ea555dc29c2ece07e248ed8e5261910))
- **ms-table:** 编辑表格 editable.actionRef.save 支持异步等待表格 reload ([dda83c9](https://github.com/JayTam/antd-ms/commit/dda83c98d3cb875779b7c7b71e754b4092bfaa89))
- **ms-table:** 编辑表格 onSave 新增 index 参数 ([9200994](https://github.com/JayTam/antd-ms/commit/9200994d7218e32fe3225358bc0d9d0cad86f917))
- **ms-table:** 编辑表格，editable.actionRef.save 支持异步，addRow 支持默认值 ([09898cc](https://github.com/JayTam/antd-ms/commit/09898ccac898472382837b815fe7ab85d0c91e8e))
- **ms-table:** 编辑表格新增 editableActionRef.cancel 取消编辑状态 ([3f222be](https://github.com/JayTam/antd-ms/commit/3f222be946c774e5877a96e0dd6417e82920e066))
- **ms-table:** 编辑表格新增 eidtable.onCancel 事件 ([7f9c402](https://github.com/JayTam/antd-ms/commit/7f9c402dbb5518cc1133eff92c2cfe1b5afb80e0))
- **ms-table:** 编辑表格在编辑状态不能搜索并提示，编辑表格暴露是否正在编辑状态 ([019587c](https://github.com/JayTam/antd-ms/commit/019587c2390ebf6e93885965b4871057ef721b8b))
- **ms-table:** 编辑表格 onCancel 事件添加 record 参数 ([324ec54](https://github.com/JayTam/antd-ms/commit/324ec54a56fa2629259c1965f0cead3a415f3dd7))
- **ms-table:** 编辑表格 onSave 时间新增 type 标识新增还是编辑操作 ([85c4f2d](https://github.com/JayTam/antd-ms/commit/85c4f2d63a5e5e11597e0390e5fad7da12a9f066))
- **ms-table:** 编辑模式支持重写 onRow 以及 components ([81a93e7](https://github.com/JayTam/antd-ms/commit/81a93e7cf329a90d09a666d12f0973312f55d186))
- **ms-table:** 编辑状态下，禁止触发筛选 ([b14e5b4](https://github.com/JayTam/antd-ms/commit/b14e5b4b77631cb3b615a2902d036f3dc86c73f8))
- **ms-table:** 表格列设置交互升级 ([7bf3e6e](https://github.com/JayTam/antd-ms/commit/7bf3e6e5dbcbc08722e9cf36d878e2bb68e1a077))
- **ms-table:** 表格列设置新版初步实现 ([b47a058](https://github.com/JayTam/antd-ms/commit/b47a0587cc3920b7c724bc1ebe5dafd79721b951))
- **ms-table:** 表格选择功能，在筛选、重置、清空、表头筛选和排序的情况下都会清空选中项 ([cb325c7](https://github.com/JayTam/antd-ms/commit/cb325c79e58e7f232a7ac23ff09fd673bc3bb4fc))
- **ms-table:** 初步实现 query-filter 筛选类型 ([d48cf0d](https://github.com/JayTam/antd-ms/commit/d48cf0d55db02feca63618471db271d61cc74955))
- **ms-table:** 初步实现列设置 UI 改版 ([60f40ac](https://github.com/JayTam/antd-ms/commit/60f40ac1c282b92cead5e968aefb2ca6e9364bff))
- **ms-table:** 废弃 actionRef.refresh 方法，改用 reload 或 reloadAndReset ([3300e7c](https://github.com/JayTam/antd-ms/commit/3300e7c7deaa80bd0c2f4daa48aeeb155062b9de))
- **ms-table:** 聚合筛选器集成标签筛选 ([4feb74e](https://github.com/JayTam/antd-ms/commit/4feb74edb0cddf8140faa547b459b2afbb99d93a))
- **ms-table:** 列设置类型为 tag 时，默认追加到指定列之后 ([b3a99a0](https://github.com/JayTam/antd-ms/commit/b3a99a0aaa6e851437ccc7a6567f5a00e565d6e5))
- **ms-table:** 列设置实现 disable 禁用操作 ([fab3060](https://github.com/JayTam/antd-ms/commit/fab30600628cf4a16822b5b745d090c9190f5525))
- **ms-table:** 列设置搜索功能，搜索忽略大小写限制，均可搜索 ([f7daa9b](https://github.com/JayTam/antd-ms/commit/f7daa9ba61651cb1d908b30a5bda2f20cd144109))
- **ms-table:** 列设置新增 value, onChange, defaultValue 属性，可对列设置状态受控 ([0794270](https://github.com/JayTam/antd-ms/commit/079427004a36ce8d6d7b7667f9fb9fa05e681396))
- **ms-table:** 列设置支持分组，分组排序 ([2bc418a](https://github.com/JayTam/antd-ms/commit/2bc418ad674c5228a46adbc36d1cd5b1907ecee7))
- **ms-table:** 列设置支持筛选可选字段 ([b5927f9](https://github.com/JayTam/antd-ms/commit/b5927f98e418ee6120451a42d959dcec2a4fd9fe))
- **ms-table:** 默认表头筛选不开启搜索 ([9f049a0](https://github.com/JayTam/antd-ms/commit/9f049a073e535c72d1b1e76801d27b9a893372f5))
- **ms-table:** 筛选标签必填无法清空 ([1b94dba](https://github.com/JayTam/antd-ms/commit/1b94dba9555f95486418669908d8be0d473805e9))
- **ms-table:** 筛选标签多选项用中文逗号分割 ([360f3c6](https://github.com/JayTam/antd-ms/commit/360f3c649734bc1c20ad0007bced259a5fe9384a))
- **ms-table:** 筛选标签展示对于 cascader 优化 ([29c829b](https://github.com/JayTam/antd-ms/commit/29c829bfd908f8af2d43a2934c35ed5157b5f592))
- **ms-table:** 筛选标签支持联动清除 ([e3058ac](https://github.com/JayTam/antd-ms/commit/e3058acd6d98104249de50f1ab92d37960ca6f45))
- **ms-table:** 实现 column.search 和 column.filters 可以同时打开 ([f41ad98](https://github.com/JayTam/antd-ms/commit/f41ad980c0dc40c9331fe6596fcbf46dab15ff75))
- **ms-table:** 实现 menuRender, creatorRender, filteredViewRender, footerRender 动态渲染 ([934c661](https://github.com/JayTam/antd-ms/commit/934c6613e44d4af47e7924c07f96ebd728a9c345))
- **ms-table:** 实现 query-filter 类型的 search.showClearBtn 清空按钮，其他类型暂未实现 ([a950d6f](https://github.com/JayTam/antd-ms/commit/a950d6f3d72aea56a562bc01334ff325029a3029))
- **ms-table:** 实现表头分组 ([3626189](https://github.com/JayTam/antd-ms/commit/362618939f9b28e38d9efeb25318b56844452181))
- **ms-table:** 实现可配置 column.mergeInputWhenQuery 合并输入框 ([cef974e](https://github.com/JayTam/antd-ms/commit/cef974e09033fcbaf3f9ff3549866dd0d1172fdb))
- **ms-table:** 同时兼容 beforeSearchSubmit 和 search.transform ([3a55960](https://github.com/JayTam/antd-ms/commit/3a55960c6adab40ebdc25f2f1905cdc2c53c2e80))
- **ms-table:** 完成 query-filter 筛选类型开发 ([9e12d87](https://github.com/JayTam/antd-ms/commit/9e12d871dc009d5f10ac79dc3260cdfa94d8946b))
- **ms-table:** 完成聚合筛选表单集成到 MsTable 中 ([e9ba7a6](https://github.com/JayTam/antd-ms/commit/e9ba7a60855f6af9f194223780601515e6f4ab20))
- **ms-table:** 完善分组列拖动排序 ([7f8e11b](https://github.com/JayTam/antd-ms/commit/7f8e11b97f4cb9665c91e23b10b86e08299ed340))
- **ms-table:** 新增 actionRef.getDataSource ([b2923d4](https://github.com/JayTam/antd-ms/commit/b2923d412eef2b35e69e470db0271a2849afe982))
- **ms-table:** 新增 column.columnSet.disableHidden 禁止列设置隐藏 ([fcc3fa7](https://github.com/JayTam/antd-ms/commit/fcc3fa73e1041cf6f220939cfd11e6fe731c12c1))
- **ms-table:** 新增 column.ignoreDependenciesOnChange ([fa7f524](https://github.com/JayTam/antd-ms/commit/fa7f524da558028ebbd03ef4da9744ec4515a6b0))
- **ms-table:** 新增 column.submitInQueryWhenChange 用于控制 query 区域的筛选项，是否在 onChange 触发表格查询 ([6530065](https://github.com/JayTam/antd-ms/commit/65300656e483e3e0a8278c09bd539314fdc8e8bd))
- **ms-table:** 新增 editable.actionRef.save 主动保存行编辑 ([ef55c32](https://github.com/JayTam/antd-ms/commit/ef55c3250987a63221e7271bafc075fe4962733b))
- **ms-table:** 新增 onClear 事件 ([2e39319](https://github.com/JayTam/antd-ms/commit/2e393190bf34659ab956e2c8e1d68eb9b17d08d8))
- **ms-table:** 新增 rowSelection.clearSelectionOnSearch 控制当搜索，刷新，排序和清空时，自动清空选中项 ([e55d70e](https://github.com/JayTam/antd-ms/commit/e55d70e06d37aa6354c1e2799c4693d10d22c000))
- **ms-table:** 新增 search.extraRender 自定义扩展节点 ([421fcf5](https://github.com/JayTam/antd-ms/commit/421fcf51ccc3c87623b4c91536a6e5ed09651a64))
- **ms-table:** 新增 search.showNumberInQueryFilter 配置 query-filter 筛选区域显示数量 ([db3e8ef](https://github.com/JayTam/antd-ms/commit/db3e8ef0d58d01e1285581406f8941668509f383))
- **ms-table:** 新增列设置控制类型 tag ([e28ddb6](https://github.com/JayTam/antd-ms/commit/e28ddb60c0cd49b313de63244aeb5c9ae1a88ba6))
- **ms-table:** 新增一种表格的批量操作模式 ([64ddd6e](https://github.com/JayTam/antd-ms/commit/64ddd6e295015c0633ed79efb1558797c84428d1))
- **ms-table:** 新增 aggr 的默认 placeholder ([bfb4dff](https://github.com/JayTam/antd-ms/commit/bfb4dff54511c8b99a4f770469356b2a97b28d78))
- **ms-table:** 新增 column.showInQuery 代替 showInQueryWhenFilter ([66c1a70](https://github.com/JayTam/antd-ms/commit/66c1a707f88bf6550d739ffd8c4d5fe50da92e25))
- **ms-table:** 新增 expandable.loadChildrenData 支持树形数据异步加载 ([c680735](https://github.com/JayTam/antd-ms/commit/c680735fb216b51bee536bb1e3caf058d22bcea1))
- **ms-table:** 新增 MsTable.useEidtableRow，便于子表格编辑开发 ([9578118](https://github.com/JayTam/antd-ms/commit/9578118d5e0b5333b88ebd02cf02bf6be673f83f))
- **ms-table:** 行编辑功能基本实现 ([162b978](https://github.com/JayTam/antd-ms/commit/162b9781864bb50c3790cb09c50244d57be5bd9b))
- **ms-table:** 优化编辑表格中，选择器打开相对于表格元素，避免可视区域只有 cell 部分 ([8536377](https://github.com/JayTam/antd-ms/commit/853637729dcba1a7788a453705399a5e498e5a62))
- **ms-table:** 优化 aggr，去掉选择下拉选择 icon ([b8033ca](https://github.com/JayTam/antd-ms/commit/b8033caeac8369a4b16805d195409c2683d04d37))
- **ms-table:** 在布局组件上下文中，MsTable 直接配置 sticky=true，不会出现双滚动条 ([015ff1b](https://github.com/JayTam/antd-ms/commit/015ff1b98a14d1fc96c989f19a4e46f44236cbd4))
- **ms-table:** 支持 borderedHead ([eb26cd1](https://github.com/JayTam/antd-ms/commit/eb26cd165215f149e4e8dff9ee79ce1ec5eee90e))
- **ms-table:** 支持 filterType 所有类型，column.search 和 column.filters 可单独使用，不再互斥 ([3219d4f](https://github.com/JayTam/antd-ms/commit/3219d4f9f038a181becaebe94951ec88c760642f))
- **ms-table:** 支持编辑和非编辑状态下可配置操作列 ([78aaa4d](https://github.com/JayTam/antd-ms/commit/78aaa4d9604e0d45da077ba23acda2af109f4eef))
- **ms-table:** 支持一个筛选项在聚合筛选器和表头筛选器同时出现，并且状态保持同步 ([db63ad2](https://github.com/JayTam/antd-ms/commit/db63ad2e779cadb17cee18b5533cf785b1e5c2c4))
- **ms-table:** 资源标签在筛选标签的交互 ([a8e6b4b](https://github.com/JayTam/antd-ms/commit/a8e6b4b9b55d2e6cd58755e0362f7490445f7c56))
- **ms-table:** aggr 忽略 scroll.y=auto-content 自适应高度 ([63dadf2](https://github.com/JayTam/antd-ms/commit/63dadf23554f85a28cd4d48afc796a332ecff1de))
- **ms-table:** aggr 聚合筛选器支持 resourceType 资源标签类型，并支持配置不聚合筛选项 ([c1787dc](https://github.com/JayTam/antd-ms/commit/c1787dcafa29072b607b318cf2a19f86c8c8afa7))
- **ms-table:** query-filter 筛选类型，小于等于三个筛选项也显示筛选标签 ([e0c4681](https://github.com/JayTam/antd-ms/commit/e0c46816c5fd0ce236da5f71c9b491e80cf47051))
- **ms-table:** query-filter 的筛选标签基本实现 ([d1abcff](https://github.com/JayTam/antd-ms/commit/d1abcffb6e6e57214d3404872afe06795ac30dda))
- **ms-table:** query-filter 的输入类型可自由排列顺序，同时筛选项宽度，按规范 140px 执行 ([0f1032f](https://github.com/JayTam/antd-ms/commit/0f1032f4de9efd7f5ded310bcb1a47042596d221))
- **ms-table:** search 筛选模式，支持同时配置 search 和 filters 两种模式 ([08cfe47](https://github.com/JayTam/antd-ms/commit/08cfe4750dc829ad6bd2f716cd5822ffc8b3eee5))
- **ms-table:** syncToUrl 解析数组支持 1000 长度数组，规避潜在风险 ([a61920a](https://github.com/JayTam/antd-ms/commit/a61920a49ae103f5a141fdc5b089369bb5eb80fe))
- **ms-table:** toolbarRender 实现动态渲染 ([4a47a5e](https://github.com/JayTam/antd-ms/commit/4a47a5e60e5ae1cec887633133ef940bfbb06ff2))
- **ms-tabs:** 调整 ms-tabs api，支持 tabKeyName、syncToUrl、syncIncludeKeys、syncExcludeKeys 入参 ([0ccc936](https://github.com/JayTam/antd-ms/commit/0ccc936a2c53e661da46311a064adc38a9b19af9))
- **ms-tabs:** 增加 radio 类型的 ms-tabs 切换动画 ([2db0f93](https://github.com/JayTam/antd-ms/commit/2db0f935b07df058d9cac19070b7952cb3af130c))
- **ms-tabs:** 完善 ms-tabs 的样式，支持 text、text-block、radio 等自定义类型 ([070faf4](https://github.com/JayTam/antd-ms/commit/070faf4148e4d5f75324c63d4e4b68425f471592))
- **ms-tabs:** 修复左右切换的 border 样式问题 ([8eeee98](https://github.com/JayTam/antd-ms/commit/8eeee984d5821ba076e4bb3b743bc4d62c40bf4d))
- **ms-tabs:** 增加 ms-tabs 组件，实现基本的 urlState 逻辑 ([babe05d](https://github.com/JayTam/antd-ms/commit/babe05d748131dbe75c7dc051e7c5bfbfa04ac9d))
- **ms-tabs:** 支持报错切换 tab 前的所有参数 ([90e582d](https://github.com/JayTam/antd-ms/commit/90e582d68b731e52295db3a95b61e9797cf9fb96))
- **ms-tabs:** 支持 radio 类型的 tabs 展示 ([265407e](https://github.com/JayTam/antd-ms/commit/265407eb0cc1626e03b43e36d439d4ffba18ab0f))
- **ms-tabs:** 自定义的 tabs 支持 destroyInactiveTabPane 属性，去除默认的 16px 底部边距 ([c182dc2](https://github.com/JayTam/antd-ms/commit/c182dc24deb83836f87916bc3c0a1486f5a4e66c))
- **ms-tabs:** ms-tabs 值为 undefined 时默认选中第一个；所有 type 的 tabs 都支持 tabBarExtraContent 和 tabBarStyle ([970cf5d](https://github.com/JayTam/antd-ms/commit/970cf5de707ced09580a75ed1516af5ef8383da3))
- **ms-tabs:** radio 类型样式优化 ([13db148](https://github.com/JayTam/antd-ms/commit/13db148ad301e4b358964d4349034d3116f7e113))
- **ms-title:** 新增 prefix 和 suffix 自定义标题前后缀 ([dd1e656](https://github.com/JayTam/antd-ms/commit/dd1e656fc50b4a8eb41ebd8ee8f694a761e9782d))
- **ms-title:** 新增标题组件 ([20fb13b](https://github.com/JayTam/antd-ms/commit/20fb13b0c8fa8c936cbc7f6962d71baab95c74d7))
- **ms-upload:** 默认上传方式增加 uploadSuffixRender,在按钮后渲染节点 ([b980324](https://github.com/JayTam/antd-ms/commit/b9803242d0290f703b59780858d2305c381bda3d))
- **ms-upload:** 上传组件-拖拽上传图片固定为 100\*80，预览改为 antd Image 标签 ([8a74d43](https://github.com/JayTam/antd-ms/commit/8a74d436d9c643a8f69aeaf666134e967d233fcb))
- **ms-user-popover:** 提升 clickEdit 模式下的渲染优先级 ([f400358](https://github.com/JayTam/antd-ms/commit/f40035876d2c0df912119665ce543c4018e290b6))
- **ms-user-popover:** 增加 addToolTip 控制 hover 新增人员详情的 tooltip 显示 ([e1a4026](https://github.com/JayTam/antd-ms/commit/e1a4026df4322c3e0e1a04d778713af72ec5bf8b))
- **ms-user-popover:** 支持点击编辑操作 ([7571f14](https://github.com/JayTam/antd-ms/commit/7571f14c9355fac9265a48ca8ac54547305ea2e6))
- **ms-verify:** 验证弹窗 ([917a05b](https://github.com/JayTam/antd-ms/commit/917a05b864eb84f761144bd1634248b85c1e9ada))
- **ms-empty:** msEmpty 添加 size 属性 ([bc74833](https://github.com/JayTam/antd-ms/commit/bc748338c50a0f130ab3a65720e856d68734ea3b))
- **ms-svg:** 添加组件 ([94c1ed0](https://github.com/JayTam/antd-ms/commit/94c1ed05f28ef5701072f4421196dd884a2fcc3a))
- **ms-number:** 新增 number 表单原子组件 ([59c7ff1](https://github.com/JayTam/antd-ms/commit/59c7ff191eb0e4a33c2fc9a7875a262a2de12698))
- **ms-text-area:** 在编辑表格中，textArea 实现气泡弹窗编辑框 ([63eece8](https://github.com/JayTam/antd-ms/commit/63eece81e1c32756054a016bca34e42b61333571))
- **use-hash-state:** 新增 useHashState 便于管理 hash 请求参数 ([7e764fc](https://github.com/JayTam/antd-ms/commit/7e764fc7e7675cd08fde1fe5570e4ebaa6bfc46c))

### Bug Fixes

- **ms-actions:** ellipse 调整为 ellipsis ([045bcc7](https://github.com/JayTam/antd-ms/commit/045bcc73c048d252244e159b332e7e652054ad85))
- **ms-cascader:** 兼容 column.initialValue 和 fieldProps.defaultValue 都可以实现 enableFullValueInitializer ([a4ed800](https://github.com/JayTam/antd-ms/commit/a4ed800a729b71aa0d04383200be6e49462884c3))
- **ms-cascader:** 修复实现 enableFullValueInitializer 带来的新问题 ([377eabb](https://github.com/JayTam/antd-ms/commit/377eabb5df5f9fe2d928e38ae056a7c28b54d0ac))
- **ms-date:** 修复 picker=date 设置 showTime 情况下，只读模式没有展示时间部分 ([748055f](https://github.com/JayTam/antd-ms/commit/748055f139d99dee3d8969e742844a131b47ea51))
- **ms-date:** 优化 date 在 FormItem 下未占满 ([97eb787](https://github.com/JayTam/antd-ms/commit/97eb78737cd88eb126aaabcc67695caa5192ed9b))
- **ms-descriptions:** 详情 titleType 增加 block 类型 ([387bf70](https://github.com/JayTam/antd-ms/commit/387bf70a5fc0d9138fb4a55d0546740aaa82ee79))
- **ms-descriptions:** 修复 titleType 为 block 类型 extra 样式问题 ([2762ecc](https://github.com/JayTam/antd-ms/commit/2762ecccb0aa675a6215efd2c4e4bca22ae08d9f))
- **ms-devops-layout:** 面包屑样式调整，路由匹配失败时清空 key ([8a01cbb](https://github.com/JayTam/antd-ms/commit/8a01cbb21a1900018a66f2e95f1718019f35b8f2))
- **ms-devops-layout-menu:** 优化切换的动态效果 ([d405591](https://github.com/JayTam/antd-ms/commit/d405591957c02ca967f090ced0ccae54736869ed))
- **ms-devops-layout:** 保持 children 结构层级的稳定。修复从有标题跳到没有配置标题页面时 children 组件缓存失效，会重复挂载两次的问题 ([16fea53](https://github.com/JayTam/antd-ms/commit/16fea53a523af644af95dacf76c10d5dc39d5a88))
- **ms-devops-layout:** 从首次进入时，需要根据当前路由的匹配规则来自动展开匹配的菜单调整为每次路有变化时自动展开匹配菜单 ([ee1d929](https://github.com/JayTam/antd-ms/commit/ee1d929d80ef87ae24b4a238cd88b45126358c47))
- **ms-devops-layout:** 调整菜单 key 匹配的逻辑 ([6b10f38](https://github.com/JayTam/antd-ms/commit/6b10f381135af5def730835978f82e401727eb68))
- **ms-devops-layout:** 调整面包屑的匹配逻辑，修复特定情况下无法匹配成功的问题 ([e60abd9](https://github.com/JayTam/antd-ms/commit/e60abd912fd08fdc57e0658c2c30e4e70ec25acc))
- **ms-devops-layout:** 固定 react-router-dom 中 matchPath 的实现，防止项目上的幽灵依赖导致实际版本与组件库版本不统一 ([efec88c](https://github.com/JayTam/antd-ms/commit/efec88c0f3c8a1c2af9c29d486294c8a6d8b7560))
- **ms-devops-layout:** 删除调试信息 ([1781ced](https://github.com/JayTam/antd-ms/commit/1781ced3bb7c6d570ee7534e214489338077c3fd))
- **ms-devops-layout:** 收起展开时，保持 openKey 一致 ([52d33d3](https://github.com/JayTam/antd-ms/commit/52d33d3b1d900a105da389bb5193655e798d1a06))
- **ms-devops-layout:** 修复缓存 menuKey 的值的拼写 ([3fd457d](https://github.com/JayTam/antd-ms/commit/3fd457d98eccbb0ea20f18f93ae0dd88a91a1c47))
- **ms-devops-layout:** 修复样式可能被覆盖问题 ([bf1cbfb](https://github.com/JayTam/antd-ms/commit/bf1cbfbabfcf4cd076ea85b5cfc8a82d8202ba3a))
- **ms-devops-layout:** 修复英文的短标题只能截取 4 个字符的问题；修复在菜单折叠时不自动设置展开 keys ([ccdc004](https://github.com/JayTam/antd-ms/commit/ccdc00488aeb0a778896fc324e3061e9ea381429))
- **ms-devops-layout:** 修复折叠时的 menu 展示样式 ([8ce07cc](https://github.com/JayTam/antd-ms/commit/8ce07ccfcb4e0794a01a03fba7f8c2246f4d80c3))
- **ms-devops-layout:** 修复 getRouteStrList 方法会丢失 / 匹配项的问题 ([0f5699c](https://github.com/JayTam/antd-ms/commit/0f5699cd97373ec525d53866e47b37aad21e31c4))
- **ms-devops-layout:** 修复 noNavigate 失败的问题 ([088f87e](https://github.com/JayTam/antd-ms/commit/088f87e7d5b0202c93496345576e791559e4ca16))
- **ms-devops-layout:** 修复 toolTip 配置后的警告 ([13d5817](https://github.com/JayTam/antd-ms/commit/13d5817e4981f42341fbd7a7fdefe29aa2183d63))
- **ms-devops-layout:** 优化 openOneMenu 模式下，展开菜单增加 keys 而不是覆盖 ([22ddac8](https://github.com/JayTam/antd-ms/commit/22ddac84591d746cb69406fa6240914e894ba08a))
- **ms-devops-layout:** 增加菜单样式的权重，防止因加载顺序造成的样式覆盖 ([5ccd9e3](https://github.com/JayTam/antd-ms/commit/5ccd9e33bb7452e4c9b88a911d9386f3a8203761))
- **ms-devops-layout:** 增加菜单样式的权重，防止因加载顺序造成的样式覆盖 ([d2ad1cc](https://github.com/JayTam/antd-ms/commit/d2ad1ccb44665d440bd6664fe3338c01b0617e62))
- **ms-devops-layout:** 只有 autoMatch 模式下，才根据路由匹配规则展开菜单 ([7bf79e9](https://github.com/JayTam/antd-ms/commit/7bf79e9454bd93e72f4dadf0010b09a60698a916))
- **ms-devops-layout:** breadcrumb 最后一项点击无效 ([d5dd12e](https://github.com/JayTam/antd-ms/commit/d5dd12eaf76534680c3429231671b70fb3cf30b3))
- **ms-devops-layout:** openOneMenu 显示设置默认值为 true（非破坏性更新） ([0d9fd52](https://github.com/JayTam/antd-ms/commit/0d9fd522d41397f4a103fbc2e026c43d6dc79281))
- **ms-devops-layout:** routesPaths 引用地址改变时不改变 openKeys ([53ca6f2](https://github.com/JayTam/antd-ms/commit/53ca6f27a5ffa6e0d0933948c6e3fdc89bc0a23c))
- **ms-devops-layout:** tooltip 仅在 right 模式下设置 padding ([9fd6a00](https://github.com/JayTam/antd-ms/commit/9fd6a001dbdd44467b99b18da4e6092ebe5d57ee))
- **ms-doc-tips:** 修复 false 渲染问题 ([01619d6](https://github.com/JayTam/antd-ms/commit/01619d6621a98affbca29b6fca8cbf8f26d13e4d))
- **ms-drawer:** 修复 className 属性失效 ([0d77df5](https://github.com/JayTam/antd-ms/commit/0d77df5c4205921b92ca4ae70ce189fa26d911c8))
- **ms-drawer:** 支持扩展功能三栏布局 ([cfb7e4d](https://github.com/JayTam/antd-ms/commit/cfb7e4dbed1309be5a8a401d6f87498b8ce6028d))
- **ms-dropdown:** 修复 dropdown.button confirm 可能错位的问题 ([2320aea](https://github.com/JayTam/antd-ms/commit/2320aea5c729aa1ac7ccf94b51844c17333ecddb))
- **ms-dropdown:** 修复 ms-dropdown 在 table 操作面板上可能出现的文字挤压问题 ([987d59b](https://github.com/JayTam/antd-ms/commit/987d59b7abe95f632523e7460783df874ac8d1e9))
- **ms-field:** 解决 codeEditor diffEditor richText partUpload 输入值闪现 ([ea3a196](https://github.com/JayTam/antd-ms/commit/ea3a196054c452304b45d151831f43005041ad21))
- **ms-field:** 修复 fieldRender 和 fieldReadRender 不受 mode 类型控制 ([584757a](https://github.com/JayTam/antd-ms/commit/584757a899632e1e39ac0a70f0bdf25210130a87))
- **ms-field:** 修复 fieldRender 和 fieldReadRender 不支持 () => ReactNode 类型 ([66c42af](https://github.com/JayTam/antd-ms/commit/66c42af5ebe831d31b2c8323407e7f7379ff87f8))
- **ms-field:** 修复类型导出未加 export type 导致的运行时错误 ([daa7173](https://github.com/JayTam/antd-ms/commit/daa71733b24cb7ca8dfddf80fe6cad4e973bf73a))
- **ms-field:** 修复没在 MsForm 上下文下，无法发送请求 ([0673299](https://github.com/JayTam/antd-ms/commit/067329921d3eb612adac1433546f83f47aed144a))
- **ms-field:** 修复因导出 MsPartUpload 导致缺 @aws-sdk/client-s3 依赖报错 ([654a161](https://github.com/JayTam/antd-ms/commit/654a161419f9f89f1911ed91b8c67c35378306ae))
- **ms-field:** 修复因导出 MsPartUpload 导致缺 @aws-sdk/client-s3 依赖报错 ([5932a28](https://github.com/JayTam/antd-ms/commit/5932a28f49aaedd6739140fa596bd21a0c6c4ab2))
- **ms-field:** 修复重构之后 labelInValue 功能失效 ([f016153](https://github.com/JayTam/antd-ms/commit/f016153f945071ddabb28e6bb2100ddc481ade60))
- **ms-field:** 修复 TS 类型问题，checkbox,radio,treeSelect,cascader,resourceType 的 fieldProps 缺失通用类型 ([ee926dd](https://github.com/JayTam/antd-ms/commit/ee926dd3f226581e4d54728a0e2a9cb92c620c58))
- **ms-field:** 只读模式，默认都要开启 ellipsis ([6a92bdf](https://github.com/JayTam/antd-ms/commit/6a92bdf29ecce503c71b27e134fb4e3bda109561))
- **ms-field:** group titleType 增加 block 类型的样式 ([442f713](https://github.com/JayTam/antd-ms/commit/442f713eb9b9ee1cf5d194ac2b72da8070101c84))
- **ms-form-list:** 修复 params 函数中无法获取外面异步状态 ([bb7f82b](https://github.com/JayTam/antd-ms/commit/bb7f82badcbce82956a4b74972342df35c96d32e))
- **ms-form-list:** 修复当设置必填校验规则时，label 没有必填标识 ([512d10b](https://github.com/JayTam/antd-ms/commit/512d10b7e2c8a7b155f5d349df4c8edbb633967c))
- **ms-form-list:** 修复点击上下移动位置时，未处理非空情况导致白屏 ([5af1b10](https://github.com/JayTam/antd-ms/commit/5af1b10a8868c91a6ecb2f65b81034b583d4c9ad))
- **ms-form-list:** 修复设置 fieldProps.hideAddButton 报错 ([f471fac](https://github.com/JayTam/antd-ms/commit/f471fac371473b2a35e53dee2cf6602a5489bce4))
- **ms-form-list:** 修复性能优化导致的 initialValue 失效和设置 dependencies 异常 ([9593a6b](https://github.com/JayTam/antd-ms/commit/9593a6b14c6e5da14c9e841d9e15f68bcef81463))
- **ms-form-list:** 修复当设置了 dependencies 时，formList 无法渲染 ([9ca0d61](https://github.com/JayTam/antd-ms/commit/9ca0d61214dcb5701e8f464e852b5ab5daa20b9d))
- **ms-form-table:** 修复 hideAddButton 隐藏新增按钮之后，按钮背景区域还是存在 ([853a9b5](https://github.com/JayTam/antd-ms/commit/853a9b5b56a7e65383e72a24a05c3b62e7e69a0a))
- **ms-form-table:** 临时解决用户选择无法选中的问题 ([15d0f69](https://github.com/JayTam/antd-ms/commit/15d0f694f8cb5649536dc06645e0e737ab1d3355))
- **ms-form-table:** 修复 formTable 在嵌套使用的时，新增按钮无效 ([edc80e6](https://github.com/JayTam/antd-ms/commit/edc80e65a49d13dc7ecc26f4c540ee2dec6c0782))
- **ms-form-table:** 修复 hideInForm 不能隐藏表头，只能隐藏表单输入框 ([b8ff5d2](https://github.com/JayTam/antd-ms/commit/b8ff5d2e78c310a77635ec2e7484d02b3224632c))
- **ms-form-table:** 修复设置 column.hideInForm 无法隐藏整列问题 ([44cb6ff](https://github.com/JayTam/antd-ms/commit/44cb6ff86ce6b659f2de20e9e8db0ecea212d8bf))
- **ms-form-table:** 修复性能优化导致的 min 最小限制功能异常 ([101b1cd](https://github.com/JayTam/antd-ms/commit/101b1cdd27808e643c7291b8b0552059186180a5))
- **ms-form:** 修复 moment, dayjs 可能存在的版本化差异 ([57e9bd0](https://github.com/JayTam/antd-ms/commit/57e9bd0a1491612f33f95b81361de3814a6be0f8))
- **ms-form:** 修复警告，自定义属性 extraNodeList 透传到 Form 组件 ([e8e861b](https://github.com/JayTam/antd-ms/commit/e8e861b55260400b4ec8943430e42a5b77016427))
- **ms-form:** 修复判断 dayjs 实例不准确 ([8ff59f3](https://github.com/JayTam/antd-ms/commit/8ff59f39065f0d5ee112961a2063b41182447667))
- **ms-form:** 修复引入路径导致的组件报错 ([e725ab0](https://github.com/JayTam/antd-ms/commit/e725ab077830a5007883f025871606e00e3a8bb4))
- **ms-form:** 阻止浏览器默认行为，当表单中只有一个输入框时，回车会触发表单提交 ([f25c35d](https://github.com/JayTam/antd-ms/commit/f25c35d0359a56bf6ee13e915b38692c04f07a8a))
- **ms-layout:** 当前路由不可重复点击 ([d5ecb91](https://github.com/JayTam/antd-ms/commit/d5ecb910f1b3f05c6707487f96e250772eb77a6b))
- **ms-layout:** 实现配置 collapsible 为 false，有子菜单时不折叠菜单 ([2b1cc24](https://github.com/JayTam/antd-ms/commit/2b1cc240797a2b2c98a4f18f0951f5fb70221b91))
- **ms-layout:** 修复切换二级菜单时，错误的打开了一级菜单 ([8cfda69](https://github.com/JayTam/antd-ms/commit/8cfda69fd9b2b8a5c72d2727f2c607a6777d9322))
- **ms-page:** 修复 MsTitle 组件影响到 MsPage block 样式 ([910f9fd](https://github.com/JayTam/antd-ms/commit/910f9fd92c33073c7d0983bca0b6911d7be0e30a))
- **ms-page:** 修复 title 传 ReactNode 类型，返回按钮不显示 ([8ab2930](https://github.com/JayTam/antd-ms/commit/8ab29300215b60d917434cabf73f8000f4a678b4))
- **ms-page:** 修复 titleStatusColumn.valueEnum 不支持数组形式的格式 ([8d55566](https://github.com/JayTam/antd-ms/commit/8d5556696943534f8d95c2d0300ea4cc40bde414))
- **ms-page:** 修复边界情况，未设置 request 且 tabs 配置成函数无法渲染选项卡 ([e58e5da](https://github.com/JayTam/antd-ms/commit/e58e5dac0e309a5f24e94ed7fed0b6696e0014cc))
- **ms-page:** titleType 增加 block 类型的样式 ([7cce424](https://github.com/JayTam/antd-ms/commit/7cce424d57a89e7c8dbd1edd20b09da7298594a6))
- **ms-preset-resource-tags:** 标签键和值校验规则优化，不能包含英文逗号和冒号 ([39e762c](https://github.com/JayTam/antd-ms/commit/39e762c241632991469f2093f315907c7cac9d71))
- **ms-preset-resource-tags:** 修复标签值校验提示文案错误 ([8a2453f](https://github.com/JayTam/antd-ms/commit/8a2453fa879decb0b8801dfb880a6ffc2fe77838))
- **ms-preset-resource-tags:** 修复预置标签占位的依赖，设置的是 dependencies 没有生效，修改为 dependenciesList ([6700fa1](https://github.com/JayTam/antd-ms/commit/6700fa14746e3b29f2b0c79c91d1021784dd9410))
- **ms-preset-resource-tags:** 编辑自定义标签限制最多 20 个，筛选不限制 ([78476a4](https://github.com/JayTam/antd-ms/commit/78476a4b9672e12f14c90ac4116c15dbe549429a))
- **ms-preset-resource-tags:** 修复表格列中展示标签存在未考虑预置标签 ([79f775a](https://github.com/JayTam/antd-ms/commit/79f775a882915739a7e426f9fa8e8bb8cc6e0a2b))
- **ms-preset-resource-tags:** 修复空查询异常 ([60d61ff](https://github.com/JayTam/antd-ms/commit/60d61ff6ad96513273755dacfefd9c102d8b7e61))
- **ms-preset-resource-tags:** 修复埋点事件不触发 ([d1a8c44](https://github.com/JayTam/antd-ms/commit/d1a8c449752254eefb9f967294a3ea054ed24fd0))
- **ms-preset-resource-tags:** 修复通过预置标签键查询可选标签值时，由于后端是模糊匹配，导致可选的标签值出错 ([576d854](https://github.com/JayTam/antd-ms/commit/576d8540bbec367d4fc213590c3fec310aa6d276))
- **ms-preset-resource-tags:** 修复预置标签筛选无法提交 ([b15e413](https://github.com/JayTam/antd-ms/commit/b15e4133acbcd6049b29e048aeda6bdc17c9b48a))
- **ms-preset-resource-tags:** 修复在 MsConfigProvider 上设置 resourceApiVersion 对预置标签不生效 ([d945787](https://github.com/JayTam/antd-ms/commit/d945787eb92d9f798937584a058a9da71029846f))
- **ms-request:** 解决 setTimeout 延时优先级过低问题 ([0984a70](https://github.com/JayTam/antd-ms/commit/0984a70fb13bfa5d014c7bf9095997ccbe9b1608))
- **ms-resource-tags:** 修复 MsResourceTags.CreateFormListField 重复检验异常 ([ae3b21f](https://github.com/JayTam/antd-ms/commit/ae3b21fcb51c28e65a4e3ee3574133c846364255))
- **ms-resource-tags:** 修复解析 resourceUrl 忽略了 resourceMetadata ([22478c5](https://github.com/JayTam/antd-ms/commit/22478c5f7427db7d14daa83bf380b5f2660d1d98))
- **ms-resource-tags:** 修复 azone 反查 regionId 异常，azone 是 azoneCode 不是 azoneId ([177b94e](https://github.com/JayTam/antd-ms/commit/177b94efaf0c69ad7f75890126550d1b82765c50))
- **ms-resource-type:** 获取资源类型接口页宽改成 1000 ([eff829f](https://github.com/JayTam/antd-ms/commit/eff829fedb58fc173823b1275fb7347d76aa4673))
- **ms-resource-type:** 修复 setTimeout 延迟清空选项未考虑 clearSetTimout 导致的异常 ([219999b](https://github.com/JayTam/antd-ms/commit/219999be1a5cadf6a7a18db56a90a335a0a6e208))
- **ms-resource-type:** 修复和完善资源类型组件小问题 ([8c7511e](https://github.com/JayTam/antd-ms/commit/8c7511ebbd8e5cd94133af8830473c299f202d7c))
- **ms-resource-type:** 修复首次点击资源类型报错 ([e62656d](https://github.com/JayTam/antd-ms/commit/e62656d2dfb624ee158ae6666eebd0c07aceeb38))
- **ms-resource-tags:** 修复 CreateFormListField 组件边界情况异常 ([ee66ecc](https://github.com/JayTam/antd-ms/commit/ee66ecc6edf983ae88b7d216c58d39760ee76ea9))
- **ms-resource-tags:** 修复 treeshaking 之后资源标签无法在 MsDescriptions 中无法渲染 ([b1c95bd](https://github.com/JayTam/antd-ms/commit/b1c95bd4d871c0ee105cd223ca4c3be76237ba01))
- **ms-resource-tags:** 修复埋点事件不触发 ([83aca27](https://github.com/JayTam/antd-ms/commit/83aca27ce674125af047151f809166d3aec09c3a))
- **ms-resource-tags:** 优化 CreateFormListField 未关联 vpc 时，提交的数据项不应该包含 vpc 编码 ([d136ff1](https://github.com/JayTam/antd-ms/commit/d136ff10340bf78574efe8802b4cf1827c47f664))
- **ms-resource-type:** 优化当校验失败时，输入框不应该变成红色 ([b72bdca](https://github.com/JayTam/antd-ms/commit/b72bdca1c201af93f9b9e61f8cca3a2ee922af42))
- **ms-rich-text:** 修复富文本编辑器编辑和全屏按钮在弹窗中失效，修复 value 偶现被清空 ([daa3315](https://github.com/JayTam/antd-ms/commit/daa33154445b21995a915612fb4c6534922c1e2c))
- **ms-rows:** 修复导出错误 ([2d28bdf](https://github.com/JayTam/antd-ms/commit/2d28bdf02d0dac82cca65fb7c0e5535e2f75c8c4))
- **ms-search:** 补充 column 上缺失的 ignoreDependenciesOnChange，列设置等类型 ([4fc7818](https://github.com/JayTam/antd-ms/commit/4fc781817a08d09cebd1cdd40f8b81184ec0afff))
- **ms-search:** 修复 beforeSearchSubmit 失效 ([b00c96a](https://github.com/JayTam/antd-ms/commit/b00c96a119230d3ee84200c99b5538b6301bafbc))
- **ms-search:** 修复 children 渲染了两遍 ([c1d4718](https://github.com/JayTam/antd-ms/commit/c1d4718d2df1ba227d327864203a22cc39a80cd7))
- **ms-status:** 解决同时设置 closable 和 ellipsis 出现的删除按钮图标在标签外面 ([679f60b](https://github.com/JayTam/antd-ms/commit/679f60b987ea36677282882bb99fc8ca6ef0ccb7))
- **ms-status:** 扩展颜色，增加 lightTag 类型 ([16e664b](https://github.com/JayTam/antd-ms/commit/16e664bb1ce61f19434813023b416d1edde2dd91))
- **ms-status:** 文字大小不固定，改成变量 ([835baa6](https://github.com/JayTam/antd-ms/commit/835baa697d098961f3bcc0debc987bcca5d98a8f))
- **ms-status:** 修复 lightTag 时自定义颜色背景色显示错误 ([99386e6](https://github.com/JayTam/antd-ms/commit/99386e69ddae1eaa530f277eebcba7e55478cdd9))
- **ms-status:** 修复 style 被覆盖 ([56fe485](https://github.com/JayTam/antd-ms/commit/56fe48541509000ae17b92192b4d916c32375380))
- **ms-status:** 修改圆点和文本的距离为 8px ([9a6cbca](https://github.com/JayTam/antd-ms/commit/9a6cbca54f4d8c7546ebc972207cd9ffb1d61620))
- **ms-status:** 优化样式，支持 icon ([fb91c50](https://github.com/JayTam/antd-ms/commit/fb91c50c728cd60dc6e5a90987d8ecf6ec285df5))
- **ms-status:** 优化状态组件单独使用时取消外边距 ([fd47501](https://github.com/JayTam/antd-ms/commit/fd475015b7ba6c971c8ef98bf5dbd5d5de467e06))
- **ms-status:** 增加 mini 尺寸 ([9491e36](https://github.com/JayTam/antd-ms/commit/9491e3622a38236cc18e94c51e517f2be08f5c97))
- **ms-status:** 支持不同尺寸 ([7e43a6b](https://github.com/JayTam/antd-ms/commit/7e43a6bbdcad400acbf32ecb4e4d40b6f1a1a9f9))
- **ms-svg:** 修复控制台告警 ([a90ce22](https://github.com/JayTam/antd-ms/commit/a90ce22c988698074485614bd8a4813701f4eedb))
- **ms-table:** 聚合筛选器中，search 和 filters 是互斥，只能同时存在一个 ([fdef56e](https://github.com/JayTam/antd-ms/commit/fdef56e099fa7ba98b57b983fed29c28d5459547))
- **ms-table:** 列设置的固定操作有问题，先临时取消这个功能，待后续修复 ([54d0d16](https://github.com/JayTam/antd-ms/commit/54d0d16d2d5cf82a841da82177ff422f6f4555e2))
- **ms-table:** 普通表单字段有请求过渡效果，筛选标签无请求过渡效果 ([6080573](https://github.com/JayTam/antd-ms/commit/608057365978b8a9be85f1846ed86d648000be89))
- **ms-table:** 筛选标签不显示 MsStatus 状态 ([47752c2](https://github.com/JayTam/antd-ms/commit/47752c218aa734375c57ab4072d87c9a2831c70f))
- **ms-table:** 筛选标签兼容 select 选择器 mode=tags 场景 ([66a939c](https://github.com/JayTam/antd-ms/commit/66a939cb76df2f7c43463434ed1f7b164d84cd9f))
- **ms-table:** 完善聚合筛选器对 checkbox 类型的支持 ([ec7283f](https://github.com/JayTam/antd-ms/commit/ec7283f617bc19e7468855091da81f7c45cabf04))
- **ms-table:** 为修复 column.tooltip 和排序 tooltip 不重叠，默认关闭排序 tooltip ([a5a13a9](https://github.com/JayTam/antd-ms/commit/a5a13a9c903f033e06b0a4ab47f64a0e275f797f))
- **ms-table:** 修复 aggr 类型标签筛选标签无法清除单项 ([4d1b145](https://github.com/JayTam/antd-ms/commit/4d1b145ef3916917072354a6471e582a74c3d2d0))
- **ms-table:** 修复 aggr 筛选标签清空按钮失效 ([48a30b7](https://github.com/JayTam/antd-ms/commit/48a30b768064031479cc0121851fe900ca45486d))
- **ms-table:** 修复 column.dataIndex 为数组时，表格列数据无法正常显示 ([08378dd](https://github.com/JayTam/antd-ms/commit/08378dd2d5c7bea741ab65a6f041f330ce7be5ea))
- **ms-table:** 修复 column.hideInTable 失效 ([cb7a1a6](https://github.com/JayTam/antd-ms/commit/cb7a1a6d7bf059e456d241fba3fe954467b6c81e))
- **ms-table:** 修复 column.hideInTable 由隐藏变化到显示，列无法展示出来 ([8ba5a55](https://github.com/JayTam/antd-ms/commit/8ba5a5558e501c63c2532d3a436b9429a019b4ac))
- **ms-table:** 修复 column.initialValue 使用 dayjs 实例会报错 ([5605d84](https://github.com/JayTam/antd-ms/commit/5605d8441f06830b309cd058fd2aa6fbf93ec26b))
- **ms-table:** 修复 column.tooltipProps 不生效，tooltip 的手势从 help 修改为 pointer ([40b75a5](https://github.com/JayTam/antd-ms/commit/40b75a57fd98b6fb48485aae657c945ec653c719))
- **ms-table:** 修复 filter 模式下，不应该出现资源筛选 ([e7e84fd](https://github.com/JayTam/antd-ms/commit/e7e84fd729bf3fd897d809ff86087e85a5d2571b))
- **ms-table:** 修复 MsTable auto-content 在 MsDevopsLayout 高度计算有偏差 ([8aa4d01](https://github.com/JayTam/antd-ms/commit/8aa4d01f37e0c0c82599357a48f968ea21c725d3))
- **ms-table:** 修复 query 筛选器使用 column.fieldRedner 自定义组件无效 ([eba490a](https://github.com/JayTam/antd-ms/commit/eba490a4650239ebab92ac9ef91fec32d48d12b0))
- **ms-table:** 修复 query-filter 不支持联动查询 ([fd964bf](https://github.com/JayTam/antd-ms/commit/fd964bf83b7981c0e71804c48a6bfae4009b15f7))
- **ms-table:** 修复 query-filter 的筛选器下，column.hideInForm 的动态化失效 ([1d3389c](https://github.com/JayTam/antd-ms/commit/1d3389c710e87b2175f06efca2169b161540caee))
- **ms-table:** 修复 query-filter 清空按钮逻辑错误触发成重置逻辑 ([1496a9b](https://github.com/JayTam/antd-ms/commit/1496a9b50008d6029485f0fcc8dffbfd5b3e559b))
- **ms-table:** 修复 query-filter 清空时未忽略 required 必填筛选项 ([8be97eb](https://github.com/JayTam/antd-ms/commit/8be97ebe6d4355386ee9d70213ff4203ee424abd))
- **ms-table:** 修复 query-filter 筛选类型 filterbarRender 会在筛选标签位置多渲染一遍 ([c1580a5](https://github.com/JayTam/antd-ms/commit/c1580a507e7eeeb2051cf428206d82e70115adb5))
- **ms-table:** 修复 query-filter 筛选器在设置了 hidenInForm 的情况下，展示在 query 区域的数量未剔除这个隐藏项 ([9e2f05f](https://github.com/JayTam/antd-ms/commit/9e2f05f1073aeb4166150f41210db9edd81a40aa))
- **ms-table:** 修复 query-filter 筛选标签，联动依赖的 form 实例不正确 ([e46f2ab](https://github.com/JayTam/antd-ms/commit/e46f2ab5f081c87dd3e5250da1005db661741d1e))
- **ms-table:** 修复 query-filter 中的 form 实例，凭空多了 \_expend0 表单项属性 ([facb409](https://github.com/JayTam/antd-ms/commit/facb409dcbd7e513784aec9fdab2141ce96da366))
- **ms-table:** 修复 search 类型筛选器，在搜索请求失败时 loading 状态未重置 ([0e5b808](https://github.com/JayTam/antd-ms/commit/0e5b80892c70b095a41803f0bd21a3ce50eec265))
- **ms-table:** 修复 search.showNumberInQueryFilter 对于筛选标签没生效 ([6800224](https://github.com/JayTam/antd-ms/commit/68002249eec53d2ed839c5771cc0aadbf6b13f89))
- **ms-table:** 修复编辑表格 cancel 可能提示正在编辑 ([9487bab](https://github.com/JayTam/antd-ms/commit/9487babe5be80ff697d018b9d06ecd8e509e3486))
- **ms-table:** 修复编辑表格，在编辑状态中不允许批量操作 ([ed9302e](https://github.com/JayTam/antd-ms/commit/ed9302e94f9b72fa789d014ed3c550ad28e14eee))
- **ms-table:** 修复编辑表格保存之后添加有问题 ([eb2af54](https://github.com/JayTam/antd-ms/commit/eb2af54252bef2214444ecdbc7482ef823f9979c))
- **ms-table:** 修复编辑表格和批量操作公用会报错 ([fb01ec5](https://github.com/JayTam/antd-ms/commit/fb01ec595ef9de8f1718b7831ccedbd0dd37e48a))
- **ms-table:** 修复编辑表格取消之后，表单状态没有还原 ([242b4b9](https://github.com/JayTam/antd-ms/commit/242b4b9baedde787c4f8ac4887f3a269698582eb))
- **ms-table:** 修复编辑表格无法实现合并表格列 ([c418ac1](https://github.com/JayTam/antd-ms/commit/c418ac1d6a4af274daeb48f5517d6daadae49909))
- **ms-table:** 修复编辑表格展开功能失效 ([c19f9ee](https://github.com/JayTam/antd-ms/commit/c19f9ee5ddfef74d99d0d0adc9f4dd9a2460c119))
- **ms-table:** 修复表格多选切换分页时选中状态丢失 ([3c6c65e](https://github.com/JayTam/antd-ms/commit/3c6c65ee5fed16930e59ab6c9875036675bb319b))
- **ms-table:** 修复表格轮询间隔 pollingInterval 从未开启 -> 开启，轮询未生效 ([4bd2128](https://github.com/JayTam/antd-ms/commit/4bd2128507738b2d821eefd16118a187f5eeeb3d))
- **ms-table:** 修复表格选择未显"已选中 x 项"，切换下一页时已选中项会被清空 ([6b58476](https://github.com/JayTam/antd-ms/commit/6b58476920af8c068809768f10f0a2fa03daa1ff))
- **ms-table:** 修复表头分组的 tooltip 失效 ([42b7e05](https://github.com/JayTam/antd-ms/commit/42b7e05525fd5bd0ea87a1f9b5358a14e5cecac7))
- **ms-table:** 修复表头筛选配置 column.filterMultiple 不生效 ([13b9b3d](https://github.com/JayTam/antd-ms/commit/13b9b3dd8dbbcf7003376c17719f4aa7208e4d28))
- **ms-table:** 修复表头筛选未重置到第一页 ([11e7312](https://github.com/JayTam/antd-ms/commit/11e7312f93a722c6b0508d0c37e690a350e902a7))
- **ms-table:** 修复表头筛选状态未同步给表单，导致编辑其他筛选项会清空表头筛选项 ([f704132](https://github.com/JayTam/antd-ms/commit/f704132b49a48ab45733309ea82857887e884344))
- **ms-table:** 修复代码合并导致 filteredViewRender 功能丢失 ([08e0438](https://github.com/JayTam/antd-ms/commit/08e0438ec837dc4fb5d39d45f2e70e37d977e992))
- **ms-table:** 修复弹窗表格 query-filter 筛选类型时，弹窗无法关闭 ([b832629](https://github.com/JayTam/antd-ms/commit/b832629f0babd1703d28b6a9f58eb2fd1ae17960))
- **ms-table:** 修复当设置 column.defaultSortOrder，用户无法操作到取消排序 ([c5fcf81](https://github.com/JayTam/antd-ms/commit/c5fcf81c4cd5880030fc134954c4b7a5542d223f))
- **ms-table:** 修复根据条件轮询从满足条件 -> 不满足条件时，会多请求一次接口 ([ec69996](https://github.com/JayTam/antd-ms/commit/ec6999607add00ce2a2161a11ab7ecbd1264379d))
- **ms-table:** 修复仅开启 column.filters 时，query 和 query-filter 筛选器异常 ([c06095f](https://github.com/JayTam/antd-ms/commit/c06095f241042104b79b615010430f180071c1d6))
- **ms-table:** 修复聚合筛选器中 request 缓存失效 ([365d274](https://github.com/JayTam/antd-ms/commit/365d274a7168d71d18fba5993fc7f2e7e2662ea5))
- **ms-table:** 修复开启 column.focusRequest 时，筛选标签中项无法映射枚举 ([f16d232](https://github.com/JayTam/antd-ms/commit/f16d232ab868015aa899b0a428437fad82c4bbba))
- **ms-table:** 修复列设置的搜索功能，在搜索之后选中匹配项，其他未匹配的选中项被置空 ([ee7bcb9](https://github.com/JayTam/antd-ms/commit/ee7bcb9357f760b298210c1193168e962cd4cb6b))
- **ms-table:** 修复列设置在隐藏字段之后，拖动排序功能就异常 ([bc37fab](https://github.com/JayTam/antd-ms/commit/bc37faba45301a0a2fb93ece7934d36b65e54645))
- **ms-table:** 修复批量操作自定义 selectKeys 时，选中 x 项的状态无法更新 ([2a01acb](https://github.com/JayTam/antd-ms/commit/2a01acb6674d97272ecac9055ad770ada6b9aeec))
- **ms-table:** 修复筛选标签不应该出现骨架屏 ([a6617ad](https://github.com/JayTam/antd-ms/commit/a6617ad68b3d216135e2e613a60c4b9d0f8f6d61))
- **ms-table:** 修复筛选标签不支持预置标签展示 ([6de388e](https://github.com/JayTam/antd-ms/commit/6de388ed143a56e07a1877ca552b107c26679928))
- **ms-table:** 修复筛选标签透传了无用的 copyable, editable 等属性 ([0975253](https://github.com/JayTam/antd-ms/commit/09752530883dd7d9ea62b72a89d00dcaf575f4f1))
- **ms-table:** 修复筛选标签在预置标签组件的问题 ([d5bc802](https://github.com/JayTam/antd-ms/commit/d5bc802c53646c6d75b14ae6d89de40c05041a59))
- **ms-table:** 修复设置默认排序，无法切换 ([a8ac79b](https://github.com/JayTam/antd-ms/commit/a8ac79b9d540d593165ce3f272a490a35b1b5b34))
- **ms-table:** 修复使用开关状态控制 rowSelections 配置时，翻页之后选中状态会被清空 ([f787126](https://github.com/JayTam/antd-ms/commit/f787126c3912f4d31aeb1b599bbfc6ee82261b3c))
- **ms-table:** 修复输入的表头筛选 placeholder 异常 ([c90f67e](https://github.com/JayTam/antd-ms/commit/c90f67ea4b298fc711f0f29946de756f2e3ec0ab))
- **ms-table:** 修复树形数据收起问题 ([40b2b61](https://github.com/JayTam/antd-ms/commit/40b2b618969f4c6135aa0887beb78805b1cfa35d))
- **ms-table:** 修复树形数据异步加载场景，无法重置展开/收起图标 ([0ac02c8](https://github.com/JayTam/antd-ms/commit/0ac02c8efb2f04f38c7bcb29fb8c94f4aaed9be0))
- **ms-table:** 修复树形数据异步加载场景的问题 ([ecae525](https://github.com/JayTam/antd-ms/commit/ecae5251dc9d593474351b35993a149248c7156a))
- **ms-table:** 修复树形数据折叠时，未递归取消子项的选中状态 ([bfa1db5](https://github.com/JayTam/antd-ms/commit/bfa1db522ec117478ac06a015333339941dc688a))
- **ms-table:** 修复性能优化引起的 column.tooltip 多次渲染 ([4f9d263](https://github.com/JayTam/antd-ms/commit/4f9d263bdd2b5f0ecb106edb4441f0624d4b8747))
- **ms-table:** 修复因代码合并导致的标签筛选功能异常 ([2c9c791](https://github.com/JayTam/antd-ms/commit/2c9c791ecd92a584322f6a00ebb0930c8e6b2577))
- **ms-table:** 修复因实现树形表格导致的 dataSource 失效 ([efff9a2](https://github.com/JayTam/antd-ms/commit/efff9a26c50467dbddb2307394b90ecc0eee31b5))
- **ms-table:** 修复直传 dataSource 更新失效 ([a693346](https://github.com/JayTam/antd-ms/commit/a69334631b9b7ddb38aaa23d3e0c1c32a9fe0891))
- **ms-table:** 修复直传 dataSouce 时，使用 rowSelection.selectionButtonsRender 渲染批量操作按钮无效 ([82082bd](https://github.com/JayTam/antd-ms/commit/82082bd2f7ca6724638b031cf9140aa87b12b016))
- **ms-table:** 修复重构分页器丢失了当前页码状态 ([e0963cf](https://github.com/JayTam/antd-ms/commit/e0963cfd6e792732acaf5932bbb0ae9771657fae))
- **ms-table:** 修复重构字段组件导致 textArea 编辑弹窗失效 ([519d3b1](https://github.com/JayTam/antd-ms/commit/519d3b18bd8a31a82e83cde93f2a490c434607ec))
- **ms-table:** 修复 aggr 存在初始之值，清空之后重新搜索会再次出现 ([6543786](https://github.com/JayTam/antd-ms/commit/6543786c406eb316faa22f543d0dd61c551a6946))
- **ms-table:** 修复 aggr 的资源标签输入就会提交 ([b73844d](https://github.com/JayTam/antd-ms/commit/b73844dddc4b6e24420fe187f03f8ea66205d748))
- **ms-table:** 修复 aggr 聚合筛选器，点击搜索 icon 没有清空输入值 ([93b2045](https://github.com/JayTam/antd-ms/commit/93b20454f658aa9e3e67c3eb2dffa2c235d98d03))
- **ms-table:** 修复 aggr 类型的时间类型的初始值报错 ([c86fa55](https://github.com/JayTam/antd-ms/commit/c86fa5514328d9a73cc5f7051ebcbabae89a45a6))
- **ms-table:** 修复 aggr 模式下，标签筛选未能触发 ([4d25c36](https://github.com/JayTam/antd-ms/commit/4d25c360b4c08de33403d99583eb32de21bfed2a))
- **ms-table:** 修复 aggr 筛选类型的警告 ([27efcf8](https://github.com/JayTam/antd-ms/commit/27efcf840796dbbbeb1016a4a3c3918aae7bcca3))
- **ms-table:** 修复 aggr 提交按钮和筛选标签清空配合问题 ([1891a0f](https://github.com/JayTam/antd-ms/commit/1891a0feaf37bff172af0abfb6c2fcdad3910a61))
- **ms-table:** 修复 column.fieldReadRender 对于重写筛选标签无效 ([26dcaf8](https://github.com/JayTam/antd-ms/commit/26dcaf8a0a125ccd2b6671da0ac48cd5677a685f))
- **ms-table:** 修复 column.tableTitle 不生效 ([780b6bd](https://github.com/JayTam/antd-ms/commit/780b6bdf5e3c000c1bfb57fb911182609f8c6d75))
- **ms-table:** 修复 filter 筛选点击人员按钮导致筛选框关闭 ([be39925](https://github.com/JayTam/antd-ms/commit/be399252504a6637d545b191e336a33a69c1ffcf))
- **ms-table:** 修复 filter 中某个字段设置了时间初始值，但 query 中没设置，会报错 ([cc220c3](https://github.com/JayTam/antd-ms/commit/cc220c3c44cc58cfc6641e0a9eb499af37af8c97))
- **ms-table:** 修复 filter 中某个字段设置了时间初始值，但 query 中没设置，会报错 ([d7b4877](https://github.com/JayTam/antd-ms/commit/d7b4877700c6a44738adf6c31605fb1cc9e48f5d))
- **ms-table:** 修复 light-query 的搜索按钮无法触发表格筛选 ([46bd0e6](https://github.com/JayTam/antd-ms/commit/46bd0e650f1accfb92b6776612b067576b753256))
- **ms-table:** 修复 query-filter，选择类组件未自动触发搜索 ([aeedc01](https://github.com/JayTam/antd-ms/commit/aeedc0180ac3d6a067165f1051eb047ee04eeead))
- **ms-table:** 修复 query-filter 类型中，仅 query 区域的选择器变更才触发搜索 ([ab6ad98](https://github.com/JayTam/antd-ms/commit/ab6ad98063b8b0b0132039a1717b1c8a28800d04))
- **ms-table:** 修复 query-filter 筛选类型中 query 区域的表单项无法重写 onSearch 方法 ([c1f4d45](https://github.com/JayTam/antd-ms/commit/c1f4d45b4aa14d665983f08359df247a6fde2fe6))
- **ms-table:** 修复 query-filter 在关闭 syncToUrl 时，多选的筛选标签不能自动清空 ([c8faa28](https://github.com/JayTam/antd-ms/commit/c8faa284ccfd9c1ba7dfe3a1aede088f0b1d6a04))
- **ms-table:** 修复 selectionButtonsRender 第一个参数无默认值[]，可能引起使用者访问属性报错 ([b7d0f91](https://github.com/JayTam/antd-ms/commit/b7d0f91eda2213aaf78273913994190bb704169f))
- **ms-table:** 优化 aggr 中的聚合筛选器默认配置 ([8c06ce8](https://github.com/JayTam/antd-ms/commit/8c06ce8d17c8f4f1fbbb1563c5ed736898ec79a3))
- **ms-table:** 优化筛选标签中请求枚举时的骨架屏样式 ([4fc9c6a](https://github.com/JayTam/antd-ms/commit/4fc9c6aebe693ae76d8a0d4a636a3f91462d514e))
- **ms-table:** 整合 MsTable 和 MsStatus，支持只配置 icon 能正常显示 ([75d8f44](https://github.com/JayTam/antd-ms/commit/75d8f44daff7777b982035e3d2c103cf0e052f1e))
- **ms-table:** aggr 下拉限制高度 256px ([2a79d67](https://github.com/JayTam/antd-ms/commit/2a79d6713e9938b09923a0d1141706281349126b))
- **ms-table:** aggr 筛选器，预置标签不应该出现在高级筛选中 ([b140997](https://github.com/JayTam/antd-ms/commit/b140997bfa8b617731c52e06efb383219d1b72e3))
- **ms-table:** light-query-right 类型，当没有菜单时，筛选项靠左 ([4ac73d1](https://github.com/JayTam/antd-ms/commit/4ac73d1a61d8fc9398773d1b140f6147271c488a))
- **ms-table:** titleType 增加 block 类型 ([3d2a84f](https://github.com/JayTam/antd-ms/commit/3d2a84ff78cb7668725e22f155172c3035a1f867))
- **ms-tabs, ms-devops-layout:** 修复 eslint 相关警告 ([74fac68](https://github.com/JayTam/antd-ms/commit/74fac6816390aaf1c5bd3e9b041e8c98ae20e24a))
- **ms-tabs:** 修复非 antd 中 tabs 类型时，缓存不是最新的问题 ([57aaf91](https://github.com/JayTam/antd-ms/commit/57aaf91c6d972be4d2025dde2f2f32c2a25eaf4d))
- **ms-tabs:** 修复 className 被覆盖的问题 ([b1fb378](https://github.com/JayTam/antd-ms/commit/b1fb378e1bdda929d3e5174c6036d24c689c1206))
- **ms-tabs:** 修复 msTabs 在非 isSynToUrl 下仍然使用 urlState 的问题 ([0ee6482](https://github.com/JayTam/antd-ms/commit/0ee6482c0adda95e5d1b3481ffd523a0ac478d45))
- **ms-tabs:** 修复 tabs 的 item 项过多，出现滚动时，tabs 的行高会变成 38px ([d1fd820](https://github.com/JayTam/antd-ms/commit/d1fd820eb2e4e9864b5a3d5241a776e6636b813b))
- **ms-tabs:** 修复 tabs 组件 children 属性动态变化时，组件未刷新的问题 ([30078e4](https://github.com/JayTam/antd-ms/commit/30078e48ed7e416dade4cb428fdac910060b330d))
- **ms-upload:** 上传组件支持 loading ([342d617](https://github.com/JayTam/antd-ms/commit/342d61792b644e82f9b07d7bdfe712a5de5672b2))
- **ms-upload:** 修复配置 showUploadList 后未显示删除按钮 ([da35592](https://github.com/JayTam/antd-ms/commit/da35592613571d9dfdf1869273cc096a0fa49fee))
- **ms-upload:** 修复上传只读模式下载按钮被禁用 ([e79a0f7](https://github.com/JayTam/antd-ms/commit/e79a0f74323ad7dfcef3f173cc9015ed1d344834))
- **ms-upload:** 修复上传组件只读时下载按钮被禁用 ([1ab92cf](https://github.com/JayTam/antd-ms/commit/1ab92cf60383e10726c96e7c14ffb09afe5bef19))
- **ms-upload:** 修改 uploadRender 类型 ([8e28cf5](https://github.com/JayTam/antd-ms/commit/8e28cf574b53a2315510007777ba6a3f6b57bd59))
- **ms-upload:** 优化 Upload 组件 onChange 类型 ([b5acbae](https://github.com/JayTam/antd-ms/commit/b5acbaefcca4e2db337039b5279afab19ab61de4))
- **ms-upload:** 修复超过最大上传数量，一直处于 loading 状态 ([d116f76](https://github.com/JayTam/antd-ms/commit/d116f76b20ffc74ecd6cb7d6f5f58c9fa06804d6))
- **ms-upload:** 修改拖拽和默认上传模式，禁用的样式 ([a3514e1](https://github.com/JayTam/antd-ms/commit/a3514e12a9435e51fede4119cc9ad788f085f51f))
- **ms-upload:** 优化上传组件编辑渲染 ([714e3ed](https://github.com/JayTam/antd-ms/commit/714e3ed0225fbcddf22356504c773f2f6692901f))
- **ms-user-popover:** 解决警告 ([d6a5f41](https://github.com/JayTam/antd-ms/commit/d6a5f418e6ec1a5fa874f0eb3e73bd8214c4a667))
- **ms-user-popover:** 去掉上下外边距 ([3af7160](https://github.com/JayTam/antd-ms/commit/3af7160d891014d1caffdf81b6cd3b7487cd9de8))
- **ms-user-popover:** 人员详情的姓名添加复制功能 ([6f96a86](https://github.com/JayTam/antd-ms/commit/6f96a86bf57d152fa066e2c03367762c76b5b440))
- **ms-user-popover:** 姓名超出部分显示省略号，优化编辑状态自动折叠逻辑 ([a477c8d](https://github.com/JayTam/antd-ms/commit/a477c8daffbbd42bc0d0124163968c841e98327b))
- **ms-user-popover:** 修复在 table 中使用未显示折叠按钮 ([7b859ff](https://github.com/JayTam/antd-ms/commit/7b859ffc1db2fc527a3aae308b663ea4074f33aa))
- **ms-user-popover:** 修复 initialValue 有值 form 提交被清空 ([e35bc1f](https://github.com/JayTam/antd-ms/commit/e35bc1f158311002272913823b61f4619d571f9e))
- **ms-user-popover:** 修复 popover 样式 ([216acd1](https://github.com/JayTam/antd-ms/commit/216acd10e55dca5a4bd77ca4737c53dff4402291))
- **ms-user-popover:** 优化列表中自动计算折叠的数据，修复列表数据更新后显示未更新 ([fd7d3ff](https://github.com/JayTam/antd-ms/commit/fd7d3ff81e37145827e5e29788b32450f279d90a))
- **ms-user-popover:** 优化人员名称在列表中字号大小 ([8381dd5](https://github.com/JayTam/antd-ms/commit/8381dd5026a9c2baca300c4f4863ba2968699b02))
- **ms-user-popover:** 优化人员详情展示内容，无值时不展示对应的 label ([6103fa5](https://github.com/JayTam/antd-ms/commit/6103fa54e3884c8717024b17d4ed3e5de23c4b04))
- **ms-user-popover:** 优化样式，只有详情浮窗的姓名才显示 14px ([28d331c](https://github.com/JayTam/antd-ms/commit/28d331cca46cc30165690a8026d1e03e8b931edf))
- **ms-user-popover:** 优化 fullCode 类型为可选 ([6ada6d6](https://github.com/JayTam/antd-ms/commit/6ada6d6450bf16629728054bba70dc19e97dec35))
- **ms-user-popover:** 折叠列表增加最大高度 ([f1c132c](https://github.com/JayTam/antd-ms/commit/f1c132c87e6b6b45d917ea599c98edc7f328cb47))
- **ms-user-popover:** userShow 增加 key 修复告警 ([a1282a3](https://github.com/JayTam/antd-ms/commit/a1282a3df5e321504afd1f79e39dfa16a0b09cdc))
- **ms-user-popover:** 常用联系人增加有效期和最大保存条数 ([91af85d](https://github.com/JayTam/antd-ms/commit/91af85d9b2ce0d0baa2a39c0e87439b2d75a2655))
- **ms-user-popover:** 给人员展示添加纵向间距 ([3095f7f](https://github.com/JayTam/antd-ms/commit/3095f7f1851479a3a8ea74898d787f3dd0c4bd2f))
- **ms-user-popover:** 修复超过最大人数限制，全部按钮未显示 ([5abdbac](https://github.com/JayTam/antd-ms/commit/5abdbac8130ad28912741606a6ba9b971ef32632))
- **ms-user-popover:** 修复传入 searchEnum 时一直 loading 无法搜索，增加 searchCode 支持配置可搜索的字段 ([dc93f39](https://github.com/JayTam/antd-ms/commit/dc93f393cabad71a25f8cea90a462300bf154d24))
- **ms-user-popover:** 修复无初始值添加人员报错 ([eeecd4a](https://github.com/JayTam/antd-ms/commit/eeecd4a3db0417be7f5ec059d25b48a7ac086ced))
- **ms-user:** 禁用状态下，弹窗按钮置灰禁用 ([c947380](https://github.com/JayTam/antd-ms/commit/c9473809edf7b9763dafa0466b57e3ea25e3a0cb))
- **ms-user:** 开启 user 组件的请求缓存，解决在 query-filter 人员有初始值时请求触发了两次 ([5f62581](https://github.com/JayTam/antd-ms/commit/5f62581efc6a16e6e48baf2db54a258ed0fa74d9))
- **ms-user:** 修复 MsUser 在 MsTable 的筛选标签中清空之后，MsUser 选择器中值未清空 ([66e5b5f](https://github.com/JayTam/antd-ms/commit/66e5b5f96ad31bd825bd7c7df1ce2a2851c116ae))
- **ms-user:** 修复第一次打开弹窗选择的人员未能正确回显到选择框 ([035e74a](https://github.com/JayTam/antd-ms/commit/035e74ae53c286fd6e14b8cd7eccb00865e06641))
- **ms-user:** 修复获取人员枚举时未默认格式化 ([b22578f](https://github.com/JayTam/antd-ms/commit/b22578fe18f48721f15e0062b89fdad4a8713782))
- **ms-user:** 修复选择多个人员超出弹窗区域 ([3b0fe2b](https://github.com/JayTam/antd-ms/commit/3b0fe2b69c13122ea876485333e4e0bbee8cfb59))
- **ms-user:** 修复只读模式无法正常显示 ([abab578](https://github.com/JayTam/antd-ms/commit/abab57810d16efb75987387dbed5232368f57e85))
- **ms-user:** 优化 label 获取的逻辑 ([bc21f17](https://github.com/JayTam/antd-ms/commit/bc21f17ade9e3f69d3d712ef85d90edbd4820b5c))
- **ms-select:** 修复当多选(mode=multiple)和默认选中第一项(defaultSelectFirst=true)时，value 不应是 array 而不是 string ([6f694bc](https://github.com/JayTam/antd-ms/commit/6f694bc530eca450dd470ebb96761b93a40afc99))
- **ms-text-area:** 修复在编辑表格中的样式问题 ([78eba73](https://github.com/JayTam/antd-ms/commit/78eba73602836168c8f4f5f8acc01d53b4643ee0))
- **use-url-state:** 修复 useUrlState 清空初始值 url 参数没有变化时，targetState 还是合并了初始值，应该不再合并初始值 ([6346146](https://github.com/JayTam/antd-ms/commit/6346146c00f85a1361187b631e5cd301be05536b))

### [2.18.9](https://github.com/JayTam/antd-ms/compare/v2.18.8...v2.18.9) (2024-12-09)

### Bug Fixes

- **ms-instance:** editable 支持禁用和隐藏 ([221554e](https://github.com/JayTam/antd-ms/commit/221554e61ff1d396327aec5a09eb5db38b2d6885))
- **ms-layout:** 菜单增加分组配置 ([0afc581](https://github.com/JayTam/antd-ms/commit/0afc581c66945bb911915fd4ad3d8301c08246a9))

### [2.18.8](https://github.com/JayTam/antd-ms/compare/v2.18.7...v2.18.8) (2024-11-12)

### Bug Fixes

- **resource-tags:** 修复 azone 反查 regionId 异常，azone 是 azoneCode 不是 azoneId ([c3049e4](https://github.com/JayTam/antd-ms/commit/c3049e40b007ca6734587dad9b383c37b3d4a42b))
- **code-editor:** 清除警告信息 ([1f6c71f](https://github.com/JayTam/antd-ms/commit/1f6c71ff10f0cd46ddd1a353232ffb71eae6a708))
- **diff-editor:** 清除警告信息 ([a4aee77](https://github.com/JayTam/antd-ms/commit/a4aee775c290da6dd7ea535b35e9b96919f7d9d4))
- **form-list:** 修复 formList 校验不能动态消失，addValidate 默认关闭 ([0a603fb](https://github.com/JayTam/antd-ms/commit/0a603fbbebe3cc5beb9d07f857d5def4a96a0211))
- **ms-form:** 修复分步表单指示器横向排列会异常换行 ([4b39ad2](https://github.com/JayTam/antd-ms/commit/4b39ad2a3857a20c2145399f19cc70a62e3172e9))
- **ms-form:** 修复分步表单指示器纵向排列布局不对 ([edfe635](https://github.com/JayTam/antd-ms/commit/edfe6357b2aa6cfdf544e2fd9d2dfa33666be723))
- **ms-form:** 修复设置 preserve=false 使用 request 请求初始值，formList 或 formTable 的初始值会被置空 ([657e476](https://github.com/JayTam/antd-ms/commit/657e476b13ff3f08eb1cf5ad12bb62019779ebdf))
- **pagination-select:** 修复分页选择器在多选场景下交互问题，未禁止 select 输入框的输入行为，未禁止自定义下拉面板的键盘事件冒泡 ([acb9ed5](https://github.com/JayTam/antd-ms/commit/acb9ed51c635041ea7e4a19711ba88e681465634))
- **rich-text:** 修复编辑器颜色类弹出层被遮挡 ([a2370cf](https://github.com/JayTam/antd-ms/commit/a2370cf6b7e7a11d54df2f4c0e6e34347b6c5405))
- **select:** 修复 checkbox 禁用能被选中 ([6439f2e](https://github.com/JayTam/antd-ms/commit/6439f2e7527bc5a3ea4692d041c8cad0ab4bc782))
- **switch:** 禁用取消二次确认功能 ([6f04bbb](https://github.com/JayTam/antd-ms/commit/6f04bbb4c8be28b106747dcad70b5ae387182cd6))
- **switch:** 修复未支持 onClick 事件 ([429b9eb](https://github.com/JayTam/antd-ms/commit/429b9eb0551e8301a5c36b41d33d05334279f01d))

### [2.18.7](https://github.com/JayTam/antd-ms/compare/v2.18.6...v2.18.7) (2024-11-05)

### Bug Fixes

- **resource-tags:** 新增 mergeResourceRequestMatrix 支持二维数组场景 ([69c4a27](https://github.com/JayTam/antd-ms/commit/69c4a27269c6d2489e3d741f5a7de0d165e8ef18))

### [2.18.6](https://github.com/JayTam/antd-ms/compare/v2.18.5...v2.18.6) (2024-11-01)

### Bug Fixes

- **resource-tags:** 解析 resourceUrl 当缺失地域从接口中获取，地域关键字由 region 变成为 regionCode ([6946f46](https://github.com/JayTam/antd-ms/commit/6946f461fbd415f04d6013ea782a4f3fc7b24a6d))

### [2.18.5](https://github.com/JayTam/antd-ms/compare/v2.18.4...v2.18.5) (2024-10-28)

### Bug Fixes

- 增加选中背景色的权重 ([6ff01c3](https://github.com/JayTam/antd-ms/commit/6ff01c3564bad88a9531b05c4eb2a98797146779))
- **ms-actions:** ellipse 调整为 ellipsis ([045bcc7](https://github.com/JayTam/antd-ms/commit/045bcc73c048d252244e159b332e7e652054ad85))
- **ms-descriptions:** 详情 titleType 增加 block 类型 ([387bf70](https://github.com/JayTam/antd-ms/commit/387bf70a5fc0d9138fb4a55d0546740aaa82ee79))
- **ms-descriptions:** 修复 titleType 为 block 类型 extra 样式问题 ([2762ecc](https://github.com/JayTam/antd-ms/commit/2762ecccb0aa675a6215efd2c4e4bca22ae08d9f))
- **ms-devops-layout:** 面包屑样式调整，路由匹配失败时清空 key ([8a01cbb](https://github.com/JayTam/antd-ms/commit/8a01cbb21a1900018a66f2e95f1718019f35b8f2))
- **ms-devops-layout-menu:** 优化切换的动态效果 ([d405591](https://github.com/JayTam/antd-ms/commit/d405591957c02ca967f090ced0ccae54736869ed))
- **ms-devops-layout:** 调整菜单 key 匹配的逻辑 ([6b10f38](https://github.com/JayTam/antd-ms/commit/6b10f381135af5def730835978f82e401727eb68))
- **ms-devops-layout:** 调整面包屑的匹配逻辑，修复特定情况下无法匹配成功的问题 ([e60abd9](https://github.com/JayTam/antd-ms/commit/e60abd912fd08fdc57e0658c2c30e4e70ec25acc))
- **ms-devops-layout:** 固定 react-router-dom 中 matchPath 的实现，防止项目上的幽灵依赖导致实际版本与组件库版本不统一 ([efec88c](https://github.com/JayTam/antd-ms/commit/efec88c0f3c8a1c2af9c29d486294c8a6d8b7560))
- **ms-devops-layout:** 删除调试信息 ([1781ced](https://github.com/JayTam/antd-ms/commit/1781ced3bb7c6d570ee7534e214489338077c3fd))
- **ms-devops-layout:** 收起展开时，保持 openKey 一致 ([52d33d3](https://github.com/JayTam/antd-ms/commit/52d33d3b1d900a105da389bb5193655e798d1a06))
- **ms-devops-layout:** 修复缓存 menuKey 的值的拼写 ([3fd457d](https://github.com/JayTam/antd-ms/commit/3fd457d98eccbb0ea20f18f93ae0dd88a91a1c47))
- **ms-devops-layout:** 修复样式可能被覆盖问题 ([bf1cbfb](https://github.com/JayTam/antd-ms/commit/bf1cbfbabfcf4cd076ea85b5cfc8a82d8202ba3a))
- **ms-devops-layout:** 修复折叠时的 menu 展示样式 ([8ce07cc](https://github.com/JayTam/antd-ms/commit/8ce07ccfcb4e0794a01a03fba7f8c2246f4d80c3))
- **ms-devops-layout:** 修复 noNavigate 失败的问题 ([088f87e](https://github.com/JayTam/antd-ms/commit/088f87e7d5b0202c93496345576e791559e4ca16))
- **ms-devops-layout:** 修复 toolTip 配置后的警告 ([13d5817](https://github.com/JayTam/antd-ms/commit/13d5817e4981f42341fbd7a7fdefe29aa2183d63))
- **ms-devops-layout:** breadcrumb 最后一项点击无效 ([d5dd12e](https://github.com/JayTam/antd-ms/commit/d5dd12eaf76534680c3429231671b70fb3cf30b3))
- **ms-devops-layout:** tooltip 仅在 right 模式下设置 padding ([9fd6a00](https://github.com/JayTam/antd-ms/commit/9fd6a001dbdd44467b99b18da4e6092ebe5d57ee))
- **ms-dropdown:** 修复 dropdown.button confirm 可能错位的问题 ([2320aea](https://github.com/JayTam/antd-ms/commit/2320aea5c729aa1ac7ccf94b51844c17333ecddb))
- **ms-dropdown:** 修复 ms-dropdown 在 table 操作面板上可能出现的文字挤压问题 ([987d59b](https://github.com/JayTam/antd-ms/commit/987d59b7abe95f632523e7460783df874ac8d1e9))
- **ms-field:** 修复没在 MsForm 上下文下，无法发送请求 ([0673299](https://github.com/JayTam/antd-ms/commit/067329921d3eb612adac1433546f83f47aed144a))
- **ms-field:** 修复在 labelInValue 时 deepFind 查找 label 错误 ([4fa0dcf](https://github.com/JayTam/antd-ms/commit/4fa0dcfdc1888d7c21a42756edbdb2cb69466475))
- **ms-field:** group titleType 增加 block 类型的样式 ([442f713](https://github.com/JayTam/antd-ms/commit/442f713eb9b9ee1cf5d194ac2b72da8070101c84))
- **ms-form:** 修复引入路径导致的组件报错 ([e725ab0](https://github.com/JayTam/antd-ms/commit/e725ab077830a5007883f025871606e00e3a8bb4))
- **ms-layout:** 修复菜单配置 link 时跳转错误 ([b005fa6](https://github.com/JayTam/antd-ms/commit/b005fa68e6ece20b5de8871a80b29fbaea8e480e))
- **ms-page:** titleType 增加 block 类型的样式 ([7cce424](https://github.com/JayTam/antd-ms/commit/7cce424d57a89e7c8dbd1edd20b09da7298594a6))
- **ms-preset-resource-tags:** 编辑自定义标签限制最多 20 个，筛选不限制 ([78476a4](https://github.com/JayTam/antd-ms/commit/78476a4b9672e12f14c90ac4116c15dbe549429a))
- **ms-preset-resource-tags:** 修复表格列中展示标签存在未考虑预置标签 ([79f775a](https://github.com/JayTam/antd-ms/commit/79f775a882915739a7e426f9fa8e8bb8cc6e0a2b))
- **ms-preset-resource-tags:** 修复空查询异常 ([60d61ff](https://github.com/JayTam/antd-ms/commit/60d61ff6ad96513273755dacfefd9c102d8b7e61))
- **ms-preset-resource-tags:** 修复预置标签筛选无法提交 ([b15e413](https://github.com/JayTam/antd-ms/commit/b15e4133acbcd6049b29e048aeda6bdc17c9b48a))
- **ms-resource-tags:** 完善解析 resourceUrl，当缺失 region 通过接口异步获取 ([3ab6f10](https://github.com/JayTam/antd-ms/commit/3ab6f10aa87680b88a75c4a763b10ba741df0b6b))
- **ms-resource-tags:** 修复埋点事件不触发 ([83aca27](https://github.com/JayTam/antd-ms/commit/83aca27ce674125af047151f809166d3aec09c3a))
- **ms-rows:** 修复导出错误 ([2d28bdf](https://github.com/JayTam/antd-ms/commit/2d28bdf02d0dac82cca65fb7c0e5535e2f75c8c4))
- **ms-status:** 扩展颜色，增加 lightTag 类型 ([16e664b](https://github.com/JayTam/antd-ms/commit/16e664bb1ce61f19434813023b416d1edde2dd91))
- **ms-status:** 文字大小不固定，改成变量 ([835baa6](https://github.com/JayTam/antd-ms/commit/835baa697d098961f3bcc0debc987bcca5d98a8f))
- **ms-status:** 修复 lightTag 时自定义颜色背景色显示错误 ([99386e6](https://github.com/JayTam/antd-ms/commit/99386e69ddae1eaa530f277eebcba7e55478cdd9))
- **ms-status:** 修复 style 被覆盖 ([56fe485](https://github.com/JayTam/antd-ms/commit/56fe48541509000ae17b92192b4d916c32375380))
- **ms-status:** 修改圆点和文本的距离为 8px ([9a6cbca](https://github.com/JayTam/antd-ms/commit/9a6cbca54f4d8c7546ebc972207cd9ffb1d61620))
- **ms-status:** 增加 mini 尺寸 ([9491e36](https://github.com/JayTam/antd-ms/commit/9491e3622a38236cc18e94c51e517f2be08f5c97))
- **ms-status:** 支持不同尺寸 ([7e43a6b](https://github.com/JayTam/antd-ms/commit/7e43a6bbdcad400acbf32ecb4e4d40b6f1a1a9f9))
- **ms-svg:** 修复控制台告警 ([a90ce22](https://github.com/JayTam/antd-ms/commit/a90ce22c988698074485614bd8a4813701f4eedb))
- **ms-table:** 聚合筛选器中，search 和 filters 是互斥，只能同时存在一个 ([fdef56e](https://github.com/JayTam/antd-ms/commit/fdef56e099fa7ba98b57b983fed29c28d5459547))
- **ms-table:** 普通表单字段有请求过渡效果，筛选标签无请求过渡效果 ([6080573](https://github.com/JayTam/antd-ms/commit/608057365978b8a9be85f1846ed86d648000be89))
- **ms-table:** 筛选标签不显示 MsStatus 状态 ([47752c2](https://github.com/JayTam/antd-ms/commit/47752c218aa734375c57ab4072d87c9a2831c70f))
- **ms-table:** 筛选标签兼容 select 选择器 mode=tags 场景 ([66a939c](https://github.com/JayTam/antd-ms/commit/66a939cb76df2f7c43463434ed1f7b164d84cd9f))
- **ms-table:** 完善聚合筛选器对 checkbox 类型的支持 ([ec7283f](https://github.com/JayTam/antd-ms/commit/ec7283f617bc19e7468855091da81f7c45cabf04))
- **ms-table:** 修复 aggr 类型标签筛选标签无法清除单项 ([4d1b145](https://github.com/JayTam/antd-ms/commit/4d1b145ef3916917072354a6471e582a74c3d2d0))
- **ms-table:** 修复 borderedHead 不生效 ([9bf3091](https://github.com/JayTam/antd-ms/commit/9bf30913eb1c2f758d78a21e8f72bc3b390d0e0d))
- **ms-table:** 修复 filter 模式下，不应该出现资源筛选 ([e7e84fd](https://github.com/JayTam/antd-ms/commit/e7e84fd729bf3fd897d809ff86087e85a5d2571b))
- **ms-table:** 修复 query-filter 不支持联动查询 ([fd964bf](https://github.com/JayTam/antd-ms/commit/fd964bf83b7981c0e71804c48a6bfae4009b15f7))
- **ms-table:** 修复 search.showNumberInQueryFilter 对于筛选标签没生效 ([6800224](https://github.com/JayTam/antd-ms/commit/68002249eec53d2ed839c5771cc0aadbf6b13f89))
- **ms-table:** 修复编辑表格和批量操作公用会报错 ([fb01ec5](https://github.com/JayTam/antd-ms/commit/fb01ec595ef9de8f1718b7831ccedbd0dd37e48a))
- **ms-table:** 修复编辑表格取消之后，表单状态没有还原 ([242b4b9](https://github.com/JayTam/antd-ms/commit/242b4b9baedde787c4f8ac4887f3a269698582eb))
- **ms-table:** 修复编辑表格无法实现合并表格列 ([c418ac1](https://github.com/JayTam/antd-ms/commit/c418ac1d6a4af274daeb48f5517d6daadae49909))
- **ms-table:** 修复编辑表格展开功能失效 ([c19f9ee](https://github.com/JayTam/antd-ms/commit/c19f9ee5ddfef74d99d0d0adc9f4dd9a2460c119))
- **ms-table:** 修复表格多选切换分页时选中状态丢失 ([3c6c65e](https://github.com/JayTam/antd-ms/commit/3c6c65ee5fed16930e59ab6c9875036675bb319b))
- **ms-table:** 修复表格选择未显"已选中 x 项"，切换下一页时已选中项会被清空 ([6b58476](https://github.com/JayTam/antd-ms/commit/6b58476920af8c068809768f10f0a2fa03daa1ff))
- **ms-table:** 修复表头分组的 tooltip 失效 ([42b7e05](https://github.com/JayTam/antd-ms/commit/42b7e05525fd5bd0ea87a1f9b5358a14e5cecac7))
- **ms-table:** 修复表头筛选配置 column.filterMultiple 不生效 ([13b9b3d](https://github.com/JayTam/antd-ms/commit/13b9b3dd8dbbcf7003376c17719f4aa7208e4d28))
- **ms-table:** 修复代码合并导致 filteredViewRender 功能丢失 ([08e0438](https://github.com/JayTam/antd-ms/commit/08e0438ec837dc4fb5d39d45f2e70e37d977e992))
- **ms-table:** 修复当设置 column.defaultSortOrder，用户无法操作到取消排序 ([c5fcf81](https://github.com/JayTam/antd-ms/commit/c5fcf81c4cd5880030fc134954c4b7a5542d223f))
- **ms-table:** 修复当设置默认升序时，再取消排序，接口请求还是发送了排序参数 ([8db6b06](https://github.com/JayTam/antd-ms/commit/8db6b0642e6a1384f82d282d75bcd274c33f91f7))
- **ms-table:** 修复聚合筛选器中 request 缓存失效 ([365d274](https://github.com/JayTam/antd-ms/commit/365d274a7168d71d18fba5993fc7f2e7e2662ea5))
- **ms-table:** 修复批量操作自定义 selectKeys 时，选中 x 项的状态无法更新 ([2a01acb](https://github.com/JayTam/antd-ms/commit/2a01acb6674d97272ecac9055ad770ada6b9aeec))
- **ms-table:** 修复筛选标签不应该出现骨架屏 ([a6617ad](https://github.com/JayTam/antd-ms/commit/a6617ad68b3d216135e2e613a60c4b9d0f8f6d61))
- **ms-table:** 修复筛选标签不支持预置标签展示 ([6de388e](https://github.com/JayTam/antd-ms/commit/6de388ed143a56e07a1877ca552b107c26679928))
- **ms-table:** 修复筛选标签透传了无用的 copyable, editable 等属性 ([0975253](https://github.com/JayTam/antd-ms/commit/09752530883dd7d9ea62b72a89d00dcaf575f4f1))
- **ms-table:** 修复筛选标签在预置标签组件的问题 ([d5bc802](https://github.com/JayTam/antd-ms/commit/d5bc802c53646c6d75b14ae6d89de40c05041a59))
- **ms-table:** 修复设置默认排序，无法切换 ([a8ac79b](https://github.com/JayTam/antd-ms/commit/a8ac79b9d540d593165ce3f272a490a35b1b5b34))
- **ms-table:** 修复输入的表头筛选 placeholder 异常 ([c90f67e](https://github.com/JayTam/antd-ms/commit/c90f67ea4b298fc711f0f29946de756f2e3ec0ab))
- **ms-table:** 修复树形数据收起问题 ([40b2b61](https://github.com/JayTam/antd-ms/commit/40b2b618969f4c6135aa0887beb78805b1cfa35d))
- **ms-table:** 修复树形数据异步加载场景的问题 ([ecae525](https://github.com/JayTam/antd-ms/commit/ecae5251dc9d593474351b35993a149248c7156a))
- **ms-table:** 修复树形数据折叠时，未递归取消子项的选中状态 ([bfa1db5](https://github.com/JayTam/antd-ms/commit/bfa1db522ec117478ac06a015333339941dc688a))
- **ms-table:** 修复因代码合并导致的标签筛选功能异常 ([2c9c791](https://github.com/JayTam/antd-ms/commit/2c9c791ecd92a584322f6a00ebb0930c8e6b2577))
- **ms-table:** 修复重构分页器丢失了当前页码状态 ([e0963cf](https://github.com/JayTam/antd-ms/commit/e0963cfd6e792732acaf5932bbb0ae9771657fae))
- **ms-table:** 修复 aggr 存在初始之值，清空之后重新搜索会再次出现 ([6543786](https://github.com/JayTam/antd-ms/commit/6543786c406eb316faa22f543d0dd61c551a6946))
- **ms-table:** 修复 aggr 的资源标签输入就会提交 ([b73844d](https://github.com/JayTam/antd-ms/commit/b73844dddc4b6e24420fe187f03f8ea66205d748))
- **ms-table:** 修复 aggr 聚合筛选器，点击搜索 icon 没有清空输入值 ([93b2045](https://github.com/JayTam/antd-ms/commit/93b20454f658aa9e3e67c3eb2dffa2c235d98d03))
- **ms-table:** 修复 aggr 类型的时间类型的初始值报错 ([c86fa55](https://github.com/JayTam/antd-ms/commit/c86fa5514328d9a73cc5f7051ebcbabae89a45a6))
- **ms-table:** 修复 aggr 模式下，标签筛选未能触发 ([4d25c36](https://github.com/JayTam/antd-ms/commit/4d25c360b4c08de33403d99583eb32de21bfed2a))
- **ms-table:** 修复 aggr 筛选类型的警告 ([27efcf8](https://github.com/JayTam/antd-ms/commit/27efcf840796dbbbeb1016a4a3c3918aae7bcca3))
- **ms-table:** 修复 aggr 提交按钮和筛选标签清空配合问题 ([1891a0f](https://github.com/JayTam/antd-ms/commit/1891a0feaf37bff172af0abfb6c2fcdad3910a61))
- **ms-table:** 修复 column.fieldReadRender 对于重写筛选标签无效 ([26dcaf8](https://github.com/JayTam/antd-ms/commit/26dcaf8a0a125ccd2b6671da0ac48cd5677a685f))
- **ms-table:** 修复 column.tableTitle 不生效 ([780b6bd](https://github.com/JayTam/antd-ms/commit/780b6bdf5e3c000c1bfb57fb911182609f8c6d75))
- **ms-table:** 修复 filter 中某个字段设置了时间初始值，但 query 中没设置，会报错 ([cc220c3](https://github.com/JayTam/antd-ms/commit/cc220c3c44cc58cfc6641e0a9eb499af37af8c97))
- **ms-table:** 修复 filter 中某个字段设置了时间初始值，但 query 中没设置，会报错 ([d7b4877](https://github.com/JayTam/antd-ms/commit/d7b4877700c6a44738adf6c31605fb1cc9e48f5d))
- **ms-table:** 修复 light-query 的搜索按钮无法触发表格筛选 ([46bd0e6](https://github.com/JayTam/antd-ms/commit/46bd0e650f1accfb92b6776612b067576b753256))
- **ms-table:** 修复 query-filter，选择类组件未自动触发搜索 ([aeedc01](https://github.com/JayTam/antd-ms/commit/aeedc0180ac3d6a067165f1051eb047ee04eeead))
- **ms-table:** 修复 query-filter 类型中，仅 query 区域的选择器变更才触发搜索 ([ab6ad98](https://github.com/JayTam/antd-ms/commit/ab6ad98063b8b0b0132039a1717b1c8a28800d04))
- **ms-table:** 修复 query-filter 筛选类型中 query 区域的表单项无法重写 onSearch 方法 ([c1f4d45](https://github.com/JayTam/antd-ms/commit/c1f4d45b4aa14d665983f08359df247a6fde2fe6))
- **ms-table:** 修复 query-filter 在关闭 syncToUrl 时，多选的筛选标签不能自动清空 ([c8faa28](https://github.com/JayTam/antd-ms/commit/c8faa284ccfd9c1ba7dfe3a1aede088f0b1d6a04))
- **ms-table:** 修复 selectionButtonsRender 第一个参数无默认值[]，可能引起使用者访问属性报错 ([b7d0f91](https://github.com/JayTam/antd-ms/commit/b7d0f91eda2213aaf78273913994190bb704169f))
- **ms-table:** aggr 下拉限制高度 256px ([2a79d67](https://github.com/JayTam/antd-ms/commit/2a79d6713e9938b09923a0d1141706281349126b))
- **ms-table:** aggr 筛选器，预置标签不应该出现在高级筛选中 ([b140997](https://github.com/JayTam/antd-ms/commit/b140997bfa8b617731c52e06efb383219d1b72e3))
- **ms-table:** light-query-right 类型，当没有菜单时，筛选项靠左 ([4ac73d1](https://github.com/JayTam/antd-ms/commit/4ac73d1a61d8fc9398773d1b140f6147271c488a))
- **ms-table:** titleType 增加 block 类型 ([3d2a84f](https://github.com/JayTam/antd-ms/commit/3d2a84ff78cb7668725e22f155172c3035a1f867))
- **ms-tabs:** 修复非 antd 中 tabs 类型时，缓存不是最新的问题 ([57aaf91](https://github.com/JayTam/antd-ms/commit/57aaf91c6d972be4d2025dde2f2f32c2a25eaf4d))
- **resource-tags:** 修复解析 resourceUrl 忽略了 resourceMetadata ([22478c5](https://github.com/JayTam/antd-ms/commit/22478c5f7427db7d14daa83bf380b5f2660d1d98))
- **resource-type:** 修复 setTimeout 延迟清空选项未考虑 clearSetTimout 导致的异常 ([219999b](https://github.com/JayTam/antd-ms/commit/219999be1a5cadf6a7a18db56a90a335a0a6e208))
- **resource-type:** 修复和完善资源类型组件小问题 ([8c7511e](https://github.com/JayTam/antd-ms/commit/8c7511ebbd8e5cd94133af8830473c299f202d7c))
- **resource-type:** 修复首次点击资源类型报错 ([e62656d](https://github.com/JayTam/antd-ms/commit/e62656d2dfb624ee158ae6666eebd0c07aceeb38))
- **upload:** 修复配置 showUploadList 后未显示删除按钮 ([da35592](https://github.com/JayTam/antd-ms/commit/da35592613571d9dfdf1869273cc096a0fa49fee))
- **upload:** 修复上传组件在 msForm 设置为 read 只读状态时无数据点击却省图仍然能上传附件 ([636504a](https://github.com/JayTam/antd-ms/commit/636504ad927dcdf2ec905788e333d7b2219d6f14))
- **upload:** 只读模式无数据时显示缺省图 ([be41e7f](https://github.com/JayTam/antd-ms/commit/be41e7ff91b31f09574e0621a38cd70480e65354))
- **user-popover:** 解决警告 ([d6a5f41](https://github.com/JayTam/antd-ms/commit/d6a5f418e6ec1a5fa874f0eb3e73bd8214c4a667))
- **user-popover:** 人员详情的姓名添加复制功能 ([6f96a86](https://github.com/JayTam/antd-ms/commit/6f96a86bf57d152fa066e2c03367762c76b5b440))
- **user-popover:** 姓名超出部分显示省略号，优化编辑状态自动折叠逻辑 ([a477c8d](https://github.com/JayTam/antd-ms/commit/a477c8daffbbd42bc0d0124163968c841e98327b))
- **user-popover:** 修复在 table 中使用未显示折叠按钮 ([7b859ff](https://github.com/JayTam/antd-ms/commit/7b859ffc1db2fc527a3aae308b663ea4074f33aa))
- **user-popover:** 修复 initialValue 有值 form 提交被清空 ([e35bc1f](https://github.com/JayTam/antd-ms/commit/e35bc1f158311002272913823b61f4619d571f9e))
- **user-popover:** 优化列表中自动计算折叠的数据，修复列表数据更新后显示未更新 ([fd7d3ff](https://github.com/JayTam/antd-ms/commit/fd7d3ff81e37145827e5e29788b32450f279d90a))
- **user-popover:** 优化人员详情展示内容，无值时不展示对应的 label ([6103fa5](https://github.com/JayTam/antd-ms/commit/6103fa54e3884c8717024b17d4ed3e5de23c4b04))
- **user-popover:** 优化样式，只有详情浮窗的姓名才显示 14px ([28d331c](https://github.com/JayTam/antd-ms/commit/28d331cca46cc30165690a8026d1e03e8b931edf))
- **user-popover:** userShow 增加 key 修复告警 ([a1282a3](https://github.com/JayTam/antd-ms/commit/a1282a3df5e321504afd1f79e39dfa16a0b09cdc))

### [2.18.1](https://github.com/JayTam/antd-ms/compare/v2.18.0...v2.18.1) (2024-07-25)

### Bug Fixes

- **ms-descriptions:** 修复必填校验标识不应该在描述列表中展示 ([40520cc](https://github.com/JayTam/antd-ms/commit/40520cc88c958f550c8c6b18bef9361159c058e3))
- **ms-field:** 修复 autoSelect=first，可选项变更时并当前有选中值时，没有触发选中第一项 ([0e8bbe5](https://github.com/JayTam/antd-ms/commit/0e8bbe50b55b487052647c72e661f92ae59ca2ea))
- **ms-field:** 修复 valueEnum 或 request 为数组时，可选项的 value 为空会产生白屏报错 ([1651d9b](https://github.com/JayTam/antd-ms/commit/1651d9b65867f945e79f1ee0ce579ee4495a32f2))
- **ms-field:** 优化富文本编辑器只读模式 ([4ce1ec1](https://github.com/JayTam/antd-ms/commit/4ce1ec1510577506e430ff8124344df00544b87c))
- **ms-field:** 优化 richText 取消 getHtml 默认内容 ([e3b69f4](https://github.com/JayTam/antd-ms/commit/e3b69f4caf6b1e2eb06c8e5119383372e4ec60e5))
- **ms-field:** 优化 Upload 头像上传样式 ([3699357](https://github.com/JayTam/antd-ms/commit/3699357f76468f3d97d680785a954ab83db77d75))
- **ms-field:** upload 增加 onFileChange 方法 ([5d87e4e](https://github.com/JayTam/antd-ms/commit/5d87e4e204fff8e95905b45e792aa074a576c771))
- **ms-form:** 表单提交时排除 File 类型转换 ([766d10e](https://github.com/JayTam/antd-ms/commit/766d10e1a437d4d16093f6a8bc4a3fcfdfc747d4))
- **ms-form:** 剔除私有属性值时排除文件类型 ([cff68f6](https://github.com/JayTam/antd-ms/commit/cff68f6aaf6ded4a8c1c9fce9eba24a21f694ef5))
- **ms-page:** 修复 titleStatusColumn 不支持数字 ([28ef8f0](https://github.com/JayTam/antd-ms/commit/28ef8f0455614cc658580d1e897e4f449ef3ab93))
- **ms-resource-tags:** 优化标签筛选未输入键进行搜索，回显了 undefined ([62d82b1](https://github.com/JayTam/antd-ms/commit/62d82b1560c330c7ca92cb5c56d478aff83a9fe3))
- **ms-resource-tags:** 优化资源标签筛选，标签键必填 ([337c67a](https://github.com/JayTam/antd-ms/commit/337c67aac4fd45327f1c33d5f0eb5f2984453142))
- **ms-table:** 修复刷新会清空 selection，toolbar.reload 和 actionRef.reaload 支持配置 ([aebf7be](https://github.com/JayTam/antd-ms/commit/aebf7bee45ddbf10a44338fdac467f601fd194cf))
- **ms-table:** 修复 column.hideInTable 初始化隐藏，再动态更变更为显示，界面没有正常刷新 ([5b4545c](https://github.com/JayTam/antd-ms/commit/5b4545c66a2db40503f2997f6d2510065d877e27))

## [2.18.0](https://github.com/JayTam/antd-ms/compare/v2.17.0...v2.18.0) (2024-07-08)

### Features

- 按需引入大体积的包 ([f5eee80](https://github.com/JayTam/antd-ms/commit/f5eee80741372e2dcf0adece6b406e77789edd17))
- **digital:** 支持 controls=false 关闭控制器 ([f67c5ac](https://github.com/JayTam/antd-ms/commit/f67c5ac716eb7d08c4bc0bc919d8797f949438d7))
- **ms-descriptions:** 实现基于 ValueEnum 中的 status 渲染 MsStatus 样式的状态 ([c3ce49f](https://github.com/JayTam/antd-ms/commit/c3ce49fb5518b56e506aadf12ecb939ef69531c8))
- **ms-drawer:** 新增 extraContentRender ([da2eedc](https://github.com/JayTam/antd-ms/commit/da2eedc825cbde5bc50cc2b237d2f6f13f4bec0f))
- **ms-field:** 完善默认选中第一项逻辑，对各种组件都支持 ([c55497c](https://github.com/JayTam/antd-ms/commit/c55497c408c4284a306f5b30f5536516c237ce8b))
- **ms-field:** 优化 select,cascader,treeSelect 三个组件在存在初始值请求可选项时，隐藏初始值 ([7db8339](https://github.com/JayTam/antd-ms/commit/7db83395ce391bf4e15fb11bf820ea620e7bf5b8))
- **ms-form:** 表单必填提示信息，根据组件类型设置不同的默认提示消息模板 ([9e313d5](https://github.com/JayTam/antd-ms/commit/9e313d5f00b8c68460a7437dd1d54781b5c48ae1))
- **ms-form:** 实现 ModalStepForm 和 DrawerStepForm 的 current 可在组件外控制 ([140cd10](https://github.com/JayTam/antd-ms/commit/140cd10a4fbe309c65c8d8fafde728dbd9fd7d69))
- **ms-form:** 支持组件外部控制分步表单步数 ([c8e67c7](https://github.com/JayTam/antd-ms/commit/c8e67c7dbd15205bf6f53f75a705fc30216ee329))
- **ms-layout:** 导出 MsLayout.useLayout 方法 ([a543feb](https://github.com/JayTam/antd-ms/commit/a543febfcb95376d697131f6d6c86ba09114792e))
- **ms-page:** 新增 tabItem.link 和 tabItem.onLink 用于配置标签页链接跳转 ([bc3f4be](https://github.com/JayTam/antd-ms/commit/bc3f4be4c1bbe6845e83d8db4f20baf0c3b10d0d))
- **ms-page:** 新增 titleStatus 和 titleStatusColumn，便于配置标题状态 ([81a873f](https://github.com/JayTam/antd-ms/commit/81a873f6bd24e9977307f8774efaadee2d1d8b92))
- **ms-resource-tags:** 标签键和值都限制最长 64 位 ([cda2d35](https://github.com/JayTam/antd-ms/commit/cda2d3518c030536ee76f18478ec881e1292a0a1))
- **ms-select:** 初步优化带初始值加载 options 过渡效果 ([e7a2e93](https://github.com/JayTam/antd-ms/commit/e7a2e93f000c34f56de5db3b50e734bdf290d521))
- **ms-table:** 新增 backendTableSortFilter 用于关闭后端排序和表头筛选 ([cf39455](https://github.com/JayTam/antd-ms/commit/cf394556fdf714f92a1eb8c4f1413efcca8e52a3))
- **ms-table:** 新增 column.showLabelWhenQuery 控制 label 显示 ([b4deef4](https://github.com/JayTam/antd-ms/commit/b4deef40b0c75a5c8727b40e6547b6874a359f46))
- **ms-table:** 新增 filteredViewRender，在表格和表单之间插入节点 ([a852c6a](https://github.com/JayTam/antd-ms/commit/a852c6a2c4711d7d33cf102325f10f0a89406191))
- **ms-table:** 新增 pagination.afterChange 事件，用于监听分页 ([e63c441](https://github.com/JayTam/antd-ms/commit/e63c441b305caa77d1fa4fb7ed3c6accfa5830e2))
- **ms-table:** 优化 selectQuery 默认选中存在初始值的项 ([9613865](https://github.com/JayTam/antd-ms/commit/96138652ec99b5ee1d4b627f9a97340bc9fa24b1))
- **ms-table:** 子容器支持 titleType 修改标题样式 ([88e6053](https://github.com/JayTam/antd-ms/commit/88e6053d00d29d3dcef0335fae90236d184f96c3))
- **ms-table:** syncToUrl 只编码 value ([3168619](https://github.com/JayTam/antd-ms/commit/3168619e7f2ddc5e610a624e7235b9a1a1823778))

### Bug Fixes

- **flavor:** 实例规格方法增加容错处理 ([63ec9be](https://github.com/JayTam/antd-ms/commit/63ec9beb96a27ad238810109c8e413f68c3886bf))
- **form-list:** 修复表单不能换行 ([63a36ee](https://github.com/JayTam/antd-ms/commit/63a36ee65694e77706781b81c54a7d29f73539d4))
- **form-list:** 优化样式宽度较窄也不换行 ([78d45e8](https://github.com/JayTam/antd-ms/commit/78d45e81e023a6b05fcde91223892df3ed01a455))
- **ms-actions:** 修复自定义 style 会破坏布局 ([9e87ed8](https://github.com/JayTam/antd-ms/commit/9e87ed8a862fbe702f30bd37b3ad787d4a2e291e))
- **ms-confirm:** 优化内容区域文字换行 ([9b95644](https://github.com/JayTam/antd-ms/commit/9b95644e6dc816ca4d2964ed6b691027058d471e))
- **ms-descriptions:** 修复不需要的 error 提示 ([2e56a4c](https://github.com/JayTam/antd-ms/commit/2e56a4c9a28528655d120814c5e9d3ca2875a758))
- **ms-field:** 更新上传组件文档 ([045d92d](https://github.com/JayTam/antd-ms/commit/045d92dc06b3f5b972a966d4c7711e2c29a96a97))
- **ms-field:** 更新 switch 组件文档 ([666c5bb](https://github.com/JayTam/antd-ms/commit/666c5bb06fbae8259f19c038f56b691e2102b8cc))
- **ms-field:** 文本编辑器增加默认值，是否显示工具栏，标题目录 demo ([1c86bab](https://github.com/JayTam/antd-ms/commit/1c86bab16f548f62bc36652aae720cca3e5574fe))
- **ms-field:** 文本编辑器增加 editorChange 配置 ([530a0dc](https://github.com/JayTam/antd-ms/commit/530a0dca90a3c1d1364fe45ed1b509b99dabd46b))
- **ms-field:** 文本编辑器增加 onCreated 方法 ([bfb5446](https://github.com/JayTam/antd-ms/commit/bfb5446d25f726db8b3b4e8df50c77b69c35169d))
- **ms-field:** 修复偶现白屏报错 ([272047f](https://github.com/JayTam/antd-ms/commit/272047fa30cecf3cdeeacca44f19ca270fbc5d17))
- **ms-field:** 修复选择类组件，在设置 valueEnum 情况下，defaultSelectFirst 不生效 ([1fce71d](https://github.com/JayTam/antd-ms/commit/1fce71d4b6a32b5a63add80bf15736efd25ab5f4))
- **ms-field:** 修复 labelInValue 变更可选项时，无法清空可选项 ([97e6cf1](https://github.com/JayTam/antd-ms/commit/97e6cf1ffe26345870018b34911dae79fe02bffa))
- **ms-field:** 修复 MsField 未传 valueType 属性 ([a08962d](https://github.com/JayTam/antd-ms/commit/a08962d4118fb51452daec3edc667ee20a8e39eb))
- **ms-field:** 修复 select 全选时点击空白处未生效 ([b8a50a4](https://github.com/JayTam/antd-ms/commit/b8a50a49c51a06b4d71fc9a6065126ba6f125629))
- **ms-field:** 修复 select 全选时在 MsTable 的 filter 模式下无法打开下拉选项 ([3519508](https://github.com/JayTam/antd-ms/commit/3519508460bfd8bc8e7ba062a70558d5be2489a5))
- **ms-field:** 修复 switch 传入 value 时未变成受控组件 ([3b65353](https://github.com/JayTam/antd-ms/commit/3b65353cb0a8b634421a55cb73f7cdc4aad6c68e))
- **ms-field:** 修复 user 多选时弹窗内容无法回填 ([aa58cba](https://github.com/JayTam/antd-ms/commit/aa58cba463b9410d05183cc2f8f34778dde3c095))
- **ms-field:** 修复 user 在选择项超长情况下，select 框占用了按钮位置 ([13d2b0e](https://github.com/JayTam/antd-ms/commit/13d2b0e20f3e46b3c66dcdb8eab4a46abed47444))
- **ms-field:** 优化 userGroup 样式 ([49121b0](https://github.com/JayTam/antd-ms/commit/49121b037d57b89d80f57defdf16ad50d079f33f))
- **ms-field:** 优化 userPopover 在 table 中使用 tooltip 被覆盖，支持 tooltipProps ([9dc9e6e](https://github.com/JayTam/antd-ms/commit/9dc9e6edfae271d76e11a7e026ef6c30e983895c))
- **ms-field:** select 全选，options 没数据时，不展示全选按钮 ([ddaa263](https://github.com/JayTam/antd-ms/commit/ddaa263a0b7b775eaeab046bb10669f1ece9445d))
- **ms-field:** select 全选空白时支持选中，优化样式 ([0d8f810](https://github.com/JayTam/antd-ms/commit/0d8f8104d7a470f5d304b5eaf48720271aaedc35))
- **ms-field:** select 增加下拉全选/反选功能 ([0814c9b](https://github.com/JayTam/antd-ms/commit/0814c9b71ef3da8312e75cddf404ac1eadf8baa9))
- **ms-field:** select 增加支持全选能力 ([c650daa](https://github.com/JayTam/antd-ms/commit/c650daae6232a1c848040a2ca14c10ac449d7637))
- **ms-field:** userGroup 所有选项点击整行对复选框生效 ([312fff6](https://github.com/JayTam/antd-ms/commit/312fff654d97e8aa281b49d92f75ad88d71b2658))
- **ms-field:** userGroup 修改已选样式 ([38d6aaf](https://github.com/JayTam/antd-ms/commit/38d6aaf79629b67ba3157752e558d623c4cfa41e))
- **ms-field:** userGroup 增加搜索字段配置 ([9a099ac](https://github.com/JayTam/antd-ms/commit/9a099ac0176300b22307eedb37fab48faa7e9ab2))
- **ms-field:** userGroup 支持最大可选择个数 ([56f3a47](https://github.com/JayTam/antd-ms/commit/56f3a477b8b4af1b26078279feb57bf743d1a6de))
- **ms-form:** 补充自动选择单测用例 ([ee0385b](https://github.com/JayTam/antd-ms/commit/ee0385ba47f77231d3e654d4fd5825649d53b6dc))
- **ms-form:** 调整所有组件默认 placeholder 格式 ([1f1ec55](https://github.com/JayTam/antd-ms/commit/1f1ec55583b19781959cce3cdf79deb121e22290))
- **ms-form:** 修复 fieldProps.placeholder 重写是会自动添加"请输入" ([76a6ea7](https://github.com/JayTam/antd-ms/commit/76a6ea72083e13f41d6de3ea9716560d74bca3fd))
- **ms-form:** 修复 initialValues 优先级应该比 request 低 ([2787cfd](https://github.com/JayTam/antd-ms/commit/2787cfdc5b5175bf1506105f6c1dc98cbda8a5ad))
- **ms-form:** 修复当 fieldProps.changeOnSelect 只触发一层自动选择 ([a8c118e](https://github.com/JayTam/antd-ms/commit/a8c118e1f188ddd58049eab962ce856e141429de))
- **ms-form:** 修复当异步请求可选项并设置初始值的情况下，异步请求之后不应该触发自动选择 ([c6caf59](https://github.com/JayTam/antd-ms/commit/c6caf59a58fe938e79f0977b1da4ee9a7b7cf4fa))
- **ms-form:** 修复多选 defaultSelectFirst 缺陷 ([598360b](https://github.com/JayTam/antd-ms/commit/598360ba24de4e8a07a15f44ade7ee31b6272554))
- **ms-form:** 修复多选的表单项 defaultSelectFirst 未递归选择 ([c20a4a4](https://github.com/JayTam/antd-ms/commit/c20a4a4a08249335bfb2ed3adc81c90c6b4b58d7))
- **ms-form:** 修复分步表单计步器没有初始值 ([f54bb97](https://github.com/JayTam/antd-ms/commit/f54bb9764285e5a5c9383523c2fd98e14774019f))
- **ms-form:** 修复无用属性透传到 Form 的警告 ([7d6165b](https://github.com/JayTam/antd-ms/commit/7d6165b33289d087bb1c4bc3303fea5cb46ef6a8))
- **ms-form:** 修复选中第一项可选项为空时报错 ([f4a1956](https://github.com/JayTam/antd-ms/commit/f4a1956e18c5821dddc4842a1e7452d9893d455e))
- **ms-form:** 修复 column.formItemProps 为函数时，column.initialValue 不生效 ([236e079](https://github.com/JayTam/antd-ms/commit/236e07931917e355b4fd9d7526e8ff4cb5262448))
- **ms-form:** 修复 formList 的第二项数据，依赖禁用异常 ([413171a](https://github.com/JayTam/antd-ms/commit/413171aaa415df8cf511ce25b8f6afc4fbfaa3a7))
- **ms-form:** 修复 rules 报错 ([34ac001](https://github.com/JayTam/antd-ms/commit/34ac00179476193074b8dccdef8b61c819a8ec07))
- **ms-form:** 修复 StepForm 初始化 request 无效 ([d554e9b](https://github.com/JayTam/antd-ms/commit/d554e9b429532f46c67c59b082d43231e4501127))
- **ms-form:** 优化表单列表，当删除时选择器组件会闪烁 ([3f837c6](https://github.com/JayTam/antd-ms/commit/3f837c665747c42e0737a7bb847cb0d35aaab2fc))
- **ms-form 增加默认分页步骤:** ms-form 增加默认分页步骤 ([de9b836](https://github.com/JayTam/antd-ms/commit/de9b836fc0649b780513976d07e3b272f9ccf9cd))
- **ms-form:** ms-form 传入分步支持自动切换步骤 ([4191c01](https://github.com/JayTam/antd-ms/commit/4191c01ca35ffe0516a21b6d78eb54c469eb1e6a))
- **ms-form:** ms-form 修复步骤为 0 不能跳转 ([b287f24](https://github.com/JayTam/antd-ms/commit/b287f243e1bb56cd68c10181c6c4dc309c49abf5))
- **ms-form:** msDrawerStepsForm 支持 nextBtnProps 和 prevBtnProps ([804d1d3](https://github.com/JayTam/antd-ms/commit/804d1d35a488f58c98662edf74101902d472430d))
- **ms-form:** selectQuery 支持 customPlacehoder,placeholder 已请输入开头则不加请输入 ([38c5246](https://github.com/JayTam/antd-ms/commit/38c5246d59be22aabf845900288ff4cfffa8a63b))
- **ms-instance:** 实例跳转时增加 sessionStorage ([cfe22aa](https://github.com/JayTam/antd-ms/commit/cfe22aa890422c5f05e06e45b6e91538cf8cac11))
- **ms-instance:** 跳转时取消调用 setSessionToPage ([f0e5d3f](https://github.com/JayTam/antd-ms/commit/f0e5d3fd77cc9b2c8c8dbec70bb22c58d87acca0))
- **ms-instance:** 消除未设置 key 的警告 ([b5e2746](https://github.com/JayTam/antd-ms/commit/b5e2746ebc908ab88423e5ac85e9247199e029a0))
- **ms-instance:** 修复自定义跳转时执行了 to 为空的跳转 ([35addf0](https://github.com/JayTam/antd-ms/commit/35addf0fac7e61e772a721e1eef0a3fb2d0912ae))
- **ms-instance:** 修复 link 没有配置跳转链接时报错 ([1ec72e3](https://github.com/JayTam/antd-ms/commit/1ec72e33325e52365947a697dec853f110293b64))
- **ms-instance:** 修改案例说明 ([e4aef80](https://github.com/JayTam/antd-ms/commit/e4aef801c1c13943504468d3117d1109073f2777))
- **ms-instance:** 增加跳转到 MsPage 时需设置的 sessionStorage 方法，修改实例组件跳转方式 ([79cfa10](https://github.com/JayTam/antd-ms/commit/79cfa107095d80880a195a09ecf6c04fab4e2f53))
- **ms-instance:** 增加 showActionWhenDisabled 实现 title 禁用时是否显示按钮 ([67591ff](https://github.com/JayTam/antd-ms/commit/67591ffc38ab3b9de75cad7022c7eda88b7bb89f))
- **ms-instance:** title 禁用时，不显示省略 ([f78b24b](https://github.com/JayTam/antd-ms/commit/f78b24b369764bd1f7092dfba55e578c726caefd))
- **ms-layout:** 修复初始化时没有二级菜单未展开 subMenu ([d6c036e](https://github.com/JayTam/antd-ms/commit/d6c036e5d3d05e8437fc7458ed46dbc9dad473ac))
- **ms-layout:** 修复一级菜单有 subMenu 并且有二级菜单时，关闭 subMenu ([cc8a00c](https://github.com/JayTam/antd-ms/commit/cc8a00c58b3549298de6dc0ec932022b7823c8dd))
- **ms-layout:** 修复 onOpenChange 未能正常打开关闭 ([0719877](https://github.com/JayTam/antd-ms/commit/0719877b7a15ecb43bc06f42f7b013238905ce6f))
- **ms-layout:** 优化面包屑方法，context 增加面包屑数据用于详情页返回 ([1733ec8](https://github.com/JayTam/antd-ms/commit/1733ec8d2ccfe2e32c760eba089582467941911b))
- **ms-page:** 兼容 react-router v5 和 v6 版本的 location 的 key ([f8e0d3d](https://github.com/JayTam/antd-ms/commit/f8e0d3d21d6080f8aacc6d2beff3312d557e0df2))
- **ms-page:** 取消返回逻辑 ([6afe073](https://github.com/JayTam/antd-ms/commit/6afe073657b63dd4d7517d84aea438bed8812a4e))
- **ms-page:** 去掉 document.referrer 判断返回 ([22c3785](https://github.com/JayTam/antd-ms/commit/22c3785c7dc59300243e7199d54929bedc3f2d7f))
- **ms-page:** 修复 tabs 切换到外链 active 状态不应该切换 ([f4b34d0](https://github.com/JayTam/antd-ms/commit/f4b34d08a1fd1089b151aa9c08aba9d6a1e6ea3b))
- **ms-page:** 修复没得二级菜单时，跳转返回带了参数但列表页未刷新 ([0c14d83](https://github.com/JayTam/antd-ms/commit/0c14d83d01a2ce9086423d45798a49dac73f5b30))
- **ms-page:** 修复 react-router v5 时报错 ([40f03a3](https://github.com/JayTam/antd-ms/commit/40f03a30889afa2729de44743b6fe5aa2a4e07f1))
- **ms-page:** 修改 onBack 类型,支持返回值来优化是否继续执行默认的跳转逻辑 ([b60f30d](https://github.com/JayTam/antd-ms/commit/b60f30d95a884eb124df75f1c3c634cbac62edb6))
- **ms-page:** 优化返回逻辑 ([17e3d01](https://github.com/JayTam/antd-ms/commit/17e3d01967a3a490c798ab1e3a9c0db01003e216))
- **ms-page:** 优化返回逻辑 ([40e1652](https://github.com/JayTam/antd-ms/commit/40e165266e50d214d492c6b5fbe1196954a24b1c))
- **ms-page:** 优化返回逻辑 ([a37ea47](https://github.com/JayTam/antd-ms/commit/a37ea4717c5303738adf3a23708a7400fecc4ca1))
- **ms-page:** 优化返回逻辑 ([d364c21](https://github.com/JayTam/antd-ms/commit/d364c21fbddb29f351062067bd3971ac0865f60c))
- **ms-page:** 优化返回逻辑，当前页面是否为二级菜单返回到上级页面 ([c656618](https://github.com/JayTam/antd-ms/commit/c656618bdae8f0bfded24b200a6fc5d5a7335ca4))
- **ms-page:** 优化返回逻辑，新窗口打开时返回到当前页面的上级路由 ([85b44ee](https://github.com/JayTam/antd-ms/commit/85b44eeab24e150aa3ada7815c729db9c6e299a3))
- **ms-page:** 优化返回逻辑，修复 msPage 跳转到 msPage 时 sessionStorage 丢失 ([367fc3e](https://github.com/JayTam/antd-ms/commit/367fc3eec9389fcecf6d498881aaa5cac4830727))
- **ms-page:** actionRef 增加 back 方法，用于自定义返回时可调用 ([53163d3](https://github.com/JayTam/antd-ms/commit/53163d3c333b10f2dbb2c73d0918a8420a502883))
- **ms-resource-tags:** 捕获 reouce.resourceMetadata 解析报错 ([182e6bb](https://github.com/JayTam/antd-ms/commit/182e6bb3e6abaa503e3c7b5664bac694c9e501d1))
- **ms-resource-tags:** 完善标签键值对校验 ([cdb1046](https://github.com/JayTam/antd-ms/commit/cdb1046ecb718cccfbfa824c94950c1259d8576d))
- **ms-resource-tags:** 优化资源标签接口合并，没有 gri 就不调用资源接口 ([b194d56](https://github.com/JayTam/antd-ms/commit/b194d564bacb94c74c38cd5b3018f8cf95d95154))
- **ms-table:** 修复 column.copyable 功能失效 ([b270193](https://github.com/JayTam/antd-ms/commit/b270193098808643bd26e8209b7c3ce2eaf70b2f))
- **ms-table:** 修复 query 上设置样式会影响到 filter ([2b0c952](https://github.com/JayTam/antd-ms/commit/2b0c95294642da9c0cba7a44bb4f68e6141b1284))
- **ms-table:** 修复 render 无法获取最新状态 ([01dc5ae](https://github.com/JayTam/antd-ms/commit/01dc5ae424e2772c142a59b3bbea64dbb679dc11))
- **ms-table:** 修复 search 配置部分不生效的情况 ([8cc861d](https://github.com/JayTam/antd-ms/commit/8cc861dbd40fe470744b2cb8372c6f7a863e4bbf))
- **ms-table:** 修复 useUrlState 初始值问题 ([4d01671](https://github.com/JayTam/antd-ms/commit/4d016713cd273f326a95a1c3f0a767d61d03b5c8))
- **ms-table:** 修复 useUrlState 初始状态在多种环境不符合预期 ([caf1bb4](https://github.com/JayTam/antd-ms/commit/caf1bb4679e8b5c6dff940135fb102489e6907f1))
- **ms-table:** 修复编辑资源标签重置功能 ([da33c8f](https://github.com/JayTam/antd-ms/commit/da33c8f9de9fbc977c7ac3f2e7a86f9297d0e159))
- **ms-table:** 修复表格筛选重新搜索时，排序没有重置 ([47b3b8a](https://github.com/JayTam/antd-ms/commit/47b3b8a14aa18750be941e5c69abaac8d42a14c8))
- **ms-table:** 修复传给 defaultSelectedRowKeys 的数据源为 request 的原始数据 ([712e3d4](https://github.com/JayTam/antd-ms/commit/712e3d4f328d78b833021ff700ccfbf07d234e4a))
- **ms-table:** 修复单测卡死 ([3bd3064](https://github.com/JayTam/antd-ms/commit/3bd3064b3173ac6308534dea984bbc3b6e61121a))
- **ms-table:** 修复当轮询条件频繁变更之后，无法打开重启轮询 ([684d258](https://github.com/JayTam/antd-ms/commit/684d258e3637dfec349df684cc76adf8ced9e5f9))
- **ms-table:** 修复点击重置，偶现的排序未更新 ([07fbe69](https://github.com/JayTam/antd-ms/commit/07fbe694d34f80ff57ba6d7eefe956dd09a3e7eb))
- **ms-table:** 修复加载状态未包含资源请求 ([67ae960](https://github.com/JayTam/antd-ms/commit/67ae96033f669d569c6e389574dd98079988ec34))
- **ms-table:** 修复轮询会丢失请求参数 ([8c50ea7](https://github.com/JayTam/antd-ms/commit/8c50ea7cba995080714ab081234f413bb3638253))
- **ms-table:** 修复没传 request 报错 ([a21a986](https://github.com/JayTam/antd-ms/commit/a21a986410fa0926723051771a24c11b32593b78))
- **ms-table:** 修复排序设置 defaultSortOrder 时，无法取消排序 ([d3a42b4](https://github.com/JayTam/antd-ms/commit/d3a42b4cb0576358fd6931d12bcb65bb936b048a))
- **ms-table:** 修复切换路由轮询没有被销毁 ([ca363df](https://github.com/JayTam/antd-ms/commit/ca363df5728a9f045638e6451ba1cf02787b1593))
- **ms-table:** 修复设置 scroll.y=auto-conent，空提示未居中 ([b091e2c](https://github.com/JayTam/antd-ms/commit/b091e2c6e2885aa070394681bdcfbcc08653312d))
- **ms-table:** 修复搜索会重置 pageSize ([7459f65](https://github.com/JayTam/antd-ms/commit/7459f65a3401b9dce3053beb47b290f8284dfc25))
- **ms-table:** 修复提交和重置 values 不一致 ([6956c3f](https://github.com/JayTam/antd-ms/commit/6956c3fe3582f2ee120f7a6cc8ec277e0f75d524))
- **ms-table:** 修复在 MsPage 的 tabs 下，多个 MsTable 会报错 ([e3ff5cc](https://github.com/JayTam/antd-ms/commit/e3ff5cca50f327aba1e5072c16d01bb33fd58256))
- **ms-table:** 修复 actionRef.clearSelected 没有触发 afterChange 事件 ([dfe450a](https://github.com/JayTam/antd-ms/commit/dfe450adb82b04fb575177317f362e1719b02fbc))
- **ms-table:** 修复 dataSouce 不能动态更新 ([0f8e0e6](https://github.com/JayTam/antd-ms/commit/0f8e0e6c1619a42cb8be13ab931a889e3a5fd4c7))
- **ms-table:** 修复 dataSource 变更不应该触发 rowSelection.afterChange ([16dbbb6](https://github.com/JayTam/antd-ms/commit/16dbbb6ab8321a1e2757bab8c32d8531be086a2c))
- **ms-table:** 修复 dataSource 更新快，页面未回显最新数据 ([058b97c](https://github.com/JayTam/antd-ms/commit/058b97c2b69bca4c31ac565553c184c600c51683))
- **ms-table:** 修复 defaultSelectedRowKeys 为函数时报错 ([c62e541](https://github.com/JayTam/antd-ms/commit/c62e54148b9d8058fcf003da71c7fc0dd1dc6b0b))
- **ms-table:** 修复 onSubmit 和 onReset 不能按预期触发 ([b45888e](https://github.com/JayTam/antd-ms/commit/b45888e30fe670d82cbb36f4461a2b088d540850))
- **ms-table:** 移除 backendTableSortFilter，业务场景不符合 ([1262330](https://github.com/JayTam/antd-ms/commit/1262330582a0aead633f2b955e263d97810831a8))
- **ms-table:** 优化直传 dataSource 不应该出现 loaidng ([a3b8ed8](https://github.com/JayTam/antd-ms/commit/a3b8ed8294967bd9e5aaae7928dc683ee25a9e0c))
- **ms-table:** 优化 column 的属性为函数时，组件内会频繁渲染 ([c612b84](https://github.com/JayTam/antd-ms/commit/c612b8450294fdd36587a4c5875865b5aea73b68))
- **ms-table:** syncToUrl 开启 encodeUrl，能识别特殊字符 ([ae6e7d8](https://github.com/JayTam/antd-ms/commit/ae6e7d8247f0cd004d6ad7fb228abec5a6cabb86))

## [2.17.0](https://github.com/JayTam/antd-ms/compare/v2.16.5...v2.17.0) (2024-04-09)

### Features

- **ms-page-loading:** 页面加载 ([7616cf2](https://github.com/JayTam/antd-ms/commit/7616cf2ac13876e6950ae3dad9e5d47cc667e864))
- **ms-search:** 搜索组件基本功能实现 ([de363ef](https://github.com/JayTam/antd-ms/commit/de363efdd2447061b8a6afb917a82c142bb30297))
- **ms-search:** 添加 actionRef 四个方法 ([5e518d0](https://github.com/JayTam/antd-ms/commit/5e518d0aa3af64b1e40de50f71eb634c14c104bb))
- **ms-table:** 新增 showSpinning 控制是否渲染内置加载效果 ([6b44647](https://github.com/JayTam/antd-ms/commit/6b4464718a41d4d1ebae1e6d5d1654322fd80a3a))

### Bug Fixes

- **ms-table:** 去掉根据后端返回的页码重置分页器状态 ([cf25770](https://github.com/JayTam/antd-ms/commit/cf2577073d2b43233c5f026cecbf55f1fdab15dc))
- **ms-table:** 修复 tooltip 类型 ([4c935aa](https://github.com/JayTam/antd-ms/commit/4c935aafc91d1b5e20c1bc7c545aca913d6c6cb7))
- **ms-table:** 修复轮询请求需要手动搜索一遍才能轮询 ([9040a8c](https://github.com/JayTam/antd-ms/commit/9040a8c93e3a7415e34260b89a875bfffc7a7180))
- **ms-table:** 修复为根据后端返回值重置页码 ([7cb6286](https://github.com/JayTam/antd-ms/commit/7cb6286afe77e0617b3ddc34274af62102fd21ab))

### [2.16.5](https://github.com/JayTam/antd-ms/compare/v2.16.4...v2.16.5) (2024-04-07)

### Bug Fixes

- **ms-table:** 修复 action.rest 无法重置表单状态 ([f3635fc](https://github.com/JayTam/antd-ms/commit/f3635fca19ec705530a224be4ffe560155253cdb))
- **ms-table:** 修复 actionRef.search 状态未同步到表单 ([b8ed100](https://github.com/JayTam/antd-ms/commit/b8ed1007aa156bf87498f80454a2ecbe60cfdba1))

### [2.16.4](https://github.com/JayTam/antd-ms/compare/v2.16.3...v2.16.4) (2024-04-03)

### Bug Fixes

- **ms-page:** 暂时去掉返回按钮置灰功能 ([24fefd9](https://github.com/JayTam/antd-ms/commit/24fefd970ccd9b0ce66d17017453ea3ae3f9bb2e))

### [2.16.3](https://github.com/JayTam/antd-ms/compare/v2.16.2...v2.16.3) (2024-04-03)

### Bug Fixes

- **ma-layout:** 修复导航未正确查找已选路由 ([7a69036](https://github.com/JayTam/antd-ms/commit/7a69036b1e918fbbb660cfec32efaed539b181cb))
- **ms-confirm:** 修复确认框关闭之后未销毁，导致层级异常 ([a24e8af](https://github.com/JayTam/antd-ms/commit/a24e8affc193cf2a33861b2db45724e1ce561956))
- **ms-descripitons:** 修复标题过长用 tooltip 展示 ([58f9abf](https://github.com/JayTam/antd-ms/commit/58f9abf8a0b36a9f953656738fa335d5e8840a10))
- **ms-descriptions:** 修复标题文字超长未出省略号 ([e651336](https://github.com/JayTam/antd-ms/commit/e6513363eca36da947fc5444ab5369b2aad117ad))
- **ms-field:** 补充实现聚焦重新请求可选项 ([c1f9224](https://github.com/JayTam/antd-ms/commit/c1f92249a5876baaeaf58aa147ba36f9cd687f09))
- **ms-field:** 解决 userPopover 搜索值丢失 ([7a7fc96](https://github.com/JayTam/antd-ms/commit/7a7fc963deb61a5f31682577519ee36f4acc9557))
- **ms-field:** 去掉打印信息 ([5db9a0c](https://github.com/JayTam/antd-ms/commit/5db9a0c083eabc40bebc0ba0b7a109d2d030780d))
- **ms-field:** 新增 fieldProps.initialRequestWhenNil 控制初始化请求 ([dab8b38](https://github.com/JayTam/antd-ms/commit/dab8b38e72837e11265881d46de51cc703956bad))
- **ms-field:** 修复存在初始值时，无法清空不存在的可选项 ([6ac18ef](https://github.com/JayTam/antd-ms/commit/6ac18ef6200c02da8cd97a1ce01867cd8648a5a2))
- **ms-field:** 修复没做非空判断 ([479b489](https://github.com/JayTam/antd-ms/commit/479b489fbf9b1a04ca0814139487f206a8860f07))
- **ms-field:** 修复 user 传入 initialValue 时未成功回显 ([9f1005a](https://github.com/JayTam/antd-ms/commit/9f1005a67e3a987604cc7d68277ac47e41c8f75b))
- **ms-field:** 修复 userPopover 合成事件字符丢失 ([e4821f2](https://github.com/JayTam/antd-ms/commit/e4821f2c9f9e1b949cecba56b7eb80b3c169d718))
- **ms-field:** 修复 userPopover 中文搜索首字母偶尔丢失 ([05abfa1](https://github.com/JayTam/antd-ms/commit/05abfa1b8c5c6f0275fef2a452638736d438cc02))
- **ms-field:** user 组件搜索默认增加 value，人员搜索添加防抖 ([36cae4b](https://github.com/JayTam/antd-ms/commit/36cae4b1c0fcf5ebdafb1cd2544779aa4b88c8a6))
- **ms-form:** 补充 MsFormInstance 类型 ([c8f9f8d](https://github.com/JayTam/antd-ms/commit/c8f9f8d778603e28603dfad78ceee1fe232af2ff))
- **ms-form:** 修复 formList 设置时间戳未能转换成 moment 实例 ([1a3339c](https://github.com/JayTam/antd-ms/commit/1a3339c7103adb2fb3348e0610081f3d224f4a01))
- **ms-form:** 修复初始值为时间戳，组件内未能转化成 moment 实例 ([bd990fb](https://github.com/JayTam/antd-ms/commit/bd990fb81b1e867356b0c67d13e0cac030bb13a7))
- **ms-form:** 修复 Date 类型的初始值未能转换成 moment ([0744fd9](https://github.com/JayTam/antd-ms/commit/0744fd955571dd09c2a854c05c6222bcf2b87fdf))
- **ms-form:** 修复 formItemProps.valuePropName 无效 ([5a555a2](https://github.com/JayTam/antd-ms/commit/5a555a2062cbbdc7be7236bb8172176fbf585d61))
- **ms-form:** 修复 formList 为函数 columns 处理初始值异常 ([20aa910](https://github.com/JayTam/antd-ms/commit/20aa910ef72d4e7481d502d5f5b047186236416b))
- **ms-instance:** 跳转修改为 Link ([07728a1](https://github.com/JayTam/antd-ms/commit/07728a184cb3e37e9988f19fac85e6458c4c93b1))
- **ms-instance:** 修复禁用未生效 ([bcfd5a7](https://github.com/JayTam/antd-ms/commit/bcfd5a7395fa2e1998212ace87901364d83f75c7))
- **ms-instance:** 增加打开弹窗和关闭弹窗的事件，主要用于埋点 ([83e5d1e](https://github.com/JayTam/antd-ms/commit/83e5d1e049c4f45ebc504e1b86bc84d6840bfeb4))
- **ms-layout:** 点击当前已选中菜单时，使 onClick 生效 ([a50f125](https://github.com/JayTam/antd-ms/commit/a50f125ba0c953473f0f4bea7e8341c8a6fca8cb))
- **ms-layout:** 去掉打印信息 ([460b7c9](https://github.com/JayTam/antd-ms/commit/460b7c9d26aece8bf9bfe746873d9f3dfac396e0))
- **ms-layout:** 修复导航 context 参数 ([420cb82](https://github.com/JayTam/antd-ms/commit/420cb820477a84417ef822328064d3126545b86f))
- **ms-layout:** 修复路由组件点击展开后自动折叠 ([5c2fcfa](https://github.com/JayTam/antd-ms/commit/5c2fcfa33b24fc11d759bea2aa55bc7bd51cd385))
- **ms-layout:** 修复首页路由死循环 ([e40de60](https://github.com/JayTam/antd-ms/commit/e40de602257c939af8d8c4f80b83d3d122271f0f))
- **ms-layout:** 修复折叠状态 hover 时未展开选项，修复当前 url 没有二级菜单时宽度错误 ([c02f766](https://github.com/JayTam/antd-ms/commit/c02f76646635d6d3a28106489f086cd588a48584))
- **ms-layout:** 优化导航切换路由时计算是否折叠一级导航 ([80eb551](https://github.com/JayTam/antd-ms/commit/80eb5516fc204d9c76f16d0a29b82c2485d318cc))
- **ms-layout:** 优化路由打开二级菜单时默认收缩一级菜单,修复高亮 ([6988150](https://github.com/JayTam/antd-ms/commit/6988150a2366f4280401e960a490efc362579986))
- **ms-layout:** 优化 path 变化时是否折叠一级导航，优化高亮 keys 的方法 ([a6db327](https://github.com/JayTam/antd-ms/commit/a6db3275bc605c9901fe8b3918b77acb7d9fef76))
- **ms-page:** 路由栈中没有上一页时，禁用返回按钮 ([b9bc7de](https://github.com/JayTam/antd-ms/commit/b9bc7de5b1e4c537e9310d474afb4ccd85067122))
- **ms-status:** 修复直接更改 status 数据导致状态颜色未变更 ([8c7c0ec](https://github.com/JayTam/antd-ms/commit/8c7c0ec917e0bfc382957d70ab79f40f4bac9ad6))
- **ms-table:** 补充 onRefresh 事件 ([2623e4f](https://github.com/JayTam/antd-ms/commit/2623e4ff6ad7c61b39a4ea3c7ff347bac6fe8631))
- **ms-table:** 多选时在底部菜单显示选择多少项 ([eed3d54](https://github.com/JayTam/antd-ms/commit/eed3d544bad9be2b36858446ef2e576a60001586))
- **ms-table:** 刷新时清空选中项 ([d832dba](https://github.com/JayTam/antd-ms/commit/d832dbaa7322768c3fde2b32d99b21a24ae63ca4))
- **ms-table:** 修复 barRender 渲染两次 ([7c41aa4](https://github.com/JayTam/antd-ms/commit/7c41aa46567599dc92af38af031abe60c711728b))
- **ms-table:** 修复点击重置，筛选指示器未正确显示 ([faf809e](https://github.com/JayTam/antd-ms/commit/faf809ee331494dc19a5450ac6e0fc89683c981d))
- **ms-table:** 修复将 0 渲染成 columnEmptyText ([d224144](https://github.com/JayTam/antd-ms/commit/d224144f2244d8bba0c9456a647a2e54c1cecd53))
- **ms-table:** 修复排序和表头搜索会重置分页 ([2995435](https://github.com/JayTam/antd-ms/commit/29954359e73b5c3e00d0e5207dc64e02760c9e1e))
- **ms-table:** 修复时间类型的初始值错误 ([fbd786a](https://github.com/JayTam/antd-ms/commit/fbd786a1b54533e81334de65572549fa2dc123d5))
- **ms-table:** 修复搜索报错 ([15f8065](https://github.com/JayTam/antd-ms/commit/15f8065d0dd3bb9c586175e3870ada4d17de5e0b))
- **ms-table:** 修复搜索时报错 ([b6a8707](https://github.com/JayTam/antd-ms/commit/b6a87073b50740363d5a6d173fea685d84609a58))
- **ms-table:** 修复因调整了表格之间间距导致自适应滚动高度异常 ([2881b3d](https://github.com/JayTam/antd-ms/commit/2881b3d7f941915c3ec6a5b96129492803ab3c36))
- **ms-table:** 修复重构 intialValues 导致的问题 ([8e0cc0c](https://github.com/JayTam/antd-ms/commit/8e0cc0ccadb760bb8e56b8160b07192da4732df7))
- **ms-table:** 修复 actionRef.clearSelected 未清空 selectedRows ([0fa6f8c](https://github.com/JayTam/antd-ms/commit/0fa6f8c8bb4787e246c764b3c0123aeed1b76855))
- **ms-table:** 修复 syncToUrl 无法重置初始值 ([d725b3c](https://github.com/JayTam/antd-ms/commit/d725b3cfe7ac640f0baefbddd0c543f9a9739761))
- **ms-table:** acrionRef.reload 返回 dataSource ([00428df](https://github.com/JayTam/antd-ms/commit/00428df6d051f310c7b074f3e52c294d32b0b048))

### [2.16.2](https://github.com/JayTam/antd-ms/compare/v2.16.1...v2.16.2) (2024-03-14)

### Bug Fixes

- **digital:** 修复数字组件在表单重置时 UI 未重置 ([8a53d53](https://github.com/JayTam/antd-ms/commit/8a53d5397810e17795d563b67aff6b72c2f210bc))
- **ms-field:** switch 增加二次确认功能 ([4f4604f](https://github.com/JayTam/antd-ms/commit/4f4604f1d414996447f7dbf47e6865d5b7948129))
- **ms-field:** switch 组件支持请求成功后变更状态 ([0775eaa](https://github.com/JayTam/antd-ms/commit/0775eaac33c1ce5d7ddc45ccc55fae1a1af43e6d))
- **ms-field:** switch 组件 request 类型变更 ([11a7ed9](https://github.com/JayTam/antd-ms/commit/11a7ed91fe306c52e13c060d8a380ca29c3d7dc0))
- **ms-status:** 优化样式，超出省略 ([04cba2c](https://github.com/JayTam/antd-ms/commit/04cba2c06105e7eebb70ce955aa74efbd598059f))
- **ms-status:** 优化状态组件样式 ([501d517](https://github.com/JayTam/antd-ms/commit/501d5178e46da96dc02a77d1a433b896a3a697f9))
- **ms-table:** 修复列设置排序未能实现持久化 ([bbcbc7c](https://github.com/JayTam/antd-ms/commit/bbcbc7cf22547650d07d4fdd9848895cdc22cbe5))
- **ms-table:** 修复 barRender=null 无法隐藏 search 表单 ([089042b](https://github.com/JayTam/antd-ms/commit/089042b827fa111de31acf793b28241694748725))
- **ms-table:** 修复 seach 模式，远程请求表头筛选项无效 ([3d91f3e](https://github.com/JayTam/antd-ms/commit/3d91f3ebdd90b0671a7b1905f7bfb0acfd6f6151))
- **ms-table:** actionRef 的 relaod, search, reset 等方法改成异步 ([36d4693](https://github.com/JayTam/antd-ms/commit/36d4693689ff31f4e11f6f50f0874d464a41b9ed))
- **ms-table:** search 模式，没有搜索项隐藏提交和重置按钮 ([f237686](https://github.com/JayTam/antd-ms/commit/f23768609b9bcf678222e6478405258400feb847))

### [2.16.1](https://github.com/JayTam/antd-ms/compare/v2.16.0...v2.16.1) (2024-03-11)

### Bug Fixes

- **ms-page:** request 请求失败关闭 loading 状态 ([0d49877](https://github.com/JayTam/antd-ms/commit/0d49877ecd711f02452f93856a5db4ee2d305e41))
- **ms-table:** 修复重置按钮失效 ([20c4fb6](https://github.com/JayTam/antd-ms/commit/20c4fb683e3c161bee4c26a7247fea1625a53b8f))

## [2.16.0](https://github.com/JayTam/antd-ms/compare/v2.15.8...v2.16.0) (2024-03-09)

### Features

- **ms-confirm:** 新增 MsConfirm 组件 ([9c2e855](https://github.com/JayTam/antd-ms/commit/9c2e855a5888cd8675fafbeafcffb45f4ddac773))
- **ms-form:** 实现 formList 和 formTable 的 loading 过度效果 ([a129714](https://github.com/JayTam/antd-ms/commit/a129714dfb659e92a267b9f92b40ccfd95555ba2))
- **ms-form:** 实现 MsQueryForm 用于重构 MsTable ([a3b3cf9](https://github.com/JayTam/antd-ms/commit/a3b3cf9918a46fe9626d744a88549b83bd42e0f7))
- **ms-form:** 新增 SearchForm 表单类型 ([ec6d5e8](https://github.com/JayTam/antd-ms/commit/ec6d5e879420a12f1b9cf6df79f01f7371022e1f))
- **ms-form:** 支持 disableFieldCache 关闭字段的枚举缓存 ([f509a20](https://github.com/JayTam/antd-ms/commit/f509a2045eefb27a0bb80a05e7de483a8125e698))
- **ms-status:** 新增 MsStatus 组件 ([cce910a](https://github.com/JayTam/antd-ms/commit/cce910ac513a9d0852a3032b83671149aef47f26))
- **ms-table:** 初步实现 query 和 filter 表单状态同步 ([0076669](https://github.com/JayTam/antd-ms/commit/0076669834267f520b958b5b149e9a533b0912ad))
- **ms-table:** 多项搜索，有值的搜索项优先展示 ([1585287](https://github.com/JayTam/antd-ms/commit/15852875ebba432477f80731b881b7d982c927a3))
- **ms-table:** 开启表头搜索时，同时支持 request ([ab32e45](https://github.com/JayTam/antd-ms/commit/ab32e45ed128b39fd302653edb8aaf00aa937f04))
- **ms-table:** 实现 query 模式下，选择搜索器的表单校验 ([6e90d52](https://github.com/JayTam/antd-ms/commit/6e90d525143384a49a48319131722be6be32ee52))
- **ms-table:** 新增 tableContentRender，不重写分页器 ([bb31992](https://github.com/JayTam/antd-ms/commit/bb319923af060771716d26fb5fe2d086c37eefc0))
- **ms-table:** syncToUrl 在弹窗和抽屉下自动关闭 ([5b116f2](https://github.com/JayTam/antd-ms/commit/5b116f2f888bfaa9f27ae3bdfb23a6e813a9eff4))

### Bug Fixes

- 修复 isTimeInstance 方法引起的白屏报错 ([9879ae2](https://github.com/JayTam/antd-ms/commit/9879ae29bd24e0f1e2cd42fbae898fbc57c2b464))
- **ms-field:** 优化 user 组件过滤逻辑，修复 labelInValue 失效 ([24e7fbd](https://github.com/JayTam/antd-ms/commit/24e7fbd20db3ae3bed7d75efcff8fe42fdbfc3b7))
- **ms-field:** user 增加结合 MsForm 使用的 demo ([3a0e4a8](https://github.com/JayTam/antd-ms/commit/3a0e4a8b6161cefe358602e490f779937ec1f360))
- **ms-field:** userPopover 修复放在 MsForm 中使用时 defaultValue 失效 ([3902d39](https://github.com/JayTam/antd-ms/commit/3902d39fd13f209836411b55a9b8a88c62703b5d))
- **ms-form:** 修复弹窗表单无法关闭 ([1623efc](https://github.com/JayTam/antd-ms/commit/1623efc6cf27b3e8e020c94578241ded39fbc98a))
- **ms-form:** 修复列表操作未同步更新\_valueEnum 的值 ([3efec3a](https://github.com/JayTam/antd-ms/commit/3efec3a3005753fe3341f26e3c07556e054c63c9))
- **ms-form:** 修复时间类型初始化报错 ([c38b4b0](https://github.com/JayTam/antd-ms/commit/c38b4b0bdcdf70f5b73afadae32deb34dc2535f9))
- **ms-instance:** 实例 ID 和实例名称 ([807dcfe](https://github.com/JayTam/antd-ms/commit/807dcfe0367b0cb28b413981b19ac03d91d30ccc))
- **ms-page:** 修复 extra 为函数时，pageData 类型能提示可能为空 ([c8be176](https://github.com/JayTam/antd-ms/commit/c8be1766b8332315b1a43ef7edd494b79d99ffdc))
- **ms-page:** 修复 tabProps.onChange 不生效 ([196cd43](https://github.com/JayTam/antd-ms/commit/196cd432bf912acc4031f75a7f6c1b007cb85bd7))
- **ms-page:** 修复穿透刷新问题 ([f45ba08](https://github.com/JayTam/antd-ms/commit/f45ba0828c110b149726746f23739f46aa714be3))
- **ms-status:** msStatus 状态组件参数优化 ([f7d92dd](https://github.com/JayTam/antd-ms/commit/f7d92dd50fba18272443e6cc08e2775d1204eaee))
- **ms-table:** 联动查询时，当有初始值能自动请求可选项 ([d6153b7](https://github.com/JayTam/antd-ms/commit/d6153b7c74be153c0b8444b3ad92fc5bd15ab8c2))
- **ms-table:** 没有排序时，去掉 sorter 请求参数 ([95c870a](https://github.com/JayTam/antd-ms/commit/95c870a9b13577b8b7c35775efd66fd4a3c69921))
- **ms-table:** 修复 filterNum 警告 ([ebe86ad](https://github.com/JayTam/antd-ms/commit/ebe86ad78d7c3bd8ea846b8b220d72308d1ae99b))
- **ms-table:** 修复 filterStyle 未撑满弹窗 ([3cb14a6](https://github.com/JayTam/antd-ms/commit/3cb14a696ca05dd692f1193b2ec2b14f5a4278a1))
- **ms-table:** 修复存在依赖项时，被依赖项清空，多选组件不能自动清空 ([155c4dc](https://github.com/JayTam/antd-ms/commit/155c4dca6bc3b44029e0d4ba310c28a4df2ab7db))
- **ms-table:** 修复代码合并问题 ([743a302](https://github.com/JayTam/antd-ms/commit/743a302e812da1b07a23a7221d172f600ae4b630))
- **ms-table:** 修复动态变更 columns 失效 ([6d0d44b](https://github.com/JayTam/antd-ms/commit/6d0d44b84ba97e4788434d6b92aceb8f3962f488))
- **ms-table:** 修复动态 columns，查询表单项未更新 ([1f6544a](https://github.com/JayTam/antd-ms/commit/1f6544aaac5ecc80f8b742f8e818d154f878e79b))
- **ms-table:** 修复多项搜索无法选择 ([1729ad1](https://github.com/JayTam/antd-ms/commit/1729ad163d00ce2079b60b9b8a19fd5bfecd122c))
- **ms-table:** 修复含有时间类型字段时，filter 类型的筛选器点击重置时白屏报错 ([b87ca98](https://github.com/JayTam/antd-ms/commit/b87ca98909a02a8ae892ee80770bc618ef42bfdf))
- **ms-table:** 修复联动查询依赖更新，可选项未重新请求 ([758b340](https://github.com/JayTam/antd-ms/commit/758b340091542ebe28b95d4406d841a72601edc1))
- **ms-table:** 修复筛选个数指示不显示 ([7587ac0](https://github.com/JayTam/antd-ms/commit/7587ac09f754a1eb9a3c1b367f0751f1238740ba))
- **ms-table:** 修复时间类型初始值异常 ([8752cf2](https://github.com/JayTam/antd-ms/commit/8752cf2761ade6e9212660f9f1c512611a09c893))
- **ms-table:** 修复 columns 变更 MsTable 没有动态刷新 ([005c8db](https://github.com/JayTam/antd-ms/commit/005c8db9951cd0169aad55f5d601a648358b8ada))
- **ms-table:** 修复 menuRender 为空时，下间距未消除 ([78ac6a6](https://github.com/JayTam/antd-ms/commit/78ac6a6c0f12a97fc0f7e528d3241dc5c126ce49))
- **ms-table:** 修复 MsTable 在弹窗中白屏报错 ([1f21a8d](https://github.com/JayTam/antd-ms/commit/1f21a8d23cc051099659a4c4404ccffbf965d372))
- **ms-table:** 修复 pagination 的 defaultCurrent 和 defaultSize 不生效 ([da1505a](https://github.com/JayTam/antd-ms/commit/da1505ab179dddaeb842e7d542ccd6ccbe83d9bf))
- **ms-table:** 修复 query 选择搜索器无法设置样式 ([06c4552](https://github.com/JayTam/antd-ms/commit/06c45523cae91ed35234e560ad7368f4010f0198))
- **ms-table:** 修复 search 模式，含有时间类型重置报错 ([72e33aa](https://github.com/JayTam/antd-ms/commit/72e33aa94e89abc1aded39b5f9c89af6aafca943))
- **ms-table:** 优化 filter 提示弹窗位置 ([c02ad36](https://github.com/JayTam/antd-ms/commit/c02ad3622d94a424e6d5926a045fd661ed7cb32c))
- **ms-table:** 重新搜索时，重置列排序 ([0013afe](https://github.com/JayTam/antd-ms/commit/0013afedbfb4e34c5f0cd28d68e0cb7204ee9b9d))
- **msinstance:** msInstance 修复复制失效，样式优化 ([b91b5ad](https://github.com/JayTam/antd-ms/commit/b91b5add04998714d482bf7f4f9960860b4fbb2d))
- **msinstance:** msInstance 支持是否缩略和 linkProps ([0ad17fb](https://github.com/JayTam/antd-ms/commit/0ad17fb299fd34c479f94a3a71cc3fe1a356c10d))

### [2.15.8](https://github.com/JayTam/antd-ms/compare/v2.15.7...v2.15.8) (2024-02-05)

### Bug Fixes

- **ms-field:** 修复 userGroup 传入 onChange 产生的问题 ([aeaec7c](https://github.com/JayTam/antd-ms/commit/aeaec7c6d4704221f5ae006ead9e126c96bbdafd))
- **ms-field:** userGroup 优化所有删除逻辑 ([2c0c3b8](https://github.com/JayTam/antd-ms/commit/2c0c3b8305faf2700ce64592cef1d79e68fec5a5))
- **ms-field:** userGroup 支持 value 和 defaultValue 数据转换 ([02f2085](https://github.com/JayTam/antd-ms/commit/02f2085fe3af4f1bee26e8c64c1bad7f570b6f3f))
- **ms-page:** 优化样式 ([6b5baae](https://github.com/JayTam/antd-ms/commit/6b5baaefcb743a957a6d72fd0df3a2313831890a))
- **ms-request:** 删除过时的测试环境跳转判断逻辑 ([6949769](https://github.com/JayTam/antd-ms/commit/6949769e10aadd2baff6c9e4464c3137ab8be7ce))
- **ms-resrouce-tags:** 优化资源标签样式 ([f4f4b29](https://github.com/JayTam/antd-ms/commit/f4f4b29d140590c33bb550607a9cfef1c9adaefb))
- **ms-table:** 补充 search.onQuerySelectorChange 事件 ([0a39294](https://github.com/JayTam/antd-ms/commit/0a39294e5ce919cda6b59e91b6c0553f9addf1b1))
- **ms-table:** 修复列设置编辑之后未保存，重新打开状态未重置 ([3623038](https://github.com/JayTam/antd-ms/commit/362303815951b551d90c41e885e19a02a908ce6f))
- **ms-table:** 修复资源标签筛选，交互和以前保持一致 ([aabeaac](https://github.com/JayTam/antd-ms/commit/aabeaac008c25811b5e4db016e8728d06788fa44))
- **ms-table:** 修复资源标签重置偶现异常 ([10d6c42](https://github.com/JayTam/antd-ms/commit/10d6c42a86f746bc7d86e923cf25bb7b49491695))

### [2.15.7](https://github.com/JayTam/antd-ms/compare/v2.15.6...v2.15.7) (2024-01-24)

### Bug Fixes

- **ms-descriptions:** 实现 titleColumn 的 fieldReadRender ([4ff486c](https://github.com/JayTam/antd-ms/commit/4ff486c553c386940240540cd57fb1e2ad644314))
- **ms-drawer:** 修复弹窗和抽屉在路由切换时未自动关闭 ([93a4581](https://github.com/JayTam/antd-ms/commit/93a4581c7e0c68eb3cb66aef424f2d25bd3c1cd3))
- **ms-field:** 资源组案例 ([17df76c](https://github.com/JayTam/antd-ms/commit/17df76cc6a523ef5c55230800461bb750572c018))
- **ms-field:** 资源组组件只读模式 ([ee9bcd7](https://github.com/JayTam/antd-ms/commit/ee9bcd757443e20448cf39f31310a561ad0251b8))
- **ms-field:** resourceGroup 资源组组件 ([2330026](https://github.com/JayTam/antd-ms/commit/2330026bcdbfcc5d0599726ed2f8ea3e221983c7))
- **ms-field:** userPopover 优化宽度计算，格式化 value ([6cc17c6](https://github.com/JayTam/antd-ms/commit/6cc17c6778718a3dae8b30e813808c65c375a559))
- **ms-modal:** 修复在路由切换时自动关闭弹窗 ([9ff8290](https://github.com/JayTam/antd-ms/commit/9ff8290eebecb48a130785b5d82756ec6532f695))

### [2.15.6](https://github.com/JayTam/antd-ms/compare/v2.15.5...v2.15.6) (2024-01-17)

### Bug Fixes

- **ms-page:** 修复 context 影响子页面 ([437eb34](https://github.com/JayTam/antd-ms/commit/437eb34cc6b69474fa94ce66dc969c07fa54c0e0))

### [2.15.5](https://github.com/JayTam/antd-ms/compare/v2.15.4...v2.15.5) (2024-01-16)

### Bug Fixes

- **ms-descriptions:** 补充埋点事件方法 ([9b89390](https://github.com/JayTam/antd-ms/commit/9b89390d34c60cbeb1b04da47291970b0789f70f))
- **ms-descriptions:** 修复 extra 警告问题 ([f52e4d7](https://github.com/JayTam/antd-ms/commit/f52e4d77a24ab4743dda2d3ba36fb8f5750577ff))
- **ms-descriptions:** 修复 MsPage 下刷新无效 ([c353f44](https://github.com/JayTam/antd-ms/commit/c353f44309e5e6de6d25f8cb6e8ece69d5785365))
- **ms-descriptions:** 修复 noCard 默认值 ([67dca96](https://github.com/JayTam/antd-ms/commit/67dca96776a905016f8a58b9fc554812d91150cc))
- **ms-descriptions:** 支持 titleType ([4dab156](https://github.com/JayTam/antd-ms/commit/4dab1562770e357469de3c0d523e96e3a25450f8))
- **ms-descriptions:** 资源标签的操作按钮修改成不对齐 ([0654460](https://github.com/JayTam/antd-ms/commit/065446094227e0ea886676d92bfd1c181fa732fd))
- **ms-form:** 补充 autoSelect 关闭功能 ([d07701b](https://github.com/JayTam/antd-ms/commit/d07701b3af2610f5883182854873261b6043b60a))
- **ms-form:** 补充 titleType 实现 ([05e53ba](https://github.com/JayTam/antd-ms/commit/05e53ba08e4753ba6a634d94ff7b3d965fd3ea53))
- **ms-form:** 新增分步表单控制上一步，下一步按钮的属性 ([134828d](https://github.com/JayTam/antd-ms/commit/134828de386fe525c0874c5cf09753d746dfd652))
- **ms-form:** 修复分步表单报错 ([f719ab4](https://github.com/JayTam/antd-ms/commit/f719ab437b15c18400d392cb8e699bf0a5aaaadc))
- **ms-layout:** 修复 isChildPage 报警告 ([cb00c5e](https://github.com/JayTam/antd-ms/commit/cb00c5e8133439cc42ed56de1b295e690d293de0))
- **ms-layout:** 修复 isChildPage 警告 ([4739c5d](https://github.com/JayTam/antd-ms/commit/4739c5d1fe2341bd4b90cbbd566ee8a8a7f65e1c))
- **ms-page:** 从自动分割修改成手动分割 ([a6dc6bd](https://github.com/JayTam/antd-ms/commit/a6dc6bd17222acae386000250fed5018a7f95e89))
- **ms-page:** 修改所有组件作为子容器的默认标题样式为 gradient ([a8118d3](https://github.com/JayTam/antd-ms/commit/a8118d3ae2235be5e0a42d917d287bcd60aa5442))
- **ms-resource-tags:** 修复合并 list 接口丢失分页参数 ([0bc518d](https://github.com/JayTam/antd-ms/commit/0bc518d76e629b1acd621936c7160e15ea9e5904))
- **ms-resource-tags:** 修正资源标签地址拼装逻辑 ([ac4a466](https://github.com/JayTam/antd-ms/commit/ac4a46604c4e1669d3636e858978b617af12a755))
- **ms-table:** 修复动态变更 columns 失效 ([92007c6](https://github.com/JayTam/antd-ms/commit/92007c69f16c96f9b7bb6bdbd86a2b83b280ccdf))

### [2.15.4](https://github.com/JayTam/antd-ms/compare/v2.15.3...v2.15.4) (2024-01-05)

### Bug Fixes

- 修复 ts 类型报错 ([a3663fc](https://github.com/JayTam/antd-ms/commit/a3663fc49cd85977d021ce1a51ee2250a7ebedb4))
- **ms-descriptions:** 修复 column.colProps 影响编辑弹窗中的表单样式 ([42f247d](https://github.com/JayTam/antd-ms/commit/42f247d1755098f8534012839f76d47cde343927))
- **ms-descriptions:** 修复刷新按钮不生效 ([61c518c](https://github.com/JayTam/antd-ms/commit/61c518ce42021e3f74aa9e9ed1c991a0e391463e))
- **ms-descriptions:** 优化详情样式，补充编辑按钮自定义入口 ([2cf17ef](https://github.com/JayTam/antd-ms/commit/2cf17ef205c255e75e2b366b5272f15e51055dde))
- **ms-field:** 解决冲突 ([4c2a3c2](https://github.com/JayTam/antd-ms/commit/4c2a3c2f2a9c9463eb00777dc3c3f6a44c3c162f))
- **ms-field:** 解决 aws-sdk 库引起的报错 ([f9ab55f](https://github.com/JayTam/antd-ms/commit/f9ab55fe751af8198b67f5a259c1984537e1b347))
- **ms-field:** 新增 partUpload 分片上传组件 ([e896f9b](https://github.com/JayTam/antd-ms/commit/e896f9b1d570f3846e42b268438e5efe3e4d0635))
- **ms-field:** 移除分片上传组件注册 ([e295467](https://github.com/JayTam/antd-ms/commit/e295467a9765d11c2c3d5a13b6fb76096867e266))
- **ms-field:** partUpload 修改默认分片大小，状态优化 ([c06ef58](https://github.com/JayTam/antd-ms/commit/c06ef58233eeac79bc40700a5a73e974d52454d9))
- **ms-field:** partUpload 依赖注入，文档更新 ([d5558c8](https://github.com/JayTam/antd-ms/commit/d5558c8f5b66798fcf32a1b500e818f536a2084f))
- **ms-field:** userGroup 和 userPopover 姓氏颜色变更 ([699b323](https://github.com/JayTam/antd-ms/commit/699b32339c63ab24d4d0001729e0e0992e808a96))
- **ms-field:** userPopover 增加 defaultValue 默认值 ([6bd14e1](https://github.com/JayTam/antd-ms/commit/6bd14e172b7ae7b334e72a4c684d67e5f2b3f541))
- **ms-field:** userPopover 只读模式优化 ([990c27c](https://github.com/JayTam/antd-ms/commit/990c27cae25a46c9292089dc0b2fcd68626fbdde))
- **ms-form:** 补充分步表单下一步 validateNextStep 异步校验 ([5f3cf96](https://github.com/JayTam/antd-ms/commit/5f3cf96e969eb2d9ae78046e82847e75f6c06cbf))
- **ms-form:** 完善只读模式类型及文档 ([8ee6df8](https://github.com/JayTam/antd-ms/commit/8ee6df8a39b296e67daf881d99fbf6bb8d92c90c))
- **ms-form:** 修复时间类型提交时，类型有问题 ([8fced68](https://github.com/JayTam/antd-ms/commit/8fced6823a8c20a969bb502ee268c91cc0103ff2))
- **ms-page:** 修复 SubPage 影响刷新穿透到 Page ([465bc1c](https://github.com/JayTam/antd-ms/commit/465bc1cbc05ee4eadea6f48da98d43c5de21f60c))
- **ms-page:** 修复 tabProps.tabKeyName 无效 ([2282ec3](https://github.com/JayTam/antd-ms/commit/2282ec3de7a94921747d3da06edbe84b53db762f))
- **ms-page:** 修复主页面和子页面依赖请求 ([49d3468](https://github.com/JayTam/antd-ms/commit/49d3468dc3a4679cd5274c257ac299eefb68d0c5))
- **ms-page:** 优化标题样式，背景色过长，去掉下划线类型 ([6537761](https://github.com/JayTam/antd-ms/commit/6537761fce082b97f9d2f7efc73dcfd3675d7107))
- **ms-table:** 补充 tableRender 自定义渲染表格 ([80cd496](https://github.com/JayTam/antd-ms/commit/80cd496507bdb969e5b0a8eb315bb88d2790a201))
- **ms-table:** 修复列设置存储 keys，show keys -> hide keys ([616592c](https://github.com/JayTam/antd-ms/commit/616592cae5c15d12a8da2d80d9e6b4bb9f7f9de8))

### [2.15.3](https://github.com/JayTam/antd-ms/compare/v2.15.2...v2.15.3) (2023-12-19)

### Bug Fixes

- **ms-field:** 解决 diffEditor 的 value 改变时触发 diffChanges 执行 ([ec461a5](https://github.com/JayTam/antd-ms/commit/ec461a528e25b81c327b7471bc4c4b8b3cb77537))
- **ms-field:** userGroup 每个选择配置项支持初始组织的名称 ([b5791e3](https://github.com/JayTam/antd-ms/commit/b5791e3750260e9006a7bba2a6a9a2a9cccc3b31))
- **ms-field:** userGroup 搜索输入框支持 placeholder ([aa73f2b](https://github.com/JayTam/antd-ms/commit/aa73f2baa6aac0892b8ac3e89e4030acb00cd06b))
- **ms-field:** userGroup 增加一个选择类型，优化配置项 ([7dfe427](https://github.com/JayTam/antd-ms/commit/7dfe4270f24c33300bbd09fef425111e52fa9c66))
- **ms-field:** userGroup 支持 defaultValue 默认选中的条目，修复样式和数据错乱 ([0db5cac](https://github.com/JayTam/antd-ms/commit/0db5cac84cf59b4f5a1cdfa60135efaca5a61a8b))
- **ms-field:** userGroup 只读模式 ([43f5786](https://github.com/JayTam/antd-ms/commit/43f5786ff6a856b3e9905a032483a9955e12e77c))
- **ms-field:** userGroup 组件支持自定义 title，修复数据 label ([8bc73dc](https://github.com/JayTam/antd-ms/commit/8bc73dcaf47311737f6c5c6092ae66ae8aae95be))
- **ms-layout:** 修复 msLayout 超过 2 级菜单下，默认展开行为异常，增加 closeOpenkey 参数，关闭默认展开自定义逻辑 ([274ddfb](https://github.com/JayTam/antd-ms/commit/274ddfb6dbd1b2a4ba8d6df158737ce48a46ec78))
- **ms-modal:** 修复设置 okButtonProps 和 cancelButtonProps 会影响内置 loading 状态 ([14acd07](https://github.com/JayTam/antd-ms/commit/14acd07b89fa11ed3b3c1a65aea23f0647d32640))
- **ms-request:** 需求废弃，代码还原 ([ac5a903](https://github.com/JayTam/antd-ms/commit/ac5a90337eed9b3d408bb3dc499adf38cc175528))
- **ms-table:** 空字符串显示 columnEmptyText ([c9d038e](https://github.com/JayTam/antd-ms/commit/c9d038e3904246793d7182b15f0f1f1fbbda4d4d))
- **ms-table:** msTable 修复 options 识别异常 ([ea75d07](https://github.com/JayTam/antd-ms/commit/ea75d07349ff79c5975515b84562119edb2236d0))

### [2.15.2](https://github.com/JayTam/antd-ms/compare/v2.15.1...v2.15.2) (2023-12-13)

### Bug Fixes

- **form-table:** 优化表格样式 ([ccd8bd2](https://github.com/JayTam/antd-ms/commit/ccd8bd26041c8c851530387c8f4fd77e31fe8916))
- **ms-request:** 团体云状态码更新，前端同步调整 ([90905f1](https://github.com/JayTam/antd-ms/commit/90905f1e3558bd8e4672d8f43cc654fab683af2b))
- **ms-request:** 团体云状态码同步更新 ([e9c5b53](https://github.com/JayTam/antd-ms/commit/e9c5b53bdd067fac0592e1b479652c783e922e1a))

## [2.15.0](https://github.com/JayTam/antd-ms/compare/v2.14.12...v2.15.0) (2023-12-09)

### Features

- **collapsed:** 新增 forceRender 控制节点是否渲染 ([32c24a6](https://github.com/JayTam/antd-ms/commit/32c24a6f77c7394f444593c395971636f572a8fb))
- **form-list:** 实现 FormList 只读模式 ([641d445](https://github.com/JayTam/antd-ms/commit/641d44577707e3338a8f45c5370cf0f5b3047729))
- **form-list:** 新增 addDefaultValue 控制默认添加值 ([968e5af](https://github.com/JayTam/antd-ms/commit/968e5af74defd00f8334135fed7af259d571d0d5))
- **form-table:** 实现 FormTable 只读模式 ([3e8a344](https://github.com/JayTam/antd-ms/commit/3e8a344bbceffee8760912e6ac62c3c7066a1983))
- **form-table:** 新增 tableProps 属性 ([40f5f21](https://github.com/JayTam/antd-ms/commit/40f5f2160d26f2db6e75ba0da3a4e12293e59bf1))
- **form-table:** 新增 width, indexWidth, actionsWidth 用于控制列宽度 ([bd27bfc](https://github.com/JayTam/antd-ms/commit/bd27bfce69cd7666a38ac48026d4f848848ca38f))
- **form-table:** 新增 FormTable 组件 ([4e005ec](https://github.com/JayTam/antd-ms/commit/4e005ec718d32f81e23f22e9e79cae94b709a19b))
- **ms-descriptions:** 实现 actionRef.reload 刷新 reqeust ([3f21abf](https://github.com/JayTam/antd-ms/commit/3f21abf5c10a440ffae5c29fce1d15f52486b331))
- **ms-descriptions:** 实现 editable 控制弹窗抽屉表单 ([2947460](https://github.com/JayTam/antd-ms/commit/294746064f8bad9de6aa68c801b5c9b37a3e246d))
- **ms-descriptions:** 实现 eidtable.type=none 不显示编辑按钮 ([d5e0da4](https://github.com/JayTam/antd-ms/commit/d5e0da4299e420d5f183b27b67ce38677da0df94))
- **ms-descriptions:** 实现 request 初始化请求 ([a5780f9](https://github.com/JayTam/antd-ms/commit/a5780f9faa2bc2101fcd800b8d781ae220114c92))
- **ms-descriptions:** 实现编辑模式 ([85b7b86](https://github.com/JayTam/antd-ms/commit/85b7b863d73450a68f563767e35c4aed2d2fee53))
- **ms-descriptions:** 实现标题自定义操作 actions 配置 ([ab092e0](https://github.com/JayTam/antd-ms/commit/ab092e0ba6da703ad6ccf07e641b7f3c6069c5b5))
- **ms-descriptions:** 实现动态 title 和 extra ([26e2b50](https://github.com/JayTam/antd-ms/commit/26e2b50e12dac1a4c224a9a06b24b9f6f59ca633))
- **ms-descriptions:** 实现可编辑可复制 title ([0736e4e](https://github.com/JayTam/antd-ms/commit/0736e4e472a7e09ae660424a96877cce8801eeaa))
- **ms-descriptions:** 实现详情组件实现标签和资源组 ([16071da](https://github.com/JayTam/antd-ms/commit/16071da8e83f2883a3b548a3c0f4ebddfdda33af))
- **ms-descriptions:** 实现选择类组件只读模式下远程请求的 loading 效果 ([d3155f7](https://github.com/JayTam/antd-ms/commit/d3155f72476b6321b61221c54b7b4e3ae3d0ef45))
- **ms-descriptions:** 实现在 MsPage 下自动降级为子容器 ([23c3588](https://github.com/JayTam/antd-ms/commit/23c3588be474c1c9abce2fa740e58d8ba683d3b4))
- **ms-descriptions:** 实现字段配置可复制 ([35c950e](https://github.com/JayTam/antd-ms/commit/35c950e71bdcb0c050f551f9fd8754cdc45db8f0))
- **ms-descriptions:** 完善详情组件文档 ([0c4565a](https://github.com/JayTam/antd-ms/commit/0c4565a7c1cbca29f6f17ebc16a84d42ef17a153))
- **ms-descriptions:** 新增 column.actions 自定义操作 ([8e3fc2d](https://github.com/JayTam/antd-ms/commit/8e3fc2d67d945c7aea8169077a72a0f2d3507158))
- **ms-descriptions:** 新增 editable.formItemProps 区分编辑模式 ([be1eea6](https://github.com/JayTam/antd-ms/commit/be1eea63e5ee7b249947adc343a72f4652ba98ea))
- **ms-descriptions:** 新增 refreshButton 控制刷新按钮开关、 ([7cae880](https://github.com/JayTam/antd-ms/commit/7cae8801ae298bbcd098c1b176528e6198b5e42b))
- **ms-descriptions:** 优化与 MsPage 组合使用情况下，loading 状态管理 ([aae57d9](https://github.com/JayTam/antd-ms/commit/aae57d9d1d476474d055ec702ab07caff3595fbb))
- **ms-descriptions:** 优化 loading 效果，实现 extra 操作栏 ([7b43e69](https://github.com/JayTam/antd-ms/commit/7b43e69c829bcd9babcab38110b78169bcae2d8a))
- **ms-field-rich-text:** 富文本编辑器 ([d7fefb4](https://github.com/JayTam/antd-ms/commit/d7fefb45cc70acaba0c2e5a7fb02131b4daaf49b))
- **ms-field:** 实现单选，多选，级联选择的 label 映射 ([9f32044](https://github.com/JayTam/antd-ms/commit/9f320449777efc97183b783b78a919203d881b0e))
- **ms-field:** 实现日期类组件只读模式，剔除冗余日期组件 ([12694f2](https://github.com/JayTam/antd-ms/commit/12694f2c8bf6330bec7efcb2dce987f7f183e817))
- **ms-field:** rate 组件只读模式 ([7c21394](https://github.com/JayTam/antd-ms/commit/7c213945b75f874051ef3110560a740104d6236d))
- **ms-form:** 实现表单编辑和只读模式 ([2d50b77](https://github.com/JayTam/antd-ms/commit/2d50b7768322412ee384721ff05e9bc24818b6ca))
- **ms-form:** 新增 autoSelect 自动选择模式 ([b350da4](https://github.com/JayTam/antd-ms/commit/b350da45415ba03053702da03002a99a1d444058))
- **ms-form:** 新增抽屉分步表单 ([c148f00](https://github.com/JayTam/antd-ms/commit/c148f002abd433f3b3585a793ca76a4888279f72))
- **ms-form:** 新增弹窗分步表单 ([602675d](https://github.com/JayTam/antd-ms/commit/602675dc5b70bc309d9f412d9b2fe7188d665c87))
- **ms-page:** 容器组件 ([4f978f5](https://github.com/JayTam/antd-ms/commit/4f978f50ed905bb899ccc10cbc04cc22c4d5733b))
- **ms-page:** 实现同步 tab key 到 url ([642e774](https://github.com/JayTam/antd-ms/commit/642e7748cfc83c95056c17265933aacfac358547))
- **ms-table:** 新增 refreshOnWindowFocusIntervalTime 间隔时间 ([f6c8c13](https://github.com/JayTam/antd-ms/commit/f6c8c13564aa12c7ea34765947ae2cfe6436d3f0))

### [2.15.1](https://github.com/JayTam/antd-ms/compare/v2.15.0...v2.15.1) (2023-12-12)

### Bug Fixes

- **form-list:** 修复 formList 和 formTable 设置字段的 mode 异常 ([07cd2f8](https://github.com/JayTam/antd-ms/commit/07cd2f8a66f11a48ea93bf6a8269dc4a3db122d5))
- **ms-descriptions:** 添加 tabProps.syncKeysOnChange 控制 url 参数同步 ([dc763ed](https://github.com/JayTam/antd-ms/commit/dc763edf5d073469862f5636fbf6cf7cb8ec99e5))
- **ms-descriptions:** 新增 dataSource 补充 initalValues 不能实现状态同步的场景 ([5b195d5](https://github.com/JayTam/antd-ms/commit/5b195d5e994e5144643c6e635c410a900867ccf2))
- **ms-descriptions:** 修复 editable 应该默认隐藏 ([b8ec45e](https://github.com/JayTam/antd-ms/commit/b8ec45eb93a95ae9021816a644028375434c4a5f))
- **ms-field:** userGroup 增加 userInGroup 选择模式 ([16f171e](https://github.com/JayTam/antd-ms/commit/16f171e572f9ba20b3db1e5307472691d1af958e))
- **ms-form:** 优化 formTable 中文字过长出现省略号 ([c3ec2c2](https://github.com/JayTam/antd-ms/commit/c3ec2c21f8f4410668e43eb76efb13a4a0a8e3de))

## [2.15.0](https://github.com/JayTam/antd-ms/compare/v2.14.12...v2.15.0) (2023-12-09)

### Features

- **collapsed:** 新增 forceRender 控制节点是否渲染 ([32c24a6](https://github.com/JayTam/antd-ms/commit/32c24a6f77c7394f444593c395971636f572a8fb))
- **form-list:** 实现 FormList 只读模式 ([641d445](https://github.com/JayTam/antd-ms/commit/641d44577707e3338a8f45c5370cf0f5b3047729))
- **form-list:** 新增 addDefaultValue 控制默认添加值 ([968e5af](https://github.com/JayTam/antd-ms/commit/968e5af74defd00f8334135fed7af259d571d0d5))
- **form-table:** 实现 FormTable 只读模式 ([3e8a344](https://github.com/JayTam/antd-ms/commit/3e8a344bbceffee8760912e6ac62c3c7066a1983))
- **form-table:** 新增 tableProps 属性 ([40f5f21](https://github.com/JayTam/antd-ms/commit/40f5f2160d26f2db6e75ba0da3a4e12293e59bf1))
- **form-table:** 新增 width, indexWidth, actionsWidth 用于控制列宽度 ([bd27bfc](https://github.com/JayTam/antd-ms/commit/bd27bfce69cd7666a38ac48026d4f848848ca38f))
- **form-table:** 新增 FormTable 组件 ([4e005ec](https://github.com/JayTam/antd-ms/commit/4e005ec718d32f81e23f22e9e79cae94b709a19b))
- **ms-descriptions:** 实现 actionRef.reload 刷新 reqeust ([3f21abf](https://github.com/JayTam/antd-ms/commit/3f21abf5c10a440ffae5c29fce1d15f52486b331))
- **ms-descriptions:** 实现 editable 控制弹窗抽屉表单 ([2947460](https://github.com/JayTam/antd-ms/commit/294746064f8bad9de6aa68c801b5c9b37a3e246d))
- **ms-descriptions:** 实现 eidtable.type=none 不显示编辑按钮 ([d5e0da4](https://github.com/JayTam/antd-ms/commit/d5e0da4299e420d5f183b27b67ce38677da0df94))
- **ms-descriptions:** 实现 request 初始化请求 ([a5780f9](https://github.com/JayTam/antd-ms/commit/a5780f9faa2bc2101fcd800b8d781ae220114c92))
- **ms-descriptions:** 实现编辑模式 ([85b7b86](https://github.com/JayTam/antd-ms/commit/85b7b863d73450a68f563767e35c4aed2d2fee53))
- **ms-descriptions:** 实现标题自定义操作 actions 配置 ([ab092e0](https://github.com/JayTam/antd-ms/commit/ab092e0ba6da703ad6ccf07e641b7f3c6069c5b5))
- **ms-descriptions:** 实现动态 title 和 extra ([26e2b50](https://github.com/JayTam/antd-ms/commit/26e2b50e12dac1a4c224a9a06b24b9f6f59ca633))
- **ms-descriptions:** 实现可编辑可复制 title ([0736e4e](https://github.com/JayTam/antd-ms/commit/0736e4e472a7e09ae660424a96877cce8801eeaa))
- **ms-descriptions:** 实现详情组件实现标签和资源组 ([16071da](https://github.com/JayTam/antd-ms/commit/16071da8e83f2883a3b548a3c0f4ebddfdda33af))
- **ms-descriptions:** 实现选择类组件只读模式下远程请求的 loading 效果 ([d3155f7](https://github.com/JayTam/antd-ms/commit/d3155f72476b6321b61221c54b7b4e3ae3d0ef45))
- **ms-descriptions:** 实现在 MsPage 下自动降级为子容器 ([23c3588](https://github.com/JayTam/antd-ms/commit/23c3588be474c1c9abce2fa740e58d8ba683d3b4))
- **ms-descriptions:** 实现字段配置可复制 ([35c950e](https://github.com/JayTam/antd-ms/commit/35c950e71bdcb0c050f551f9fd8754cdc45db8f0))
- **ms-descriptions:** 完善详情组件文档 ([0c4565a](https://github.com/JayTam/antd-ms/commit/0c4565a7c1cbca29f6f17ebc16a84d42ef17a153))
- **ms-descriptions:** 新增 column.actions 自定义操作 ([8e3fc2d](https://github.com/JayTam/antd-ms/commit/8e3fc2d67d945c7aea8169077a72a0f2d3507158))
- **ms-descriptions:** 新增 editable.formItemProps 区分编辑模式 ([be1eea6](https://github.com/JayTam/antd-ms/commit/be1eea63e5ee7b249947adc343a72f4652ba98ea))
- **ms-descriptions:** 新增 refreshButton 控制刷新按钮开关、 ([7cae880](https://github.com/JayTam/antd-ms/commit/7cae8801ae298bbcd098c1b176528e6198b5e42b))
- **ms-descriptions:** 优化与 MsPage 组合使用情况下，loading 状态管理 ([aae57d9](https://github.com/JayTam/antd-ms/commit/aae57d9d1d476474d055ec702ab07caff3595fbb))
- **ms-descriptions:** 优化 loading 效果，实现 extra 操作栏 ([7b43e69](https://github.com/JayTam/antd-ms/commit/7b43e69c829bcd9babcab38110b78169bcae2d8a))
- **ms-field-rich-text:** 富文本编辑器 ([d7fefb4](https://github.com/JayTam/antd-ms/commit/d7fefb45cc70acaba0c2e5a7fb02131b4daaf49b))
- **ms-field:** 实现单选，多选，级联选择的 label 映射 ([9f32044](https://github.com/JayTam/antd-ms/commit/9f320449777efc97183b783b78a919203d881b0e))
- **ms-field:** 实现日期类组件只读模式，剔除冗余日期组件 ([12694f2](https://github.com/JayTam/antd-ms/commit/12694f2c8bf6330bec7efcb2dce987f7f183e817))
- **ms-field:** rate 组件只读模式 ([7c21394](https://github.com/JayTam/antd-ms/commit/7c213945b75f874051ef3110560a740104d6236d))
- **ms-form:** 实现表单编辑和只读模式 ([2d50b77](https://github.com/JayTam/antd-ms/commit/2d50b7768322412ee384721ff05e9bc24818b6ca))
- **ms-form:** 新增 autoSelect 自动选择模式 ([b350da4](https://github.com/JayTam/antd-ms/commit/b350da45415ba03053702da03002a99a1d444058))
- **ms-form:** 新增抽屉分步表单 ([c148f00](https://github.com/JayTam/antd-ms/commit/c148f002abd433f3b3585a793ca76a4888279f72))
- **ms-form:** 新增弹窗分步表单 ([602675d](https://github.com/JayTam/antd-ms/commit/602675dc5b70bc309d9f412d9b2fe7188d665c87))
- **ms-page:** 容器组件 ([4f978f5](https://github.com/JayTam/antd-ms/commit/4f978f50ed905bb899ccc10cbc04cc22c4d5733b))
- **ms-page:** 实现同步 tab key 到 url ([642e774](https://github.com/JayTam/antd-ms/commit/642e7748cfc83c95056c17265933aacfac358547))
- **ms-table:** 新增 refreshOnWindowFocusIntervalTime 间隔时间 ([f6c8c13](https://github.com/JayTam/antd-ms/commit/f6c8c13564aa12c7ea34765947ae2cfe6436d3f0))

### Bug Fixes

- **cascader:** 修复多选且远程搜索可选项交互问题 ([ac89df4](https://github.com/JayTam/antd-ms/commit/ac89df48e4b6e0dd6e347fde1e58427dd95ad41d))
- **code-editor:** codeEditor 和 diffEditor 支持 options ([711f652](https://github.com/JayTam/antd-ms/commit/711f652208c0c4d0257820611fc9bf330696d3e7))
- **form-table:** 必选标识和 tooltip 展示在表格 title 上 ([706c0ea](https://github.com/JayTam/antd-ms/commit/706c0eafe726d856730a6c35f9788fac958b2c82))
- **form-table:** 修复 actions 为空数组仍然显示操作列 ([8d38c85](https://github.com/JayTam/antd-ms/commit/8d38c85747fe2a4283195b516743d43d58c9cc58))
- **form-table:** 修复 form-table 无法实现函数配置 columns ([519126e](https://github.com/JayTam/antd-ms/commit/519126ec4eec19c2f6f0f2d01c27beff5f001224))
- **form-table:** 优化 FormTable 交互细节 ([1009ed2](https://github.com/JayTam/antd-ms/commit/1009ed2cb44cd7d420058ea315136380030b8c9b))
- **ms-desciptions:** 修复 editable 的弹窗/抽屉属性不生效 ([9468217](https://github.com/JayTam/antd-ms/commit/946821726708b9949684120bc91620f2c4c19593))
- **ms-descriptions:** 修复 fieldReadRender 不生效 ([ec733bb](https://github.com/JayTam/antd-ms/commit/ec733bb8d644f5286a1565c5e815f23fd83dd175))
- **ms-descriptions:** 修复警告 ([2a56109](https://github.com/JayTam/antd-ms/commit/2a561093a77029571a0719f49561b4134904ebfd))
- **ms-descriptions:** 优化样式 ([66ac1f8](https://github.com/JayTam/antd-ms/commit/66ac1f8b98fb26e771a62d3979e8997f06479a28))
- **ms-descriptions:** 优化样式 ([ea3fd0b](https://github.com/JayTam/antd-ms/commit/ea3fd0b16a3bcefcebd7876d100fc7d18a29d1bc))
- **ms-field-code-editor:** 代码编辑器和代码对比 options 被占用，修改为 editorOptions ([957ea44](https://github.com/JayTam/antd-ms/commit/957ea44e47d02b3ab4cf058013545cc7cc84b53f))
- **ms-field-diff-editor:** 对比编辑器增加 diffChanges API ([aaf7e63](https://github.com/JayTam/antd-ms/commit/aaf7e631c7a50ac9f3f0dddf5af3c250406324ea))
- **ms-field-rich-text:** 富文本编辑器动态注册 ([b9e819c](https://github.com/JayTam/antd-ms/commit/b9e819cd128c0971b0e2f8110bcaa97545d46dfc))
- **ms-field:** 解决冲突 ([e9fdcde](https://github.com/JayTam/antd-ms/commit/e9fdcde42cc3f378b3c2d36d73747f2e0deb9c7f))
- **ms-field:** 解决 UserGroup 类型问题 ([b6dc6fd](https://github.com/JayTam/antd-ms/commit/b6dc6fdac7a25d042972247e07e8fcfa213ced94))
- **ms-field:** 人员组件重构，支持邮件和组织架构远程请求，格式化返回数据，自定义参数设置 ([ed2db42](https://github.com/JayTam/antd-ms/commit/ed2db42c8e5757f9533cd1ccb4deda577ffd5fd9))
- **ms-field:** 上传组件只读模式 ([8eaf2ea](https://github.com/JayTam/antd-ms/commit/8eaf2ea7f6602ea424396d89140d02baae3a7c2d))
- **ms-field:** 实现 UserGroup 不可删除的用户或团队配置 ([7d44684](https://github.com/JayTam/antd-ms/commit/7d44684d21d225da314ce3cf6795283ad76158eb))
- **ms-field:** 修复 select 组件点击刷新不生效 ([e67b67b](https://github.com/JayTam/antd-ms/commit/e67b67bf7bd31a91e47c6341e7c0e67c6483b14d))
- **ms-field:** 修复 User 组件一直重复渲染 ([34bf518](https://github.com/JayTam/antd-ms/commit/34bf5180f2f90028a642525f945d49ddd11e197a))
- **ms-field:** 修复 UserGroup 代码 ([20a7e81](https://github.com/JayTam/antd-ms/commit/20a7e811f9961a890e7cf815920375c8a02ac3eb))
- **ms-field:** 增加 userPopover 表单项 ([efa8893](https://github.com/JayTam/antd-ms/commit/efa8893701d969009d5f8f271e2cacbd8a9b1cbf))
- **ms-field:** 重构 userGroup ([c279a58](https://github.com/JayTam/antd-ms/commit/c279a58c9713d77d302d5de81686604ec441f0d8))
- **ms-field:** user 组件增加卡片选人 ([0917473](https://github.com/JayTam/antd-ms/commit/091747349a3e2de68b7420fdac0ea07baf4880eb))
- **ms-field:** userGroup 配置 fullName,fullCode ([0d8baf3](https://github.com/JayTam/antd-ms/commit/0d8baf3787d5a3cb006c0816231fd8b55dc0f9b4))
- **ms-field:** userGroup 支持搜索用户枚举，团队下搜索用户的枚举, ([be98a9f](https://github.com/JayTam/antd-ms/commit/be98a9f19d6c379e77c4489193438a5d98580120))
- **ms-field:** userPopover 人员详情悬浮框宽度自适应，样式优化 ([5b41270](https://github.com/JayTam/antd-ms/commit/5b41270696c0f947dce573cb7505984a6825f319))
- **ms-field:** userPopover 增加 placement 控制气泡位置，删除按钮跟随 label 后面 ([737962d](https://github.com/JayTam/antd-ms/commit/737962dc1b32a7452cf48bd6af13fec6ae5f8038))
- **ms-field:** userPopover 只读模式渲染 ([9c5763c](https://github.com/JayTam/antd-ms/commit/9c5763ce2ed05cfd116565bc33743cb0d22008e1))
- **ms-form:** 修复 autoSelect ([3efd776](https://github.com/JayTam/antd-ms/commit/3efd776ca4dc2f08fc0621ca48fbf0780121224b))
- **ms-form:** 修复 formList 和 formTable 子项设置 dependencies 之后存在问题 ([8776d1e](https://github.com/JayTam/antd-ms/commit/8776d1e33d37aba5070c03fcd05d8478b54d8261))
- **ms-form:** 修复分步弹窗/抽屉表单成功之后未自动关闭 ([a6aba99](https://github.com/JayTam/antd-ms/commit/a6aba99307f4074fe9aac525f098e27e7ec4c7b7))
- **ms-form:** 修复自定义组件错误 ([efcdcef](https://github.com/JayTam/antd-ms/commit/efcdcef2d23ce3f4091069332bacfd133361843c))
- **ms-form:** 修复 valueEnumSyncToForm 在 labelInValue 场景下失效 ([59e8977](https://github.com/JayTam/antd-ms/commit/59e89779d0738142a32e35ee7cf1bcb5df601fd6))
- **ms-form:** 优化 field 组件初始化请求状态 ([bfe0603](https://github.com/JayTam/antd-ms/commit/bfe0603fa585f9931535f0e26b77bece76bf58dc))
- **ms-form:** 优化字段初始化请求 loading 状态 ([c300275](https://github.com/JayTam/antd-ms/commit/c300275aeffde1fdc896b24a109269c15b745ae3))
- **ms-layout:** ms-layout baseUrl 的修复 ([d4b83d4](https://github.com/JayTam/antd-ms/commit/d4b83d4236319b84b91c594af29e66f953101587))
- **ms-layout:** ms-layout 增加 baseUrl ([6fe478d](https://github.com/JayTam/antd-ms/commit/6fe478daef036896ca9ebad2a646d35908ee5e47))
- **ms-modal:** msModal 打开 confirm 方法 ([5c4bde9](https://github.com/JayTam/antd-ms/commit/5c4bde931ad0018e50a656bfe41ee2b6d49fedee))
- **ms-page:** 操作区域支持函数，支持传 MsActionsProps 配置 ([d9fd43f](https://github.com/JayTam/antd-ms/commit/d9fd43f185422dd0b0bcbcd911796fcb74d9f60c))
- **ms-page:** 解决 MsPage 合并冲突 ([a5d4ae8](https://github.com/JayTam/antd-ms/commit/a5d4ae8740908d5935425f9f5cd9458df68b66d9))
- **ms-page:** 容器组件重构，拆分 title，extra，tabs ([52d13ea](https://github.com/JayTam/antd-ms/commit/52d13eaf1de12e6a19b847476617e7994d203e72))
- **ms-page:** 容器组件 loading 不包括返回按钮 ([2f76423](https://github.com/JayTam/antd-ms/commit/2f76423243830c01420ab36b8412238d7d319e49))
- **ms-page:** 修复 children 函数运行两次 ([079fdb7](https://github.com/JayTam/antd-ms/commit/079fdb714d8ac37b4ec1b5e8e7693b5b69916411))
- **ms-page:** 修复 MsPage 请求两次 ([491d90e](https://github.com/JayTam/antd-ms/commit/491d90e7066de06d49a91a5681761cb269c7342a))
- **ms-page:** 修改 loading 影响范围，删除 contentRender 参数，刷新按钮有 request 才生效 ([ba565e1](https://github.com/JayTam/antd-ms/commit/ba565e12ed0b2e5f07495aab9c9822048b4db21a))
- **ms-page:** 子容器增加下 padding，margin,border。主容器默认返回按钮为 true。调整 header 间距 ([c572606](https://github.com/JayTam/antd-ms/commit/c57260687f5bdd9841fbbd9be6266d857da60c4f))
- **ms-page:** ms-page 容器组件去掉 pageType 属性，增加 MsPage.SubPage ([3de0a38](https://github.com/JayTam/antd-ms/commit/3de0a38d05f63b90085cef5c68ca19dfdf38993a))
- **ms-page:** msPage loading 时 extra 按钮区显示骨架屏 ([ea74bf4](https://github.com/JayTam/antd-ms/commit/ea74bf4e3da1b386c014b5ba5530e26b439f5dc2))
- **ms-table:** 修复 manualRequest=ture，params 变更不重新请求 ([876deed](https://github.com/JayTam/antd-ms/commit/876deed5de227a09f8c685987e75ca495b54e420))
- **ms-table:** 修复 y:auto-content 时，x 轴出滚动条 empty 没有居中显示 ([19762ff](https://github.com/JayTam/antd-ms/commit/19762ff5cc2e8866522b9ccf57fb582984b90f0f))
- **ms-table:** 修复开启列拖动时，隐藏列项会影响原有列宽度 ([e605b50](https://github.com/JayTam/antd-ms/commit/e605b503e66aa4db3628c6f0359beaa6f686d41c))
- **ms-table:** 修复列设置 bug ([cb59dae](https://github.com/JayTam/antd-ms/commit/cb59daeb1a2d8e55c165ee33eb642714f81c45b6))
- **ms-table:** 优化文案，密度->行高 ([c707327](https://github.com/JayTam/antd-ms/commit/c707327c67ccfbeac69f2cfd83b6f198bcb19994))

### [2.14.12](https://github.com/JayTam/antd-ms/compare/v2.14.11...v2.14.12) (2023-11-07)

### Bug Fixes

- **ms-table:** 补充 tooltipsProps 自定义样式 ([f1d13ee](https://github.com/JayTam/antd-ms/commit/f1d13ee33bbc3262d8ce3b3ae46e19fd3f380ccb))
- **ms-table:** 联动 disabled 修复 ([bd20bbe](https://github.com/JayTam/antd-ms/commit/bd20bbe28a32c082092cf64f5130d4852464eb34))
- **ms-table:** 修复缓存导致不会二次请求 valueEnum ([65cfddb](https://github.com/JayTam/antd-ms/commit/65cfddb3b3876d2c71d9eb9ac36930382838c5dc))

### [2.14.11](https://github.com/JayTam/antd-ms/compare/v2.14.10...v2.14.11) (2023-11-02)

### Bug Fixes

- **ms-form:** 补充 stepsPorops.afterChange 用于监听当前步数 ([15c9237](https://github.com/JayTam/antd-ms/commit/15c9237322ea38550543b28fb2d864cdaebde85b))
- **ms-form:** 修复 useRequest 因为 react16,17 和 18 不兼容导致 initialValues 不回显问题 ([000807c](https://github.com/JayTam/antd-ms/commit/000807c5f3ec0eeb9d95bb792a97dc551256c99b))

### [2.14.10](https://github.com/JayTam/antd-ms/compare/v2.14.9...v2.14.10) (2023-11-01)

### Bug Fixes

- **ms-form:** 修复联动依赖请求偶现情况 ([964de7f](https://github.com/JayTam/antd-ms/commit/964de7f9493c56ea4676f98bf368110074a0beca))
- **ms-form:** 修复 ModalForm 传 form 实例失效 ([0d02d10](https://github.com/JayTam/antd-ms/commit/0d02d1081530da0b2ff0c66efef67cd4ba11fe00))
- **ms-form:** 修复 params 为函数可能出现的异常 ([b503d76](https://github.com/JayTam/antd-ms/commit/b503d7649e4ccf57945859edac691e43909409ae))
- **ms-form:** 优化 field 远程请求可选项 ([167d7f1](https://github.com/JayTam/antd-ms/commit/167d7f195a623abc212fa8b3492dba5f8109ad92))

### [2.14.9](https://github.com/JayTam/antd-ms/compare/v2.14.8...v2.14.9) (2023-10-30)

### Bug Fixes

- **collapse:** 表单校验失败，展开所有折叠组件 ([2e0bcce](https://github.com/JayTam/antd-ms/commit/2e0bcce298d2e6cf76f4bb2f78dca00f452ce3f8))
- **form-list:** 动态触发校验 ([51a1b2e](https://github.com/JayTam/antd-ms/commit/51a1b2e2b0ba6ff3922697e068c4d122a2e4836e))
- **form-list:** 优化底部新增按钮超过最大限制的交互 ([7bf49e8](https://github.com/JayTam/antd-ms/commit/7bf49e8ae7759d4f3c9261090dd7cb31731b14b5))
- **form-list:** 优化最大和最小个数限制展示方式 ([da80799](https://github.com/JayTam/antd-ms/commit/da80799e1f059d14e654b78566393c014a143db1))

### [2.14.8](https://github.com/JayTam/antd-ms/compare/v2.14.7...v2.14.8) (2023-10-25)

### Bug Fixes

- **collapse:** 新增默认是否折叠配置 ([2e44aa6](https://github.com/JayTam/antd-ms/commit/2e44aa63820a4ed19ea04edbbbe0edc2f62347db))
- **collapse:** 修复折叠表单项未校验 ([6cdae94](https://github.com/JayTam/antd-ms/commit/6cdae943bea9643ebca93b7fa567eb190a9bf0fc))
- **form-list:** 补充按钮样式文案 API ([d95d36d](https://github.com/JayTam/antd-ms/commit/d95d36d1aa5f61edaad93d7499b860c2e3996660))
- **form-list:** 补充 showAddInBottom 控制底部添加按钮 ([be89a34](https://github.com/JayTam/antd-ms/commit/be89a34fc831b814a16adf1230034642f42b637d))
- **ms-form:** 修复 params 变更未触发重新请求 ([90c0b15](https://github.com/JayTam/antd-ms/commit/90c0b15da125c2ccef9b7f8acf4dde192786f635))
- **ms-layout:** 入了 roles 时，当前路由不能匹配到菜单列表任意项时，会回传此函数，常用作处理 404 ([c6a7a4e](https://github.com/JayTam/antd-ms/commit/c6a7a4ebce8824ad64efdf7d9169f65d749dc0cb))
- **usergroup:** 优化入参逻辑 ([ef3fe77](https://github.com/JayTam/antd-ms/commit/ef3fe7775019696abd8ca092c160a9825471cc4d))
- **usergroup:** userGroup 换成驼峰写法 ([a80d5cc](https://github.com/JayTam/antd-ms/commit/a80d5cc0c2aaed7352a882ca9f9e7efc9e3ffaaf))

### [2.14.7](https://github.com/JayTam/antd-ms/compare/v2.14.6...v2.14.7) (2023-10-19)

### Bug Fixes

- **ms-form:** 修复 onStepChangeFailed 失效 ([163b8fc](https://github.com/JayTam/antd-ms/commit/163b8fc82089e71aaca3a765b4d622873c33bb7b))
- **ms-form:** formlist 删除之后自动触发重新校验 ([54cf14d](https://github.com/JayTam/antd-ms/commit/54cf14de6d4c452d72f7564d149fc18e44246df8))
- **usergroup:** 增加人员组件 ([38be37f](https://github.com/JayTam/antd-ms/commit/38be37f7dcd0146d8d78dde6bd255d3270e1ac8d))
- **usergroup:** 增加 userGroup ([a2a296d](https://github.com/JayTam/antd-ms/commit/a2a296d629cd2e584a6829a03b4844e85f04e3f6))

### [2.14.6](https://github.com/JayTam/antd-ms/compare/v2.14.5...v2.14.6) (2023-10-17)

### Bug Fixes

- **ms-form:** 修复 formlist 列唯一校验使用的是 key 而不是 name，shouldUpdate 不默认设置 disabled ([a2432a8](https://github.com/JayTam/antd-ms/commit/a2432a8fb0c62d8289c6692c7e9a5fcc4e5f2030))
- **ms-form:** 修复 MsBaseForm 参数错误覆盖 ([1e82198](https://github.com/JayTam/antd-ms/commit/1e82198168f1cc81d20101f4bc9df53e6462408d))

### [2.14.5](https://github.com/JayTam/antd-ms/compare/v2.14.4...v2.14.5) (2023-10-16)

### Bug Fixes

- **ms-form:** 修复 submitter.render 在弹窗情况下没有 form 参数 ([9d67497](https://github.com/JayTam/antd-ms/commit/9d67497b51b3362b96c6733dc8cf056a7893f40a))
- **ms-form:** valueType 类型增加 string ([d1da22b](https://github.com/JayTam/antd-ms/commit/d1da22be8818e482a9c8204cb0848e994d45d228))

### [2.14.4](https://github.com/JayTam/antd-ms/compare/v2.14.3...v2.14.4) (2023-10-13)

### Bug Fixes

- **ms-table:** 修复资源标签其中可能不存在 gri 的场景 ([5c6b3a4](https://github.com/JayTam/antd-ms/commit/5c6b3a466f4217687d364ceba714bf4338053c2a))

### [2.14.3](https://github.com/JayTam/antd-ms/compare/v2.14.2...v2.14.3) (2023-10-13)

### Bug Fixes

- **ms-request:** 修复接口防参数篡改关键字命名，对标 RFC3986 特殊字符处理 ([acc38f9](https://github.com/JayTam/antd-ms/commit/acc38f957be3f69eeb97bf29c3b808d510b7f42c))

### [2.14.2](https://github.com/JayTam/antd-ms/compare/v2.14.1...v2.14.2) (2023-10-11)

### Bug Fixes

- **ms-form:** 修复 submitter.render 失效 ([56f6c3a](https://github.com/JayTam/antd-ms/commit/56f6c3a64ef7269b177ab6bb88851a9f977ec9bd))

### [2.14.1](https://github.com/JayTam/antd-ms/compare/v2.14.0...v2.14.1) (2023-10-11)

### Bug Fixes

- **ms-table:** 修复自适应高度多 1px ([5fca62e](https://github.com/JayTam/antd-ms/commit/5fca62e5a1fcb4be7ab7a6dc64fb44e46c15cdfd))

## [2.14.0](https://github.com/JayTam/antd-ms/compare/v2.13.0...v2.14.0) (2023-10-11)

### Features

- **ms-field:** 完善选择器类组件 API ([91d1b11](https://github.com/JayTam/antd-ms/commit/91d1b11c5e4c0b90a6f29cf9a7a7a19f6e35eafb))
- **ms-form-list:** 基础实现表单列表 ([25c0bd4](https://github.com/JayTam/antd-ms/commit/25c0bd406fadca1dc29fd61ca79184a1a96b3987))
- **ms-form-list:** 实现列表项之间的依赖 ([98b8287](https://github.com/JayTam/antd-ms/commit/98b828707f134c7fda9d66fd007c989c90714ce1))
- **ms-form-list:** 实现 formlist 中的操作按钮 ([fc7999d](https://github.com/JayTam/antd-ms/commit/fc7999dd23e98a0690ba6652b7cff28288ba8465))
- **ms-form-list:** 完善列表中 request 缓存 ([abe9f76](https://github.com/JayTam/antd-ms/commit/abe9f76372f02ae5b95f74262fc139c8b7790f94))
- **ms-form-list:** 新增子表单组件 ([04204a0](https://github.com/JayTam/antd-ms/commit/04204a0d23fdfae08ea3aca035dc4b9568860392))
- **ms-form:** 实现 column.valueEnumSyncToForm，标准化依赖整个可选项的值的解决方案 ([c5dd7a7](https://github.com/JayTam/antd-ms/commit/c5dd7a70fce1eaf04d6deb48df01201df0b3b5c2))
- **ms-form:** 实现表单项缓存 request 请求 valueEnum ([8a26d96](https://github.com/JayTam/antd-ms/commit/8a26d96c20beb93af965a5bd5d35b04d89077b83))
- **ms-form:** 新增 column.shouldUpdate 支持自身依赖 ([7824ab2](https://github.com/JayTam/antd-ms/commit/7824ab2771bcd9103875ef56e7faa3a8b49d35ec))
- **ms-form:** 新增 column.shouldUpdate，支持表单项自身监听 ([6b871bb](https://github.com/JayTam/antd-ms/commit/6b871bbd5856df5f5a97c3eac3ee3ef2da6f26bb))
- **ms-form:** 支持动态注册 field ([d4f4c75](https://github.com/JayTam/antd-ms/commit/d4f4c75049e7a06c962b8ed4ffc58c3b8481609e))
- **ms-form:** 子表单继承 labelCol 和 wrapperCol ([655d735](https://github.com/JayTam/antd-ms/commit/655d7354b20e670add44d1a685e0e0caad23a69b))
- **ms-form:** formlist 列之间的 option 依赖 ([980a17b](https://github.com/JayTam/antd-ms/commit/980a17b5db643aa8a71ea8c8ebc9cee6f2de09f4))

### Bug Fixes

- **ms-copy:** 空字符串不能复制 ([b1e8862](https://github.com/JayTam/antd-ms/commit/b1e8862629d0333fb1c512fbcc21e6f43191a688))
- **ms-form:** 解决 shouldUpdate 和 dependeices 同时出现 ([9d6b7cb](https://github.com/JayTam/antd-ms/commit/9d6b7cb9595903703b978a8e9d15f29f04cab9e2))
- **ms-form:** 修复分步表单样式影响 ([badc55f](https://github.com/JayTam/antd-ms/commit/badc55f64ee2bbd6a3df6b82bf3af7c96a55e6df))
- **ms-form:** 修复自定义组件报错 ([0c96410](https://github.com/JayTam/antd-ms/commit/0c9641016782678b1c37438fd78df8fb646e15b5))
- **ms-form:** 修复 form 实例没有匹配 Form 组件的警告 ([c714eb5](https://github.com/JayTam/antd-ms/commit/c714eb5b867e5eff25e06fa1546bab82420b8929))
- **radio:** 优化样式 ([ba5b864](https://github.com/JayTam/antd-ms/commit/ba5b8643d51b3620a0a2598c437970c6855530b4))

## [2.13.0](https://github.com/JayTam/antd-ms/compare/v2.12.0...v2.13.0) (2023-09-28)

### Features

- **ms-request:** aPI 安全测试环境上线 ([d78c89f](https://github.com/JayTam/antd-ms/commit/d78c89f54be453b2006b914630aa789853709719))
- **ms-request:** api 安全上线，发布 feat ([5d7f055](https://github.com/JayTam/antd-ms/commit/5d7f055f09e948eed439fe79ca400121250da5f2))

### Bug Fixes

- 去掉组件中的样式的 important ([d29a5e0](https://github.com/JayTam/antd-ms/commit/d29a5e0f386983ea33f5cbc945e535a7caa4cef5))
- **ms-field-user:** 部门人员组件 less 修改 ([5eec234](https://github.com/JayTam/antd-ms/commit/5eec234cfd8cfda5639bf6cb6dd3431d1b879269))
- **ms-field-user:** 优化人员组件弹窗层级和 tabs ([12011e6](https://github.com/JayTam/antd-ms/commit/12011e62750902efd2c246a97fa5a71dd2b0b57f))
- **ms-field:** 优化表单项前缀后缀样式 ([e852964](https://github.com/JayTam/antd-ms/commit/e852964d1842b5d12f40bcca73d0525ca9ebca4e))
- **ms-flow:** 修复分步表单校验 ([1e502dc](https://github.com/JayTam/antd-ms/commit/1e502dc2514aae0728246c9e043d6989781163e1))
- **ms-fom:** 修复 onFinishFailed 能捕获到分步校验错误 ([65c0878](https://github.com/JayTam/antd-ms/commit/65c0878f8dc0ee2ab09e7786460a1e330f4c7201))
- **ms-form:** 修复表单校验错误自动滚动到第一个错误 ([37ae135](https://github.com/JayTam/antd-ms/commit/37ae13559d3b9868e4f086f8b6a2414a6e3911da))
- **ms-form:** 修复分步表单校验 ([b41118d](https://github.com/JayTam/antd-ms/commit/b41118df2bbfbd972024aa3ce862c3ac731d6fa3))
- **ms-form:** 修复分步表单校验问题 ([eec3914](https://github.com/JayTam/antd-ms/commit/eec391416d2a4c0ffeb4932d35c9f3015b0cf51c))
- **ms-form:** 修复有依赖的情况下，options 没有动态更新 ([c483ef8](https://github.com/JayTam/antd-ms/commit/c483ef8b8989e3fd9d3bd16bccd7d6bead4d04d7))
- **ms-form:** 修复直传 options 时，labelInValue 失效 ([8956892](https://github.com/JayTam/antd-ms/commit/8956892743aa1a1eb24b6c2e8f7f96badedff36e))
- **ms-form:** 修复 ip 初始值被当成时间格式转换 ([b8f90e1](https://github.com/JayTam/antd-ms/commit/b8f90e1101cfc05fdeb98f310cab63250c166d27))
- **ms-table:** 修复筛选项过多换行 ([bf42519](https://github.com/JayTam/antd-ms/commit/bf42519e3d4ce6bf635bfc1b0193ed9bc1082a6a))

## [2.12.0](https://github.com/JayTam/antd-ms/compare/v2.11.1...v2.12.0) (2023-09-07)

### Features

- **ms-table:** 新增 columnEmptyText 控制表格空显示，默认为[-] ([ab7eb48](https://github.com/JayTam/antd-ms/commit/ab7eb483b452ae9b43bad6cce40ed92a49281edd))

### [2.11.1](https://github.com/JayTam/antd-ms/compare/v2.11.0...v2.11.1) (2023-09-04)

### Bug Fixes

- **ms-form:** 修复 initialRequest 默认值 ([d3dcfb6](https://github.com/JayTam/antd-ms/commit/d3dcfb666312379136245ede2fc3404847c99be9))
- **ms-table:** 默认开启 omitEmptyValues，避免空字符串提交 ([32bf5b8](https://github.com/JayTam/antd-ms/commit/32bf5b82662b28b5e0b050032bfca3b0833829a5))

## [2.11.0](https://github.com/JayTam/antd-ms/compare/v2.10.1...v2.11.0) (2023-08-31)

### Features

- **ms-field-collapse:** 基础实现折叠分组 ([d58b98c](https://github.com/JayTam/antd-ms/commit/d58b98cdc209d8fe16b642a9ff20bc92373242b9))
- **ms-field-user:** 选人员，邮件组组件 ([c829d80](https://github.com/JayTam/antd-ms/commit/c829d800ca325b124120d462edf713923d03ff02))
- **ms-form:** 有依赖项，默认关闭初始化请求 ([8fec0f4](https://github.com/JayTam/antd-ms/commit/8fec0f4f1523599cdbc775389b4106e58ba47a82))
- **ms-table:** 多项搜素仅一条时，不显示选择器 ([2b18901](https://github.com/JayTam/antd-ms/commit/2b18901d2d97ee0bde8b8cd2db09eda0b886c8ff))
- **ms-table:** 新增 light-query 筛选模式, 新增 menuRender 菜单渲染位置 ([53ab586](https://github.com/JayTam/antd-ms/commit/53ab5865fa3a4d319afbb7373da16b05492d0070))
- **ms-table:** 新增 defaultInFilter 控制筛选器激活 ([c0b9791](https://github.com/JayTam/antd-ms/commit/c0b979191bdfd15b6f247e2f5694301dfd782738))

### Bug Fixes

- 去掉@babel/runtime 依赖 ([656ad5c](https://github.com/JayTam/antd-ms/commit/656ad5c290a37a828824c90453ea9d6aeca58f00))
- 修复 sentry 引入错误 ([cffaf5d](https://github.com/JayTam/antd-ms/commit/cffaf5dffddc03e19bf899568b912cbd03401bed))
- 修改 react-router-dom 版本 ([33c218f](https://github.com/JayTam/antd-ms/commit/33c218f9e5c4f8bbc6b8d71169722ac5c10064fa))
- 修改 react-router-dom 版本，解决微前端报错问题 ([793a425](https://github.com/JayTam/antd-ms/commit/793a4258fec39f822248eb0a19059e3538d687ce))
- **ms-configprovider:** 固定 sentry 版本，变更导入方式 ([04acc65](https://github.com/JayTam/antd-ms/commit/04acc6511f5b07dae9ba1607686abd384d85772a))
- **ms-field-group:** 分组显示增加内联模式，标题增加标题线展示形式 ([451fd80](https://github.com/JayTam/antd-ms/commit/451fd80af1760d858905b875955815f944c11fee))
- **ms-field-group:** 分组优化 ([ca619bd](https://github.com/JayTam/antd-ms/commit/ca619bda44f8ff1b756ecc960c52fd906d799efc))
- **ms-field-group:** 分组支持 fieldProps ([923fa70](https://github.com/JayTam/antd-ms/commit/923fa703bea205cec7a88ae1253474763a27b437))
- **ms-field-group:** 分组组件扩展支持常规和无状态展示方式 ([718ad15](https://github.com/JayTam/antd-ms/commit/718ad1568f975d862b43f861e7da082ce9eb4abe))
- **ms-field-user:** fix 人员组件选择后下拉框数据 ([fa4812a](https://github.com/JayTam/antd-ms/commit/fa4812a666c3baedb721a1b1997a84317e360623))
- **ms-iconfont:** 修复同名 icon 的加载顺序问题 ([155dc0a](https://github.com/JayTam/antd-ms/commit/155dc0a5858dccfbd402a619ac9da58331b47576))
- **ms-layout:** 修复多层路由点击第一层菜单不能跳转问题 ([5d1788b](https://github.com/JayTam/antd-ms/commit/5d1788b7d077ef6f5d60d52bf85332105e13e669))
- **ms-table:** 加 import 临时解决样式覆盖 ([815c580](https://github.com/JayTam/antd-ms/commit/815c580d3e0474398d30976fd9347591c98d49ab))
- **ms-table:** 临时修复初次渲染默认升序失效 ([a6dc05f](https://github.com/JayTam/antd-ms/commit/a6dc05f52a20e9c34ab67b327ed0a381997a6980))
- **ms-table:** 修复自定义组件报错 ([f97012d](https://github.com/JayTam/antd-ms/commit/f97012dd99f3b523812aa67cf0bda2520804b61a))
- **ms-table:** 修复 search 方法未重置初始值 ([fdb136d](https://github.com/JayTam/antd-ms/commit/fdb136d3a939c418f8b4a04a5497b27c2ac02627))

### [2.10.1](https://github.com/JayTam/antd-ms/compare/v2.10.0...v2.10.1) (2023-08-18)

### Bug Fixes

- **ms-field:** 表单项前缀后缀增加 padding ([c0528d9](https://github.com/JayTam/antd-ms/commit/c0528d98b96b841a93b17ba5ae5f200e86158e8f))
- **ms-form:** 优化所有表单项支持前缀后缀，并在 read 和 edit 模式下均支持 ([538b837](https://github.com/JayTam/antd-ms/commit/538b837f16ad104eec140b0981aff0936212637f))
- **ms-table:** 规范化 search 方法，从外部数据修改内部表单状态 ([1923bf2](https://github.com/JayTam/antd-ms/commit/1923bf2da799bc094e2d5a43635fbecf2489a3c7))
- **ms-table:** 扩展 tableTitle 支持 ReactNode ([c89f032](https://github.com/JayTam/antd-ms/commit/c89f032928638c0cb1ea41bf2021ca10ccd69e98))
- **ms-table:** 修复级联选择器多选远程获取初始值，刷新之后丢失 ([a0cb748](https://github.com/JayTam/antd-ms/commit/a0cb748ee613faa2b284c96f341047dc65637f27))
- **ms-table:** 修复前端分页搜索失效 ([9a6fb2d](https://github.com/JayTam/antd-ms/commit/9a6fb2d2f2b41af0199aec957496d3c178c6db01))
- **ms-table:** 修复同步 url 不支持嵌套数据结构 ([40e5d7e](https://github.com/JayTam/antd-ms/commit/40e5d7e59aa6aab9207165e66f6a92407d232955))
- **ms-table:** 优化多项搜索器样式 ([02f0766](https://github.com/JayTam/antd-ms/commit/02f0766c9e4d2e68ecdfb6eee4bcb923e9c3cc1f))

## [2.10.0](https://github.com/JayTam/antd-ms/compare/v2.9.0...v2.10.0) (2023-08-11)

### Features

- **ms-form:** 新增 successNotifyProps 自定义成功消息 ([0c797da](https://github.com/JayTam/antd-ms/commit/0c797da5c4be4ef285ef97e6bb05ed9743c69bdf))
- **ms-table:** 实现提交时的 values 递归处理 ([551df2f](https://github.com/JayTam/antd-ms/commit/551df2fc347f853016eb9ebbbe6e76bdae821a7b))
- **ms-table:** 游标翻页 ([4c1ff44](https://github.com/JayTam/antd-ms/commit/4c1ff4468c4460def9b37f16af7b092577957aaf))

### Bug Fixes

- 导出所有 utils hooks ([41b3f08](https://github.com/JayTam/antd-ms/commit/41b3f0840c0623a56a09c83ceee269295a325c85))
- 兼容 MsSelect 和 老表单组件 \_MsForm ([cf666af](https://github.com/JayTam/antd-ms/commit/cf666af7ddc9f7e05b7169230a5a8c25611fed0c))
- 临时修复 umiconfig 样式覆盖问题 ([cdf41cb](https://github.com/JayTam/antd-ms/commit/cdf41cb87e21eec5b2acf451c27d155eadef77a7))
- 修复 ts 报错 ([c58e994](https://github.com/JayTam/antd-ms/commit/c58e9940618080bf9aef17bc59f3187bb186f2e0))
- **ms-field-digital:** 删除 DisabledContext ([b00e3f5](https://github.com/JayTam/antd-ms/commit/b00e3f56fc5a3f64241bb2c94592df9750dad7d7))
- **ms-form:** 弹窗表单 submit 按钮默认文案修改，提交->确定 ([6875566](https://github.com/JayTam/antd-ms/commit/6875566298bbd2d3fc78ef4efcb7b7b2878c4336))
- **ms-form:** 实现提交时的 values 递归处理 ([7a5d162](https://github.com/JayTam/antd-ms/commit/7a5d162213e6be4c011caa988135c76695b5ac96))
- **ms-form:** 所有表单项增加前缀 preRender 和后缀 suffixRender ([9ab1cea](https://github.com/JayTam/antd-ms/commit/9ab1cea245adce49ec1360e1834f459081b23ac3))
- **ms-form:** 修复 form 类型报错 ([9ccede9](https://github.com/JayTam/antd-ms/commit/9ccede94908b01937ed7d970f14dc7311992ec60))
- **ms-form:** 修复 request 设置初始值失效 ([01e5261](https://github.com/JayTam/antd-ms/commit/01e52612afa9f02f9c020d4024193c633ec2a82c))
- **ms-form:** 修复本地初始值延迟生效 ([428b37d](https://github.com/JayTam/antd-ms/commit/428b37d90ec95f8ff9678a6fe428c58b2d56096b))
- **ms-form:** 修复存在依赖项时,不能自定义 disabled 状态 ([19769f1](https://github.com/JayTam/antd-ms/commit/19769f11e412b873652bcd28a7a742a8323fe063))
- **ms-form:** 修复弹窗表单初始值失效 ([1061d44](https://github.com/JayTam/antd-ms/commit/1061d4415efb07d4a72dca4e8af33264d95b38a5))
- **ms-form:** 修复弹窗表单无法触发 onFinishFailed 事件 ([54be16d](https://github.com/JayTam/antd-ms/commit/54be16d866be946d7f226c7908da0acacadea6ca))
- **ms-form:** 修复分步表单提交两次 ([42a102e](https://github.com/JayTam/antd-ms/commit/42a102e80ab5197e39bc642910c09c75750a2e94))
- **ms-form:** 修复直接设置 initialValues 异常 ([f42b98f](https://github.com/JayTam/antd-ms/commit/f42b98f7fec11712405b1b9e34f3584ea58b85a5))
- **ms-form:** 修复 formItem 自身没有继承 dependencies 引起的函数 rule 没有重新执行 ([7414d9d](https://github.com/JayTam/antd-ms/commit/7414d9d6b6763c2df8cd2c0b2a1bf8c05ab6d627))
- **ms-layout:** 当前页不可重复点击 ([c6f381c](https://github.com/JayTam/antd-ms/commit/c6f381c1439f20f76118d1bcdbe77d4dc2a36abd))
- **ms-table:** 精确计算 filter 的筛选数 ([c838bd4](https://github.com/JayTam/antd-ms/commit/c838bd433445c2e0ad258876b7e61c750f12e649))
- **ms-table:** 如果数据为空，返回上一页，直到页码为 1 ([e63638e](https://github.com/JayTam/antd-ms/commit/e63638e4012148ebf1de6bb169b943dde910e952))
- **ms-table:** 修复 search 模式，onReset，onSubmit 事件失效 ([9c73a6c](https://github.com/JayTam/antd-ms/commit/9c73a6cfb626d8921fbd16d3e77eed84cd21e438))
- **ms-table:** 修复多选初始值会被重置 ([47c8028](https://github.com/JayTam/antd-ms/commit/47c802870dfab76eb599aa3c92c369363c5e8317))
- **ms-table:** 修复游标翻页 ([79af5a0](https://github.com/JayTam/antd-ms/commit/79af5a04a259c7e2b374bb5967169d9dd35b358b))
- **ms-table:** 修复游标翻页,返回首页报错 ([eaf5ba6](https://github.com/JayTam/antd-ms/commit/eaf5ba6b0025877d1d199e176e4f2b6ad5f078bd))
- **ms-table:** 修复游标翻页点击查询未重置 ([0ab80db](https://github.com/JayTam/antd-ms/commit/0ab80db42fb910cab3dd67a7c938c9cd115ce732))
- **ms-table:** 修复在项目中使用 useUrlState 异常 ([5ef9ec7](https://github.com/JayTam/antd-ms/commit/5ef9ec72c04050e6994e34d04599fa249b4aa1b9))
- **ms-table:** 修复自定义 params 的字段和 columns.dataIndex 一致时，异常清空 params 值 ([308eccd](https://github.com/JayTam/antd-ms/commit/308eccd40da407b16b7f43b594fd5194812f4da3))
- **ms-table:** api 变更 fieldRender(config, form) -> fieldRender(form, config) ([cd917a1](https://github.com/JayTam/antd-ms/commit/cd917a140a499caf056f3939cbe2daa18f13e0d1))
- **msactions:** fix: msactions ([2d63bb8](https://github.com/JayTam/antd-ms/commit/2d63bb8249cdaed98a837b454d3b0765e922d0c7))
- **msactions:** msactions bug 修改 ([3d700e4](https://github.com/JayTam/antd-ms/commit/3d700e4849aee603d1f7849018de9c6ec6df5afb))
- **msform:** 修复 labelInValue 时清除按钮不生效 ([0b6bb4b](https://github.com/JayTam/antd-ms/commit/0b6bb4b9f8e36611c1011c0d5e95ea81be614e36))

## [2.9.0](https://github.com/JayTam/antd-ms/compare/v2.7.6...v2.9.0) (2023-07-19)

### Features

- **ms-layout:** 菜单超链接增加阻止默认行为 ([71db99f](https://github.com/JayTam/antd-ms/commit/71db99f82fbc9e6ea4838b3d358dd5dc8d7538d6))

### Bug Fixes

- **cascader select tree-select:** 默认支持搜索 ([4554512](https://github.com/JayTam/antd-ms/commit/45545122e9c739d9a8e2dc6b53073269b1dbc4e1))
- **ms-actions:** 支持嵌套字段 items , 目前只支持最多 2 层 ([07516b0](https://github.com/JayTam/antd-ms/commit/07516b09dad06798cb84fd7d20ed1d3abc9fdaa7))
- **ms-form:** 修复 fieldRender 销毁重新渲染 ([485726a](https://github.com/JayTam/antd-ms/commit/485726a777d1e6a02ac676734399eea6d6cf9e30))
- **ms-form:** 修复抽屉表单函数调用方式，没有触发 request ([df171be](https://github.com/JayTam/antd-ms/commit/df171be2712cb4d71b352b3b74da604373600a68))
- **ms-order-flavor-request:** 实例规格映射添加分页信息 ([4d4e51b](https://github.com/JayTam/antd-ms/commit/4d4e51b5289c2dd23ff2af89a7e698534b6bd522))
- **ms-request:** 修复 swRequest 获取不到 this 的问题 ([5c0a182](https://github.com/JayTam/antd-ms/commit/5c0a1826e49d4dc7712188a6f416ef46bf4c7776))

## [2.8.0](https://github.com/JayTam/antd-ms/compare/v2.7.6...v2.8.0) (2023-07-19)

### Features

- **ms-layout:** 菜单超链接增加阻止默认行为 ([71db99f](https://github.com/JayTam/antd-ms/commit/71db99f82fbc9e6ea4838b3d358dd5dc8d7538d6))

### Bug Fixes

- **cascader select tree-select:** 默认支持搜索 ([4554512](https://github.com/JayTam/antd-ms/commit/45545122e9c739d9a8e2dc6b53073269b1dbc4e1))
- **ms-actions:** 支持嵌套字段 items , 目前只支持最多 2 层 ([07516b0](https://github.com/JayTam/antd-ms/commit/07516b09dad06798cb84fd7d20ed1d3abc9fdaa7))
- **ms-form:** 修复 fieldRender 销毁重新渲染 ([485726a](https://github.com/JayTam/antd-ms/commit/485726a777d1e6a02ac676734399eea6d6cf9e30))
- **ms-form:** 修复抽屉表单函数调用方式，没有触发 request ([df171be](https://github.com/JayTam/antd-ms/commit/df171be2712cb4d71b352b3b74da604373600a68))
- **ms-order-flavor-request:** 实例规格映射添加分页信息 ([4d4e51b](https://github.com/JayTam/antd-ms/commit/4d4e51b5289c2dd23ff2af89a7e698534b6bd522))
- **ms-request:** 修复 swRequest 获取不到 this 的问题 ([5c0a182](https://github.com/JayTam/antd-ms/commit/5c0a1826e49d4dc7712188a6f416ef46bf4c7776))

### [2.7.6](https://github.com/JayTam/antd-ms/compare/v2.7.5...v2.7.6) (2023-07-12)

### Bug Fixes

- **ms-field-radio:** 单选按钮最小宽度 100px ([a690df8](https://github.com/JayTam/antd-ms/commit/a690df8daea24a1ca3680c2b3de3eae04753ba17))
- **ms-order-flavor-request:** 实例规格方法添加合并请求 ([208ede8](https://github.com/JayTam/antd-ms/commit/208ede82afe6073df896198659282083a7fb2c10))
- **ms-order-flavor:** 添加查询实例规则的方法 ([cb421ab](https://github.com/JayTam/antd-ms/commit/cb421ab6c3f08e4f338375bb503d018d3194f8db))

### [2.7.5](https://github.com/JayTam/antd-ms/compare/v2.7.4...v2.7.5) (2023-07-10)

### Bug Fixes

- **ms-field-code-editor ms-field-diff-editor:** 更新 codeEditor 和 diffEditor 文档，更名 diff->diffEditor ([d1ea0ca](https://github.com/JayTam/antd-ms/commit/d1ea0ca1be07d9a2562296e5da064043dfeabf51))
- **ms-form:** 分步表单 request 不生效 ([55d5bd6](https://github.com/JayTam/antd-ms/commit/55d5bd6fc0366278ab5104be41d28d25daf37a81))
- **ms-form:** 设置 getPopupContainer 为父节点 ([1b1c4f6](https://github.com/JayTam/antd-ms/commit/1b1c4f661fabfc976dadfd7195a8479493a905ef))
- **ms-form:** 修复 field request ts 类型报错 ([29edd61](https://github.com/JayTam/antd-ms/commit/29edd61156cd2aab44fd61a73b20e1b04806a877))
- **ms-form:** 修复两层表单时 fixed 提交框位置复位 ([f16928d](https://github.com/JayTam/antd-ms/commit/f16928d05df79a647260c7af4ada4c53335537df))
- **ms-form:** switch 提交类型错误 ([53d8401](https://github.com/JayTam/antd-ms/commit/53d8401934bd5d37dfff978e2e80f4130d751f6d))

### [2.7.4](https://github.com/JayTam/antd-ms/compare/v2.7.3...v2.7.4) (2023-07-06)

### Bug Fixes

- **ms-form:** 修复 key 警告 ([9eb620c](https://github.com/JayTam/antd-ms/commit/9eb620cd8e25a3e2935eeb3d2e8f2283286e53a9))
- **ms-form:** 修复所有 warning ([3d32927](https://github.com/JayTam/antd-ms/commit/3d3292785072c1a64a410fd50a0b9d2c09126426))

### [2.7.3](https://github.com/JayTam/antd-ms/compare/v2.7.2...v2.7.3) (2023-07-06)

### [2.7.2](https://github.com/JayTam/antd-ms/compare/v2.7.1...v2.7.2) (2023-07-06)

### Bug Fixes

- **ms-field-group:** 分组组件样式完善 ([9f52655](https://github.com/JayTam/antd-ms/commit/9f52655d8a776c5c7874131f1654ad4455423087))
- **ms-field-upload:** 上传组件支持拖拽上传，修复上传逻辑 ([cc8215b](https://github.com/JayTam/antd-ms/commit/cc8215b7d198c6a26dd4e058b0069c55445fd44b))
- **ms-form:** 修复 group 下的 column.initialValue 失效 ([146f571](https://github.com/JayTam/antd-ms/commit/146f571944b49491aa88695beeb8d48564e49bba))

### [2.7.1](https://github.com/JayTam/antd-ms/compare/v2.7.0...v2.7.1) (2023-07-05)

### Bug Fixes

- **ms-field-switch:** 修复 switch 组件初始值问题 ([853e8d5](https://github.com/JayTam/antd-ms/commit/853e8d50d43591b5461a1cf2d58ecc92bfa480cd))
- **ms-form:** 优化默认选中第一项 ([fd2db67](https://github.com/JayTam/antd-ms/commit/fd2db67fbd30732dcfdf53485a78073328dee9ec))

## [2.7.0](https://github.com/JayTam/antd-ms/compare/v2.6.2...v2.7.0) (2023-07-04)

### Features

- 上传组件支持拖拽上传，自定义上传按钮或文字 ([e4ad19a](https://github.com/JayTam/antd-ms/commit/e4ad19a73339d4b00bd6656149f2736359e85d1c))

### Bug Fixes

- 编辑器高度设置 ([84643df](https://github.com/JayTam/antd-ms/commit/84643df26d3f091d3db9e78347c8765bee95968f))
- 代码编辑和代码对比优化 ([4ee9405](https://github.com/JayTam/antd-ms/commit/4ee940574c88d0c885188113155d01d3072eb49f))
- 修复 diffEditor 编辑错误 ([e6713bb](https://github.com/JayTam/antd-ms/commit/e6713bbedf42b838cf343ff4938c634be47c8deb))
- **ms-field-diff ms-field-code-editor:** 删除代码演示中无用代码，更新 ms-field 文档 ([da3ff27](https://github.com/JayTam/antd-ms/commit/da3ff27afc42e553469e55ea9f1464b8c85c9e0a))
- **ms-form:** onChange 第二个参数添加 option ([554e476](https://github.com/JayTam/antd-ms/commit/554e4766ca6feaef1bf25058d2948acdd77f27d5))

### [2.6.2](https://github.com/JayTam/antd-ms/compare/v2.6.1...v2.6.2) (2023-07-03)

### Bug Fixes

- **ms-form:** 分步表单回退不校验 ([005b990](https://github.com/JayTam/antd-ms/commit/005b990c0fc2e401991f8d5d2c0ab4b9e7a7b03e))
- **ms-form:** 临时解决分步表单返回上一页不校验 ([7c65b91](https://github.com/JayTam/antd-ms/commit/7c65b91dd815ab13c53125cf623a19ea920ff3ff))
- **ms-form:** 修复默认选中第一项失效 ([4f4673d](https://github.com/JayTam/antd-ms/commit/4f4673d9357ae20aea343cf1e0bb26469dc80940))
- **ms-form:** 修复 formItemProps.initialValue 失效 ([717ad26](https://github.com/JayTam/antd-ms/commit/717ad260045667a070f64b28a07bd6fc3b7a7d5d))
- **ms-modal:** 修复 closable 属性失效 ([1bbea40](https://github.com/JayTam/antd-ms/commit/1bbea40b47f20ad063696f2a51fef37ff0f298f1))
- **ms-table:** 修复 valueEnumFiledNames 属性异常 ([53e4b99](https://github.com/JayTam/antd-ms/commit/53e4b9966f9e3f44cdf1b343a460272db21c23b3))

### [2.6.1](https://github.com/JayTam/antd-ms/compare/v2.6.0...v2.6.1) (2023-06-27)

### Bug Fixes

- **ms-form:** 表单提交失败报错 ([279e223](https://github.com/JayTam/antd-ms/commit/279e223d269bf699f145040461c5595af4afd9ff))
- **ms-radio:** 优化样式 ([74c1851](https://github.com/JayTam/antd-ms/commit/74c1851e89033b8cf8911b1d1a38c2f3102f0c2c))
- **ms-table:** 修复 query 和 filter 模式下, 时间类型 initialValue 报错 ([588d239](https://github.com/JayTam/antd-ms/commit/588d2390bf6652a8c7f6fa7552d7084463c1d563))

## [2.6.0](https://github.com/JayTam/antd-ms/compare/v2.5.2...v2.6.0) (2023-06-25)

### Features

- **ms-request:** 根据业务要求，新增剔除团体云业务的 define-request，保留大部分 ms-request 的功能的同时部分开放自定义 api 供业务方自由调整 ([8cb5238](https://github.com/JayTam/antd-ms/commit/8cb5238d4d93a2e6eb40cc450a890607050b84a2))

### [2.5.2](https://github.com/JayTam/antd-ms/compare/v2.5.1...v2.5.2) (2023-06-25)

### [2.5.1](https://github.com/JayTam/antd-ms/compare/v2.5.0...v2.5.1) (2023-06-20)

### Bug Fixes

- **ms-form:** 补充 stepsProps 参数用于个性化分步器 ([57be1b8](https://github.com/JayTam/antd-ms/commit/57be1b88cc637acdfbfca36f27097fe1defa4789))

## [2.5.0](https://github.com/JayTam/antd-ms/compare/v2.4.4...v2.5.0) (2023-06-16)

### Features

- **ms-request:** 新增 envsToLoginAddress 根据环境变量跳转登录，兼容除团体云外其他项目登录需求 ([9374fdf](https://github.com/JayTam/antd-ms/commit/9374fdf9aecaa12d803660d8177ead001299d71a))

### [2.4.4](https://github.com/JayTam/antd-ms/compare/v2.4.3...v2.4.4) (2023-06-14)

### Bug Fixes

- **ms-table:** 修复 search 模式下查询/重置按钮丢失 ([a7673e5](https://github.com/JayTam/antd-ms/commit/a7673e528cfa9eb9613f2b9aed5c448102e2f83d))

### [2.4.3](https://github.com/JayTam/antd-ms/compare/v2.4.2...v2.4.3) (2023-06-12)

### Bug Fixes

- **ms-form:** 完善 defaultSelectFirst 在 initialValue 的场景下的表现 ([f19163a](https://github.com/JayTam/antd-ms/commit/f19163a0e7157190e4239bf9fdfe7b748ae518ed))

### [2.4.2](https://github.com/JayTam/antd-ms/compare/v2.4.1...v2.4.2) (2023-06-12)

### Bug Fixes

- **ms-table:** 修复 filter 筛选器的筛选项个数计算没有考虑到空数组 ([0022fa3](https://github.com/JayTam/antd-ms/commit/0022fa3a6760635fcedd27cb5a84011f696a486c))

### [2.4.1](https://github.com/JayTam/antd-ms/compare/v2.4.0...v2.4.1) (2023-06-09)

### Bug Fixes

- **ms-table:** 修复 search 模式下默认 label 靠右 ([bb677f0](https://github.com/JayTam/antd-ms/commit/bb677f0ba964202bd7343dae7028ab4b9d5b6928))

## [2.4.0](https://github.com/JayTam/antd-ms/compare/v2.3.2...v2.4.0) (2023-06-09)

### Features

- 新增 valuePrimitiveType 支持 ([a4bbb74](https://github.com/JayTam/antd-ms/commit/a4bbb74616d5fe023dc79e048c06850a78dc6892))
- **ms-drawer:** 支持 nice-drawer 用法 ([8903774](https://github.com/JayTam/antd-ms/commit/8903774d7bf87ea63fb7bfa85bb94980a05f57c3))
- **ms-field-radio:** 实现 labelInValue ([589c13a](https://github.com/JayTam/antd-ms/commit/589c13aa52f94d916b39b9dc7b4ce9796c6c8117))
- **ms-field-select:** 实现 select 组件 labelInValue ([dc15330](https://github.com/JayTam/antd-ms/commit/dc153308d21cf54f7d617da2061640e4d3eee754))
- **ms-form:** 表单提交按钮 fixed 模式 ([c917761](https://github.com/JayTam/antd-ms/commit/c91776161fc7eb14ba83e8c18e5442944ea96cd4))
- **ms-form:** 分步表单实现 ([56c9016](https://github.com/JayTam/antd-ms/commit/56c90166c9045ce6266f1533f114559fb168203f))
- **ms-form:** 分步表单校验 ([31b52b1](https://github.com/JayTam/antd-ms/commit/31b52b1e8da5fece47332d377687091f5f74dcec))
- **ms-form:** 实现 initialRequest 控制初始化不请求 ([9e76d49](https://github.com/JayTam/antd-ms/commit/9e76d495eace1f0a46bb2f5cee328d88784d3e5b))
- **ms-form:** 提交时剔除私有属性 ([8f74cc6](https://github.com/JayTam/antd-ms/commit/8f74cc6bc483009c14d8315b039018f09a1febcc))
- **ms-form:** 添加自动提示提交成功弹窗 ([667d991](https://github.com/JayTam/antd-ms/commit/667d991675f95b8a74405922478b6f80cb42a445))
- **ms-form:** 选择器类组件支持 defaultSelectFirst 默认选中第一个 ([0fe1253](https://github.com/JayTam/antd-ms/commit/0fe1253ee6f8de2d5620ce7bbda51039583e7eae))
- **ms-form:** 支持 column.fieldRender ([828356f](https://github.com/JayTam/antd-ms/commit/828356fd0f0c38e382a87fb364c9fe67b6c0fef2))
- **ms-form:** 支持 column.fieldRender 自定义组件 ([526f96b](https://github.com/JayTam/antd-ms/commit/526f96b048441e9c7ea560fbefd5e1c87f26773b))
- **ms-form:** 支持 valueType=group 表单分组 ([d98dfab](https://github.com/JayTam/antd-ms/commit/d98dfab652977ec5316ecdcda392b65c24cb1e75))
- **ms-form:** fieldProps, formItemProps 支持函数处理联动变更 ([e5ddfb2](https://github.com/JayTam/antd-ms/commit/e5ddfb2e99f601ed03aaf7784282955d3d3d8e11))
- **ms-form:** grid 布局 ([e2757ed](https://github.com/JayTam/antd-ms/commit/e2757ed931b1c5d10eaaf747fc3aba47881ff566))
- **ms-form:** valueEnum 支持级联 ([7e51846](https://github.com/JayTam/antd-ms/commit/7e51846bac25427a20319b1dd20e4d4358a9db7e))
- **ms-from:** 联动表单 ([bf1f6f8](https://github.com/JayTam/antd-ms/commit/bf1f6f89cb20a888e7302309fe16f88304149647))
- **ms-modal:** 通过 size 预设 width ([c9268e7](https://github.com/JayTam/antd-ms/commit/c9268e74842e1fb94d3abf1840e67476902be5d0))
- **ms-modal:** 支持 nice-modal 用法 ([f436860](https://github.com/JayTam/antd-ms/commit/f43686021c02922948adf6d0f31a699d31c33b13))
- **ms-schema-form:** request loading 骨架屏 ([298a0f9](https://github.com/JayTam/antd-ms/commit/298a0f9073f2a2eb26d70520ef5d3569943cc608))

### Bug Fixes

- 兼容以前的组件 ([768a89d](https://github.com/JayTam/antd-ms/commit/768a89d6c1f63836569629637015c47c4ed23152))
- 取消 valueTpye 对于 labelInValue 的限制 ([47ee3c9](https://github.com/JayTam/antd-ms/commit/47ee3c92f9ecafdb2cae6b39522cbe2a5d01fe71))
- 修复 column.initialValue 无效 ([015e8d6](https://github.com/JayTam/antd-ms/commit/015e8d69bc94e34fb200cec0ee6d404ab34ef39d))
- 修复 StepsForm 类型转换失效 ([53c972a](https://github.com/JayTam/antd-ms/commit/53c972a25e6af0ebbe82c2ee92ae072750d65ac5))
- 修复 StepsForm Grid 布局异常 ([be84470](https://github.com/JayTam/antd-ms/commit/be84470defffcf9c1f1db6a971f1936a1d48c4d5))
- 修复类型报错 ([0234bb8](https://github.com/JayTam/antd-ms/commit/0234bb8a8179e45fdba58b5630e94a34686e4403))
- **ms-field-digital:** 修复 digital 组件未按照 field 规范实现 ([8ae2f14](https://github.com/JayTam/antd-ms/commit/8ae2f14f221b7d7a7db79cef322df3f86936c3f4))
- **ms-field-radio:** 仅 radio 内部实现 labelInValue，解决与 antd select 实现的冲突 ([fe0c219](https://github.com/JayTam/antd-ms/commit/fe0c219b687ee3a9cde12544f903701cb7beaf42))
- **ms-field-radio:** 修复限制仅 radio 组件判断逻辑错误 ([b98e96e](https://github.com/JayTam/antd-ms/commit/b98e96e072696a2941f513652a18d73faee086cd))
- **ms-form:** 分步表单不能跳步 ([614451d](https://github.com/JayTam/antd-ms/commit/614451ddb96a6c6622f734555a00d0f6404df3a9))
- **ms-form:** 默认设置 placeholder ([f387407](https://github.com/JayTam/antd-ms/commit/f38740770611e47dd559b5616ab1fcad45f9296a))
- **ms-form:** 提交按钮的位置重新排列 ([e8a91f0](https://github.com/JayTam/antd-ms/commit/e8a91f044d162a747d11454d014a0af29399b255))
- **ms-form:** 完善 dataIndex 支持数组的场景 ([cf9732c](https://github.com/JayTam/antd-ms/commit/cf9732c2a507350665b9dcbbdc4e091c8e0afa2c))
- **ms-form:** 完善对 labelInValue 支持 ([4f7e568](https://github.com/JayTam/antd-ms/commit/4f7e568406fbee471a0500d5e46bd2a82f102a9d))
- **ms-form:** 修复 fieldRender 未生效 ([25975f4](https://github.com/JayTam/antd-ms/commit/25975f4c2aeb49f1777ce1f2394d57ab5ee5b1ed))
- **ms-form:** 修复 formItemProps, fieldProps 失效 ([357a348](https://github.com/JayTam/antd-ms/commit/357a3488bd00e06ab0ccdc16085017e5f87c9583))
- **ms-form:** 修复 hideInTable 没有隐藏 Col 组件 ([b230026](https://github.com/JayTam/antd-ms/commit/b230026567f6b29c35e872aa8ccc81afaeaf64d6))
- **ms-form:** 修复 initialValues 递归转换成 string ([9dd36ef](https://github.com/JayTam/antd-ms/commit/9dd36ef151bcb07ecd934a6bb31a4428afa4811b))
- **ms-form:** 修复 initialValues 未转换成 string 类型 ([7b69d64](https://github.com/JayTam/antd-ms/commit/7b69d647351789277beb1619b27922562f391071))
- **ms-form:** 修复 postRes 异常 ([8429dc0](https://github.com/JayTam/antd-ms/commit/8429dc07a73257a4fa248a237f39b8a08fe14c01))
- **ms-form:** 修复 submitter.type=fixd 底部没有撑开 ([f12f573](https://github.com/JayTam/antd-ms/commit/f12f573c5e647e2572c3217413fcc333c880a643))
- **ms-form:** 修复递归转换 intialValues 的值为 string ([c8e6f8a](https://github.com/JayTam/antd-ms/commit/c8e6f8a5e156da7297cb40e36aef6b66772c1e69))
- **ms-form:** 修复分步表单无法校验嵌套表单 ([b221ad3](https://github.com/JayTam/antd-ms/commit/b221ad3ead2c535667e981b75bab95d3ebe5d844))
- **ms-form:** 修复构建类型报错 ([61bbf1b](https://github.com/JayTam/antd-ms/commit/61bbf1b2e06736ad494eee7b80bed88a55b7dc2c))
- **ms-form:** 修复联动时 fieldRender 失效 ([7a8bd47](https://github.com/JayTam/antd-ms/commit/7a8bd47322aa0bd06ea55a22d41b4e7815e750d8))
- **ms-form:** 样式修复 ([5e53198](https://github.com/JayTam/antd-ms/commit/5e53198a698f5ad83b5dc6b28ef99fec2c472aa4))
- **ms-layout:** 修复代码合并异常 ([8a59711](https://github.com/JayTam/antd-ms/commit/8a59711a2a330c09fab2815fac48b03592dfc426))
- **ms-modal:** 修复弹窗关闭按钮不生效 ([0f840e4](https://github.com/JayTam/antd-ms/commit/0f840e4a981139cde8023febd0cccb57372d39b7))
- **ms-table:** 修复 search 模式下 postRes 失效 ([a114f4c](https://github.com/JayTam/antd-ms/commit/a114f4c98bc86e6ac31d05f6b57fa9db301b5e11))
- **ms-table:** 修复 search 模式下，查询按钮没出现 ([918f374](https://github.com/JayTam/antd-ms/commit/918f374594ffa77708316f199962ca1ea01983a5))
- **ms-table:** 修复递归枚举异常 ([06fe6cb](https://github.com/JayTam/antd-ms/commit/06fe6cb2424c0ffc790a61ecd17c151068de525a))
- **ms-table:** 修复 select 远程请求之后，表格列没有刷新 ([20fe251](https://github.com/JayTam/antd-ms/commit/20fe251db2cfc8c321990778010d025b7ebd675c))
- **ms-table:** 修复 valuePrimitiveType 数据类型转换不支持 dataIndex 是数组类型 ([3a8bf8b](https://github.com/JayTam/antd-ms/commit/3a8bf8b6f9b247e018fb3974bd0466dfc9330363))
- **ms-table:** search 模式，查询按钮丢失 ([4131556](https://github.com/JayTam/antd-ms/commit/4131556f513e40225aab2bd1eeeeefef8ad689fc))

### [2.3.2](https://github.com/JayTam/antd-ms/compare/v2.3.1...v2.3.2) (2023-06-02)

### Bug Fixes

- **ms-table:** 新增 filterFromRef 解决 filter 模式下无法准确获取表单值的问题 ([d899328](https://github.com/JayTam/antd-ms/commit/d899328dcfc87719d3241bc5a532e644877d8ac2))

### [2.3.1](https://github.com/JayTam/antd-ms/compare/v2.3.0...v2.3.1) (2023-05-29)

### Bug Fixes

- **ms-table:** 修复 params 更新，表单请求参数丢失 ([46e744a](https://github.com/JayTam/antd-ms/commit/46e744aeaf68e38a7c474c5c4638fa918ca0d761))
- **ms-table:** 修复页码切换时，时间类型不统一 ([5dbfc64](https://github.com/JayTam/antd-ms/commit/5dbfc64e3bdc734279b690ed3750ce3486631478))
- **ms-table:** rowSelection.defaultSelectedRowKeys = true ([2df59e1](https://github.com/JayTam/antd-ms/commit/2df59e1a19ce80689ef641206f10725a593b959a))

## [2.3.0](https://github.com/JayTam/antd-ms/compare/v2.2.1...v2.3.0) (2023-05-22)

### Features

- **ms-layout:** 增加收缩设置别名显示 ([240b157](https://github.com/JayTam/antd-ms/commit/240b1576ceb0f567723c8f20a8e0dc80624b4ad1))

### [2.2.1](https://github.com/JayTam/antd-ms/compare/v2.2.0...v2.2.1) (2023-05-22)

### Bug Fixes

- **ms-layout:** 优化多级菜单时一级菜单自动收缩 ([8859483](https://github.com/JayTam/antd-ms/commit/88594830a42a3d1e2981a4088afd0a63c79f600e))
- **ms-layout:** 优化多级菜单自动收缩主菜单 ([8406789](https://github.com/JayTam/antd-ms/commit/84067896aa47ca17f23185679552056c545c6596))

## [2.2.0](https://github.com/JayTam/antd-ms/compare/v2.1.4...v2.2.0) (2023-05-18)

### Features

- **msrequest:** 针对大文件上传等请求添加控制器属性 cancelController，可跳过路由切换时的取消请求 ([1c0d864](https://github.com/JayTam/antd-ms/commit/1c0d864c6cd7aa2d9152ddd20a6a87123ede4b57))

### Bug Fixes

- 新增 defaultCollapsed, 控制默认展开 ([198a0aa](https://github.com/JayTam/antd-ms/commit/198a0aa810bda2fa63759dd04e7e5f363a203d0a))
- **ms-iconfont:** 图标库新增 zk 中间件图标 ([efb8147](https://github.com/JayTam/antd-ms/commit/efb8147752341d9ec219e292ce7735e9ec472822))
- **ms-request:** 新增 cancelController 属性，添加请求控制器 ([9cdf486](https://github.com/JayTam/antd-ms/commit/9cdf48655ffb381df94df1ff42c71a89312f7497))
- **ms-table:** 修复重置搜索，当含有时间初始值时会报错 ([43ad5c2](https://github.com/JayTam/antd-ms/commit/43ad5c20f0c78ea8326c449a11e0153994ae8cf3))

### [2.1.4](https://github.com/JayTam/antd-ms/compare/v2.1.3...v2.1.4) (2023-05-06)

### Bug Fixes

- **ms-table:** 新增 onSubmit, onRest, onLoad, onRequestError 回调函数处理异常情况 ([4dea0ae](https://github.com/JayTam/antd-ms/commit/4dea0ae8c1cbcd39cd1bf24e70206d96e60ba6fb))
- **ms-table:** defaultSelectedRowKeys 支持处理后端返回的默认选中项 ([8383271](https://github.com/JayTam/antd-ms/commit/8383271778e8c3cf2fb0e6816dd21385335032c2))

### [2.1.3](https://github.com/JayTam/antd-ms/compare/v2.1.2...v2.1.3) (2023-05-06)

### Bug Fixes

- **ms-table:** 修复 rowSelection 默认选中不生效 ([5e50387](https://github.com/JayTam/antd-ms/commit/5e50387d5505648ddce0bcb146c239a0cdda73f4))

### [2.1.2](https://github.com/JayTam/antd-ms/compare/v2.1.1...v2.1.2) (2023-05-05)

### Bug Fixes

- **ms-resource-tags:** 修复后端资源标签修改错误 ([53f9db5](https://github.com/JayTam/antd-ms/commit/53f9db5745619790da0cebe61a582f56c9a6af4d))
- **ms-table:** 修复 pagintaion.pageSize 初始化没生效 ([dc9e99e](https://github.com/JayTam/antd-ms/commit/dc9e99efd82c19120155350ff8f5a49f1729c7b5))

### [2.1.1](https://github.com/JayTam/antd-ms/compare/v2.1.0...v2.1.1) (2023-05-05)

### Bug Fixes

- **msactions:** 修复在乾坤内使用 actionType=button 悬浮报错 ([82c886a](https://github.com/JayTam/antd-ms/commit/82c886ac191934d032f2a003f4e623cb3e683d36))

## [2.1.0](https://github.com/JayTam/antd-ms/compare/v2.0.0...v2.1.0) (2023-05-05)

### Features

- **ms-table:** 表头 title 加粗 ([78c4e80](https://github.com/JayTam/antd-ms/commit/78c4e809b3cc993fa113dacefe2b1076bcaea42f))
- **ms-table:** 查询表单项联动 ([d378e49](https://github.com/JayTam/antd-ms/commit/d378e495893b693f7ef708e38365922ddb4baebe))
- **ms-table:** 实现 column.request, column.params, column.postRes 远程请求获取 valueEnum ([5e16ffb](https://github.com/JayTam/antd-ms/commit/5e16ffbb1d8b8b529947b2968c40da4c151892cb))
- **ms-table:** 支持后管资源标签场景 ([9a63733](https://github.com/JayTam/antd-ms/commit/9a637333c53a6831eb3d1e2d895fee35e35cd853))
- **ms-table:** 资源标签只读配置 ([f0365db](https://github.com/JayTam/antd-ms/commit/f0365db1e8db49887d75266b8bb1a982af309b88))
- **ms-table:** column.request 在表格列中展示 loading 效果 ([d39bd1c](https://github.com/JayTam/antd-ms/commit/d39bd1c98fdd7355e347df70e6474167633832a4))
- **ms-table:** filter 模式下联动实现 ([c695435](https://github.com/JayTam/antd-ms/commit/c695435d72710fb19cb575d72dc5be684e475b69))
- **ms-table:** search 模式 label 靠右 ([8027a2a](https://github.com/JayTam/antd-ms/commit/8027a2aed0a284b5375abfd43f9236ad8258027c))
- **ms-table:** search 模式间隔调整和查询/重置按钮位置交互 ([9564305](https://github.com/JayTam/antd-ms/commit/95643050007ef035c918520427e70cf25db2b9c1))
- **ms-table:** search 模式下，如果没有 creator 则隐藏 toolbar ([2e25835](https://github.com/JayTam/antd-ms/commit/2e2583576d863d62a4c69de4c042260cef57a25b))
- **ms-table:** valueEnum 支持 status ([0d6b558](https://github.com/JayTam/antd-ms/commit/0d6b5588273767fd2372351ef56d1d370700e347))
- **ms-table:** valueEnum 支持 string | number[] 类型 ([bf26dac](https://github.com/JayTam/antd-ms/commit/bf26dac6d589a898c49ad92aa3d043dbf2d852c0))
- **msactions:** 重构 MsActions 组件 支持 items 传参和底部操作 ([1ad5ca5](https://github.com/JayTam/antd-ms/commit/1ad5ca502a855a36e07d4f38790b80582e79800f))

### Bug Fixes

- 修复自定义 filterbarRender 异常 ([dc5e26f](https://github.com/JayTam/antd-ms/commit/dc5e26f5e02b6f28da145f27ec949051c5b0ef35))
- **ms-actions:** 更多的箭头朝下 ([ff86f36](https://github.com/JayTam/antd-ms/commit/ff86f36fb7954ad62abb9778124949a198d64e57))
- **ms-table:** 排序为空时，去掉 field 字段 ([c060ea3](https://github.com/JayTam/antd-ms/commit/c060ea31cdef06f0c2fe4dc99451f626275c360c))
- **ms-table:** 筛选表单默认显示删除按钮 ([0e07668](https://github.com/JayTam/antd-ms/commit/0e07668d356246047e376f912663fe876b8664c5))
- **ms-table:** 修复 params, dataSource 变更之后不刷新 ([612b03d](https://github.com/JayTam/antd-ms/commit/612b03d633922ef6f9d670f40cf572f6623a991b))
- **ms-table:** 修复 query 模式间距 ([32093a4](https://github.com/JayTam/antd-ms/commit/32093a43de0b2c4432725a2a7dce533ca61ac500))
- **ms-table:** 修复 query 模式下, 输入类值变更触发搜索提交 ([f2ed27b](https://github.com/JayTam/antd-ms/commit/f2ed27b8ee888dae98ee962944e61b86bab70f25))
- **ms-table:** 修复 query 模式下的远程请求异常 ([ff431ac](https://github.com/JayTam/antd-ms/commit/ff431ac6241fdd1ebfaa2e7d600542efec65666f))
- **ms-table:** 修复 scroll demo 报错 ([a36c3f2](https://github.com/JayTam/antd-ms/commit/a36c3f28a06f5d1d5440387e9641cb064e2e9715))
- **ms-table:** 修复 search 模式下，时间类型初始化报错 ([0e3f928](https://github.com/JayTam/antd-ms/commit/0e3f92871245298f4ff75dea3ca6b3193d50508c))
- **ms-table:** 修复 search 模式下，自适应滚动高度异常 ([ff27d32](https://github.com/JayTam/antd-ms/commit/ff27d323cb556bcac31cf4d3e5d56fdae336d9af))
- **ms-table:** 修复 table columns 没有遵循不可变特性引起的异常 ([74fb8bb](https://github.com/JayTam/antd-ms/commit/74fb8bb8717692083d013eac2f695120cf62fe01))
- **ms-table:** 修复 valueEnum 变更但是可选项未刷新 ([cde6bf9](https://github.com/JayTam/antd-ms/commit/cde6bf9bc10c1f3cf5dc39d146811d3de3ecf529))
- **ms-table:** 修复 valueEnumFiledNames 异常 ([49c8991](https://github.com/JayTam/antd-ms/commit/49c8991cc686b9b507e3abfb5a4c0173c33cd39b))
- **ms-table:** 修复默认排序无效 ([3ffe330](https://github.com/JayTam/antd-ms/commit/3ffe330f0ca59ac19a2c283bb9d2175087d8488a))
- **ms-table:** 修复请求参数丢失 ([12ea76e](https://github.com/JayTam/antd-ms/commit/12ea76e0cd38098a8ffe8e99cf129647f1fff44f))
- **ms-table:** 修复筛选器按钮异常出现 ([1291370](https://github.com/JayTam/antd-ms/commit/129137036d69cebd119e33e3cc42a2532a9a732b))
- **ms-table:** 修复文档错误 ([d4e742a](https://github.com/JayTam/antd-ms/commit/d4e742af9fe2ceace19cdfb1e94f091a6cbdaec9))
- **ms-table:** 修复 column.request 和 column.valueEnumFiledNames 冲突 ([a479d25](https://github.com/JayTam/antd-ms/commit/a479d250a8bb5c4b48608d01d2f511c85bc6882e))
- **ms-table:** 修复 defaultSortOrder 和 sortNames 冲突 ([ed111db](https://github.com/JayTam/antd-ms/commit/ed111dbfeb8ce1773b92252563c4fb58270d4ede))
- **ms-table:** 修复 search 模式下，查询/重置按钮换行异常 ([f2eb82f](https://github.com/JayTam/antd-ms/commit/f2eb82f7f2c9e6b04bf1817428f1fc9e386149a9))
- **ms-table:** 自适应高度适配密度 ([f5296cf](https://github.com/JayTam/antd-ms/commit/f5296cf8a51d6c3dfd081a04482a45b6bb3dd749))
- **ms-table:** query 模式下的联动优化 ([6ba4860](https://github.com/JayTam/antd-ms/commit/6ba48606d07b00bc9c7e1eeaa26ac51450896d2e))
- **ms-table:** valuePrimitiveType 支持数组类型转换 ([ffcf358](https://github.com/JayTam/antd-ms/commit/ffcf358f24e689b718735d0d6314584130a7880b))
- **msactions:** 修复传 false 显示空白 ([6735630](https://github.com/JayTam/antd-ms/commit/67356309a7c971434687a13aa6e313c096b8f8ba))

## [2.0.0](https://github.com/JayTam/antd-ms/compare/v2.0.0-beta.22...v2.0.0) (2023-04-07)

### Features

- 全局 API 变更，postData -> postRes ([97a3071](https://github.com/JayTam/antd-ms/commit/97a307117179640ed72c6e71f058d6cd7198d63a))
- **业务计费:** 请求报错处理 ([05afdee](https://github.com/JayTam/antd-ms/commit/05afdee54bd6f34f60fe5e34fbd1e7adc1a0ea07))
- **ms-configprovider:** useUnmount 卸载 sentry ([0281654](https://github.com/JayTam/antd-ms/commit/0281654158b217de3b2549a205dc9383c0c39afc))
- **ms-drawer:** 新增 MsDrawer 组件 ([d573034](https://github.com/JayTam/antd-ms/commit/d573034a3d8029552a898b3f00e168fd533c89de))
- **ms-layout:** 面包屑支持插槽 extraRender ([16b412b](https://github.com/JayTam/antd-ms/commit/16b412b6cffbb362c424dc66c22fdc3ec2f31522))
- **ms-modal:** 完成 MsModal 组件开发 ([6a73d7b](https://github.com/JayTam/antd-ms/commit/6a73d7bd9a849da163211cad1df6ae13c394d3a2))
- **ms-modal:** 新增 MsModal 组件 ([67cab01](https://github.com/JayTam/antd-ms/commit/67cab01158b27b2d5b343332cad347e79897fe71))
- **ms-modal:** 新增 onOk 和 onCancel 支持异步函数 ([418c4af](https://github.com/JayTam/antd-ms/commit/418c4af68a5ed8dec12d6661d5fd0f849d821cdc))
- **ms-request:** 1、唤起实名认证，2、更新 sentry 环境获取方式 ([a81a00f](https://github.com/JayTam/antd-ms/commit/a81a00f7b05948c9538f64cf5489470e25adf974))
- **ms-request:** 本地开发可根据环境变量跳转登录 ([5a8e4da](https://github.com/JayTam/antd-ms/commit/5a8e4da1a5c39d4be89e1020306b26b0c1e59b2d))
- **ms-request:** 本地可根据环境变量跳转登录 ([1dec5dc](https://github.com/JayTam/antd-ms/commit/1dec5dcb53029193bc226c8d599e9cfc5ed2df33))
- **ms-request:** 实名认证团体云定义统一 code ([a82e789](https://github.com/JayTam/antd-ms/commit/a82e789d3c0cce92fa24e05ea178c093d57ebd03))
- **ms-table:** 表格工具的显示/隐藏设置 ([784bff1](https://github.com/JayTam/antd-ms/commit/784bff1c7d8682cf5b4f97304dcff9bc7093159a))
- **ms-table:** 表格密度设置工具 ([b618e88](https://github.com/JayTam/antd-ms/commit/b618e88d65028e8e8de5546093f2b13c4c99ab56))
- **ms-table:** 表头筛选，支持 input 输入框 ([0f678f5](https://github.com/JayTam/antd-ms/commit/0f678f5f1bb6b4fc5b8635beb79008cae54ff200))
- **ms-table:** 表头筛选支持 checkbox 多选 ([6bd549d](https://github.com/JayTam/antd-ms/commit/6bd549db4153b1d391c1984d7aa9313abea64a44))
- **ms-table:** 默认不显示全屏按钮 ([a64752d](https://github.com/JayTam/antd-ms/commit/a64752d7f196841f023a60853e2ed021dfb9f50c))
- **ms-table:** 默认开启列拖移 columnsResizable=true ([db3e9c3](https://github.com/JayTam/antd-ms/commit/db3e9c331d1e271019b57738382dcea65771fdff))
- **ms-table:** 新增 column.filedRender 和 column.formItemRender 自定义表单及表单项 ([ae75611](https://github.com/JayTam/antd-ms/commit/ae75611519124ff9f1b9e4a0024eebcb39614706))
- **ms-table:** 新增 column.showInTableFilter 表头筛选器，仅支持单项选择 ([0f1b96a](https://github.com/JayTam/antd-ms/commit/0f1b96a7df8b8e30e6953b1125bf96957e25843d))
- **ms-table:** 新增 resetDepsParmaKyes 解决主应用地域更新，查询表单重置 ([7bf2c12](https://github.com/JayTam/antd-ms/commit/7bf2c1218086d4c6151dd9f3d9c6f6fb9eaaf49b))
- **ms-table:** 新增 rowSelection.afterChange 钩子 ([e211797](https://github.com/JayTam/antd-ms/commit/e2117979cac67ecdb122e9311ea6da21105d9962))
- **ms-table:** 新增 search 相关的配置用于控制样式和文案 ([5ed9640](https://github.com/JayTam/antd-ms/commit/5ed9640f180193fb07f3f45177ee6be0c42835d8))
- **ms-table:** 新增后端排序 column.sorter，sortNames 控制升降序标识 ([cd4af77](https://github.com/JayTam/antd-ms/commit/cd4af77d1a509187786a0456d460ec194b2ab966))
- **ms-table:** 新增列宽度拖移 ([99f627c](https://github.com/JayTam/antd-ms/commit/99f627c8e9a0382bbab4bf97e4bfec359f3c2984))
- **ms-table:** 支持前端分页，pagination.frontPagination = true 开启 ([ab7e7c6](https://github.com/JayTam/antd-ms/commit/ab7e7c630e6dd28e11fc5b93608f726f9a8963b6))
- **ms-table:** 支持 column.valueOptions 接受数组类型的可选项 ([fd8ab1b](https://github.com/JayTam/antd-ms/commit/fd8ab1bd67864c71a9c4ed418064a11f7ed710f3))
- **ms-table:** api 变更 column.showInTableFilter -> column.filters，表头搜索增加确认和重置按钮 ([140c2fc](https://github.com/JayTam/antd-ms/commit/140c2fc402aba3b18d75b272ed15fb6da16980b8))
- **ms-table:** search 模式，重置/查询按钮放置到行末尾 ([331375d](https://github.com/JayTam/antd-ms/commit/331375d80319183aadea128605b3883c8e6bcdfc))
- **ms-table:** search 模式时自动显示扩展/折叠按钮 ([8b6449b](https://github.com/JayTam/antd-ms/commit/8b6449b309a70600a8ac5fed41ff0e1dce6347b1))
- **msconfigprovider:** 接入 sentry 功能 ([29f1eda](https://github.com/JayTam/antd-ms/commit/29f1edaa03ae3fa13baadbb36b0210fb95819bb4))
- **msiconfont:** ui 增加了部分公用图标，例行更新 ([5946001](https://github.com/JayTam/antd-ms/commit/59460014dc2f6a7457bcf23deab49e7b4d0ef718))
- **msrequest:** 开发环境或主应用退出登录 ([00e81b5](https://github.com/JayTam/antd-ms/commit/00e81b57c5e1afe97c290deb0589275fda6b3a0a))
- **rangenumber:** 新增表单组件 RangeNumber ([7209d2e](https://github.com/JayTam/antd-ms/commit/7209d2eb14f4b49e93d6595a016ef62fbf7a81de))
- **standard:** 新增文档规范 ([692a4cf](https://github.com/JayTam/antd-ms/commit/692a4cf6634f84baf3baa8786a72df432f9b035f))
- **usedrawer:** { Drawer, openDerawer } = useDarwer() ([b0ac8fc](https://github.com/JayTam/antd-ms/commit/b0ac8fcbb49ffaf671afbea1e285fa787d5c8abc))
- **usemodal:** const { Modal, openModal, closeModal } = useModal() ([40099e1](https://github.com/JayTam/antd-ms/commit/40099e1cb68cdb2cf8405ef43b2b586b70ec2787))

### Bug Fixes

- 筛选器弹窗方向下左->下中 ([78ecadf](https://github.com/JayTam/antd-ms/commit/78ecadf4dcb25e2953410e79c069f0e64e3d2a14))
- **文档:** 文档格式化异常，重新格式化 ([4d1a69d](https://github.com/JayTam/antd-ms/commit/4d1a69d4e8128a98a2b9f51e1726b996330e879d))
- **all:** 修复单独从 utils/hooks 里引入时样式没有加载的 bug ([7e8408f](https://github.com/JayTam/antd-ms/commit/7e8408f4dfae0b0da7e1d7a7d386e61f3f16710c))
- **all:** 修复组件库里使用但外部项目更改前缀后没有使用的 antd 组件样式引用的问题 ([6647bd1](https://github.com/JayTam/antd-ms/commit/6647bd1b41bb3832859edcdce0f8f2ccf0f3ec71))
- **iconfont:** 日常维护更新 ([8b3235e](https://github.com/JayTam/antd-ms/commit/8b3235eee493e65eb3e55306af8841ba3564bad0))
- **ms-actions:** 下拉列表太长时展示滚动条 ([15c4dd7](https://github.com/JayTam/antd-ms/commit/15c4dd7566ae3001961430d2b1f9e55ea9c91e5d))
- **ms-actions:** 样式修复 ([07d4804](https://github.com/JayTam/antd-ms/commit/07d4804e57f0ac2c82b8d2548c83d12746762d7a))
- **ms-actions:** 组件参数拼写错误修正, 优化写法, 修复不跟随表格滚动的 bug, 标准化组件目录结构 ([b8e3f48](https://github.com/JayTam/antd-ms/commit/b8e3f4852c0a2b7800e7877d3c0b3c947346b4db))
- **ms-configprovider:** 解决本地开发，子应用的 sentry 没有被清除导致主应用卡死的问题 ([0ada399](https://github.com/JayTam/antd-ms/commit/0ada399353bef42a4e6ac9e1cb1a25871654c063))
- **ms-configprovider:** 修复获取环境方式 ([f4e83eb](https://github.com/JayTam/antd-ms/commit/f4e83eb7d4ea3316d3c7630117a6c079eb87e6af))
- **ms-cost:** 修复计费没有深度监听属性 ([7e44dd0](https://github.com/JayTam/antd-ms/commit/7e44dd02f65837c11e52b9227baae264a72a9172))
- **ms-cost:** 修复计费无产品价格显示之前的 ([a8c83b0](https://github.com/JayTam/antd-ms/commit/a8c83b0617a06517b5c1ae6d39808b97ce436f31))
- **ms-iconfont:** 图标新增 compatibleType 属性，当 type 不生效时，fix 图标名称问题 ([30fb3f5](https://github.com/JayTam/antd-ms/commit/30fb3f50666b629504f82a266a6cf6e098ccf58d))
- **ms-input-number ms-radio:** 修复泛型组件的泛型默认值 ([d6542e0](https://github.com/JayTam/antd-ms/commit/d6542e0e6fe58b0f5cf48e9ff243dbbacfad8770))
- **ms-input-number, ms-radio:** 修复组件泛型未能生效的问题 ([68389cc](https://github.com/JayTam/antd-ms/commit/68389cc29f80d5d0f5b856390cf7d5e1b4f59ac4))
- **ms-layout:** 菜单宽度缩小为 184px 间距缩小为 12px ([d9c7020](https://github.com/JayTam/antd-ms/commit/d9c702067fcba627904de5e9239c69fb49391617))
- **ms-layout:** 菜单收缩样式问题 ([cded65d](https://github.com/JayTam/antd-ms/commit/cded65dd3751652e82903dadbdfc10d9d355a840))
- **ms-layout:** 二级菜单都没权限-父级菜单不展示 ([6c2c4e6](https://github.com/JayTam/antd-ms/commit/6c2c4e6f320ec59bc2b540bde582201641fe5df3))
- **ms-layout:** 修复菜单打包后样式不一致 ([dcd9a25](https://github.com/JayTam/antd-ms/commit/dcd9a2553a682c8fc629bc0b39ffde518ad6d118))
- **ms-layout:** 修复菜单权限问题 ([354d021](https://github.com/JayTam/antd-ms/commit/354d02160a4aeb847f4c9778e235c26a42157e02))
- **ms-layout:** 修复菜单缩起选中菜单没有背景高亮 ([e451c60](https://github.com/JayTam/antd-ms/commit/e451c60dbbc7a5be687b0a22faf33ad4d87d387c))
- **ms-layout:** 修复菜单样式高度变现不一致 ([26d3c48](https://github.com/JayTam/antd-ms/commit/26d3c48427de91b85dc8742cf9e1e19ad6f2a562))
- **ms-layout:** 修复从其他菜单跳转 不能默认展开问题 ([142fd8d](https://github.com/JayTam/antd-ms/commit/142fd8d7261a3f721762f46a21cd2181ff82ef46))
- **ms-layout:** 修复多层嵌套路由，二级菜单 childShow 问题 ([27b465a](https://github.com/JayTam/antd-ms/commit/27b465a5c2a8d2ec2a0b8c536dff62fa2ac6c4a4))
- **ms-layout:** 修复面包屑层级不支持动态路由 ([6743829](https://github.com/JayTam/antd-ms/commit/67438299f6f83bc09310bee322de31081ef3003e))
- **ms-layout:** 修复子菜单左侧在线上环境未对齐问题 ([67b73a6](https://github.com/JayTam/antd-ms/commit/67b73a6d5a12071fbb1eac4fb6a2486150eaaa74))
- **ms-layout:** 子菜单动态路由支持回显&高亮 ([2af1db9](https://github.com/JayTam/antd-ms/commit/2af1db9ccad8b7451b4060874f614c598621b43e))
- **ms-radio:** 修改 class 样式, 提高样式优先级 ([92e2b5e](https://github.com/JayTam/antd-ms/commit/92e2b5ef22225e2f23a279a5bccfb53bd02692bd))
- **ms-request:** 401 错误处理 ([9986fe3](https://github.com/JayTam/antd-ms/commit/9986fe3d7ee24b573d93696b691127b7ab82c5a2))
- **ms-request:** 删除无用的测试代码 ([8dee9cb](https://github.com/JayTam/antd-ms/commit/8dee9cbb2ebc093390129a7c1f90b7ee542a4a01))
- **ms-request:** 针对 res 是 Blob 对象而不是 json 的兼容处理 ([38f2c9c](https://github.com/JayTam/antd-ms/commit/38f2c9c96bcbdf442eb4a5e2a6d2acd4910b7e41))
- **ms-resource-tags:** 完善 mergeResourceRequest 和 mergeResourceRequestList 对 postData 的支持 ([650954b](https://github.com/JayTam/antd-ms/commit/650954bfc4e1637c726d2cc4a96577b4c7b37095))
- **ms-resource-tags:** 修复资源标签垂直居中的样式问题 ([c039521](https://github.com/JayTam/antd-ms/commit/c0395210e27a66c8258fb63fe1946466950240da))
- **ms-resource-tags:** 资源标签 key 为空不能提交 ([01906d4](https://github.com/JayTam/antd-ms/commit/01906d4b92235467243e26d27988be396ec09125))
- **ms-table:** 1.filter 模式不继承 fieldProps.style 属性 2.query 模式支持设置 label ([004db53](https://github.com/JayTam/antd-ms/commit/004db534275af0218ac83db9a1b245b6bcce27e3))
- **ms-table:** 表单组件默认 width=100% ([7f57459](https://github.com/JayTam/antd-ms/commit/7f5745914354d4547eb8315347168083894fd629))
- **ms-table:** 关闭分页，剔除分页查询参数 ([2529e49](https://github.com/JayTam/antd-ms/commit/2529e49b1994ae3b15929af498f3e46c54787d4f))
- **ms-table:** 解决调用 action.reset，筛选值在 UI 上未更新 ([ed0b141](https://github.com/JayTam/antd-ms/commit/ed0b14130850d5626155951597421bd33c398a0e))
- **ms-table:** 解决设置 formItemProps.rules，选择提交失效 ([7114adc](https://github.com/JayTam/antd-ms/commit/7114adc20cdddfc393fe6bcb2b0eb5d0ceb0bc69))
- **ms-table:** 密度设置文案调整，中等 -> 适中 ([325dc00](https://github.com/JayTam/antd-ms/commit/325dc00f6633a02115ba33b4cafa0c5ed51e5fb6))
- **ms-table:** 密度设置只影响表格，不影响其他区域 ([41af1d2](https://github.com/JayTam/antd-ms/commit/41af1d29c64cf90c9d2715e309c3e40ff6b70221))
- **ms-table:** 默认隐藏分页器快速跳转，总数文案调整 ([5ae30e4](https://github.com/JayTam/antd-ms/commit/5ae30e4ff90261d02501f660a1a751f9f8d0d50d))
- **ms-table:** 去掉筛选器的箭头，优化 colon 的显示 ([e92a81c](https://github.com/JayTam/antd-ms/commit/e92a81cd256f5906e9636214ac565b67c7ade443))
- **ms-table:** 完善 request 类型 ([d06da74](https://github.com/JayTam/antd-ms/commit/d06da74da261d3e9ba7caa5649d935be1192bfb6))
- **ms-table:** 修复 actionRef.reset() 无效 ([1c0a908](https://github.com/JayTam/antd-ms/commit/1c0a9087b76c959d9221e3dc02e9837e64873ea6))
- **ms-table:** 修复 columnResizable=true，table header 原有样式被覆盖 ([095ffbe](https://github.com/JayTam/antd-ms/commit/095ffbe8697f445cc7a21669e262058135fbaed0))
- **ms-table:** 修复 dataSource 更新，table 未刷新 ([aade2a7](https://github.com/JayTam/antd-ms/commit/aade2a7eb35b959ad55b0f5b510448f94db93469))
- **ms-table:** 修复 hideInTable=true & search=true 未生成搜索项 ([28d7289](https://github.com/JayTam/antd-ms/commit/28d7289719c1b78cffd14994a8d7430a4eb41977))
- **ms-table:** 修复 initialValue 在 query 和 filter 模式中异常 ([9a0d08b](https://github.com/JayTam/antd-ms/commit/9a0d08ba1e88cebe3b249a842a4987a909b62814))
- **ms-table:** 修复 scroll.y=auto-content 滚动高度异常 ([b1e342f](https://github.com/JayTam/antd-ms/commit/b1e342f9e1f049b6a5267c7aa7b31acc9a1fb148))
- **ms-table:** 修复 tooltip 重复渲染 ([2398163](https://github.com/JayTam/antd-ms/commit/2398163a2e3b10d7f08b4fc9663d6e1571f1f699))
- **ms-table:** 修复分页器中的 current 和 pageSize 未从 string -> number 类型 ([aad43a2](https://github.com/JayTam/antd-ms/commit/aad43a241ea1e84e857e1994a3493232731e524e))
- **ms-table:** 修复分页失效 ([4605d33](https://github.com/JayTam/antd-ms/commit/4605d3328f9b037f789ac6436d3bff84320cf896))
- **ms-table:** 修复分页失效 ([7f2530e](https://github.com/JayTam/antd-ms/commit/7f2530ea1d03051786a0a2f03b1435b46d35070d))
- **ms-table:** 修复控制台报警告 ([4cb44c2](https://github.com/JayTam/antd-ms/commit/4cb44c251931b22cf3966adc980b8e6382513202))
- **ms-table:** 修复列设置控制标签显示和隐藏时报错 ([01f84c2](https://github.com/JayTam/antd-ms/commit/01f84c2e2ef0ba9907d629326f6fa82ef2db588c))
- **ms-table:** 修复列设置刷新页面失效 ([f2f7d5d](https://github.com/JayTam/antd-ms/commit/f2f7d5dac866835976fabb4a5c1809423ff14fd8))
- **ms-table:** 修复提交查询表单时，清空了自定义 url 的 query 参数 ([9ef05e3](https://github.com/JayTam/antd-ms/commit/9ef05e3148390d1a1c39c53c15a512621eb68a58))
- **ms-table:** 修复未动态计算 selectionButtonsRender 高度，导致自适应高度不准确 ([ca7b894](https://github.com/JayTam/antd-ms/commit/ca7b894062c47715aac362d4b7137239af207ab5))
- **ms-table:** 修复因 useUrlState 的 setState 延迟更新导致 initialValues 失效 ([e66aa6e](https://github.com/JayTam/antd-ms/commit/e66aa6e20805547d0edad88aa24f60f1f5d1bb09))
- **ms-table:** 修复因新增表头筛选器导致的 column.initialValue 失效 ([2a91b68](https://github.com/JayTam/antd-ms/commit/2a91b68ae9ff0057b2e7197bbaae70804e1bc529))
- **ms-table:** 修复直传 dataSource 失效 ([21812c2](https://github.com/JayTam/antd-ms/commit/21812c2ca89cf83f3318bed21223f44d8fac5d36))
- **ms-table:** 修复重构列设置初始化引起的异常 ([99cbf55](https://github.com/JayTam/antd-ms/commit/99cbf55c45d395c72aa29c24e070958fc6954bb7))
- **ms-table:** 修复资源标签合并方法，默认 postRes 参数错误 ([0019abb](https://github.com/JayTam/antd-ms/commit/0019abb242608cca0d1b451838b0f570f724faa0))
- **ms-table:** 修复自适应滚动高度异常 ([7e72f3f](https://github.com/JayTam/antd-ms/commit/7e72f3ffaa0741a911371114398090dba7a93b28))
- **ms-table:** 修复 column 设置 hideInTable 之后，initialValue 失效 ([e7b685c](https://github.com/JayTam/antd-ms/commit/e7b685c8f9a1e26eb216164e54aeafeb9343fcbe))
- **ms-table:** 修改 resetDepsParmaKyes 的默认值 region 单词拼写错误 ([f8720d3](https://github.com/JayTam/antd-ms/commit/f8720d322d777eaa5fa4fd89950ce6d1f34480e2))
- **ms-table:** 优化筛选器间隔 ([74b1a0c](https://github.com/JayTam/antd-ms/commit/74b1a0cda9a04bdaccb0ef858192f2c3d9d6b3c4))
- **ms-table:** card 用阴影代替边框 ([977ca85](https://github.com/JayTam/antd-ms/commit/977ca85cdf168a1def8b8afc5b669639841e24d8))
- **ms-table:** dataSource=[] 默认参数被 useEffect 依赖，reRender 时会触发更新 ([9bd024d](https://github.com/JayTam/antd-ms/commit/9bd024d9aa2e86a35fd4a31335f331ce4412b0c9))
- **ms-table:** filter 选择器中表单组件 width=100% ([ac78fd6](https://github.com/JayTam/antd-ms/commit/ac78fd630f77a9f6828e144e1691cb4b61bf9d75))
- **ms-table:** switch 组件在 search 和 filter 模式中，无需 width=100% ([0310fb3](https://github.com/JayTam/antd-ms/commit/0310fb3bb44805abff382b4140c3245b40e7a478))
- **msconfigprovider:** 销毁微应用时，同时销毁 notification,避免样式丢失 ([5a84a50](https://github.com/JayTam/antd-ms/commit/5a84a505551156f2ef7ef266878f54762b134c9a))
- **msconfigprovider:** message 也应该被销毁 ([825625c](https://github.com/JayTam/antd-ms/commit/825625c608cdb0b6483341628b7afc7376c3c48a))
- **msrequest:** 1、文件上传自动处理 headers，2、登录状态允许自定义 ([04b2ecd](https://github.com/JayTam/antd-ms/commit/04b2ecd437d9e81d043149d271114c2dc369d96f))
- **msrequest:** 切换路由取消请求时，兼容旧项目直接结构 res.code 的操作 ([2a70510](https://github.com/JayTam/antd-ms/commit/2a705102d41446347bb42918669f6339532f77f9))
- **msrequest:** 文档更新 ([0dc2385](https://github.com/JayTam/antd-ms/commit/0dc23852dfc3b093a4b9fdf0304cfdb2c2d860f9))
- **msrequest:** 修复取消请求时返回数据结构 ([fb90463](https://github.com/JayTam/antd-ms/commit/fb90463c1dfa3501ed1753453cd3a3999216b629))
- **msrequest:** formData 请求类型处理 ([8d84460](https://github.com/JayTam/antd-ms/commit/8d84460d8fc413da90bc29c543ca7ec377f930a2))
- **rangenumber:** onchange 修改 ([493db1a](https://github.com/JayTam/antd-ms/commit/493db1a51ef916587c0e0840e502b669439ce80c))
- **request:** private 声明类内部私有属性与方法 ([8c374bf](https://github.com/JayTam/antd-ms/commit/8c374bf062f05bc8906b599818ce4944461a734f))
- **use-loading:** 修复多参数传参 bug ([a2f2195](https://github.com/JayTam/antd-ms/commit/a2f2195bbe4db49cca5f43ee6e694b3ccb1c72f1))
- **use-loading:** 增加 rxjs 控制的异步数据流控制 ([69b24dc](https://github.com/JayTam/antd-ms/commit/69b24dc64f5131d97d5f1828941bb27a6b6e3906))
- **use-url-state:** 修复 url 上有非 JSON 格式参数时报错的 bug ([44c88de](https://github.com/JayTam/antd-ms/commit/44c88deeed0cf8bd97803f7799374760ae18bc65))
