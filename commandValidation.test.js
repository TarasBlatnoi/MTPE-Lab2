const { commandValidation } = require("./commandValidation");

test("validateCommand should return object like { path, outputFile }", () => {
  expect(
    commandValidation([
      "C:\\Program Files\\nodejs\\node.exe",
      "C:\\Універ\\Методологія\\lab2\\main",
      "markdown.md",
      "--out",
      "index.html",
      "--format",
      "ansi",
    ])
  ).toStrictEqual({
    path: "markdown.md",
    outputFile: "index.html",
    format: "ansi",
  });
});
