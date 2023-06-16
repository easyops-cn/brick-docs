const path = require("path");
const { existsSync } = require("fs");

/** @returns {string} */
module.exports = function getBricksDir() {
  /** @type {string} */
  let bricksDir;
  const ciBricksDir = path.join(__dirname, "../ci-bricks/bricks");

  if (existsSync(ciBricksDir)) {
    bricksDir = ciBricksDir;
  } else {
    const confFile = path.join(__dirname, "../dev.config.js");
    if (existsSync(confFile)) {
      const conf = require(confFile);
      bricksDir = conf.bricksDir;
    } else {
      const possibleBricksDir = path.join(
        __dirname,
        "../../next-bricks/bricks"
      );
      if (existsSync(possibleBricksDir)) {
        bricksDir = possibleBricksDir;
      }
    }
  }

  if (!bricksDir) {
    throw new Error("Please export `bricksDir` in `dev.config.js`");
  }

  return bricksDir;
};
