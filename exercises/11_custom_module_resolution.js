module.exports.default = (bundle) => {
  return `
    // TODO: Implement custom module resolution
    // Hint: You'll need to modify the __r function and add a custom resolve function

    function customResolve(modulePath, currentModulePath) {
      // Your code here
    }

    // Modified __r function
    function __r(moduleId) {
      // Your code here
    }

    // Test your implementation
    console.log(__r('@components/Button'));
    console.log(__r('~/utils/helper'));
    console.log(__r('./subfolder'));
  `;
}