module.exports.default = (bundle) => {
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