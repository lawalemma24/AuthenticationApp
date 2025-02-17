
const express = require('express');
const router = express.Router();
const {getProducts, getProduct, createProduct, updateProduct,deleteProduct} = require('../controllers/productController')

router.get('/getproduct',getProducts)
router.get('/getproducts/:id',getProduct)
router.put('/updateproduct/:id',updateProduct)
router.post('/createproduct',createProduct)
router.delete('/deleteproduct/:id',deleteProduct)

module.exports = router;
