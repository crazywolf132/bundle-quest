module.exports.default = (bundle) => {
  return `
    // TODO: Implement a zero-downtime hot module replacement system
    // Hint: You'll need to create a sophisticated module tracking and update system

    class HMRManager {
      constructor() {
        this.moduleMap = new Map();
        this.updateQueue = [];
      }

      addModule(moduleId, factory, dependencyMap) {
        // Your code here: Add a module to the tracking system
      }

      updateModule(moduleId, newFactory) {
        // Your code here: Queue a module update
      }

      applyUpdates() {
        // Your code here: Apply queued updates and propagate changes
      }

      preserveState(oldModule, newModule) {
        // Your code here: Transfer state from old module to new module
      }
    }

    const hmr = new HMRManager();

    // Modified __d function to work with HMR
    function __d(factory, moduleId, dependencyMap, fileName) {
      hmr.addModule(moduleId, factory, dependencyMap);
      modules[moduleId] = {
        hot: {
          accept: (callback) => {
            // Your code here: Implement HMR accept logic
          }
        },
        factory,
        dependencyMap,
        fileName
      };
    }

    // Test your implementation
    __d(function(g, r, i, a, m, e, d) {
      let count = 0;
      e.exports = {
        increment: () => ++count,
        getCount: () => count
      };
      m.hot.accept();
    }, 1, [], "counter.js");

    const counterModule = __r(1);
    console.log(counterModule.increment()); // 1

    // Simulate a module update
    hmr.updateModule(1, function(g, r, i, a, m, e, d) {
      let count = m.exports.getCount(); // Preserve the previous count
      e.exports = {
        increment: () => count += 2, // Changed to increment by 2
        getCount: () => count
      };
      m.hot.accept();
    });

    hmr.applyUpdates();
    console.log(counterModule.increment()); // Should print 3
  `;
}