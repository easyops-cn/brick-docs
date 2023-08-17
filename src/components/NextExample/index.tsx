import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Link from "@docusaurus/Link";
import IconExternalLink from "@theme/Icon/ExternalLink";
import clsx from "clsx";
import useDeferredValue from "@site/src/hooks/useDeferredValue";
import { EXAMPLE_IFRAME_MIN_HEIGHT } from "@site/src/constants";
import getContentHeightByCode from "@site/src/utils/getContentHeightByCode";
import { b64EncodeUnicode } from "@site/src/utils/b64Unicode";
import useExampleLanguage from "@site/src/hooks/useExampleLanguage";
import ChevronUp from "./chevron-up.svg";
import ChevronDown from "./chevron-down.svg";
import styles from "./styles.module.css";
import LoadingRingBox from "../LoadingRingBox";
import LoadingRing from "../LoadingRing";

export interface NextExampleProps {
  code: string;
  altCode: string;
  type: "html" | "yaml";
  hiddenStyle?: string;
}

type WaitCallback = () => void;

let initialized = false;
let firstFrameReady = false;

function isTheFirstFrame() {
  if (initialized) {
    return false;
  }
  initialized = true;
  return true;
}

const waitList: WaitCallback[] = [];

function waitForTheFirstFrame(callback: WaitCallback) {
  if (firstFrameReady) {
    callback();
  } else {
    waitList.push(callback);
  }
}

function setFirstFrameReady() {
  if (firstFrameReady) {
    return;
  }
  firstFrameReady = true;
  waitList.forEach((callback) => {
    callback();
  });
  waitList.length = 0;
}

export default function NextExample({
  code,
  altCode,
  type,
  hiddenStyle,
}: NextExampleProps): JSX.Element {
  const [language, changeLanguage] = useExampleLanguage();
  const containerRef = useRef<HTMLDivElement>();
  const { colorMode } = useColorMode();
  const previewSrc = useBaseUrl("/preview/");
  const iframeRef = useRef<HTMLIFrameElement>();
  const [iframeHeight, setIframeHeight] = useState(EXAMPLE_IFRAME_MIN_HEIGHT);
  const deferredIframeHeight = useDeferredValue(iframeHeight, 100);
  const [ready, setReady] = useState(false);
  const [defaultCode, setDefaultCode] = useState(
    language === type ? code : altCode
  );
  const [currentCode, setCurrentCode] = useState(defaultCode);
  const [sourceShown, setSourceShown] = useState(false);
  const isBrowser = useIsBrowser();
  const [wait, setWait] = useState(
    !(ExecutionEnvironment.canUseDOM && isTheFirstFrame())
  );
  const editorInitialHeight = useMemo(
    () => getContentHeightByCode(defaultCode),
    [defaultCode]
  );

  useEffect(() => {
    const newCode = language === type ? code : altCode;
    setDefaultCode(newCode);
    setCurrentCode(newCode);
  }, [altCode, code, language, type]);

  useEffect(() => {
    waitForTheFirstFrame(() => {
      setWait(false);
    });
  }, []);

  const handleIframeLoad = useCallback(() => {
    const check = () => {
      if ((iframeRef.current?.contentWindow as any)?._preview_only_render) {
        setReady(true);
        setFirstFrameReady();
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }, []);

  const deferredLanguageAndCode = useDeferredValue(
    `${language}:${currentCode}`
  );

  useEffect(() => {
    if (!ready) {
      return;
    }
    const render = (iframeRef.current?.contentWindow as any)
      ?._preview_only_render;
    if (!render) {
      return;
    }
    const colonIndex = deferredLanguageAndCode.indexOf(":");
    const deferredLanguage = deferredLanguageAndCode.substring(0, colonIndex);
    const deferredCode = deferredLanguageAndCode.substring(colonIndex + 1);
    render(
      deferredLanguage,
      {
        [deferredLanguage]: deferredCode,
      },
      {
        theme: colorMode,
        styleText: hiddenStyle,
      }
    );
  }, [colorMode, ready, hiddenStyle, deferredLanguageAndCode]);

  useLayoutEffect(() => {
    if (!ready) {
      return;
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIframeHeight(
          Math.max(
            EXAMPLE_IFRAME_MIN_HEIGHT,
            entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
          )
        );
      }
    });
    ro.observe(iframeRef.current.contentDocument.body, {
      box: "border-box",
    });
    return () => {
      ro.disconnect();
    };
  }, [ready]);

  const toggleShowSource = useCallback(() => {
    setSourceShown((prev) => !prev);
  }, []);

  return (
    <div className={styles.example} ref={containerRef}>
      <div className={styles.previewBox}>
        {isBrowser &&
          (wait ? (
            <LoadingRingBox height={EXAMPLE_IFRAME_MIN_HEIGHT} />
          ) : (
            <>
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
                  style={{ height: deferredIframeHeight }}
                />
              </div>
              {!ready && <LoadingRing />}
            </>
          ))}
      </div>
      <div
        className={clsx(styles.editorBox, {
          [styles.sourceShown]: sourceShown,
        })}
      >
        {wait || !ready ? (
          <LoadingRingBox height={editorInitialHeight} />
        ) : (
          <BrowserOnly
            fallback={<LoadingRingBox height={editorInitialHeight} />}
          >
            {() => {
              const MixedEditor = require("../MixedEditor").default;
              return (
                <MixedEditor
                  type={language}
                  code={defaultCode}
                  loadingHeight={editorInitialHeight}
                  onChange={setCurrentCode}
                />
              );
            }}
          </BrowserOnly>
        )}
      </div>
      <div className={styles.toolbar}>
        <button
          className={clsx(styles.button, styles.buttonToggleShowSource)}
          onClick={toggleShowSource}
        >
          {sourceShown ? (
            <ChevronUp width={14} height={14} />
          ) : (
            <ChevronDown width={14} height={14} />
          )}
          <span>Source</span>
        </button>
        <button
          className={clsx(styles.button, {
            [styles.active]: language === "html",
          })}
          onClick={() => {
            changeLanguage("html");
            setSourceShown(true);
          }}
        >
          HTML
        </button>
        <button
          className={clsx(styles.button, {
            [styles.active]: language === "yaml",
          })}
          onClick={() => {
            changeLanguage("yaml");
            setSourceShown(true);
          }}
        >
          YAML
        </button>
        <Link
          className={styles.button}
          to={`/playground#${b64EncodeUnicode(
            JSON.stringify({
              [language]: currentCode,
            })
          )}`}
          target="_blank"
        >
          Playground
          <IconExternalLink width={12} height={12} />
        </Link>
      </div>
    </div>
  );
}
