module.exports.default = (bundle) => {
  return `
    // TODO: Implement circular dependency detection and resolution
    // Hint: You'll need to keep track of the module loading stack

    const moduleStack = [];
    const moduleCache = {};

    function __r(moduleId) {
      // Your code here
    }

    // Test your implementation with circular dependencies
    __d(function(g, r, i, a, m, e, d) {
      const b = r(2);
      e.exports = { a: 'Module A', getB: () => b };
    }, 1, [2], "moduleA.js");

    __d(function(g, r, i, a, m, e, d) {
      const a = r(1);
      e.exports = { b: 'Module B', getA: () => a };
    }, 2, [1], "moduleB.js");

    console.log(__r(1));
    console.log(__r(2));
  `;
}