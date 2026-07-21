import { isNil } from 'lodash-es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useMemo, useRef } from 'react';
import type { MonacoEditorProps } from './types';
import { noop, processSize } from './utils';

const MonacoEditor = React.forwardRef<HTMLInputElement, MonacoEditorProps>((props, ref) => {
  const {
    width = '100%',
    height = '100%',
    value = null,
    defaultValue = '',
    language = 'javascript',
    theme = 'vs-dark',
    options = {},
    overrideServices = {},
    editorWillMount = noop,
    editorDidMount = noop,
    editorWillUnmount = noop,
    onChange = noop,
    className = null,
  } = props;

  const containerElement = useRef<HTMLDivElement | null>(null);

  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const _subscription = useRef<monaco.IDisposable | null>(null);

  const __prevent_trigger_change_event = useRef<boolean | null>(null);

  const fixedWidth = processSize(width);

  const fixedHeight = processSize(height);

  const style = useMemo(
    () => ({
      width: fixedWidth,
      height: fixedHeight,
    }),
    [fixedWidth, fixedHeight],
  );

  const handleEditorWillMount = () => {
    const finalOptions = editorWillMount(monaco);
    return finalOptions || {};
  };

  const handleEditorDidMount = () => {
    editorDidMount(editor.current!, monaco);

    _subscription.current = editor.current!.onDidChangeModelContent((event) => {
      if (!__prevent_trigger_change_event.current) {
        onChange(editor.current!.getValue(), event);
      }
    });
  };

  const handleEditorWillUnmount = () => {
    editorWillUnmount(editor.current!, monaco);
  };

  const initMonaco = () => {
    const finalValue = isNil(value) ? defaultValue : value;

    if (containerElement.current) {
      // Before initializing monaco editor
      const finalOptions = { ...options, ...handleEditorWillMount() };
      editor.current = monaco.editor.create(
        containerElement.current,
        {
          value: finalValue,
          language,
          minimap: { enabled: false }, // 小地图
          automaticLayout: true, // 自动布局,
          // codeLens: true,
          // colorDecorators: true,
          // contextmenu: false, //上下文菜单
          // readOnly: false, //是否只读
          // formatOnPaste: true, //粘贴自动格式化
          overviewRulerBorder: false, // 滚动条的边框
          scrollBeyondLastLine: true, //设置编辑器是否可以滚动到最后一行之后
          folding: true, //是否折叠
          foldingHighlight: true, //折叠等高线
          foldingStrategy: 'indentation', //折叠方式
          showFoldingControls: 'always', //是否一直显示折叠
          ...(className ? { extraEditorClassName: className } : {}),
          ...finalOptions,
          ...(theme ? { theme } : {}),
        },
        overrideServices,
      );
      // After initializing monaco editor
      handleEditorDidMount();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initMonaco, []);

  useEffect(() => {
    if (editor.current) {
      if (value === editor.current.getValue()) {
        return;
      }

      const model = editor.current.getModel();
      __prevent_trigger_change_event.current = true;
      editor.current.pushUndoStop();
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      model?.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: value,
          },
        ],
        () => null,
      );
      editor.current.pushUndoStop();
      __prevent_trigger_change_event.current = false;
    }
  }, [value]);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      monaco.editor.setModelLanguage(model!, language);
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      // Don't pass in the model on update because monaco crashes if we pass the model
      // a second time. See https://github.com/microsoft/monaco-editor/issues/2027
      // const { model: _model, ...optionsWithoutModel } = options;
      editor.current.updateOptions({
        ...(className ? { extraEditorClassName: className } : {}),
        ...options,
      });
    }
  }, [className, options]);

  useEffect(() => {
    if (editor.current) {
      editor.current.layout();
    }
  }, [width, height]);

  useEffect(() => {
    monaco.editor.setTheme(theme ?? '');
  }, [theme]);

  useEffect(
    () => () => {
      if (editor.current) {
        handleEditorWillUnmount();
        editor.current.dispose();
        const model = editor.current.getModel();
        if (model) {
          model.dispose();
        }
      }
      if (_subscription.current) {
        _subscription.current.dispose();
      }
    },
    [],
  );

  return <div ref={containerElement} style={style} />;
});

export default MonacoEditor;
