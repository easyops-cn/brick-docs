import React from "react";

export default function MaybeEmptyCode({ fallback, children }: { fallback?: string; children: string | undefined }): JSX.Element {
  return children ? <code>{children}</code> : fallback ? <>{fallback}</> : null;
}
