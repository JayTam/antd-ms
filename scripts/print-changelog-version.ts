import { findCommitList } from './utils/changelog';
import { version } from '../package.json';
import dayjs from 'dayjs';

/**
 * 直接打印 changelog
 */
async function printChangelog(fromVersion: string, toVersion: string = version): Promise<void> {
  const groupedCommitList = await findCommitList(fromVersion, toVersion);
  // 打印分组后的结果
  for (const [name, types] of groupedCommitList) {
    console.log(`## ${name}`);
    if (types.feat.length > 0) {
      console.log('### 功能特性:');
      types.feat.forEach((commit) => {
        console.log(`  - ${commit.message}  ${dayjs(commit.date).format('YYYY-MM-DD')}`);
      });
    }
    if (types.fix.length > 0) {
      console.log('### 缺陷修复:');
      types.fix.forEach((commit) => {
        console.log(`  - ${commit.message}  ${dayjs(commit.date).format('YYYY-MM-DD')}`);
      });
    }
    console.log(''); // 分隔不同scope的输出
  }
}

printChangelog('2.18.0');
