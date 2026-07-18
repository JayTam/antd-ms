const { execSync } = require('child_process');
const dayjs = require('dayjs');
const packageObj = require('../package.json');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

/** 去掉前缀的分支名 */
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()
  .replace(/(dev-ms-|feature-ms-|feat-ms-|dev-|feature-|feat-)/, '');

/** 简版 commit hash */
const hash = execSync('git rev-parse HEAD', { cwd: __dirname }).toString().trim().slice(0, 6);

/** 日期 */
const timeDate = dayjs().format('YYYYMMDD');

/** 正式版本号 */
const releaseVersion = /(\d+\.\d+\.\d+)/.exec(packageObj.version)?.[0];

packageObj.version = `${releaseVersion}-${branchName}-${hash}-${timeDate}`;

console.log(chalk.blue(`\n发布版本号: ${packageObj.version}\n`));

console.log(chalk.blue(`开始发布组件库：\n`));

// 执行构建
execSync('npm run build', { stdio: 'inherit' });

// 修改版本号
fs.writeFileSync(
  path.join(__dirname, '../', 'package.json'),
  JSON.stringify(packageObj, null, 2) + '\n',
);

// 发布组件
execSync('npm publish --tag beta', { stdio: 'inherit' });

// 还原版本号
execSync('git reset --hard HEAD', { stdio: 'inherit' });

console.log(chalk.green(`\n组件库发布成功，版本号为：${packageObj.version}\n`));
