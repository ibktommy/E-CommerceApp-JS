const layout = require('../layout');


module.exports = ({ products }) => {
  // Rendering Products Details
  const renderedProducts = products.map((product) => {
    return `
      <div>${product.title}</div>
    `
  }).join('')
  return layout({
    content: `
      <h1 class="title">Products</h1>
      ${renderedProducts}
    `
  })
}