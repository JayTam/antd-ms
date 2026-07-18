/**
 * llms 生成器，主要是提供给 CoditX 学习使用
 * 背景：CoditX 无法通过 web 文档的学习组件的演示案例，需要转换成 markdown 文件提供给 CoditX。
 * 目标：将组件中所有的演示案例（__demo__目录下），合并到组件的 markdown 文件中
 */
import path from 'path';
import fs from 'fs';
import { globSync } from 'glob';

/** 项目根路径 */
const RootDir = path.join(__dirname, '../');

/** 输出根路径 */
const OutputDir = path.join(__dirname, '../', 'llms');

/**
 * 解析 markdown 文件中引用了哪些代码文件，并将引用替换成代码片段
 * @param {string} componentDir  组件目录
 * @returns {string} markdown 字符串
 */
function parseMarkdownCodes(componentDir: string): string {
  const markdownFilePathList = globSync(`${componentDir}/*.md`);

  if (!markdownFilePathList.length) {
    throw new Error('组件文档不存在！');
  }

  return markdownFilePathList
    .map((markdownFilePath) => {
      const markdownFile = fs.readFileSync(markdownFilePath, 'utf-8');
      return markdownFile.replaceAll(/<code src="([^"]*)"><\/code>/g, (_, matchValue) =>
        toCodeBlock(path.join(componentDir, matchValue)),
      );
    })
    .reduce((prev, next) => prev + '\n' + next, '');
}

/**
 * 将要文件转换成 markdown 中的代码片段
 * @param {string} codePath 代码路径
 * @returns {string} 代码片段
 */
function toCodeBlock(codePath: string): string {
  const codeStr = fs.readFileSync(codePath, 'utf-8');
  return '``tsx\n' + codeStr + '```';
}

/**
 * 生成
 */
function generateComponentMarkdown() {
  const componentReadDir = path.join(RootDir, 'src/components');

  if (!fs.existsSync(OutputDir)) fs.mkdirSync(OutputDir);

  fs.readdirSync(componentReadDir)
    .filter((dir) => dir.startsWith('Ms'))
    .map((name) => [path.join(componentReadDir, name), path.join(OutputDir, name + '.md')])
    .forEach(([readDir, writePath]) => {
      try {
        const markdownString = parseMarkdownCodes(readDir);
        fs.writeFileSync(writePath, markdownString);
      } catch (error) {
        console.warn('警告：' + readDir + ' 组件中不存在 index.md，跳过解析该组件');
      }
    });
}

function generateFieldMarkdown() {
  const fieldDir = path.join(RootDir, 'src/fields');

  if (!fs.existsSync(OutputDir)) fs.mkdirSync(OutputDir);

  fs.readdirSync(fieldDir)
    .filter((dir) => {
      const firstChar = dir.charAt(0);
      return firstChar.toUpperCase() === firstChar;
    })
    .map((name) => [path.join(fieldDir, name), path.join(OutputDir, name + '.md')])
    .forEach(([readDir, writePath]) => {
      try {
        const markdownString = parseMarkdownCodes(readDir);

        fs.writeFileSync(writePath, markdownString);
      } catch (error) {
        console.warn('警告：' + readDir + ' 组件中不存在 index.md，跳过解析该组件');
      }
    });
}

(async function () {
  if (fs.existsSync(OutputDir)) {
    fs.rmSync(OutputDir, { recursive: true });
    console.warn('\n清空上次生成 markdown 所有文件\n');
  }
  generateComponentMarkdown();
  generateFieldMarkdown();
})();
