module.exports.default = (bundle) => {
    return `
    // TODO: Implement a hot reload function
    // Hint: Keep track of module dependencies and update them recursively
    
    function hotReload(moduleId, newImplementation) {
      // Your code here
    }

    // Test hot reloading
    hotReload(2, function(g, r, i, a, m, e, d) {
      m.exports.add = (a, b) => a + b + 1; // Changed implementation
    });
    const mathModule = __r(2);
    console.log("Hot reloaded add function:", mathModule.add(2, 3));
  `;
}