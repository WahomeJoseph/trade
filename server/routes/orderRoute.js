import express from "express";
import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calcualteTotalSalesByDate, findOrderById, markOrderAsPaid, markOrderAsDelivered } from "../controllers/orderController.js";
import { authUsers, authAdmin } from "../middlewares/AuthUsers.js";

export const orderRouter = express.Router();

orderRouter.post('/', authUsers, createOrder)
  .get(authUsers, authAdmin, getAllOrders);

orderRouter.get('/mine', authUsers, getUserOrders);
orderRouter.get('/total-orders', countTotalOrders);
orderRouter.get('/total-sales', calculateTotalSales);
orderRouter.get('/total-sales-by-date', calcualteTotalSalesByDate);
orderRouter.get('/:id', authUsers, findOrderById);
orderRouter.put('/:id/pay', authUsers, markOrderAsPaid);

orderRouter.put('/:id/deliver', authUsers, authAdmin, markOrderAsDelivered);
