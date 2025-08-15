import { apiSlice } from "@/lib/api/apiSlice";
import { IUser, IUserRes } from "@/types/common";
import { ILoginForm, ILoginResponse, IUserGetType } from "../types/loginTypes";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUserRes, ILoginForm>({
      query: (data) => ({
        url: "/client/user/login",
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.query<IResWithOutFilter<IUser>, { uuid: string }>({
      query: (data) => ({
        url: "/client/user/fetch-by-uuid",
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation<ILoginResponse, FormData>({
      query: (data) => ({
        url: "/client/user/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation } =
  userApi;
