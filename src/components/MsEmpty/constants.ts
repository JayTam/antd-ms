import add from '@jaytam/antd-ms/assets/images/add.svg';
import auth from '@jaytam/antd-ms/assets/images/auth.svg';
import _default from '@jaytam/antd-ms/assets/images/default.svg';
import empty from '@jaytam/antd-ms/assets/images/empty.svg';
import search from '@jaytam/antd-ms/assets/images/search.svg';
import select from '@jaytam/antd-ms/assets/images/select.svg';
import type { ImagesListType } from './types';

const imgSize = {
  large: {
    width: 180,
    height: 160,
  },
  middle: {
    width: 120,
    height: 106,
  },
  small: {
    width: 90,
    height: 80,
  },
};

export const IMAGE_LIST: ImagesListType = {
  default: {
    src: _default,
    imgSize: {
      large: {
        width: 24,
        height: 24,
      },
      middle: {
        width: 24,
        height: 24,
      },
      small: {
        width: 24,
        height: 24,
      },
    },
  },
  add: {
    src: add,
    imgSize,
  },
  auth: {
    src: auth,
    imgSize,
  },
  empty: {
    src: empty,
    imgSize,
  },
  search: {
    src: search,
    imgSize,
  },
  select: {
    src: select,
    imgSize,
  },
};
