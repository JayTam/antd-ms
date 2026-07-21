/**
 * title: 基本使用
 * description: icon异常处理
 */
import { MsIconFont } from '@jaytam/antd-ms';

const Page = () => {
  return (
    <div>
      <MsIconFont
        style={{
          fontSize: 20,
          color: '#1890ff',
        }}
        type="icon-xuniwangguan"
      />
      <div>
        当图标生效时：compatibleType图标失效：
        <MsIconFont type="icon-yunjiankong1" compatibleType="icon-xuniwangguan" />
      </div>
      <div>
        当图标生效时：currentRender自定义内容失效：
        <MsIconFont type="icon-yunjiankong1" currentRender={<span>xx文本xx</span>} />
      </div>
      <div>
        当图标失效时：compatibleType图标生效：
        <MsIconFont type="icon-yunjiankong1222222" compatibleType="icon-xuniwangguan" />
      </div>
      <div>
        当图标失效时：currentRender自定义内容生效：
        <MsIconFont type="icon-yunjiankong1222222" currentRender={<span>xx文本xx</span>} />
      </div>
    </div>
  );
};

export default Page;
