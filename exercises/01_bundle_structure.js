module.exports.default = (bundle) => {
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
