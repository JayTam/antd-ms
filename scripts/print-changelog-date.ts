import { findCommitList, findVersionRange } from './utils/changelog';
import dayjs from 'dayjs';

const BASE_URL = 'http://ui.example.example.test';

/**
 * 大驼峰转短横线风格
 * @param {*} str
 * @returns
 */
function pascalToKebab(str: string): string {
  return str
    .split(/(?=[A-Z])/) // 按大写字母分割（零宽断言）
    .join('-')
    .toLowerCase();
}

function getMarkdownLink(name: string, type: string): string {
  const urlName = pascalToKebab(name);
  if (type === 'component') {
    return `[${name}](${BASE_URL + '/components/' + urlName})`;
  }
  if (type === 'field') {
    return `[${name}](${BASE_URL + '/fields/' + urlName})`;
  }

  return name;
}

/**
 * 直接打印 changelog
 */
async function printChangelog(fromVersion: string, toVersion: string): Promise<void> {
  const groupedCommitList = await findCommitList(fromVersion, toVersion);
  let featTable = `**功能特性**
| 组件 | 描述 | 备注 |
| --- | --- | --- |
`;

  let fixTable = `\n**缺陷修复**
| 组件 | 描述 | 备注 |
| --- | --- | --- |
`;
  for (const [name, types] of groupedCommitList) {
    if (types.feat.length > 0) {
      types.feat.forEach((commit) => {
        featTable += `|${getMarkdownLink(name, commit.atomType)} | ${commit.message} | |\n`;
      });
    }
    if (types.fix.length > 0) {
      types.fix.forEach((commit) => {
        fixTable += `|${getMarkdownLink(name, commit.atomType)} | ${commit.message} | |\n`;
      });
    }
  }

  console.log(`${featTable}${fixTable}`);
}

/**
 * 打印本周 changelog
 * 根据本周的时间，查找到 form, to 的版本号，再查询两个版本之间的 chanelog
 */
async function printWeek(): Promise<void> {
  const startOfWeek = dayjs().startOf('week').day(1);
  const endOfWeek = startOfWeek.clone().add(6, 'day');
  const versionRange = await findVersionRange(startOfWeek, endOfWeek);
  const fromVersion = versionRange[0];
  const toVersion = versionRange[1];
  console.log(
    `## ${dayjs(startOfWeek).format('YYYY/MM/DD')} - ${dayjs(endOfWeek).format('YYYY/MM/DD')}`,
  );
  console.log(`版本更新范围：${fromVersion} - ${toVersion}`);
  printChangelog(fromVersion, toVersion);
}

printWeek();
