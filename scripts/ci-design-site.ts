import fs from 'fs-extra';
import path from 'path';

(async function () {
  console.log('正在移动设计资源...');
  const sourceDir = path.join(__dirname, '../design');
  const targetPath = path.join(__dirname, '../dist/design');
  // 移动目录
  await fs.move(sourceDir, targetPath, { overwrite: true });
  // 确保目录存在，不然在devops代码扫描中会报错
  await fs.ensureDir(targetPath);
  // 移动资源文件
  const files = await fs.readdir(targetPath);
  const dirs = files
    .filter((file) => file !== 'index.html')
    .map((file) => ({
      form: path.join(__dirname, '../dist/design', file),
      to: path.join(__dirname, '../dist', file),
    }));

  for (const dir of dirs) {
    await fs.move(dir.form, dir.to, { overwrite: true });
  }
  console.log('移动设计资源成功！');
})();
