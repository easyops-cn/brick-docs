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
      const typesJsonPath = path.join(pkgPath, "dist/types.json");
      let types = {};
      if (existsSync(typesJsonPath)) {
        types = (await import(typesJsonPath, { assert: { type: "json" } })).default;
      }
      if (existsSync(manifestJsonPath)) {
        const manifest = (await import(manifestJsonPath, { assert: { type: "json" } })).default;
        if (manifest.bricks.length > 0) {
          packages.push({
            path: pkgPath,
            manifest: {
              ...manifest,
              bricks: manifest.bricks.map(brick => {
                if (types[brick.name]) {
                  return {
                    ...brick,
                    types: types[brick.name],
                  }
                }
                return brick;
              })
            }
          });
        }
      }
    }
  })
);

export default packages;
