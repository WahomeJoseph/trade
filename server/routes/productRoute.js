import express from "express";
import formidable from "express-formidable";
// check ID

import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js";
import { authUsers, authAdmin } from "../middlewares/AuthUsers.js";

export const productRouter = express.Router();

productRouter.post('/', fetchProducts)
  .post(authUsers, authAdmin, formidable(), addProduct);

productRouter.get('/all-prodcuts', fetchAllProducts)
  .route("/:id/reviews").post(authUsers, addProductReview);

productRouter.get("/top-products", fetchTopProducts)
  .get("/new-products", fetchNewProducts);

productRouter.get('/:id', fetchProductById)
  .put(authUsers, authAdmin, formidable(), updateProductDetails)
  .delete(authUsers, authAdmin, removeProduct);

productRouter.post('/filter-products', filterProducts);