import { isNil } from 'lodash-es';

/**
 * 将结构化的 ip,cidrPrefix 序列化成字符串
 * @param list
 * @param cidrPrefix
 * @returns
 */
export function stringifyIpV4(list: string[], cidrPrefix?: number) {
  list.length = 4;
  const ipStr = list.join('.');

  if (Number.isInteger(cidrPrefix)) {
    return ipStr + '/' + cidrPrefix;
  }

  return ipStr;
}

/**
 * 解析成结构化的 ip 和 cidrPrefix
 * @param value
 * @returns
 */
export function parseIpV4(value?: string): [string[], number | undefined] {
  if (!value) {
    return [['', '', '', ''], undefined];
  }
  const token = value.split('/');
  const ipList = token[0].split('.');
  const cidrPrefix = token[1] ? parseInt(token[1]) : undefined;
  while (ipList.length < 4) {
    ipList.push('');
  }

  while (ipList.length > 4) {
    ipList.pop();
  }

  return [ipList, cidrPrefix];
}

/**
 * 生成 ip cell 合法范围
 * @param ipCellBinary 子网掩码的二进制值
 * @returns
 */
export function generateIpCellRange(ipCellBinary?: string) {
  if (typeof ipCellBinary === 'undefined') {
    return undefined;
  }

  if (ipCellBinary === '00000000') {
    return [];
  }

  // 确定前缀中的连续'1'的数量
  let k = 0;
  while (k < ipCellBinary.length && ipCellBinary[k] === '1') {
    k++;
  }

  // 提取固定部分，从第一个非'1'的位置开始到最后
  const fixedPart = ipCellBinary.slice(k);

  // 变化位数，这里是前k位
  const m = k;

  // 生成所有可能的组合
  const combinations = [];
  for (let i = 0; i < Math.pow(2, m); i++) {
    // 将当前组合转换为二进制字符串并填充至m位
    const suffix = i.toString(2).padStart(m, '0');
    // 组合前缀和后缀
    const value = suffix + fixedPart;
    combinations.push(value);
  }

  return combinations.map((item) => parseInt(item, 2));
}

/**
 * cidr 前缀转换成二进制掩码
 * @param cidrPrefix cidr 前缀
 * @returns
 */
export function cidrPrefixToBinary(cidrPrefix?: number) {
  if (typeof cidrPrefix === 'undefined') {
    return [];
  }

  // 输入验证
  if (typeof cidrPrefix !== 'number' || cidrPrefix < 0 || cidrPrefix > 32) {
    throw new Error('CIDR prefix must be an integer between 0 and 32');
  }

  // 生成32位的二进制掩码
  const mask = '1'.repeat(cidrPrefix) + '0'.repeat(32 - cidrPrefix);

  // 将32位的二进制掩码按8位一组进行分割
  const binarySegments = [];
  for (let i = 0; i < 4; i++) {
    const start = i * 8;
    const end = start + 8;
    binarySegments.push(mask.substring(start, end));
  }

  return binarySegments;
}

/**
 * 判断是否数字连续
 * @param list
 * @returns
 */
export function isNumberConsecutive(list: number[]) {
  // 如果数组为空或只有一个元素，则认为它是“连续”的
  if (list.length <= 1) return true;

  // 检查每对相邻元素
  for (let i = 0; i < list.length - 1; i++) {
    // 如果发现任意一对相邻元素的差不是1，则返回false
    if (list[i + 1] - list[i] !== 1) {
      return false;
    }
  }

  // 如果循环结束没有发现不连续的情况，则返回true
  return true;
}

/**
 * 在 list 中找到 num 最相近的值
 * @param num
 * @param list
 * @returns
 */
export function findClosest(num?: number, list?: readonly number[]) {
  if (typeof num === 'undefined' || typeof list === 'undefined') return 0;
  // 首先检查列表是否为空
  if (list.length === 0) return 0;

  // 对数组进行排序
  const numList = [...list].sort((a, b) => a - b);

  // 查找 num 是否存在于数组中
  const index = numList.indexOf(num);

  // 如果找到了 num，直接返回
  if (index !== -1) {
    return num;
  } else {
    // 如果没有找到，查找最接近的数
    for (let i = 0; i < numList.length; i++) {
      // 当前数小于 num，下一个数大于 num，说明找到了最近的两个数
      if (numList[i] < num && numList[i + 1] > num) {
        // 比较哪个更接近 num
        return num - numList[i] < numList[i + 1] - num ? numList[i] : numList[i + 1];
      }
    }

    // 如果 num 比所有元素都小或大，则返回第一个或最后一个元素
    return num < numList[0] ? numList[0] : numList[numList.length - 1];
  }
}

/**
 * 根据 cidr 重新计算 ip 的合法值
 * @param ip
 * @param cidr
 * @returns
 */
export function validIpForCidr(ip: string, cidr: number) {
  const rangeList = cidrPrefixToBinary(cidr).map((ipBinary) => generateIpCellRange(ipBinary));
  const [ipList] = parseIpV4(ip);
  const formatIpList = ipList
    .map((ip, index) => {
      const ipNumber = Number.isNaN(parseInt(ip)) ? 0 : parseInt(ip);
      const currentRange = rangeList[index];
      if (typeof currentRange === 'undefined') {
        return 0;
      } else {
        return findClosest(ipNumber, currentRange);
      }
    })
    .map((ip) => ip.toString());
  return stringifyIpV4(formatIpList, cidr);
}

/**
 * 美化合法范围提示
 * @param list
 */
export function prettifyValidRangeTips(list?: readonly number[]) {
  if (isNil(list) || list.length < 1) return;
  // 直接展示
  if (list.length <= 6) return list.join(', ');

  const prefix = [...list].splice(0, 4).join(', ');
  const suffix = [...list].splice(list.length - 2, list.length).join(', ');

  return prefix + ' ...... ' + suffix;
}
