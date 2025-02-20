import express from "express"
// import formidable from "express-formidable"

import { addProduct, updateProduct, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js"
import { authUsers, authAdmin } from "../middlewares/AuthUsers.js"

export const productRouter = express.Router()

productRouter.post('/',authUsers, authAdmin, addProduct)
productRouter.get('/',authUsers,authAdmin, fetchProducts)

productRouter.get('/all-products', authUsers, authAdmin, fetchAllProducts)
productRouter.post('/:id/reviews', authUsers, addProductReview)

productRouter.get('/:id', fetchProductById)
productRouter.put('/:id', authUsers, authAdmin, updateProduct)
productRouter.delete('/:id', authUsers, authAdmin, removeProduct)

productRouter.get('/top-products', fetchTopProducts)
productRouter.get('/new-products',  fetchNewProducts,)
productRouter.post('/filter-products', filterProducts)