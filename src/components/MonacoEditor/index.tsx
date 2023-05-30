import React, {
  useEffect,
  useRef,
} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  EDITOR_SCROLLBAR_SIZE,
  EDITOR_PADDING_TOP,
  EXAMPLE_CODE_LINE_HEIGHT,
} from "@site/src/constants";
import { register as registerJavaScript } from "@next-core/monaco-contributions/javascript";
import { register as registerTypeScript } from "@next-core/monaco-contributions/typescript";
import { register as registerYaml } from "@next-core/monaco-contributions/yaml";
import { register as registerHtml } from "@next-core/monaco-contributions/html";

registerJavaScript();
registerTypeScript();
registerYaml();
registerHtml();

export interface MonacoEditorProps {
  code: string;
  type?: "html" | "yaml";
  theme?: string;
  className?: string;
  onChange?(value: string): void;
}

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  lib: [],
});
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  lib: [],
});

export default function MonacoEditor(
  { code, type, className, theme, onChange }: MonacoEditorProps
): JSX.Element {
  const containerRef = useRef<HTMLDivElement>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  useEffect(() => {
    if (theme) {
      // Currently theme is configured globally.
      // See https://github.com/microsoft/monaco-editor/issues/338
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    if (editorRef.current) {
      return;
    }
    const model = monaco.editor.createModel(
      code,
      type ?? "yaml"
    );
    editorRef.current = monaco.editor.create(containerRef.current, {
      model,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      tabSize: 2,
      insertSpaces: true,
      automaticLayout: true,
      fontSize: 13,
      lineHeight: EXAMPLE_CODE_LINE_HEIGHT,
      scrollbar: {
        horizontalScrollbarSize: EDITOR_SCROLLBAR_SIZE,
        verticalScrollbarSize: EDITOR_SCROLLBAR_SIZE,
        horizontalSliderSize: 8,
        verticalSliderSize: 8,
        alwaysConsumeMouseWheel: false,
      },
      padding: {
        top: EDITOR_PADDING_TOP,
      },
      overviewRulerBorder: false,
      mouseWheelScrollSensitivity: 0.5,
      renderLineHighlight: "none",
    });

    // Todo(steve): auto resize by content
    // https://github.com/microsoft/monaco-editor/issues/794#issuecomment-1438838291

    // Monaco editor will stop keyboard event propagation, thus the
    // search-bar shortcut won't work, so we manually dispatch an event.
    editorRef.current.onKeyDown((e) => {
      if (e.equals(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK)) {
        const keydown = new KeyboardEvent("keydown", {
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          key: "k",
        });
        document.dispatchEvent(keydown);
      }
    });
  }, [code, type]);

  useEffect(() => {
    const currentModel = editorRef.current.getModel();
    const listener = currentModel.onDidChangeContent(() => {
      onChange?.(currentModel.getValue());
    });
    return () => {
      listener.dispose();
    };
  }, [onChange]);

  useEffect(() => {
    return () => {
      editorRef.current.getModel().dispose();
      editorRef.current.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
    ></div>
  );
}
