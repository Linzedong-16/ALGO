import readline from 'node:readline/promises';
import process from 'node:process';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.trim());
});

rl.on('close', () => {
  console.log(lines);
});
