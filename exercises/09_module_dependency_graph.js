module.exports.default = (bundle) => {
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
