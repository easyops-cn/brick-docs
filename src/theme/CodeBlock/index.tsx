import React, { useMemo } from "react";
import CodeBlock from "@theme-original/CodeBlock";
import NextExample from "@site/src/components/NextExample";
import { decorateAltCode } from "@site/src/utils/decorateAltCode";

const YAML_DELIMITER = "# -- YAML DELIMITER (1nbbm8) --";
const HTML_DELIMITER_START = "<!-- HTML DELIMITER start (1nbbm8) --";
const HTML_DELIMITER_END = "-- HTML DELIMITER end (1nbbm8) -->";

interface CodeBlockProps {
  preview?: boolean;
  children: string;
  className: string;
  gap?: boolean | string;
}

export default function CodeBlockWrapper(props: CodeBlockProps): JSX.Element {
  const previewData = useMemo(() => {
    if (props.preview === true) {
      const fullCode = props.children.trimEnd();
      const type = (
        props.className.replace("language-", "") === "yaml" ? "yaml" : "html"
      ) as "yaml" | "html";
      const lines = fullCode.split("\n");
      let code = fullCode;
      let altCode = "";
      if (type === "yaml") {
        const delimiterIndex = lines.indexOf(YAML_DELIMITER);
        if (delimiterIndex > -1) {
          code = lines.slice(0, delimiterIndex).join("\n");
          altCode = decorateAltCode(
            lines
              .slice(delimiterIndex + 1)
              .map((line) => line.substring(2))
              .join("\n"),
            type,
            "html"
          );
        }
      } else {
        const delimiterIndex = lines.indexOf(HTML_DELIMITER_START);
        const delimiterLastIndex = lines.indexOf(HTML_DELIMITER_END);
        if (delimiterIndex > -1 && delimiterLastIndex > delimiterIndex) {
          code = lines.slice(0, delimiterIndex).join("\n");
          altCode = decorateAltCode(
            lines.slice(delimiterIndex + 1, delimiterLastIndex).join("\n"),
            type,
            "yaml"
          );
        }
      }
      return { type, code, altCode };
    }
  }, [props.children, props.className, props.preview]);

  if (previewData) {
    const { type, code, altCode } = previewData;
    return (
      <NextExample
        type={type}
        code={code}
        altCode={altCode}
        hiddenStyle={
          props.gap
            ? `#preview-root { display: flex; flex-wrap: wrap; gap: ${
                props.gap === true ? "0.27em" : props.gap
              }; }`
            : undefined
        }
      />
    );
  }
  return <CodeBlock {...props} />;
}
