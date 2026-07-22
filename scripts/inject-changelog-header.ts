import fs from 'node:fs';
import path from 'node:path';

/**
 * inject-changelog-header.ts
 *
 * 维护根 CHANGELOG.md 的 dumi frontmatter 头块。
 *
 * 背景：changeset version 会把新版本条目追加到 CHANGELOG.md 最顶部，
 * 将 YAML frontmatter（`---\ntitle: 版本迭代\n...`）挤到文件中间，
 * 而 dumi/gray-matter 只识别位于文件首行的 frontmatter —— 一旦被挤走即失效。
 *
 * 本脚本用 HTML 注释标记 `<!-- antdms-changelog-header:START/END -->` 包裹头块，
 * 在 `changeset version` 之后运行，把头块重新提到文件最顶部。
 *
 * 用法：
 *   pnpm tsx scripts/inject-changelog-header.ts          # 修复头块到顶部（写回）
 *   pnpm tsx scripts/inject-changelog-header.ts --check  # 仅校验，状态不健康则 exit 1
 */

const START = '<!-- antdms-changelog-header:START -->';
const END = '<!-- antdms-changelog-header:END -->';

// 头块正文：dumi frontmatter + 发布规则文案 + `# 更新日志` 标题。
// 与原 .versionrc.js header 对齐（Phase E 删除 .versionrc.js 后由本常量接管）。
// 注意：`影响。\u200B` 末尾保留零宽空格 U+200B，与历史 CHANGELOG 一致。
const HEADER = [
  '---',
  'title: 版本迭代',
  'toc: content',
  '---',
  '',
  '# 版本迭代',
  '',
  '`antd-ms` 遵循 [Semantic Versioning 2.0.0](/guide/standard#版本号规范) 语义化版本规范。结合下面的 [更新日志](/guide/changelog#更新日志)、<a href="https://weikezhijia.feishu.cn/wiki/HUWZwAcjIirLydkQsrSctNkUnYg" target="_blank">正式版问题</a> 和 <a href="https://weikezhijia.feishu.cn/wiki/HUWZwAcjIirLydkQsrSctNkUnYg" target="_blank">Breaking Changes</a>，可以更全面地掌握组件库的更新状态与潜在影响。\u200B',
  '',
  '# 发布规则及周期',
  '',
  '- 修订版本号：缺陷修复或小功能，每天都可能发布。',
  '- 次版本号：新组件或大功能，发布周期大概每月一次。',
  '- 主版本号：组件库基础架构调整，发布周期不确定。',
  '',
  '# 更新日志',
  '',
].join('\n');

// 完整头块（含 START/END 标记），最终写到文件顶部的内容。
const HEADER_BLOCK = `${START}\n${HEADER}\n${END}\n`;

const CHANGELOG_PATH = path.resolve(__dirname, '..', 'CHANGELOG.md');

// 版本条目首行的识别：standard-version 写 `## 2.25.0` / `## [2.24.0]`，
// changesets 写 `# 2.26.0`。统一匹配 `^#{1,3} \[?\d+\.\d+\.\d+`。
const VERSION_ENTRY_RE = /^#{1,3} \[?\d+\.\d+\.\d+/;

/**
 * 读取 CHANGELOG.md，返回规范化后的内容（头块置顶 + 条目部分）。
 */
function normalize(content: string): string {
  const startIdx = content.indexOf(START);
  const endIdx = content.indexOf(END);

  // 已存在 START..END 块：把它重提到顶。
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = content.slice(0, startIdx);
    const after = content.slice(endIdx + END.length);
    const entries = (before + after).replace(/^\s+/, '').replace(/\s+$/, '\n');
    return entries ? `${HEADER_BLOCK}\n${entries}` : `${HEADER_BLOCK}\n`;
  }

  // 无 START..END 块：处理遗留 standard-version 格式或全新空文件。
  // 剥离从文件顶到第一个版本条目行（含其前导空行）之间的所有内容，
  // 用固定 HEADER_BLOCK 替换之，保留条目部分。
  const lines = content.split(/\r?\n/);
  let entryStart = lines.length;
  for (let i = 0; i < lines.length; i++) {
    if (VERSION_ENTRY_RE.test(lines[i])) {
      entryStart = i;
      break;
    }
  }
  const entries = lines.slice(entryStart).join('\n').replace(/^\s+/, '').replace(/\s+$/, '\n');
  return entries ? `${HEADER_BLOCK}\n${entries}` : `${HEADER_BLOCK}\n`;
}

function main(): void {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');

  if (!fs.existsSync(CHANGELOG_PATH)) {
    throw new Error(`CHANGELOG 不存在: ${CHANGELOG_PATH}`);
  }

  const original = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const normalized = normalize(original);

  if (checkOnly) {
    if (normalized !== original) {
      console.error(
        'CHANGELOG.md 头块状态不健康（frontmatter 未在文件最顶部）。请运行 `pnpm tsx scripts/inject-changelog-header.ts` 修复后重试。',
      );
      process.exit(1);
    }
    console.log('CHANGELOG.md 头块状态正常。');
    return;
  }

  if (normalized !== original) {
    fs.writeFileSync(CHANGELOG_PATH, normalized);
    console.log('CHANGELOG.md 头块已修复并置顶。');
  } else {
    console.log('CHANGELOG.md 头块无需调整。');
  }
}

main();
