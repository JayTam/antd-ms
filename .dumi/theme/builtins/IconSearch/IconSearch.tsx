import type { CSSProperties } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import Icon from '@ant-design/icons';
import * as MsIcons from '@jaytam/icons';
import { Affix, Empty, Input, Segmented } from 'antd';
import Category from './Category';
import type { CategoriesKeys } from './fields';
import './style.less';
import { categories, categoriesEnum } from './fields';
import { FilledIcon, OutlinedIcon, TwoToneIcon, ColorfulIcon } from './themeIcons';
import { useDebounceFn } from 'ahooks';

export enum ThemeType {
  Filled = 'Filled',
  Outlined = 'Outlined',
  TwoTone = 'TwoTone',
  Colorful = 'Colorful',
}

export const allIcons: { [key: string]: any } = { ...MsIcons };

const options = [
  {
    value: ThemeType.Outlined,
    icon: <Icon component={OutlinedIcon} />,
    label: '线框风格',
  },
  {
    value: ThemeType.Filled,
    icon: <Icon component={FilledIcon} />,
    label: '实底风格',
  },
  {
    value: ThemeType.TwoTone,
    icon: <Icon component={TwoToneIcon} />,
    label: '双色风格',
  },
  {
    value: ThemeType.Colorful,
    icon: <Icon component={ColorfulIcon} />,
    label: '彩绘风格',
  },
];

interface IconSearchState {
  theme: ThemeType;
  searchKey: string;
}

const IconSearch: React.FC = () => {
  const [displayState, setDisplayState] = useState<IconSearchState>({
    searchKey: '',
    theme: ThemeType.Outlined,
  });
  const newIconNames: string[] = [];

  // 回到顶部
  const autoTop = useCallback(() => {
    // 如果滚动条距离顶部大于500px，则滚动到距离顶部50px的位置
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollPosition > 500) {
      window.scrollTo({
        top: 440,
        behavior: 'smooth', // 平滑滚动
      });
    }
  }, []);

  // 搜索
  const { run: handleSearchIcon } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayState((prevState) => ({ ...prevState, searchKey: e.target.value }));
      autoTop();
    },
    { wait: 300 },
  );

  // 切换风格
  const handleChangeTheme = useCallback((value: any) => {
    setDisplayState((prevState) => ({ ...prevState, theme: value as ThemeType }));
    autoTop();
  }, []);

  const renderCategories = useMemo<React.ReactNode | React.ReactNode[]>(() => {
    const { searchKey = '', theme } = displayState;

    const categoriesResult = Object.keys(categories)
      .map((key) => {
        let iconList = categories[key as CategoriesKeys];
        if (searchKey) {
          const matchKey = searchKey
            // eslint-disable-next-line prefer-regex-literals
            .replace(/^<([a-z]*)\s\/>$/gi, (_, name) => name)
            .replace(/(Outlined|Filled|TwoTone|Colorful)$/, '')
            .toLowerCase();
          iconList = iconList.filter((iconName) => iconName.toLowerCase().includes(matchKey));
        }
        return {
          category: key,
          icons: iconList
            .map((iconName) => iconName + theme)
            .filter((iconName) => allIcons[iconName]),
        };
      })
      .filter(({ icons }) => !!icons.length)
      .map(({ category, icons }) => (
        <Category
          key={category}
          title={categoriesEnum[category as CategoriesKeys]}
          theme={theme}
          icons={icons}
          newIcons={newIconNames}
        />
      ));
    return categoriesResult.length ? (
      categoriesResult
    ) : (
      <Empty style={{ marginTop: 50 }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    );
  }, [displayState.searchKey, displayState.theme]);

  const [searchBarAffixed, setSearchBarAffixed] = useState<boolean | undefined>(false);

  const affixedStyle: CSSProperties = {
    padding: 8,
    marginTop: 4,
    borderRadius: 6,
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  };

  return (
    <div className="markdown">
      <Affix offsetTop={90} onChange={setSearchBarAffixed}>
        <div className="iconSearchAffix" style={searchBarAffixed ? affixedStyle : {}}>
          <Segmented
            size="large"
            value={displayState.theme}
            options={options}
            onChange={handleChangeTheme}
          />
          <Input.Search
            placeholder="在此搜索图标,点击图标可复制代码"
            style={{ flex: 1, marginInlineStart: 16 }}
            allowClear
            autoFocus
            size="large"
            onChange={handleSearchIcon}
          />
        </div>
      </Affix>
      {renderCategories}
    </div>
  );
};

export default IconSearch;
