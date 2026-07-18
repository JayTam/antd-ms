import { execSync } from 'child_process';
import { simpleGit, SimpleGit } from 'simple-git';
import { sync as globSync } from 'glob';
import path from 'path';
import fs from 'fs';

/** 离职人员不再统计 */
const RESIGNATION_PERSONNEL: string[] = ['yian.miu-n@msxf.com'];

/**
 * 获取目录下所有文件的贡献者，并按提交次数、新增/删除代码行数排序
 * @param {string} targetDir - 目标目录（如 `src/components`）
 * @returns {Array<{author: string, email: string, commits: number, insertions: number, deletions: number}>}
 */
async function getSortedContributors(targetDir: string) {
  const repoPath = path.join(__dirname, '../');
  const git: SimpleGit = simpleGit(repoPath);
  const contributorMap: {
    [email: string]: {
      author: string;
      email: string;
      commits: number;
      insertions: number;
      deletions: number;
    };
  } = {}; // { email: { author, commits, insertions, deletions } }

  // 1. 获取目标目录下所有文件
  const files = await git.raw(['ls-files', targetDir]);

  const codeFiles: string[] = files
    .split('\n')
    .filter(Boolean)
    .filter(
      (file) => file && !file.endsWith('.snap'), // 排除.snap文件
    );

  // 2. 遍历文件，统计每个作者的提交和代码变更
  for (const file of codeFiles) {
    // 使用 --numstat 获取增删行数
    const log: string = await git.raw([
      'log',
      '--pretty=format:%aE|%an', // 输出：author_email|author_name
      '--numstat',
      '--',
      file,
    ]);

    // 解析 --numstat 的输出格式：
    // 每段提交格式示例：
    // user@example.com|Author Name
    // 3       1       file.js
    // 0       0       file2.js
    const commits: string[] = log.split('\n\n');
    for (const commit of commits) {
      const [header, ...fileStats] = commit.split('\n');
      if (!header || fileStats.length === 0) continue;

      let [email, author] = header.split('|');

      // 离职人员不再统计
      if (RESIGNATION_PERSONNEL.includes(email)) {
        continue;
      }

      // 自动统计的缺陷，因为 fields 换过目录，git 统计失效，所以手动修正一下
      const components: string[] = [
        'MsUser',
        'MsUserGroup',
        'MsUserPopover',
        'MsPartUpload',
        'MsResourceGroup',
        'MsRichText',
        'MsCodeEditor',
        'MsDiffEditor',
      ];
      const componentName: string = getName(targetDir);
      if (components.includes(componentName)) {
        if (email === 'jie.tan@msxf.com') {
          email = 'xiaoli.liu01@msxf.com';
          author = 'xiaoli.liu01';
        }
      }

      if (!contributorMap[email]) {
        contributorMap[email] = { author, email, commits: 0, insertions: 0, deletions: 0 };
      }

      contributorMap[email].commits += 1;
      for (const statLine of fileStats) {
        const [insertions, deletions] = statLine.split('\t').map(Number);
        contributorMap[email].insertions += insertions || 0;
        contributorMap[email].deletions += deletions || 0;
      }
    }
  }

  // 3. 转换为数组并按提交次数降序排序
  return Object.values(contributorMap).sort((a, b) => b.commits - a.commits);
}

function getName(path: string): string {
  return path.split(/\/|\\/)[2];
}

(async function run() {
  console.log(
    '环境变量 GEN_CONTRIBUTORS：',
    process.env.GEN_CONTRIBUTORS,
    typeof process.env.GEN_CONTRIBUTORS,
  );
  console.log(
    '环境变量 GEN_CONTRIBUTORS_COMMIT：',
    process.env.GEN_CONTRIBUTORS_COMMIT,
    typeof process.env.GEN_CONTRIBUTORS_COMMIT,
  );
  if (process.env.GEN_CONTRIBUTORS === 'true') {
    let contributorsMap: {
      [componentName: string]: {
        author: string;
        email: string;
        commits: number;
        insertions: number;
        deletions: number;
      }[];
    } = {};

    const componentPathList: string[] = globSync('src/components/*/', {
      nodir: false,
      ignore: ['src/components/__deprecated__', 'src/components/NiceModal'],
    });

    for (const componentPath of componentPathList) {
      const componentName: string = getName(componentPath);
      const contributors: {
        author: string;
        email: string;
        commits: number;
        insertions: number;
        deletions: number;
      }[] = await getSortedContributors(componentPath);
      contributorsMap[componentName] = contributors;
      console.log(`读取 component ${componentName} 贡献：`, contributors);
    }

    const fieldPathList: string[] = globSync('src/fields/*/', {
      nodir: false,
      ignore: ['src/fields/components', 'src/fields/enhanceField'],
    });

    for (const fieldPath of fieldPathList) {
      const fieldName: string = getName(fieldPath);

      const contributors: {
        author: string;
        email: string;
        commits: number;
        insertions: number;
        deletions: number;
      }[] = await getSortedContributors(fieldPath);
      contributorsMap[fieldName] = contributors;
      console.log(`读取 field ${fieldName} 贡献：`, contributors);
    }

    fs.writeFileSync(
      path.join(__dirname, 'data', 'contributors.json'),
      JSON.stringify(contributorsMap, null, 2),
    );
    console.log(`contributors 数据生成完成！`);

    // 发布组件
    if (process.env.GEN_CONTRIBUTORS_COMMIT === 'true') {
      execSync('git add -A', { stdio: 'inherit' });
      execSync('git commit -m "chore(contributors): 更新贡献人数据" -n', { stdio: 'inherit' });
      execSync('git push', { stdio: 'inherit' });
    } else {
      console.log('跳过 contributors 数据提交');
    }
  } else {
    console.log('跳过生成 contributors 数据');
  }
})();
