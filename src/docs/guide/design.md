---
title: 设计规范
toc: content
order: 6
group:
  title: 进阶使用
---

# 设计规范

根据设计规范，完成公共样式的封装，以便保证各项目内使用的颜色统一且符合设计规范，故而提供如下能力：

1. 导出一个 `modifyVars`配置对象，在项目中通过配置 `less loader`统一覆盖 `antd`的默认样式，使得 `antd`组件样式与 devops 设计规范 保持一致。
2. 导出一个 `less`文件，将 devops 设计规范中的公共样式提取为 `less`变量，项目中引入这个 `less`文件即可使用这些 `less`变量。
3. 导出一个 `designToken`对象，以便在 `jsx/tsx`文件中也能使用与 `less`变量相同的公共样式。

## 使用方式

### 覆盖 antd 的 less 变量

通过 `webpack`的 `less loader`使用导出的 `modifyVars`对象覆盖 `antd`的 `less`变量。若是 umi 项目可在 `config/config.ts` 中配置。例如：

```typescript
// 注意：需要从 cjs 中导入 modifyVars 对象
import modifyVars from '@jaytam/antd-ms/lib/cjs/design/modifyVars';
import { defineConfig } from '@jaytam/umiconfig';

const config = defineConfig({
  // ...其他配置
  modifyVars: {
    ...modifyVars,
  },
  // ...其他配置
});

export default config;
```

### 使用 less 变量

在项目的 `less`文件中导入公共的 `less`变量定义文件，例如：

```less
@import '@jaytam/antd-ms/lib/esm/design/global/index.less';

.lessVars {
  width: 200px;
  height: 50px;
  margin-top: @space-md;
  font-size: @space-md;
  line-height: 50px;
  text-align: center;
  background-color: @error-color;
  border-radius: @border-radius-lg;
}
```

### 使用 designToken 对象

在项目的 `jsx/tsx`文件中可以通过 `designToken`对象来使用公共的样式变量，例如：

```typescript
import { designToken } from '@jaytam/antd-ms';

export const App = () => {
  return (
    <div
      style={{
        width: 200,
        height: 50,
        lineHeight: '50px',
        textAlign: 'center',
        marginTop: designToken.space.md,
        fontSize: designToken.fontSize.large,
        borderRadius: designToken.fontSize.medium,
        backgroundColor: designToken.color.success,
      }}
    >
      测试designToken
    </div>
  );
};
```

## devops 设计规范样式速查表

### 颜色

