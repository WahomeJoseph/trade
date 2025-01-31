import express from "express";
const router = express.Router();
import { createCategory, updateCategory, removeCategory, listCategory, readCategory } from "../controllers/categoryController.js";
import { authUsers, authAdmin } from '../middlewares/AuthUsers.js'

router.route("/").post(authUsers, authAdmin, createCategory);
router.route("/:categoryId").put(authUsers, authAdmin, updateCategory);
router.route("/:categoryId").delete(authUsers, authAdmin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;