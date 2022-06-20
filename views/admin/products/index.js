const layout = require('../layout');


module.exports = ({ products }) => {
  return layout({
    content: `
      <h1 class="title">Products</h1>
    `
  })
}