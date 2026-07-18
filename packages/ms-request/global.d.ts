declare interface Window {
  __POWERED_BY_QIANKUN__: any;
  verifyKey: string;
  verifyHmac: string;
  verifyVersion: string;
  verifyMethod: string;
  /**预留 · 马上云权限CODE */
  MSCLOUD_AUTH_CODES?: number[];
  /**预留 · 马上云实名认证CODE */
  MSCLOUD_REAL_NAME_CODES?: number[];
  /**预留 · 马上云角色授权CODE */
  ROLE_AUTHORIZATION?: number[];
}
