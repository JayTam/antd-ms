//生成验证码
export const getRandomCode = () => {
  let code = '';
  const len = 6;
  const chars = 'abcdefhijkmnprstwxyz12345678';
  const maxPos = chars.length;

  for (let i = 0; i < len; i++) {
    code += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return code;
};
