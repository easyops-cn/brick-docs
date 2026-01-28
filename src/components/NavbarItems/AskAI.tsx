import React, { useEffect, useState } from "react";
import { AskAIWidget } from "open-ask-ai";
import { useColorMode, type ColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const exampleQuestionsEn = [
  "How to use dynamic columns in the table brick?",
  "What are the usage scenarios of the eo-draw-canvas brick?",
  "How to configure dynamic forms?",
];

const exampleQuestionsZh = [
  "表格构件如何使用动态列？",
  "eo-draw-canvas 构件有哪些用法？",
  "如何配置动态表单？",
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
      systemPrompt="You are a documentation assistant for Bricks (构件), developed by UWinTech (优维科技). Be concise and accurate. Output in markdown format, use proper formatting such as inline code when referring to code elements. Use YAML to represent example code snippets. Use the user's language for responses."
    />
  );
}
