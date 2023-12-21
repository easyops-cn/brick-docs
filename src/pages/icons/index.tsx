import React, { useCallback, useEffect, useRef, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useColorMode } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import clsx from "clsx";
import LoadingRing from "@site/src/components/LoadingRing";
import useExampleUIVersion from "@site/src/hooks/useExampleUIVersion";
import styles from "./style.module.css";
import code from "./code.yaml";

export default function PlaygroundPage(): JSX.Element {
  return (
    <Layout title="Icons">
      <Icons />
    </Layout>
  );
}

function Icons(): JSX.Element {
  const { colorMode } = useColorMode();
  const [uiVersion] = useExampleUIVersion();
  const previewSrc = useBaseUrl("/preview/");
  const iframeRef = useRef<HTMLIFrameElement>();
  const [ready, setReady] = useState(false);
  const [height, setHeight] = useState(600);

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

  // const deferredModeAndCode = useDeferredValue(`${mode}:${currentCode}`);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const iframeWindow = iframeRef.current?.contentWindow;
    const render = (iframeWindow as any)?._preview_only_render;
    if (!render) {
      return;
    }

    render(
      "yaml",
      {
        yaml: code,
      },
      {
        theme: colorMode,
        uiVersion,
      }
    );
  }, [colorMode, ready, uiVersion]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const iframeWindow = iframeRef.current?.contentWindow;

    const previewRoot = iframeWindow.document.querySelector("#preview-root");
    if (!previewRoot) {
      return;
    }

    iframeWindow.document.documentElement.style.overflow = "hidden";

    const interval = setInterval(() => {
      setHeight(previewRoot.clientHeight);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [ready]);

  return (
    <div className="container">
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
          height={height}
        />
      </div>
      {!ready && <LoadingRing />}
    </div>
  );
}
