const { convertMarkdown } = require("./convertMarkdownd");
const { conversionsHTML, conversionsAnsi } = require("./conversionsRegExpr");
const { htmlFileWrapper } = require("./htmlFileWrapper");
describe("convertMarkdown with HTML conversions: ", () => {
  test("should throw an error when gets a wrong md file with nested tags", () => {
    const wrapper = () => {
      convertMarkdown("**_bold_**", conversionsHTML);
    };
    expect(wrapper).toThrow("Wrong file");
  });
  test("should throw an error when gets a wrong md file with nested tags", () => {
    const wrapper = () => {
      convertMarkdown("_**bold**_", conversionsHTML);
    };
    expect(wrapper).toThrow("Wrong file");
  });
   test("should throw an error when gets a wrong md file with nested tags", () => {
     const wrapper = () => {
       convertMarkdown("`**bold**`", conversionsHTML);
     };
     expect(wrapper).toThrow("Wrong file");
   });
    test("should throw an error when gets a wrong md file with nested tags", () => {
      const wrapper = () => {
        convertMarkdown("_`bold`_", conversionsHTML);
      };
      expect(wrapper).toThrow("Wrong file");
    });
  test("should throw an error when gets a wrong md file with  unclosed tag", () => {
    const wrapper = () => {
      convertMarkdown(`This is **unclosed tag`, conversionsHTML);
    };
    expect(wrapper).toThrow("Wrong file");
  });
  const expectedHTMLWithBold = htmlFileWrapper(`<p>This is <b>bold</b></p>`);
  test("should return right html file with bold text in p tag", () => {
    expect(convertMarkdown(`This is **bold**`, conversionsHTML)).toBe(
      expectedHTMLWithBold
    );
  });
  const expectedHTMLWithItalic = htmlFileWrapper(
    `<p>This is <em>italic</em></p>`
  );
  test("should return right html file with italic text in em tag", () => {
    expect(convertMarkdown(`This is _italic_`, conversionsHTML)).toBe(
      expectedHTMLWithItalic
    );
  });
  const expectedHTMLWithPreformated = htmlFileWrapper(`<p><pre>
This text is **preformated**

And can have multiple paragraphs
</pre></p>
<p><pre>

This text is second and also \`preformated\`

And can have multiple paragraphs
Also shouldn't do _italic text_
</pre></p>`);
  test("should return right html file with preformated text in pre tag with p tags", () => {
    expect(
      convertMarkdown(
        `
\`\`\`
This text is **preformated**

And can have multiple paragraphs
\`\`\`\n

\`\`\`

This text is second and also \`preformated\`

And can have multiple paragraphs
Also shouldn't do _italic text_
\`\`\`
`,
        conversionsHTML
      )
    ).toBe(expectedHTMLWithPreformated);
  });
  const expectedHTMLMonospacesd = htmlFileWrapper(
    `<p><tt>Monospaced text</tt></p>`
  );
  test("should return right html file with monospaced text with right tt tags", () => {
    expect(convertMarkdown(`\`Monospaced text\``, conversionsHTML)).toBe(
      expectedHTMLMonospacesd
    );
  });

  const expectedHTMLParagraphs = htmlFileWrapper(
    `<p><b>Bold text</b></p>
<p><em>italic text</em></p>
<p><tt>Monospaced text</tt></p>
<p><pre>Preformated text
    **not Bold**
    _not Italic_
</pre></p>`
  );
  test("should return right html file with right paragraphs", () => {
    expect(
      convertMarkdown(
        `**Bold text**\n

_italic text_\n

\`Monospaced text\`\n

\`\`\`Preformated text
    **not Bold**
    _not Italic_
\`\`\`
`,
        conversionsHTML
      )
    ).toBe(expectedHTMLParagraphs);
  });
  const expectedHTMLWithUnderscore = htmlFileWrapper(
    `<p>_ This is underscore 
<em>this is italic</em></p>`
  );
  test("should return right html file with italic text in em tag", () => {
    expect(
      convertMarkdown(
        `_ This is underscore 
_this is italic_
`,
        conversionsHTML
      )
    ).toBe(expectedHTMLWithUnderscore);
  });
  const expectedHTMLWithUnderscoreNested = htmlFileWrapper(
    `<p><tt>_</tt> this is possible</p>`
  );
  test("should return right html file with italic text in em tag", () => {
    expect(
      convertMarkdown(
        `\`_\` this is possible
`,
        conversionsHTML
      )
    ).toBe(expectedHTMLWithUnderscoreNested);
  });
  const expectedHTMLWithSnakeCase = htmlFileWrapper(`<p>snake_case</p>`);
  test("should return right html file with italic text in em tag", () => {
    expect(convertMarkdown(`snake_case`, conversionsHTML)).toBe(
      expectedHTMLWithSnakeCase
    );
  });
});

describe("convertMarkdown with ANSI conversions:", ()=>{
  const expectedBoldAnsi = "\x1b[1mBold text\x1b[0m";
  test("should return right escape sequence with bold", ()=>{
    expect(convertMarkdown(`**Bold text**`, conversionsAnsi)).toBe(expectedBoldAnsi);
  });
   const expectedItalicAnsi = "\x1b[3mitalic\x1b[0m";
   test("should return right escape sequence with italic", () => {
     expect(convertMarkdown(`_italic_`, conversionsAnsi)).toBe(
       expectedItalicAnsi
     );
   });
   const expectedMonospacedAnsi = "\x1b[7mmonospaced\x1b[0m";
   test("should return right escape sequence with italic", () => {
     expect(convertMarkdown(`\`monospaced\``, conversionsAnsi)).toBe(
       expectedMonospacedAnsi
     );
   });
   const expectedPreformatedAnsi = `\x1b[7m
This is preformated text
_italic_
**bold**

\x1b[0m
\x1b[7mMonospaced\x1b[0m`;
   test("should return right escape sequence with italic", () => {
     expect(convertMarkdown(`\`\`\`
This is preformated text
_italic_
**bold**

\`\`\`
\`Monospaced\`
`, conversionsAnsi)).toBe(
       expectedPreformatedAnsi
     );
   });

});