const { wrongPatterns } = require("./wrongPatternsRegExpr");

function convertMarkdown(markdown, conversions) {
  const mistakes = wrongPatterns.filter(({ pattern }) =>
    pattern.test(markdown)
  );
  if (mistakes.length > 0) {
    console.log("Wrong file");
    return;
  }
  const regexForPre = /\`\`\`([\s\S]+?)\`\`\`/g;
  const matchesPre = [...markdown.matchAll(regexForPre)];
  if (conversions.type === "HTML") {
    for (let match of matchesPre) {
      match[0] = match[0].replace(/\`\`\`([\s\S]+?)\`\`\`/g, "<pre>$1</pre>");
    }
  } else {
    for (let match of matchesPre) {
      match[0] = match[0].replace(
        /\`\`\`([\s\S]+?)\`\`\`/g,
        "\x1b[7m$1\x1b[27m\n"
      );
    }
  }

  const paragraphs = markdown.split(/^([a-zA-Z0-9]*)\s*\n\s*\n/gm);
  for (let i = 0; i < paragraphs.length; i++) {
    let element = paragraphs[i];
    if (!element) {
      paragraphs.splice(i, 1);
      i--;
    }
  }
  let paragraphsReplaced = paragraphs.map((paragraph) => {
    return conversions.type === "HTML"
      ? `<p>${paragraph.trim()}</p>`
      : `${paragraph.trim()}`;
  });
  paragraphsReplaced = paragraphsReplaced.join("\n");
  conversions.regExp.forEach(({ pattern, replacement }) => {
    paragraphsReplaced = paragraphsReplaced.replace(pattern, replacement);
  });
  if (conversions.type === "HTML") {
    const replacedText = paragraphsReplaced.replace(
      /<pre>[\s\S]*?<\/pre>/g,
      () => {
        const element = matchesPre.shift();
        return element[0];
      }
    );
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${replacedText}
</body>
</html>`;
  } else {
    const replacedText = paragraphsReplaced.replace(
      /\x1b\[7m[\s\S]*?\x1b\[27m\n/,
      () => {
        const element = matchesPre.shift();
        return element[0];
      }
    );
    return replacedText;
  }
}

module.exports = { convertMarkdown };
