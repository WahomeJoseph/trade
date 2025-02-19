import express from "express";
import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calcualteTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered } from "../controllers/orderController.js";
import { authUsers, authAdmin } from "../middlewares/AuthUsers.js";

export const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(authUsers, createOrder)
  .get(authUsers, authAdmin, getAllOrders);

orderRouter.route("/mine").get(authUsers, getUserOrders);
orderRouter.route("/total-orders").get(countTotalOrders);
orderRouter.route("/total-sales").get(calculateTotalSales);
orderRouter.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
orderRouter.route("/:id").get(authUsers, findOrderById);
orderRouter.route("/:id/pay").put(authUsers, markOrderAsPaid);
orderRouter
  .route("/:id/deliver")
  .put(authUsers, authAdmin, markOrderAsDelivered);
