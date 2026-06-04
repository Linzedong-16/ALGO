# js-edition

JavaScript Algorithm and Data Structure Practice Collection

## Project Overview

This project collects various algorithms, data structures, and front-end interview scenario questions implemented in JavaScript/TypeScript, suitable for front-end developers learning algorithm concepts or preparing for technical interviews.

## Directory Structure

```
src/
├── ACM/              # Algorithm competition-related code
├── base/             # Fundamental knowledge
│   └── 0.pre/        # Introductory prerequisites
│       ├── README.md
│       └── set&map.js
├── expand/           # Extended content
│   └── LRU/          # LRU cache implementation
│       ├── LRUCache.js / .ts
│       └── LRUCacheWithTTL.js
├── others/           # Other utility code
│   ├── classToFunc.js
│   └── README.md
├── scenario/         # Front-end interview scenario questions
│   └── index.md
├── test/             # Implementations of classic algorithm problems
│   ├── 1352.ts       # Digit product
│   ├── 147.ts
│   └── 232.ts        # Implement queue using stacks
└── utils/            # Utility functions
    ├── BinaryTree/
    └── LinkList/
```

## Content Overview

### Fundamentals
- Regular Expressions
- Set and Map Data Structures

### Data Structures
- Linked List (LinkList)
- Binary Tree (BinaryTree)
- LRU Cache (LRUCache)
- LRU Cache with TTL

### Interview Scenario Questions
- Performance Optimization
- Networking and Security
- Engineering and Collaboration
- Interaction and Business Logic
- Node.js Full-stack
- AI Development and Applications
- Production Issue Troubleshooting

## Usage Instructions

Simply run the corresponding `.js` or `.ts` files in a browser or Node.js environment to view the results.

### Running with Node.js

```bash
node src/base/0.pre/set&map.js
node src/expand/LRU/LRUCache.js
```

### Running with TypeScript

First compile the code:

```bash
# Using Deno
deno run src/test/1352.ts

# Or compile with tsc and then run
tsc src/test/1352.ts && node src/test/1352.js
```

## Technology Stack

- JavaScript (ES6+)
- TypeScript
- Deno
- ESLint
- Prettier
- commitlint

## License

MIT License