import express from "express";
import formidable from "express-formidable";
export const productRouter = express.Router();

// controllers
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts, filterProducts } from "../controllers/productController.js";
import { authUsers, authAdmin } from "../middlewares/AuthUsers.js";

productRouter.post('/', fetchProducts)
  .post(authUsers, authAdmin, formidable(), addProduct);

productRouter.get('/products', fetchAllProducts)
  .route("/:id/reviews").post(authenticate, checkId, addProductReview);

productRouter.get("/top-products", fetchTopProducts)
  .get("/new-products", fetchNewProducts);

productRouter.get('/:id', fetchProductById)
  .put(authUsers, authAdmin, formidable(), updateProductDetails)
  .delete(authUsers, authAdmin, removeProduct);

productRouter.post('/filter-products', filterProducts);