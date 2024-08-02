import React, { memo } from "react";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeReact from "rehype-react";

export interface MarkdownComponentProps {
  content: string;
}

// Reference https://github.com/remarkjs/react-remark/blob/39553e5f5c9e9b903bebf261788ff45130668de0/src/index.ts
export default memo<MarkdownComponentProps>(function SimpleMarkdown(props) {
  // eslint-disable-next-line react/prop-types
  return renderMarkdown(props.content);
});

function renderMarkdown(content: string) {
  try {
    const vFile = unified()
      .use(remarkParse)
      .use(remarkToRehype)
      .use(rehypeReact, prod)
      .processSync(content);
    return vFile.result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Convert markdown failed:", error);
    return <>{content}</>;
  }
}
