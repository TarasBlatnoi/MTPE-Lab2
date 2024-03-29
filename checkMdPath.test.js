const { checkMdPath } = require("./checkMdPath");

describe("checkMdPath", () => {
  test("should return error not md file", async () => {
    // try {
    //   await checkMdPath("markdown.notmd");
    // } catch (err) {
    //   expect(err).toBeInstanceOf(Error);
    //   expect(err.message).toBe("not md file");
    // }
    await expect(checkMdPath("markdown.notmd")).rejects.toThrow("not md file");
  });
  test("should return path if it's md file and it exists and not empty", async () => {
    const path = "markdown.md";
    const res = await checkMdPath(path);
    expect(res).toBe(path);
  });
  test("shoud trow  an error when the file is empty", async () => {
    checkMdPath("test.md").catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });
  test("should return an error if file doesn't exist", async () => {
    checkMdPath("notExistingFile").catch((err) =>
      expect(err).toBeInstanceOf(Error)
    );
  });
});
