import React from "react";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface SimpleEditorProps {
  code: string;
  type?: "html" | "yaml";
  theme?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function SimpleEditor({
  code,
  type,
  showLineNumbers,
  className: classNameProp,
}: SimpleEditorProps): JSX.Element {

  return (
    <CodeBlock
      className={clsx(classNameProp, styles.editor)}
      language={type ?? "yaml"}
      showLineNumbers={showLineNumbers}
    >
      {code}
    </CodeBlock>
  );
}
