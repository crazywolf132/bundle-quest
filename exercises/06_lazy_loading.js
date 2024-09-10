module.exports.default = (bundle) => {
    return `
    // TODO: Implement a lazy loading mechanism
    // Hint: Use a cache object to store loaded modules
    
    const moduleCache = {};
    
    function lazyRequire(moduleId) {
      // Your code here
    }

    // Test your lazy loading implementation
    console.log(lazyRequire(1)); // Should load and return module 1
    console.log(lazyRequire(1)); // Should return cached module 1 without reloading
  `;
}