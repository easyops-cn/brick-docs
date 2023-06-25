import React from "react";
import styles from "./style.module.css";

export default function BrickTagName({
  name,
  isProvider,
}: {
  name: string;
  isProvider?: boolean;
}): JSX.Element {
  return (
    <div className={styles.tagName}>
      <code>&lt;{name}&gt;</code>
      {isProvider && <span className="badge badge--warning">provider</span>}
    </div>
  );
}
