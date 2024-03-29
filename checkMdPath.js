const fs = require("fs").promises;
async function checkMdPath(path) {
  if (!path.endsWith(".md")) {
    throw new Error("not md file");
  }
  try {
    const stats = await fs.stat(path);

    if (stats.isFile() && stats.size > 0) {
      console.log(
        "File on this path with md extension exists and contains data"
      );
      return path;
    } else {
      throw new Error("File exists but is empty.");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("Wrong path to md file");
    } else {
      throw new Error("Error reading file:");
    }
  }
}

module.exports = { checkMdPath };
