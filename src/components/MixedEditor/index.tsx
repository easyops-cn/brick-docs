import React, { Suspense } from "react";
import LoadingRing from "../LoadingRing";
import type {
  MonacoEditorProps,
} from "../MonacoEditor";

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
    onChange,
  }: MonacoEditorProps
) {
  const isMobile = !!navigator.maxTouchPoints;

  return (
    <Suspense fallback={<LoadingRing />}>
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
