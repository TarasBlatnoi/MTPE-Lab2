const {htmlFileWrapper} = require('./htmlFileWrapper');
describe("htmlFileWrapper:", () => {
  test("should return html tags wrapped in html file", () => {
    const expectedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>my p tag</p>
</body>
</html>`;
    expect(htmlFileWrapper(`<p>my p tag</p>`)).toBe(expectedHTML);
  });
});
