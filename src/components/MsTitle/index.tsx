import { Skeleton, Typography } from 'antd';
import cls from 'classnames';
import { isNil, isObject } from 'lodash-es';
import React, { useMemo } from 'react';

import MsActions from '../MsActions';

import './index.less';

import type { MsTitleProps } from './types';

const TITLE_TYPE = {
  common: '',
  gradient: 'ms-title-gradient',
  flag: 'ms-title-flag',
  block: 'ms-title-block',
};

const TITLE_SIZE = {
  small: 'ms-title-small',
  middle: 'ms-title-middle',
  large: 'ms-title-large',
  XLarge: 'ms-title-x-large',
};

const SKELETON_HEIGHT = {
  small: 18.84,
  middle: 22,
  large: 25.14,
  XLarge: 28.28,
};

const Title = Typography.Title;

function MsTitle(props: MsTitleProps) {
  const {
    title,
    titleType = 'common',
    titleSize: size = 'middle',
    extra,
    titlePrefix,
    titleSuffix,
    ignoreTitleReset,
    className,
    loading,
    style,
    children,
  } = props;

  const titleDom = title ?? children;

  const sizeClassName = TITLE_SIZE[size];

  const { containerClassName, titleClassName } = useMemo(() => {
    if (titleType === 'block') {
      return { containerClassName: TITLE_TYPE[titleType], titleClassName: '' };
    }
    return { containerClassName: '', titleClassName: TITLE_TYPE[titleType] };
  }, [titleType]);

  function extraRender() {
    if (isNil(extra)) return null;
    if (loading) {
      // display=flex 解决 titleType=block 未垂直居中问题
      return <Skeleton.Input active style={{ height: SKELETON_HEIGHT[size], display: 'flex' }} />;
    }

    if (React.isValidElement(extra)) {
      return <div className="ms-title-extra">{extra}</div>;
    }
    if (isObject(extra)) {
      return (
        <div className="ms-title-extra">
          <MsActions {...(extra as any)} />
        </div>
      );
    }
  }

  function titleRender() {
    if (isNil(titleDom)) return null;

    if (React.isValidElement(titleDom) && !ignoreTitleReset) {
      return titleDom;
    }

    return (
      <Title
        level={3}
        className={cls(['ms-title-text', titleClassName, sizeClassName])}
        ellipsis={{ tooltip: titleDom }}
      >
        {titleDom ?? children}
      </Title>
    );
  }

  if (isNil(titleDom) && isNil(extra) && isNil(titlePrefix) && isNil(titleSuffix)) return null;

  return (
    <>
      <div className={cls(['ms-title-container', containerClassName, className])} style={style}>
        <div className="ms-title">
          {/* display=flex 解决 titleType=block 未垂直居中问题 */}
          {loading ? (
            <Skeleton.Input active style={{ height: SKELETON_HEIGHT[size], display: 'flex' }} />
          ) : (
            <>
              {titlePrefix && <div className="ms-title-prefix">{titlePrefix}</div>}

              {titleRender()}

              {titleSuffix && <div className="ms-title-suffix">{titleSuffix}</div>}
            </>
          )}
        </div>
        {extraRender()}
      </div>
    </>
  );
}

export default MsTitle;
