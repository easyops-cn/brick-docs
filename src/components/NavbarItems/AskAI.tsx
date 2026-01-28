import React, { useEffect, useState } from "react";
import { AskAIWidget } from "open-ask-ai";
import { useColorMode, type ColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const exampleQuestionsEn = [
  "What is Brick Next?",
  "What is a custom template and how to use it?",
  "How to add event listeners in Brick Next?",
];

const exampleQuestionsZh = [
  "什么是 Brick Next？",
  "什么是自定义模板，如何使用？",
  "如何在 Brick Next 中添加事件监听器？",
];

export default function AskAI() {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState<ColorMode>("light");
  const { i18n } = useDocusaurusContext();
  const { currentLocale } = i18n;

  useEffect(() => {
    setTheme(colorMode);
  }, [colorMode]);

  return (
    <AskAIWidget
      className="ask-ai-navbar-item"
      theme={theme}
      projectId="bricks"
      apiUrl="https://lab.shenwei.xyz"
      exampleQuestions={
        currentLocale === "zh" ? exampleQuestionsZh : exampleQuestionsEn
      }
      systemPrompt="You are a documentation assistant for Bricks (构件). Be concise and accurate. Output in markdown format, use proper formatting such as inline code when referring to code elements. Use YAML to represent example code snippets. Use the user's language for responses."
    />
  );
}
