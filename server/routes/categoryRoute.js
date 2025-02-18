import express from "express";
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from "../controllers/categoryController.js";
import { authUsers, authAdmin } from '../middlewares/AuthUsers.js'

export const categoryRouter = express.Router();

categoryRouter.post('/', authUsers, authAdmin, createCategory);
categoryRouter.put('/:categoryId', authUsers, authAdmin, updateCategory);
categoryRouter.delete('/:categoryId', authUsers, authAdmin, removeCategory);

categoryRouter.get('/categories', listCategory);
categoryRouter.get('/:id', readCategory);

export default categoryRouter