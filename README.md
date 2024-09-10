# BundleQuest: Mastering Javascript Bundles

## Course Overview

BundleQuest is an interactive learning experience designed to teach developers the intricacies of Metro bundles. Through a series of hands-on exercises, you'll progress from basic bundle manipulation to advanced techniques for optimizing and customizing JavaScript applications.

## Getting Started

To begin your BundleQuest journey, follow these steps:

1. **Installation**: Run `pnpm install` to install all necessary dependencies.

2. **Starting the Development Server**: Run `pnpm dev` to start the website. Keep this running while you work on the exercises.

3. **Beginning the Exercise System**: Use `pnpm start` to begin the exercise system and start with the first exercise. This command will also reset your progress if you've previously worked on the exercises.

4. **Navigating Exercises**:
   - Use `pnpm next` to move to the next exercise.
   - Use `pnpm previous` to go back to the previous exercise.

5. **Refreshing the Exercise**: After making changes, run `pnpm refresh` to rebundle the exercise, produce the output, and update the website.

Remember to keep the development server running with `pnpm dev` while you work through the exercises. This will allow you to see your changes in real-time on the website.

## Understanding Metro Bundles
Before diving into the exercises, it's crucial to understand the structure of Metro bundles. We've provided a detailed breakdown of the Metro bundle anatomy in the [`bundle-anatomy.md`](./bundle-anatomy.md) file. This document explains:

- Why we're focusing on Metro bundles
- The basic structure of a Metro bundle
- Key components like __d and __r functions
- How modules are defined and executed

Please review this document thoroughly, as it will serve as a valuable reference throughout the course.

## Beginner Level

### Exercise 1: Understanding Bundle Structure

**Objective:** Analyze the structure of a Metro bundle and identify its key components.
The file can be located at `static/bundle.js`

**Task:** Complete the `analyzeBundleStructure` function to return an object containing the total number of modules, an array of module IDs, and an object mapping module IDs to their source file paths.

```javascript
export default function(bundle) {
  return `
    function analyzeBundleStructure(bundleContent) {
      // TODO: Implement the function
      // Hint: Use a regular expression to match __d function calls
      
      const result = {
        totalModules: 0,
        moduleIds: [],
        modulePaths: {}
      };
      
      // Your code here
      
      return result;
    }

    // This line might be wrong too. Maybe \`bundle\` isn't json?
    console.log(JSON.stringify(analyzeBundleStructure(${JSON.stringify(bundle)}), null, 2));
  `;
}
```

### Exercise 2: Executing a Specific Module

**Objective:** Learn how to execute a specific module within the bundle.

**Task:** Write a function that executes the module with ID 1 (the `numbers` array) and logs its exports.

```javascript
export default function(bundle) {
  return `
    // TODO: Execute module 1 and log its exports
    // Hint: Use the __r function
    
    function executeModule1() {
      // Your code here
    }
    
    executeModule1();
  `;
}
```

### Exercise 3: Basic DOM Manipulation

**Objective:** Understand how to manipulate the DOM using bundled code.

**Task:** Modify the `dom.js` module to change the text color of the "Hello, World!" heading to red.

```javascript
export default function(bundle) {
  return `
    // TODO: Modify the dom.js module to change the text color
    // Hint: Use __d to redefine the module
    
    __d(function(g, r, i, a, m, e, d) {
      // Your code here
    }, 6, [], "stages/01/dom.js");

    // Execute the modified DOM module
    __r(6);
  `;
}
```

## Intermediate Level

### Exercise 4: Replacing a Module's Implementation

**Objective:** Learn how to replace a module's implementation at runtime.

**Task:** Replace the implementation of module 2 (the math operations module) to add a new operation called `power`.

```javascript
export default function(bundle) {
  return `
    // TODO: Replace module 2 implementation
    // Hint: Use __d to define a new module with the additional 'power' function
    
    __d(function(g, r, i, a, m, e, d) {
      // Your code here
    }, 2, [], "stages/01/b.js");

    // Test the new implementation
    const mathModule = __r(2);
    console.log("2^3 =", mathModule.power(2, 3));
  `;
}
```

### Exercise 5: Creating a Custom Require Function

**Objective:** Implement a custom `require` function with logging capabilities.

**Task:** Create a `customRequire` function that logs each module's ID before requiring it, then use it to require module 3 (the dog module).

```javascript
export default function(bundle) {
  return `
    // TODO: Implement a custom require function with logging
    // Hint: Store the original __r function and create a new one that logs before calling the original
    
    function customRequire(moduleId) {
      // Your code here
    }

    // Replace the global __r function with your custom one
    g.__r = customRequire;

    // Test your custom require function
    const dogModule = __r(3);
    console.log(dogModule);
  `;
}
```

