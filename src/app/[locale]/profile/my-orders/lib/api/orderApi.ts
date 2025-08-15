import { apiSlice } from "@/lib/api/apiSlice";
import { IOrderGet } from "../orderType";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<IRes<IOrderGet[]>, IGetProps>({
      query: (data) => ({
        url: "/client/order",
        method: "POST",
        body: data,
      }),
      providesTags: ["Orders"],
    }),
    getOrdersByUuid: builder.query<IRes<any>, { uuid: string }>({
      query: (data) => ({
        url: "/client/order/fetch-order-by-order-uuid",
        method: "POST",
        body: data,
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrdersByUuidQuery } = userApi;
