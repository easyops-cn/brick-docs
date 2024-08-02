import React, { useEffect, useState } from "react";
import * as prod from "react/jsx-runtime";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeReact from "rehype-react";

export interface MarkdownComponentProps {
  content: string;
}

// Reference https://github.com/remarkjs/react-remark/blob/39553e5f5c9e9b903bebf261788ff45130668de0/src/index.ts
export default function SimpleMarkdown({ content }: MarkdownComponentProps) {
  const [reactContent, setReactContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    let ignore = false;
    unified()
      .use(remarkParse)
      .use(remarkToRehype)
      .use(rehypeReact, prod)
      .process(content)
      .then((vFile) => {
        if (!ignore) {
          setReactContent(vFile.result);
        }
      })
      .catch((error) => {
        if (!ignore) {
          // eslint-disable-next-line no-console
          console.error("Convert markdown failed:", error);
          setReactContent(<span>{content}</span>);
        }
      });
    return () => {
      ignore = true;
    };
  }, [content]);

  return reactContent;
}
