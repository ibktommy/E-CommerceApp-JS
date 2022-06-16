// Requiring the Layout file
const layout = require('../layout')
// Requiring the Helper Function File
const { getError } = require('../../helpers')

module.exports = ({ errors }) => {
  return layout({
    content: `
      <form method="POST" enctype="multipart/form-data">
        <input placeholder="Product Title" name="title"/>
        ${getError(errors, 'title')}
        <input placeholder="Product Price" name="price"/>
        ${getError(errors, 'price')}
        <input type="file" name="image"/>
        <button>Create Product</button>
      </form>
    `
  })
}