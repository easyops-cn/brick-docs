import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import packages from "./brick-packages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targetBricksDir = path.join(__dirname, "../docs/bricks");
if (existsSync(targetBricksDir)) {
  await rm(targetBricksDir, { recursive: true, force: true });
}
await mkdir(targetBricksDir);
await writeFile(path.join(targetBricksDir, ".gitignore"), "*");

for (const { path: pkgPath, manifest } of packages) {
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
    const targetFilePath = path.join(targetDir, `${lastName}.md`);

    const srcFilePath = path.join(srcDocsDir, `${brick.name}.md`);
    const srcFilePathAlt = path.join(srcDocsDir, `${lastName}.md`);

    /** @type {string} */
    let brickDoc;
    if (existsSync(srcFilePath)) {
      brickDoc = await readFile(srcFilePath, "utf-8");
    } else if (existsSync(srcFilePathAlt)) {
      brickDoc = await readFile(srcFilePathAlt, "utf-8");
    } else {
      brickDoc = brick.description ?? "";
    }

    const content =
`---
description: ${JSON.stringify(`<${brick.name}>`)}
---

import BrickTagName from "@site/src/components/BrickTagName";
import BrickDocProperties from "@site/src/components/BrickDocProperties";
import BrickDocSlots from "@site/src/components/BrickDocSlots";
import BrickDocEvents from "@site/src/components/BrickDocEvents";
import BrickDocMethods from "@site/src/components/BrickDocMethods";

<BrickTagName name=${JSON.stringify(brick.name)} />

${brickDoc}

${
  brick.properties.length > 0
    ?
`## Properties

<BrickDocProperties properties={${JSON.stringify(brick.properties)}} />`
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

<BrickDocEvents events={${JSON.stringify(brick.events)}} />`
    : ""
}

${
  brick.methods.length > 0
    ?
`## Methods

<BrickDocMethods methods={${JSON.stringify(brick.methods)}} />`
    : ""
}
`;
    await writeFile(targetFilePath, content);
  }
}
