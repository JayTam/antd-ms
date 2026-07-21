import { isValueEmpty } from '@jaytam/antd-ms/utils';
import { Button, Empty } from 'antd';
import { IMAGE_LIST } from './constants';
import './index.less';
import type { ImageInfo, ImageKey, MsEmptyProps } from './types';
import { useLocale } from '@jaytam/antd-ms/locale';
const MsEmpty = (props: MsEmptyProps) => {
  const { currentLocale } = useLocale('MsEmpty');
  const {
    size = 'middle',
    image = 'default',
    title = '',
    description = currentLocale.empty,
    imageStyle = {},
    linkButtonProps,
    cancelButtonProps,
    okButtonProps,
    linkText,
    cancelText,
    okText,
    onLink,
    onCancel,
    onOk,
    className,
    ...resetProps
  } = props;

  let imgInfo: ImageInfo | undefined;

  if (typeof image === 'string' && Object.keys(IMAGE_LIST).includes(image)) {
    imgInfo = IMAGE_LIST[image as ImageKey];
  }

  return (
    <Empty
      {...resetProps}
      className={['ms-empty', className].join(' ')}
      image={imgInfo?.src || image}
      imageStyle={isValueEmpty(imageStyle) ? imgInfo?.imgSize[size] : imageStyle}
      description=""
    >
      {title && <div className="ms-empty-title">{title}</div>}
      {description && <div className="ms-empty-desc">{description}</div>}
      {linkText?.trim() && (
        <Button onClick={onLink} type="link" size="small" {...linkButtonProps}>
          {linkText}
        </Button>
      )}
      {(cancelText?.trim() || okText?.trim()) && (
        <div className="ms-empty-btn">
          {cancelText && (
            <Button onClick={onCancel} size="small" {...cancelButtonProps}>
              {cancelText}
            </Button>
          )}
          {okText && (
            <Button onClick={onOk} type="primary" size="small" {...okButtonProps}>
              {okText}
            </Button>
          )}
        </div>
      )}
    </Empty>
  );
};

export default MsEmpty;
