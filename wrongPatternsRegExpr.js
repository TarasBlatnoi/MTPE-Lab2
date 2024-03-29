const wrongPatterns = [
  {
    pattern: /wrong pattern/g,
  },
  {
    pattern: /\_.*(\`|\_|(\*\*)).*(\`|\_|(\*\*)).*\_/g,
  },
  {
    pattern: /\`.*(\`|\_|(\*\*)).*(\`|\_|(\*\*)).*\`/g,
  },
  {
    pattern: /(?<=(^| )\*\*)[^ \n][^**\n]*$/gm,
  },
  {
    pattern: /(?<=(^| )\`)[^ \n][^`\n]*$/gm,
  },
  {
    pattern: /(?<=(^| )\_)[^ \n][^_\n]*$/gm,
  },
];
  

module.exports = {wrongPatterns}