import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Layout from "@theme/Layout";
import clsx from "clsx";
import copy from "copy-to-clipboard";
import LoadingRing from "@site/src/components/LoadingRing";
import useDeferredValue from "@site/src/hooks/useDeferredValue";
import examplesJson from "@site/src/examples.json";
import storiesJson from "@site/src/stories.json";
import usePlaygroundQuery from "@site/src/hooks/usePlaygroundQuery";
import { b64DecodeUnicode } from "@site/src/utils/b64Unicode";
import { decorateAltCode } from "@site/src/utils/decorateAltCode";
import { GZIP_HASH_PREFIX, compress, decompress } from "@site/src/utils/gzip";
import useExampleUIVersion from "@site/src/hooks/useExampleUIVersion";
import styles from "./style.module.css";
import yaml from "js-yaml";

const { examples } = examplesJson;
const { stories } = storiesJson;

const DEFAULT_SOURCES = {
  html: '<basic.general-button type="primary">\n  Hello world\n</basic.general-button>',
  yaml: "brick: basic.general-button\nproperties:\n  type: primary\n  textContent: Hello world",
  snippet: "brick: div\nproperties:\n textContent: Hello, I'm snippet",
};

const STORAGE_KEY_MODE = "playground.mode";
const STORAGE_KEY_CODES = {
  html: "playground.code.html",
  yaml: "playground.code.yaml",
  snippet: "playground.code.snippet",
};
const SHARE_TEXT = "Share";

let decompressedExampleString: string;

export default function PlaygroundPage(): JSX.Element {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function task() {
      if (
        ExecutionEnvironment.canUseDOM &&
        location.hash.startsWith(GZIP_HASH_PREFIX)
      ) {
        try {
          decompressedExampleString = await decompress(
            location.hash.substring(GZIP_HASH_PREFIX.length)
          );
        } catch (e) {
          console.error("Decompress shared example failed:", e);
        }
      }
      setReady(true);
    }
    task();
  }, []);

  return (
    <Layout title="Playground" description="Brick playground" noFooter>
      {ready && <Playground />}
    </Layout>
  );
}

