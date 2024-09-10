# BundleQuest Master Class Exercises

Welcome to the Master Class level of BundleQuest! These exercises are designed to push your understanding of JavaScript bundles and runtimes to the limit. You'll be creating your own custom runtime by replacing and extending core parts of the Metro bundle system.

## Exercise 11: Custom Module Resolution

**Objective:** Implement a custom module resolution system that allows for aliasing and custom module paths.

**Task:** Replace the default module resolution mechanism in the `__r` function to support:
1. Module aliases (e.g., `@components/Button` resolves to `src/components/Button.js`)
2. Custom module paths (e.g., `~/utils` resolves to the project's utils directory)
3. Node.js-style resolution (looking for index.js in directories)

```javascript
export default function(bundle) {
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
```

## Exercise 12: Circular Dependency Detection and Resolution

**Objective:** Implement a system to detect and safely resolve circular dependencies.

**Task:** Modify the module loading system to:
1. Detect circular dependencies
2. Provide a warning when a circular dependency is encountered
3. Safely resolve circular dependencies by returning partially loaded modules

```javascript
export default function(bundle) {
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
```

## Exercise 13: Implementing a Plugin System

**Objective:** Create a plugin system that allows for extending and modifying the bundler's behavior.

**Task:** Implement a plugin system that allows for:
1. Registering plugins
2. Providing hooks for various stages of the bundling process (e.g., before module load, after module load)
3. Allowing plugins to modify module content or behavior

```javascript
export default function(bundle) {
  return `
    // TODO: Implement a plugin system
    // Hint: You'll need to create a plugin registry and modify the __d and __r functions

    const plugins = [];

    function registerPlugin(plugin) {
      // Your code here
    }

    function runPluginHook(hookName, ...args) {
      // Your code here
    }

    // Modified __d function
    function __d(factory, moduleId, dependencyMap, fileName) {
      // Your code here
    }

    // Modified __r function
    function __r(moduleId) {
      // Your code here
    }

    // Example plugin
    const loggingPlugin = {
      name: 'LoggingPlugin',
      beforeModuleLoad: (moduleId) => console.log(\`Loading module \${moduleId}\`),
      afterModuleLoad: (moduleId, exports) => console.log(\`Loaded module \${moduleId}\`)
    };

    // Test your implementation
    registerPlugin(loggingPlugin);
    console.log(__r(1));
  `;
}
```

## Exercise 14: Implementing Code Splitting and Lazy Loading

**Objective:** Create a system for code splitting and lazy loading of modules.

**Task:** Implement a mechanism that allows for:
1. Defining split points in the code
2. Generating separate chunks for split modules
3. Lazy loading of chunks when required

```javascript
export default function(bundle) {
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
```

## Exercise 15: Implementing a Virtual Machine for Sandboxed Execution

**Objective:** Create a simple virtual machine that can execute bundled code in a sandboxed environment.

**Task:** Implement a basic VM that:
1. Provides a secure execution environment for modules
2. Allows for controlled access to global objects and functions
3. Implements a basic set of VM instructions for module execution

```javascript
export default function(bundle) {
  return `
    // TODO: Implement a simple virtual machine for sandboxed execution
    // Hint: You'll need to create a VM class with its own instruction set and execution environment

    class VM {
      constructor() {
        this.sandbox = {
          console: {
            log: (...args) => console.log('VM:', ...args)
          }
          // Add other safe globals here
        };
        this.instructions = [];
      }

      compile(moduleFactory) {
        // Your code here: Convert the module factory to VM instructions
      }

      execute() {
        // Your code here: Execute the VM instructions
      }

      // Implement other necessary VM methods
    }

    // Modified __d function
    function __d(factory, moduleId, dependencyMap, fileName) {
      const vm = new VM();
      vm.compile(factory);
      modules[moduleId] = {
        execute: () => vm.execute(),
        dependencyMap,
        fileName
      };
    }

    // Modified __r function
    function __r(moduleId) {
      // Your code here: Use the VM to execute the module
    }

    // Test your implementation
    __d(function(g, r, i, a, m, e, d) {
      console.log('Executing in VM');
      e.exports = { message: 'Hello from VM!' };
    }, 1, [], "vm-test.js");

    console.log(__r(1));
  `;
}
```

These master class exercises are designed to challenge you and help you gain a deep understanding of how JavaScript bundlers and runtimes work under the hood. By completing these exercises, you'll be able to create custom bundler features, optimize module loading, implement advanced patterns like code splitting, and even create a basic virtual machine for sandboxed execution.
