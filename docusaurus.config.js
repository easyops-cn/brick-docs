// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { createHash } = require("crypto");
const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
const { existsSync, readdirSync, readFileSync } = require("fs");
const getBricksDir = require("./scripts/getBricksDir.js");

const bricksDir = getBricksDir();

const baseUrl = "/";

/** @type {{brickPackages: any[]; settings: { misc: Record<string, any>; };}} */
const bootstrapJson = {
  brickPackages: [],
  settings: {
    misc: {
      weather_api_key: "9e08e5e99e0c4b4c89023605231804",
    },
  },
};

/** @type {string[]} */
const brickPackagePaths = [];

for (const dir of readdirSync(bricksDir, { withFileTypes: true })) {
  if (dir.isDirectory()) {
    const pkgPath = path.join(bricksDir, dir.name);
    const bricksJsonPath = path.join(pkgPath, "dist/bricks.json");
    if (existsSync(bricksJsonPath)) {
      brickPackagePaths.push(pkgPath);
      const content = readFileSync(bricksJsonPath, "utf-8");
      const bricksJson = JSON.parse(content);
      bootstrapJson.brickPackages.push({
        ...bricksJson,
        filePath: `${baseUrl}preview/${bricksJson.filePath}`,
      });
    }
  }
}

bootstrapJson.settings.misc.local_editors = bootstrapJson.brickPackages.flatMap(
  (pkg) => (pkg.id ? pkg.editors ?? [] : pkg.propertyEditors ?? [])
);

const bootstrapJsonContent = JSON.stringify(bootstrapJson);
const bootstrapJsonHash = getContentHash(bootstrapJsonContent);
const bootstrapJsonPath = `bootstrap.${bootstrapJsonHash}.json`;

class EmitBootstrapJsonPlugin {
  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(
      "EmitBootstrapJsonPlugin",
      (compilation) => {
        compilation.hooks.processAssets.tapAsync(
          {
            name: "EmitBootstrapJsonPlugin",
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          async (unusedAssets, callback) => {
            const { RawSource } = compiler.webpack.sources;
            const source = new RawSource(bootstrapJsonContent);
            compilation.emitAsset(`preview/${bootstrapJsonPath}`, source);

            const todos = [
              {
                title: "Hard work",
                done: true,
              },
              {
                title: "Have launch",
                done: false,
              },
              {
                title: "Go on vacation",
                done: false,
              },
            ];
            const todosSource = new RawSource(JSON.stringify(todos, null, 2));
            compilation.emitAsset("preview/todos.json", todosSource);

            callback();
          }
        );
      }
    );
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Bricks",
  tagline: "A Web Components library designed for Brick Next",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://bricks.js.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "easyops-cn", // Usually your GitHub org/user name.
  projectName: "bricks", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh",
    locales: ["zh"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl: "https://github.com/easyops-cn/next-docs/tree/master/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/brick-next-social-card.png",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Bricks",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "/",
            label: "Docs",
            activeBaseRegex: "^/(?:bricks/|$)",
            position: "left",
          },
          {
            to: "icons",
            label: "Icons",
            position: "left",
          },
          {
            to: "playground",
            label: "Playground",
            position: "left",
          },
          {
            type: "search",
            position: "left",
            className: "header-search",
          },
          {
            type: "custom-uiVersionDropdown",
            position: "right",
            // items: [
            //   {
            //     label: "UI 8.2",
            //     href: "/",
            //   },
            //   {
            //     label: "UI 8.0",
            //     href: "/",
            //   },
            // ],
          },
          {
            href: "https://brick-next.js.org/",
            position: "right",
            label: "Brick Next",
          },
          {
            href: "https://github.com/easyops-cn/next-bricks",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Overview",
                to: "/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/easyops-cn/next-bricks",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Brick Next",
                href: "https://brick-next.js.org/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} UWinTech, Inc.`,
      },
      prism: {},
    }),

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      // /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        language: ["en", "zh"],
        removeDefaultStopWordFilter: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: "/",
        indexBlog: false,
      },
    ],
  ],

  plugins: [
    () => ({
      name: "docusaurus-next-runtime",
      configureWebpack() {
        const previewDir = path.join(
          require.resolve("@next-core/preview/package.json"),
          "../dist"
        );
        return {
          mergeStrategy: { "module.rules": "prepend" },
          devServer: {
            client: {
              overlay: false,
            },
          },
          module: {
            rules: [
              {
                test: /\.yaml/,
                type: "asset/source",
              },
            ],
          },
          plugins: [
            new CopyPlugin({
              patterns: [
                {
                  from: previewDir,
                  to: "preview",
                  // Terser skip this file for minimization
                  info: { minimized: true },
                  transform(buf, filePath) {
                    if (filePath === path.join(previewDir, "index.html")) {
                      return buf
                        .toString()
                        .replace("bootstrap.hash.json", bootstrapJsonPath)
                        .replace(
                          "</head>",
                          `<style>div#preview-root{padding:2em}</style></head>`
                        );
                    }
                    return buf;
                  },
                },
                ...brickPackagePaths.map((pkgPath) => ({
                  from: path.join(pkgPath, "dist"),
                  to: path.join(
                    "preview/bricks",
                    path.basename(pkgPath),
                    "dist"
                  ),
                  // Terser skip this file for minimization
                  info: { minimized: true },
                })),
              ],
            }),
            new EmitBootstrapJsonPlugin(),
            new MonacoEditorWebpackPlugin({
              languages: [
                "javascript",
                "typescript",
                "css" /* , 'html' , 'yaml' */,
              ],
              features: [
                // "!accessibilityHelp",
                "!codelens",
                "!colorPicker",
                "!documentSymbols",
                "!fontZoom",
                "!iPadShowKeyboard",
                "!inspectTokens",
                "!stickyScroll",
                "!links",
                "!inlayHints",
                "!documentSymbols",
                "!browser",
              ],
              filename: `workers/[name].[contenthash:8].worker.js`,
            }),
          ],
        };
      },
    }),
  ],
};

function getContentHash(content) {
  const hash = createHash("sha1");
  hash.update(content);
  return hash.digest("hex").slice(0, 8);
}

async function createConfig() {
  const lightCodeTheme = (await import("./src/utils/prismLight.mjs")).default;
  const darkCodeTheme = (await import("./src/utils/prismDark.mjs")).default;
  config.themeConfig.prism.theme = lightCodeTheme;
  config.themeConfig.prism.darkTheme = darkCodeTheme;
  return config;
}

module.exports = createConfig;

// module.exports = config;
