import { apiSlice } from "@/lib/api/apiSlice";
import { IUserRes } from "@/types/common";
import { ILoginForm } from "../types/registrationTypes";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<IUserRes, ILoginForm>({
            query: (data) => ({
                url: "/client/user/create",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useRegistrationMutation } = userApi;
