import { ReactComponent as FileDocSvg } from '@jaytam/antd-ms/assets/images/upload/doc.svg';
// import { ReactComponent as FileVideoSvg } from '@jaytam/antd-ms/assets/images/upload/folder.svg';
import { VideoCameraTwoTone as FileVideoSvg } from '@ant-design/icons';
import { ReactComponent as FileGifSvg } from '@jaytam/antd-ms/assets/images/upload/gif.svg';
import { ReactComponent as FileOtherSvg } from '@jaytam/antd-ms/assets/images/upload/other.svg';
import { ReactComponent as FilePdfSvg } from '@jaytam/antd-ms/assets/images/upload/pdf.svg';
import { ReactComponent as FilePictureSvg } from '@jaytam/antd-ms/assets/images/upload/picture.svg';
import { ReactComponent as FilePptSvg } from '@jaytam/antd-ms/assets/images/upload/ppt.svg';
import { ReactComponent as FileSvgSvg } from '@jaytam/antd-ms/assets/images/upload/svg.svg';
import { ReactComponent as FileXlsxSvg } from '@jaytam/antd-ms/assets/images/upload/xlsx.svg';
import { ReactComponent as FileZipSvg } from '@jaytam/antd-ms/assets/images/upload/zip.svg';
import { MsSvg } from '@jaytam/icons';
import type { UploadFile } from 'antd';
import {
  FILE_DOC,
  FILE_EXCEL,
  FILE_GIF,
  FILE_PDF,
  FILE_PICTURE,
  FILE_PPT,
  FILE_SVG,
  FILE_VIDEO,
  FILE_ZIP,
} from '../contants';

export const iconRender = ({ file }: { file: UploadFile }) => {
  const fileName = file.name;
  const fileExtension = fileName?.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  // 视频
  if (FILE_VIDEO.includes(fileExtension)) return <MsSvg component={FileVideoSvg} />;
  // gif
  if (FILE_GIF.includes(fileExtension)) return <MsSvg component={FileGifSvg} />;
  // 图片
  if (FILE_PICTURE.includes(fileExtension)) return <MsSvg component={FilePictureSvg} />;
  // ppt文档
  if (FILE_PPT.includes(fileExtension)) return <MsSvg component={FilePptSvg} />;
  // excel文档
  if (FILE_EXCEL.includes(fileExtension)) return <MsSvg component={FileXlsxSvg} />;
  // svg
  if (FILE_SVG.includes(fileExtension)) return <MsSvg component={FileSvgSvg} />;
  // 压缩包
  if (FILE_ZIP.includes(fileExtension)) return <MsSvg component={FileZipSvg} />;
  // word文档
  if (FILE_DOC.includes(fileExtension)) return <MsSvg component={FileDocSvg} />;
  // pdf
  if (FILE_PDF.includes(fileExtension)) return <MsSvg component={FilePdfSvg} />;
  // 其他类型
  return <MsSvg component={FileOtherSvg} />;
};
