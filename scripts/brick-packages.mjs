import path from "node:path";
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import getBricksDir from "./getBricksDir.js";

const bricksDir = getBricksDir();

const dirs = await readdir(bricksDir, { withFileTypes: true });

const packages = [];

await Promise.all(
  dirs.map(async (dir) => {
    if (dir.isDirectory()) {
      const pkgPath = path.join(bricksDir, dir.name);
      const manifestJsonPath = path.join(pkgPath, "dist/manifest.json");
      if (existsSync(manifestJsonPath)) {
        const manifest = (await import(manifestJsonPath, { assert: { type: "json" } })).default;
        if (manifest.bricks.length > 0 || (manifest.providers ?? []).length > 0) {
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
