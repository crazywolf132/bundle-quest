module.exports.default = (bundle) => {
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