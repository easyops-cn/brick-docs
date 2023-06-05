import React, { Suspense } from "react";
import type {
  MonacoEditorProps,
} from "../MonacoEditor";
import LoadingRingBox from "../LoadingRingBox";
import LoadingRing from "../LoadingRing";

const SimpleEditor = React.lazy(
  () => import("../SimpleEditor")
);
const MonacoEditor = React.lazy(
  () => import("../MonacoEditor")
);

export default function MixedEditor(
  {
    code,
    type,
    className,
    loadingHeight,
    automaticLayout,
    onChange,
  }: MonacoEditorProps & {
    loadingHeight?: number
  }
) {
  const isMobile = !!navigator.maxTouchPoints;

  return (
    <Suspense fallback={loadingHeight ? <LoadingRingBox height={loadingHeight} /> : <LoadingRing />}>
      {isMobile ? (
        <SimpleEditor
          type={type}
          code={code}
          className={className}
        />
      ) : (
        <MonacoEditor
          type={type}
          code={code}
          className={className}
          automaticLayout={automaticLayout}
          onChange={onChange}
        />
      )}
    </Suspense>
  );
}
