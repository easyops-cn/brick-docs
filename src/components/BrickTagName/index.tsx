import React from "react";
import styles from "./style.module.css";

export default function BrickTagName({
  name,
  alias,
  isProvider,
}: {
  name: string;
  alias?: string[];
  isProvider?: boolean;
}): JSX.Element {
  return (
    <div className={styles.tagNameAndAlias}>
      <div className={styles.tagName}>
        <code>&lt;{name}&gt;</code>
        {isProvider && <span className="badge badge--warning">provider</span>}
      </div>
      {!!alias?.length && (
        <div className={styles.alias}>
          {"Alias: "}
          {alias.map((item, index) => (
            <code key={index}>&lt;{item}&gt;</code>
          ))}
        </div>
      )}
    </div>
  );
}
