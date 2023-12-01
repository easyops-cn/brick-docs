import { extractExamplesInMarkdown, htmlToYaml, yamlToHtml, htmlTagEntity } from "@next-core/doc-helpers";

const YAML_DELIMITER = "# -- YAML DELIMITER (1nbbm8) --";
const HTML_DELIMITER_START = "<!-- HTML DELIMITER start (1nbbm8) --";
const HTML_DELIMITER_END = "-- HTML DELIMITER end (1nbbm8) -->";

const YAML_HEADING_DELIMITER_START = "# -- YAML HEADING DELIMITER start (1nbbm8) --";
const YAML_HEADING_DELIMITER_END = "# -- YAML HEADING DELIMITER end (1nbbm8) --";
const HTML_HEADING_DELIMITER_START = "<!-- HTML HEADING DELIMITER start (1nbbm8) --";
const HTML_HEADING_DELIMITER_END = "-- HTML HEADING DELIMITER end (1nbbm8) -->";

/**
 * @param {string} examplePath
 * @param {string} markdown
 * @param {any[]} manifests
 */
export async function handleExamplesInMarkdown(examplePath, markdown, manifests) {
  const examples = extractExamplesInMarkdown(markdown, "");
  let cursor = 0;
  const chunks = [];
  /** @type {string | undefined} */
  let lastHeading;
  /** @type {Set<string>} */
  const usedLabels = new Set();
  for (const example of examples) {
    let nextCursor = example.codeIndex + example.code.length;
    chunks.push(
      markdown.substring(cursor, nextCursor)
    );
    const fixedHeading = (example.heading ?? lastHeading)?.trim().toLowerCase();
    lastHeading = fixedHeading;
    const label = getDeduplicatedKey(fixedHeading ? `${examplePath}/${fixedHeading}` : examplePath, usedLabels);
    usedLabels.add(label);
    if (example.mode === "yaml") {
      const html = await yamlToHtml(example.code, manifests);
      chunks.push(
        `${YAML_HEADING_DELIMITER_START}\n`,
        label,
        `\n${YAML_HEADING_DELIMITER_END}\n`,
      );
      chunks.push(
        `${YAML_DELIMITER}\n`,
        html.split("\n").map(
          line => `# ${line}`
        ).join("\n"),
        "\n"
      );
    } else {
      const yaml = htmlToYaml(example.code, manifests);
      chunks.push(
        `${HTML_HEADING_DELIMITER_START}\n`,
        htmlTagEntity(label),
        `\n${HTML_HEADING_DELIMITER_END}\n`,
      );
      chunks.push(
        `${HTML_DELIMITER_START}\n`,
        htmlTagEntity(yaml),
        `\n${HTML_DELIMITER_END}\n`,
      );
    }
    cursor = nextCursor;
  }
  chunks.push(markdown.substring(cursor));
  return chunks.join("");
}

/**
 * @param {string} key
 * @param {Set<string>} used
 * @returns {string}
 */
function getDeduplicatedKey(key, used) {
  let count = 2;
  let cursor = key;
  while (used.has(cursor)) {
    cursor = `${key} (${count})`;
    count++;
  }
  return cursor;
}
