// @ts-nocheck
import { optimize } from 'svgo';

/**
 * Jest transformer: 把 .svg 文件转成可被 import 的模块, 渲染真实的 svg 内容.
 *
 * 与历史 snapshot 行为对齐: 通过 svgo 跑默认优化 (移除 version 等冗余属性,
 * 数字精度统一), 让渲染出的 <svg><path d="..."/></svg> 跟 inline-react-svg
 * 构建期产物一致.
 *
 * 行为约定:
 *   import { ReactComponent as Foo } from './foo.svg'
 *     -> Foo 是函数组件, 渲染真实 <svg> 元素 (含 path 等子节点),
 *        叠加调用方传入的 props (svgBaseProps: viewBox/width/height/...).
 *   import url from './foo.svg'
 *     -> url 仍拿到可作 React 节点渲染的函数组件 (兼容 antd Empty image 用法).
 *
 * 实现说明:
 *   - 用 svgo 优化 svg 源文本, 与历史 inline-react-svg 构建链路保持一致.
 *   - 解析优化后 svg 根节点的 attrs, 转成 React props (class -> className).
 *   - 内层 XML 通过 dangerouslySetInnerHTML 注入, 调用方再 spread props 时
 *     svg 根属性 (viewBox 等) 不会被覆盖危险注入内容.
 *   - 不依赖 inline-react-svg 本身, 因 jest 用 esbuild transform, 不跑 babel.
 */

const SVG_RE = /<svg([^>]*)>([\s\S]*?)<\/svg>/;

type SvgAttrs = Record<string, string>;

function parseSvgAttrs(attrsStr: string): SvgAttrs {
  const attrs: SvgAttrs = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*"([^"]*)")?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrsStr)) !== null) {
    const key = m[1];
    const val = m[2] || '';
    if (key === 'class') {
      attrs.className = val;
    } else {
      attrs[key] = val;
    }
  }
  return attrs;
}

function optimizeSync(sourceText: string): string {
  try {
    const result = optimize(sourceText, { path: '' });
    if (result && result.error) {
      console.error('[svg-transformer] svgo failed:', result.error);
      return sourceText;
    }
    return typeof result === 'string' ? result : result.data;
  } catch (e) {
    console.error('[svg-transformer] svgo threw:', (e as Error)?.message);
    return sourceText;
  }
}

interface Transformed {
  code: string;
}

const transformer = {
  process(sourceText: string, sourcePath: string): Transformed {
    const optimized = optimizeSync(sourceText);
    const m = SVG_RE.exec(optimized);
    if (!m) {
      const code = `module.exports = { default: ${JSON.stringify(
        sourcePath,
      )}, ReactComponent: (props: any) => require('react').createElement('svg', props) };`;
      return { code };
    }

    const [, attrsStr, innerXml] = m;
    const svgAttrs = parseSvgAttrs(attrsStr);

    const code = `
const React = require('react');
const SVG_ATTRS = ${JSON.stringify(svgAttrs)};
const INNER_XML = ${JSON.stringify(innerXml)};

const ReactComponent = (props) =>
  React.createElement('svg', {
    ...SVG_ATTRS,
    ...props,
    dangerouslySetInnerHTML: { __html: INNER_XML },
  });

// 保持与旧 svg mock 兼容: module.exports 即 ReactComponent, 使
// 默认导入也能拿到可作 React 节点渲染的函数组件.
// 同时把 ReactComponent 作为命名导出供命名导入使用.
module.exports = ReactComponent;
module.exports.default = ReactComponent;
module.exports.ReactComponent = ReactComponent;
`;
    return { code };
  },
};

export default transformer;
