function commandValidation(args) {
  const commandArgs = args.slice(2);
  const path = commandArgs[0];
  const outputFlag = commandArgs.indexOf("--out");
  const formatFlag = commandArgs.indexOf("--format");
  let format = "";
  let outputFile = "";
  if (formatFlag !== -1) {
    format = commandArgs[formatFlag + 1];
    if (format !== "html" && format !== "ansi") {
      throw new Error("wrong format");
    }
  }
  if (outputFlag !== -1) {
    outputFile = commandArgs[outputFlag + 1];
    if (format !== "ansi" && !outputFile.endsWith(".html")) {
      throw new Error(
        "you have chosen html format but gave file  name without .html extension"
      );
    }
  }

  return { path, outputFile, format };
}

module.exports = { commandValidation };
