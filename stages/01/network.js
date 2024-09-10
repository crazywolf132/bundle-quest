const axios = require("axios/dist/browser/axios.cjs");

module.exports.getSomething = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
