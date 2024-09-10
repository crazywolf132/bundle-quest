module.exports.default = (bundle) => {
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