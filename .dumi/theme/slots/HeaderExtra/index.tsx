import { type FC } from 'react';
import { useLocale } from '../../context/locale';
import { Tooltip } from 'antd';

const HeaderExtra: FC = () => {
  const { locale, toggleLocale } = useLocale();

  return (
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
  );
};

export default HeaderExtra;
