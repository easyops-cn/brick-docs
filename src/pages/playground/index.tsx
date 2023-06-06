import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Layout from "@theme/Layout";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import LoadingRing from "@site/src/components/LoadingRing";
import useDeferredValue from "@site/src/hooks/useDeferredValue";
import { examples } from "@site/src/examples.json";
import usePlaygroundQuery from "@site/src/hooks/usePlaygroundQuery";
import { b64DecodeUnicode, b64EncodeUnicode } from "@site/src/utils/b64Unicode";
import styles from "./style.module.css";

const DEFAULT_SOURCES = {
  html: '<basic.general-button type="primary">\n  Hello world\n</basic.general-button>',
  yaml: "brick: basic.general-button\nproperties:\n  type: primary\n  textContent: Hello world"
};

const STORAGE_KEY_MODE = "playground.mode";
const STORAGE_KEY_CODES = {
  html: "playground.code.html",
  yaml: "playground.code.yaml",
};
const SHARE_TEXT = "Share";

export default function PlaygroundPage(): JSX.Element {
  return (
    <Layout title="Playground" description="Brick playground" noFooter>
      <Playground />
    </Layout>
  );
}

function Playground(): JSX.Element {
  const { colorMode } = useColorMode();
  const previewSrc = useBaseUrl("/preview/");
  const initialExample = useInitialExample();
  const [isLocal, setIsLocal] = useState(initialExample.isLocal);
  const iframeRef = useRef<HTMLIFrameElement>();
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState(initialExample.mode);
  const [code, setCode] = useState(initialExample[initialExample.mode]);
  const [currentCode, setCurrentCode] = useState(code);
  const [exampleKey, setExampleKey] = useState(initialExample.key ?? "");
  const [shareText, setShareText] = useState(SHARE_TEXT);
  const [isShared, setIsShared] = useState(initialExample.isShared);

  const handleIframeLoad = useCallback(() => {
    const check = () => {
      if ((iframeRef.current?.contentWindow as any)?._preview_only_render) {
        setReady(true);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }, []);

  const deferredModeAndCode = useDeferredValue(`${mode}:${currentCode}`);

  const handleRefresh = useCallback(() => {
    if (!ready) {
      return;
    }
    const render = (iframeRef.current?.contentWindow as any)
      ?._preview_only_render;
    if (!render) {
      return;
    }
    const colonIndex = deferredModeAndCode.indexOf(":");
    const deferredMode = deferredModeAndCode.substring(0, colonIndex);
    const deferredCode = deferredModeAndCode.substring(colonIndex + 1);
    render(
      deferredMode,
      {
        [deferredMode]: deferredCode
      },
      {
        theme: colorMode,
      }
    );
  }, [colorMode, deferredModeAndCode, ready]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleSelectMode = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as "html" | "yaml";
    const localCode = localStorage.getItem(STORAGE_KEY_CODES[newMode]) || DEFAULT_SOURCES[newMode];
    setMode(newMode);
    setCode(localCode);
    setCurrentCode(localCode);
    setIsLocal(true);
    setExampleKey("");
    setIsShared(false);
    localStorage.setItem(STORAGE_KEY_MODE, newMode);
    if (isShared) {
      history.replaceState(null, "", "#");
    }
  }, [isShared]);

  const handleSelectExample = useCallback((key) => {
    const example = examples.find(item => item.key === key) as Example;
    setExampleKey(key);
    if (example) {
      setMode(example.mode);
      setCode(example[example.mode]);
      setCurrentCode(example[example.mode]);
      setIsLocal(false);
    } else {
      const localCode = localStorage.getItem(STORAGE_KEY_CODES[mode]) || DEFAULT_SOURCES[mode];
      setCode(localCode);
      setCurrentCode(localCode);
      setIsLocal(true);
    }
    setIsShared(false);
    const searchParams = new URLSearchParams();
    searchParams.set("example", key);
    history.replaceState(null, "", `?${searchParams}`);
  }, [mode]);

  const handleCodeChange = useCallback((value: string, isFlush: boolean) => {
    setCurrentCode(value);
    if (isLocal && !isFlush) {
      localStorage.setItem(STORAGE_KEY_CODES[mode], value);
    }
  }, [isLocal, mode]);

  const handleShare = useCallback(() => {
    history.replaceState(
      null,
      "",
      `#${b64EncodeUnicode(JSON.stringify({
        [mode]: currentCode
      }))}`
    );
    const result = copy(location.href);
    setShareText(result ? "URL copied" : "Failed to copy URL");
    setTimeout(() => {
      setShareText(SHARE_TEXT);
    }, 2000);
  }, [currentCode, mode]);

  return (
    <div className={styles.playground}>
      <div className={styles.column}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarColumn}>
            <select value={mode} onChange={handleSelectMode}>
              <option value="html">HTML</option>
              <option value="yaml">YAML</option>
            </select>
          </div>
          <div className={styles.toolbarColumn}>
            Example: <SelectExamples value={exampleKey} isShared={isShared} onSelect={handleSelectExample} />
          </div>
        </div>
        <div className={styles.editorBox}>
          <BrowserOnly fallback={<LoadingRing />}>
            {() => {
              const MixedEditor = require("../../components/MixedEditor").default;
              return (
                <MixedEditor
                  code={code}
                  type={mode}
                  className={styles.editor}
                  automaticLayout
                  onChange={handleCodeChange}
                />
              );
            }}
          </BrowserOnly>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.column}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarColumn}>
            Preview
          </div>
          <div className={styles.toolbarColumn}>
            <button
              className="button button--sm button--outline button--secondary"
              disabled={!ready}
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
          <div className={styles.toolbarColumn}>
            <button
              className="button button--sm button--outline button--secondary"
              onClick={handleShare}
            >
              {shareText}
            </button>
          </div>
        </div>
        <div className={styles.previewBox}>
          <div
            className={clsx(styles.preview, {
              [styles.ready]: ready,
            })}
          >
            <iframe
              ref={iframeRef}
              src={previewSrc}
              loading="lazy"
              onLoad={handleIframeLoad}
            />
          </div>
          {!ready && <LoadingRing />}
        </div>
      </div>
    </div>
  )
}

