const { commandValidation } = require("./commandValidation");

describe("commandValidation:", () => {
  let argsArr;
  beforeEach(() => {
    argsArr = [
      "C:\\Program Files\\nodejs\\node.exe",
      "C:\\Універ\\Методологія\\lab2\\main",
      "markdown.md",
      "--out",
      "index.html",
      "--format",
      "ansi",
    ];
  });
  test("should return object like { path, outputFile, format }", () => {
    const validArgs = commandValidation(argsArr);
    expect(validArgs).toHaveProperty("path");
    expect(validArgs).toHaveProperty("outputFile");
    expect(validArgs).toHaveProperty("format");
  });

  test("should throw error if wrong argumets provided", () => {
    argsArr.pop();
    argsArr.push("wrong format");
    const testFunction = () => {
      commandValidation(argsArr);
    };
    expect(testFunction).toThrow("wrong format");
  });

  test("if format is wrong  then throw error", () => {
    argsArr = [
      "C:\\Program Files\\nodejs\\node.exe",
      "C:\\Універ\\Методологія\\lab2\\main",
      "markdown.md",
      "--out",
      "index.nothtml",
      "--format",
      "html",
    ];
    const testFunction = () => {
      commandValidation(argsArr);
    };
    expect(testFunction).toThrow(
      "you have chosen html format but gave file  name without .html extension"
    );
  });
});
