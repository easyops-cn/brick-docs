import React from "react";
import styles from "./style.module.css";

export default function BrickTagName({ name }: { name: string }): JSX.Element {
  return (
    <div className={styles.tagName}>
      <code>&lt;{name}&gt;</code>
    </div>
  );
}
