const numSet = new Set();
numSet.add(1);
numSet.add(1);
numSet.add(2);
numSet.add(2);
numSet.add(5);
numSet.add(9);
console.log(numSet);

numSet.forEach((item) => console.log(item));

const dict = new Map();
dict.set('dsad', 12);
dict.set('dsad', 1);
dict.set('sda', 145);
dict.set('dssd', 12);
console.log(dict);
console.log(dict.get('sda'));
