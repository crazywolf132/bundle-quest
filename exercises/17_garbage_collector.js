module.exports.default = (bundle) => {
  return `
    // TODO: Implement a basic mark-and-sweep garbage collector
    // Hint: You'll need to modify object creation and track references

    class GarbageCollector {
      constructor() {
        this.objects = new Set();
        this.roots = new Set();
      }

      allocate(obj) {
        // Your code here: Track new object allocations
      }

      addRoot(obj) {
        // Your code here: Add root objects (e.g., module exports)
      }

      collect() {
        // Your code here: Implement mark-and-sweep algorithm
      }

      mark(obj) {
        // Your code here: Recursively mark live objects
      }

      sweep() {
        // Your code here: Remove unmarked objects
      }
    }

    const gc = new GarbageCollector();

    // Modified __d function to work with GC
    function __d(factory, moduleId, dependencyMap, fileName) {
      const moduleExports = {};
      gc.addRoot(moduleExports);
      modules[moduleId] = {
        factory: (g, r, i, a, m, e, d) => {
          factory(g, r, i, a, m, moduleExports, d);
          return moduleExports;
        },
        dependencyMap,
        fileName
      };
    }

    // Modify object creation to work with GC
    const originalObjectCreate = Object.create;
    Object.create = function(proto) {
      const obj = originalObjectCreate(proto);
      gc.allocate(obj);
      return obj;
    }

    // Test your implementation
    __d(function(g, r, i, a, m, e, d) {
      e.exports = { 
        createObjects: () => {
          let obj = { data: new Array(1000000).fill(0) };
          return () => console.log(obj.data.length);
        }
      };
    }, 1, [], "memory-intensive.js");

    const memoryModule = __r(1);
    const leakFunc = memoryModule.createObjects();
    leakFunc();
    gc.collect();
    console.log('Memory after GC:', process.memoryUsage().heapUsed);
  `;
}