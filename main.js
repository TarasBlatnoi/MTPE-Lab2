const fs = require("fs").promises;
const { commandValidation } = require("./commandValidation");
const { checkMdPath } = require("./checkMdPath");
const { convertMarkdown } = require("./convertMarkdownd");
const { conversionsHTML, conversionsAnsi } = require("./conversionsRegExpr");

const commandArgs = commandValidation(process.argv);

async function main(path) {
  const mdRightPath = await checkMdPath(path);
  let data;
  if (mdRightPath) {
    data = await fs.readFile(mdRightPath, "utf-8");
  }
  let convertedMd;
  if (data) {
    if (commandArgs.format === "html") {
      convertedMd = convertMarkdown(data, conversionsHTML);
    } else if (commandArgs.format === "ansi") {
      convertedMd = convertMarkdown(data, conversionsAnsi);
    } else if (!commandArgs.format && commandArgs.outputFile) {
      convertedMd = convertMarkdown(data, conversionsHTML);
    } else if (!commandArgs.outputFile && !commandArgs.format) {
      convertedMd = convertMarkdown(data, conversionsAnsi);
    }
  } else {
    console.log(`Couldn't read the file`);
  }
  if (commandArgs.outputFile && convertedMd) {
    await fs.writeFile(commandArgs.outputFile, convertedMd);
    console.log("File created and content written successfully.");
  } else {
    console.log(convertedMd);
  }
}

if (commandArgs.path) main(commandArgs.path);
