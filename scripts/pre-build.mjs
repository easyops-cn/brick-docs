import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import manifestOfE2e from "@next-bricks/e2e/dist/manifest.json" assert { type: "json" };
import manifestOfIcons from "@next-bricks/icons/dist/manifest.json" assert { type: "json" };

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const packages = [manifestOfE2e, manifestOfIcons];

for (const pkg of packages) {
  const srcDocsDir = path.join(require.resolve(`${pkg.package}/package.json`), "../docs");
  const targetDir = path.join(__dirname, "../docs/bricks", pkg.name);
  if (existsSync(targetDir)) {
    await rm(targetDir, { recursive: true, force: true });
  }
  await mkdir(targetDir, { recursive: true });
  await writeFile(path.join(targetDir, ".gitignore"), "*");

  await writeFile(path.join(targetDir, "_category_.json"), JSON.stringify({
    "link": {
      "type": "generated-index",
      "title": `Brick package: ${pkg.name}`,
      description: pkg.description,
    }
  }, null, 2));

  for (const brick of pkg.bricks) {
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
description: ${JSON.stringify(`Brick: ${brick.name}`)}
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
