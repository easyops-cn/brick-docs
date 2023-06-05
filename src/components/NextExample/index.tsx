import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import IconExternalLink from '@theme/Icon/ExternalLink';
import clsx from "clsx";
import useDeferredValue from "@site/src/hooks/useDeferredValue";
import { EXAMPLE_IFRAME_MIN_HEIGHT } from "@site/src/constants";
import getContentHeightByCode from "@site/src/utils/getContentHeightByCode";
import { b64EncodeUnicode } from "@site/src/utils/b64Unicode";
import ChevronUp from "./chevron-up.svg";
import ChevronDown from "./chevron-down.svg";
import styles from "./styles.module.css";
import LoadingRingBox from "../LoadingRingBox";
import LoadingRing from "../LoadingRing";

export interface NextExampleProps {
  code: string;
  type?: "html" | "yaml";
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
  type: _type,
  hiddenStyle
}: NextExampleProps): JSX.Element {
  const type = _type ?? "yaml";
  const containerRef = useRef<HTMLDivElement>();
  const { colorMode } = useColorMode();
  const previewSrc = useBaseUrl("/preview/");
  const iframeRef = useRef<HTMLIFrameElement>();
  const [iframeHeight, setIframeHeight] = useState(EXAMPLE_IFRAME_MIN_HEIGHT);
  const [ready, setReady] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const [sourceShown, setSourceShown] = useState(false);
  const [wait, setWait] = useState(!isTheFirstFrame());
  const editorInitialHeight = useMemo(() => getContentHeightByCode(code), [code]);

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

  const deferredCode = useDeferredValue(currentCode);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const render = (iframeRef.current?.contentWindow as any)
      ?._preview_only_render;
    if (!render) {
      return;
    }
    render(
      type,
      {
        [type]: deferredCode
      },
      {
        theme: colorMode,
        styleText: hiddenStyle
      }
    );
  }, [colorMode, deferredCode, ready, type, hiddenStyle]);

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
    setSourceShown(prev => !prev);
  }, []);

  return (
    <div
      className={styles.example}
      ref={containerRef}
    >
      <div className={styles.previewBox}>
        {wait || (
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
              style={{ height: iframeHeight }}
            />
          </div>
        )}
        {wait
          ? <LoadingRingBox height={EXAMPLE_IFRAME_MIN_HEIGHT} />
          : (!ready && <LoadingRing />)
        }
      </div>
      <div className={clsx(styles.editorBox, {
        [styles.sourceShown]: sourceShown
      })}>
        {wait ? (
          <LoadingRingBox height={editorInitialHeight} />
        ) : (
          <BrowserOnly fallback={<LoadingRingBox height={editorInitialHeight} />}>
            {() => {
              const MixedEditor = require("../MixedEditor").default;
              return (
                <MixedEditor
                  type={type}
                  code={code}
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
          role="button"
          onClick={toggleShowSource}
        >
          {sourceShown ? <ChevronUp width={14} height={14} /> : <ChevronDown width={14} height={14} />}
          <span>
            Source {type.toUpperCase()}
          </span>
        </button>
        <Link
          className={styles.button}
          to={`/playground#${b64EncodeUnicode(JSON.stringify({
            [type]: currentCode
          }))}`}
          target="_blank"
        >
          Playground
          <IconExternalLink width={12} height={12} />
        </Link>
      </div>
    </div>
  );
}
