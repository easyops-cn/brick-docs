import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from "@docusaurus/BrowserOnly";
import IconExternalLink from '@theme/Icon/ExternalLink';
import clsx from "clsx";
import useDeferredValue from "@site/src/hooks/useDeferredValue";
import {
  EDITOR_PADDING_TOP,
  EDITOR_SCROLLBAR_SIZE,
  EXAMPLE_CODE_LINE_HEIGHT,
  EXAMPLE_IFRAME_MIN_HEIGHT,
  EXAMPLE_MIN_HEIGHT,
} from "@site/src/constants";
import ChevronUp from "./chevron-up.svg";
import ChevronDown from "./chevron-down.svg";
import LoadingRing from "../LoadingRing";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

export interface NextExampleProps {
  code: string;
  type?: "html" | "yaml";
  wait?: boolean;
}

export default function NextExample({
  code,
  type: _type,
  wait,
}: NextExampleProps): JSX.Element {
  const type = _type ?? "yaml";
  const containerRef = useRef<HTMLDivElement>();
  const { colorMode } = useColorMode();
  const previewSrc = useBaseUrl("/preview/");
  const iframeRef = useRef<HTMLIFrameElement>();
  const [iframeHeight, setIframeHeight] = useState(EXAMPLE_IFRAME_MIN_HEIGHT);
  const [ready, setReady] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);
  const [codeLines, setCodeLines] = useState(() =>
    currentCode.split("\n").length
  );
  const [contentMaxHeight, setContentMaxHeight] = useState(() =>
    getContentMaxHeight(codeLines)
  );
  const [sourceShown, setSourceShown] = useState(false);

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
      }
    );
  }, [colorMode, deferredCode, ready, type]);

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

  useEffect(() => {
    setCodeLines(currentCode.split("\n").length);
  }, [currentCode]);

  useEffect(() => {
    setContentMaxHeight(getContentMaxHeight(codeLines));
  }, [codeLines]);

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
        {(wait || !ready) && <LoadingRing />}
      </div>
      <div className={clsx(styles.editorBox, {
        [styles.sourceShown]: sourceShown
      })} style={{
        height: Math.max(contentMaxHeight, EXAMPLE_MIN_HEIGHT)
      }}>
        {wait ? (
          <LoadingRing />
        ) : (
          <BrowserOnly fallback={<LoadingRing />}>
            {() => {
              const MixedEditor = require("../MixedEditor").default;
              return (
                <MixedEditor
                  type={type}
                  code={code}
                  theme={colorMode === "dark" ? "vs-dark" : "vs"}
                  className={styles.editorContainer}
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
          <span>Source</span>
        </button>
        <Link className={styles.button} href={`http://easyops-cn.github.io/next-bricks/playground/?mode=${type}#${b64EncodeUnicode(JSON.stringify({
          [type]: currentCode
        }))}`}>
          Playground
          <IconExternalLink width={12} height={12} />
        </Link>
      </div>
    </div>
  );
}

function getContentMaxHeight(codeLines: number): number {
  return codeLines * EXAMPLE_CODE_LINE_HEIGHT +
    EDITOR_SCROLLBAR_SIZE +
    EDITOR_PADDING_TOP;
}

function b64EncodeUnicode(str: string) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}
