export function stripIndent(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const str = strings.reduce((prev, current, index) => {
    let value = values[index] || '';
    // If the value is an array or a string, concatenate it to the previous string
    if (Array.isArray(value)) {
      value = value.join('');
    }
    return prev + current + value;
  }, '');

  // Find the common leading whitespace to remove
  const lines = str.split('\n').filter((line) => line.trim() !== '');
  const leadingWhitespace = lines.reduce((minWhitespace, line) => {
    const whitespace = line.match(/^\s*/)?.[0] || '';
    if (!minWhitespace || whitespace.length < minWhitespace.length) {
      return whitespace;
    }
    return minWhitespace;
  }, '');

  // Remove the leading whitespace
  return lines.map((line) => line.replace(leadingWhitespace, '')).join('\n');
}
