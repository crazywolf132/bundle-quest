module.exports.default = (bundle) => {
  return `
    // TODO: Implement code splitting and lazy loading
    // Hint: You'll need to modify the __d and __r functions, and implement a chunk loading system

    const loadedChunks = new Set();

    function loadChunk(chunkId) {
      // Your code here
    }

    // Modified __d function
    function __d(factory, moduleId, dependencyMap, fileName, chunkId) {
      // Your code here
    }

    // Modified __r function
    function __r(moduleId) {
      // Your code here
    }

    // Example usage
    __d(function(g, r, i, a, m, e, d) {
      e.exports = { message: "I'm in the main bundle" };
    }, 1, [], "main.js", 0);

    __d(function(g, r, i, a, m, e, d) {
      e.exports = { message: "I'm in a separate chunk" };
    }, 2, [], "lazy.js", 1);

    // Test your implementation
    console.log(__r(1));
    __r(2).then(module => console.log(module));
  `;
}