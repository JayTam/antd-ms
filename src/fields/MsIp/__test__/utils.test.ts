import {
  cidrPrefixToBinary,
  findClosest,
  generateIpCellRange,
  isNumberConsecutive,
  parseIpV4,
  stringifyIpV4,
  validIpForCidr,
} from '../utils';

describe('stringifyIpV4 函数测试', () => {
  test('正常四段 IP 带 CIDR', () => {
    expect(stringifyIpV4(['192', '168', '1', '1'], 24)).toBe('192.168.1.1/24');
  });

  test('输入不足四段自动补空', () => {
    expect(stringifyIpV4(['192', '168'], 24)).toBe('192.168../24');
  });

  test('无 CIDR 时只返回 IP', () => {
    expect(stringifyIpV4(['10', '0', '0', '1'])).toBe('10.0.0.1');
  });

  test('输入超过四段被截断', () => {
    expect(stringifyIpV4(['1', '2', '3', '4', '5'], 16)).toBe('1.2.3.4/16');
  });
});

describe('parseIpV4 函数测试', () => {
  test('解析带 CIDR 的标准 IP', () => {
    expect(parseIpV4('192.168.1.1/24')).toEqual([['192', '168', '1', '1'], 24]);
  });

  test('解析不带 CIDR 的 IP', () => {
    expect(parseIpV4('10.0.0.1')).toEqual([['10', '0', '0', '1'], undefined]);
  });

  test('空输入返回默认值', () => {
    expect(parseIpV4('')).toEqual([['', '', '', ''], undefined]);
  });

  test('不足四段补空字符串', () => {
    expect(parseIpV4('172.16/20')).toEqual([['172', '16', '', ''], 20]);
  });
});

describe('generateIpCellRange 函数测试', () => {
  test('全零二进制返回空数组', () => {
    expect(generateIpCellRange('00000000')).toEqual([]);
  });

  test('全1二进制返回单值', () => {
    expect(generateIpCellRange('11111111')).toEqual(
      Array(256)
        .fill(null)
        .map((_, index) => index),
    );
  });

  test('混合二进制生成正确范围', () => {
    expect(generateIpCellRange('11000000')).toEqual([0, 64, 128, 192]);
  });

  test('undefined 输入返回 undefined', () => {
    expect(generateIpCellRange(undefined)).toBeUndefined();
  });
});

describe('cidrPrefixToBinary 函数测试', () => {
  test('CIDR 24 返回正确掩码', () => {
    expect(cidrPrefixToBinary(24)).toEqual(['11111111', '11111111', '11111111', '00000000']);
  });

  test('CIDR 0 返回全零掩码', () => {
    expect(cidrPrefixToBinary(0)).toEqual(Array(4).fill('00000000'));
  });

  test('非法 CIDR 抛出错误', () => {
    expect(() => cidrPrefixToBinary(33)).toThrow();
    expect(() => cidrPrefixToBinary(-1)).toThrow();
  });
});

describe('isNumberConsecutive 函数测试', () => {
  test('空数组返回 true', () => {
    expect(isNumberConsecutive([])).toBe(true);
  });

  test('连续数组返回 true', () => {
    expect(isNumberConsecutive([5, 6, 7, 8])).toBe(true);
  });

  test('不连续数组返回 false', () => {
    expect(isNumberConsecutive([1, 3, 5])).toBe(false);
  });

  test('单个元素返回 true', () => {
    expect(isNumberConsecutive([100])).toBe(true);
  });
});

describe('findClosest 函数测试', () => {
  test('列表为空返回 0', () => {
    expect(findClosest(5, [])).toBe(0);
  });

  test('精确匹配返回原值', () => {
    expect(findClosest(50, [30, 50, 70])).toBe(50);
  });

  test('找到最近的大值', () => {
    expect(findClosest(55, [50, 60, 70])).toBe(60);
  });

  test('num 比所有值小返回首项', () => {
    expect(findClosest(10, [20, 30, 40])).toBe(20);
  });
});

describe('validIpForCidr 函数测试', () => {
  test('CIDR 24 调整最后一段', () => {
    expect(validIpForCidr('192.168.1.256', 24)).toBe('192.168.1.0/24');
  });

  test('CIDR 30 修正到合法范围', () => {
    expect(validIpForCidr('192.168.1.5', 30)).toBe('192.168.1.4/30');
  });

  test('非法 IP 段自动修正', () => {
    expect(validIpForCidr('300.400.500.600', 16)).toBe('255.255.0.0/16');
  });
});
