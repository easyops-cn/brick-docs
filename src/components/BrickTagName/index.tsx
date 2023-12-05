import React from "react";
import styles from "./style.module.css";

export default function BrickTagName({
  name,
  alias,
  isProvider,
  insider,
}: {
  name: string;
  alias?: string[];
  isProvider?: boolean;
  insider?: boolean;
}): JSX.Element {
  return (
    <div className={styles.tagNameAndAlias}>
      {insider && <span className="badge badge--primary">Insider</span>}
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
