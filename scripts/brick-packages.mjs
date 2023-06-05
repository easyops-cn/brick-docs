import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {string} */
let bricksDir;
const ciBricksDir = path.join(__dirname, "../ci-bricks/bricks");

if (existsSync(ciBricksDir)) {
  bricksDir = ciBricksDir;
} else {
  bricksDir = path.join(__dirname, "../bricks/bricks");
}

const dirs = await readdir(bricksDir, { withFileTypes: true });

const packages = [];

await Promise.all(
  dirs.map(async (dir) => {
    if (dir.isDirectory()) {
      const pkgPath = path.join(bricksDir, dir.name);
      const manifestJsonPath = path.join(pkgPath, "dist/manifest.json");
      if (existsSync(manifestJsonPath)) {
        const manifest = (await import(manifestJsonPath, { assert: { type: "json" } })).default;
        if (manifest.bricks.length > 0) {
          packages.push({
            path: pkgPath,
            manifest
          });
        }
      }
    }
  })
);

export default packages;