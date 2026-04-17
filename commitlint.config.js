/** @type {import('cz-git').UserConfig} */
/**
 * 算法刷题仓库的 commitlint 配置
 * 基于通用 Git 项目开发标准，针对算法刷题场景进行定制化调整
 *
 * 提交格式规范：
 * <type>([scope]:<algorithm-type>): <description>
 */

// 影响范围
const scopes = ['root', 'ACM', 'base', 'expand', 'others', 'test', 'utils'];

// 算法类型
const algorithmTypes = [
  'Array',
  'String',
  'Two Pointers',
  'Sliding Window',
  'Hash Table',
  'Linked List',
  'Stack',
  'Tree',
  'Binary Tree',
  'DFS',
  'BFS',
  'Backtracking',
  'DP',
  'Binary Search',
  'Math',
  'Bit Manipulation',
  'Prefix Sum',
  'Sorting',
  'JS&TS',
  'Matrix',
  'extra'
];

// 生成包含算法类型的 scope 选项
const generateScopeWithAlgorithmTypes = () => {
  const scopeOptions = [];
  for (const scope of scopes) {
    for (const algorithmType of algorithmTypes) {
      scopeOptions.push({
        name: `${scope}:${algorithmType}`,
        value: `${scope}:${algorithmType}`,
        description: `${scope} 下的 ${algorithmType} 算法`
      });
    }
  }
  return scopeOptions;
};

const generateScopeOverrides = () => {
  const types = ['feat', 'fix', 'docs', 'refactor', 'perf', 'test', 'chore'];
  const overrides = {};
  for (const type of types) {
    overrides[type] = generateScopeWithAlgorithmTypes();
  }
  return overrides;
};

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'perf', 'test', 'chore']]
  },
  prompt: {
    types: [
      { value: 'feat', name: '✨ 新功能: 新增题' },
      { value: 'fix', name: '🐛 修复: 修复遗漏错误' },
      { value: 'docs', name: '📚 文档: 更新文档' },
      { value: 'refactor', name: '📦 重构: 文件结构重构' },
      { value: 'perf', name: '🚀 性能: 新增优化算法' },
      { value: 'test', name: '🧪 测试: 添加测试' },
      { value: 'chore', name: '🔧 工具: 更改项目环境或配置文件' }
    ],
    // ✅ 这里修复成字符串数组，不再报错
    scopes: [...scopes],
    allowCustomScopes: true,
    skipQuestions: ['body', 'footerPrefix', 'footer', 'breaking'],
    messages: {
      type: '📌 请选择提交类型:',
      scope: '🎯 请选择影响范围和算法类型:',
      subject: '📝 请简要描述更改:',
      confirmCommit: '✅ 确认提交?'
    },
    scopeOverrides: generateScopeOverrides()
  }
};
