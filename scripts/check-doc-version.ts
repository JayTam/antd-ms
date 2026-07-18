import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { version } from '../package.json';
import { execSync } from 'child_process';
import * as semver from 'semver';

// 获取上一个版本号
function getPreviousVersion(): string {
  try {
    return execSync('git tag --sort=-creatordate | head -n 1').toString().trim();
  } catch (error) {
    console.error('Failed to get the previous version:', error);
    process.exit(1);
  }
}

// 获取从上一个版本到当前 commit 的所有提交的 .md 文件
function getChangedMdFiles(previousVersion: string): string[] {
  try {
    const output = execSync(`git diff --name-only ${previousVersion} HEAD`).toString().trim();
    return output.split('\n').filter((file) => file.endsWith('.md'));
  } catch (error) {
    console.error('Failed to get changed .md files:', error);
    process.exit(1);
  }
}

// 检查 .md 文件中的表格是否新增了行，并且这些行是否包含了下一个版本号标识
function checkMdFile(filePath: string, previousVersion: string): void {
  const output = execSync(`git diff ${previousVersion} HEAD -w --ignore-cr-at-eol -- ${filePath}`)
    .toString()
    .trim();
  const addTableLines = output
    .split('\n')
    .filter((line) => line.startsWith('+|'))
    .join('\n');
  if (addTableLines.length > 0) {
    console.log(filePath);
    console.log(chalk.green(addTableLines));
    console.log('\n');
  }
}

(function () {
  const previousVersion = getPreviousVersion();
  const changedMdFiles = getChangedMdFiles(previousVersion);
  const patchVersion = semver.inc(version, 'patch');
  const minorVersion = semver.inc(version, 'minor');

  console.log(
    chalk.blue(`
-----------------------------------------------------------
  检查组件文档中新增属性的版本号是否已更新为下个版本号：
  下个修订版本号：${patchVersion} （新增组件api，日常缺陷修复）
  下个次版本号：${minorVersion} （新增组件）
-----------------------------------------------------------
      `),
  );

  for (let filePath of changedMdFiles) {
    const fullPath = path.resolve(process.cwd(), filePath);
    checkMdFile(fullPath, previousVersion);
  }
})();
