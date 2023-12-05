import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { getExamples } from "@next-core/doc-helpers";
import packages from "./brick-packages.mjs";
import getBricksDir from "./getBricksDir.js";
import { handleExamplesInMarkdown } from "./utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bricksDir = getBricksDir();
const manifests = packages.map(({ manifest }) => manifest);
const examplesJson = JSON.stringify({ examples: await getExamples(bricksDir, manifests) });
await writeFile(path.join(__dirname, "../src/examples.json"), examplesJson);

const targetBricksDir = path.join(__dirname, "../docs/bricks");
if (existsSync(targetBricksDir)) {
  await rm(targetBricksDir, { recursive: true, force: true });
}
await mkdir(targetBricksDir);
await writeFile(path.join(targetBricksDir, ".gitignore"), "*");

for (const { path: pkgPath, manifest, types } of packages) {
  const srcDocsDir = path.join((`${pkgPath}/package.json`), "../docs");
  const targetDir = path.join(targetBricksDir, manifest.name);
  await mkdir(targetDir);

  await writeFile(path.join(targetDir, "_category_.json"), JSON.stringify({
    "link": {
      "type": "generated-index",
      "title": `Brick package: ${manifest.name}`,
      description: manifest.description,
      slug: `/bricks/category/${manifest.name}`,
    }
  }, null, 2));

  for (const brick of manifest.bricks) {
    const nameParts = brick.name.split(".");
    const lastName = nameParts.pop();
    const targetFilePath = path.join(targetDir, `${lastName}.mdx`);

    const srcFilePath = path.join(srcDocsDir, `${brick.name}.md`);
    const srcFilePathAlt = path.join(srcDocsDir, `${lastName}.md`);

    const examplePath = `${path.basename(pkgPath)}/${lastName}`;

    /** @type {string} */
    let brickDoc;
    if (existsSync(srcFilePath)) {
      brickDoc = await handleExamplesInMarkdown(examplePath, await readFile(srcFilePath, "utf-8"), manifests);
    } else if (existsSync(srcFilePathAlt)) {
      brickDoc = await handleExamplesInMarkdown(examplePath, await readFile(srcFilePathAlt, "utf-8"), manifests);
    } else {
      brickDoc = brick.description ?? "";
    }
    const typeRefs = brick.types?.map((item) => item.name);

    const content =
`---
description: ${JSON.stringify(`<${brick.name}>`)}
---

import BrickTagName from "@site/src/components/BrickTagName";
import BrickDocProperties from "@site/src/components/BrickDocProperties";
import BrickDocSlots from "@site/src/components/BrickDocSlots";
import BrickDocEvents from "@site/src/components/BrickDocEvents";
import BrickDocMethods from "@site/src/components/BrickDocMethods";
import BrickDocParts from "@site/src/components/BrickDocParts";
import BrickDocTypes from "@site/src/components/BrickDocTypes";
import { TypeReferencesContext } from "@site/src/components/GeneralType";

<BrickTagName name=${JSON.stringify(brick.name)} alias={${JSON.stringify(brick.alias ?? null)}} insider={${brick.insider}} />

${brickDoc}

${
  brick.properties.length > 0
    ?
`## Properties

<TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
  <BrickDocProperties properties={${JSON.stringify(brick.properties)}} />
</TypeReferencesContext.Provider>`
    : ""
}

${
  brick.slots.length > 0
    ?
`## Slots

<BrickDocSlots slots={${JSON.stringify(brick.slots)}} />`
    : ""
}

${
  brick.events.length > 0
    ?
`## Events

<TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
  <BrickDocEvents events={${JSON.stringify(brick.events)}} />
</TypeReferencesContext.Provider>`
    : ""
}

${
  brick.methods.length > 0
    ?
`## Methods

<TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
  <BrickDocMethods methods={${JSON.stringify(brick.methods)}} />
</TypeReferencesContext.Provider>`
    : ""
}

${
  brick.parts && brick.parts.length > 0
    ?
`## Parts

<BrickDocParts parts={${JSON.stringify(brick.parts)}} />
`
    : ""
}

${
  brick.types && brick.types.length > 0
  ?
`## Type references

<BrickDocTypes types={${JSON.stringify(brick.types)}} />`
  : ""
}

`;
    await writeFile(targetFilePath, content);
  }

  for (const provider of manifest.providers ?? []) {
    const nameParts = provider.name.split(".");
    const lastName = nameParts.pop();
    const targetFilePath = path.join(targetDir, `${lastName}.mdx`);

    const srcFilePath = path.join(srcDocsDir, `${provider.name}.md`);
    const srcFilePathAlt = path.join(srcDocsDir, `${lastName}.md`);

    const examplePath = `${path.basename(pkgPath)}/${lastName}`;

    /** @type {string} */
    let brickDoc;
    if (existsSync(srcFilePath)) {
      brickDoc = await handleExamplesInMarkdown(examplePath, await readFile(srcFilePath, "utf-8"), manifests);
    } else if (existsSync(srcFilePathAlt)) {
      brickDoc = await handleExamplesInMarkdown(examplePath, await readFile(srcFilePathAlt, "utf-8"), manifests);
    } else {
      continue;
    }

    const providerTypes = Object.hasOwnProperty.call(types, provider.name) ? types[provider.name] : null;
    let definitionDoc = "";
    if (providerTypes) {
      const typeRefs = providerTypes.types?.map((item) => item.name);
      definitionDoc = `## Definition

${
  providerTypes.typeParameters ?
`<pre>
  <code>
    <TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
      <GeneralType annotation={${JSON.stringify(providerTypes.typeParameters)}} />
    </TypeReferencesContext.Provider>
  </code>
</pre>` : ""
}

### Parameters

<TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
  <ProviderDocParams params={${JSON.stringify(providerTypes.params)}} />
</TypeReferencesContext.Provider>

### Returns

<p>
  <MaybeEmptyCode>
    <TypeReferencesContext.Provider value={${JSON.stringify(typeRefs)}}>
      <GeneralType annotation={${JSON.stringify(providerTypes.returns.annotation)}} />
    </TypeReferencesContext.Provider>
  </MaybeEmptyCode>
</p>

${providerTypes.returns.description ?? ""}

${providerTypes.types?.length > 0
  ?
`## Type references

<BrickDocTypes types={${JSON.stringify(providerTypes.types)}} />`
: ""}
`;
    }

    const content =
`---
description: ${JSON.stringify(`<${provider.name}>`)}
---

import BrickTagName from "@site/src/components/BrickTagName";
import GeneralType, { TypeReferencesContext } from "@site/src/components/GeneralType";
import MaybeEmptyCode from "@site/src/components/MaybeEmptyCode";
import ProviderDocParams from "@site/src/components/ProviderDocParams";
import BrickDocTypes from "@site/src/components/BrickDocTypes";

<BrickTagName name=${JSON.stringify(provider.name)} isProvider />

${brickDoc}

${definitionDoc}
`;
    await writeFile(targetFilePath, content);
  }
}
