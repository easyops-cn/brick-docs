import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import {
  EDITOR_SCROLLBAR_SIZE,
  EDITOR_PADDING_TOP,
  EXAMPLE_CODE_LINE_HEIGHT,
  EXAMPLE_MIN_HEIGHT,
} from "@site/src/constants";
import { register as registerJavaScript } from "@next-core/monaco-contributions/javascript";
import { register as registerTypeScript } from "@next-core/monaco-contributions/typescript";
import { register as registerYaml } from "@next-core/monaco-contributions/yaml";
import { register as registerHtml } from "@next-core/monaco-contributions/html";
import getContentHeightByCode from "@site/src/utils/getContentHeightByCode";

registerJavaScript();
registerTypeScript();
registerYaml();
registerHtml();

export interface MonacoEditorProps {
  code: string;
  type: "html" | "yaml";
  className?: string;
  automaticLayout?: boolean;
  onChange?(value: string, isFlush: boolean): void;
}

monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  lib: [],
});
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  allowNonTsExtensions: true,
  lib: [],
});

export default function MonacoEditor({
  code,
  type,
  className,
  automaticLayout,
  onChange,
}: MonacoEditorProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const size = useRef<monaco.editor.IDimension>({
    width: 300,
    height: getContentHeightByCode(code),
  });
  // `automaticLayout` should never change
  const automaticLayoutRef = useRef(automaticLayout);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (colorMode) {
      // Currently theme is configured globally.
      // See https://github.com/microsoft/monaco-editor/issues/338
      monaco.editor.setTheme(colorMode === "dark" ? "vs-dark" : "vs");
    }
  }, [colorMode]);

  useEffect(() => {
    if (editorRef.current) {
      const currentModel = editorRef.current.getModel();
      monaco.editor.setModelLanguage(currentModel, type);
      currentModel.setValue(code);
    }
  }, [code, type]);

  useLayoutEffect(() => {
    if (automaticLayoutRef.current) {
      return;
    }

    size.current.width = containerRef.current.getBoundingClientRect().width;
    editorRef.current?.layout(size.current);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          const newWidth = entry.contentBoxSize
            ? entry.contentBoxSize[0].inlineSize
            : entry.contentRect.width;
          if (newWidth !== size.current.width) {
            size.current.width = newWidth;
            editorRef.current?.layout(size.current);
          }
          break;
        }
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      return;
    }
    const model = monaco.editor.createModel(code, type ?? "yaml");
    editorRef.current = monaco.editor.create(containerRef.current, {
      model,
      minimap: {
        enabled: false,
      },
      scrollBeyondLastLine: false,
      tabSize: 2,
      insertSpaces: true,
      automaticLayout: automaticLayoutRef.current,
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

    if (!automaticLayoutRef.current) {
      editorRef.current.onDidContentSizeChange((e) => {
        if (e.contentHeightChanged) {
          const newHeight = fixEditorHeightWithScrollBar(e.contentHeight);
          if (newHeight !== size.current.height) {
            size.current.height = newHeight;
            editorRef.current.layout(size.current);
          }
        }
      });

      size.current.height = fixEditorHeightWithScrollBar(
        editorRef.current.getContentHeight()
      );
      editorRef.current.layout(size.current);
    }
  }, [code, type]);

  useEffect(() => {
    const currentModel = editorRef.current.getModel();
    const listener = currentModel.onDidChangeContent((e) => {
      onChange?.(currentModel.getValue(), e.isFlush);
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

  return <div ref={containerRef} className={className}></div>;
}

function fixEditorHeightWithScrollBar(contentHeight: number): number {
  let fixedHeight = contentHeight;
  if ((contentHeight - EDITOR_PADDING_TOP) % EXAMPLE_CODE_LINE_HEIGHT === 0) {
    fixedHeight = contentHeight + EDITOR_SCROLLBAR_SIZE;
  }
  return Math.max(fixedHeight, EXAMPLE_MIN_HEIGHT);
}
