const { simpleGit } = require('simple-git');

const git = simpleGit();

export async function getComponentContriners(componentPath: string) {
  // 获取所有提交的作者名
  return new Promise((resolve, reject) => {
    git.log(
      {
        '--pretty=format:%an': '',
        '--': componentPath,
      },
      (err, log) => {
        if (err) {
          console.error('Error:', err);
          return;
        }

        // 统计每个作者的提交次数
        const authorCounts = log.all.reduce((acc, commit) => {
          const author = commit.author_name;
          acc[author] = (acc[author] || 0) + 1;
          return acc;
        }, {});

        console.log('修改人统计:');
        Object.entries(authorCounts).forEach(([author, count]) => {
          console.log(`${author}: ${count} 次`);
        });
      },
    );
  });
}
