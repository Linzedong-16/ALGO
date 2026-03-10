/**
 *
 * @param {string} codeStr
 */
const isValid = function (codeStr) {
  const mappings = new Map();
  mappings.set('(', ')');
  mappings.set('[', ']');
  mappings.set('{', '}');
  const stack = []; // 只存储 ) } ]
  for (const char of codeStr) {
    if (mappings.has(char)) {
      stack.push(mappings.get(char));
    } else {
      if (stack.pop() !== char) {
        console.log(stack.toString());
        return false;
      }
    }
  }
  console.log(stack.toString());
  return stack.length === 0;
};

console.log(isValid('(()){}{{{{{{'));
