const { wrongPatterns } = require("./wrongPatternsRegExpr");
const { htmlFileWrapper } = require("./htmlFileWrapper");
function convertMarkdown(markdown, conversions) {
  const mistakes = wrongPatterns.filter(({ pattern }) =>
    pattern.test(markdown)
  );

  if (mistakes.length > 0) {
    throw Error("Wrong file");
  }
  
  const regexForPre = /\`\`\`([\s\S]+?)\`\`\`/g;
  const matchesPre = [...markdown.matchAll(regexForPre)];
  if (conversions.type === "HTML") {
    for (let match of matchesPre) {
      match[0] = match[0].replace(regexForPre, "<pre>$1</pre>");
    }
  } else {
    for (let match of matchesPre) {
      
      match[0] = match[0].replace(regexForPre, "\x1b[7m$1\x1b[0m");
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
    return htmlFileWrapper(replacedText);
  } else {
    const regExpr =
      /\x1b\[7mPREFORMATED_PLACEHOLDER[\s\S]*PREFORMATED_PLACEHOLDER\x1b\[0m/gm;
    const replacedText = paragraphsReplaced.replace(regExpr, () => {
      const element = matchesPre.shift();
      return element[0];
    });
    return replacedText;
  }
}

module.exports = { convertMarkdown };
