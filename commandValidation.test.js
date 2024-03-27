const { commandValidation } = require("./commandValidation");

describe("commandValidation:", () => {
  test("should return object like { path, outputFile, format }", () => {
    const validArgs = commandValidation([
      "C:\\Program Files\\nodejs\\node.exe",
      "C:\\Універ\\Методологія\\lab2\\main",
      "markdown.md",
      "--out",
      "index.html",
      "--format",
      "ansi",
    ]);
    expect(validArgs).toHaveProperty("path");
    expect(validArgs).toHaveProperty("outputFile");
    expect(validArgs).toHaveProperty("format");
  });

  test("should throw error if wrong argumets provided", () => {
    const testFunction = () => {
      commandValidation([
        "C:\\Program Files\\nodejs\\node.exe",
        "C:\\Універ\\Методологія\\lab2\\main",
        "markdown.md",
        "--out",
        "index.html",
        "--format",
        "wrongformat",
      ]);
    };
    expect(testFunction).toThrow("wrong format");
  });

  test("if format is wrong  then throw error", () => {
    const testFunction = () => {
      commandValidation([
        "C:\\Program Files\\nodejs\\node.exe",
        "C:\\Універ\\Методологія\\lab2\\main",
        "markdown.md",
        "--out",
        "index.nothtml",
        "--format",
        "html",
      ]);
    };
    expect(testFunction).toThrow(
      "you have chosen html format but gave file  name without .html extension"
    );
  });
});