interface ExampleOption {
  value: string;
  label: string;
}

interface SelectExamplesProps {
  value?: string;
  isShared?: boolean;
  onSelect(key: string): void;
}

function SelectExamples({ value, isShared, onSelect }: SelectExamplesProps): JSX.Element {
  const groupedExamples = useMemo(() => {
    const groups = new Map<string, ExampleOption[]>();
    for (const example of examples) {
      const parts = example.key.split("/");
      const groupName = parts[0];
      const groupItems = groups.get(groupName);
      const option: ExampleOption = {
        value: example.key,
        label: parts.slice(1).join("/"),
      };
      if (groupItems) {
        groupItems.push(option);
      } else {
        groups.set(groupName, [option]);
      }
    }
    return groups;
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  }, [onSelect]);

  return (
    <select value={value} onChange={handleChange}>
      <option value="">{isShared ? "- shared -" : "- local -"}</option>
      {
        [...groupedExamples.entries()].map(([groupName, options]) => (
          <optgroup key={groupName} label={groupName}>
            {
              options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))
            }
          </optgroup>
        ))
      }
    </select>
  );
}

interface Sources {
  html?: string;
  yaml?: string;
}

interface InitialExample extends Sources {
  mode: "html" | "yaml";
  key?: string;
  isShared?: boolean;
  isLocal?: boolean;
}

interface Example extends Sources {
  mode: "html" | "yaml";
  key: string;
}

function useInitialExample(): InitialExample {
  const { paramMode, paramExample, hash } = usePlaygroundQuery();
  return useMemo(
    () => {
      if (hash) {
        let sharedExample: InitialExample;
        try {
          sharedExample = JSON.parse(b64DecodeUnicode(location.hash.slice(1)));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Parse pasted sources failed:", error);
        }
        if (typeof sharedExample === "object" && sharedExample) {
          if (typeof sharedExample.yaml === "string") {
            return {
              mode: "yaml",
              yaml: sharedExample.yaml,
              isShared: true,
            }
          }
        }
        return {
          mode: "html",
          html: sharedExample?.html ?? "",
          isShared: true,
        };
      }

      if (paramExample) {
        const example = examples.find(example => example.key === paramExample) as Example;
        if (example) {
          return example;
        }
      }

      const possibleMode = paramMode || ExecutionEnvironment.canUseDOM ? localStorage.getItem(STORAGE_KEY_MODE) : null;
      const mode = possibleMode === "yaml" ? "yaml" : "html";

      return {
        mode,
        [mode]: (ExecutionEnvironment.canUseDOM ? localStorage.getItem(STORAGE_KEY_CODES[mode]) : null) || DEFAULT_SOURCES[mode],
        isLocal: true,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
