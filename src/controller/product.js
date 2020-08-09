const categoryModel = require('../models/product');
const helper = require('../helper/helpers');

module.exports = {
  getProduct: (req, res) => {
    const result = {}
    categoryModel.getProduct().then((results) => {
      if(results.length === 0 ) {
        result.status = 404;
        result.message = 'product not found';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = results;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    });
  },

  insertProduct: (req, res) => {
    const data = req.body;
    const result = {};
    data.photo = `http://localhost:1111/api/upload/${req.file.filename}`
    categoryModel.insertProduct(data).then((results) => {
      if(data === undefined ) {
        result.status = 404;
        result.message = 'failed to input product';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = data;
        helper.response(res, result);
      }
    })
    .catch(err => {
      console.log(err)
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    });
  },

  updateProduct: (req, res) => {
    const idProduct = req.params.id_product;
    const data = req.body;
    const result = {};
    data.photo = `http://localhost:1111/api/upload/${req.file.filename}`
    categoryModel.updateProduct(idProduct, data).then((results) => {
      if(data === 0 ) {
        result.status = 404;
        result.message = 'failed to input update';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = data;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    });
  },

  detailProduct: (req, res) => {
    const idProduct = req.params.id_product;
    const result = {}
    categoryModel.productDetail(idProduct).then((results) => {
      if(results.length === 0 ) {
        result.status = 404;
        result.message = 'Product not found';
        helper.response(res, result);
      } else {
        result.status = 200;
        result.message = 'OK';
        result.data = results;
        helper.response(res, result);
      }
    })
    .catch(err => {
      result.message = 'internal server error';
      result.err = err;
      helper.response(res, result)
    })
  }

}