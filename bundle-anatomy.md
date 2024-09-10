# Metro Bundle Anatomy

Metro is a JavaScript bundler used primarily in React Native applications. Its bundle structure is relatively simple compared to other bundlers, making it an excellent starting point for understanding how JavaScript bundlers work.

## Why Metro Bundles?

We're focusing on Metro bundles in this course because:

1. They have a straightforward structure that's easy to understand.
2. The simplicity allows us to focus on core bundling concepts without getting lost in complexity.
3. Understanding Metro bundles provides a solid foundation for learning about more complex bundlers later.

It's important to note that not all JavaScript bundlers produce bundles with this structure. Tools like Webpack, Rollup, or Parcel may have more complex output formats.

## Basic Structure

A Metro bundle consists of three main parts:

1. The module definition function `__d`
2. The module execution function `__r`
3. Individual module definitions

Let's break these down:

### 1. Module Definition Function (`__d`)

```javascript
function __d(factory, moduleId, dependencyMap, fileName) {
  // Implementation details
}
```

This function is used to define modules. It takes four parameters:

- `factory`: A function that contains the module's code.
- `moduleId`: A unique identifier for the module.
- `dependencyMap`: An array of dependency module IDs.
- `fileName`: The source file path of the module.

### 2. Module Execution Function (`__r`)

```javascript
function __r(moduleId) {
  // Implementation details
}
```

This function is used to require and execute modules. It takes one parameter:

- `moduleId`: The ID of the module to execute.

### 3. Individual Module Definitions

Each module in the bundle is wrapped in an `__d` call. For example:

```javascript
__d(function(g, r, i, a, m, e, d) {
  // Module code here
}, moduleId, [dependencyIds], "path/to/module.js");
```

The factory function passed to `__d` receives several parameters:

- `g`: The global object
- `r`: A reference to the `__r` function
- `i`: A function to require a module by ID
- `a`: A function to require a module by name
- `m`: The module object
- `e`: The module's exports object
- `d`: A function to define properties on the exports object

## Bundle Execution Flow

1. When the bundle is loaded, all modules are defined using `__d`, but not executed.
2. The bundle typically ends with a call to `__r` with the entry module's ID.
3. When `__r` is called, it executes the specified module and its dependencies recursively.

## Example

Here's a simplified example of what a Metro bundle might look like:

```javascript
(function(global) {
  // Module cache
  var modules = {};

  // Module definition function
  global.__d = function(factory, moduleId, dependencyMap, fileName) {
    modules[moduleId] = {
      factory: factory,
      dependencyMap: dependencyMap,
      fileName: fileName,
      exports: {}
    };
  };

  // Module execution function
  global.__r = function(moduleId) {
    var module = modules[moduleId];
    if (!module.hasExecuted) {
      module.hasExecuted = true;
      module.factory(global, global.__r, module.require, module, module.exports, module.dependencyMap);
    }
    return module.exports;
  };

  // Module definitions
  __d(function(g, r, i, a, m, e, d) {
    e.numbers = [1, 2, 4, 76, 212, 578, 21];
  }, 1, [], "path/to/module1.js");

  __d(function(g, r, i, a, m, e, d) {
    const numbers = r(1).numbers;
    e.sum = numbers.reduce((a, b) => a + b, 0);
  }, 2, [1], "path/to/module2.js");

  // Execute the entry module
  __r(2);
})(this);
```

In this example, module 1 defines an array of numbers, and module 2 depends on module 1 to calculate the sum of those numbers.

Understanding this structure will help you navigate and manipulate Metro bundles throughout the course exercises.