### Exercise 6: Implementing Lazy Loading

**Objective:** Create a simple lazy loading mechanism for modules.

**Task:** Implement a `lazyRequire` function that only loads a module when it's first called, then caches the result for subsequent calls.

```javascript
export default function(bundle) {
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
```

## Advanced Level

### Exercise 7: Replacing the Axios Library

**Objective:** Replace the Axios library with a custom implementation using `fetch`.

**Task:** Create a simplified version of Axios using `fetch` and replace module 5 (the Axios module) with your implementation.

```javascript
export default function(bundle) {
  return `
    // TODO: Implement a simplified version of Axios using fetch
    // Hint: Create methods for get, post, put, delete
    
    __d(function(g, r, i, a, m, e, d) {
      const customAxios = {
        // Your code here
      };
      
      m.exports = customAxios;
    }, 5, [], "custom-axios.js");

    // Test your custom Axios implementation
    const axios = __r(5);
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  `;
}
```

### Exercise 8: Implementing Hot Module Replacement

**Objective:** Create a basic hot module replacement (HMR) system.

**Task:** Implement a `hotReload` function that can update a module's implementation and re-execute dependent modules.

```javascript
export default function(bundle) {
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
```

### Exercise 9: Creating a Module Dependency Graph

**Objective:** Build a dependency graph of all modules in the bundle.

**Task:** Implement a `buildDependencyGraph` function that analyzes the bundle and returns a dependency graph.

```javascript
export default function(bundle) {
  return `
    // TODO: Implement dependency graph building
    // Hint: Analyze __d calls to determine dependencies between modules
    
    function buildDependencyGraph(bundleContent) {
      // Your code here
    }

    const dependencyGraph = buildDependencyGraph(${JSON.stringify(bundle)});
    console.log("Dependency graph:", JSON.stringify(dependencyGraph, null, 2));
  `;
}
```

### Exercise 10: Implementing Code Splitting

**Objective:** Create a system for code splitting and lazy loading of modules.

**Task:** Implement a `loadChunk` function that can load a separate chunk of modules and integrate it into the main bundle.

```javascript
export default function(bundle) {
  return `
    // TODO: Implement chunk loading
    // Hint: Simulate loading a chunk of modules and adding them to the bundle
    
    function loadChunk(chunkId) {
      // Your code here
    }

    // Test chunk loading
    loadChunk('chunk1').then(() => {
      const newModule = __r(101); // Assume chunk1 contains module 101
      console.log("Loaded module from chunk:", newModule);
    });
  `;
}
```

## Conclusion

Congratulations on completing BundleQuest! You've gained valuable insights into Metro bundles, from basic structure analysis to advanced techniques like hot module replacement and code splitting. These skills will empower you to optimize and customize JavaScript applications effectively.

Remember, the world of bundling and JavaScript optimization is ever-evolving. Keep exploring, experimenting, and building to stay at the forefront of web development!

## Advanced Classes

### Master Class

For those who have completed the Beginner and Intermediate levels and are looking for more advanced challenges, we offer a Master Class. These exercises will push your understanding of JavaScript bundles and runtimes to new heights.

Master Class exercises include:

1. Custom Module Resolution
2. Circular Dependency Detection and Resolution
3. Implementing a Plugin System
4. Implementing Code Splitting and Lazy Loading
5. Implementing a Virtual Machine for Sandboxed Execution

These exercises will challenge you to think deeply about how JavaScript bundlers and runtimes work, and will give you the skills to create advanced tooling and optimizations.

### Grandmaster Class

For those who truly want to master the intricacies of JavaScript engines and advanced runtime concepts, we offer the Grandmaster Class. These exercises represent the pinnacle of complexity and depth in JavaScript bundle manipulation and runtime implementation.

Grandmaster Class exercises include:

1. Implementing a Just-In-Time (JIT) Compiler
2. Implementing a Garbage Collector
3. Implementing a Time-Travel Debugger
4. Implementing a Zero-Downtime Hot Module Replacement System
5. Implementing a Custom JavaScript Engine

These exercises will give you insight into the inner workings of JavaScript engines like V8 and SpiderMonkey, and will challenge you to implement complex systems that are at the cutting edge of JavaScript technology.

By completing all levels of BundleQuest, from Beginner through Grandmaster, you'll gain a comprehensive understanding of JavaScript bundles, runtime environments, and engine internals that few developers ever achieve. This knowledge will empower you to optimize applications, create custom tooling, and push the boundaries of what's possible with JavaScript.

Remember, the journey of learning is as important as the destination. Take your time with each exercise, experiment, and don't hesitate to dive deep into additional resources and documentation. Happy coding!