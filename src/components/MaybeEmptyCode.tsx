import React from "react";

export default function MaybeEmptyCode({
  fallback,
  children,
}: {
  fallback?: string;
  children: React.ReactNode;
}): JSX.Element {
  return children ? <code>{children}</code> : fallback ? <>{fallback}</> : null;
}
