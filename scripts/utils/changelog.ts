import * as simpleGit from 'simple-git';
import { uniqBy } from 'lodash-es';
import dayjs, { Dayjs } from 'dayjs';
import { emailToUser } from '../data/user';
import { globSync } from 'glob';
import { version } from '../../package.json';
import path from 'path';

const git = simpleGit.simpleGit();

/**
 * 根据版本号查找 git commit，并且根据 scope 进行分组
 * @param {string} from 升级前版本
 * @param {string} to 升级后版本
 * @param {string} type 升级后版本
 * @returns
 */
export async function findCommitList(from: string, to: string = version, type: string = 'version') {
  /**
   * scope 转换成组件名称
   * @param {string} str
   * @returns
   */
  function toComponentName(str: string) {
    // 将字符串按 '-' 分割成数组
    const words = str.split('-');

    if (words[0].toLowerCase() === 'use') {
      const baseName = words
        .map((word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join('');
      return baseName;
    }

    const baseName = words
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');

    if (words[0].toLowerCase() === 'ms') {
      return baseName;
    }

    return `Ms${baseName}`; // 将数组重新组合成字符串
  }

  const log = await git.log();

  let commitsSinceTarget;

  if (type === 'version') {
    // 查找升级前，提交信息的commit
    const { fromCommit, toCommit } = await findCommitByVersion(from, to);

    // 过滤出从目标 commit 到最新的所有提交
    const versionLog = await git.log([`${fromCommit.hash}..${toCommit.hash}`]);
    commitsSinceTarget = versionLog.all;
  } else if (type === 'date') {
    const fromDate = dayjs(from).toISOString();
    const toDate = dayjs(to).toISOString();
    commitsSinceTarget = log.all.filter((commit) => {
      commit.diff;
      return commit.date >= fromDate && commit.date <= toDate;
    });
  } else {
    return Promise.reject(new Error(`type 类型错误，只能使用 version 和 date `));
  }

  // 过滤出以feat或fix开头的提交，并解析它们的scope
  const filteredCommits = commitsSinceTarget
    .filter((commit) => !!commit.message.match(/^(feat|fix)\(([\w|-]+)\):\s*(.*)/))
    .map((commit) => {
      const match = commit.message.match(/^(feat|fix)\(([\w|-]+)\):\s*(.*)/);
      return {
        ...commit,
        // feat 或 fix
        type: match?.[1] as 'feat' | 'fix',
        scope: match?.[2] as string,
        message: match?.[3] as string,
        atomType: getAtomType(match?.[2] as string),
      };
    });

  // 按照scope进行分组
  const groupedCommits: Record<
    string,
    { feat: typeof filteredCommits; fix: typeof filteredCommits; users: Set<string> }
  > = {};
  filteredCommits.forEach((commit) => {
    if (!groupedCommits[commit.scope]) {
      groupedCommits[commit.scope] = { feat: [], fix: [], users: new Set() };
    }
    groupedCommits[commit.scope][commit.type].push({
      ...commit,
      hash: commit.hash,
      date: commit.date,
      message: commit.message,
    });

    const userId = emailToUser[commit.author_email].userId;

    if (userId) {
      groupedCommits[commit.scope].users.add(emailToUser[commit.author_email].userId);
    }

    // 去重复 message
    groupedCommits[commit.scope][commit.type] = uniqBy(
      groupedCommits[commit.scope][commit.type],
      'message',
    );
    // 按时间排序
    groupedCommits[commit.scope][commit.type] = groupedCommits[commit.scope][commit.type].sort(
      (prev, next) => new Date(prev.date).valueOf() - new Date(next.date).valueOf(),
    );
  });

  const groupedCommitList = Object.entries(groupedCommits).sort((a, b) => {
    const order = { ms: 0, default: 1, use: 2 };
    // 获取 a 和 b 的 scope 前缀
    const aPrefix = a[0].startsWith('ms') ? 'ms' : a[0].startsWith('use') ? 'use' : 'default';
    const bPrefix = b[0].startsWith('ms') ? 'ms' : b[0].startsWith('use') ? 'use' : 'default';
    // 比较顺序
    return order[aPrefix] - order[bPrefix];
  });

  return groupedCommitList.map(
    ([scope, component]) => [toComponentName(scope), component] as [string, typeof component],
  );
}

/**
 * 根据版本号查询到起始的 commit 和 结束的 commit
 * @param {string} from
 * @param {string} to
 * @returns
 */
async function findCommitByVersion(from: string, to: string) {
  const log = await git.log();
  // 查找升级前，提交信息的commit
  const formIndex = log.all.findIndex((commit) => commit.message === `chore(release): ${from}`);
  // 还要继续往上查一个版本
  const fromCommit = log.all
    .slice(formIndex + 1, log.all.length - 1)
    .find((commit) => commit.message.startsWith('chore(release):'));

  if (!fromCommit) {
    return Promise.reject(new Error(`没有找到升级前 "${from}" 的版本`));
  }

  // 查找升级后，提交信息的commit
  const toCommit = log.all.find((commit) => commit.message === `chore(release): ${to}`);

  if (!toCommit) {
    return Promise.reject(new Error(`没有找到升级前 "${to}" 的版本`));
  }

  return { fromCommit, toCommit };
}

/**
 * 根据时间区间查找到版本区间
 * @param {Dayjs} from
 * @param {Dayjs} to
 */
export async function findVersionRange(from: Dayjs, to: Dayjs) {
  const log = await git.log();
  const fromDate = dayjs(from).toISOString();
  const toDate = dayjs(to).toISOString();
  const commitList = log.all.filter((commit) => {
    if (commit.date >= fromDate && commit.date <= toDate) {
      if (commit.message.startsWith(`chore(release): `)) {
        return true;
      }
    }
    return false;
  });
  const versionList = commitList.map((item) => item.message.replace('chore(release): ', '')).sort();
  return [versionList[0], versionList[versionList.length - 1]];
}

const componentNameList = globSync('src/components/*/', {
  nodir: false,
  ignore: ['src/components/__deprecated__', 'src/components/NiceModal'],
}).map((fullPath) => path.basename(fullPath.trim()));

const fieldNameList = globSync('src/fields/*/', {
  nodir: false,
  ignore: ['src/fields/components', 'src/fields/enhanceField'],
}).map((fullPath) => path.basename(fullPath.trim()));

/**
 * 获取资源的类型
 * @param {string} name
 */
function getAtomType(name: string): string {
  const matchName = name.split('-').join('').toLocaleLowerCase();
  const componentList = [...componentNameList].map((item) => item.toLocaleLowerCase());
  const fieldList = [...fieldNameList].map((item) => item.toLocaleLowerCase());
  if (componentList.includes(matchName)) {
    return 'component';
  }
  if (fieldList.includes(matchName)) {
    return 'field';
  }

  return 'unknow';
}
