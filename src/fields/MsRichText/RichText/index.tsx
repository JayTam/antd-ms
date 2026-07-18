import type { IDomEditor } from '@wangeditor/editor';
import { Boot } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';

import { useControllableValue, useMount } from 'ahooks';
import cs from 'classnames';
import { isNil, map, merge, omit } from 'lodash-es';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ImageElement, RichTextProps } from '../types';
import { cancelMenu, editMenu } from '../utils/customActionMenu';
import { fullScreen, reduceScreen } from '../utils/customScreenMenu';
import { showToolbarMenu } from '../utils/showMenuByEditor';
import './index.less';

import '@wangeditor/editor/dist/css/style.css';
import { ConfigProvider, Form } from 'antd';
import { useLocale } from '@jaytam/antd-ms/locale';

const RichText = React.forwardRef<HTMLInputElement, RichTextProps>((props, ref) => {
  const {
    style,
    className,
    readOnly,
    placeholder,
    minHeight,
    toolbarMode = 'default',
    toolbarConfig: _toolbarConfig,
    toolbarStyle,
    toolbar = true,
    editorMode = 'default',
    editorConfig: _editorConfig,
    editorStyle,
    imageServer,
    editorChange,
    showEditMenu = true,
    showCancelMenu = true,
    onCreated,
  } = props ?? {};

  const editorRef = useRef<IDomEditor | null>(null);
  const { currentLocale, fullLocale } = useLocale('MsRichText');

  const richTextRef = useRef<HTMLDivElement>(null);

  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器是否为聚焦状态
  const [isFocus, setIsFocus] = useState(false);

  // 当前是否为全屏
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 当前组件的校验状态
  const { status } = Form.Item.useStatus();

  // 是否第一次执行onChange事件
  const firstChange = useRef<boolean>(true);

  // 如果value未传值（undefined）,会覆盖掉defaultValue的值，所以剔除掉。
  const _props = isNil(props?.value) && firstChange?.current ? omit(props, 'value') : props;

  const [value, setValue] = useControllableValue(_props);

  const context = useContext(ConfigProvider.ConfigContext);
  const prefixCls = context.getPrefixCls();

  // 注册自定义菜单,必须在创建编辑器之前注册，全局只能注册一次，不要重复注册
  useEffect(() => {
    try {
      Boot.registerMenu({
        // 定义 menu key ：要保证唯一、不重复
        key: 'ms-full-screen', // 全屏按钮
        factory: () => fullScreen({ locale: fullLocale }),
      });
      Boot.registerMenu({
        key: 'ms-reduce-screen', // 缩屏按钮
        factory: () => reduceScreen({ locale: fullLocale }),
      });
      Boot.registerMenu({
        key: 'ms-edit', // 编辑按钮
        factory: () => editMenu({ editText: props?.editText, locale: fullLocale }),
      });
      Boot.registerMenu({
        key: 'ms-cancel', // 取消按钮
        factory: () =>
          cancelMenu({
            cancelText: props?.cancelText,
            onCancel: props?.onCancel,
            locale: fullLocale,
          }),
      });
    } catch (e) {}

    // 销毁时，编辑器destroy
    return () => {
      editorRef?.current?.destroy?.();
      editorRef.current = null;
    };
  }, []);

  // 自定义校验图片
  const customCheckImageFn = (src: string) => {
    if (!src) {
      return;
    }
    if (src?.indexOf('http') !== 0) {
      return currentLocale.protoTip;
    }
    return true;
  };

  // 转换图片链接
  const customParseImageSrc = (src: string) => {
    if (src?.indexOf('http') !== 0) {
      return `http://${src}`;
    }
    return src;
  };

  useEffect(() => {
    // 监听全屏的改变的方法
    const fullScreenChange = () => {
      // editor存在，并且不是全屏状态时，显示菜单全屏，隐藏缩屏
      if (editor && !document.fullscreenElement) {
        showToolbarMenu(editor, 'ms-full-screen', true);
        showToolbarMenu(editor, 'ms-reduce-screen', false);
        richTextRef?.current?.getElementsByClassName('ms-rich-toolbar')[0]?.getBoundingClientRect();
      }
      setIsFullScreen(document.fullscreenElement ? true : false);
    };
    if (editor) {
      // 关闭缩屏菜单
      showToolbarMenu(editor, 'ms-reduce-screen', false);

      document.addEventListener('fullscreenchange', fullScreenChange);
    }

    return () => {
      document.removeEventListener('fullscreenchange', fullScreenChange);
    };
  }, [editor]);

  useEffect(() => {
    if (!editorRef?.current) return;

    if (isNil(readOnly)) {
      showToolbarMenu(editorRef.current, 'ms-edit', false);
      showToolbarMenu(editorRef.current, 'ms-cancel', true);
      return;
    }

    if (readOnly) {
      editorRef.current?.disable();
    } else {
      editorRef.current?.enable();
    }
  }, [editor, readOnly]);

  useMount(() => {
    if (readOnly) {
      firstChange.current = false;
    }
  });

  // 计算编辑器区域在全屏时的高度，撑满整个页面
  const editorHeight = useMemo(() => {
    if (isFullScreen) {
      // 整个富文本的高度(页面的高度)
      const richTextHeight = window.innerHeight;
      // 工具栏的高度
      const toolbarHeight =
        richTextRef.current?.getElementsByClassName('ms-rich-toolbar')[0]?.getBoundingClientRect()
          ?.height || 0;

      return richTextHeight - 2 - toolbarHeight;
    }

    return editorStyle?.height || '300px';
  }, [isFullScreen, editorStyle?.height]);

  // 编辑器获得焦点的方法
  const onFocus = (editor: IDomEditor) => {
    setIsFocus(true);
    _editorConfig?.onFocus?.(editor);
  };

  // 编辑器失去焦点的方法
  const onBlur = (editor: IDomEditor) => {
    setIsFocus(false);
    _editorConfig?.onBlur?.(editor);
  };

  // 定义编辑器的配置
  const getEditorConfig = () => {
    const menuConfig = {
      // 编辑图片
      editImage: {
        onUpdatedImage(imageNode: ImageElement | null) {
          if (imageNode == null) return;
        },
        checkImage: customCheckImageFn,
        parseImageSrc: customParseImageSrc,
      },
      // 上传图片
      uploadImage: {
        fieldName: 'file',
        // 单个文件的最大体积限制，默认为 5M
        maxFileSize: 5 * 1024 * 1024,
        // 最多可上传10个文件
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/*'],
        withCredentials: true,
        timeout: 5 * 1000,
        server: imageServer,
      },
    };
    return {
      readOnly,
      // 只读时不显示placeholder
      placeholder: readOnly ? undefined : placeholder,
      MENU_CONF: merge(menuConfig, _editorConfig?.MENU_CONF),
      // @ts-ignore
      autoFocus: false,
      ...omit(_editorConfig, 'MENU_CONF', 'readOnly'),
      onFocus,
      onBlur,
    };
  };

  // 格式化注册新菜单
  const checkInsertKeys = (keys: object) => {
    return map(keys, (val, key) => val && key).filter((item) => !!item);
  };

  // 输出工具栏
  const getToolbar = () => {
    if (!toolbar) {
      return null;
    }

    const insertKeys = {
      index: 30,
      keys: checkInsertKeys({
        // 编辑按钮，显示按钮 & 编辑状态 & 没有传入的禁用状态
        'ms-edit': showEditMenu && isNil(readOnly),
        'ms-cancel': showCancelMenu && isNil(readOnly),
        'ms-reduce-screen': true,
        'ms-full-screen': true,
      }),
    };
    return (
      <Toolbar
        defaultConfig={{
          // 默认排除视频和全屏菜单组
          excludeKeys: ['group-video', 'fullScreen'],
          insertKeys: insertKeys,
          ..._toolbarConfig,
        }}
        editor={editorRef?.current}
        mode={toolbarMode}
        className="ms-rich-toolbar"
        style={{ borderBottom: '1px solid #ccc', ...toolbarStyle }}
      />
    );
  };

  // onChange事件
  const handleChange = (e: IDomEditor) => {
    // 方便必填校验做以下处理
    // 如果编辑器有值，才更新value
    if (e?.isEmpty() === false) {
      setValue(e.getHtml());
    } else if (!firstChange.current) {
      setValue(undefined);
    }
    firstChange.current = false;

    editorChange?.(e);
  };

  // 创建编辑器事件
  const handleCreated = (e: IDomEditor) => {
    editorRef.current = e;
    setEditor(e);
    onCreated?.(e);
  };

  // 在编辑器挂载后设置容器tabindex并处理焦点
  useEffect(() => {
    const containerRef = richTextRef.current;
    // 只读时，无需聚焦，不然会影响到编辑器内表格样式
    if (containerRef && !readOnly) {
      // 设置容器可聚焦
      containerRef.tabIndex = 0;

      // 监听容器获得焦点事件
      const handleFocus = () => {
        if (editor) {
          // 将焦点移动到编辑器内部
          editor.focus();

          // 如果编辑器内容为空，可以将光标移动到开头
          if (editor.isEmpty()) {
            editor.move(0);
          }
        }
      };

      containerRef.addEventListener('focus', handleFocus);

      // 清理函数：移除事件监听
      return () => {
        containerRef?.removeEventListener('focus', handleFocus);
      };
    }
  }, [editor, readOnly]);

  return (
    <>
      <div
        ref={richTextRef}
        id={props.id}
        style={{ border: readOnly ? '1px solid #d9d9d9' : undefined, ...style }}
        className={cs([
          'ms-rich-text',
          readOnly ? undefined : prefixCls + '-input-affix-wrapper',
          isFocus && !readOnly ? prefixCls + '-input-affix-wrapper-focused' : undefined,
          status === 'error' ? prefixCls + '-input-affix-wrapper-status-error' : undefined,
          className,
        ])}
      >
        {getToolbar()}
        <Editor
          defaultConfig={getEditorConfig()}
          // 只读模式下，如果value为'',null, undefined不会清空编辑器内容，所有这里手动设置为<p><br/></p>清空编辑器内容
          value={readOnly ? value || '<p><br/></p>' : value}
          onCreated={handleCreated}
          onChange={handleChange}
          mode={editorMode}
          className="ms-rich-editor"
          style={{
            minHeight,
            ...editorStyle,
            height: editorHeight,
          }}
        />
      </div>
    </>
  );
});

export default RichText;
