/**
 * title: iconfont
 * description: 自定义引入iconfont资源文件
 */
import { MsConfigProvider } from '@jaytam/antd-ms';
// @ts-ignore
import * as iconfont from '../../../assets/iconfontDevops.js';

const App = () => {
  return (
    <MsConfigProvider iconScriptUrl={[iconfont]}>
      <></>
    </MsConfigProvider>
  );
};

export default App;
