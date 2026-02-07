function isValid(str: string): boolean {
  const map = new Map();
  map.set('(', ')');
  map.set('[', ']');
  map.set('{', '}');
  const stack = [];
  for (const char of str) {
    if (map.has(char)) {
      stack.push(map.get(char));
    } else {
      if (stack.pop() !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
console.log(isValid('(()){}{{{{{{'));
console.log(isValid('(()){[]}'));
