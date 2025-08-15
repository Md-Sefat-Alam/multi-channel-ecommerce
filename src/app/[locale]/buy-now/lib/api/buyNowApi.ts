import { apiSlice } from "@/lib/api/apiSlice";
import { IOrder, IPaymentResponse } from "../types/buyNowTypes";

export const buyNowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation<IRes<{ uuid: string }>, IOrder>({
      query: (data) => ({
        url: "/client/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    payment: builder.mutation<
      IRes<IPaymentResponse>,
      { orderId: string; locale: string }
    >({
      query: (data) => ({
        url: "/client/payment/sslcommerz",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payments", "Orders"],
    }),
  }),
});

export const { useOrderMutation, usePaymentMutation } = buyNowApi;
