import { apiSlice } from "@/lib/api/apiSlice";
import { IUserUpdate } from "../profileType";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<IResWithOutFilter<any>, IUserUpdate>({
      query: (data) => ({
        url: `/client/user/reset`,
        method: "PATCH",
        body: data,
        providesTags: ["User"],
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = paymentApi;
