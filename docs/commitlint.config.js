/** @type {import('cz-git').UserConfig} */
/**
 * 算法刷题仓库的 commitlint 配置
 * 基于通用 Git 项目开发标准，针对算法刷题场景进行定制化调整
 *
 * 提交格式规范：
 * <type>([scope]:<algorithm-type>): <description>
 *
 * 其中：
 * - <type>：提交类型，包括 feat、fix、docs、refactor、perf、test
 * - <scope>：影响范围，如 root、ACM、base、expand、others、test、utils
 * - <algorithm-type>：算法类别，必须从指定类别中选择（优先使用简写形式）
 * - <description>：提交描述
 *
 * 算法类别列表：
 * - Array（数组）
 * - String（字符串）
 * - Two Pointers（双指针）
 * - Sliding Window（滑动窗口）
 * - Hash Table（哈希表/哈希映射）
 * - Linked List（链表）
 * - Stack（栈）
 * - Tree / Binary Tree（树/二叉树）
 * - DFS（深度优先搜索）
 * - BFS（广度优先搜索）
 * - Backtracking（回溯）
 * - DP（动态规划）
 * - Binary Search（二分查找）
 * - Math（数学）
 * - Bit Manipulation（位运算）
 * - Prefix Sum（前缀和）
 * - Sorting（排序）
 *
 * 非算法题提交：
 * 对于环境配置、项目设置等非算法题提交，统一使用 extra 作为算法类型
 * 示例：feat(root:extra): +Deno配置
 */

// 定义影响范围列表
const scopes = ['root', 'ACM', 'base', 'expand', 'others', 'test', 'utils'];

// 定义算法类别列表
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
  'extra' // 非算法题提交
];

// 动态生成 scopes 组合
const generateScopes = () => {
  const generatedScopes = [];
  for (const scope of scopes) {
    for (const type of algorithmTypes) {
      generatedScopes.push(`${scope}:${type}`);
    }
  }
  return generatedScopes;
};

// 生成 scopeOverrides 配置
const generateScopeOverrides = () => {
  const types = ['feat', 'fix', 'docs', 'refactor', 'perf', 'test', 'chore'];
  const overrides = {};

  for (const type of types) {
    overrides[type] = {
      'root:extra': '项目配置相关',
      ACM: 'ACM 相关算法',
      base: '基础算法题',
      expand: '扩展算法题',
      others: '其他算法相关',
      test: '测试相关',
      utils: '工具函数相关'
    };
  }

  return overrides;
};

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: `https://commitlint.js.org/#/reference-rules`
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 108],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'perf', 'test', 'chore']],
    // 自定义规则：验证 scope 格式是否符合 [scope]:<algorithm-type>
    'scope-format': [2, 'always', /^([a-zA-Z0-9_-]+):([a-zA-Z0-9_\s/]+)$/],
    // 自定义规则：验证算法类型是否在允许的列表中
    'scope-enum': [2, 'always', algorithmTypes]
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
    scopes: generateScopes(),
    allowCustomScopes: true,
    skipQuestions: ['body', 'footerPrefix', 'footer', 'breaking'], // 跳过"详细描述"和"底部信息"
    messages: {
      type: '📌 请选择提交类型:',
      scope: '🎯 请选择影响范围和算法类型 (可选):',
      subject: '📝 请简要描述更改:',
      body: '🔍 详细描述 (可选):',
      footer: '🔗 关联的 ISSUE 或 BREAKING CHANGE (可选):',
      confirmCommit: '✅ 确认提交?'
    },
    // 自定义 scope 提示信息
    scopeOverrides: generateScopeOverrides()
  }
};