| 颜色示例 | 样式值 | less 变量 | js 变量 |
| --- | --- | --- | --- |
| <div style="background-color: #006EFF;height: 20px"></div> | `#006EFF` | `@primary-color` | `designToken.color.primary` |
| <div style="background-color: #2e90ff;height: 20px"></div> | `#2e90ff` | `@primary-hover-color` | `designToken.color.primaryHover` |
| <div style="background-color: #0054ad;height: 20px"></div> | `#0054ad` | `@primary-active-color` | `designToken.color.primaryActive` |
| <div style="background-color: #bae1ff;height: 20px"></div> | `#bae1ff` | `@primary-disable-color` | `designToken.color.primaryDisable` |
| <div style="background-color: #e8f6ff;height: 20px"></div> | `#e8f6ff` | `@primary-white-hover-color` | `designToken.color.primaryWhiteHover` |
| <div style="background-color: #20242e;height: 20px"></div> | `#20242e` | `@emphasis-color` | `designToken.color.emphasis` |
| <div style="background-color: #464f5c;height: 20px"></div> | `#464f5c` | `@sub-emphasis-color` | `designToken.color.subEmphasis` |
| <div style="background-color: #78858f;height: 20px"></div> | `#78858f` | `@secondary-color` | `designToken.color.secondary` |
| <div style="background-color: #c2c6cc;height: 20px"></div> | `#c2c6cc` | `@dim-color` | `designToken.color.dim` |
| <div style="background-color: #e6e8eb;height: 20px"></div> | `#e6e8eb` | `@white-color` | `designToken.color.white` |
| <div style="background-color: #c9ccd1;height: 20px"></div> | `#c9ccd1` | `@gray-color` | `designToken.color.gray` |
| <div style="background-color: #f7f8fa;height: 20px"></div> | `#f7f8fa` | `@light-gray-color` | `designToken.color.lightGray` |
| <div style="background-color: #eceef1;height: 20px"></div> | `#eceef1` | `@white-gray-color` | `designToken.color.whiteGray` |
| <div style="background-color: #dfe1e6;height: 20px"></div> | `#dfe1e6` | `@medium-gray-color` | `designToken.color.mediumGray` |
| <div style="background-color: #c2c6cc;height: 20px"></div> | `#c2c6cc` | `@silver-grey-color` | `designToken.color.silverGray` |
| <div style="background-color: #464f5c;height: 20px"></div> | `#464f5c` | `@dark-grey-color` | `designToken.color.darkGray` |
| <div style="background-color: #12b02c;height: 20px"></div> | `#12b02c` | `@success-color` | `designToken.color.success` |
| <div style="background-color: #46cb6f;height: 20px"></div> | `#46cb6f` | `@success-hover-color` | `designToken.color.successHover` |
| <div style="background-color: #009d1f;height: 20px"></div> | `#009d1f` | `@success-active-color` | `designToken.color.successActive` |
| <div style="background-color: #aff1b1;height: 20px"></div> | `#aff1b1` | `@success-disable-color` | `designToken.color.successDisable` |
| <div style="background-color: #e8fce8;height: 20px"></div> | `#e8fce8` | `@success-white-hover-color` | `designToken.color.successWhiteHover` |
| <div style="background-color: #ff8800;height: 20px"></div> | `#ff8800` | `@warning-color` | `designToken.color.warning` |
| <div style="background-color: #ffa52e;height: 20px"></div> | `#ffa52e` | `@warning-hover-color` | `designToken.color.warningHover` |
| <div style="background-color: #e07000;height: 20px"></div> | `#e07000` | `@warning-active-color` | `designToken.color.warningActive` |
| <div style="background-color: #ffe8ba;height: 20px"></div> | `#ffe8ba` | `@warning-disable-color` | `designToken.color.warningDisable` |
| <div style="background-color: #fff8e8;height: 20px"></div> | `#fff8e8` | `@warning-white-hover-color` | `designToken.color.warningWhiteHover` |
| <div style="background-color: #f54545;height: 20px"></div> | `#f54545` | `@error-color` | `designToken.color.error` |
| <div style="background-color: #f55953;height: 20px"></div> | `#f55953` | `@error-hover-color` | `designToken.color.errorHover` |
| <div style="background-color: #c1363b;height: 20px"></div> | `#c1363b` | `@error-active-color` | `designToken.color.errorActive` |
| <div style="background-color: #fccdca;height: 20px"></div> | `#fccdca` | `@error-disable-color` | `designToken.color.errorDisable` |
| <div style="background-color: #ffeded;height: 20px"></div> | `#ffeded` | `@error-white-hover-color` | `designToken.color.errorWhiteHover` |

### 字号

| 样式值 | less 变量           | js 变量                       |
| ------ | ------------------- | ----------------------------- |
| `12px` | `@font-size-small`  | `designToken.fontSize.small`  |
| `14px` | `@font-size-normal` | `designToken.fontSize.normal` |
| `16px` | `@font-size-medium` | `designToken.fontSize.medium` |
| `20px` | `@font-size-large`  | `designToken.fontSize.large`  |

### 字重

| 样式值 | less 变量               | js 变量                           |
| ------ | ----------------------- | --------------------------------- |
| `400`  | `@font-weight-normal`   | `designToken.fontWeight.normal`   |
| `500`  | `@font-weight-medium`   | `designToken.fontWeight.medium`   |
| `600`  | `@font-weight-semibold` | `designToken.fontWeight.semibold` |

### 间距

| 样式值 | less 变量   | js 变量                |
| ------ | ----------- | ---------------------- |
| `4px`  | `@space-xs` | `designToken.space.xs` |
| `8px`  | `@space-sm` | `designToken.space.sm` |
| `16px` | `@space-md` | `designToken.space.md` |
| `24px` | `@space-lg` | `designToken.space.lg` |

### 圆角

| 样式值 | less 变量             | js 变量                         |
| ------ | --------------------- | ------------------------------- |
| `2px`  | `@border-radius-sm`   | `designToken.borderRadius.sm`   |
| `4px`  | `@border-radius-md`   | `designToken.borderRadius.md`   |
| `8px`  | `@border-radius-lg`   | `designToken.borderRadius.lg`   |
| `50%`  | `@border-radius-full` | `designToken.borderRadius.full` |
