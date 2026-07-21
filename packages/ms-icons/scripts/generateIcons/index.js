const fsPromises = require('fs-extra');
const path = require('path');
const { OutlinedString, FilledString, TwoToneString, ColorfulString } = require('./config');
const { template } = require('lodash');

/**
 * @typedef {('outlined'|'filled'|'twoTone'|'color')} RenderType
 */

/**
 * Base function that processes the given type and renders accordingly.
 *
 * @param {RenderType} type - The type of rendering style ('outlined' or 'filled'...).
 * @param {function} render - The rendering function to be executed.
 */
const base = async (type, render) => {
  // 目录路径
  const directoryPath = `./src/svgs/${type}`;
  // 文件生成路径
  const comPath = `./src/icons/${type}`;
  // outlined 首字符大写
  const upperType = type.charAt(0).toUpperCase() + type.slice(1);

  // 读取目录内容
  const files = await fsPromises.readdir(path.resolve(comPath));

  // 遍历读取的文件列表
  for (const file of files) {
    // 拼接完整的文件路径
    const filePath = path.join(path.resolve(comPath), file);
    // 删除每个文件
    await fsPromises.unlink(filePath);
    console.log(`已删除文件: ${filePath}`);
  }

  try {
    // 初始化 index 文件
    await fsPromises.writeFile(`${comPath}/index.ts`, '');
    console.log('Initialized index file.');

    // 遍历目录中的所有文件
    const files = await fsPromises.readdir(directoryPath);
    for (const file of files) {
      // 获取文件名（不包括扩展名）
      const fileNameWithoutExtension = path.parse(file).name;
      const comName = `Ms${fileNameWithoutExtension}${upperType}`;

      // if (!allIconsTexts.find((name) => comName.includes(name))) {
      //   console.warn(`Ms${fileNameWithoutExtension}${upperType}未注册`);
      // }
      // 渲染模板
      const result = render({ svgIdentifier: fileNameWithoutExtension });

      // 写入文件
      await fsPromises.writeFile(`${comPath}/${comName}.tsx`, result);
      console.log(`Generated file: ${comName}.tsx`);

      // 更新 index 文件
      await fsPromises.appendFile(
        `${comPath}/index.ts`,
        `export { default as ${comName} } from './${comName}';\n`,
      );
    }
  } catch (err) {
    console.error('Error processing files:', err);
  }
};

const outLinedBash = async () => {
  // 创建 lodash 模板
  const render = template(OutlinedString);
  await base('outlined', render);
};

const filledBash = async () => {
  const render = template(FilledString);
  await base('filled', render);
};

const twoToneBash = async () => {
  const render = template(TwoToneString);
  await base('twoTone', render);
};

const ColorfulBash = async () => {
  const render = template(ColorfulString);
  await base('colorful', render);
};

(async () => {
  await filledBash();
  await outLinedBash();
  await twoToneBash();
  await ColorfulBash();
})();
