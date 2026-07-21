import axios from 'axios';
import chalk from 'chalk';
import semver from 'semver';
import { version } from '../package.json';
import { generateRobotData } from './utils/changelog';

const test = 'https://example.com/webhook/test';

const prod = 'https://example.com/webhook/prod';

const webhook = process.env.NOTIFY_DEBUG ? test : prod;

(async function run() {
  if (semver.prerelease(version)) {
    if (!process.env.NOTIFY_DEBUG) {
      throw new Error(`${version} 不是正式版本号，不能发送飞书通知`);
    }
  }
  const list = await generateRobotData(version, version);

  try {
    await axios(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // 发送消息的类型。消息卡片的类型值为：interactive
        msg_type: 'interactive',
        // 卡片模板数据序列化后的字符串
        card: {
          type: 'template',
          data: {
            template_id: 'AAqjxhIXxxXI1',
            template_version_name: '1.0.14',
            template_variable: {
              version: version,
              component_list: list,
            },
          },
        },
      },
    });
    console.log(chalk.green('\n\n飞书机器人消息发送成功\n\n'));
  } catch (error) {
    console.error(error);
  }
})();
