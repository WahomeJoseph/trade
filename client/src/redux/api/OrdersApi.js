import { apiSlice } from "./SliceApi";
import { ORDER_URL } from "../features/Constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create new order
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/`,
        method: "POST",
        body: order,
      }),
    }),
    // get order details
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),

    // payOrder: builder.mutation({
    //   query: ({ orderId, details }) => ({
    //     url: `${ORDER_URL}/${orderId}/pay`,
    //     method: "PUT",
    //     body: details,
    //   }),
    // }),

    // getPaypalClientId: builder.query({
    //   query: () => ({
    //     url: PAYPAL_URL,
    //   }),
    // }),

    // user to get their orders
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDER_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDER_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDER_URL}/total-sales-by-date`,
    }),
  }),
});

export const { useGetTotalOrdersQuery, useGetTotalSalesQuery, useGetTotalSalesByDateQuery, useCreateOrderMutation, useGetOrderDetailsQuery, useGetMyOrdersQuery, useDeliverOrderMutation, useGetOrdersQuery } = orderApiSlice;