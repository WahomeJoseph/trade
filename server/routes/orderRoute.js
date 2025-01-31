import express from "express";
const router = express.Router();

import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calcualteTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered } from "../controllers/orderController.js";

import { authUsers, authAdmin } from "../middlewares/AuthUsers.js";

router
  .route("/")
  .post(authUsers, createOrder)
  .get(authUsers, authAdmin, getAllOrders);

router.route("/mine").get(authUsers, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authUsers, findOrderById);
router.route("/:id/pay").put(authUsers, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authUsers, authAdmin, markOrderAsDelivered);

export default router;