function Playground(): JSX.Element {
  const { colorMode } = useColorMode();
  const [uiVersion] = useExampleUIVersion();
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
  const [hasGap, setHasGap] = useState(initialExample.gap);

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
    const realMode = deferredMode === "snippet" ? "yaml" : deferredMode;
    const deferredCode = deferredModeAndCode.substring(colonIndex + 1);

    render(
      realMode,
      {
        [realMode]: deferredCode,
      },
      {
        theme: colorMode,
        uiVersion,
        styleText: hasGap
          ? "#preview-root { display: flex; flex-wrap: wrap; gap: 0.27em }"
          : undefined,
      }
    );
  }, [colorMode, deferredModeAndCode, ready, hasGap, uiVersion]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleSelectMode = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMode = e.target.value as "html" | "yaml" | "snippet";
      setMode(newMode);
      const localCode =
        localStorage.getItem(STORAGE_KEY_CODES[newMode]) ||
        DEFAULT_SOURCES[newMode];
      let newCode = localCode;
      if (newMode === "snippet") {
        const snippet = stories
          .map((pkg) => pkg.stories.map((story) => story.conf).flat())
          .flat()
          .find((story) => story.snippetId === exampleKey);
        if (snippet) {
          newCode = yaml.dump(snippet.bricks);
        }
      } else if (exampleKey) {
        const example = examples.find(
          (item) => item.key === exampleKey
        ) as Example;
        if (example) {
          newCode = decorateAltCode(example[newMode], example.mode, newMode);
        }
      }
      setCode(newCode);
      setCurrentCode(newCode);
      setIsShared(false);
      localStorage.setItem(STORAGE_KEY_MODE, newMode);
      const searchParams = new URLSearchParams();
      searchParams.set("mode", newMode);
      if (exampleKey) {
        searchParams.set("example", exampleKey);
      }
      history.replaceState(null, "", `?${searchParams}`);
    },
    [exampleKey]
  );

  const handleSelectExample = useCallback(
    (key, option) => {
      let code =
        localStorage.getItem(STORAGE_KEY_CODES[mode]) || DEFAULT_SOURCES[mode];
      let isLocal = false;
      let isGap = false;
      if (mode === "snippet") {
        if (option?.bricks) {
          code = yaml.dump(option.bricks);
        } else {
          isLocal = true;
        }
      } else {
        const example = key
          ? (examples.find((item) => item.key === key) as Example)
          : null;
        setExampleKey(key);
        if (example) {
          code = decorateAltCode(example[mode], example.mode, mode);
          isGap = example.gap;
        } else {
          isLocal = true;
        }
      }
      setCode(code);
      setCurrentCode(code);
      setHasGap(isGap);
      setIsLocal(isLocal);
      setExampleKey(key);
      setIsShared(false);
      const searchParams = new URLSearchParams();
      searchParams.set("mode", mode);
      if (key) {
        searchParams.set("example", key);
      }
      history.replaceState(null, "", `?${searchParams}`);
    },
    [mode]
  );

  const handleCodeChange = useCallback(
    (value: string, isFlush: boolean) => {
      setCurrentCode(value);
      if (isLocal && !isFlush) {
        localStorage.setItem(STORAGE_KEY_CODES[mode], value);
      }
    },
    [isLocal, mode]
  );

  const handleShare = useCallback(async () => {
    let ok = false;
    try {
      history.replaceState(
        null,
        "",
        `${GZIP_HASH_PREFIX}${await compress(
          JSON.stringify({
            [mode]: currentCode,
            gap: hasGap,
          })
        )}`
      );
      ok = copy(location.href);
    } catch (e) {
      console.error("Compress shared example failed:", e);
    }
    setShareText(ok ? "URL copied" : "Failed to copy URL");
    setTimeout(() => {
      setShareText(SHARE_TEXT);
    }, 2000);
  }, [currentCode, hasGap, mode]);

  return (
    <div className={styles.playground}>
      <div className={styles.column}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarColumn}>
            <select value={mode} onChange={handleSelectMode}>
              <option value="html">HTML</option>
              <option value="yaml">YAML</option>
              <option value="snippet">SNIPPET</option>
            </select>
          </div>
          <div className={styles.toolbarColumn}>
            Example:{" "}
            <SelectExamples
              mode={mode}
              value={exampleKey}
              isShared={isShared}
              onSelect={handleSelectExample}
            />
          </div>
        </div>
        <div className={styles.editorBox}>
          <BrowserOnly fallback={<LoadingRing />}>
            {() => {
              const MixedEditor =
                require("../../components/MixedEditor").default;
              return (
                <MixedEditor
                  code={code}
                  type={mode === "snippet" ? "yaml" : mode}
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
          <div className={styles.toolbarColumn}>Preview</div>
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
  );
}

interface ExampleOption {
  value: string;
  label: string;
  [k: string]: unknown;
}

interface SelectExamplesProps {
  mode?: "html" | "yaml" | "snippet";
  value?: string;
  isShared?: boolean;
  onSelect(key: string, option: ExampleOption): void;
}

function SelectExamples({
  mode,
  value,
  isShared,
  onSelect,
}: SelectExamplesProps): JSX.Element {
  const groupedExamples = useMemo(() => {
    const groups = new Map<string, ExampleOption[]>();
    if (mode === "html" || mode === "yaml") {
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
    }
    if (mode === "snippet") {
      for (const pkg of stories) {
        const part = pkg.key;
        const options = pkg.stories
          .map((story) =>
            story.conf.map((item) => ({
              label: `${part}/${item.snippetId}`,
              value: item.snippetId,
              bricks: item.bricks,
            }))
          )
          .flat();
        if (options.length) {
          groups.set(part, options);
        }
      }
    }
    return groups;
  }, [mode]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      onSelect(
        value,
        [...groupedExamples.values()]
          .flat()
          .find((item) => item.value === value)
      );
    },
    [groupedExamples, onSelect]
  );

  return (
    <select value={value} onChange={handleChange}>
      <option value="">{isShared ? "- shared -" : "- local -"}</option>
      {[...groupedExamples.entries()].map(([groupName, options]) => (
        <optgroup key={groupName} label={groupName}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

interface Sources {
  html?: string;
  yaml?: string;
}

interface InitialExample extends Sources {
  mode: "html" | "yaml" | "snippet";
  key?: string;
  isShared?: boolean;
  isLocal?: boolean;
  gap?: boolean;
}

interface Example extends Sources {
  mode: "html" | "yaml";
  key: string;
  gap?: boolean;
}

function useInitialExample(): InitialExample {
  const { paramMode, paramExample, hash } = usePlaygroundQuery();
  return useMemo(
    () => {
      if (hash) {
        let sharedExample: InitialExample;
        try {
          sharedExample = JSON.parse(
            decompressedExampleString ??
              b64DecodeUnicode(location.hash.slice(1))
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Parse pasted sources failed:", error);
        }
        if (typeof sharedExample?.yaml === "string") {
          return {
            mode: "yaml",
            yaml: sharedExample.yaml,
            gap: Boolean(sharedExample.gap),
            isShared: true,
          };
        }
        return {
          mode: "html",
          html: sharedExample?.html ?? "",
          gap: Boolean(sharedExample?.gap),
          isShared: true,
        };
      }

      if (paramExample) {
        const example = examples.find(
          (example) => example.key === paramExample
        ) as Example;
        if (example) {
          const altMode = example.mode === "yaml" ? "html" : "yaml";
          return {
            ...example,
            mode: paramMode
              ? paramMode === "yaml"
                ? "yaml"
                : "html"
              : example.mode,
            [altMode]: decorateAltCode(example[altMode], example.mode, altMode),
          };
        }
      }

      const possibleMode =
        paramMode ||
        (ExecutionEnvironment.canUseDOM
          ? localStorage.getItem(STORAGE_KEY_MODE)
          : null);
      const mode = possibleMode === "yaml" ? "yaml" : "html";

      return {
        mode,
        [mode]:
          (ExecutionEnvironment.canUseDOM
            ? localStorage.getItem(STORAGE_KEY_CODES[mode])
            : null) || DEFAULT_SOURCES[mode],
        isLocal: true,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
