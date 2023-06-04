import React, { Suspense } from "react";
import type {
  MonacoEditorProps,
} from "../MonacoEditor";
import LoadingRingBox from "../LoadingRingBox";

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
    theme,
    className,
    loadingHeight,
    onChange,
  }: MonacoEditorProps & {
    loadingHeight: number
  }
) {
  const isMobile = !!navigator.maxTouchPoints;

  return (
    <Suspense fallback={<LoadingRingBox height={loadingHeight} />}>
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
          theme={theme}
          className={className}
          onChange={onChange}
        />
      )}
    </Suspense>
  );
}
