import { apiSlice } from "@/lib/api/apiSlice";
import {
  IAddWishlistResponse,
  IProduct,
  IRemoveWishlistResponse,
  IWishlistItem,
} from "../types/rootTypes";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<IRes<IProduct[]>, IGetProps>({
      query: (data) => ({
        url: "/client/product/fetch",
        method: "POST",
        body: data,
      }),
    }),
    getTopSellingProduct: builder.query<IRes<IProduct[]>, IGetProps>({
      query: (data) => ({
        url: "/client/product/top-selling",
        method: "POST",
        body: data,
      }),
    }),
    getCategory: builder.query<
      IRes<
        {
          categoryName: string;
          categoryNameBn: string;
        }[]
      >,
      void
    >({
      query: (data) => ({
        url: "/client/category/fetch",
        method: "POST",
        body: data,
      }),
    }),

    getWishlist: builder.query<any[], void>({
      query: () => "/client/wishlist",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<any, { productId: string }>({
      query: (body) => ({
        url: "/client/wishlist/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<void, { productId: string }>({
      query: (body) => ({
        url: "/client/wishlist/remove",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetCategoryQuery,
  useGetTopSellingProductQuery,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = userApi;
