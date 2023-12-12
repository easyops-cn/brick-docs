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
      const storiesJson = path.join(pkgPath, "dist/stories.json");
      let types = {};
      if (existsSync(typesJsonPath)) {
        types = (await import(typesJsonPath, { assert: { type: "json" } })).default;
      }
      let stories = [];
      if (existsSync(storiesJson)) {
        stories = (await import(storiesJson, { assert: { type: "json" } })).default;
      }
      if (existsSync(manifestJsonPath)) {
        const manifest = (await import(manifestJsonPath, { assert: { type: "json" } })).default;
        if (manifest.bricks.length > 0 || (manifest.providers ?? []).length > 0) {
          packages.push({
            path: pkgPath,
            manifest: {
              ...manifest,
              bricks: manifest.bricks.map(brick => {
                if (Object.hasOwnProperty.call(types, brick.name)) {
                  const { properties = [], events = [], methods = [] } = brick;
                  const { properties: typeProperties = [], events: typeEvents = [], methods: typeMethods = [], types: typeTypes = [], } = types[brick.name]
                  return {
                    ...brick,
                    properties: properties.map(field => {
                      const matchProperty = typeProperties.find(item => field.name === item.name);
                      if (matchProperty) {
                        return {
                          ...field,
                          ...matchProperty,
                        }
                      }
                      return field
                    }),
                    events: events.map(field => {
                      const matchEvent = typeEvents.find(item => field.name === item.name)
                      if (matchEvent) {
                        return {
                          ...field,
                          detail: {
                            ...field.detail,
                            ...matchEvent.detail,
                          }
                        }
                      }
                      return field
                    }),
                    methods: methods.map(field => {
                      const matchMethod = typeMethods.find(item => field.name === item.name)
                      if (matchMethod) {
                        return {
                          ...field,
                          params: field.params.map((param, index) => ({
                            ...param,
                            ...matchMethod.params?.[index],
                          })),
                          returns: {
                            ...field.returns,
                            ...matchMethod.returns,
                          }
                        }
                      }
                      return field
                    }),
                    types: typeTypes,
                  }
                }
                return brick;
              })
            },
            types,
            stories,
          });
        }
      }
    }
  })
);

export default packages;
