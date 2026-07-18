import { type FC } from 'react';
import packageInfo from '../../../../package.json';
import { useLocale } from '../../context/locale';
import { Tooltip } from 'antd';

const { version } = packageInfo;

const HeaderExtra: FC = () => {
  const { locale, toggleLocale } = useLocale();

  return (
    <>
      <Tooltip
        title={`切换组件国际化为${locale === 'zh' ? 'English' : '中文'}`}
        getPopupContainer={(e) => e?.parentElement || document.body}
        placement="bottom"
      >
        <div
          style={{
            borderInlineStart: '1px solid #d0d5d8',
            marginInlineStart: 15,
            width: 46,
            fontSize: 14,
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={toggleLocale}
        >
          {locale === 'zh' ? '中文' : 'EN'}
        </div>
      </Tooltip>

      <div
        className="dumi-default-lang-select"
        style={{
          borderInlineStart: '1px solid #d0d5d8',
        }}
      >
        <select
          style={{ paddingTop: 1, paddingBottom: 1 }}
          value={version}
          onChange={(e) => {
            if (e.target.value !== version) {
              window.open('http://ui-next.msxf.msxfyun.test/', '_blank');
            }
          }}
        >
          <option value={version}>{version}</option>
          <option value="next">next</option>
        </select>
      </div>
    </>
  );
};

export default HeaderExtra;
