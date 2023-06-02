import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import NextExample from "@site/src/components/NextExample";

interface CodeBlockProps {
  preview?: boolean;
  children: string;
  className: string;
  gap?: boolean | string;
}

export default function CodeBlockWrapper(props: CodeBlockProps): JSX.Element {
  if (props.preview === true) {
    return (
      <NextExample type={props.className.replace("language-", "") as "html" | "yaml"} code={props.children.trimEnd()}
      hiddenStyle={
        props.gap ? `#preview-root { display: flex; flex-wrap: wrap; gap: ${props.gap === true ? "0.27em" : props.gap}; }` : undefined
      }
       />
    )
  }
  return <CodeBlock {...props} />;
}
