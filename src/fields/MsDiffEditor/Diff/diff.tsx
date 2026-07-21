import { isEmpty } from 'lodash-es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React, { useEffect, useMemo, useRef } from 'react';
import type { MonacoDiffEditorProps } from './types';
import { noop, processSize } from './utils';

const MsDiffEditor = React.forwardRef<HTMLInputElement, MonacoDiffEditorProps>((props, ref) => {
  const {
    width = '100%',
    height = '100%',
    value = {
      original: '',
      modified: '',
    },
    defaultValue = {
      original: '',
      modified: '',
    },
    language = 'javascript',
    theme = 'vs-dark',
    options = {},
    overrideServices = {},
    editorWillMount = noop,
    editorDidMount = noop,
    editorWillUnmount = noop,
    onChange = noop,
    diffChanges = noop,
    className = null,
  } = props;

  const { original: originalValue, modified: modifiedValue } = value;

  const containerElement = useRef<HTMLDivElement | null>(null);

  const editor = useRef<monaco.editor.IStandaloneDiffEditor | null>(null);

  const _subscription = useRef<monaco.IDisposable | null>(null);

  const __prevent_trigger_change_event = useRef<boolean | null>(null);

  const fixedWidth = processSize(width);

  const fixedHeight = processSize(height);

  let myTimer = null;

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

  const calculateDiff = () => {
    myTimer = setTimeout(() => {
      if (editor.current) {
        const changes = editor.current.getLineChanges() ?? [];
        const diffLines = changes.reduce(
          (sum, diff) => {
            let changedLines = sum.changed;
            let modifiedLine = 0;
            let originalLine = 0;

            if (diff.modifiedStartLineNumber && diff.modifiedEndLineNumber) {
              modifiedLine = diff.modifiedEndLineNumber - diff.modifiedStartLineNumber + 1;
            }

            if (diff.originalEndLineNumber && diff.originalStartLineNumber) {
              originalLine = diff.originalEndLineNumber - diff.originalStartLineNumber + 1;
            }

            changedLines += modifiedLine > originalLine ? modifiedLine : originalLine;

            return { changed: changedLines, blockNum: changes.length ?? 0, allChanges: changes };
          },
          { changed: 0 },
        );
        diffChanges(diffLines);
      }
    }, 1000);
  };

  const handleEditorDidMount = () => {
    editorDidMount(editor.current!, monaco);
    calculateDiff();

    const { modified, original: originalEditor } = editor.current!.getModel()!;
    _subscription.current = modified.onDidChangeContent((event) => {
      if (!__prevent_trigger_change_event.current) {
        onChange?.(
          {
            original: originalEditor.getValue(),
            modified: modified.getValue(),
          },
          event,
        );
        calculateDiff();
      }
    });
  };

  const handleEditorWillUnmount = () => {
    editorWillUnmount(editor.current!, monaco);
    myTimer = null;
  };

  const initModels = () => {
    const finalValue = isEmpty(value) ? defaultValue : value;
    const originalModel = monaco.editor.createModel(finalValue?.original ?? '', language);
    const modifiedModel = monaco.editor.createModel(finalValue?.modified ?? '', language);
    editor.current?.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  };

  useEffect(
    () => {
      if (containerElement.current) {
        // Before initializing monaco editor
        handleEditorWillMount();

        editor.current = monaco.editor.createDiffEditor(
          containerElement.current,
          {
            minimap: { enabled: false }, // 小地图
            automaticLayout: true, // 自动布局,
            // codeLens: true,
            // colorDecorators: true,
            // contextmenu: false, //上下文菜单
            readOnly: true, //是否只读
            // formatOnPaste: true, //粘贴自动格式化
            overviewRulerBorder: false, // 滚动条的边框
            scrollBeyondLastLine: true, //设置编辑器是否可以滚动到最后一行之后
            folding: true, //是否折叠
            foldingHighlight: true, //折叠等高线
            foldingStrategy: 'indentation', //折叠方式
            showFoldingControls: 'always', //是否一直显示折叠
            ...(className ? { extraEditorClassName: className } : {}),
            ...options,
            ...(theme ? { theme } : {}),
          },
          overrideServices,
        );
        // After initializing monaco editor
        initModels();
        handleEditorDidMount();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    calculateDiff();
  }, [value]);

  useEffect(() => {
    if (editor.current) {
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
    if (editor.current) {
      const { original: originalEditor, modified } = editor.current.getModel()!;
      monaco.editor.setModelLanguage(originalEditor, language);
      monaco.editor.setModelLanguage(modified, language);
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      if (modifiedValue === editor.current.getModel()) {
        return;
      }
      const { modified } = editor.current.getModel()!;
      __prevent_trigger_change_event.current = true;
      // modifiedEditor is not in the public API for diff editors
      editor.current.getModifiedEditor().pushUndoStop();
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      // @ts-expect-error
      modified.pushEditOperations(
        [],
        [
          {
            range: modified.getFullModelRange(),
            text: modifiedValue,
          },
        ],
      );
      // modifiedEditor is not in the public API for diff editors
      editor.current.getModifiedEditor().pushUndoStop();
      __prevent_trigger_change_event.current = false;
    }
  }, [modifiedValue]);

  useEffect(() => {
    if (editor.current) {
      const { original: originalEditor } = editor.current.getModel()!;
      if (originalValue !== originalEditor.getValue()) {
        originalEditor.setValue(originalValue);
      }
    }
  }, [originalValue]);

  useEffect(() => {
    monaco.editor.setTheme(theme ?? '');
  }, [theme]);

  useEffect(
    () => () => {
      if (editor.current) {
        handleEditorWillUnmount();
        editor.current.dispose();
        const { original: originalEditor, modified } = editor.current.getModel()!;
        if (originalEditor) {
          originalEditor.dispose();
        }
        if (modified) {
          modified.dispose();
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

export default MsDiffEditor;
